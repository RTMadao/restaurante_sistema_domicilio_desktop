const TimeAgo = require('javascript-time-ago')
const es = require('javascript-time-ago/locale/es')
TimeAgo.addLocale(es)
const timeAgo = new TimeAgo('es')

const url = 'http://localhost:3000/'

var domicilios = [], menus = [], nombrePlato, nombreBarrio

document.addEventListener('DOMContentLoaded', function() {
    var elemsD = document.querySelectorAll('.autocompleteD');
    var elemsM = document.querySelectorAll('.autocompleteM');

    get('domicilio')
    .then(domicilio => {
        domicilios = domicilio
        let data = {}
        for (let i = 0; i < domicilio.length; i++) {
            data[domicilio[i].barrio] = null
        }
        var instances = M.Autocomplete.init(elemsD, {
            data: data,
            limit: 5,
            onAutocomplete: (text) => {
                nombreBarrio = text
                const found = domicilios.find(element => element.barrio == text)
                app.nuevoPedido.barrio = found.barrio
                app.nuevoPedido.pedido.valorDomicilio = found.valor
            }
        });
    })

    get('menu')
    .then(menu => {
        menus = menu
        let dataM = {}
        for (let i = 0; i < menu.length; i++) {
            dataM[menu[i].nombre] = null
        }
        var instances = M.Autocomplete.init(elemsM, {
            data: dataM,
            limit: 5,
            onAutocomplete: (text) => {
                nombrePlato = text
            }
        });
    })
});


function post(body) {
    return new Promise ((resolve, reject) => {
        axios.post(url+'pedido', body)
        .then(function(res) {
            console.log(res.data.mensaje)
            resolve(res.data.mensaje)
        })
        .catch(function(err) {
            console.log(err);
        })
    })
}

function put(body) {
    return new Promise ((resolve, reject) => {
        axios.put(url+'pedido', body)
        .then(function(res) {
            console.log(res.data.mensaje)
            resolve(res.data.mensaje)
        })
        .catch(function(err) {
            console.log(err);
        })
    })
}

function get(filtro) {
    return new Promise ((resolve, reject) => {
        axios.get(url+filtro, {
        responseType: 'json'
      })
        .then(function(res) {
          resolve(res.data.lista)
        })
        .catch(function(err) {
          console.log(err);
        })
    })
}

var app = new Vue({
    el: '#app',
    data: { 
      pedidos: '',
      nuevoPedido:{
        nombre: '',
        barrio: '',
        direccion: '',
        telefono: '',
        pedido:{
            platos: [],
            valorDomicilio: 0,
            base: 0
        }
      },
      item: {
          nombre:'',
          cantidad:''
      }
    },
    computed:{
        total: app => app.nuevoPedido.pedido.base + app.nuevoPedido.pedido.valorDomicilio
    },
    created: async function () {
        this.pedidos = await get('pedido/pendiente')
        console.log(this.pedidos);
    },
    methods:{
        guardar(){
            post({
                cliente:{
                    nombre: this.nuevoPedido.nombre,
                    barrio: this.nuevoPedido.barrio,
                    direccion: this.nuevoPedido.direccion,
                    telefono: this.nuevoPedido.telefono,    
                },
                pedido:{
                    platos: this.nuevoPedido.pedido.platos,
                    valorDomicilio: this.nuevoPedido.pedido.valorDomicilio,
                    total: this.total
                }
            })
            .then(res => {
                get('pedido/pendiente')
                .then( lista => {
                    this.pedidos = lista
                }) 
            })
            this.nuevoPedido.nombre = ''
            this.nuevoPedido.barrio = ''
            this.nuevoPedido.telefono = ''
            this.nuevoPedido.direccion = ''
            this.nuevoPedido.pedido.platos = []
            this.nuevoPedido.pedido.valorDomicilio = 0
            this.nuevoPedido.pedido.base = 0
        },
        agregarItem(){
            const found = menus.find(element => {
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
            console.log(pedido);
            
            put(pedido)
            .then(res => {
                get('pedido/pendiente')
                .then( lista => {
                    this.pedidos = lista
                }) 
            }) 
        }
    }
})