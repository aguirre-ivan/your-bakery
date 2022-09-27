/* *****************************************************************
 *                              CONSTS
 * *****************************************************************/

// Local storage keys
const CART_KEY = "cart";

// Container IDs
const CART_CONTAINER_ID = "cart-container";
const ECOMMERCE_CONTAINER_ID = "ecommerce-container";
const DELIVERY_FORM_CONTAINER_ID = "delivery-form-container";

// Purchase form ids
const PURCHASE_FORM_ID = "buy-form";
const DELIVERY_SELECT_ID = "deliveryMode"
const BUTTON_SUBMIT_PURCHASE = "buyButton";

// Buttons id
const BUTTON_ADD_PRODUCT = "button-add-product";
const BUTTON_SUBSTRACT_FROM_CART = "button-substract-from-cart";
const BUTTON_ADD_TO_CART = "button-add-to-cart";
const BUTTON_REMOVE_FROM_CART = "button-remove-from-cart";
const BUTTON_BUY_CART = "submit-cart-purchase"

// Filter form ids
const FILTER_FORM_ID = "filterForm"
const NAME_PRODUCT_NAME = "productName"
const NAME_MIN_PRICE = "minPrice"
const NAME_MAX_PRICE = "maxPrice"
const NAME_SELECT_SORT = "selectSort"

// Sort numbers
const SORT_NONE = 0;
const SORT_NAME = 1;
const SORT_DESC = 2;
const SORT_ASC = 3;

// Select delivery number
const DELIVERY_ADDRESS_ON = 2;

// Absolute PATHS
const COMPRA_PATH = new URL("../pages/compra.html", document.baseURI).href;
const INITIAL_IMG_PATH = new URL(`/assets/img/products/`, document.baseURI).href;

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
        return this.cartArray.reduce((accumulator, cartProduct) => {
            return accumulator + parseFloat(cartProduct.price) * parseInt(cartProduct.quantity);
        }, 0);
    }

    getTotalQuantity() {
        /*
        This function returns the total quantity of products in cart.
        */
        return this.cartArray.reduce((accumulator, cartProduct) => {
            return accumulator + parseInt(cartProduct.quantity);
        }, 0);
    }

    isEmpty() {
        /*
        Returns true if the cart is empty.
        */
        return this.cartArray.length == 0;
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
                        <div class="col-lg-4 mt-2">
                            <img
                                src="${product.imgSrc}"
                                class="img-fluid rounded"
                                alt="${product.imgAlt}">
                        </div>
                        <div class="col-lg-8">
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
            <div class="row offset-md-9 text-end pt-4" style="max-width: 200px;">
                <p class="h4">
                    Total: $${this.getTotalPrice()}
                </p>
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
                        Agregá productos en la sección de la tienda.
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

        if (this.cartArray.length === 0) {
            renderElementInContainer(CART_CONTAINER_ID, this.generateEmptyCartContainerHTML());
        } else {
            renderElementInContainer(CART_CONTAINER_ID, this.generateCartContainerHTML());
        }

        cartEventListeners(this);
    }

    updateRenderFromLocalStorage() {
        /*
        Updates the Cart Section render based on localStorage['cart'].
        */
        cleanRender(CART_CONTAINER_ID);

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

        renderAddedProductToCartToastify(product);

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

        renderSubstractedProductFromCartToastify(product);

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

        renderRemovedProductFromCartToastify(product);

        this.updateCartArrayInLocalStorage();
        this.updateRenderFromLocalStorage();
    }
}

/* *****************************************************************
 *                        AUX RENDER FUNCTIONS
 * *****************************************************************/

function renderElementInContainer(containerId, elementToAppend) {
    /*
    This functions checks if document contains the containerId and then appends elementToAppend to the container finded.
    */
    if (document.getElementById(containerId)) {
        let containerFinded = document.getElementById(containerId);
        containerFinded.appendChild(elementToAppend);
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

function cleanRender(containerId) {
    /*
    Removes children of the div whit id=containerId.
    */
    if (document.getElementById(containerId)) {
        let container = document.getElementById(containerId);
        while (container.firstChild) {
            container.removeChild(container.firstChild);
        }
    }
}

function updateEcommerceContainer(productsArray) {
    /*
    Updates the ecommerce container. First cleans the render and then render the products container with productsArray.
    */
    cleanRender(ECOMMERCE_CONTAINER_ID);
    renderElementInContainer(ECOMMERCE_CONTAINER_ID, generateEcommerceContainerHTML(productsArray));
}

function generateDeliveryAddressForm() {
    /*
    This function returns the delivery form container.
    */
    let divFormRow = document.createElement("div");
    divFormRow.classList.add("row", "g-3");
    divFormRow.innerHTML = `
        <div class="col-7 col-md-4">
            <label for="inputState" class="form-label">Ciudad</label>
            <select id="inputState" class="form-select" required>
                <option value="1" selected>Elegir</option>
                <option value="2">CABA</option>
                <option value="3">GBA</option>
            </select>
        </div>

        <div class="col-5 col-md-2">
            <label for="inputCP" class="form-label">CP</label>
            <input type="text" class="form-control" id="inputCP" placeholder="CP" required>
        </div>

        <div class="col-md-6">
            <label for="inputCity" class="form-label">Localidad</label>
            <input type="text" class="form-control" id="inputCity"
                placeholder="Ingrese localidad" required>
        </div>

        <div class="col-md-6">
            <label for="inputAddress" class="form-label">Direccion</label>
            <input type="text" class="form-control" id="inputAddress"
                placeholder="Ingrese su calle" required>
        </div>

        <div class="col-6 col-md-3">
            <label for="inputAddressNumber" class="form-label">Numero</label>
            <input type="text" class="form-control" id="inputAddressNumber"
                placeholder="N°" required>
        </div>

        <div class="col-6 col-md-3">
            <label for="inputAddressFloor" class="form-label">Piso</label>
            <input type="text" class="form-control" id="inputAddressFloor"
                placeholder="N°">
        </div>
    `;

    return divFormRow;
}

/* *****************************************************************
 *                    FILTER AND ORDER FUNCTIONS
 * *****************************************************************/

function filterProductsByName(productsArray, inputName) {
    /*
    Returns the array of products whit products that includes inputName.
    If inputName is null, this function returns the productsArray.
    */
    return inputName ? productsArray.filter(product => product.name.toLowerCase().includes(inputName.toLowerCase())) : productsArray;
}

function filterProductsByMinPrice(productsArray, inputMinPrice) {
    /*
    Returns the array of products filter by min price.
    If inputMinPrice is null, this function returns the productsArray.
    */
    return inputMinPrice ? productsArray.filter(product => product.price >= inputMinPrice) : productsArray;
}

function filterProductsByMaxPrice(productsArray, inputMaxPrice) {
    /*
    Returns the array of products filter by max price.
    If inputMaxPrice is null, this function returns the productsArray.
    */
    return inputMaxPrice ? productsArray.filter(product => product.price <= inputMaxPrice) : productsArray;
}

function sortProductsBySelectedSort(productsArray, selectedSortMethod) {
    /*
    Returns the array sorted based on selectedSortMethod.
    */
    if (selectedSortMethod == SORT_NONE) {
        return productsArray;
    }

    let alphabeticalOrder = function (productA, productB) {
        return productA.name > productB.name ? 1 : -1;
    }

    if (selectedSortMethod == SORT_NAME) {
        return productsArray.sort(alphabeticalOrder);
    }

    let isGreater = function (productA, productB) {
        return productB.price - productA.price;
    }

    return selectedSortMethod == SORT_ASC ? productsArray.sort(isGreater) : productsArray.sort(isGreater).reverse();
}

/* *****************************************************************
 *                     EVENT LISTENERS FUNCTIONS
 * *****************************************************************/

function submitCartPurchaseEventListener(cart) {
    /*
    Event listeners of submit carat purchase button.
    If the cart is empty, this function render a sweet alert. But if the cart has products its redirects to compra.html page.
    */
    let buttonBuyCart = document.getElementById(BUTTON_BUY_CART);

    buttonBuyCart.addEventListener("click", function (_) {
        if (cart.isEmpty()) {
            sweetAlertEmptyCart();
        } else {
            window.location.href = COMPRA_PATH;
        }
    });
}

function cartEventListeners(cart) {
    /*
    Event listeners of cart section.
    It includes buttons 'button-substract-from-cart', 'button-add-to-cart' and 'button-remove-from-cart'. Based on the button selected, this function uses the respective cart methods: cart.substractProductFromCart(product), cart.substractProductFromCart(product) or cart.addProductToCart(product).
    Its also calls submitCartPurchaseEventListener.
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

    // Submit event listener
    submitCartPurchaseEventListener(cart);
}

function ecommerceEventListeners() {
    /*
    Event listeneres of ecommerce section.
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

function selectDeliveryModeEventListener() {
    /*
    Event listener of deliveryMode select of buy form.
    If select value is 2, it renders the delivery address form, else it cleans the render.
    */
    let selectDeliveryMode = document.getElementById(DELIVERY_SELECT_ID);
    selectDeliveryMode.addEventListener("change", function (event) {
        let deliveryMode = event.target.value;
        if (deliveryMode == DELIVERY_ADDRESS_ON) {
            renderElementInContainer(DELIVERY_FORM_CONTAINER_ID, generateDeliveryAddressForm());
        } else {
            cleanRender(DELIVERY_FORM_CONTAINER_ID);
        }
    });
}

function filterFormEventListeners() {
    /*
    Event listeneres of filter form.
    It uses handleFilterData to update the filter products array.
    */
    let filterForm = document.getElementById(FILTER_FORM_ID);

    filterForm.addEventListener("submit", handleFilterFormData);
}

function handleFilterFormData(e) {
    /*
    This function handles the data in filter form.
    It also updates the ecommerce container, based on data.
    */
    e.preventDefault();
    let filterFormData = new FormData(filterForm);

    let inputProductName = filterFormData.get(NAME_PRODUCT_NAME)
    let inputMinPrice = filterFormData.get(NAME_MIN_PRICE);
    let inputMaxPrice = filterFormData.get(NAME_MAX_PRICE);
    let selectSort = filterFormData.get(NAME_SELECT_SORT);

    let productsArrayFiltered = productsArray;

    productsArrayFiltered = filterProductsByName(productsArrayFiltered, inputProductName);
    productsArrayFiltered = sortProductsBySelectedSort(productsArrayFiltered, selectSort);
    productsArrayFiltered = filterProductsByMinPrice(productsArrayFiltered, inputMinPrice);
    productsArrayFiltered = filterProductsByMaxPrice(productsArrayFiltered, inputMaxPrice);

    updateEcommerceContainer(productsArrayFiltered);
}

/* *****************************************************************
 *                        EMAILJS API FUNCTIONS
 * *****************************************************************/

function sendEmailJS() {
    /*
    Purchase form event listener. This function uses EmailJS API to send an email with the purchase info.
    See: https://www.emailjs.com/docs/
    */
    const btn = document.getElementById(BUTTON_SUBMIT_PURCHASE);

    document.getElementById(PURCHASE_FORM_ID)
        .addEventListener('submit', function (event) {
            event.preventDefault();

            btn.value = 'Enviando...';

            const serviceID = 'default_service';
            const templateID = 'template_gztd5fb';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Continuar';
                    sweetAlertSubmitPurchaseOk();
                }, (err) => {
                    btn.value = 'Continuar';
                    sweetAlertSubmitError(err);
                });
        });
}

/* *****************************************************************
 *                        SWEETALERT FUNCTIONS
 * *****************************************************************/

// See: https://sweetalert.js.org/guides/

function sweetAlertSubmitError(err) {
    /*
    Alert of an error.
    */
    swal({
        title: '¡Error!',
        text: JSON.stringify(err),
        icon: "error"
    });
}

function sweetAlertSubmitPurchaseOk() {
    /*
    Alert of purchase succefull.
    */
    swal({
        title: '¡Compra realizada correctamente!',
        text: 'Revisa tu casilla de correo.',
        icon: "success"
    });
}

function sweetAlertEmptyCart() {
    /*
    Alert of empty cart error.
    */
    swal({
        title: 'Error',
        text: 'El carrito está vacío.',
        icon: "info"
    });
}

/* *****************************************************************
 *                        TOASTIFY FUNCTIONS
 * *****************************************************************/

// See: https://github.com/apvarun/toastify-js

function renderAddedProductToCartToastify(product) {
    /*
    This function renders a Toast with the legend "El producto '${product.name}'\nha sido agregado al carrito!"
    Its used when a product is added to cart.
    */
    Toastify({
        text: `El producto '${product.name}'\nha sido agregado al carrito!`,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, rgb(31, 59, 71), rgb(0, 15, 18))",
        },
    }).showToast();
}

function renderRemovedProductFromCartToastify(product) {
    /*
    This function renders a Toast with the legend "El producto ${product.name}'\n ha sido removido del carrito!"
    Its used when a product is removed from cart.
    */
    Toastify({
        text: `El producto '${product.name}'\n ha sido removido del carrito!`,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, rgb(41, 9, 9), rgb(4, 0, 1))",
        },
    }).showToast();
}

function renderSubstractedProductFromCartToastify(product) {
    /*
    This function renders a Toast with the legend "El producto '${product.name}'\nse ha quitado del carrito!"
    Its used when a product is substracted from cart.
    */
    Toastify({
        text: `El producto '${product.name}'\nse ha quitado del carrito!`,
        duration: 3000,
        gravity: "bottom",
        style: {
            background: "linear-gradient(to right, rgb(41, 9, 9), rgb(4, 0, 1))",
        },
    }).showToast();
}

/* *****************************************************************
 *                         INITIALIZATION
 * *****************************************************************/

/*                              CART                               */

// Initialize cart in localStorage
if (!localStorage.getItem(CART_KEY)) {
    localStorage.setItem(CART_KEY, []);
}

// Cart object initialization
let cart = new Cart;

// Render cart container from localStorage
cart.renderCartContainerFromLocalStorage();

/*                         PURCHASE FORM                          */

if (document.getElementById(BUTTON_SUBMIT_PURCHASE)) {
    sendEmailJS();
}

/*                          ECOMMERCE                             */

// Products array of ecommerce
var productsArray = [
    new Product(
        "P00", "Alfajores San Valentin", 800, `${INITIAL_IMG_PATH}alfajores_san_valentin.jpg`, "Caja de 6 alfajores decorados"
    ),
    new Product(
        "P01", "Caja tentacion", 1500, `${INITIAL_IMG_PATH}caja_tentacion.jpg`, "Caja con brownies y masitas de chocolate"
    ),
    new Product(
        "P02", "Cheescake", 800, `${INITIAL_IMG_PATH}cheesecake.jpg`, "Torta cheesecake"
    ),
    new Product(
        "P03", "Alfajores de maicena", 800, `${INITIAL_IMG_PATH}alfajores_maicena.jpg`, "9 alfajores de maicena apilados"
    ),
    new Product(
        "P04", "Brownies tentación", 1200, `${INITIAL_IMG_PATH}caja_brownies.jpg`, "Caja de 9 brownies decorados"
    ),
    new Product(
        "P05", "Cakes", 1200, `${INITIAL_IMG_PATH}cakes.jpg`, "Caja de 3 tortas"
    ),
    new Product(
        "P06", "Budines", 1000, `${INITIAL_IMG_PATH}budines.jpg`, "Caja de 3 budines"
    ),
    new Product(
        "P07", "Alfacookies", 800, `${INITIAL_IMG_PATH}alfacookies.jpg`, "Caja de 9 alfacookies"
    ),
    new Product(
        "P08", "Tiramisú", 750, `${INITIAL_IMG_PATH}tiramisu.jpg`, "Torta tiramisú"
    ),
    new Product(
        "P09", "Huevo relleno", 1050, `${INITIAL_IMG_PATH}huevo_relleno.jpg`, "Huevo de pascua relleno de chocolate"
    ),
    new Product(
        "P10", "Brownie frutillas", 900, `${INITIAL_IMG_PATH}brownie_frutillas.jpg`, "Brownie de chocolate con frutillas"
    ),
    new Product(
        "P11", "Capelina Mia", 700, `${INITIAL_IMG_PATH}capelina_mia.jpg`, "Capelina de chocolate blanco con chocotorta"
    ),
    new Product(
        "P12", "Brownie pizza", 900, `${INITIAL_IMG_PATH}brownie_pizza.jpg`, "Brownie decorado con chocolate"
    ),
    new Product(
        "P13", "Oreos bañadas", 650, `${INITIAL_IMG_PATH}oreos_bañadas.jpg`, "Caja de 6 oreos bañadas"
    ),
];

// Render ecommerce container
if (document.getElementById(ECOMMERCE_CONTAINER_ID)) {
    renderElementInContainer(ECOMMERCE_CONTAINER_ID, generateEcommerceContainerHTML(productsArray));
    filterFormEventListeners();
}

// Event listeners on ecommerce
ecommerceEventListeners();

// Event listener delivery address form
if (document.getElementById(DELIVERY_FORM_CONTAINER_ID)) {
    selectDeliveryModeEventListener();
}
