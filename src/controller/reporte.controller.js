const url = 'http://localhost:3000/reporte'

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
            get()
            .then(res => {
                this.reporte = res
            })
            console.log(this.reporte);
            
        }
    }
})