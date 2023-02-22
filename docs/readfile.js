let fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const YAML = require('yaml');

const obj = yaml.load(fs.readFileSync('definitivos.yaml', { encoding: 'utf-8' }));

fs.writeFileSync('elyaml.json', JSON.stringify(obj, null, 2));

fs.readFile('elyaml.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('error: ', err);
    } else {

        const json = JSON.parse(data);
        const paths = json.paths;
        const xrd = json.components;
        let schemas = xrd.schemas;
        const component = Object.keys(xrd).map(function (y) {
            let comp = xrd[y];
            return comp;
        });
        const count = Object.keys(paths).length;
        const accso = Object.keys(paths).map(function (x) {
            let elemento = paths[x];
            return elemento;
        });
        let interno = Object.keys(schemas).map(function (z) {
            let sch = schemas[z];
            return sch;
        });
        console.log(count);
        let definitivoComponent = { 'components': { 'schemas': component[0] } }
        for (let i = 0; i < count; i++) {

            const docYaml = new YAML.Document();
            docYaml.contents = accso[i];
            const ContenidoYaml = docYaml.toString();
            const ComponentYaml = new YAML.Document();
            ComponentYaml.contents = definitivoComponent;
            const ContenidoComponentYaml = ComponentYaml.toString();
            //console.log(accso[126]);
            const nombreNuevo = accso[i].post.summary;
            const nombreCarpeta = accso[i].post.tags[0];

            const reInterno = definitivoComponent.components;
            const nombre = reInterno.schemas;
            const nueva = Object.keys(nombre);
            const extension = {$ref: nombreCarpeta+'/'+nombreNuevo+'.yaml'};
            const extYaml = new YAML.Document();
            extYaml.contents = extension;
            const yaa = extYaml.toString();

            
            const rutaArchivo = [];
            rutaArchivo.push('/'+nombreNuevo+':');
            

           const rutaDefinitiva = JSON.stringify(rutaArchivo +yaa); 
   
            //console.log(rutaDefinitiva);
            //rutaArchivo.push('/'+nombreNuevo);
            

            fs.appendFile('../openapi/paths/pruebaArchivo2.yaml', rutaDefinitiva  , (err) => {
                if (err) throw err;
                console.log('Archivo'+nombreNuevo+'Creado Satisfactoriamente, numero:'+i);
            });

            /*fs.mkdirSync('../openapi/paths/'+nombreCarpeta,{recursive:true});*/

            /*fs.appendFile('../openapi/paths/'+nombreCarpeta+'/'+nombreNuevo+'.yaml', ContenidoYaml + ContenidoComponentYaml, (err) => {
                if (err) throw err;
                console.log('Archivo'+nombreNuevo+'Creado Satisfactoriamente, numero:'+i);
            });*/

        }
    }
});