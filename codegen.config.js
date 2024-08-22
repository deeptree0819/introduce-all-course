const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./introduce-all-course-api/.env" });

const port = process.env.PORT || 8000;
const outPath = path.resolve(`introduce-all-course-web/app/generated/`);

module.exports = {
  enable: true,
  exportCore: false,
  exportService: true,
  url: `http://localhost:${port}/api-json`,
  outPath: outPath,
  servers: [
    {
      url: `http://localhost:${port}`,
      description: "Local server",
    },
  ],
};
