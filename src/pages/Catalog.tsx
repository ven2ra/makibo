import { useEffect, useMemo, useState } from "react";
import { BRANDS, FAMILIES, products as seedProducts } from "../data/products";
import type { Product } from "../data/products";
import AddButton from "../components/AddButton";
import { getStoredFeaturedTrio } from "../data/featuredTrio";
import { getStoredCatalogHeroPicks } from "../data/catalogHero";

interface CatalogProps { onAddToCart: (product: Product) => void; onViewProduct: (product: Product) => void; favorites: Product[]; onToggleFavorite: (product: Product) => void; }

export default function Catalog({ onAddToCart, onViewProduct, favorites, onToggleFavorite }: CatalogProps) {
  // Публичный каталог читает тот же локальный реестр, что и админка: импорт и правки видны без отдельной публикации.
  const products = useMemo<Product[]>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("makibo-admin-catalog-v1") ?? "null");
      return Array.isArray(saved) && saved.length ? saved as Product[] : seedProducts;
    } catch {
      return seedProducts;
    }
  }, []);
  const publicProducts = useMemo(() => products.filter((product) => {
    const status = (product as Product & { status?: string }).status;
    return !status || status === "На витрине";
  }), [products]);
  const [query, setQuery] = useState("");
  const [family, setFamily] = useState("все");
  const [brand, setBrand] = useState("все");
  const [sort, setSort] = useState<"popular" | "low" | "high">("popular");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(0);
  const [heroPickIds, setHeroPickIds] = useState<string[]>(getStoredCatalogHeroPicks);
  useEffect(() => {
    const refreshHeroPicks = () => setHeroPickIds(getStoredCatalogHeroPicks());
    window.addEventListener("makibo-catalog-hero-picks-updated", refreshHeroPicks);
    window.addEventListener("storage", refreshHeroPicks);
    return () => { window.removeEventListener("makibo-catalog-hero-picks-updated", refreshHeroPicks); window.removeEventListener("storage", refreshHeroPicks); };
  }, []);
  // Тройка меняется в админке и используется только в каталоге.
  const featuredTrioIds = useMemo(() => getStoredFeaturedTrio(), []);
  const selectedEditProducts = featuredTrioIds.map((id) => publicProducts.find((product) => product.id === id)).filter((product): product is Product => Boolean(product));
  const editProducts = selectedEditProducts.length === 3 ? selectedEditProducts : [publicProducts.find((product) => product.id === "tom-ford-black-orchid") ?? publicProducts[0], publicProducts.find((product) => product.id === "chanel-no5") ?? publicProducts[1] ?? publicProducts[0], publicProducts.find((product) => product.id === "creed-aventus") ?? publicProducts[2] ?? publicProducts[0]];
  const editProduct = editProducts[editIndex];
  const selectedHeroPicks = heroPickIds.map((id) => publicProducts.find((product) => product.id === id)).filter((product): product is Product => Boolean(product));
  const heroPicks = selectedHeroPicks.length === 2 ? selectedHeroPicks : publicProducts.slice(0, 2);
  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const list = publicProducts.filter((product) => (family === "все" || product.family === family) && (brand === "все" || product.brand === brand) && (!normalized || `${product.brand} ${product.name} ${product.notes.top.join(" ")}`.toLowerCase().includes(normalized)));
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return [...list].sort((a, b) => Number(Boolean(b.isBestseller)) - Number(Boolean(a.isBestseller)));
  }, [brand, family, publicProducts, query, sort]);
  const clear = () => { setQuery(""); setFamily("все"); setBrand("все"); setSort("popular"); };
  // «Все» в блоке брендов — это полноценный сброс витрины, а не бренд с таким названием.
  const selectBrand = (nextBrand: string) => {
    setBrand(nextBrand);
    if (nextBrand === "все") {
      setFamily("все");
    }
  };


  return <div className="beauty-page min-h-screen pt-[95px] lg:pt-[103px]">
    <div className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-9 lg:py-9">
      <div className="catalog-hero catalog-market-hero overflow-hidden rounded-[24px]"><div className="catalog-market-top"><p>MAKIBO BEAUTY MARKET</p><span>АРОМАТЫ В НАЛИЧИИ</span><b>15 / 24</b></div><div className="catalog-market-copy"><p>КАТАЛОГ MAKIBO</p><h1>ВЫБЕРИ<br /><em>СВОЙ АРОМАТ.</em></h1><span>Ищите по бренду, названию или нотам. Или просто смотрите всё — иногда нужный флакон находится сам.</span><button type="button" onClick={() => document.querySelector(".catalog-search input")?.focus()}>ОТКРЫТЬ ПОИСК <b>→</b></button></div><div className="catalog-market-picks">{heroPicks.map((product, index) => <button type="button" key={product.id} onClick={() => onViewProduct(product)} className={`catalog-market-pick pick-${index}`}><span>{index === 0 ? "NEW IN" : "ВЫБОР MAKIBO"}</span><img src={product.image} alt={`${product.brand} ${product.name}`} /><div><i>{product.brand}</i><b>{product.name}</b><small>от {product.price.toLocaleString("ru-RU")} ₽</small></div></button>)}</div><div className="catalog-market-foot"><span>В КАТАЛОГЕ <b>{publicProducts.length}</b> АРОМАТОВ</span><div>{FAMILIES.slice(0, 4).map((item) => <button key={item} type="button" onClick={() => { setFamily(item); setTimeout(() => document.querySelector(".catalog-search")?.scrollIntoView({ behavior: "smooth", block: "center" }), 0); }}>{item}</button>)}</div></div></div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-[120px] lg:h-fit"><div className="flex items-center justify-between lg:hidden"><p className="text-xl font-black">Фильтры</p><button onClick={() => setFiltersOpen(!filtersOpen)} className="rounded-full bg-[#d8ff12] px-4 py-2 text-xs font-bold">{filtersOpen ? "Скрыть" : "Открыть"}</button></div><div className={`${filtersOpen ? "mt-4 block" : "hidden"} rounded-2xl bg-white p-5 lg:mt-0 lg:block`}><div className="flex items-center justify-between"><p className="text-sm font-black">Фильтры</p><button onClick={clear} className="text-[11px] font-bold text-[#f40c83]">Сбросить</button></div><label className="catalog-filter-label">Семейство</label><div className="catalog-filter-list">{["все", ...FAMILIES].map((item) => <button key={item} onClick={() => setFamily(item)} className={family === item ? "is-selected" : ""}>{item}</button>)}</div><label className="catalog-filter-label">Бренд</label><div className="catalog-filter-list max-h-44 overflow-y-auto">{["все", ...BRANDS].map((item) => <button key={item} onClick={() => selectBrand(item)} className={brand === item ? "is-selected" : ""}>{item}</button>)}</div></div></aside>
        <div><div className="flex flex-col gap-3 border-b border-black/10 pb-5 sm:flex-row sm:items-center sm:justify-between"><label className="catalog-search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Бренд, аромат или нота" /></label><div className="flex items-center gap-2"><span className="text-xs text-neutral-500">{visibleProducts.length} товаров</span><select aria-label="Сортировка" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)} className="rounded-full border border-black/15 bg-white px-3 py-2 text-xs font-semibold outline-none"><option value="popular">По популярности</option><option value="low">Сначала дешевле</option><option value="high">Сначала дороже</option></select></div></div>
        <section className="catalog-edit mt-5"><div className="catalog-edit-copy"><p>ВЫБОР MAKIBO</p><h2>ТРИ ФЛАКОНА,<br />КОТОРЫЕ НЕЛЬЗЯ<br />ПРОПУСТИТЬ.</h2><div className="catalog-edit-tabs">{editProducts.map((product, index) => <button key={product.id} onClick={() => setEditIndex(index)} className={editIndex === index ? "is-active" : ""}>0{index + 1}</button>)}</div></div><div className="catalog-edit-product"><div className="catalog-edit-image"><img src={editProduct.image} alt={`${editProduct.brand} ${editProduct.name}`} decoding="async" /></div><div className="catalog-edit-info"><p>{editProduct.brand} / {editProduct.year}</p><button onClick={() => onViewProduct(editProduct)}>{editProduct.name}</button><span>{editProduct.notes.top.length || editProduct.notes.heart.length || editProduct.notes.base.length ? editProduct.notes.top.slice(0, 3).join(" · ") : "Карта нот на уточнении"}</span><div><strong>{editProduct.price.toLocaleString("ru-RU")} ₽</strong><AddButton onAdd={() => onAddToCart(editProduct)} label className="catalog-edit-add" /></div></div></div></section>
        <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-7 sm:grid-cols-3 lg:gap-x-5 lg:gap-y-9">{visibleProducts.map((product, index) => <article key={product.id} className={`beauty-product catalog-product-card family-${product.family}`}><div className="catalog-card-visual"><div role="button" tabIndex={0} onClick={() => onViewProduct(product)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") onViewProduct(product); }} className="catalog-card-image"><img loading="lazy" decoding="async" src={product.image} alt={`${product.brand} ${product.name}`} /><span className="catalog-card-serial">MK / {String(index + 1).padStart(2, "0")}</span><div className="catalog-card-notes">{product.notes.top.length || product.notes.heart.length || product.notes.base.length ? product.notes.top.slice(0, 2).map((note) => <i key={note}>{note}</i>) : <i className="is-pending">Пирамида уточняется</i>}</div></div>{(index < 3 || product.isNew) && <span className={`catalog-card-badge ${product.isNew ? "is-new" : ""}`}>{product.isNew ? "NEW" : "HIT"}</span>}<button onClick={() => onToggleFavorite(product)} aria-label="Добавить в избранное" className={`catalog-card-favorite ${favorites.some((item) => item.id === product.id) ? "is-selected" : ""}`}>{favorites.some((item) => item.id === product.id) ? "♥" : "♡"}</button></div><div className="catalog-card-body"><div className="catalog-card-meta"><p>{product.brand}</p><span>{product.family}</span></div><button onClick={() => onViewProduct(product)} className="catalog-card-name">{product.name}</button>{!(product.notes.top.length || product.notes.heart.length || product.notes.base.length) && <p className="catalog-card-notes-status">Карта нот на уточнении</p>}<div className="catalog-card-bottom"><div><p>от {product.volume[0]} мл</p><strong>{product.price.toLocaleString("ru-RU")} ₽</strong></div><AddButton onAdd={() => onAddToCart(product)} /></div></div></article>)}</div>{visibleProducts.length === 0 && <div className="py-24 text-center"><p className="text-lg font-bold">Ничего не нашли</p><button onClick={clear} className="mt-3 rounded-full bg-[#d8ff12] px-5 py-3 text-xs font-bold">Сбросить фильтры</button></div>}</div>
      </div>
    </div>
  </div>;
}
