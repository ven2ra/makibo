import { useState } from "react";
import { products } from "../data/products";
import type { Product } from "../data/products";

const methods = [
  { id: "courier", number: "01", name: "Курьер", cost: "390 ₽", time: "сегодня / завтра", note: "До двери в выбранный интервал", color: "lime", icon: "→" },
  { id: "pickup", number: "02", name: "Самовывоз", cost: "бесплатно", time: "в день заказа", note: "Заберите в удобное время", color: "cream", icon: "⌑" },
  { id: "cdek", number: "03", name: "СДЭК", cost: "290 ₽", time: "2–5 дней", note: "Пункт выдачи или курьер СДЭК", color: "pink", icon: "↗" },
];
const questions = [
  ["Где посмотреть статус заказа?", "После подтверждения мы отправим ссылку на статус в Telegram. Там же можно уточнить любой вопрос по заказу."],
  ["Можно поменять способ доставки?", "Да, пока заказ не передан в доставку. Напишите боту — он передаст запрос команде Makibo."],
  ["Как проходит оплата?", "После подтверждения пришлём защищённую ссылку на оплату картой или через СБП. Данные карты на сайте не хранятся."],
];

export default function DeliveryPage({ heroProduct: orderedProduct }: { heroProduct?: Product }) {
  const [selected, setSelected] = useState("courier");
  // Если пользователь пришёл из корзины — в hero показываем именно его аромат.
  const heroProduct = orderedProduct ?? products.find((product) => product.id === "byredo-gypsy-water") ?? products[0];
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);
  const current = methods.find((item) => item.id === selected) ?? methods[0];
  return <div className="beauty-page min-h-screen pt-[95px] lg:pt-[103px]"><main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-9 lg:py-9">
    <section className="delivery-vibe-hero"><div className="delivery-vibe-meta"><span>MAKIBO / SERVICE EDIT</span><span>01 — DELIVERY</span></div><div className="delivery-vibe-title"><p>Ваши флаконы уже<br />знают дорогу.</p><h1>ЕДЕТ<br /><em>К ВАМ.</em></h1><button onClick={() => document.getElementById("delivery-methods")?.scrollIntoView({ behavior: "smooth" })}>Выбрать маршрут <b>↓</b></button></div><div className="delivery-vibe-bottle"><img src={heroProduct.image} alt={`${heroProduct.brand} ${heroProduct.name}`} /><div><span>{orderedProduct ? "ВАШ ЗАКАЗ / В ПУТИ" : "В ПУТИ / 01"}</span><b>{heroProduct.brand}<br />{heroProduct.name}</b></div></div><div className="delivery-vibe-tape"><div className="delivery-vibe-tape-track">{[0, 1].map((group) => <span key={group}>БЫСТРО · БЕРЕЖНО · БЕЗ ЛИШНЕГО · БЫСТРО · БЕРЕЖНО · БЕЗ ЛИШНЕГО · БЫСТРО · БЕРЕЖНО · БЕЗ ЛИШНЕГО · БЫСТРО · БЕРЕЖНО · БЕЗ ЛИШНЕГО ·</span>)}</div></div></section>
    <section id="delivery-methods" className="delivery-vibe-methods"><div className="delivery-vibe-head"><div><p>ВЫБЕРИТЕ СВОЙ РИТМ</p><h2>КАК<br /><span>ЗАБЕРЁТЕ?</span></h2></div><small>Бесплатно от 15 000 ₽<br />по России</small></div><div className="delivery-vibe-picker">{methods.map((method) => <button key={method.id} onClick={() => setSelected(method.id)} className={`${method.color} ${selected === method.id ? "is-active" : ""}`}><span>0{method.number}</span><i>{method.icon}</i><b>{method.name}</b><small>{method.time}</small></button>)}</div><div key={current.id} className={`delivery-vibe-result delivery-vibe-result-enter ${current.color}`}><div><p>ВАШ МАРШРУТ / {current.number}</p><h3>{current.name}</h3><span>{current.note}</span></div><div><b>{current.cost}</b><span>{current.time}</span></div><div className="delivery-vibe-route"><span>MAKIBO</span><i><b>✦</b></i><span>{current.id === "pickup" ? "ВАШ ПУНКТ" : current.id === "cdek" ? "СДЭК" : "ВАША ДВЕРЬ"}</span></div></div></section>
    <section className="delivery-vibe-story"><div className="delivery-vibe-story-card"><p>ВСЁ ПРОСТО</p><h2>ТРИ ДВИЖЕНИЯ<br />ДО <em>НОВОГО<br />СОСТОЯНИЯ.</em></h2></div><div className="delivery-vibe-steps"><article><span>01</span><div><b>Выбираете аромат</b><p>Добавляете флаконы в корзину и выбираете способ получения.</p></div><i>✦</i></article><article><span>02</span><div><b>Подтверждаете в Telegram</b><p>Бот уточнит адрес или пункт выдачи и пришлёт ссылку на оплату.</p></div><i>→</i></article><article><span>03</span><div><b>Встречаете заказ</b><p>Получаете аромат и начинаете новую красивую привычку.</p></div><i>♡</i></article></div></section>
    <section className="delivery-vibe-pay"><div className="delivery-vibe-pay-visual"><span>PAY<br />THE<br />MOOD</span><i>₽</i></div><div className="delivery-vibe-pay-copy"><p>ОПЛАТА</p><h2>СНАЧАЛА<br /><span>УБЕЖДАЕМСЯ.</span></h2><p>Вы подтверждаете заказ в Telegram — мы присылаем фото именно вашего флакона. После этого вы получаете ссылку на оплату картой или через СБП.</p><div><span>✓ Сначала — фото вашего заказа</span><span>✓ Затем — ссылка на оплату в Telegram</span></div><a href="https://t.me/makibo_manager" target="_blank" rel="noreferrer">Перейти в Telegram <b>↗</b></a></div></section>
    <section className="delivery-vibe-faq"><div><p>МОЖНО СПРОСИТЬ</p><h2>ОТВЕТИМ<br /><span>БЫСТРО.</span></h2></div><div>{questions.map(([question, answer], index) => <article key={question}><button onClick={() => setOpenQuestion(openQuestion === index ? null : index)} aria-expanded={openQuestion === index}><span>0{index + 1}</span><b>{question}</b><i>{openQuestion === index ? "−" : "+"}</i></button>{openQuestion === index && <p>{answer}</p>}</article>)}</div></section>
  </main></div>;
}
