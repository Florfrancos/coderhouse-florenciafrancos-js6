// Límite de stock a partir del cual se avisa que quedan pocas unidades

const STOCK_BAJO = 3;

//Menú de opciones
const textoMenu =
    "Seleccione la opción que desea comprar:\n" +
    "1 - Remera Negra\n" +
    "2 - Remera Roja\n" +
    "3 - Remera Blanca\n" +
    "4 - Remera Verde\n" +
    "5 - Remera Azul\n" +
    "6 - Deshacer última compra\n" +
    "7 - Consultar stock de un color\n" +
    "8 - Compra prioritaria\n" +
    "9 - Entregar primera remera del carrito\n" +
    "10 - Cambiar una remera del carrito por otro color\n" +
    "11 - Filtrar por precio \n" +
    "12 - Salir";

// Clase que modela una remera de la tienda
    class Producto {
    constructor(tipo, color, stock, precio) {
        this.tipo = tipo;
        this.color = color;
        this.stock = stock;
        this.precio = precio;
    }

        // Resta una unidad de stock. Devuelve true si se pudo vender y false si no había stock

    vender() {
        if (this.stock > 0) {
            this.stock--;
            return true;
        }
        return false;
    }
}
// Remeras de la tienda, creadas con la clase Producto
const remera1 = new Producto("Remera", "Negra", 10, 10000);
const remera2 = new Producto("Remera", "Roja", 4, 7000);
const remera3 = new Producto("Remera", "Blanca", 7, 8000);
const remera4 = new Producto("Remera", "Verde", 8, 9000);
const remera5 = new Producto("Remera", "Azul", 5, 6000);

//Array con todas las remeras
let productos = [remera1, remera2, remera3, remera4, remera5];
//carrito de compras
let carrito = [];
let opcion;

const esStockBajo = (stock) => stock <= STOCK_BAJO;

function mostrarMensaje(texto) {
    console.log(texto);
    alert(texto);
}
//Checkout de compra
function procesarCompra(producto) {
    if (producto.vender()) {
        carrito.push(producto.color);
        mostrarMensaje("Compraste una remera " + producto.color + ". El precio es $" + producto.precio + ". Stock restante: " + producto.stock);
        if (esStockBajo(producto.stock)) {
            mostrarMensaje("Stock bajo de remera " + producto.color);
        }
    } else {
        mostrarMensaje("No hay stock de remera " + producto.color);
    }
}

//Deshace la última compra
function deshacerCompra(lista, productos) {
    if (lista.length === 0) {
        mostrarMensaje("No hay compras para deshacer");
        return;
    }

    let colorQuitado = lista.pop();
    let productoDevuelto = productos.find((remera) => remera.color === colorQuitado);
    productoDevuelto.stock++;
    mostrarMensaje("Se quitó la remera " + colorQuitado + " del carrito. Stock actual: " + productoDevuelto.stock);
}
//Consulta stock de un producto
function consultarStock(listaProductos) {
    let colorBuscado = prompt("¿De qué color querés consultar el stock?").toLowerCase().trim();
    let productoEncontrado = listaProductos.find((remera) => remera.color.toLowerCase() === colorBuscado);

    if (productoEncontrado) {
        mostrarMensaje("Stock de remera " + productoEncontrado.color + ": " + productoEncontrado.stock);
    } else {
        mostrarMensaje("No trabajamos el color " + colorBuscado);
    }
}
//Pasa a primera el producto seleccionado
function compraPrioritaria(lista, productos) {
    let colorElegido = prompt("¿Qué color querés como compra prioritaria?").toLowerCase().trim();
    let productoEncontrado = productos.find((remera) => remera.color.toLowerCase() === colorElegido);

    if (!productoEncontrado) {
        mostrarMensaje("No trabajamos el color " + colorElegido);
        return;
    }

    if (productoEncontrado.vender()) {
        lista.unshift(productoEncontrado.color);
        mostrarMensaje("Compra prioritaria: remera " + productoEncontrado.color + " al principio del carrito. Stock restante: " + productoEncontrado.stock);
    } else {
        mostrarMensaje("No hay stock de remera " + productoEncontrado.color);
    }
}
//Entrega primero el producto seleccionado.
function entregarPrimera(lista) {
    if (lista.length === 0) {
        mostrarMensaje("No hay remeras en el carrito para entregar");
        return;
    }

    let entregada = lista.shift();
    mostrarMensaje("Se entregó la remera " + entregada + ". Quedan " + lista.length + " en el carrito");
}

//Muestra los productos agregados al carrito
function mostrarCarrito(lista) {
    if (lista.length === 0) {
        mostrarMensaje("No compraste ninguna remera");
        return;
    }

    let resumen = "Tu carrito:\n";
    for (const color of lista) {
        resumen = resumen + "- Remera " + color + "\n";
    }
    mostrarMensaje(resumen);
}

//Cambia un producto por otro
function reemplazarRemera(lista, productos) {
    if (lista.length === 0) {
        mostrarMensaje("No hay remeras en el carrito para cambiar");
        return;
    }

    mostrarCarrito(lista);
    let posicion = parseInt(prompt("¿Qué número de remera del carrito querés cambiar?"));

    if (isNaN(posicion) || posicion < 1 || posicion > lista.length) {
        mostrarMensaje("Posición inválida, elegí un número entre 1 y " + lista.length);
        return;
    }

    let indice = posicion - 1;
    let colorViejo = lista[indice];
    let colorNuevo = prompt("¿Por qué color querés cambiarla?").toLowerCase().trim();

    let productoNuevo = productos.find((remera) => remera.color.toLowerCase() === colorNuevo);

    if (!productoNuevo) {
        mostrarMensaje("No trabajamos el color " + colorNuevo);
        return;
    }

    if (productoNuevo.color === colorViejo) {
        mostrarMensaje("Ya tenés una remera " + colorViejo + " en esa posición");
        return;
    }

    let productoViejo = productos.find((remera) => remera.color === colorViejo);

    if (productoNuevo.stock === 0) {
        mostrarMensaje("No hay stock de remera " + productoNuevo.color);
        return;
    }

    productoViejo.stock++;
    productoNuevo.stock--;
    lista.splice(indice, 1, productoNuevo.color);

    mostrarMensaje("Cambiaste la remera " + colorViejo + " por una " + productoNuevo.color);
}
//filtra productos por precio. 
function filtrar(productos) {
    let precioMenor = Number(prompt("¿Productos menores a qué precio?"));
    let precioMayor = Number(prompt("¿Productos mayores a qué precio?"));
    let productosfiltrados = productos.filter((remera) => remera.precio < precioMenor && remera.precio > precioMayor);

    if (productosfiltrados.length === 0) {
        mostrarMensaje("No hay remeras en ese rango de precios");
        return;
    }

    let productosPorPrecio = productosfiltrados.map((remera) => remera.color).join(", ");
    mostrarMensaje("Tenemos estas remeras: " + productosPorPrecio);

    let elegirColor = prompt("¿Qué remera querés agregar?").toLowerCase().trim();
    let productoElegido = productosfiltrados.find((remera) => remera.color.toLowerCase() === elegirColor);

    if (!productoElegido) {
        mostrarMensaje("Esa remera no está en la lista");
        return;
    }

    procesarCompra(productoElegido);
}


//Menú principal con switch por casos, dependiendo la opcion seleccionada. 
function opcionCompra(mensaje) {
    do {
        opcion = parseInt(prompt(mensaje));

        switch (opcion) {
            case 1:
                procesarCompra(remera1);
                break;
            case 2:
                procesarCompra(remera2);
                break;
            case 3:
                procesarCompra(remera3);
                break;
            case 4:
                procesarCompra(remera4);
                break;
            case 5:
                procesarCompra(remera5);
                break;
            case 6:
                deshacerCompra(carrito, productos);
                break;
            case 7:
                consultarStock(productos);
                break;
            case 8:
                compraPrioritaria(carrito, productos);
                break;
            case 9:
                entregarPrimera(carrito);
                break;
            case 10:
                reemplazarRemera(carrito, productos);
                break;
            case 11:
                filtrar(productos);
                break;
            case 12:
                mostrarMensaje("Saliendo...");
                break;
            default:
                mostrarMensaje("Opción inválida, elegí un número del 1 al 12");
        }
    } while (opcion !== 12);

    mostrarCarrito(carrito);
    mostrarMensaje("Gracias por visitarnos");
}

opcionCompra(textoMenu);