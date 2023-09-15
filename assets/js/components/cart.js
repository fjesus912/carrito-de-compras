function cart(db, printProducts) {
    const ls = window.localStorage
    let cart = JSON.parse(ls.getItem('cart')) || []

    // Elementos del DOM
    const productsDOM = document.querySelector('.products__container')
    const notifyDOM = document.querySelector('.notify')
    const cartDOM = document.querySelector('.cart__body')
    const countDOM = document.querySelector('.cart__count--item')
    const totalDOM = document.querySelector('.cart__total--item')
    const checkoutDOM = document.querySelector('.btn--buy')

    // Funciones
    function printCart() {
        let htmlCart = ''

        if (cart.length === 0) {
            htmlCart += `
                <div class="cart__empty">
                <i class='bx bx-cart' ></i>
                <p class="cart__empty--text">No hay productos en el carrito</p>
                </div>
            `
            notifyDOM.classList.remove('show--notify')
        } else {
            for (const item of cart) {
                const product = db.find(p => p.id === item.id)
                htmlCart += `
                <article class="article">
                    <div class="article__image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="article__content">
                        <h3 class="article__title">${product.name}</h3>
                        <span class="article__price">$${product.price}</span>
                        <div class="article__quantity">
                            <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                                <i class='bx bx-minus' ></i>
                            </button>
                            <span class="article__quantity-text">${item.qty}</span>
                            <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                                <i class='bx bx-plus' ></i>
                            </button>
                        </div>
                        <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                            <i class='bx bx-trash' ></i>
                        </button>
                    </div>
                </article>
                `
            }
            notifyDOM.classList.add('show--notify')
        }

        cartDOM.innerHTML = htmlCart
        ls.setItem('cart', JSON.stringify(cart))
        notifyDOM.innerHTML = showItemsCount()
        countDOM.innerHTML = showItemsCount()
        totalDOM.innerHTML = `: $ ${showTotal()}`
    }

    function addToCart(id, qty = 1) {
        const productFinded = db.find(i => i.id === id)
        
        if (productFinded.quantity > 0) {
            const itemFinded = cart.find(i => i.id === id)


            if (itemFinded) {        
                if (checkStock(id, qty + itemFinded.qty)) {
                    itemFinded.qty += qty
                } else {
                window.alert('No hay suficiente stock')
            }

            } else {
            cart.push({ id, qty })
            }
        } else {
            window.alert('No hay suficiente stock')
        }

    printCart()
    }

    function checkStock (id, qty) {
    const productFinded = db.find(function (producto) {
        return producto.id === id
    })

    return productFinded.quantity >= qty
    }

    function removeFromCart(id, qty = 1) {
        const itemFinded = cart.find(i => i.id === id)

        const result = itemFinded.qty - qty
        if (result > 0) {
            itemFinded.qty -= qty
        } else {
            cart = cart.filter(i => i.id !== id)
        }
        printCart()
    }

    function deleteFromCart(id) {
        cart = cart.filter(i => i.id !== id)

        printCart()
    }

    function showItemsCount() {
        let suma = 0
        for (const item of cart) {
            suma += item.qty
        }
        return suma
    }

    function showTotal() {
        let total = 0
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)
            total += item.qty * productFinded.price
        }
        return total
    }

    function checkout() {
        for (const item of cart) {
            const productFinded = db.find(p => p.id === item.id)

            productFinded.quantity -= item.qty
        }

        cart = []
        printCart()
        printProducts()
        window.alert('Gracias por su compra')
    }

    printCart()

    // Eventos
    productsDOM.addEventListener('click', function (event) {
        if (event.target.closest('.add--to--cart')) {
            const id = +event.target.closest('.add--to--cart').dataset.id
            addToCart(id)
        }
    })

    cartDOM.addEventListener('click', function (event) {
        if (event.target.closest('.article--minus')) {
            const id = +event.target.closest('.article--minus').dataset.id
            removeFromCart(id)
        }

        if (event.target.closest('.article--plus')) {
            const id = +event.target.closest('.article--plus').dataset.id
            addToCart(id)
        }

        if (event.target.closest('.remove-from-cart')) {
            const id = +event.target.closest('.remove-from-cart').dataset.id
            deleteFromCart(id)
        }
    })

    checkoutDOM.addEventListener('click', function (){
        checkout()
    })
}

export default cart