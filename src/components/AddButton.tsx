import { useState } from "react";

interface AddButtonProps {
  onAdd: () => void;
  label?: boolean;
  className?: string;
}

export default function AddButton({ onAdd, label = false, className = "" }: AddButtonProps) {
  const [added, setAdded] = useState(false);
  const handleClick = () => {
    onAdd();
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1100);
  };
  return <button type="button" onClick={handleClick} className={`add-product-button ${label ? "is-label" : ""} ${added ? "is-added" : ""} ${className}`} aria-label={added ? "Товар добавлен в корзину" : "Добавить товар в корзину"}>
    <span className="add-product-button-mark">{added ? "✓" : "+"}</span>
    {label && <span className="add-product-button-label">{added ? "Добавлено" : "В корзину"}</span>}
  </button>;
}
