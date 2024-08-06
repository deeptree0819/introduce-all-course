const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const OpenAPI = require("openapi-typescript-codegen");
const config = require("../codegen.config");

async function run() {
  if (!config.enable) {
    return;
  }

  try {
    if (config.url && config.outPath) {
      const modelPath = path.resolve(config.outPath, "models");
      const servicePath = path.resolve(config.outPath, "services");
      const corePath = path.resolve(config.outPath, "core");

      if (fs.existsSync(modelPath)) {
        fs.rmSync(modelPath, { recursive: true });
      }

      if (fs.existsSync(servicePath) && config.exportService) {
        fs.rmSync(servicePath, { recursive: true });
      }

      if (fs.existsSync(corePath) && config.exportCore) {
        fs.rmSync(corePath, { recursive: true });
      }

      await OpenAPI.generate({
        input: config.url,
        output: config.outPath,
        exportCore: config.exportCore,
        exportServices: config.exportService,
        httpClient: "axios",
        indent: "2",
      });

      await exec(`npx prettier --write --loglevel silent ${config.outPath}`);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
