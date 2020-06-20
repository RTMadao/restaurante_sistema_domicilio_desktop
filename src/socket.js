const io = require("socket.io-client")
const {dataStorage,PedidoStorage,DomicilioStorage,MenuStorage}  = require('./model/DataStorage')

class SocketClient {

    constructor(){
        this.ioClient
    }

    start(){
        this.ioClient = io.connect("http://localhost:3000");
        this.ioClient.on('loadData', (data) => {
            const {pedidos,domicilios,menu} = data
            dataStorage.loadData(pedidos,PedidoStorage)
            dataStorage.loadData(domicilios,DomicilioStorage)
            dataStorage.loadData(menu,MenuStorage)
        })
    }
}

module.exports = new SocketClient()