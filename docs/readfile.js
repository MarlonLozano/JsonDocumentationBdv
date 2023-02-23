let fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const YAML = require('yaml');

const datosArchivo = yaml.load(fs.readFileSync('definitivos.yaml', { encoding: 'utf-8' }));
//Conversión del archivo "yaml" en "json"
fs.writeFileSync('definitivos.json', JSON.stringify(datosArchivo, null, 2));

//Lectura del archivo "json" y se carga la data a la variable "data"
fs.readFile('definitivos.json', 'utf-8', (err, data) => {
    if (err) {
        console.log('error: ', err);
    } else {

        const dataInJson = JSON.parse(data);
        const paths = dataInJson.paths;
        const componentsOfData = dataInJson.components;
        let schemas = componentsOfData.schemas;
        const component = Object.keys(componentsOfData).map(function (y) {
            let comp = componentsOfData[y];
            return comp;
        });
        const numberOfPaths = Object.keys(paths).length;
        const dataOfPaths = Object.keys(paths).map(function (x) {
            let elemento = paths[x];
            return elemento;
        });
        let interno = Object.keys(schemas).map(function (z) {
            let sch = schemas[z];
            return sch;
        });

        let componentEstructure = { 'components': { 'schemas': component[0] } }
        for (let i = 0; i < numberOfPaths; i++) {

            const componentDataInYaml = new YAML.Document();
            componentDataInYaml.contents = dataOfPaths[i];
            const dataComponent = componentDataInYaml.toString();
            const ComponentYaml = new YAML.Document();
            ComponentYaml.contents = componentEstructure;
            const ContenidoComponentYaml = ComponentYaml.toString();
            //console.log(dataOfPaths[126]);
            const nameOfPath = dataOfPaths[i].post.summary;
            const nameOfDirectory = dataOfPaths[i].post.tags[0];

            const reInterno = componentEstructure.components;
            const nombre = reInterno.schemas;
            const nueva = Object.keys(nombre);
            const extension = { $ref: nameOfDirectory + '/' + nameOfPath + '.yaml' };
            const extYaml = new YAML.Document();
            extYaml.contents = extension;
            const yaa = extYaml.toString();


            const rutaArchivo = [];
            rutaArchivo.push('/' + nameOfPath + ':');

            const rutaDefinitiva = JSON.stringify(rutaArchivo + yaa);

            fs.appendFile('../openapi/paths/pruebaArchivo2.yaml', rutaDefinitiva, (err) => {
                if (err) throw err;
                console.log('Archivo' + nameOfPath + 'Creado Satisfactoriamente, numero:' + i);
            });

            //Creacion de los directorios del API
            /*fs.mkdirSync('../openapi/paths/'+nameOfDirectory,{recursive:true});*/

            //Creacion de los archivos en las respectivas rutas
            /*fs.appendFile('../openapi/paths/'+nameOfDirectory+'/'+nameOfPath+'.yaml', ContenidoYaml + ContenidoComponentYaml, (err) => {
                if (err) throw err;
                console.log('Archivo'+nameOfPath+'Creado Satisfactoriamente, numero:'+i);
            });*/

        }
    }
});