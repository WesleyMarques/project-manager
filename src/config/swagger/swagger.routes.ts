import * as express from 'express';
import * as swaggerUi from 'swagger-ui-express';


let swaggerDoc: Object;

try {
    swaggerDoc = require('../../../swagger.json');
} catch (error) {
    console.log('***************************************************');
    console.log('  Please, run: ');
    console.log('  $ swagger-jsdoc -d swaggerDef.js -o swagger.json');
    console.log('***************************************************');
}


export default express.Router()
    .use('/', swaggerUi.serve)
    .get('/', swaggerUi.setup(swaggerDoc))
