const url = 'http://localhost:3000/menu'

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
      menu:'',
      nuevoPlato:{
          nombre:'',
          precio:''
      }
    },
    created: async function () {
        this.menu = await get()
    },
    computed:{
    },
    methods:{
        guardar(){
            post({
                nombre: this.nuevoPlato.nombre,
                precio: this.nuevoPlato.precio
            })
            .then( async res => {
                this.nuevoPlato.nombre = ''
                this.nuevoPlato.precio = ''
                this.menu = await get()
            })
        }
    }
})