import pkg from "../../package.json" assert { type: "json" };
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getProjectData = async (req, res) => {
  res.json({
    message: "Welcome greetings app",
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
    author: pkg.author,
  });
};

// Factory function to generate handlers
const createTxtHandler = (filename) => {
  return async (req, res) => {
    try {
      // Verify allowed files
      const allowedFiles = ["hello_world", "api_docs"];

      if (!allowedFiles.includes(filename)) {
        return res.status(403).send("Unauthorized");
      }

      const filePath = path.join(__dirname, "../resources", `${filename}.txt`);
      const data = await fs.readFile(filePath, "utf-8");

      res.type("text/plain").send(data);
    } catch (err) {
      if (err.code === "ENOENT") {
        res.status(404).send("File Not Found");
      } else {
        console.error(err);
        res.status(500).send("Internal Server Error");
      }
    }
  };
};

// Export specific handlers
export const getHelloWorld = createTxtHandler("hello_world");
export const getApiDocs = createTxtHandler("api_docs");
