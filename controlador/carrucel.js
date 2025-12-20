const { gsap } = window;

const buttons = {
    prev: document.querySelector(".btn--left"),
    next: document.querySelector(".btn--right"),
};
const cardsContainerEl = document.querySelector(".cards__wrapper");
const appBgContainerEl = document.querySelector(".app__bg");
const cardInfosContainerEl = document.querySelector(".info__wrapper");

let currentIndex = 0;
const cards = [...cardsContainerEl.querySelectorAll(".card")];
const bgs = [...appBgContainerEl.querySelectorAll(".app__bg__image")];
const infos = [...cardInfosContainerEl.querySelectorAll(".info")];
const totalCards = cards.length;

buttons.next.addEventListener("click", () => swapCards("right"));
buttons.prev.addEventListener("click", () => swapCards("left"));

function swapCards(direction) {
    // Remover todas las clases de todas las tarjetas
    cards.forEach(card => {
        card.classList.remove("current--card", "next--card", "previous--card");
    });
    bgs.forEach(bg => {
        bg.classList.remove("current--image", "next--image", "previous--image");
    });

    // Calcular nuevo índice
    if (direction === "right") {
        currentIndex = (currentIndex + 1) % totalCards;
    } else {
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
    }

    // Calcular índices vecinos
    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;

    // Aplicar clases a las tarjetas correctas
    cards[currentIndex].classList.add("current--card");
    cards[prevIndex].classList.add("previous--card");
    cards[nextIndex].classList.add("next--card");

    bgs[currentIndex].classList.add("current--image");
    bgs[prevIndex].classList.add("previous--image");
    bgs[nextIndex].classList.add("next--image");

    // Ajustar z-index
    cards[currentIndex].style.zIndex = "50";
    cards[prevIndex].style.zIndex = "30";
    cards[nextIndex].style.zIndex = "30";

    bgs[currentIndex].style.zIndex = "-1";
    bgs[prevIndex].style.zIndex = "-2";
    bgs[nextIndex].style.zIndex = "-2";

    changeInfo(direction);
}

function changeInfo(direction) {
    // Remover todas las clases de info
    infos.forEach(info => {
        info.classList.remove("current--info", "next--info", "previous--info");
    });

    const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
    const nextIndex = (currentIndex + 1) % totalCards;

    gsap.timeline()
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 0.5,
            pointerEvents: "none",
        })
        .to(
            infos[currentIndex].querySelectorAll(".text"),
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "-120px",
                opacity: 0,
            },
            "-="
        )
        .call(() => {
            // Aplicar clases a los infos correctos
            infos[currentIndex].classList.add("current--info");
            infos[prevIndex].classList.add("previous--info");
            infos[nextIndex].classList.add("next--info");
        })
        .call(() => initCardEvents())
        .fromTo(
            infos[currentIndex].querySelectorAll(".text"),
            {
                opacity: 0,
                translateY: "40px",
            },
            {
                duration: 0.4,
                stagger: 0.1,
                translateY: "0px",
                opacity: 1,
            }
        )
        .to([buttons.prev, buttons.next], {
            duration: 0.2,
            opacity: 1,
            pointerEvents: "all",
        });
}

function updateCard(e) {
    const card = e.currentTarget;
    const box = card.getBoundingClientRect();
    const centerPosition = {
        x: box.left + box.width / 2,
        y: box.top + box.height / 2,
    };
    let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
    gsap.set(card, {
        "--current-card-rotation-offset": `${angle}deg`,
    });
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(currentInfoEl, {
        rotateY: `${angle}deg`,
    });
}

function resetCardTransforms(e) {
    const card = e.currentTarget;
    const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
    gsap.set(card, {
        "--current-card-rotation-offset": 0,
    });
    gsap.set(currentInfoEl, {
        rotateY: 0,
    });
}

function initCardEvents() {
    const currentCardEl = cardsContainerEl.querySelector(".current--card");
    if (currentCardEl) {
        currentCardEl.addEventListener("pointermove", updateCard);
        currentCardEl.addEventListener("pointerout", (e) => {
            resetCardTransforms(e);
        });
    }
}

initCardEvents();

// Animación inicial
gsap.to(cardsContainerEl.children, {
    delay: 0.15,
    duration: 0.5,
    stagger: {
        ease: "power4.inOut",
        from: "right",
        amount: 0.1,
    },
    "--card-translateY-offset": "0%",
})
.to(cardInfosContainerEl.querySelector(".current--info").querySelectorAll(".text"), {
    delay: 0.5,
    duration: 0.4,
    stagger: 0.1,
    opacity: 1,
    translateY: 0,
})
.to([buttons.prev, buttons.next], {
    duration: 0.4,
    opacity: 1,
    pointerEvents: "all",
}, "-=0.4");