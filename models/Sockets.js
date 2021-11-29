const BandList = require("./BandList");


class Sockets {

    constructor( io ) {

        this.io = io;

        this.socketEvents();

        this. bandLIst = new BandList();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', ( newSocket ) => {

            console.log('cliente conectado', newSocket.id);
            //Emitir al cliente conectado, todas las bandas
            newSocket.emit('mandar-bandas', this.bandLIst.mostrarBandas());
            
            //Escuchar evento para añadir banda
            newSocket.on('añadir-voto', ({id}) => {
                //Utilizar metodo para incrementar las bandas
                this.bandLIst.incrementarVotos(id);
                   //Emitir a todos los clientes los votos actualizados 
                this.io.emit('mandar-bandas', this.bandLIst.mostrarBandas());
            });

            //Escuchar evento para borrar banda
            newSocket.on('borrar-banda', ({id})=>{
                //Metodo para borrar banda
                this.bandLIst.borrarBanda(id);
                //Emititr a todos los clientes los votos actualizados
                this.io.emit('mandar-bandas', this.bandLIst.mostrarBandas());
            } );
            
            //Escuchar para cambiar nombre
            newSocket.on('cambiar-nombre', ({id,nombre }) => {
                this.bandLIst.cambiarNombre(id,nombre);
                this.io.emit('mandar-bandas', this.bandLIst.mostrarBandas());
            });

            newSocket.on('nueva-banda', ({nombre}) => {
                this.bandLIst.añadirBanda(nombre.trim());
                this.io.emit('mandar-bandas', this.bandLIst.mostrarBandas());
            });
        });

    }



}


module.exports = Sockets;