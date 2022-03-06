let d = document, urlValor, titleValor, precioValor;
let url = d.getElementsByClassName('url');
let title = d.getElementsByClassName('.title');
let precio = d.getElementsByClassName('.precio');
let form = d.getElementsByClassName('form');
let alerta = d.getElementById('alerta');
let exitosa = d.getElementById('exitosa');
let mostrar = d.getElementById('mostrar');
let remeras = [];

//con las variables le asigno una clave y valor y los voy pusheando, y agrego un alerta para avisar que remera se agregó
function CrearItem(urlValor, titleValor, precioValor) {
    let item = {
        url: urlValor,
        nombre: titleValor,
        precio: precioValor,
    }
    remeras.push(item);

    alerta.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text success--text d-block');
    let msj = d.querySelector('.v-alert__content');
    msj.innerHTML = 'Se agregó al carrito la remera ' + '<strong>' + titleValor + '</strong>';
    setTimeout(() => {
        alerta.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text success--text d-none');
        msj.innerHTML = '';
    }, 3000);
    return item;
}

//actualiza el localStorage si hay cambios y llama a la funcion PintarDB para que actualice el HTML
function GuardarDB (){
    localStorage.setItem('info', JSON.stringify(remeras));
    PintarDB();
}

//obtengo todo el localStorage y los voy mostrando en el HTML
function PintarDB(){
    mostrar.innerHTML = '';
    remeras = JSON.parse(localStorage.getItem('info'));
    if(remeras === null || remeras == ''){
        remeras = [];
        mostrar.innerHTML = '';
     } else{
            let finalizar = '<div class="row"><div class="ml-auto pr-3 mb-3"><button type="button" class="btn btn-primary" id="fin">Finalizar compra</button></div>';
            let header = '<table class="table">' + 
                            '<thead>' + 
                                '<tr>' + 
                                    '<th scope="col">Nombre</th>' + 
                                    '<th scope="col">Precio</th>' + 
                                    '<th scope="col">Acción</th>' + 
                                '</tr>' + 
                            '</thead>' + 
                            '<tbody>';
            let main = '';
                    remeras.forEach(remera => {
                    main +=  '<tr class="remeras">' + 
                                '<td>' + remera.nombre + '</td>' + 
                                '<td>' + remera.precio + '</td>' + 
                                '<td><button type="button" class="btn btn-outline-danger">Borrar</button></td>' +    
                            '</tr>'; 
                    });
            let footer = '</tbody>' + '</table>';
            mostrar.innerHTML = header + main + footer + finalizar;

            let fin = d.getElementById('fin');
            fin.onclick = () => {
                mostrar.innerHTML = '';
                localStorage.removeItem('info');
                let pagar = d.getElementById('pagar');
                pagar.setAttribute('class', 'text-center d-block pb-5');
                setTimeout(() => {
                    pagar.setAttribute('class', 'text-center d-none');

                    exitosa.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text success--text d-block');
                    let mensaje = d.querySelectorAll('.v-alert__content')[1];
                    mensaje.innerHTML = '¡Felicidades su compra se realizó con éxito!';
                }, 2500);

                setTimeout(() => {
                    exitosa.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text success--text d-none');
                    mensaje.innerHTML = '';
                }, 7000);
            }
      }
}   

//con la url de la imagen busco si coincide con la info que me pasó y si es asi lo borro y llamo a la funcion GuardarDB que actualiza el localStorage, y agrego un alerta para avisar que se eliminó esa remera
function EliminarDB (urlValor){
    let indexArray;
    remeras.forEach((element, index) => {
        if(element.url === urlValor){
            indexArray = index;
        }
    });
    let dato = remeras.splice(indexArray, 1);
    let datoNombre = dato[0].nombre;
    alerta.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text error--text d-block');
    let msj = d.querySelector('.v-alert__content');
    msj.innerHTML = 'Se eliminó la remera ' + '<strong>' + datoNombre + '</strong>';
    setTimeout(() => {
        msj.innerHTML = '';
        alerta.setAttribute('class', 'v-alert v-sheet v-sheet--outlined theme--light v-alert--outlined v-alert--text error--text d-none');
    }, 3000);
    GuardarDB();
}

//cada vez que apreto comprar mando los datos de esa remera y los mando a la funcion CrearItem 
for (let i = 0; i < form.length; i++) {
    form[i].addEventListener('submit', function (ev){
        ev.preventDefault();
        urlValor = this.url.value;
        titleValor = this.title.value;
        precioValor = this.precio.value;

    CrearItem(urlValor, titleValor, precioValor);
    GuardarDB();
    form[i].reset();
    })
}

//al cargar el DOM llamo a la funcion PintarDB
document.addEventListener('DOMContentLoaded', PintarDB);

//busco si el boton se llamar borrar entonces llamo a la funcion eliminar
mostrar.addEventListener('click', (ev) => {
    ev.preventDefault();
    if(ev.target.innerHTML === 'Borrar'){
        let itemRemera = ev.path[1];
        if(ev.target.innerHTML === 'Borrar'){
            EliminarDB(itemRemera);
        }
    }
})
