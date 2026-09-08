import { useState } from "react";
import type { Product } from "../data/products";
import svgPaths from "../imports/MakiboMarketplace/svg-l68bfswduw";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onView: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart, onView }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [wished, setWished] = useState(false);
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const handleWish = (e: React.MouseEvent) => {
    e.stopPropagation();
    setWished(!wished);
  };

  return (
    <div
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onView(product)}
    >
      {/* Image container */}
      <div className="relative overflow-hidden bg-[#141414] aspect-[3/4] mb-4">
        <img
          src={product.image}
          alt={`${product.brand} ${product.name}`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
          loading="lazy"
          decoding="async"
        />

        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0.3 }}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase bg-[var(--color-gold)] text-black font-medium">
              Новинка
            </span>
          )}
          {product.isBestseller && (
            <span className="px-2 py-0.5 text-[9px] tracking-[0.2em] uppercase glass border border-[var(--border)] text-[var(--color-gold)]">
              Хит
            </span>
          )}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWish}
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center glass rounded-full border border-[var(--border)] transition-all duration-200 hover:border-[var(--color-gold)]"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "scale(1)" : "scale(0.8)" }}
        >
          <svg width="14" height="14" viewBox="0 0 18 18" fill={wished ? "var(--color-gold)" : "none"}>
            <path
              d={svgPaths.pbeee300}
              stroke={wished ? "var(--color-gold)" : "var(--color-cream)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* Add to cart overlay button */}
        <div
          className="absolute bottom-0 left-0 right-0 p-3 transition-all duration-300"
          style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(8px)" }}
        >
          <button
            onClick={handleAddToCart}
            className={`w-full py-2.5 text-[10px] tracking-[0.2em] uppercase font-medium transition-all duration-200 ${
              added
                ? "bg-[var(--color-gold)] text-black"
                : "bg-black/70 backdrop-blur-sm border border-[var(--border)] text-[var(--color-cream)] hover:bg-[var(--color-gold)] hover:text-black hover:border-[var(--color-gold)]"
            }`}
          >
            {added ? "Добавлено ✓" : "В корзину"}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[var(--color-gold)]">{product.brand}</p>
        <h3
          className="text-sm font-normal text-[var(--color-cream)] group-hover:text-white transition-colors line-clamp-1"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {product.name}
        </h3>
        <p className="text-[10px] text-[var(--color-muted-white)] capitalize">{product.gender} · {product.family}</p>
        <p className="text-sm text-[var(--color-cream)] font-light mt-2">
          {product.price.toLocaleString("ru-RU")} ₽
        </p>
      </div>
    </div>
  );
}
