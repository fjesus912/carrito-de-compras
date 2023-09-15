function modal() {
    const modal = document.getElementById('modal')


    document.body.addEventListener('click', function (e) {
        if (e.target.closest('#openModal')) {
            const modal = e.target.closest('#openModal').parentElement.parentElement.nextElementSibling
            modal.classList.add('show--modal')
        }

        if (e.target.closest('#closeModal')) {
            const modal = e.target.closest('#closeModal').parentElement.parentElement
            modal.classList.remove('show--modal')
        } 
    })
}

export default modal