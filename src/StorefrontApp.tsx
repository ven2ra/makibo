import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import type { Product } from "./data/products";
import { DAILY_DROP_KEY, getStoredMoods, type Mood } from "./data/moods";
import { getStoredFeaturedTrio } from "./data/featuredTrio";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CartSidebar from "./components/CartSidebar";
import type { CartItem } from "./components/CartSidebar";
import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import ProductPage from "./pages/ProductPage";
import AdminPage from "./pages/AdminPage";
import DeliveryPage from "./pages/DeliveryPage";
import AboutPage from "./pages/AboutPage";
import PrivacyPage from "./pages/PrivacyPage";
import AdminAccess, { clearAdminAccess, hasAdminAccess } from "./components/AdminAccess";
import { BrandsPage, FavoritesPage } from "./pages/Extras";

type Page = "home" | "catalog" | "brands" | "favorites" | "delivery" | "about" | "privacy" | "product" | "admin";

const pagePaths: Record<Exclude<Page, "product">, string> = {
  home: "/",
  catalog: "/catalog",
  brands: "/brands",
  favorites: "/favorites",
  delivery: "/delivery",
  about: "/about",
  privacy: "/privacy",
  admin: "/admin",
};

// Фронт и админка используют один локальный реестр каталога. Это также обновляет карточки,
// открытые из главной, поиска или избранного, где может сохраниться стартовый объект аромата.
function getLiveCatalog(): Product[] {
  try {
    const saved = JSON.parse(window.localStorage.getItem("makibo-admin-catalog-v1") ?? "null");
    return Array.isArray(saved) && saved.length ? saved as Product[] : [];
  } catch {
    return [];
  }
}
function findLiveProduct(product: Product): Product {
  return getLiveCatalog().find((item) => item.id === product.id) ?? product;
}

function getPage(pathname: string): Page {
  if (pathname === "/admin") return "admin";
  if (pathname === "/catalog") return "catalog";
  if (pathname === "/brands") return "brands";
  if (pathname === "/favorites") return "favorites";
  if (pathname === "/delivery") return "delivery";
  if (pathname === "/about") return "about";
  if (pathname === "/privacy") return "privacy";
  if (pathname === "/product") return "product";
  return "home";
}

export default function StorefrontApp() {
  const navigateTo = useNavigate();
  const location = useLocation();
  const page = getPage(location.pathname);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [catalogProducts, setCatalogProducts] = useState<Product[]>(getLiveCatalog);
  const [moods, setMoods] = useState<Mood[]>(getStoredMoods);
  const [dailyDropProductId, setDailyDropProductId] = useState(() => window.localStorage.getItem(DAILY_DROP_KEY) ?? "");
  const [featuredTrioIds, setFeaturedTrioIds] = useState<string[]>(getStoredFeaturedTrio);
  const [cartOpen, setCartOpen] = useState(false);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [deliveryHeroProduct, setDeliveryHeroProduct] = useState<Product | null>(null);
  const [adminAllowed, setAdminAllowed] = useState(() => hasAdminAccess());
  React.useEffect(() => {
    const refreshCatalog = () => setCatalogProducts(getLiveCatalog());
    const refreshMoods = () => setMoods(getStoredMoods());
    const refreshDailyDrop = () => setDailyDropProductId(window.localStorage.getItem(DAILY_DROP_KEY) ?? "");
    const refreshFeaturedTrio = () => setFeaturedTrioIds(getStoredFeaturedTrio());
    window.addEventListener("storage", refreshCatalog);
    window.addEventListener("makibo-catalog-updated", refreshCatalog);
    window.addEventListener("makibo-moods-updated", refreshMoods);
    window.addEventListener("makibo-daily-drop-updated", refreshDailyDrop);
    window.addEventListener("makibo-featured-trio-updated", refreshFeaturedTrio);
    return () => { window.removeEventListener("storage", refreshCatalog); window.removeEventListener("makibo-catalog-updated", refreshCatalog); window.removeEventListener("makibo-moods-updated", refreshMoods); window.removeEventListener("makibo-daily-drop-updated", refreshDailyDrop); window.removeEventListener("makibo-featured-trio-updated", refreshFeaturedTrio); };
  }, []);

  const addToCart = (product: Product) => setCartItems((prev) => {
    const existing = prev.find((item) => item.product.id === product.id);
    return existing ? prev.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item) : [...prev, { product, quantity: 1, volume: product.volume[0] }];
  });
  const updateQuantity = (id: string, delta: number) => setCartItems((prev) => prev.map((item) => item.product.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter((item) => item.quantity > 0));
  const removeFromCart = (id: string) => setCartItems((prev) => prev.filter((item) => item.product.id !== id));
  const viewProduct = (product: Product) => { setSelectedProduct(findLiveProduct(product)); navigateTo("/product"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const navigate = (targetPage: string) => { navigateTo(pagePaths[targetPage as Exclude<Page, "product">] ?? "/"); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const confirmOrder = (confirmedItems: CartItem[], delivery: "courier" | "pickup" | "cdek") => {
    const deliveryLabel = delivery === "courier" ? "Курьер" : delivery === "cdek" ? "СДЭК" : "Самовывоз";
    const createdAt = new Date().toISOString();
    try {
      const saved = JSON.parse(window.localStorage.getItem("makibo-admin-orders-v1") ?? "[]");
      const existing = Array.isArray(saved) ? saved : [];
      const orderStamp = `${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 90 + 10)}`;
      // Админка пока ведёт одну позицию в одной строке, поэтому корзину раскладываем на понятные входящие позиции.
      const createdOrders = confirmedItems.map((item, index) => ({
        id: `MB-WEB-${orderStamp}-${index + 1}`,
        customer: "Заказ с сайта",
        item: `${item.product.brand} · ${item.product.name}`,
        productId: item.product.id,
        variantId: `${item.product.id}-${item.volume}`,
        quantity: item.quantity,
        delivery: deliveryLabel,
        state: "Новый запрос",
        createdAt,
      }));
      window.localStorage.setItem("makibo-admin-orders-v1", JSON.stringify([...createdOrders, ...existing]));
      window.dispatchEvent(new Event("makibo-orders-updated"));
    } catch {
      // Оформление не блокируем, даже если браузер запретил запись в localStorage.
    }
    setDeliveryHeroProduct(confirmedItems[0]?.product ?? null);
    setCartItems([]);
    setCartOpen(false);
    navigateTo("/delivery");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const toggleFavorite = (product: Product) => setFavorites((prev) => prev.some((item) => item.id === product.id) ? prev.filter((item) => item.id !== product.id) : [...prev, product]);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (page === "admin") return adminAllowed
    ? <AdminPage onBack={() => navigateTo("/")} onLogout={() => { clearAdminAccess(); setAdminAllowed(false); }} />
    : <AdminAccess onGranted={() => setAdminAllowed(true)} />;

  return <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
    <Header onCartOpen={() => setCartOpen(true)} cartCount={cartCount} currentPage={page} favoriteCount={favorites.length} onNavigate={navigate} onViewProduct={viewProduct} />
    <main key={`${page}-${selectedProduct?.id ?? ""}`} className="page-enter">
      {page === "home" && <Home onAddToCart={addToCart} onViewProduct={viewProduct} onNavigate={navigate} catalogProducts={catalogProducts} moods={moods} dailyDropProductId={dailyDropProductId} featuredTrioIds={featuredTrioIds} />}
      {page === "catalog" && <Catalog onAddToCart={addToCart} onViewProduct={viewProduct} favorites={favorites} onToggleFavorite={toggleFavorite} />}
      {page === "brands" && <BrandsPage onViewProduct={viewProduct} />}
      {page === "favorites" && <FavoritesPage items={favorites} onViewProduct={viewProduct} onAddToCart={addToCart} onToggle={toggleFavorite} />}
      {page === "delivery" && <DeliveryPage heroProduct={deliveryHeroProduct ?? undefined} />}
      {page === "about" && <AboutPage />}
      {page === "privacy" && <PrivacyPage />}
      {page === "product" && selectedProduct && <ProductPage product={selectedProduct} onAddToCart={addToCart} onViewProduct={viewProduct} onBack={() => navigate("catalog")} />}
      {page === "product" && !selectedProduct && <Catalog onAddToCart={addToCart} onViewProduct={viewProduct} favorites={favorites} onToggleFavorite={toggleFavorite} />}
    </main>
    <Footer />
    <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} onBrowseCatalog={() => { setCartOpen(false); setSelectedProduct(null); navigateTo("/catalog"); window.scrollTo({ top: 0, behavior: "smooth" }); }} items={cartItems} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onAddToCart={addToCart} onConfirmOrder={confirmOrder} />
  </div>;
}
