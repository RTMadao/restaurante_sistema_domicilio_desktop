class UTFCoding {
    
    encode_utf8(cadena) {
        return unescape(encodeURIComponent(cadena));
    }
      
    decode_utf8(cadena) {
        return decodeURIComponent(escape(cadena));
    }
      
}

module.exports = new UTFCoding();