/* ============================
   MENU MOBILE
============================ */
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");

if (toggle && menu) {
  toggle.addEventListener("click", () => {
    menu.classList.toggle("active");
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
          observer.unobserve(entry.target); // roda só uma vez
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
const btnCadastro = document.querySelector(".hero-btn");

if (btnCadastro) {
  btnCadastro.addEventListener("click", () => {
    window.location.href = "cadastro.html";
  });
}

/* ============================
   CONVERSOR HORAS ↔ DIAS
============================ */
const inputHoras = document.getElementById("horas");
const inputDias = document.getElementById("dias");
const botoes = document.querySelectorAll(".botoes-calculo button");

const HORAS_POR_DIA = 8.4;

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
