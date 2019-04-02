module.exports = app => {

// simulador de ruta para fletes

app.get('/calcular', (req, res) => {
   //datos iniciales 
   var data = {origen:'Arica, Chile', destino:'Santiago, Chile', tipo_vehiculo:1};
   // renderizar vista con los datos iniciales
   res.render('calcular_costo', {'data':data});
   }); 

// 404

app.use(function (req, res, next) {
   res.status(404).render('404')
 })
}

