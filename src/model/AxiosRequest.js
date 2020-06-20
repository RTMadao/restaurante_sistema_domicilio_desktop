const axios = require('axios');
const {serverURL} = require('../config')

class AxiosRequest {
    post(body,filtro) {
        return new Promise ((resolve, reject) => {
            axios.post(serverURL+filtro, body)
            .then(function(res) {
                resolve(res.data.mensaje)
            })
            .catch(function(err) {
                console.log(err);
            })
        })
    }
    
    get(filtro) {
        return new Promise ((resolve, reject) => {
            axios.get(serverURL+filtro, {
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

    put(body,filtro) {
        return new Promise ((resolve, reject) => {
            axios.put(serverURL+filtro, body)
            .then(function(res) {
                resolve(res.data.mensaje)
            })
            .catch(function(err) {
                console.log(err);
            })
        })
    }

    delete(filtro) {
        return new Promise ((resolve, reject) => {
            axios.delete(serverURL+filtro)
            .then(function(res) {
                resolve(res.data.mensaje)
            })
            .catch(function(err) {
                console.log(err);
            })
        })
    }
}

module.exports = new AxiosRequest();