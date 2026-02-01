const students = [
  { name: "Rodolfo", testGrade: 7 },
  { name: "Maria", testGrade: 5 },
  { name: "João", testGrade: 8 },
  { name: "Bruno", testGrade: 9 },
  { name: "Carla", testGrade: 3 },
  { name: "Ana", testGrade: 2 },
  { name: "Julio", testGrade: 10 },
];

const listaprovados = students.map((students) => {
  return {
    name: students.name,
    Resultado: students.testGrade > 6 ? "Aprovado" : "Reprovado",
  };
});
console.log(listaprovados);

const cart = [
  { productName: "Abóbora", pricePerKg: 5, kg: 1 },
  { productName: "Pepino", pricePerKg: 3.55, kg: 1.3 },
  { productName: "Limão", pricePerKg: 1.2, kg: 2 },
  { productName: "Abacate", pricePerKg: 5.4, kg: 1.67 },
  { productName: "Morango", pricePerKg: 11.9, kg: 3 },
];

const finalValue = cart.reduce((acumulador, valorAtual) => {
  return acumulador + valorAtual.pricePerKg * valorAtual.kg;
}, 0);

console.log(finalValue);
