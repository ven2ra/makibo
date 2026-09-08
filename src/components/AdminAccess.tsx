import { useState } from "react";

const LOCAL_ADMIN_PASSWORD = "makibo-control";
const SESSION_KEY = "makibo-admin-access";

interface AdminAccessProps {
  onGranted: () => void;
}

export function hasAdminAccess() {
  return sessionStorage.getItem(SESSION_KEY) === "granted";
}

export function clearAdminAccess() {
  sessionStorage.removeItem(SESSION_KEY);
}

export default function AdminAccess({ onGranted }: AdminAccessProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [welcoming, setWelcoming] = useState(false);
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (password === LOCAL_ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "granted");
      setWelcoming(true);
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.setTimeout(onGranted, reduceMotion ? 0 : 1450);
      return;
    }
    setError(true);
    setPassword("");
  };

  return <main className={`admin-access ${welcoming ? "is-welcoming" : ""}`}><div className="admin-access-grid" aria-hidden="true" />{welcoming ? <section className="admin-welcome" aria-live="polite"><div className="admin-welcome-orbit"><i>✦</i></div><p>ДОСТУП ПОДТВЕРЖДЁН</p><h1>Добро<br /><em>пожаловать.</em></h1><span>Открываем Control Room</span><div className="admin-welcome-stonks"><i>↗</i><b>STONKS</b><span>настроение: +∞</span></div><div className="admin-welcome-progress"><i /></div></section> : <section className="admin-access-card"><p>MAKIBO / PRIVATE ACCESS</p><h1>Только<br /><em>для своих.</em></h1><span>Локальный вход в Control Room</span><form onSubmit={submit}><label>Пароль<span className="admin-password-field"><input type={showPassword ? "text" : "password"} value={password} onChange={(event) => { setPassword(event.target.value); setError(false); }} placeholder="Введите пароль" autoFocus aria-invalid={error} /><button type="button" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}>{showPassword ? "◉" : "◌"}</button></span></label>{error && <small>Пароль не совпадает. Попробуйте ещё раз.</small>}<button>Войти в Control Room <b>→</b></button></form><footer><i>◉</i> Доступ действует только в этой вкладке</footer></section>}</main>;
}
