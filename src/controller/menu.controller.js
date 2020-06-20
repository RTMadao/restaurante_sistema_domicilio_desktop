const CSVreader = require('../model/CSVReader')
const dataStorage = require('../model/DataStorage')
const formato = require('../model/FormatoInfo')


var app = new Vue({
    el: '#app',
    data: {
      menu:'',
      nuevoPlato:{
          _id:'',
          nombre:'',
          precio:''
      },
      estaActualizando: false,
      archivoCSV:''
    },
    created: function () {
        this.menu = dataStorage.getdata('menu')
    },
    computed:{
    },
    methods:{
        guardar(){
            dataStorage.setData('menu',{
                nombre: this.nuevoPlato.nombre,
                precio: this.nuevoPlato.precio
            })
            .then(res => {
                this.nuevoPlato.nombre = ''
                this.nuevoPlato.precio = ''
                this.menu = dataStorage.getdata('menu')
            })
        },
        actualizar(){
            dataStorage.updateData('menu',this.nuevoPlato)
            .then(res => {
                this.nuevoPlato._id = ''
                this.nuevoPlato.nombre = ''
                this.nuevoPlato.precio = ''
                this.menu = dataStorage.getdata('menu')
            })
            this.estaActualizando = false
        },
        guardarDesdeCSV(){
            CSVreader.parseData(this.archivoCSV)
            .then( async menuCSV => {
                await dataStorage.setData('menu',menuCSV,'/conjunto')
                this.archivoCSV = ''
                this.menu = dataStorage.getdata('menu')
            })
            
        },
        formatoMoneda(valor){
            return formato.moneda(valor)
        },
        editar(infoMenu){
            this.nuevoPlato._id = infoMenu._id
            this.nuevoPlato.nombre = infoMenu.nombre
            this.nuevoPlato.precio = infoMenu.precio
            this.estaActualizando = true
        },
        eliminar(infoMenu){
            const deseaEliminar = confirm(`Esta seguro que desea eliminar el plato ${infoMenu.nombre}`)
            if(deseaEliminar){
                dataStorage.deleteData('menu',infoMenu._id)
                .then(res => {
                    this.menu = dataStorage.getdata('menu')
                })
            }
        }
    }
})