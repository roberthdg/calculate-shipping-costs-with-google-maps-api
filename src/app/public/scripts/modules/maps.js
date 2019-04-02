

var placeSearch, autocomplete;

// Declaración de variables

let distancia = 0;
let vehiculo = 0;
let peoneta = 0;

function initialize() {
  initMap();
  initAutocomplete();
  }

// Función para iniciar los servicios de Google Autocomplete

function initAutocomplete() {
    var input = document.getElementById('origen');
    var input2 = document.getElementById('destino');

    var options = {
    types: ['geocode'],
    fields: ['place_id', 'name'],
    componentRestrictions: {country: 'cl'}
    };

    autocomplete = new google.maps.places.Autocomplete(input, options);
    
    autocomplete2 = new google.maps.places.Autocomplete(input2, options);

    autocomplete.addListener('place_changed', function() {
      var place = autocomplete.getPlace();
      console.log(place);
      console.log(place.place_id);
      document.getElementById("origen").value=place.name;
      initMap();
      });

      
    autocomplete2.addListener('place_changed', function() {
      var place = autocomplete2.getPlace();
      document.getElementById("destino").value=place.name;
      console.log(place.place_id);
      initMap();
      });

}


// Función para iniciar el servicio de Google Maps

function initMap() {
  var directionsService = new google.maps.DirectionsService;
  var directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
    });
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 5,
    center: {lat: -30.55, lng: -70.65}
  });
  
  directionsDisplay.setMap(map);
  
  directionsDisplay.addListener('directions_changed', function() {
      var directionsList = directionsDisplay.getDirections();
      computeTotalDistance(directionsList);
      // Actualiza los campos origen y destino en el simulador al cambiar las direcciones en el mapa
      document.getElementById("origen").value = directionsList.routes[0].legs[0]["start_address"];
      document.getElementById("destino").value = directionsList.routes[0].legs[0]["end_address"];
      document.getElementById('p_origen').innerHTML = directionsList.routes[0].legs[0]["start_address"];
      document.getElementById('p_destino').innerHTML = directionsList.routes[0].legs[0]["end_address"];
    });

  origen=document.getElementById('origen').value;
  destino=document.getElementById('destino').value;

  displayRoute(origen, destino , directionsService,directionsDisplay);

}

// Función para mostrar la ruta en el mapa 

function displayRoute(origin, destination, service, display) {
    console.log(origin);
    console.log(destination);
    service.route({
      origin: origin,
      destination: destination,
      travelMode: 'DRIVING',
      avoidTolls: true
    }, function(response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('No se pudo conseguir la dirección, error: ' + status);
      }
    });
  }

// Función para calcular y actualizar la distancia de la ruta

  function computeTotalDistance(result) {
    var total = 0;
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    }
    total = total / 1000;
    window.value=total;
    calcularMonto();
    document.getElementById('p_distancia').innerHTML = total.toFixed(2);
  }

// Función para calcular monto del flete

  function calcularMonto() {
    monto=(distancia*vehiculo*30)+(peoneta*1500);
    document.getElementById('p_total').innerHTML= monto;
  }
 
// Funciones de jQuery para calcular el monto del flete
  
$(function() {
  // elegir el número de ayudantes y calcular nuevamente el monto
  $('#peoneta').on('change', function() {
      $('#p_peoneta').html($(this).val())
      peoneta= $('#p_peoneta').html();
      calcularMonto();
  });

  // elegir el tipo de vehículo y calcular nuevamente el monto
  $('input[type="radio"]').click(function(){
      if ($(this).is(':checked'))
      {
        $('#p_vehiculo').html($(this).attr("id"));
       vehiculo=$(this).val();
       calcularMonto();
      }
    });

});

// inicializar variables al cargar la página

$(document).ready(function(){
    $('#p_vehiculo').html($("input[name='tipo_vehiculo']:checked").attr("id"));
    vehiculo = $("input[name='tipo_vehiculo']:checked").val();
    distancia = window.value;
    peoneta = 0;
    calcularMonto();
    $('[data-toggle="tooltip"]').tooltip();   
});

  
