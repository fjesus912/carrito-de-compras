function products (products) {
    const ls = window.localStorage
    const db = JSON.parse(ls.getItem('productos')) || [...products]

    function printProducts() {
        const productsDOM = document.querySelector('.products__container')
        let htmlProduct = ''

        for (let product of db) {
            htmlProduct += `
            <article class="product">
                <div class="product__image">
                    <img src="${product.image}" alt="${product.name}">`

                    if (product.quantity === 0) {
                        htmlProduct += `<div class="out--stock">Producto agotado</div>`
                    }
                
                    htmlProduct +=  `<button type="button" class="product__actions-btn product--view" id="openModal">
                        <i class='bx bx-info-circle'></i> Detalles
                    </button>
                </div>
                <div class="product__content">
                    <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
                        <i class='bx bx-cart-add'></i>
                    </button>
                    <span class="product__price">$${product.price}</span>
                    <span class="product__stock">Disponibles: ${product.quantity}</span>
                    <h3 class="product__title">${product.name}</h3>
                </div>
            </article>

            <div id="modal" class="overlay">
                <article class="modal__card">
                    <button type="button" class="nav__btn btn--close xbtn" id="closeModal">
                    <i class='bx bx-x'></i>
                </button>
                    <img class"modalimg" src="${product.image}" alt="${product.name}">

                    
            
                    <div class="modal__card--body">
                        <h3 class="card__title">${product.name}</h3>
                        <span class="product__price">$${product.price}</span>
                        <p class="modal__card--text">${product.description}</p>
                        <button type="button" class="product__btn add--to--cart" data-id="${product.id}">
                            <i class='bx bx-cart-add'></i>
                        </button>
                    </div>
                </article>
            </div>
            `
        }
    
        productsDOM.innerHTML = htmlProduct
        ls.setItem('productos', JSON.stringify(db))
    }
    printProducts()

    return {
        db,
        printProducts
    }
}

export default products