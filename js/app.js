console.log("Con esta aplicacion podras filtrar productos de la tienda.");
console.log("Al finalizar, obtendras la lista filtrada.");

// Clase de producto de la tienda
class Product {
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
}

// Suponemos un array de productos:
let products_array = [
    new Product("Alfajores San Valentin", 800),
    new Product("Caja tentacion", 1500),
    new Product("Cheescake", 800),
    new Product("Alfajores de maicena", 800),
    new Product("Caja de brownies", 1200),
    new Product("Cakes", 1200),
    new Product("Budines", 1000),
    new Product("Alfacookies", 800),
];

// Funciones de filtrado

function filter_products_by_min_price(products_array, min_price) {
    return products_array.filter(product => product.price >= min_price);
}

function filter_products_by_max_price(products_array, max_price) {
    return products_array.filter(product => product.price <= max_price);
}

function filter_products_by_name(products_array, name) {
    return products_array.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
}

// Ejemplo
console.log("-----------------");
console.log("Lista productos:");
console.log(products_array);
console.log("Lista filtrada que incluye la cadena 'ca':");
console.log(filter_products_by_name(products_array, "ca"));

// Suponemos un array del carrito vacio
let products_cart = [];

// Funcion para agregar productos al carrito
function add_product_to_cart(products_array, product_id, products_cart) {
    products_cart.push(products_array.find(product => product.name == product_id));
}

// Ejemplo de funcionamiento
console.log("-----------------");
console.log("Carrito vacio:");
console.log(products_cart);
console.log("Agregado producto Cakes:");
add_product_to_cart(products_array, "Cakes", products_cart)
console.log(products_cart);
console.log("-----------------");
