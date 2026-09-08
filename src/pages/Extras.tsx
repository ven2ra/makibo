import { useState } from "react";
import { BRANDS, products } from "../data/products";
import type { Product } from "../data/products";
import AddButton from "../components/AddButton";

export function BrandsPage({ onViewProduct }: { onViewProduct: (product: Product) => void }) {
  const [query, setQuery] = useState("");
  const [activeBrand, setActiveBrand] = useState("Dior");
  const brandNotes: Record<string, { line: string; mood: string }> = {
    Dior: { line: "Парижская ясность, которая всегда держит спину прямо.", mood: "икона / свет" },
    "Tom Ford": { line: "Громко, темно, красиво. Когда шлейф должен сказать всё первым.", mood: "после полуночи" },
    Chanel: { line: "Чистая форма, сложный характер и абсолютная узнаваемость.", mood: "вечная классика" },
    Creed: { line: "Свобода, дистанция и хорошо настроенная уверенность.", mood: "первый ряд" },
    Byredo: { line: "Память, превращённая в запах: тихо, странно, очень лично.", mood: "личный архив" },
    "Maison Francis Kurkdjian": { line: "Композиции, которые будто светятся изнутри.", mood: "свет / воздух" },
    "Le Labo": { line: "Ручная работа, городская пыль и ноты для близкого расстояния.", mood: "кожа / текстура" },
  };
  const filteredBrands = BRANDS.filter((brand) => brand.toLowerCase().includes(query.trim().toLowerCase()));
  const activeProduct = products.find((product) => product.brand === activeBrand) ?? products[0];
  const activeMeta = brandNotes[activeBrand] ?? { line: "Ароматный дом с собственной интонацией и характером.", mood: "в каталоге Makibo" };

  return <div className="beauty-page min-h-screen pt-[95px] lg:pt-[103px]"><div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-9 lg:py-9">
    <section className="houses-intro"><div className="houses-intro-head"><p>MAKIBO / HOUSES</p><span>{String(BRANDS.length).padStart(2, "0")} ДОМОВ</span></div><div><h1>БРЕНДЫ<br /><em>С ГОЛОСОМ.</em></h1><p>Не логотипы в алфавите, а дома с характером. Начните с того, чей голос хочется услышать сегодня.</p></div><label className="houses-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти дом" /><kbd>↵</kbd></label></section>
    <section className="houses-feature"><div className="houses-feature-copy"><p>В ФОКУСЕ / {activeMeta.mood}</p><h2>{activeBrand}</h2><span>{activeMeta.line}</span><div className="houses-feature-actions"><button onClick={() => onViewProduct(activeProduct)}>Смотреть {activeProduct.name} <b>↗</b></button><small>{activeProduct.notes.top.slice(0, 3).join(" · ")}</small></div></div><div className="houses-feature-image"><span>HOUSE<br />{String(BRANDS.indexOf(activeBrand) + 1).padStart(2, "0")}</span><img src={activeProduct.image} alt={`${activeProduct.brand} ${activeProduct.name}`} /><i>✦</i></div></section>
    <section className="houses-index"><div className="houses-index-head"><p>ВЕСЬ АЛФАВИТ</p><span>{filteredBrands.length} / {BRANDS.length}</span></div><div className="houses-grid">{filteredBrands.map((brand, index) => { const product = products.find((item) => item.brand === brand); const isActive = brand === activeBrand; return <button key={brand} onClick={() => setActiveBrand(brand)} className={`house-tile tone-${index % 5} ${isActive ? "is-active" : ""}`}><span>{String(BRANDS.indexOf(brand) + 1).padStart(2, "0")}</span><strong>{brand}</strong><i>{product ? "Смотреть ↗" : "Скоро"}</i></button>; })}</div>{filteredBrands.length === 0 && <div className="houses-empty">Не нашли дом. Попробуйте другой запрос.</div>}</section>
  </div></div>;
}

export function GiftPage({ onViewProduct, onAddToCart }: { onViewProduct: (product: Product) => void; onAddToCart: (product: Product) => void }) {
  const [recipient, setRecipient] = useState(0); const [occasion, setOccasion] = useState(0);
  const recipients = ["для неё", "для него", "для себя"]; const occasions = ["просто так", "день рождения", "важная дата"];
  const pool = products.filter((product) => recipient === 0 ? product.gender !== "мужской" : recipient === 1 ? product.gender !== "женский" : true);
  const pick = pool[(recipient + occasion) % pool.length] ?? products[0];
  return <div className="beauty-page min-h-screen pt-[95px] lg:pt-[103px]"><div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-9"><div className="gift-studio"><div><p>GIFT STUDIO / 01</p><h1>ПОДАРОК,<br /><span>КОТОРЫЙ<br />НЕ ПЫЛИТСЯ.</span></h1><p className="gift-copy">Ответьте на два простых вопроса — соберём аромат, который попадёт точно в настроение.</p><div className="gift-steps"><div><b>01 / КОМУ</b>{recipients.map((item, index) => <button key={item} onClick={() => setRecipient(index)} className={recipient === index ? "is-active" : ""}>{item}</button>)}</div><div><b>02 / ПОВОД</b>{occasions.map((item, index) => <button key={item} onClick={() => setOccasion(index)} className={occasion === index ? "is-active" : ""}>{item}</button>)}</div></div></div><div className="gift-match"><p>ВАШ ВАРИАНТ</p><img src={pick.image} alt={`${pick.brand} ${pick.name}`} /><div><span>{pick.brand}</span><button onClick={() => onViewProduct(pick)}>{pick.name}</button><small>{pick.notes.top.slice(0, 3).join(" · ")}</small><AddButton onAdd={() => onAddToCart(pick)} label /></div></div></div></div></div>;
}

export function FavoritesPage({ items, onViewProduct, onAddToCart, onToggle }: { items: Product[]; onViewProduct: (product: Product) => void; onAddToCart: (product: Product) => void; onToggle: (product: Product) => void }) {
  const featured = items[0];
  return <div className="beauty-page min-h-screen pt-[95px] lg:pt-[103px]"><div className="mx-auto max-w-[1440px] px-4 py-8 sm:px-6 lg:px-9"><div className="shelf-head"><div><p>MY MAKIBO / PRIVATE SHELF</p><h1>СОХРАНЁННЫЕ<br /><span>ВПЕЧАТЛЕНИЯ.</span></h1></div><div><span>{String(items.length).padStart(2, "0")}</span><p>ароматов<br />в коллекции</p></div></div>{items.length === 0 ? <div className="shelf-empty"><div>♡</div><p>ЗДЕСЬ БУДЕТ<br /><span>ВАШ ЛИЧНЫЙ<br />АРХИВ.</span></p><small>Сохраняйте ароматы, к которым хочется вернуться.</small></div> : <><section className="shelf-featured"><div className="shelf-featured-image"><img src={featured.image} alt={`${featured.brand} ${featured.name}`} /><span>№ 01</span></div><div className="shelf-featured-copy"><p>ОТКРЫТЬ СНОВА</p><button onClick={() => onViewProduct(featured)}><span>{featured.brand}</span>{featured.name}</button><div className="shelf-featured-notes">{featured.notes.top.slice(0, 3).map((note) => <i key={note}>{note}</i>)}</div><p className="shelf-featured-description">{featured.description}</p><div className="shelf-featured-actions"><AddButton onAdd={() => onAddToCart(featured)} label /><button onClick={() => onToggle(featured)}>Убрать из избранного <span>×</span></button></div></div></section>{items.length > 1 && <section className="shelf-more"><div className="shelf-more-title"><p>ОСТАЛЬНЫЕ В КОЛЛЕКЦИИ</p><span>{String(items.length - 1).padStart(2, "0")}</span></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-5">{items.slice(1).map((product, index) => <article key={product.id} className={`shelf-tile tone-${index % 4}`}><button onClick={() => onViewProduct(product)} className="block w-full"><img src={product.image} alt={`${product.brand} ${product.name}`} /></button><div><p>{product.brand}</p><button onClick={() => onViewProduct(product)}>{product.name}</button><div><AddButton onAdd={() => onAddToCart(product)} /><button onClick={() => onToggle(product)} aria-label="Убрать из избранного">×</button></div></div></article>)}</div></section>}</>}</div></div>;
}
