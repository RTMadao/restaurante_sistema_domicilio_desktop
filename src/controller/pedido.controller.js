//TiME AGO
const TimeAgo = require('javascript-time-ago')
const es = require('javascript-time-ago/locale/es')
TimeAgo.addLocale(es)
const timeAgo = new TimeAgo('es')

//NUEVA VENTANA ELECTRON
const electron = require('electron')
const path = require('path')
const BrowserWindow = electron.remote.BrowserWindow

const dataStorage = require('../model/DataStorage')
const formato = require('../model/FormatoInfo')

var menu = [], nombrePlato, nombreBarrio, factura = 'a'

module.exports = factura

document.addEventListener('DOMContentLoaded', function() {
    var elemsD = document.querySelectorAll('.autocompleteD');
    var elemsM = document.querySelectorAll('.autocompleteM');
    var buttonNew = document.getElementById('btn-new');
    var buttonrefresh = document.getElementById('btn-refresh');

    var instances = M.FloatingActionButton.init(buttonNew, {
        direction: 'right',
        hoverEnabled: false
    });

    var instances = M.FloatingActionButton.init(buttonrefresh, {
        direction: 'right',
        hoverEnabled: false
    });

    const domicilios = dataStorage.getdata('domicilio')
    let data = {}
    for (let i = 0; i < domicilios.length; i++) {
        data[domicilios[i].barrio] = null
    }
    
    var instances = M.Autocomplete.init(elemsD, {
        data: data,
        limit: 5,
        onAutocomplete: (text) => {
            nombreBarrio = text
            const found = domicilios.find(element => element.barrio == text)
            app.nuevoPedido.cliente.barrio = found.barrio
            app.nuevoPedido.pedido.valorDomicilio = found.valor
        }
    });

    menu = dataStorage.getdata('menu')
    data = {}
    for (let i = 0; i < menu.length; i++) {
        data[menu[i].nombre] = null
    }
    var instances = M.Autocomplete.init(elemsM, {
        data: data,
        limit: 5,
        onAutocomplete: (text) => {
            nombrePlato = text
        }
    });
});

var app = new Vue({
    el: '#app',
    data: { 
      pedidos: '',
      nuevoPedido:{
        cliente:{
            nombre: '',
            barrio: '',
            direccion: '',
            telefono: '',
        },
        pedido:{
            platos: [],
            valorDomicilio: 0,
            base: 0,
            total: 0
        }
      },
      factura: {cliente:{nombre:'hola'}},
      item: {
          nombre:'',
          cantidad:''
      }
    },
    computed:{
        total: app => app.nuevoPedido.pedido.base + app.nuevoPedido.pedido.valorDomicilio,
        pendientes: function() {
            return this.pedidos.filter(element => {
                return element.pedido.pendiente
            });
        },
        entregados: function() {
            return this.pedidos.filter(element => {
                return !element.pedido.pendiente
            });
        }
    },
    created: function () {
        this.pedidos = dataStorage.getdata('pedido')
    },
    methods:{
        guardar(){
            this.nuevoPedido.pedido.total = this.total
            dataStorage.setData('pedido',{
                cliente:{
                    nombre: this.nuevoPedido.cliente.nombre,
                    barrio: this.nuevoPedido.cliente.barrio,
                    direccion: this.nuevoPedido.cliente.direccion,
                    telefono: this.nuevoPedido.cliente.telefono,    
                },
                pedido:{
                    platos: this.nuevoPedido.pedido.platos,
                    valorDomicilio: this.nuevoPedido.pedido.valorDomicilio,
                    total: this.total
                }
            })
            .then(res => {
                this.pedidos = dataStorage.getdata('pedido')
            })
            this.nuevoPedido.cliente.nombre = ''
            this.nuevoPedido.cliente.barrio = ''
            this.nuevoPedido.cliente.telefono = ''
            this.nuevoPedido.cliente.direccion = ''
            this.nuevoPedido.pedido.platos = []
            this.nuevoPedido.pedido.valorDomicilio = 0
            this.nuevoPedido.pedido.base = 0
            this.nuevoPedido.pedido.total = 0
        },
        agregarItem(){
            const found = menu.find(element => {
                return element.nombre == nombrePlato
            });
            this.nuevoPedido.pedido.base += found.precio * this.item.cantidad
            this.nuevoPedido.pedido.platos.push({
                nombre: nombrePlato,
                cantidad: this.item.cantidad,
                precio: found.precio,
                total: found.precio * this.item.cantidad
            })
            this.item.nombre = ''
            this.item.cantidad = ''
            
        },
        getTimeAgo(date){
            return timeAgo.format(new Date(date))
        },
        marcarPedidoEntregado(pedido){
            pedido.pedido.pendiente = false
            dataStorage.updateData('pedido',pedido)
        },
        imprimir(data){

            const modalPath = path.join('file://', __dirname, '/factura.html')
            let win = new BrowserWindow({ width: 400, height: 500, webPreferences: { nodeIntegration: true } })
            win.on('close', function () { win = null })
            win.loadURL(modalPath)
            win.show()

            localStorage.setItem('factura',JSON.stringify(data))
        },
        formatoMoneda(valor){
            return formato.moneda(valor)
        },
        abrirFormularioPedido(){
            const modalPath = path.join('file://', __dirname, '/formularioPedido.html')
            let win = new BrowserWindow({ width: 650, height: 700, webPreferences: { nodeIntegration: true } })
            win.on('close', function () { win = null })
            win.loadURL(modalPath)
            win.show()
        },
        refresh(){
            this.pedidos = dataStorage.getdata('pedido')
        },
        eliminar(){

        },
        eliminarPorID(pedido){
            const deseaEliminar = confirm(`Esta seguro que desea eliminar el pedido ${pedido.pedido.consecutivo}`)
            if(deseaEliminar){
                dataStorage.deleteData('pedido',pedido._id)
                .then(res => {
                    this.pedidos = dataStorage.getdata('pedido')
                })
            }
        }
    }
})