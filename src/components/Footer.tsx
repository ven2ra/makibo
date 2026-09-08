import { useNavigate } from "react-router";

const shopLinks = [
  { label: "Доставка и оплата", action: "/delivery" },
  { label: "Возврат", action: "/delivery" },
  { label: "Makibo Pass", action: "telegram" },
];

const moodLinks = [
  { label: "Новые ароматы", action: "/catalog" },
  { label: "Все бренды", action: "/brands" },
  { label: "О Makibo", action: "/about" },
];

export default function Footer() {
  const navigate = useNavigate();
  const go = (action: string) => {
    if (action === "telegram") {
      window.open("https://t.me/makibo_manager", "_blank", "noopener,noreferrer");
      return;
    }
    if (action.startsWith("#")) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    navigate(action);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return <footer className="makibo-footer">
    <div className="makibo-footer-top" aria-hidden="true"><div className="makibo-footer-tape">{[0, 1].map((group) => <div className="makibo-footer-tape-group" key={group}><p>НЕ ИЩИ СВОЙ АРОМАТ — <em>ВЫБЕРИ СОСТОЯНИЕ.</em></p><p>НЕ ИЩИ СВОЙ АРОМАТ — <em>ВЫБЕРИ СОСТОЯНИЕ.</em></p><p>НЕ ИЩИ СВОЙ АРОМАТ — <em>ВЫБЕРИ СОСТОЯНИЕ.</em></p></div>)}</div></div>
    <div className="mx-auto max-w-[1440px] px-4 pb-5 pt-8 sm:px-6 lg:px-9 lg:pb-7 lg:pt-12">
      <div className="makibo-footer-grid"><section className="makibo-footer-lead"><button onClick={() => go("/")} className="makibo-footer-logo" aria-label="На главную">maki<span>b</span>o</button><p>Парфюмерная витрина для тех, кому нужно не «что-нибудь», а <i>своё.</i></p><a href="https://t.me/makibo_parfumebot" target="_blank" rel="noreferrer" className="makibo-telegram-link"><b>↗</b><span>MAKIBO В TELEGRAM<small>@makibo_parfumebot</small></span></a></section>
        <section className="makibo-footer-list"><p>ПОКУПАТЕЛЯМ</p>{shopLinks.map((link) => <button key={link.label} onClick={() => go(link.action)}>{link.label} <i>↗</i></button>)}</section>
        <section className="makibo-footer-list"><p>В ЭФИРЕ</p>{moodLinks.map((link) => <button key={link.label} onClick={() => go(link.action)}>{link.label} <i>↗</i></button>)}</section>
        <section className="makibo-footer-signup makibo-footer-safe"><p>БЕЗОПАСНЫЙ КОНТАКТ</p><h2>Нужен<br /><em>совет?</em></h2><span>Подберём аромат в Telegram. Сайт не собирает email, телефон и другие персональные данные.</span><a href="https://t.me/makibo_manager" target="_blank" rel="noreferrer">Написать в Telegram <b>↗</b></a><small>Переход откроет @makibo_manager</small></section></div>
      <div className="makibo-footer-trust"><span><b>01</b> ТОЛЬКО ОРИГИНАЛ</span><span><b>02</b> ДОСТАВКА ОТ 15 000 ₽</span><span><b>03</b> РОССИЯ · ₽</span><button onClick={() => go("telegram")}>НУЖЕН СОВЕТ? НАПИШИТЕ НАМ ↗</button></div>
      <div className="makibo-footer-bottom"><p>© 2026 MAKIBO. ПАХНИ ПО-СВОЕМУ.</p><div><button onClick={() => go("/privacy")}>Политика конфиденциальности</button><button>Публичная оферта</button><button onClick={() => go("telegram")}>Контакты</button></div></div>
    </div>
  </footer>;
}
