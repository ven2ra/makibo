interface SiteLoaderProps {
  leaving: boolean;
}

/** Экран ожидания закрывает первый рендер и подгрузку крупных изображений. */
export default function SiteLoader({ leaving }: SiteLoaderProps) {
  return <div className={`site-loader ${leaving ? "is-leaving" : ""}`} role="status" aria-live="polite" aria-label="Загружаем Makibo">
    <div className="site-loader-mark" aria-hidden="true"><i /><i /><i /></div>
    <div className="site-loader-copy"><p>MAKIBO / BEAUTY SUPPLY</p><strong>maki<span>b</span>o</strong><small>собираем настроение</small></div>
    <div className="site-loader-count" aria-hidden="true"><span>01</span><i /></div>
  </div>;
}
