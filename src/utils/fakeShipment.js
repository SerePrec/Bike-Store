const freeLimitShipment = 8000;
const unitShipmentPrice = 570;

let prodsUnderLimit = [
  {
    id: "26Sqhttm4jacOvmpVsik",
    title: "Mochila Camelback Mini Mule 1.5L",
    shipmentFract: 1
  },
  {
    id: "btraGlC4b0XfaZ8yE1VM",
    title: "Remera Castelli Competizione Ineos Grenadiers",
    shipmentFract: 0.5
  },
  {
    id: "uizIjJGnlqoqms0p06pu",
    title: "Velocimetro Cateye Inalámbrico ST-12.",
    shipmentFract: 0.1
  },
  {
    id: "ouN2kTsiLZNa4VBlwqdG",
    title: "Cubierta Continental X-King 26x2.20 Rígida",
    shipmentFract: 0.5
  },
  {
    id: "2T995dPlbvDn69LFlfh3",
    title: "Calza Cube WLS TeamLine W",
    shipmentFract: 0.5
  },
  {
    id: "r4QTHxN6QTSjy7DIlWCB",
    title: "Casco Cube AM Race",
    shipmentFract: 1
  },
  {
    id: "rqxoCaTl1bcKA7WL6pDQ",
    title: "Remera Cube TeamLine L/S",
    shipmentFract: 0.5
  },
  {
    id: "rsQjBBQ0Q2BXmFkr8LDg",
    title: "Guantes Endura Hummvee Plus 2",
    shipmentFract: 0.2
  },
  {
    id: "dKJEL0MXQ79S8UnvQIuQ",
    title: "Cubierta De Kevlar Maxxis Race King 29 X 2,15.",
    shipmentFract: 0.5
  },
  {
    id: "51oxAgewMj09vabGPYBy",
    title: "Calza Scott Bike RC Pro W",
    shipmentFract: 0.5
  },
  {
    id: "mHhtOcAKxFBeArCZ7wvg",
    title: "Cubierta Specialized Ground Control Grid Tubeless Ready 29x2.3",
    shipmentFract: 0.5
  },
  {
    id: "QiFNOOkXVkPZrjZ099jw",
    title: "Guantes Specialized BG Grail W",
    shipmentFract: 0.2
  },
  {
    id: "aoQLq9Yp2luFFZFSmp22",
    title: "Remera Specialized Roubaix Comp W",
    shipmentFract: 0.5
  },
  {
    id: "w3nnWX5S4ZPey3ypVLRZ",
    title: "Maillot Spiuk Tritraje Universal W",
    shipmentFract: 0.5
  },
  {
    id: "HganVFiz5g3lyVMNYsJ3",
    title: "Campera Sportful Reflex",
    shipmentFract: 1
  },
  {
    id: "C0iunbYvRKn6Z8DUWvbw",
    title: "Multiherramienta Topeak Survival Gearbox",
    shipmentFract: 0.2
  },
  {
    id: "YFr5hQtMlu2BLPtGgQes",
    title: "Calza Ale Movistar 2020 Prime",
    shipmentFract: 0.5
  },
  {
    id: "DeaUel8gaDmIjkX0sIxx",
    title: "Remera Ale Movistar 2020 Prime",
    shipmentFract: 0.5
  },
  {
    id: "TpdxM5Xrch8kGoMR5S71",
    title: "Protector Codera Alpinestars E-Vent",
    shipmentFract: 0.5
  },
  {
    id: "huiFQW4VNY1n1BcDPfQr",
    title: "Protector Rodillera Alpinestars E-Ride Knee",
    shipmentFract: 0.5
  },
  {
    id: "lNxoMPaZuFaUpMzlBekt",
    title: "Casco Bell Avenue",
    shipmentFract: 1
  },
  {
    id: "c0I7D4k4QyDYYnL9Osdq",
    title: "Mochila Camelback Hydroback Light 1.5L",
    shipmentFract: 1
  },
  {
    id: "SWrIqlN36AM5z4vgoRDo",
    title: "Cubierta Continental Gatorskin 700 X 25",
    shipmentFract: 0.5
  },
  {
    id: "La1XuZTmhWtolkObeKhJ",
    title: "Cubierta Continental Grand Prix 5000 700 X 25",
    shipmentFract: 0.5
  },
  {
    id: "2gIH5r5LkDrPGs5wLmSR",
    title: "Multiherramienta Crankbrothers M-19",
    shipmentFract: 0.2
  },
  {
    id: "8DvwSs05uVssmY4lLBAj",
    title: "Campera Chaleco Cube TeamLine",
    shipmentFract: 1
  },
  {
    id: "bYKFscROAqqzfliWPLk8",
    title: "Remera Cube WLS TeamLine W",
    shipmentFract: 0.5
  },
  {
    id: "uLwrWXkeq7m6hrS74RwO",
    title: "Lentes Eltin Full Oversize",
    shipmentFract: 0.25
  },
  {
    id: "jK8t1erT7zbZpxJDjtLN",
    title: "Calza Endura FS260 Pro DS W",
    shipmentFract: 0.5
  },
  {
    id: "85EHhtMOoefDi0gYUkkx",
    title: "Campera Endura FS260-Pro Adenaline Race Cape W",
    shipmentFract: 0.5
  },
  {
    id: "BTSTQfYHeN2n7hPIVloy",
    title: "Guantes Endura Windchill W",
    shipmentFract: 0.2
  },
  {
    id: "IJQ9o3Ph4hMazdB076sh",
    title: "Protector Rodillera Endura MT500 Lite",
    shipmentFract: 0.5
  },
  {
    id: "wJVnLK07h3qiGDSbgJNd",
    title: "Remera Giant Ride Like King",
    shipmentFract: 0.5
  },
  {
    id: "rGsGnzchlofqKbx2ILA7",
    title: "Casco Giro Agilis",
    shipmentFract: 1
  },
  {
    id: "ZXIbKKgyPhhXpej0L124",
    title: "Cubierta Maxxis Pursuer 700 X 25",
    shipmentFract: 0.5
  },
  {
    id: "fM6H8dvOlgjVsmSTc3zX",
    title: "Gel Energizante Nutrisport Con Cafeína 50g. Express.",
    shipmentFract: 0.01
  },
  {
    id: "BT8xIGnnsGQ7ZFp3gzbg",
    title: "Caramagnola Plástica Podium 0.5L. Versión Eco. Color A Granel.",
    shipmentFract: 0.2
  },
  {
    id: "g1HVDpOGutlZuzCInUwm",
    title: "Cadena Shimano Deore CN-M6100 12V",
    shipmentFract: 0.1
  },
  {
    id: "PhiK0g5F7g8cQr4BkbkE",
    title: "Juego De Luces Sigma Aura 80 + Blaze",
    shipmentFract: 0.2
  },
  {
    id: "zdVLK9ycyLN3NIEudqds",
    title: "Calza Specialized Rbx Sport Logo",
    shipmentFract: 0.5
  },
  {
    id: "RH46GrQr2dOQuPFIkxAE",
    title: "Casco Specialized Chamonix Mips",
    shipmentFract: 1
  },
  {
    id: "9mFN4aGuC1PR2ogOs3Eo",
    title: "Guantes Specialized BG Sport Gel SF",
    shipmentFract: 0.2
  },
  {
    id: "jX4dAdcUHNw6zhcivMIo",
    title: "Lentes Spiuk Jifter Espejo",
    shipmentFract: 0.25
  },
  {
    id: "fXXgIo3KEioKqzYO2QIT",
    title: "Calza Sportful GTS Short",
    shipmentFract: 0.5
  },
  {
    id: "838kubBG1VbKQZCfklfF",
    title: "Campera Sportful Hot Pack 6",
    shipmentFract: 1
  },
  {
    id: "b99YYqxQfTdtYODv7fHT",
    title: "Cadena Sram PCX! 118 Powerlock 11V",
    shipmentFract: 0.2
  },
  {
    id: "0rD0Y4kB49DNLFJOwqQz",
    title: "Corta Cadena Topeak Super",
    shipmentFract: 0.2
  },
  {
    id: "5BiwcnnrZQxP3MiYo7uu",
    title: "Cámara Tubolito MTB 29 X 1.75.",
    shipmentFract: 0.2
  },
  {
    id: "53HT7E1IWwYaV7umvM3x",
    title: "Bolso Zefal Traveler 80",
    shipmentFract: 1
  }
];

export const fakeShipment = cart => {
  const totPrice = cart.reduce(
    (total, elem) =>
      total + elem.product.price * (1 - elem.product.discount / 100) * elem.qty,
    0
  );
  if (totPrice >= freeLimitShipment) return 0;
  else {
    let shipmentUnits = 0;
    cart.forEach(item => {
      let id = item.product.id;
      let qty = item.qty;
      let match = prodsUnderLimit.find(elem => elem.id === id);
      shipmentUnits += match.shipmentFract * qty;
    });
    shipmentUnits = Math.ceil(shipmentUnits);
    return unitShipmentPrice + (shipmentUnits - 1) * unitShipmentPrice * 0.7;
  }
};
