// scrapers/index.js

const path = require("path");
const childProcess = require("child_process");

// path to PhantomJS bin
const phantomJsPath = path.normalize(require("phantomjs-prebuilt").path);
// const phantomJsPath = "C:\Users\Alexander\node_modules\phantomjs-prebuilt\lib\phantom\bin\phantomjs.exe";

console.log(__dirname);

exports.fetch = function(url, reject, resolve) {
  // execute phantom-script.js file via PhantomJS
  const childArgs = [path.join(__dirname, "phantom-script.js")];
  const phantom = childProcess.execFile(phantomJsPath, childArgs, {
    env: {
      URL: url
    },
    maxBuffer: 2048 * 1024
  });

  let stdout = "";
  let stderr = "";

  // data comes gradually, bit by bit
  phantom.stdout.on("data", function(chunk) {
    stdout += chunk;
  });

  phantom.stderr.on("data", function(chunk) {
    stderr += chunk;
  });

  phantom.on("uncaughtException", function(err) {
    console.log("uncaught exception: " + err);
  });

  phantom.on("exit", function(exitCode) {
    if (exitCode !== 0) {
      return reject(stderr);
    }

    resolve(stdout);
  });
};
