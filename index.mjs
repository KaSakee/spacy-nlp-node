import { PythonShell } from "python-shell";
import Parse from "./Parse.mjs";
import events from "events";
import Type from "./Type.mjs";

import InstallPythonPackages from "./InstallPythonPackages.mjs";
await InstallPythonPackages();
const EventEmitter = events.EventEmitter;
const ProcessEmitter = new EventEmitter();

let pyshell = new PythonShell("./node_modules/spacy-nlp-node/SpaCy.py");

let isItReady = false;

export const isReady = () => isItReady;

pyshell.on("message", function (message) {
  if (message == "ready") {
    isItReady = true;
    console.log("Its ready");
  }
});

//Check if SpaCy is ready.
pyshell.send("check");

//Generate Random Unique TAG

//sleep function
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const parse = async ({ text = "", TimeoutLimit = 30000 }) => {
  if (!text || text.length <= 0) return { valid: false };
  return new Promise(async (resolve, reject) => {
    // check if its ready and if yes then continue
    while (!isReady()) {
      console.log("Waiting for SpaCy to be ready");
      await sleep(2000);
    }
    let responded = false;

    const TAG =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    ProcessEmitter.on(TAG, (message = Type) => {
      // console.log(message);
      ProcessEmitter.removeAllListeners(TAG);
      responded = true;
      resolve(message);
    });

    Parse(ProcessEmitter, pyshell, { TAG, query: text });
    setTimeout(() => {
      if (!responded) {
        ProcessEmitter.removeAllListeners(TAG);
        reject({ error: "No response received, Time out" });
      }
    }, TimeoutLimit);
  });
};

process.on("SIGINT", function () {
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    //   console.log("The exit code was: " + code);
    //   console.log("The exit signal was: " + signal);
    console.log("finished");
  });
  process.exit(0);
});

process.on("exit", function () {
  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    //   console.log("The exit code was: " + code);
    //   console.log("The exit signal was: " + signal);
    console.log("finished");
  });
  process.exit(0);
});
