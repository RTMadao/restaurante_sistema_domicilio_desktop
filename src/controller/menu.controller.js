const url = 'http://localhost:3000/menu'
const CSVreader = require('../model/CSVReader')
const AxiosRequest = require('../model/AxiosRequest')


function getCSV(file) {
    app.archivoCSV = file[0].path;
}



var app = new Vue({
    el: '#app',
    data: {
      menu:'',
      nuevoPlato:{
          nombre:'',
          precio:''
      },
      archivoCSV:''
    },
    created: async function () {
        this.menu = await AxiosRequest.get(url)
    },
    computed:{
    },
    methods:{
        guardar(){
            AxiosRequest.post({
                nombre: this.nuevoPlato.nombre,
                precio: this.nuevoPlato.precio
            }, url)
            .then( async res => {
                this.nuevoPlato.nombre = ''
                this.nuevoPlato.precio = ''
                this.menu = await AxiosRequest.get(url)
            })
        },
        guardarDesdeCSV(){
            CSVreader.parseData(this.archivoCSV)
            .then( async menuCSV => {
                await AxiosRequest.post(menuCSV, url+'/conjunto')
                this.menu = await AxiosRequest.get(url)
            })
            
        }
    }
})