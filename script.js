const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
});

/* ======================
   CONTADOR
====================== */
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  const target = +counter.getAttribute("data-target");
  const prefix = counter.getAttribute("data-prefix") || "";
  let current = 0;
  const increment = target / 100; // velocidade

  const updateCounter = () => {
    current += increment;

    if (current < target) {
      const value = target % 1 === 0 ? Math.ceil(current) : current.toFixed(1);

      counter.innerText = `${prefix}${value}`;
      requestAnimationFrame(updateCounter);
    } else {
      counter.innerText = `${prefix}${target}`;
    }
  };

  updateCounter();
};

/* ======================
   QUANDO ENTRA NA TELA
====================== */
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.observe(entry.target); // anima só uma vez
      }
    });
  },
  { threshold: 0.5 },
);

counters.forEach((counter) => observer.observe(counter));

// 1. Remova o ponto
const input = document.getElementsByClassName("input-box");

// 2. Acesse o índice [0] para pegar o primeiro item da lista
console.log(input[0].className);
