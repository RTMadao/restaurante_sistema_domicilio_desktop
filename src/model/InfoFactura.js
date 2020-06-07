class InfoFactura {
    constructor(){
        this.Info
        this.instance = null
    }

    static getInstamce(){
        let f
        if(this.instance == null) f = new InfoFactura()
    }


}

