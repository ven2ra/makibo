import { useMemo, useState } from "react";
import { products } from "../data/products";
import type { Product } from "../data/products";

type AdminTab = "catalog" | "orders" | "insights";
type StockState = "В наличии" | "Мало" | "Скрыт";

type ManagedProduct = Product & { stock: number; state: StockState };

const initialProducts: ManagedProduct[] = products.map((product, index) => ({
  ...product,
  stock: [18, 4, 12, 2, 9, 25, 6][index % 7],
  state: index === 12 ? "Скрыт" : [1, 3, 10].includes(index) ? "Мало" : "В наличии",
}));

const orderRows = [
  ["#MK-1842", "Кира Н.", "Tom Ford · Black Orchid", "18 900 ₽", "Собираем"],
  ["#MK-1841", "Илья В.", "Creed · Aventus", "32 000 ₽", "Оплачен"],
  ["#MK-1840", "Мария К.", "Byredo · Gypsy Water", "19 500 ₽", "В пути"],
  ["#MK-1839", "Алёна С.", "Chanel · N°5", "16 500 ₽", "Новый"],
];

interface AdminProps { onExit: () => void; }

export default function Admin({ onExit }: AdminProps) {
  const [tab, setTab] = useState<AdminTab>("catalog");
  const [items, setItems] = useState(initialProducts);
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<ManagedProduct | null>(null);
  const [notice, setNotice] = useState("");
  const [draft, setDraft] = useState({ name: "", brand: "", price: "", stock: "8" });

  const filtered = useMemo(() => items.filter((item) => `${item.brand} ${item.name}`.toLowerCase().includes(query.toLowerCase())), [items, query]);
  const totalStock = items.reduce((sum, item) => sum + item.stock, 0);
  const lowStock = items.filter((item) => item.state === "Мало").length;
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 2200); };
  const changeStock = (id: string, value: number) => setItems((current) => current.map((item) => item.id === id ? { ...item, stock: Math.max(0, item.stock + value), state: item.stock + value <= 4 ? "Мало" : "В наличии" } : item));
  const saveProduct = () => {
    if (!editing) return;
    setItems((current) => current.map((item) => item.id === editing.id ? editing : item));
    setEditing(null);
    flash("Карточка аромата сохранена");
  };
  const createProduct = () => {
    if (!draft.name.trim() || !draft.brand.trim() || !draft.price.trim()) return;
    const reference = products[0];
    setItems((current) => [{ ...reference, id: `makibo-${Date.now()}`, name: draft.name, brand: draft.brand, price: Number(draft.price), stock: Number(draft.stock) || 0, state: "В наличии", isNew: true }, ...current]);
    setDraft({ name: "", brand: "", price: "", stock: "8" });
    flash("Новый аромат появился в черновиках");
  };

  return <div className="admin-shell min-h-screen">
    <aside className="admin-rail">
      <button className="admin-mark" onClick={onExit} aria-label="Вернуться в Makibo">maki<span>b</span>o<i>CONTROL</i></button>
      <nav>
        <button className={tab === "catalog" ? "is-active" : ""} onClick={() => setTab("catalog")}><span>01</span> Товары</button>
        <button className={tab === "orders" ? "is-active" : ""} onClick={() => setTab("orders")}><span>02</span> Заказы <b>04</b></button>
        <button className={tab === "insights" ? "is-active" : ""} onClick={() => setTab("insights")}><span>03</span> Пульс</button>
      </nav>
      <div className="admin-rail-bottom"><p>MAKIBO / 2025</p><button onClick={onExit}>← На витрину</button></div>
    </aside>

    <main className="admin-main">
      <header className="admin-topbar"><div><p>ОПЕРАЦИОННАЯ СИСТЕМА МАГАЗИНА</p><strong>Суббота, 12:48 <i /></strong></div><div><span className="admin-live">LIVE</span><button className="admin-avatar">AK</button></div></header>

      {tab === "catalog" && <section className="admin-view">
        <div className="admin-heading"><div><p>01 / КАТАЛОГ</p><h1>ФЛАКОНЫ<br />В ЭФИРЕ.</h1></div><button className="admin-primary" onClick={() => document.getElementById("new-product")?.scrollIntoView({ behavior: "smooth" })}>+ Новый аромат</button></div>
        <div className="admin-metrics"><article><span>Продано за 7 дней</span><b>327</b><i>+18.4%</i></article><article><span>На полках</span><b>{totalStock}</b><i>{lowStock} требуют внимания</i></article><article className="admin-metric-pink"><span>В черновиках</span><b>03</b><i>выйдут 14 июня</i></article></div>
        <div className="admin-toolbar"><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти аромат или бренд" /></label><div><button className="is-current">Все {items.length}</button><button>В наличии</button><button>Черновики</button></div></div>
        <div className="admin-table-wrap"><table className="admin-table"><thead><tr><th>АРОМАТ</th><th>ЦЕНА</th><th>ОСТАТОК</th><th>СТАТУС</th><th aria-label="Действия" /></tr></thead><tbody>{filtered.map((product) => <tr key={product.id}><td><img src={product.image} alt="" /><div><b>{product.name}</b><span>{product.brand} · {product.volume.join(" / ")} мл</span></div></td><td>{product.price.toLocaleString("ru-RU")} ₽</td><td><div className="admin-stepper"><button onClick={() => changeStock(product.id, -1)}>−</button><b>{product.stock}</b><button onClick={() => changeStock(product.id, 1)}>+</button></div></td><td><button onClick={() => setItems((current) => current.map((item) => item.id === product.id ? { ...item, state: item.state === "Скрыт" ? "В наличии" : "Скрыт" } : item))} className={`admin-status ${product.state === "Мало" ? "low" : product.state === "Скрыт" ? "hidden" : ""}`}>{product.state}</button></td><td><button className="admin-edit" onClick={() => setEditing({ ...product })}>Изменить ↗</button></td></tr>)}</tbody></table></div>
        <section id="new-product" className="admin-new-product"><div><p>БЫСТРОЕ ДОБАВЛЕНИЕ</p><h2>Новый<br />флакон.</h2></div><div className="admin-new-fields"><input value={draft.brand} onChange={(event) => setDraft({ ...draft, brand: event.target.value })} placeholder="Бренд" /><input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} placeholder="Название аромата" /><input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} placeholder="Цена, ₽" inputMode="numeric" /><button onClick={createProduct}>Добавить →</button></div></section>
      </section>}

      {tab === "orders" && <section className="admin-view"><div className="admin-heading"><div><p>02 / ПОТОК</p><h1>ЗАКАЗЫ<br />СЕГОДНЯ.</h1></div><button className="admin-primary">Экспорт .CSV</button></div><div className="admin-orders-board"><div className="admin-order-stats"><article><span>Выручка</span><b>184 650 ₽</b><i>сегодня, 12 заказов</i></article><article><span>Средний чек</span><b>15 388 ₽</b><i>+7% к прошлой субботе</i></article></div><div className="admin-orders-list">{orderRows.map(([id, customer, order, total, status]) => <article key={id}><span>{id}</span><div><b>{customer}</b><small>{order}</small></div><strong>{total}</strong><em className={status === "Новый" ? "pink" : ""}>{status}</em><button>→</button></article>)}</div></div></section>}

      {tab === "insights" && <section className="admin-view"><div className="admin-heading"><div><p>03 / НЕДЕЛЯ 24</p><h1>ЧТО<br />ЗВУЧИТ.</h1></div><button className="admin-primary">Скачать отчёт</button></div><div className="admin-insights"><article className="admin-chart"><p>ПРОДАЖИ / 7 ДНЕЙ</p><div className="admin-bars">{[42, 66, 48, 92, 71, 84, 58].map((height, index) => <i key={height} style={{ height: `${height}%` }}><span>{["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"][index]}</span></i>)}</div><b>184 650 ₽ <small>+18.4%</small></b></article><article className="admin-best"><p>АРОМАТ НЕДЕЛИ</p><img src={products[1].image} alt="Tom Ford Black Orchid" /><div><span>01</span><h2>BLACK<br />ORCHID</h2><i>TOM FORD</i></div></article><article className="admin-note"><p>СИГНАЛ</p><b>Maison Francis Kurkdjian заканчивается через 2 дня.</b><button onClick={() => setTab("catalog")}>Открыть остатки →</button></article></div></section>}
    </main>
    {editing && <div className="admin-modal-backdrop" onMouseDown={() => setEditing(null)}><section className="admin-modal" onMouseDown={(event) => event.stopPropagation()}><button className="admin-modal-close" onClick={() => setEditing(null)}>×</button><p>РЕДАКТИРОВАНИЕ КАРТОЧКИ</p><h2>{editing.brand}<br />{editing.name}</h2><label>Название<input value={editing.name} onChange={(event) => setEditing({ ...editing, name: event.target.value })} /></label><label>Цена, ₽<input value={editing.price} inputMode="numeric" onChange={(event) => setEditing({ ...editing, price: Number(event.target.value) || 0 })} /></label><label>Остаток<input value={editing.stock} inputMode="numeric" onChange={(event) => setEditing({ ...editing, stock: Number(event.target.value) || 0 })} /></label><button className="admin-primary" onClick={saveProduct}>Сохранить изменения →</button></section></div>}
    {notice && <div className="admin-toast">✓ {notice}</div>}
  </div>;
}
