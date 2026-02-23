const envs = {
    phone: "+919390816108"
};

function isMobile() {
    return /Mobi|Android/i.test(navigator.userAgent);
}

function openWhatsApp(message) {
    const encoded = message || '';
    if (isMobile()) {
        window.location.href = `https://wa.me/${envs.phone}?text=${encoded}`;
    } else {
        // desktop opens web.whatsapp
        window.open(`https://web.whatsapp.com/send?phone=${envs.phone}&text=${encoded}`, '_blank');
    }
}
function call() {

}

const whatsappButtons = document.querySelectorAll('[aria-label="chatOnWhatsApp"]');
whatsappButtons.forEach(btn => {
    btn.addEventListener('click', () => openWhatsApp(btn.dataset.msg));
});

const callButtons = document.querySelectorAll('a[aria-label="callBtn"]');
callButtons.forEach(btn => {
    btn.href = `tel:${envs.phone}`;
});

const bookingButtons = document.querySelectorAll('a[aria-label="bookBtn"]');
bookingButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert("This button has not been configured yet!");
    });
});
