const AxiosRequest = require('../model/AxiosRequest')

class DataStorage {
    async loadData(){
        const pedido = await AxiosRequest.get('pedido')
        const menu = await AxiosRequest.get('menu')
        const domicilio = await AxiosRequest.get('domicilio')
        localStorage.setItem('pedido',JSON.stringify(pedido))
        localStorage.setItem('menu',JSON.stringify(menu))
        localStorage.setItem('domicilio',JSON.stringify(domicilio))
    }
    setData(key,value,filtro){
        return new Promise (async(resolve, reject) => {
            await AxiosRequest.post(value,(filtro==undefined) ? key : key+filtro)
            const data = await AxiosRequest.get(key)
            localStorage.setItem(key,JSON.stringify(data))
            resolve(null)
        })
    }
    updateData(key,value){
        return new Promise (async(resolve, reject) => {
            await AxiosRequest.put(value,key)
            const data = await AxiosRequest.get(key)
            localStorage.setItem(key,JSON.stringify(data))
            resolve(null)
        })
    }
    deleteData(key,id){
        return new Promise (async(resolve, reject) => {
            await AxiosRequest.delete((id==undefined) ? key : key+'/'+id)
            const data = await AxiosRequest.get(key)
            console.log(data);
            localStorage.setItem(key,JSON.stringify(data))
            resolve(null)
        })
    }
    getdata(key){
        return JSON.parse(localStorage.getItem(key))
    }
}

module.exports = new DataStorage()