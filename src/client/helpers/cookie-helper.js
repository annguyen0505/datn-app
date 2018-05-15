
export const saveAccessToken = (localStorage, accessToken) => {
    localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = (localStorage) => {
    return localStorage.getItem("accessToken");
};

export const removeAccessToken = (localStorage) => {
    localStorage.removeItem("accessToken");
};

//no use redux in here


export const setProducts = (products) => {
    localStorage.setItem("products", JSON.stringify(products));
};

export const getProducts = () => {
    const Jsonproducts = localStorage.getItem("products");
    const products = Jsonproducts === null ? [] : JSON.parse(Jsonproducts);
    return products;
};

const checkItemIsExist = (products, item) => {
    for (let i = 0; i < products.length; ++i) {
        const product = products[i];
        if (product.productId === item.productId) {
            return true;
        }
    }
    return false;
};

export const increaseCartItem = (productId) => {
    const products = getProducts();
    products.forEach(product => {
        if (productId === product.productId) {
            product.quantity = ++product.quantity;
        }
    });
    setProducts(products);

};

export const decreaseCartItem = (productId) => {
    const products = getProducts();
    products.forEach(product => {
        if (productId === product.productId) {
            product.quantity = --product.quantity;
        }
    });
    setProducts(products);

};
export const addCartItem = (item) => {
    const products = getProducts();
    if (checkItemIsExist(products, item)) {
        increaseCartItem(item.productId);
    }
    else {
        products.push(item);
        setProducts(products);
    }
};

export const removeItem = (productId) => {
    const products = getProducts();
    const newproducts = products.filter((product) => {
        return product.productId !== productId;
    });
    setProducts(newproducts);
};


export const updateCartItem = (item) => {
    console.log(item);
    if (item.quantity === 0) {
        removeItem(item.productId);
    } else {
        const products = getProducts();
        products.forEach(product => {
            if (item.productId === product.productId) {
                product.quantity = item.quantity;
            }
        });
        setProducts(products);
    }
};


export const removeAllCarts = () => {
    localStorage.removeItem("products");
};

