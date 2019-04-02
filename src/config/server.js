const express = require('express');
const path = require('path');
const graphqlHttp = require('express-graphql');
const {buildSchema} = require('graphql'); 
let app = express();


// Configuración inicial

app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'../app/views'));

// Configuración de los archivos estáticos

app.use("/img", express.static(path.join(__dirname, '../app/public/images')));
app.use("/css", express.static(path.join(__dirname, '../app/public/styles')));
app.use("/js", express.static(path.join(__dirname, '../app/public/scripts')));
app.use("/webfonts", express.static(path.join(__dirname, '../app/public/webfonts')));

// configuración inicial del graphql

app.use('/graphql', graphqlHttp({
    schema:buildSchema(`
        type consulta {
            vehiculos: [String!]!
        },

        type modificacion {
            registrarVehiculo(modelo: String): String    
        },

        schema {
            query: consulta
            mutation: modificacion
        }
    `),
    rootValue: {
        vehiculos: () => {
            return ['Nissan Sentra','Toyota Corolla', 'Ford Focus'];
        },

        registrarVehiculo: (args) => {
            const modelo = args.modelo;
            return modelo;
        }
    },
    graphiql:true
}));

module.exports = app 