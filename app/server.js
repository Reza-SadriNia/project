const mongoose = require("mongoose")

module.exports = class Application {
  #express = require("express")
  #app = this.#express()
  constructor(PORT, DB_URL) {
    this.configDatabase(DB_URL)
    this.configApplication()
    this.cerateServer(PORT)
    this.createRoutes()
    this.errorHandler()
  }
  configApplication() {
    const path = require("path")
    this.#app.use(this.#express.json())
    this.#app.use(this.#express.urlencoded({ extended: true }))
    this.#app.use(this.#express.static(path.join(__dirname, "..", "public")))
  }
  cerateServer(PORT) {
    const http = require("http")
    const server = http.createServer(this.#app);
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
    this.#app.use((req, res, next) => {
      return res.status(404).json({
        status: 404,
        success: false,
        message: "Page Not Found!"
      })
    })
    this.#app.use((err, req, res, nexr) => {
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
    this.#app.get("/", (req, res, next) => {
      return res.json({
        message: "New Express APP"
      })
    })
  }
}