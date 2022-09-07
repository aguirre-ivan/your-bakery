/* *****************************************************************
 *                              CONSTS
 * *****************************************************************/

// Container IDs
const CART_CONTAINER_ID = "cart-container";
const ECOMMERCE_CONTAINER_ID = "ecommerce-container";

// Buttons classes
const BUTTON_ADD_PRODUCT = "button-add-product";
const BUTTON_SUBSTRACT_FROM_CART = "button-substract-from-cart";
const BUTTON_ADD_TO_CART = "button-add-to-cart";
const BUTTON_REMOVE_FROM_CART = "button-remove-from-cart";

/* *****************************************************************
 *                              CLASSES
 * *****************************************************************/

// Ecommerce product
class Product {
    constructor(productId, name, price, imgSrc, imgAlt) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.quantity = 1;
    }

    resetQuantity() {
        /*
        This function reset the product quantity to 1.
        */
        this.quantity = 1;
    }

    generateEcommerceCardHTML() {
        /*
        This function returns the product in a div card html structure for eccommerce section.
        */
        let div = document.createElement("div");
        div.classList.add("col", "mb-5");
        div.innerHTML = `
            <div class="card h-100" id="${this.productId}">
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
                        <button class="btn btn-outline-dark mt-auto ${BUTTON_ADD_PRODUCT}">
                            Agregar al carrito
                        </button>
                    </div>
                </div>
            </div>
        `;
        return div;
    }
}

// Products in cart
class Cart {
    constructor() {
        this.cartArray = [];
    }

    getTotalPrice() {
        /*
        This function returns the total price of all products in cart.
        */
        let totalPrice = 0;
        (this.cartArray).forEach(product => {
            totalPrice += parseFloat(product.price) * parseInt(product.quantity);
        })
        return totalPrice;
    }

    getTotalQuantity() {
        /*
        This function returns the total quantity of products in cart.
        */
        let totalQuantity = 0;
        (this.cartArray).forEach(product => {
            totalQuantity += parseInt(product.quantity);
        })
        return totalQuantity;
    }

    generateCartContainerHTML() {
        /*
        This function returns the cartArray in a div cart html structure for Cart section.
        */
        let divCartContainer = document.createElement("div");
        divCartContainer.classList.add("col");

        this.cartArray.forEach(product => {
            let divCard = document.createElement("div");
            divCard.classList.add("row", "justify-content-center");
            divCard.innerHTML = `
                <div class="card mb-3" style="max-width: 800px;" id="${product.productId}">
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
                                    Cantidad: ${product.quantity}
                                </p>
                                <div class="btn-group me-2" role="group" aria-label="First group">
                                    <button type="button" class="btn btn-dark ${BUTTON_SUBSTRACT_FROM_CART}">
                                        --
                                    </button>
                                    <button type="button" class="btn btn-dark ${BUTTON_ADD_TO_CART}">
                                        +
                                    </button>
                                </div>
                                <button class="btn btn-danger ${BUTTON_REMOVE_FROM_CART}">
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
                    Total: $${this.getTotalPrice()}
                </p>
                <a href="#" class="btn btn-dark">
                    Comprar
                </a>
            </div>
        `;

        divCartContainer.appendChild(divTotal);

        return divCartContainer;
    }

    generateEmptyCartContainerHTML() {
        /*
        This function generates an empty cart div html structure for Cart section.
        */
        let divCartContainer = document.createElement("div");
        divCartContainer.classList.add("col");
        divCartContainer.innerHTML = `
        <section class="py-3">
            <div class="container px-4 px-lg-5">
                <div class="col mb-5 text-center">
                    <div class="alert alert-primary" role="alert">
                        ¡Tu carrito se encuentra vacío!
                        Agregá productos en la sección de la <a href="productos.html">tienda</a>.
                    </div>
                </div>
            </div>
        </section>
        `;

        return divCartContainer;
    }

    renderCartNavbar() {
        /*
        Renders the navbar cart number, with the total quantity of products in cart.
        */
        let spanQuantity = document.getElementById("cartQuantity");
        spanQuantity.innerHTML = this.getTotalQuantity();
    }

    renderCartContainerFromLocalStorage() {
        /*
        Renders the cart section from the products in localStorage['cart'].
        */
        this.updateCartArrayFromLocalStorage();
        this.renderCartNavbar();

        if (document.getElementById(CART_CONTAINER_ID)) {
            if (this.cartArray.length === 0) {
                renderProductsContainer(CART_CONTAINER_ID, this.generateEmptyCartContainerHTML());
            } else {
                renderProductsContainer(CART_CONTAINER_ID, this.generateCartContainerHTML());
            }
        }

        cartEventListeners(cart);
    }

    updateRenderFromLocalStorage() {
        /*
        Updates the Cart Section render based on localStorage['cart'].
        */
        if (document.getElementById(CART_CONTAINER_ID)) {
            let container = document.getElementById(CART_CONTAINER_ID);
            while (container.firstChild) {
                container.removeChild(container.firstChild);
            }
        }

        this.renderCartContainerFromLocalStorage();
    }

    updateCartArrayFromLocalStorage() {
        /*
        Updates cartArray based on localStorage['cart'].
        */
        let cartJSONInLocalStorage = localStorage.getItem("cart");
        this.cartArray = cartJSONInLocalStorage.length === 0 ? [] : JSON.parse(cartJSONInLocalStorage);
    }

    updateCartArrayInLocalStorage() {
        /*
        Updates localStorage['cart'] based on cartArray .
        */
        let arrayJSON = JSON.stringify(this.cartArray);
        localStorage.setItem("cart", arrayJSON);
    }

    addProductToCart(product) {
        /*
        Adds a product to cartArray and updates localStorage['cart'] whit this.updateCartArrayInLocalStorage().
        It also updates the render of cart section whit this.updateRenderFromLocalStorage().
        */
        let productIsInCart = false;

        (this.cartArray).forEach(cartProduct => {
            if (cartProduct.productId === product.productId) {
                productIsInCart = true;
                cartProduct.quantity = parseInt(cartProduct.quantity) + 1;
                return;
            }
        })
        if (!productIsInCart) {
            this.cartArray.push(product);
        }

        this.updateCartArrayInLocalStorage();
        this.updateRenderFromLocalStorage();
    }

    substractProductFromCart(product) {
        /*
        Substract the product from cartArray and updates localStorage['cart'] whit this.updateCartArrayInLocalStorage().
        If product.quantity becomes 0, this function removes the product from cart with this.removeProductFromCart(product).
        It also updates the render of cart section whit this.updateRenderFromLocalStorage().
        */
        for (let i = 0; i < this.cartArray.length; i++) {
            if (this.cartArray[i].productId === product.productId) {
                (this.cartArray[i]).quantity = parseInt(this.cartArray[i].quantity) - 1;
                if (this.cartArray[i].quantity === 0) {
                    this.removeProductFromCart(product);
                }
                break;
            }
        }

        this.updateCartArrayInLocalStorage();
        this.updateRenderFromLocalStorage();
    }

    removeProductFromCart(product) {
        /*
        Removes a product from cartArray and updates localStorage['cart'] whit this.updateCartArrayInLocalStorage().
        It also updates the render of cart section whit this.updateRenderFromLocalStorage().
        */
        product.resetQuantity();

        this.cartArray = this.cartArray.filter(cartProduct => cartProduct.productId != product.productId);

        this.updateCartArrayInLocalStorage();
        this.updateRenderFromLocalStorage();
    }
}

/* *****************************************************************
 *                         INITIALIZATION
 * *****************************************************************/

/*                              CART                               */

// Initialize cart in localStorage
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", []);
}

// Cart object initialization
let cart = new Cart;

// Render cart container from localStorage
cart.renderCartContainerFromLocalStorage();

/*                          ECOMMERCE                             */

// Products array of ecommerce
var productsArray = [
    new Product(
        "P00", "Alfajores San Valentin", 800, "../assets/img/products/alfajores_san_valentin.jpg", "Caja de 6 alfajores decorados"
    ),
    new Product(
        "P01", "Caja tentacion", 1500, "../assets/img/products/caja_tentacion.jpg", "Caja con brownies y masitas de chocolate"
    ),
    new Product(
        "P02", "Cheescake", 800, "../assets/img/products/cheesecake.jpg", "Torta cheesecake"
    ),
    new Product(
        "P03", "Alfajores de maicena", 800, "../assets/img/products/alfajores_maicena.jpg", "9 alfajores de maicena apilados"
    ),
    new Product(
        "P04", "Caja de 9 brownies decorados", 1200, "../assets/img/products/caja_brownies.jpg", "Caja de 9 brownies decorados"
    ),
    new Product(
        "P05", "Cakes", 1200, "../assets/img/products/cakes.jpg", "Caja de 3 tortas"
    ),
    new Product(
        "P06", "Budines", 1000, "../assets/img/products/budines.jpg", "Caja de 3 budines"
    ),
    new Product(
        "P07", "Alfacookies", 800, "../assets/img/products/alfacookies.jpg", "Caja de 9 alfacookies"
    ),
];

// Render ecommerce container
if (document.getElementById(ECOMMERCE_CONTAINER_ID)) {
    renderProductsContainer(ECOMMERCE_CONTAINER_ID, generateEcommerceContainerHTML(productsArray));
}

// Event listeners on ecommerce
ecommerceEventListeners();

/* *****************************************************************
 *                              FUNCTIONS
 * *****************************************************************/

function renderProductsContainer(productsContainerId, productsToAppend) {
    /*
    This functions checks if document contains the productsContainerId and then appends productsToAppend to the container finded.
    */
    if (document.getElementById(productsContainerId)) {
        let cartContainer = document.getElementById(productsContainerId);
        cartContainer.appendChild(productsToAppend);
    }
}

function generateEcommerceContainerHTML(productsArray) {
    /*
    This function returns an ecommerce div container with all cards product of productsArray.
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

/* *****************************************************************
 *                     EVENT LISTENERS FUNCTIONS
 * *****************************************************************/

function cartEventListeners(cart) {
    /*
    Event listeners from cart section.
    It includes buttons 'button-substract-from-cart', 'button-add-to-cart' and 'button-remove-from-cart'. Based on the button selected, this function uses the respective cart methods: cart.substractProductFromCart(product), cart.substractProductFromCart(product) or cart.addProductToCart(product).
    */
    let buttonsSubstractFromCart = document.querySelectorAll(`.${BUTTON_SUBSTRACT_FROM_CART}`);
    let buttonsAddToCart = document.querySelectorAll(`.${BUTTON_ADD_TO_CART}`);
    let buttonsRemoveFromCart = document.querySelectorAll(`.${BUTTON_REMOVE_FROM_CART}`);

    let getProduct = function (divTarget) {
        let productId = (divTarget.parentNode.parentNode.parentNode.parentNode).getAttribute('id');
        return productsArray.find(cartProduct => cartProduct.productId === productId);
    }

    for (let button of buttonsSubstractFromCart) {
        button.addEventListener("click", function (event) {
            cart.substractProductFromCart(getProduct(event.target.parentNode));
        });
    }

    for (let button of buttonsAddToCart) {
        button.addEventListener("click", function (event) {
            cart.addProductToCart(getProduct(event.target.parentNode));
        });
    }

    for (let button of buttonsRemoveFromCart) {
        button.addEventListener("click", function (event) {
            cart.removeProductFromCart(getProduct(event.target)); // removeProductButton is one div up
        });
    }
}

function ecommerceEventListeners() {
    /*
    Event listeneres from ecommerce section.
    It includes the button 'button-add-product' and uses the cart method cart.addProductToCart(product).
    */
    let buttonsAddToCart = document.querySelectorAll(`.${BUTTON_ADD_PRODUCT}`);

    let getProduct = function (divTarget) {
        let productId = (divTarget.parentNode.parentNode.parentNode).getAttribute("id");
        return productsArray.find(cartProduct => cartProduct.productId === productId);
    }

    for (let button of buttonsAddToCart) {
        button.addEventListener("click", function (event) {
            cart.addProductToCart(getProduct(event.target));
        });
    }
}