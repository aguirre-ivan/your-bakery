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

    generateCardHTMLDiv() {
        /*
        This function returns the product in a div card html structure
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

function generateEcommerceContainerHTMLDiv(productsArray) {
    /*
    This functions returns an eccomerce div container with all cards product of productsArray.
    */
    let productsContainerRow = document.createElement("div");
    productsContainerRow.classList.add("row", "gx-4", "gx-lg-5", "row-cols-2", "row-cols-md-3", "row-cols-xl-4", "justify-content-center");

    productsArray.forEach(product => {
        productsContainerRow.appendChild(
            product.generateCardHTMLDiv()
        );
    });

    return productsContainerRow;
}

let ecommerceContainer = document.getElementById("products-container");
ecommerceContainer.appendChild(generateEcommerceContainerHTMLDiv(productsArray));