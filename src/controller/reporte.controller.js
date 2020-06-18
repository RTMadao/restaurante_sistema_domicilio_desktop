const url = 'http://localhost:3000/reporte'
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

function post(body) {
    return new Promise ((resolve, reject) => {
        axios.post(url, body)
        .then(function(res) {
            console.log(res.data.mensaje)
            resolve(res.data.mensaje)
        })
        .catch(function(err) {
            console.log(err);
        })
    })
}

function get() {
    return new Promise ((resolve, reject) => {
        axios.get(url, {
        responseType: 'json'
      })
        .then(function(res) {
          resolve(res.data.reporte)
        })
        .catch(function(err) {
          console.log(err);
        })
    })
}

var app = new Vue({
    el: '#app',
    data: {
        reporte: ''
    },
    computed:{
    },
    methods:{
        generar(){
            const modalPath = path.join('file://', __dirname, '/Ireporte.html')
            let win = new BrowserWindow({ width: 400, height: 500, webPreferences: { nodeIntegration: true } })
            win.on('close', function () { win = null })
            win.loadURL(modalPath)
            win.show()
            
        }
    }
})