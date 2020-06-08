const d3 = require('d3-fetch')
const UTFCoding = require('./UTFCoding')

class CSVReader {
    
    parseData(path) {  
        return new Promise ((resolve, reject) => {
            d3.dsv(';',path)
            .then(data => {
                resolve(data)
            })
        })  
        
    }

    decodeData(data){
        data.forEach(element => {
            element.nombre = UTFCoding.decode_utf8(element.nombre);
        });
        return data
    }
}

module.exports = new CSVReader();