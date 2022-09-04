function filter_products_by_min_price(products_array, min_price) {
    return products_array.filter(product => product.price >= min_price);
}

function filter_products_by_max_price(products_array, max_price) {
    return products_array.filter(product => product.price <= max_price);
}

function filter_products_by_name(products_array, name) {
    return products_array.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
}

function add_product_to_cart(products_array, product_id, products_cart) {
    products_cart.push(products_array.find(product => product.name == product_id));
}