const Application = require("./app/server.js")
const DB_URL = "mongodb://localhost:27017/Project"
new Application(3000, DB_URL)