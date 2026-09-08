import { productImages, categoryImages } from "./productImages";

export type Gender = "унисекс" | "мужской" | "женский";
export type Family = "цветочный" | "древесный" | "восточный" | "цитрусовый" | "водный" | "фруктовый";
export type Volume = 30 | 35 | 50 | 70 | 75 | 100;

export interface Product {
  id: string;
  name: string;
  brand: string;
  description: string;
  notes: {
    top: string[];
    heart: string[];
    base: string[];
  };
  price: number;
  volume: Volume[];
  gender: Gender;
  family: Family;
  isNew?: boolean;
  isBestseller?: boolean;
  // Редакционная подборка, которую администратор меняет для блока Hit Parade.
  weeklyHit?: boolean;
  image: string | typeof productImages[0];
  year?: number;
}

export const BRANDS = ["Dior", "Tom Ford", "Chanel", "Creed", "Byredo", "Maison Francis Kurkdjian", "Le Labo", "Jo Malone", "Givenchy", "Versace", "Hermès", "Guerlain"];

export const FAMILIES: Family[] = ["цветочный", "древесный", "восточный", "цитрусовый", "водный", "фруктовый"];

export const products: Product[] = [
  {
    id: "dior-sauvage",
    name: "Sauvage",
    brand: "Dior",
    description: "Sauvage — дикий и благородный. Вдохновлённый просторами пустынь на закате, этот аромат несёт в себе силу природы и утончённость парижского маэстро Франсуа Демаши.",
    notes: {
      top: ["Бергамот", "Перец"],
      heart: ["Лаванда", "Ветивер", "Пачули"],
      base: ["Амброксан", "Лабданум", "Кедр"],
    },
    price: 14800,
    volume: [50, 100],
    gender: "мужской",
    family: "древесный",
    isBestseller: true,
    image: productImages[0],
    year: 2015,
  },
  {
    id: "tom-ford-black-orchid",
    name: "Black Orchid",
    brand: "Tom Ford",
    description: "Роскошная восточная композиция с чёрной орхидеей и трюфелем. Символ силы, сексуальности и загадочности. Нота для тех, кто не боится быть замеченным.",
    notes: {
      top: ["Чёрный трюфель", "Иланг-иланг", "Бергамот"],
      heart: ["Чёрная орхидея", "Специи", "Пачули"],
      base: ["Сандаловое дерево", "Ваниль", "Мускус"],
    },
    price: 18900,
    volume: [50, 100],
    gender: "унисекс",
    family: "восточный",
    isBestseller: true,
    image: productImages[1],
    year: 2006,
  },
  {
    id: "chanel-no5",
    name: "N°5",
    brand: "Chanel",
    description: "Легендарный аромат Коко Шанель, созданный в 1921 году. Альдегидный цветочный букет — икона парфюмерного искусства, олицетворение женственности вне времени.",
    notes: {
      top: ["Альдегиды", "Нероли", "Иланг-иланг"],
      heart: ["Роза", "Жасмин", "Лилия долины"],
      base: ["Сандаловое дерево", "Ветивер", "Ваниль"],
    },
    price: 16500,
    volume: [50, 100],
    gender: "женский",
    family: "цветочный",
    isBestseller: true,
    image: productImages[2],
    year: 1921,
  },
  {
    id: "creed-aventus",
    name: "Aventus",
    brand: "Creed",
    description: "Вдохновлённый жизнью Наполеона Бонапарта, Aventus — победный фанфар мужественности. Дымные фрукты, берёзовый дёготь и мускус создают неповторимый сигнатурный аромат.",
    notes: {
      top: ["Ананас", "Чёрная смородина", "Яблоко", "Бергамот"],
      heart: ["Берёза", "Пачули", "Жасмин", "Роза"],
      base: ["Дубовый мох", "Амброксан", "Мускус", "Ваниль"],
    },
    price: 32000,
    volume: [50, 100],
    gender: "мужской",
    family: "фруктовый",
    isBestseller: true,
    image: productImages[3],
    year: 2010,
  },
  {
    id: "byredo-gypsy-water",
    name: "Gypsy Water",
    brand: "Byredo",
    description: "Вдохновлённый романтикой цыганской жизни — кострами под звёздным небом, дорогой и свободой. Свежий, смолистый, загадочный аромат шведского дома Byredo.",
    notes: {
      top: ["Бергамот", "Лимон", "Перец"],
      heart: ["Можжевельник", "Орис", "Ладан"],
      base: ["Сандаловое дерево", "Ваниль", "Амбра", "Пихта"],
    },
    price: 19500,
    volume: [50, 100],
    gender: "унисекс",
    family: "древесный",
    isNew: true,
    image: productImages[4],
    year: 2008,
  },
  {
    id: "mfk-baccarat-rouge",
    name: "Baccarat Rouge 540",
    brand: "Maison Francis Kurkdjian",
    description: "Созданный в честь 250-летия хрусталя Baccarat, этот аромат — само воплощение хрупкости и роскоши. Жасминовая амброзия, кедровое дерево и сладкая горечь амбры.",
    notes: {
      top: ["Шафран", "Жасмин"],
      heart: ["Амберовое дерево", "Египетский жасмин"],
      base: ["Кедр", "Сахарная вата", "Мускус"],
    },
    price: 28500,
    volume: [35, 70],
    gender: "унисекс",
    family: "восточный",
    isBestseller: true,
    isNew: false,
    image: productImages[5],
    year: 2015,
  },
  {
    id: "le-labo-santal-33",
    name: "Santal 33",
    brand: "Le Labo",
    description: "Культовый аромат Нью-Йорка. Дымный сандал с нотами кожи и фиалки — запах свободы, open spaces и вечерних баров Lower East Side.",
    notes: {
      top: ["Кардамон", "Ирис", "Ваниль"],
      heart: ["Амберовое дерево", "Сандаловое дерево", "Папирус"],
      base: ["Кедр", "Кожа", "Мускус"],
    },
    price: 24000,
    volume: [50, 100],
    gender: "унисекс",
    family: "древесный",
    isNew: true,
    image: productImages[6],
    year: 2011,
  },
  {
    id: "dior-miss-dior",
    name: "Miss Dior Blooming Bouquet",
    brand: "Dior",
    description: "Свежий и жизнерадостный — цветочная поэма для современной женщины. Хрустальная роза и белый мускус создают образ нежности и женственной силы.",
    notes: {
      top: ["Мандарин", "Белый мускус"],
      heart: ["Пион", "Дамасская роза"],
      base: ["Белый мускус", "Сандаловое дерево"],
    },
    price: 13200,
    volume: [30, 50, 100],
    gender: "женский",
    family: "цветочный",
    isNew: false,
    image: productImages[7],
    year: 2014,
  },
  {
    id: "tom-ford-oud-wood",
    name: "Oud Wood",
    brand: "Tom Ford",
    description: "Первый в мире уд-аромат от дома Tom Ford. Тёмное, смолистое, чувственное — он перевернул представление о мужской парфюмерии. Уд, сандал и розовый перец.",
    notes: {
      top: ["Розовый перец", "Сишуань перец", "Арабский уд"],
      heart: ["Сандаловое дерево", "Ветивер", "Тонка"],
      base: ["Амбра", "Смола", "Мускус"],
    },
    price: 21000,
    volume: [50, 100],
    gender: "мужской",
    family: "восточный",
    isNew: true,
    image: productImages[8],
    year: 2007,
  },
  {
    id: "chanel-coco-mademoiselle",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    description: "Дерзкий и независимый — аромат для женщины, которая сама пишет правила. Апельсин и пачули, роза и ветивер в совершенном балансе.",
    notes: {
      top: ["Апельсин", "Мандарин", "Бергамот"],
      heart: ["Роза", "Жасмин", "Мимоза"],
      base: ["Пачули", "Ветивер", "Ваниль", "Белый мускус"],
    },
    price: 15900,
    volume: [50, 100],
    gender: "женский",
    family: "восточный",
    isBestseller: true,
    image: productImages[9],
    year: 2001,
  },
  {
    id: "creed-silver-mountain-water",
    name: "Silver Mountain Water",
    brand: "Creed",
    description: "Вдохновлённый горными ручьями Швейцарских Альп — кристально чистый, свежий и мужественный. Зелёный чай, мандарин и вербена на фоне мускуса.",
    notes: {
      top: ["Бергамот", "Зелёный чай", "Мандарин"],
      heart: ["Смородина", "Пеларгония", "Нероли"],
      base: ["Сандаловое дерево", "Мускус", "Амбра"],
    },
    price: 26500,
    volume: [50, 100],
    gender: "мужской",
    family: "водный",
    isNew: false,
    image: productImages[10],
    year: 1995,
  },
  {
    id: "byredo-mojave-ghost",
    name: "Mojave Ghost",
    brand: "Byredo",
    description: "Пустыня Мохаве — сухая, пыльная, невероятно живая. Ambrette, древесная фиалка и сапфировое дерево складываются в аромат, существующий вне времени.",
    notes: {
      top: ["Амбретт", "Сапфировое дерево"],
      heart: ["Нероли", "Маньянита", "Виолетт"],
      base: ["Сандаловое дерево", "Кедр", "Амбра"],
    },
    price: 21000,
    volume: [50, 100],
    gender: "унисекс",
    family: "древесный",
    isNew: true,
    image: productImages[11],
    year: 2014,
  },
  {
    id: "hermes-terre",
    name: "Terre d'Hermès",
    brand: "Hermès",
    description: "Диалог между небом и землёй. Камень, земля, апельсин и перец создают аромат-концепцию — философский, мужественный и абсолютно уникальный.",
    notes: {
      top: ["Апельсин", "Грейпфрут"],
      heart: ["Перец", "Кремень", "Гераниол"],
      base: ["Ветивер", "Кедр", "Бензоин"],
    },
    price: 12800,
    volume: [50, 75, 100],
    gender: "мужской",
    family: "древесный",
    isBestseller: false,
    isNew: false,
    image: productImages[12],
    year: 2006,
  },
  {
    id: "guerlain-mon-guerlain",
    name: "Mon Guerlain",
    brand: "Guerlain",
    description: "Романтический и современный. Лаванда из Прованса и ваниль из Папуа создают мечтательный, чувственный аромат — посвящение французской женственности.",
    notes: {
      top: ["Бергамот", "Лаванда"],
      heart: ["Лаванда", "Самбак жасмин"],
      base: ["Сандаловое дерево", "Ваниль", "Кумарин"],
    },
    price: 11900,
    volume: [30, 50, 100],
    gender: "женский",
    family: "цветочный",
    isNew: true,
    image: productImages[13],
    year: 2017,
  },
  {
    id: "tom-ford-neroli-portofino",
    name: "Neroli Portofino",
    brand: "Tom Ford",
    description: "Итальянская Ривьера в флаконе. Средиземноморский воздух, нероли, цитрус и морская свежесть — роскошный побег в лазурные воды Портофино.",
    notes: {
      top: ["Бергамот", "Лимон", "Мандарин"],
      heart: ["Нероли", "Pittosporo", "Жасмин"],
      base: ["Амбра", "Мускус", "Ветивер"],
    },
    price: 19800,
    volume: [50, 100],
    gender: "унисекс",
    family: "цитрусовый",
    isNew: false,
    image: productImages[14],
    year: 2011,
  },
];

export const familyImages: Record<Family, string | typeof productImages[0]> = {
  "цветочный": categoryImages[0],
  "древесный": categoryImages[1],
  "восточный": categoryImages[2],
  "цитрусовый": categoryImages[3],
  "водный": categoryImages[4],
  "фруктовый": categoryImages[5],
};
