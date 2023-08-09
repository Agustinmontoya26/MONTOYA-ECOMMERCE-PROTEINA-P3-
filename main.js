const productos = [
    { id: 1, nombre: "Proteina sabor naranja", precio: 1500 },
    { id: 2, nombre: "Proteina sabor cafe", precio: 2000 },
    { id: 3, nombre: "Preentreno sabor naranja", precio: 2500 },
    { id: 4, nombre: "Proteina sabor chocolate", precio: 3000 }
];

const carrito = [];

function buscarProductoPorNombre(nombre) {
    return productos.find(producto => producto.nombre.toLowerCase() === nombre.toLowerCase());
}

function agregarAlCarrito(producto) {
    carrito.push(producto);
}

function calcularTotalCarrito() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

while (true) {
    const busqueda = prompt("Ingresa el nombre del producto que deseas buscar (o 'salir' para terminar):");

    if (busqueda.toLowerCase() === "salir") {
        break;
    }

    const productoEncontrado = buscarProductoPorNombre(busqueda);

    if (productoEncontrado) {
        agregarAlCarrito(productoEncontrado);
        alert(`Producto "${productoEncontrado.nombre}" agregado al carrito.`);
    } else {
        alert("Producto no encontrado.");
    }
}

const totalCarrito = calcularTotalCarrito();
alert(`El total de tu carrito es: $${totalCarrito}`);