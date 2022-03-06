if('serviceWorker' in navigator){
    window.addEventListener('load', function() {
     navigator.serviceWorker.register('sw.js')
       .then(function (registration) {console.log('SW registrado');
       }).catch(function (err){console.log('SW falló: ', err);});
});
   }
//funcion anónima auto-ejecutable. Todo lo que hay dentro está aislado del resto del código de la página.

(function () {
	
  var aviso;

  window.addEventListener('beforeinstallprompt', function (e) {
       e.preventDefault();
         aviso = e;
           console.log(aviso)

    showAddToHomeScreen();

  });

function showAddToHomeScreen() {
    var mostrarAlerta = document.querySelector(".agregar-alerta");
    console.log(mostrarAlerta);
        if(mostrarAlerta != undefined){
        mostrarAlerta.style.display = "flex";
        mostrarAlerta.addEventListener("click", addToHomeScreen);
      }
}

  function addToHomeScreen() {
      var mostrarAlerta = document.querySelector(".agregar-alerta");
          mostrarAlerta.style.display = 'none';

    if (aviso) {
         aviso.prompt();
              aviso.userChoice
        .then(function (choiceResult) {

          if (choiceResult.outcome === 'accepted') {
            console.log('El usuario acepto');
          } else {
            console.log('El usuario rechazó');
          }

          aviso = null;

        });

    }

  }

  showAddToHomeScreen();

})(); //Ejecutamos la función