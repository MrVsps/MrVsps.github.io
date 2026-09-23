// ============================================================
//  1. Fechas objetivo de cada cuenta regresiva
//     (si la fecha ya pasó, la sección muestra el botón de una vez)
// ============================================================
const fechas = {
    // --- 2025 ---
    flores:     new Date('September 21, 2025 12:20:00').getTime(),
    aniversario: new Date('December 20, 2025 20:00:00').getTime(),
    cumple:     new Date('December 20, 2025 08:00:00').getTime(),

    // --- 2026 ---
    cumple26:   new Date('December 20, 2026 08:00:00').getTime()
};

// ============================================================
//  2. Cuenta regresiva (días, horas, minutos y segundos)
// ============================================================
function actualizarContador(targetDate, prefijo) {
    const hoursEl   = document.getElementById(`hours-${prefijo}`);
    const minutesEl = document.getElementById(`minutes-${prefijo}`);
    const secondsEl = document.getElementById(`seconds-${prefijo}`);
    const containerEl = document.getElementById(`countdown-${prefijo}`);
    const msgEl = document.getElementById(`final-msg-${prefijo}`);
    const btnEl = document.getElementById(`btn-${prefijo}`);

    if (!containerEl) return; // la sección no existe en esta página

    const timeLeft = targetDate - new Date().getTime();

    if (timeLeft > 0) {
        const daysEl = document.getElementById(`days-${prefijo}`);

        const days    = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours   = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const dosDigitos = (n) => (n < 10 ? '0' + n : String(n));

        if (daysEl) daysEl.textContent = days;           // los días no se rellenan a 2 cifras
        if (hoursEl) hoursEl.textContent = dosDigitos(hours);
        if (minutesEl) minutesEl.textContent = dosDigitos(minutes);
        if (secondsEl) secondsEl.textContent = dosDigitos(seconds);
    } else {
        // Se cumplió la fecha: ocultar el reloj y mostrar el regalo
        containerEl.style.display = 'none';
        if (msgEl) msgEl.style.display = 'block';
        if (btnEl) btnEl.style.display = 'inline-block';
    }
}

function iniciarContadores() {
    for (const [prefijo, fecha] of Object.entries(fechas)) {
        actualizarContador(fecha, prefijo);
    }
}

setInterval(iniciarContadores, 1000);
iniciarContadores(); // ejecución inicial para no esperar 1 segundo

// ============================================================
//  3. Navegación: años, tarjetas y secciones
// ============================================================

// --- Cambiar entre el menú del 2026 y el del 2025 ---
document.querySelectorAll('.year-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
        const year = btn.dataset.year;

        document.querySelectorAll('.year-btn').forEach((b) => {
            b.classList.toggle('is-active', b === btn);
        });

        document.querySelectorAll('.card-grid').forEach((grid) => {
            grid.hidden = grid.id !== `grid-${year}`;
        });

        volverAlMenu(); // si estaba viendo algo, regresa al menú del año elegido
    });
});

// --- Abrir el detalle de una sección ---
function abrirSeccion(seccion) {
    document.getElementById('hub').hidden = true;
    document.getElementById('detalle').hidden = false;

    document.querySelectorAll('.content-section').forEach((sec) => {
        sec.hidden = sec.id !== `seccion-${seccion}`;
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Regresar a la rejilla de tarjetas ---
function volverAlMenu() {
    document.getElementById('hub').hidden = false;
    document.getElementById('detalle').hidden = true;

    document.querySelectorAll('.content-section').forEach((sec) => {
        sec.hidden = true;
    });
}

// ============================================================
//  4. Música: el botón de la esquina prende y apaga la canción
// ============================================================
const musica = document.getElementById('countdown-audio');
const btnMusica = document.getElementById('btn-musica');

if (musica && btnMusica) {
    btnMusica.addEventListener('click', () => {
        if (musica.paused) {
            musica.play().catch(() => {}); // si el navegador lo bloquea, no pasa nada
        } else {
            musica.pause();
        }
    });

    musica.addEventListener('play', () => {
        btnMusica.classList.add('sonando');
        btnMusica.textContent = '🔊';
        btnMusica.setAttribute('aria-label', 'Pausar música');
    });

    musica.addEventListener('pause', () => {
        btnMusica.classList.remove('sonando');
        btnMusica.textContent = '🎵';
        btnMusica.setAttribute('aria-label', 'Poner música');
    });
}
