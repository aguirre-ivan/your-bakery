const MAX_ECOMMERCE_COLUMNS = 4;

// Ecommerce product
class Product {
    constructor(id, name, price, imgSrc, imgAlt) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
    }

    generateEcommerceCardHTML() {
        /*
        This function returns the product in a div card html structure for eccommerce section.
        */
        let div = document.createElement("div");
        div.classList.add("col", "mb-5");
        div.innerHTML = `
            <div class="card h-100">
                <img class="card-img-top"
                    src="${this.imgSrc}"
                    alt="${this.imgAlt}" />
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
                        <button class="btn btn-outline-dark mt-auto"
                            onclick="addProductToCart(${this.id})">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        return div;
    }
}

class Cart {
    constructor(productsArray) {
        this.productsArray = productsArray;
    }

    getTotalPrice() {
        let totalPrice = 0;
        return totalPrice;
    }

    generateCartContainerHTML() {
        /*
        This function returns the productsArray in a div cart html structure for Cart section.
        */
        let divCartContainer = document.createElement("div");
        divCartContainer.classList.add("col");

        this.productsArray.forEach(product => {
            let divCard = document.createElement("div");
            divCard.classList.add("row", "justify-content-center");
            divCard.innerHTML = `
                <div class="card mb-3" style="max-width: 800px;">
                    <div class="row g-0">
                        <div class="col-md-4">
                            <img
                                src="${product.imgSrc}"
                                class="img-fluid rounded-start"
                                alt="${product.imgAlt}">
                        </div>
                        <div class="col-md-8">
                            <div class="card-body">
                                <h5 class="card-title">
                                    ${product.name}
                                </h5>
                                <p class="card-text">
                                    $${product.price}
                                </p>
                                <p class="card-text">
                                    Cantidad: 1
                                </p>
                                <div class="btn-group me-2" role="group" aria-label="First group">
                                <button type="button" class="btn btn-dark">
                                    --
                                </button>
                                <button type="button" class="btn btn-dark">
                                    +
                                </button>
                            </div>
                                <button href="#" class="btn btn-danger">
                                    Quitar del carrito
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                `;
            divCartContainer.appendChild(divCard);
        });

        let divTotal = document.createElement("div");
        divTotal.innerHTML = `
            <div class="row offset-8 text-end pt-4" style="max-width: 200px;">
                <p class="h4">
                    Total: $1200
                </p>
                <a href="#" class="btn btn-dark">
                    Comprar
                </a>
            </div>
        `;

        divCartContainer.appendChild(divTotal);

        return divCartContainer;
    }
}

// Products array of ecommerce
var productsArray = [
    new Product(
        1, "Alfajores San Valentin", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"
    ),
    new Product(
        2, "Caja tentacion", 1500, "../assets/img/products/caja_tentacion.jpg", "Caja con brownies y masitas de chocolate"
    ),
    new Product(
        3, "Cheescake", 800, "../assets/img/products/cheesecake.jpg", "Torta cheesecake"
    ),
    new Product(
        4, "Alfajores de maicena", 800, "../assets/img/products/alfajores_maicena.jpg", "9 alfajores de maicena apilados"
    ),
    new Product(
        5, "Caja de 9 brownies decorados", 1200, "../assets/img/products/caja_brownies.jpg", "Caja de 9 brownies decorados"
    ),
    new Product(
        6, "Cakes", 1200, "../assets/img/products/cakes.jpg", "Caja de 3 tortas"
    ),
    new Product(
        7, "Budines", 1000, "../assets/img/products/budines.jpg", "Caja de 3 budines"
    ),
    new Product(
        8, "Alfacookies", 800, "../assets/img/products/alfacookies.jpg", "Caja de 9 alfacookies"
    ),
];

function generateEcommerceContainerHTML(productsArray) {
    /*
    This functions returns an eccomerce div container with all cards product of productsArray.
    */
    let productsContainerRow = document.createElement("div");
    productsContainerRow.classList.add("row", "gx-4", "gx-lg-5", "row-cols-2", "row-cols-md-3", "row-cols-xl-4", "justify-content-center");

    productsArray.forEach(product => {
        productsContainerRow.appendChild(
            product.generateEcommerceCardHTML()
        );
    });

    return productsContainerRow;
}

// Generate the ecommerce container:
// let ecommerceContainer = document.getElementById("products-container");
// ecommerceContainer.appendChild(generateEcommerceContainerHTML(productsArray));

// Cart products
let cartProductsArray = [
    new Product(
        1, "Alfajores San Valentin", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"
    ),
    new Product(
        2, "Caja tentacion", 1500, "../assets/img/products/caja_tentacion.jpg", "Caja con brownies y masitas de chocolate"
    ),
];

let cartProducts = new Cart(cartProductsArray);

// Generate the cart container:
let cartContainer = document.getElementById("cart-container");
cartContainer.appendChild(cartProducts.generateCartContainerHTML());