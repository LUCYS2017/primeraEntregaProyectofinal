const { promises: fs } = require('fs')

async function readFiles(file){
    try{
        const contenido = await fs.promises.readFile(file);      
        return contenido; 
    }
    catch(error){
        console.log(error);
    }
};

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async listar(id) {     
        try{  
            const info = await readFiles(this.ruta);   
            let ban=0;     
            for(const item of info){
                if(item.id == id){
                    console.log(item); 
                    ban=1;              
                }
            } 
            if(ban==0){
                console.log('Registro no existe'); 
            }  
        }  
        catch(error){
            console.log(error);
        }  
          
    }

    async listarAll() {
        try{
            const info = await readFiles(this.ruta);
            console.log(info);
        }      
        catch(error){
            console.log(error);
        }       
    }

    async guardar(obj) {
        try{
            const info = await readFiles(this.ruta);  
            let i=0;
            for(const item of info){
            if(item.id > i){
                i=item.id;
            }
            }
            i++;
            info.push({id:i, title:obj.title, price:obj.price, thumbnail:obj.thumbnail})          
            console.log('1 registro agregado');
            console.log(info);
            await fs.promises.writeFile(this.ruta, info);
        }      
        catch(error){
            console.log(error);
        }
    }

    async actualizar(elem, id) {
        try{
            const info = await readFiles(this.ruta);  
            newInfo = [];            
            for(const item of info){
                if(item.id == id){
                    newInfo.push({id:id, title:elem.title, price:elem.price, thumbnail:elem.thumbnail})     
                }
                else{
                    newInfo.push(item) 
                }
            }
            console.log('1 registro modificado');
            console.log(newInfo);
            await fs.promises.writeFile(this.ruta, newInfo);
        }      
        catch(error){
            console.log(error);
        }
    }

    async borrar(id) {
        try{
            const info = await readFiles(this.ruta);  
            newInfo = [];            
            for(const item of info){
                if(item.id != id){
                    newInfo.push(item)    
                }                
            }
            console.log('1 registro borrado');
            console.log(newInfo);
            await fs.promises.writeFile(this.ruta, newInfo);
        }      
        catch(error){
            console.log(error);
        }
    }

    async borrarAll() {
        try {
            info = []; 
            await fs.promises.writeFile(this.ruta, info);
        } catch(error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorArchivo 