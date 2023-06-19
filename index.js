const http = require("http");
const host = "localhost";
const port = 3000;

let tasks = [
  {
    id: 1,
    descripcion: "Tarea1",
    completada: false,
  },
  {
    id: 2,
    descripcion: "Tarea2",
    completada: false,
  },
  {
    id: 3,
    descripcion: "Tarea3",
    completada: false,
  },
];

const handleGetRequest = (res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(tasks));
};

const handlePostRequest = (req, res) => {
  let requestBody = "";
  req.on("data", (chunk) => {
    requestBody += chunk.toString();
  });
  req.on("end", () => {
    const newTask = JSON.parse(requestBody);
    newTask.id = tasks.length + 1;
    tasks.push(newTask);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newTask));
  });
};

const handleRequest = (req, res) => {
  const url = new URL(req.url, `http://${host}:${port}`);

  if (url.pathname === "/tasks") {
    if (req.method === "GET") {
      handleGetRequest(res);
    } else if (req.method === "POST") {
      handlePostRequest(req, res);
    } else {
      res.writeHead(405); // Método no permitido
      res.end();
    }
  } else {
    res.writeHead(404); // Ruta no encontrada
    res.end();
  }
};

const server = http.createServer(handleRequest);

server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
