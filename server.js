const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);

server.use(jsonServer.bodyParser);

server.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "username12" && password === "password") {
    res.status(200).jsonp({ id: 1, username });
  } else {
    res.status(500).jsonp({ errorType: "noUser" });
  }
});

server.post("/invoice", (req, res) => {
  const invoice = req.body;
  if (invoice) {
    res.status(200).jsonp(invoice);
  } else {
    res.status(500).jsonp({ errorType: "badRequest" });
  }
});

server.use(router);
server.listen(3000, () => {
  console.log("JSON Server is running");
});
