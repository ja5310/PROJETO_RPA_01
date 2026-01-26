const opcoesDoc = document.querySelectorAll('input[name="perfil"]');

opcoesDoc.forEach((radio) => {
  radio.addEventListener("change", () => {
    const inputDoc = document.getElementById("documento");

    if (radio.value === "cliente") {
      inputDoc.placeholder = "Nº do seu CPF *";
    } else if (radio.value === "colaborador") {
      inputDoc.placeholder = "Nº do seu CNPJ *";
    } else {
      inputDoc.placeholder = "";
    }
  });
});

// Inicialização do Flatpickr
flatpickr("#nascimento", {
  locale: "pt",
  dateFormat: "d/m/Y",
  disableMobile: true, // Importante para manter o estilo no celular
  animate: true,
  onChange: function (selectedDates, dateStr) {
    console.log("Data selecionada: " + dateStr);
  },
});
