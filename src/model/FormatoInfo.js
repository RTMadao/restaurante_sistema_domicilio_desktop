class FormatosInfo {
    
    moneda(valor){
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(valor);
    }
      
    formatofecha(fecha){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: false};
        return new Date(fecha).toLocaleDateString('es-CO', options)
    }

    encode_utf8(cadena) {
        return unescape(encodeURIComponent(cadena));
    }
      
    decode_utf8(cadena) {
        return decodeURIComponent(escape(cadena));
    }
 
}

module.exports = new FormatosInfo();