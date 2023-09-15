function showMenu() {
    const nav = document.querySelector('.nav')
    const menu = document.querySelector('.nav__menu')
    const btnCart = document.querySelector('.btn--cart')

    nav.addEventListener('click', function (event) {
        if (event.target.closest('.btn--menu')) {
            menu.classList.toggle('show--menu')
        }

        if (event.target.closest('.btn--close')) {
            menu.classList.remove('show--menu')
        }

        if (event.target.closest('.nav__link')) {
            menu.classList.remove('show--menu')
        }
    })

    btnCart.addEventListener('click', function (event) {
        if (event.target.closest('.btn--cart')) {
            menu.classList.remove('show--menu')
        }
    })
}

export default showMenu