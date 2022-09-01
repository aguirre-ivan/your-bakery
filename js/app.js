// Clase de producto de la tienda
class Product {
    constructor(id, name, price, src_img, alt_img) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.src_img = src_img;
        this.alt_img = alt_img;
    }

    generate_html() {
        return `
        <div class="col mb-5">
            <div class="card h-100">
                <img class="card-img-top"
                    src="${this.src_img}"
                    alt="${this.alt_img}" />
                <div class="card-body p-4">
                    <div class="text-center">
                        <h5 class="fw-bolder">
                            ${this.name}
                        </h5>
                        $${this.price}
                    </div>
                </div>
                <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                        <a class="btn btn-outline-dark mt-auto" href="#">
                            Agregar al carrito
                        </a>
                    </div>
                </div>
            </div>
        </div>
        `;
    }
}

// Suponemos un array de productos:
let products_array = [
    new Product(1, "Alfajores San Valentin", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(2, "Caja tentacion", 1500, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(3, "Cheescake", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(4, "Alfajores de maicena", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(5, "Caja de brownies", 1200, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(6, "Cakes", 1200, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(7, "Budines", 1000, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
    new Product(8, "Alfacookies", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"),
];

let exampleProduct = products_array[0];
let container = document.getElementById("products_container");
container.innerHTML = exampleProduct.generate_html();
