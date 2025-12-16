const jsonServer = require("json-server");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const SECRET = "ciftci_secret";

server.use(cors());
server.use(jsonServer.bodyParser);
server.use(middlewares);

// REGISTER
server.post("/register", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  const exists = db.get("users").find({ email }).value();
  if (exists) {
    return res.status(400).json({ message: "Kullanıcı var" });
  }

  db.get("users")
    .push({ id: Date.now(), email, password })
    .write();

  res.status(201).json({ message: "Kayıt başarılı" });
});

// LOGIN
server.post("/login", (req, res) => {
  const { email, password } = req.body;
  const db = router.db;

  const user = db.get("users").find({ email, password }).value();
  if (!user) {
    return res.status(401).json({ message: "Hatalı giriş" });
  }

  const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: "1h" });
  res.json({ token });
});

server.use(router);

server.listen(5000, () => {
  console.log("🚀 Backend çalışıyor (5000)");
});
