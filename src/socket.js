const io = require("socket.io-client")

class SocketClient {
    start(){
        ioClient = io.connect("http://localhost:3000");
    }
}

module.exports = new SocketClient()