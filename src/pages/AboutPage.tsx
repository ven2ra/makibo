import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function AboutPage() {
  const navigate = useNavigate();
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-about-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("about-reveal-in"); observer.unobserve(entry.target); }
    }), { threshold: 0.16, rootMargin: "0px 0px -50px" });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
  return <div className="about-page pt-[95px] lg:pt-[103px]">
    <section className="about-hero">
      <div className="about-hero-top"><span>MAKIBO / О НАС</span><span>ОСНОВАНО В 2021</span></div>
      <div className="about-hero-copy"><p>НЕ БОЛЬШЕ. <em>ТОЧНЕЕ.</em></p><h1>MaKiBo<br />начался <i>с любви</i><br />к деталям.</h1><span>С 2021 года мы собираем парфюмерию так, как сами хотели бы её выбирать: без лишнего шума, с понятными словами и вниманием к каждому флакону.</span></div>
      <div className="about-hero-stamp"><b>2021</b><span>DETAILS<br />MAKE<br />THE DIFFERENCE</span></div>
    </section>

    <section className="about-manifest about-reveal" data-about-reveal><div className="about-manifest-index"><span>01</span><i>ЗАЧЕМ<br />МЫ ЗДЕСЬ</i></div><div className="about-manifest-copy"><p>НАША ИДЕЯ</p><h2>Не просто<br /><em>каталог.</em></h2><div><p>Каталог можно собрать за вечер. Сложнее — сделать его понятным: чтобы быстро найти любимый бренд, сравнить разные настроения и не утонуть в чужих советах.</p><p>В Makibo рядом живут культовые флаконы, свежие релизы и ароматы, которые просто захотелось попробовать. Выбирайте по нотам, бренду, настроению — или вообще без причины.</p></div></div></section>

    <section className="about-rules about-reveal" data-about-reveal><header><p>MAKIBO / ВЫБОР</p><h2>ТРИ ПРОСТЫЕ<br />ПРИЧИНЫ <em>ОСТАТЬСЯ.</em></h2></header><div>{[["01", "Выбор без снобизма", "Собираем и культовую классику, и свежие релизы — чтобы вы выбирали по своему вкусу, а не по чужим правилам."], ["02", "Без лишних обещаний", "Честно рассказываем о флаконе, стоимости и том, как будет устроен заказ."], ["03", "Диалог вместо формы", "Подбираем и подтверждаем заказ в Telegram — без сбора лишних персональных данных."]].map(([number, title, text]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="about-cta about-reveal" data-about-reveal><p>ЕСЛИ НУЖЕН АРОМАТ — НАЧНЁМ С ГЛАВНОГО.</p><h2>Выберите<br /><em>своё.</em></h2><button onClick={() => navigate("/catalog")}>Открыть каталог <b>↗</b></button></section>
  </div>;
}
