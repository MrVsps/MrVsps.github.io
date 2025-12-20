// 1. Definir las fechas objetivo (Ajusta el año y mes según necesites)
const fechas = {
    flores: new Date('September 21, 2025 12:20:00').getTime(),
    aniversario: new Date('December 20, 2025 20:00:00').getTime(), // Cambia esta fecha
    cumple: new Date('December 20, 2025 08:00:00').getTime()      // Cambia esta fecha
};

// 2. Función principal que calcula y muestra el tiempo
function actualizarContador(targetDate, prefijo) {
    const now = new Date().getTime();
    const timeLeft = targetDate - now;

    // Elementos del DOM usando el prefijo (ej: horas-flores, horas-aniversario)
    const hoursEl = document.getElementById(`hours-${prefijo}`);
    const minutesEl = document.getElementById(`minutes-${prefijo}`);
    const secondsEl = document.getElementById(`seconds-${prefijo}`);
    const containerEl = document.getElementById(`countdown-${prefijo}`);
    const msgEl = document.getElementById(`final-msg-${prefijo}`);
    const btnEl = document.getElementById(`btn-${prefijo}`);

    if (timeLeft > 0) {
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        hoursEl.innerHTML = hours < 10 ? '0' + hours : hours;
        minutesEl.innerHTML = minutes < 10 ? '0' + minutes : minutes;
        secondsEl.innerHTML = seconds < 10 ? '0' + seconds : seconds;
    } else {
        // Cuando el tiempo termina
        if (containerEl) containerEl.style.display = 'none';
        if (msgEl) msgEl.style.display = 'block';
        if (btnEl) btnEl.style.display = 'inline-block';
    }
}

// 3. Función para ejecutar todos los contadores a la vez
function iniciarContadores() {
    actualizarContador(fechas.flores, 'flores');
    actualizarContador(fechas.aniversario, 'aniversario');
    actualizarContador(fechas.cumple, 'cumple');
}

// Ejecutar cada segundo
setInterval(iniciarContadores, 1000);
iniciarContadores(); // Ejecución inicial para evitar el retraso de 1s

// 4. Función para cambiar de pestaña
function mostrarSeccion(seccion) {
    document.querySelectorAll('.content-section').forEach(div => {
        div.style.display = 'none';
    });
    document.getElementById(`seccion-${seccion}`).style.display = 'block';
}