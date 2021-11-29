const Band = require("./Band");


class BandList{
    constructor(){
        this.bands = [
            new Band('Blondie'),
            new Band('Michael Jackson'),
            new Band('U2'),
            new Band('Maddona')
        ]
    }

    añadirBanda(nameBand){
        this.bands.push(new Band(nameBand))
        return this.bands;
    }

    borrarBanda(uid){
        this.bands =  this.bands.filter(band => band.id !== uid);
    }

    mostrarBandas(){
        return this.bands;
    }

    incrementarVotos(uid){
        this.bands = this.bands.map(band => {
            if(band.id === uid)band.votes += 1;
            
            return band;
        })
    }

    cambiarNombre(uid,name){
        this.bands = this.bands.map(band => {
            if(band.id === uid)band.name =name;
            
            return band;
        })
    }

    
}

module.exports = BandList;