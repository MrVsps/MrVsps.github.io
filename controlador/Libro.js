document.addEventListener('DOMContentLoaded', () => {
    const libro = document.querySelector('.libro');
    const cubierta = document.querySelector('.cubierta');
    const paginas = document.querySelectorAll('.pagina');

    let paginaActual = 0;

    cubierta.addEventListener('click', () => {
        cubierta.classList.add('volteada');
        setTimeout(() => {
            cubierta.style.zIndex = '1';
        }, 1000);
    }, { once: true }); 

    libro.addEventListener('click', (event) => {
        if (event.target === cubierta) {
            return;
        }

        // Si hay más páginas para voltear
        if (paginaActual < paginas.length) {
            paginas[paginaActual].classList.add('volteada');
            paginaActual++;
        }
    });
});