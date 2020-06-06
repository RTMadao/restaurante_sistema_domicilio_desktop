const url = 'http://localhost:3000/domicilio'

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
      barrios:'',
      nuevoBarrio:{
          barrio:'',
          valor:''
      }
    },
    created: async function () {
        this.barrios = await get()
    },
    computed:{
    },
    methods:{
        guardar(){
            post({
                barrio: this.nuevoBarrio.barrio,
                valor: this.nuevoBarrio.valor
            })
            .then( async res => {
                this.nuevoBarrio.barrio = ''
                this.nuevoBarrio.valor = ''
                this.barrios = await get()
            })
        }
    }
})