const http = require("http")

http.createServer((req, res) => {
    res.write("Servidor 2")
    res.end()
}).listen(4002)