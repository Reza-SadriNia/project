const express = require("express")
const mongoose = require("mongoose")
const app = express()
const path = require("path")
const http = require("http")

module.exports = class Application {
  // #express = require("express")
  // #app = this.#express()
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL)
    this.configApplication()
    this.cerateServer(PORT)
    this.createRoutes()
    this.errorHandler()
  }
  configApplication() {
    // const path = require("path")
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(express.static(path.join(__dirname, "..", "public")))
  }
  cerateServer(PORT) {
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`server is running on http://localhost:${PORT}`);
    })
  }
  configDatabase(DB_URL) {
    mongoose.connect(DB_URL, (err) => {
      if (err) throw err
      console.log("connected To DB...");
    })

  }
  errorHandler() {
    app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Page Not Found!"
      })
    })
    app.use((err, req, res, nexr) => {
      const status = err?.status || 500
      const message = err?.message || "internal Server ERROR"
      return res.status(status).json({
        status,
        success: false,
        message
      })
    })
  }
  createRoutes() {
    app.get("/", (req, res, next) => {
      return res.json({
        message: "New Express APP"
      })
    })
  }
}