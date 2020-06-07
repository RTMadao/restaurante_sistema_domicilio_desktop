const fs = require('fs')
const jsPDF = require('jspdf/dist/jspdf.node.min')

class FacturaPDF {

    constructor(){
        this.doc = new jsPDF({
            orientation: 'p',
            unit: 'px',
            format: [16, 9.5]
          })
    }
    
    estructurarInfo(pedido) {  
        let linea = 10
        this.doc.setFontSize(22);
        this.doc.text('Respaturante Rico Mondongo', 10, linea)
        linea += 20
    }

    getDoc(){
        return this.doc.output()
    }

    generarDocumento(nombre){
        global.window = {document: {createElementNS: () => {return {}} }};
        global.navigator = {};
        global.btoa = () => {};

        fs.writeFileSync(`./facturas/${nombre}.pdf`, this.doc.output())

        delete global.window;
        delete global.navigator;
        delete global.btoa;
    }
}

module.exports = new FacturaPDF();