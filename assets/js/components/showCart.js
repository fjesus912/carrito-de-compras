function showCart() {
    const btnCart = document.querySelector('.btn--cart')
    const cart = document.querySelector('.cart')
    const btnMenu = document.querySelector('.btn--menu')

    btnCart.addEventListener('click', function () {
        cart.classList.toggle('show--cart')
    })
    
    cart.addEventListener('click', function (event) {
        if (event.target.closest('.btn--close')) {
            cart.classList.remove('show--cart')
        }
    })

    btnMenu.addEventListener('click', function (event) {
        if (event.target.closest('.btn--menu')) {
            cart.classList.remove('show--cart')
        }
    })

}

export default showCart