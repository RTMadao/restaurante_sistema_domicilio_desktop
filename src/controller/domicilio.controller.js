const url = 'http://localhost:3000/domicilio'
const CSVreader = require('../model/CSVReader')
const AxiosRequest = require('../model/AxiosRequest')


function getCSV(file) {
    app.archivoCSV = file[0].path;
}

var app = new Vue({
    el: '#app',
    data: {
      barrios:'',
      nuevoBarrio:{
          barrio:'',
          valor:''
      },
      archivoCSV:''
    },
    created: async function () {
        this.barrios = await AxiosRequest.get(url)
    },
    computed:{
    },
    methods:{
        guardar(){
            AxiosRequest.post({
                barrio: this.nuevoBarrio.barrio,
                valor: this.nuevoBarrio.valor
            }, url)
            .then( async res => {
                this.nuevoBarrio.barrio = ''
                this.nuevoBarrio.valor = ''
                this.barrios = await AxiosRequest.get(url)
            })
        },
        guardarDesdeCSV(){
            CSVreader.parseData(this.archivoCSV)
            .then( async domiciliosCSV => {
                await AxiosRequest.post(domiciliosCSV, url+'/conjunto')
                this.barrios = await AxiosRequest.get(url)
            })
            
        }
    }
})