/* ============================
   MENU MOBILE
============================ */
const toggle = document.getElementById("menu-toggle");
const menu = document.getElementById("menu-mobile");
const backdrop = document.getElementById("menu-backdrop");

if (toggle && menu && backdrop) {
  const toggleMenu = () => {
    menu.classList.toggle("active");
    backdrop.classList.toggle("active");
  };

  toggle.addEventListener("click", toggleMenu);
  backdrop.addEventListener("click", toggleMenu);

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
        counter.innerText = `${prefix}${Math.ceil(current)}`;
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
          observer.unobserve(entry.target);
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
document.querySelectorAll(".hero-btn").forEach((botao) => {
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
  inputHoras.addEventListener("input", () => {
    const horas = parseFloat(inputHoras.value);
    inputDias.value = !isNaN(horas) ? (horas / HORAS_POR_DIA).toFixed(2) : "";
  });

  inputDias.addEventListener("input", () => {
    const dias = parseFloat(inputDias.value);
    inputHoras.value = !isNaN(dias) ? (dias * HORAS_POR_DIA).toFixed(2) : "";
  });

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
   PLACEHOLDER CPF / CNPJ
============================ */
document.querySelectorAll('input[name="perfil"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    const doc = document.getElementById("documento");
    if (!doc) return;

    doc.placeholder =
      radio.value === "cliente" ? "Nº do seu CPF *" : "Nº do seu CNPJ *";
  });
});

/* ============================
   FLATPICKR
============================ */
if (document.getElementById("nascimento") && typeof flatpickr !== "undefined") {
  flatpickr("#nascimento", {
    locale: "pt",
    dateFormat: "d/m/Y",
    disableMobile: true,
  });
}

/* ============================
   PARTICLES
============================ */
if (document.getElementById("particles-js") && !window.particlesInitialized) {
  window.particlesInitialized = true;

  particlesJS("particles-js", {
    particles: {
      number: { value: 100, density: { enable: true, value_area: 500 } },
      color: { value: "#00afef" },
      shape: { type: "edge" },
      opacity: { value: 0.6, random: true },
      size: { value: 50, random: true },
      line_linked: { enable: false },
      move: { enable: true, speed: 0.2 },
    },
    retina_detect: true,
  });
}

/* ============================
   MÁSCARAS
============================ */
const inputDocumento = document.getElementById("documento");
const inputTelefone = document.getElementById("telefone");

if (inputDocumento) {
  inputDocumento.addEventListener("input", () => {
    let v = inputDocumento.value.replace(/\D/g, "");

    if (v.length <= 11) {
      v = v
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      v = v
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }

    inputDocumento.value = v;
  });
}

if (inputTelefone) {
  inputTelefone.addEventListener("input", () => {
    let v = inputTelefone.value.replace(/\D/g, "");
    if (v.length > 11) v = v.slice(0, 11);

    v = v
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(
        v.length === 11 ? /(\d{5})(\d{4})$/ : /(\d{4})(\d{4})$/,
        "$1-$2",
      );

    inputTelefone.value = v;
  });
}

/* ============================
   VALIDAÇÕES
============================ */
const validarCPF = (cpf) => {
  cpf = cpf.replace(/\D/g, "");
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += cpf[i] * (10 - i);
  let r = (soma * 10) % 11;
  if (r === 10) r = 0;
  if (r != cpf[9]) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += cpf[i] * (11 - i);
  r = (soma * 10) % 11;
  if (r === 10) r = 0;

  return r == cpf[10];
};

const validarCNPJ = (cnpj) => {
  cnpj = cnpj.replace(/\D/g, "");
  if (cnpj.length !== 14) return false;

  let t = cnpj.length - 2;
  let n = cnpj.substring(0, t);
  let d = cnpj.substring(t);
  let s = 0;
  let p = t - 7;

  for (let i = t; i >= 1; i--) {
    s += n[t - i] * p--;
    if (p < 2) p = 9;
  }

  let r = s % 11 < 2 ? 0 : 11 - (s % 11);
  if (r != d[0]) return false;

  t++;
  n = cnpj.substring(0, t);
  s = 0;
  p = t - 7;

  for (let i = t; i >= 1; i--) {
    s += n[t - i] * p--;
    if (p < 2) p = 9;
  }

  r = s % 11 < 2 ? 0 : 11 - (s % 11);
  return r == d[1];
};

const validarTelefone = (tel) => /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(tel);

/* ============================
   VALIDAÇÃO VISUAL
============================ */
const form = document.getElementById("formulario_cadastro");

if (form) {
  form.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", ({ target }) => {
      const v = target.value.trim();
      let ok = false;

      if (!v) {
        target.style.border = "1px solid #ccc";
        return;
      }

      if (target.name === "nome") ok = /^[A-Za-zÀ-ÿ\s]+$/.test(v);
      else if (target.name === "email")
        ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      else if (target.name === "documento") {
        const limpo = v.replace(/\D/g, "");
        ok =
          limpo.length === 11
            ? validarCPF(v)
            : limpo.length === 14
              ? validarCNPJ(v)
              : false;
      } else if (target.name === "telefone") ok = validarTelefone(v);
      else ok = true;

      target.style.border = ok ? "2px solid #00afefa1" : "2px solid #ff4d4d";
    });
  });
}

/* ============================
   VALIDAÇÃO DE SENHAS
============================ */
const inputSenha = document.getElementById("senha");
const inputConfirmar = document.getElementById("confirmar_senha");
const infSenha = document.querySelector("#inf_senha");

const validarSenhasIguais = () => {
  if (!inputSenha || !inputConfirmar) return true;

  const senha = inputSenha.value;
  const confirmar = inputConfirmar.value;

  if (!senha || !confirmar) {
    inputSenha.style.border = "1px solid #ccc";
    inputConfirmar.style.border = "1px solid #ccc";
    infSenha.textContent = "";
    return false;
  }

  const iguais = senha === confirmar && senha.length >= 4;

  let cor;

  if (iguais) {
    cor = "2px solid #00afefa1";
    infSenha.textContent = "";
  } else {
    cor = "2px solid #ff4d4d";
    infSenha.textContent = "Verifique sua senha";
  }

  inputSenha.style.border = cor;
  inputConfirmar.style.border = cor;

  return iguais;
};

inputSenha?.addEventListener("input", validarSenhasIguais);
inputConfirmar?.addEventListener("input", validarSenhasIguais);

form?.addEventListener("submit", (e) => {
  const senhasOk = validarSenhasIguais();

  if (!senhasOk) {
    e.preventDefault();
    alert("As senhas não conferem ou são muito curtas.");
  }
});
