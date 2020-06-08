class AxiosRequest {
    post(body, url) {
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
    
    get(url) {
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
}

module.exports = new AxiosRequest();