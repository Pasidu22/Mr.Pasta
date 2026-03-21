export const addToCart = (product, cart) => {
    return [...cart, product];
};

export const removeFromCart = (productId, cart) => {
    return cart.filter((item) => item.id !== productId);
};
