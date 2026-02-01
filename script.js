/* ============================
   MENU MOBILE
============================ */
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");
const backdrop = document.getElementById("menu-backdrop");

if (toggle && menu && backdrop) {
  // Função para alternar o estado (abrir/fechar)
  const toggleMenu = () => {
    menu.classList.toggle("active");
    backdrop.classList.toggle("active");
  };

  // Abre ou fecha ao clicar no ícone hambúrguer
  toggle.addEventListener("click", toggleMenu);

  // Fecha o menu ao clicar em qualquer lugar da área escura (o backdrop)
  backdrop.addEventListener("click", toggleMenu);

  // Opcional: Fecha o menu ao clicar em um link (útil para navegação na mesma página)
  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", toggleMenu);
  });
}

/* ============================
   CONTADOR ANIMADO
============================ */
const counters = document.querySelectorAll(".counter");

if (counters.length > 0) {
  const startCounter = (counter) => {
    const target = +counter.getAttribute("data-target");
    const prefix = counter.getAttribute("data-prefix") || "";
    let current = 0;
    const increment = target / 100;

    const updateCounter = () => {
      current += increment;

      if (current < target) {
        const value =
          target % 1 === 0 ? Math.ceil(current) : current.toFixed(1);

        counter.innerText = `${prefix}${value}`;
        requestAnimationFrame(updateCounter);
      } else {
        counter.innerText = `${prefix}${target}`;
      }
    };

    updateCounter();
  };

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounter(entry.target);
          observer.observe(entry.target); // roda só uma vez
        }
      });
    },
    { threshold: 0.5 },
  );

  counters.forEach((counter) => observer.observe(counter));
}

/* ============================
   BOTÃO CADASTRO
============================ */
const botoesCadastro = document.querySelectorAll(".hero-btn");

botoesCadastro.forEach((botao) => {
  botao.addEventListener("click", () => {
    window.location.href = "cadastro.html";
  });
});

/* ============================
   CONVERSOR HORAS ↔ DIAS
============================ */
const inputHoras = document.getElementById("horas");
const inputDias = document.getElementById("dias");
const botoes = document.querySelectorAll(".botoes-calculo button");

const HORAS_POR_DIA = 8.8;

if (inputHoras && inputDias) {
  // Horas → Dias
  inputHoras.addEventListener("input", () => {
    const horas = parseFloat(inputHoras.value);

    if (!isNaN(horas)) {
      inputDias.value = (horas / HORAS_POR_DIA).toFixed(2);
    } else {
      inputDias.value = "";
    }
  });

  // Dias → Horas
  inputDias.addEventListener("input", () => {
    const dias = parseFloat(inputDias.value);

    if (!isNaN(dias)) {
      inputHoras.value = (dias * HORAS_POR_DIA).toFixed(2);
    } else {
      inputHoras.value = "";
    }
  });

  // Botões rápidos
  botoes.forEach((botao) => {
    botao.addEventListener("click", () => {
      const horas = parseFloat(botao.dataset.horas);

      if (!isNaN(horas)) {
        inputHoras.value = horas;
        inputDias.value = (horas / HORAS_POR_DIA).toFixed(2);
      }
    });
  });
}
/* ============================
   TELA - CADASTRO
============================ */
const opcoesDoc = document.querySelectorAll('input[name="perfil"]');

if (opcoesDoc.length > 0) {
  opcoesDoc.forEach((radio) => {
    radio.addEventListener("change", () => {
      const inputDoc = document.getElementById("documento");

      if (!inputDoc) return;

      if (radio.value === "cliente") {
        inputDoc.placeholder = "Nº do seu CPF *";
      } else if (radio.value === "colaborador") {
        inputDoc.placeholder = "Nº do seu CNPJ *";
      } else {
        inputDoc.placeholder = "";
      }
    });
  });
}

/* ============================
   CALENDÁRIO (FLATPICKR)
============================ */
const campoNascimento = document.getElementById("nascimento");

if (campoNascimento && typeof flatpickr !== "undefined") {
  flatpickr("#nascimento", {
    locale: "pt",
    dateFormat: "d/m/Y",
    disableMobile: true,
    animate: true,
  });
}

/* ============================
   FUNDO ANIMADO (PARTICLES.JS)
============================ */

if (document.getElementById("particles-js") && !window.particlesInitialized) {
  window.particlesInitialized = true;

  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 500 } },
      color: { value: "#00afef" },
      shape: { type: "edge" },
      opacity: {
        value: 0.6,
        random: true,
        anim: { enable: true, speed: 0.1, opacity_min: 0.1 },
      },
      size: { value: 50, random: true },
      line_linked: { enable: false },
      move: {
        enable: true,
        speed: 0.2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
      },
    },
    interactivity: {
      events: {
        onhover: { enable: true, mode: "grab" },
        onclick: { enable: true, mode: "push" },
      },
    },
    retina_detect: true,
  });
}

const form = document.getElementById("formulario_cadastro");
const inputs = form.querySelectorAll("input, textarea, select");
const checarValor = ({ target }) => {
  if (target.value.trim() !== "") {
    target.style.border = "2px solid #c7ff00"; // preenchido: borda verde
  } else {
    target.style.border = "1px solid #ccc"; // vazio: borda padrão
  }
};

// Adiciona o evento 'input' para cada campo
inputs.forEach((input) => input.addEventListener("input", checarValor));
