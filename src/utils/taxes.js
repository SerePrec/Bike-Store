const interesCuota = [
  { cuotas: 1, interes: 0 },
  { cuotas: 3, interes: 8 },
  { cuotas: 6, interes: 12 },
  { cuotas: 12, interes: 20 },
  { cuotas: 18, interes: 30 }
];

export const getInt = partials => {
  let aux = interesCuota.find(elem => elem.cuotas === partials) || {};
  return aux.interes;
};

export const pricePartialPay = (price, partials) => {
  const aux = interesCuota.find(elem => elem.cuotas === partials);
  if (!aux) return { totPrice: null, partPrice: null };
  const tax = aux.interes;
  const tot = price * (1 + tax / 100);
  const part = tot / partials;

  return { tot, part };
};
