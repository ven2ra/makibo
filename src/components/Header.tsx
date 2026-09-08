import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../data/products";

interface HeaderProps { onCartOpen: () => void; cartCount: number; favoriteCount: number; currentPage: string; onNavigate: (page: string) => void; onViewProduct: (product: Product) => void; }

export default function Header({ onCartOpen, cartCount, favoriteCount, currentPage, onNavigate, onViewProduct }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [promoCopied, setPromoCopied] = useState(false);
  const claimPromo = async () => {
    try { await navigator.clipboard.writeText("MAKIBO10"); } catch { /* Буфер может быть недоступен в preview. */ }
    setPromoCopied(true);
    window.setTimeout(() => setPromoCopied(false), 2600);
  };
  const searchMatches = products.filter((product) => `${product.brand} ${product.name}`.toLocaleLowerCase().includes(search.trim().toLocaleLowerCase())).slice(0, 5);
  const changeSearch = (value: string) => { setSearch(value); setSearchOpen(Boolean(value.trim())); };
  const selectSearchProduct = (product: Product) => { setSearch(""); setSearchOpen(false); setOpen(false); onViewProduct(product); };
  const go = (page: string) => { onNavigate(page); setOpen(false); setSearchOpen(false); };
  return <header className="fixed inset-x-0 top-0 z-50 bg-[#f7f7f3]/95 text-[#171717] shadow-[0_1px_0_rgba(0,0,0,.1)] backdrop-blur-xl">
    <div className="header-promo"><span>−10% на первую покупку</span><span className="hidden sm:inline">Бесплатная доставка от 15 000 ₽</span><button onClick={claimPromo} className={promoCopied ? "is-copied" : ""}>{promoCopied ? "MAKIBO10 · скопирован ✓" : "Забрать промокод →"}</button></div>
    <div className="mx-auto flex h-[68px] max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:h-[76px] lg:gap-5 lg:px-9">
      <button onClick={() => go("home")} className="beauty-logo group shrink-0" aria-label="На главную">maki<span className="relative inline-block text-[#f40c83] transition group-hover:-rotate-12">b</span>o</button>
      <button onClick={() => go("catalog")} className={`header-catalog hidden lg:inline-flex ${currentPage === "catalog" ? "is-active" : ""}`}><span className="header-catalog-grid" aria-hidden="true"><i /><i /><i /><i /></span>Каталог</button>
      <label className="header-search header-search-wrap hidden flex-1 lg:flex"><span>⌕</span><input value={search} onFocus={() => setSearchOpen(Boolean(search.trim()))} onChange={(event) => changeSearch(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter") go("catalog"); }} placeholder="Поиск по брендам и ароматам" /><kbd>⌘ K</kbd>{searchOpen && <SearchResults matches={searchMatches} onSelect={selectSearchProduct} />}</label>
      <nav className="hidden items-center gap-4 xl:flex"><button onClick={() => go("catalog")}>Новинки</button><button onClick={() => go("brands")}>Бренды</button></nav>
      <div className="ml-auto flex items-center gap-2 sm:gap-3"><button onClick={() => go("favorites")} className="header-round hidden sm:grid" aria-label={`Избранное: ${favoriteCount}`} >♡{favoriteCount > 0 && <em>{favoriteCount}</em>}</button><button onClick={onCartOpen} className="beauty-cart-button" aria-label={`Открыть корзину: ${cartCount} товаров`}><span className="beauty-cart-icon" aria-hidden="true">⌑</span><span className="hidden md:inline">Корзина</span><span className="beauty-cart-count">{String(cartCount).padStart(2, "0")}</span></button><button onClick={() => setOpen(!open)} className="header-menu lg:hidden" aria-label="Открыть меню"><i /><i /></button></div>
    </div>
    <div className="header-mobile-delivery lg:hidden"><span>✦</span> Бесплатная доставка от <b>15 000 ₽</b><span>по России</span></div>
    {open && <div className="border-t border-black/10 bg-[#f7f7f3] px-4 py-4 lg:hidden"><label className="header-search header-search-wrap flex"><span>⌕</span><input value={search} onFocus={() => setSearchOpen(Boolean(search.trim()))} onChange={(event) => changeSearch(event.target.value)} placeholder="Поиск по ароматам" /><kbd>→</kbd>{searchOpen && <SearchResults matches={searchMatches} onSelect={selectSearchProduct} />}</label><div className="mt-5 grid grid-cols-2 gap-2"><button onClick={() => go("catalog")} className="header-mobile-link">Каталог <span>→</span></button><button onClick={() => go("catalog")} className="header-mobile-link">Новинки <span>→</span></button><button onClick={() => go("brands")} className="header-mobile-link">Бренды <span>→</span></button></div></div>}
  </header>;
}

function SearchResults({ matches, onSelect }: { matches: Product[]; onSelect: (product: Product) => void }) {
  return <div className="header-search-results" role="listbox" aria-label="Подходящие ароматы">{matches.length ? matches.map((product) => <button key={product.id} type="button" role="option" onMouseDown={(event) => event.preventDefault()} onClick={() => onSelect(product)}><img src={product.image} alt="" loading="lazy" decoding="async" /><span><i>{product.brand}</i><b>{product.name}</b><small>{product.volume.join(" · ")} мл</small></span><em>от {product.price.toLocaleString("ru-RU")} ₽</em></button>) : <p>Ничего не нашли — попробуйте бренд или название.</p>}</div>;
}
