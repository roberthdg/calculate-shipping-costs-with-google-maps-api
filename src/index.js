const app = require("./config/server");

require("./app/routes/global")(app);

// Iniciar el servidor

app.listen(app.get('port'),() => {
    console.log('server on port ', app.get('port'));

});