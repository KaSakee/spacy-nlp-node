import { PythonShell } from "python-shell";
import Parse from "./Parse.mjs";
import events from "events";
import Type from "./Type.mjs";

import InstallPythonPackages from "./InstallPythonPackages.mjs";
try {
  const InstallPythonPackages_call = await InstallPythonPackages();
  const { pip, python } = InstallPythonPackages_call
    ? InstallPythonPackages_call
    : {};
  if (pip || python) {
    await InstallPythonPackages(pip, python);
  }
} catch (error) {}
console.log("Starting");
const EventEmitter = events.EventEmitter;
const ProcessEmitter = new EventEmitter();

let pyshell = new PythonShell("./node_modules/spacy-nlp-node/SpaCy.py");

let isItReady = false;

export const isReady = () => isItReady;

pyshell.on("message", function (message) {
  if (message == "ready") {
    isItReady = true;
    console.log("Its ready");
    pyshell.removeAllListeners();
  }
});

//Check if SpaCy is ready.
pyshell.send("check");

// pyshell.setMaxListeners( Infinity )

//sleep function
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const parse = async ({ text = "", TimeoutLimit = 30000, index = 0 }) => {
  if (!text || text.length <= 0) return { valid: false };

  return new Promise(async (resolve, reject) => {
    // check if its ready and if yes then continue
    while (!isReady()) {
      console.log("Waiting for SpaCy to be ready");
      await sleep(2000);
    }

    const TAG =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);

    const Data = await Parse(
      ProcessEmitter,
      pyshell,
      { TAG, query: text, TimeoutLimit },
      index
    );

    const { tag, results, error } = Data ? Data : {};

    if (error) return reject({ error: "No response received, Time out" });

    pyshell.removeAllListeners();

    resolve(results);
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

process.on("uncaughtException", function (exception) {
  console.log(exception);

  pyshell.end(function (err, code, signal) {
    if (err) throw err;
    //   console.log("The exit code was: " + code);
    //   console.log("The exit signal was: " + signal);
    console.log("finished");
  });
  process.exit(0);
});
