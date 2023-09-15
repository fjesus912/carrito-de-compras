function darkMode() {
    const ls = window.localStorage

    const btnDarkMode = document.getElementById('toggle')
    const icon = document.getElementById('icon')

    // 2. Uso del valor
    if (ls.getItem('darkMode')) {
        document.body.classList.add('dark')
    } else {
        document.body.classList.remove('dark')
    }

    if (ls.getItem('iconMode') === 'box-sun') {
        icon.classList.remove('bx-moon'); 
        icon.classList.add('bx-sun');
    } else {
        icon.classList.remove('bx-sun');
        icon.classList.add('bx-moon');
    }


    btnDarkMode.addEventListener('click', function () {
        document.body.classList.toggle('dark')

        // 1. localStorage (Guardar y quitar el valor)
        if (document.body.classList.contains('dark')) {
            ls.setItem('darkMode', 'dark')
        } else {
            ls.removeItem('darkMode')
        }
    })

    btnDarkMode.addEventListener('click', function () {
        if (icon.classList.contains('bx-moon')) {
            ls.setItem('iconMode', 'box-sun') // Persistencia
            icon.classList.remove('bx-moon'); // Elimina la clase bx-moon
            icon.classList.add('bx-sun');    // Agrega la clase bx-sun
        } else {
            ls.setItem('iconMode', 'box-moon') // Persistencia
            icon.classList.remove('bx-sun'); // Elimina la clase bx-sun
            icon.classList.add('bx-moon');   // Agrega la clase bx-moon
        }

    })

 

}

export default darkMode