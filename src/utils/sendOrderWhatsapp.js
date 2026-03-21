export const sendOrderWhatsapp = (orderDetails) => {
    const phoneNumber = "YOUR_WHATSAPP_NUMBER";
    const message = `New Order: ${JSON.stringify(orderDetails)}`;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
};
