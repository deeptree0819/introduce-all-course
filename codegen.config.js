const dotenv = require("dotenv");
const path = require("path");
dotenv.config({ path: "./introduce-all-course-api/.env" });

const port = process.env.PORT || 8000;
const frontOutPath = path.resolve(`introduce-all-course-web/app/generated/`);

module.exports = {
  enable: true,
  exportCore: true,
  exportService: true,
  url: `http://localhost:${port}/api-json`,
  outPath: frontOutPath,
};
