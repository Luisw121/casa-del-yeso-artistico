export type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
  stock: boolean;
  longDescription?: string;
  details?: string[];
};

export const products: Product[] = [
  {
    id: 1,
    name: "Espátula profesional",
    category: "Herramientas",
    price: 12.50,
    description: "Espátula de acero inoxidable para aplicación de yeso y masilla.",
    stock: true,
    longDescription:
      "Espátula profesional fabricada en acero inoxidable de alta resistencia, diseñada para la aplicación uniforme de yeso, masilla y otros materiales de acabado. Su mango ergonómico reduce la fatiga en trabajos prolongados.",
    details: [
      "Material: acero inoxidable",
      "Ancho de hoja: 10 cm",
      "Longitud total: 28 cm",
      "Uso: yeso, masilla, estucos",
    ],
  },
  {
    id: 2,
    name: "Llana de yesero",
    category: "Herramientas",
    price: 18.00,
    description: "Llana rectangular de aluminio para extender yeso en superficies.",
    stock: true,
    longDescription:
      "Llana rectangular fabricada en aleación de aluminio liviana y resistente. Ideal para extender y alisar yeso en paredes y cielos rasos, logrando acabados profesionales sin esfuerzo.",
    details: [
      "Material: aluminio",
      "Dimensiones: 27 × 12 cm",
      "Mango de plástico ergonómico",
      "Uso: paredes, cielos, tabiques",
    ],
  },
  {
    id: 3,
    name: "Nivel de burbuja 60cm",
    category: "Herramientas",
    price: 22.00,
    description: "Nivel de aluminio con tres burbujas para trabajo horizontal y vertical.",
    stock: true,
    longDescription:
      "Nivel de 60 cm en perfil de aluminio con tres ampollas de burbuja: horizontal, vertical y 45°. Imprescindible para instalaciones de gypsum, marcos, estantes y cualquier trabajo que requiera precisión.",
    details: [
      "Longitud: 60 cm",
      "Material: perfil de aluminio",
      "3 ampollas de nivel",
      "Precisión: ±0.5 mm/m",
    ],
  },
  {
    id: 4,
    name: "Taladro percutor",
    category: "Herramientas",
    price: 85.00,
    description: "Taladro de primer uso, ideal para instalaciones en gypsum y mampostería.",
    stock: true,
    longDescription:
      "Taladro percutor de primera calidad, con función rotativa y percusión seleccionable. Perfecto para fijar perfiles de gypsum en mampostería, concreto y ladrillo. Velocidad variable y mandril de 13 mm.",
    details: [
      "Potencia: 710 W",
      "Velocidad: 0–3000 RPM",
      "Mandril: 13 mm",
      "Función percutor incluida",
    ],
  },
  {
    id: 5,
    name: "Saco de yeso artístico 25kg",
    category: "Materiales",
    price: 15.00,
    description: "Yeso de alta pureza para moldes, esculturas y acabados decorativos.",
    stock: true,
    longDescription:
      "Yeso artístico de alta pureza, especialmente formulado para moldes de fundición, esculturas decorativas, cornisas y acabados finos. Fraguado rápido y superficie blanca sin fisuras.",
    details: [
      "Peso neto: 25 kg",
      "Pureza: 95 %+",
      "Tiempo de fraguado: 15–20 min",
      "Color final: blanco puro",
    ],
  },
  {
    id: 6,
    name: "Cemento blanco 25kg",
    category: "Materiales",
    price: 20.00,
    description: "Cemento blanco para juntas, pegado de cerámica y acabados finos.",
    stock: true,
    longDescription:
      "Cemento portland blanco de alta resistencia, adecuado para juntas de azulejos, adhesivo de cerámica, reparaciones superficiales y acabados decorativos que requieren blancura uniforme.",
    details: [
      "Peso neto: 25 kg",
      "Resistencia: 42.5 MPa",
      "Aplicación: cerámica, juntas, acabados",
      "Color: blanco",
    ],
  },
  {
    id: 7,
    name: "Malla de fibra para gypsum",
    category: "Materiales",
    price: 8.50,
    description: "Malla autoadhesiva para reparación de grietas en paredes y cielos.",
    stock: true,
    longDescription:
      "Malla de fibra de vidrio autoadhesiva, diseñada para reforzar y reparar grietas en placas de gypsum, paredes de concreto y tabiques. Resistente a la humedad, fácil de cortar y aplicar.",
    details: [
      "Dimensiones rollo: 10 cm × 45 m",
      "Material: fibra de vidrio",
      "Autoadhesivo",
      "Resistente a la humedad",
    ],
  },
  {
    id: 8,
    name: "Figura ángel decorativo",
    category: "Artesanías",
    price: 35.00,
    description: "Figura artesanal de ángel elaborada en yeso artístico, acabado blanco.",
    stock: true,
    longDescription:
      "Figura de ángel elaborada a mano por nuestros artesanos en yeso artístico de alta pureza. Cada pieza es única, con detalles finos y acabado en blanco natural. Ideal como decoración para el hogar o regalo.",
    details: [
      "Altura: 30 cm",
      "Material: yeso artístico",
      "Acabado: blanco natural",
      "Hecho a mano",
    ],
  },
  {
    id: 9,
    name: "Moldura clásica 2m",
    category: "Artesanías",
    price: 12.00,
    description: "Moldura decorativa en yeso para techos y paredes, estilo clásico europeo.",
    stock: true,
    longDescription:
      "Moldura de yeso estilo clásico europeo, perfecta para embellecer la unión de paredes y techos o como elemento decorativo independiente. Se adhiere con cemento blanco o cola de yeso.",
    details: [
      "Longitud: 2 metros",
      "Ancho: 8 cm",
      "Material: yeso",
      "Estilo: clásico europeo",
    ],
  },
  {
    id: 10,
    name: "Florero artesanal",
    category: "Artesanías",
    price: 28.00,
    description: "Florero elaborado a mano en yeso, disponible en varios acabados.",
    stock: false,
    longDescription:
      "Florero artesanal confeccionado en yeso artístico de alta calidad. Disponible en acabado blanco natural, patinado antiguo o pintado a pedido. Pieza única que añade elegancia a cualquier espacio.",
    details: [
      "Altura: 25 cm",
      "Material: yeso artístico",
      "Acabados: blanco / patinado / pintado",
      "Hecho a mano",
    ],
  },
];

export const categories = ["Todos", "Herramientas", "Materiales", "Artesanías"];

export function getProductById(id: number): Product | undefined {
  return products.find((p) => p.id === id);
}
