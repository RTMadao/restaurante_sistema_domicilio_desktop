const CSVreader = require('../model/CSVReader')
const dataStorage = require('../model/DataStorage')
const formato = require('../model/FormatoInfo')


var app = new Vue({
    el: '#app',
    data: {
      barrios:'',
      nuevoBarrio:{
          _id:'',
          barrio:'',
          valor:''
      },
      estaActualizando: false,
      archivoCSV:''
    },
    created: function () {
        this.barrios = dataStorage.getdata('domicilio')
    },
    computed:{
    },
    methods:{
        guardar(){
            dataStorage.setData('domicilio',{
                barrio: this.nuevoBarrio.barrio,
                valor: this.nuevoBarrio.valor
            })
            .then(res => {
                this.nuevoBarrio.barrio = ''
                this.nuevoBarrio.valor = ''
                this.barrios = dataStorage.getdata('domicilio')
            })
        },
        actualizar(){
            dataStorage.updateData('domicilio',this.nuevoBarrio)
            .then(res => {
                this.nuevoBarrio._id = ''
                this.nuevoBarrio.barrio = ''
                this.nuevoBarrio.valor = ''
                this.barrios = dataStorage.getdata('domicilio')
            })
            this.estaActualizando = false
        },
        guardarDesdeCSV(){
            CSVreader.parseData(this.archivoCSV)
            .then( async domicilioCSV => {
                await dataStorage.setData('domicilio',domicilioCSV,'/conjunto')
                this.archivoCSV = ''
                this.barrios = dataStorage.getdata('domicilio')
            })
            
        },
        formatoMoneda(valor){
            return formato.moneda(valor)
        },
        editar(infoDomicilio){
            this.nuevoBarrio._id = infoDomicilio._id
            this.nuevoBarrio.barrio = infoDomicilio.barrio
            this.nuevoBarrio.valor = infoDomicilio.valor
            this.estaActualizando = true
        },
        eliminar(infoDomicilio){
            const deseaEliminar = confirm(`Esta seguro que desea eliminar el barrio ${infoDomicilio.barrio}`)
            if(deseaEliminar){
                dataStorage.deleteData('domicilio',infoDomicilio._id)
                .then(res => {
                    this.barrios = dataStorage.getdata('domicilio')
                })
            }
        }
    }
})