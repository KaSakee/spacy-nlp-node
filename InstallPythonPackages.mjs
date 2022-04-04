import { exec } from "child_process";

let CallInstallOnce = false;
let InstallModelOnce = false;
const Install = async (pip = "pip", python = "python") => {
  return new Promise(async (resolve, reject) => {
    let IsExisted = false;
    const CheckIfPackagesInstalled_call = await CheckIfPackagesInstalled();
    const { pip, python } = CheckIfPackagesInstalled_call
      ? CheckIfPackagesInstalled_call
      : {};
    if (pip || python) {
      IsExisted = await CheckIfPackagesInstalled(pip, python);
    }
    if (IsExisted) return resolve(true);
    //exec command to install SpaCy and show the output in console real time

    console.info("Installing Spacy");

    exec(
      `${pip} install -r ./node_modules/spacy-nlp-node/requirements.txt`,
      async (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          if (!CallInstallOnce) {
            CallInstallOnce = true;
            resolve({ pip: "pip3", python: "python3" });
          } else {
            reject(false);
          }
          return;
        }

        console.log(stdout);
        console.log(stderr);

        console.info("Installing en_core_web_trf");
        const Downloaden_core_web_trf_call = await Downloaden_core_web_trf();
        const { pip, python } = Downloaden_core_web_trf_call
          ? Downloaden_core_web_trf_call
          : {};
        if (pip || python) {
          await Downloaden_core_web_trf(pip, python);
        }
        resolve(true);
      }
    );
  });
};

const Downloaden_core_web_trf = async (pip = "pip", python = "python") => {
  return new Promise(async (resolve, reject) => {
    exec(
      `${python} -m spacy download en_core_web_trf`,
      async (err, stdout, stderr) => {
        if (err) {
          console.error(err);
          if (!InstallModelOnce) {
            InstallModelOnce = true;
            resolve({ pip: "pip3", python: "python3" });
          } else {
            reject(false);
          }
          return;
        }
        console.log(stdout);
        console.log(stderr);
        resolve(true);
      }
    );
  });
};

let CheckIfPackagesInstalledCalledOnce = false;
const CheckIfPackagesInstalled = async (pip = "pip", python = "python") => {
  return new Promise(async (resolve, reject) => {
    exec(`${pip} list`, async (err, stdout, stderr) => {
      if (err) {
        console.error(err);
        if (!CheckIfPackagesInstalledCalledOnce) {
          CheckIfPackagesInstalledCalledOnce = true;
          resolve({ pip: "pip3", python: "python3" });
        } else {
          reject(false);
        }
        return;
      }

      console.info("Spacy installed?", stdout.includes("spacy"));
      console.info(
        "en_core_web_trf installed?",
        stdout.includes("en-core-web-trf")
      );

      if (stdout.includes("spacy") && stdout.includes("en-core-web-trf"))
        return resolve(true);
      resolve(false);
    });
  });
};
export default Install;
