const day = (newdate: string) => {
  const date = new Date(newdate);
  return date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`;
};
const year = (newdate: string) => {
  const date = new Date(newdate);
  return date.getFullYear() >= 10
    ? date.getFullYear()
    : `0${date.getFullYear()}`;
};
export const days = [];
export const months = [
  { id: 1, name: "Janeiro" },
  { id: 2, name: "Fevereiro" },
  { id: 3, name: "Março" },
  { id: 4, name: "Abril" },
  { id: 5, name: "Maio" },
  { id: 6, name: "Junho" },
  { id: 7, name: "Julho" },
  { id: 8, name: "Agosto" },
  { id: 9, name: "Setembro" },
  { id: 10, name: "Outubro" },
  { id: 11, name: "Novembro" },
  { id: 12, name: "Dezembro" },
];
const month = (newdate: string) => {
  const date = new Date(newdate);
  return months[date.getMonth()].name.slice(0, 3);
};

export { month, day, year };
