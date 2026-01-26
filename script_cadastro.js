const opcoesDoc = document.querySelectorAll('input[name="doc_tipo"]');

opcoesDoc.forEach((radio) => {
  radio.addEventListener("change", () => {
    const inputDoc = document.getElementById("documento");
    inputDoc.placeholder = `Nº do seu ${radio.value.toUpperCase()} *`;
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
