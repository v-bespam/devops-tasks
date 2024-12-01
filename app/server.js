import { createServer } from "http";
import os from "os";

const HOSTNAME = os.hostname();
const PORT = process.env.PORT;
const AUTHOR = process.env.AUTHOR;
const UUID = process.env.UUID;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  try {
    if (req.url == "/hostname" && req.method === "GET") {
      res.write(JSON.stringify(HOSTNAME));
    } else if (req.url == "/author" && req.method === "GET") {
      res.write(JSON.stringify(AUTHOR));
    } else if (req.url == "/id" && req.method === "GET") {
      res.write(JSON.stringify(UUID));
    } else {
      res.statusCode = 404;
      res.write(JSON.stringify({ message: "Route not found" }));
    }
  } catch (error) {
    res.statusCode = 500;
    res.write(JSON.stringify({ message: "Internal Server Error" }));
    console.error("Error handling request:", error);
  }

  res.end();
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
