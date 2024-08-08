const fs = require("fs");
const path = require("path");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const OpenAPI = require("openapi-typescript-codegen");
const config = require("../codegen.config");
const axios = require("axios");

async function fetchOpenApiJson(url) {
  const response = await axios.get(url);
  return response.data;
}

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

      const openApiJson = await fetchOpenApiJson(config.url);
      openApiJson.servers = config.servers;

      const tempFilePath = path.resolve(config.outPath, "temp-openapi.json");
      fs.writeFileSync(tempFilePath, JSON.stringify(openApiJson, null, 2));

      await OpenAPI.generate({
        input: tempFilePath,
        output: config.outPath,
        exportCore: config.exportCore,
        exportServices: config.exportService,
        httpClient: "axios",
        indent: "2",
      });

      fs.unlinkSync(tempFilePath); // Clean up temporary file

      await exec(`npx prettier --write --loglevel silent ${config.outPath}`);
    }
  } catch (err) {
    console.error(err);
  }
}

run();
