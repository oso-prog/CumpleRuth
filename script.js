/* GENERADOR DE LUCIÉRNAGAS */
for (let i = 0; i < 65; i++) {
    const firefly = document.createElement('div');
    firefly.className = 'firefly';
    firefly.style.left = Math.random() * 100 + 'vw';
    firefly.style.top = Math.random() * 100 + 'vh';
    firefly.style.animationDuration = (5 + Math.random() * 9) + 's';
    firefly.style.animationDelay = (Math.random() * 6) + 's';
    const size = 2 + Math.random() * 4;
    firefly.style.width = size + 'px';
    firefly.style.height = size + 'px';
    document.body.appendChild(firefly);
}

/* PARTICULAS BRILLANTES DE LA PORTADA */
(function initSparkles() {
    const container = document.getElementById('cover-sparkles');
    if (!container) return;
    function createSparkle() {
        const dot = document.createElement('div');
        dot.className = 'sparkle-dot';
        const size = Math.random() * 5 + 2;
        dot.style.width = size + 'px';
        dot.style.height = size + 'px';
        dot.style.left = Math.random() * 100 + '%';
        dot.style.top = Math.random() * 100 + '%';
        dot.style.animationDuration = (Math.random() * 2.5 + 1.5) + 's';
        container.appendChild(dot);
        setTimeout(() => dot.remove(), 4000);
    }
    setInterval(createSparkle, 250);
})();

/* APERTURA MÁGICA DEL LIBRO */
const openBookBtn = document.getElementById('openBookBtn');
const bookWrapper = document.getElementById('bookWrapper');
const bookStage = document.getElementById('bookStage');
const mainContent = document.getElementById('mainContent');
const music = document.getElementById('backgroundMusic');
const musicButton = document.getElementById('musicButton');

let musicPlaying = false;

openBookBtn.addEventListener('click', () => {
    bookWrapper.classList.add('open');
    setTimeout(() => {
        bookStage.classList.add('opened');
        mainContent.classList.add('visible');
    }, 600);

    // Intentar reproducir audio al abrir
    music.play().then(() => {
        musicPlaying = true;
        musicButton.classList.add('playing');
        musicButton.textContent = '♫';
    }).catch(() => {});
});

/* CONTROL DE MÚSICA MANUAL */
musicButton.addEventListener('click', () => {
    if (!musicPlaying) {
        music.play().then(() => {
            musicPlaying = true;
            musicButton.classList.add('playing');
            musicButton.textContent = '♫';
        });
    } else {
        music.pause();
        musicPlaying = false;
        musicButton.classList.remove('playing');
        musicButton.textContent = '♪';
    }
});

/* CALENDARIO DICIEMBRE 2026 CON CORONA EN EL DÍA 5 */
const calendarGrid = document.getElementById('calendarGrid');
const dayNames = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

dayNames.forEach(day => {
    const el = document.createElement('span');
    el.className = 'day-name';
    el.textContent = day;
    calendarGrid.appendChild(el);
});

const firstDay = new Date(2026, 11, 1).getDay();
const totalDays = new Date(2026, 12, 0).getDate();

for (let i = 0; i < firstDay; i++) {
    calendarGrid.appendChild(document.createElement('span'));
}

for (let day = 1; day <= totalDays; day++) {
    const el = document.createElement('span');
    
    if (day === 5) {
        el.className = 'selected';
        el.title = 'Día de los XV Años';
        const crownImg = document.createElement('img');
        crownImg.src = 'img/Corona.png';
        crownImg.className = 'calendar-crown-icon';
        crownImg.alt = '5 (Día del Evento)';
        el.appendChild(crownImg);
    } else {
        el.textContent = day;
    }
    
    calendarGrid.appendChild(el);
}

/* CUENTA REGRESIVA */
const eventDate = new Date(2026, 11, 5, 17, 0, 0).getTime();

function updateCountdown() {
    const now = new Date().getTime();
    const diff = eventDate - now;

    if (diff <= 0) {
        document.getElementById('days').textContent = '00';
        document.getElementById('hours').textContent = '00';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* DESPLAZAMIENTO AUTOMÁTICO */
const scrollButton = document.getElementById('scrollButton');
let autoScrolling = false;
let scrollAnimFrame = null;

function stepScroll() {
    if (!autoScrolling) return;
    window.scrollBy(0, 1.2);
    if ((window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 5) {
        stopAutoScroll();
        return;
    }
    scrollAnimFrame = requestAnimationFrame(stepScroll);
}

function stopAutoScroll() {
    autoScrolling = false;
    if (scrollAnimFrame) cancelAnimationFrame(scrollAnimFrame);
    scrollButton.textContent = '↓ Auto-Scroll';
}

scrollButton.addEventListener('click', () => {
    if (autoScrolling) {
        stopAutoScroll();
    } else {
        autoScrolling = true;
        scrollButton.textContent = 'Ⅱ Pausar';
        stepScroll();
    }
});

window.addEventListener('wheel', stopAutoScroll, { passive: true });
window.addEventListener('touchstart', stopAutoScroll, { passive: true });