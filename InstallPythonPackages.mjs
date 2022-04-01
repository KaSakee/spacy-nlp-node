import { exec } from "child_process";

export default async () => {
  return new Promise(async (resolve, reject) => {
    console.info("Installing Spacy");

    //exec command to install SpaCy and show the output in console real time

    exec(
      "pip install -r ./node_modules/spacy-nlp-node/requirements.txt",
      async (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }

        console.log(stdout);
        console.log(stderr);

        console.info("Installing en_core_web_trf");
        await Downloaden_core_web_trf();
        resolve(true);
      }
    );
  });
};

const Downloaden_core_web_trf = async () => {
  return new Promise(async (resolve, reject) => {
    exec(
      "python3 -m spacy download en_core_web_trf",
      async (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          reject(err);
          return;
        }
        console.log(stdout);
        console.log(stderr);
        resolve(true);
      }
    );
  });
};
