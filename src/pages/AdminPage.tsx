import { useEffect, useMemo, useState } from "react";
import { FAMILIES, products as catalogProducts } from "../data/products";
import type { Product } from "../data/products";
import { DAILY_DROP_KEY, defaultMoods, MOODS_KEY, type Mood } from "../data/moods";
import { FEATURED_TRIO_KEY, getStoredFeaturedTrio } from "../data/featuredTrio";
import { CATALOG_HERO_PICKS_KEY, getStoredCatalogHeroPicks } from "../data/catalogHero";

type Status = "На витрине" | "Черновик" | "Скрыт";
type Variant = { id: string; volume: number; price: number; purchasePrice: number; stock: number };
type ManagedProduct = Omit<Product, "volume"> & { sku: string; volume: number[]; stock: number; status: Status; variants: Variant[] };
type Tab = "pulse" | "catalog" | "orders" | "pricing";
type OrderStatus = "Новый запрос" | "Ждём подтверждение" | "Собираем заказ" | "Готов к отправке" | "Завершён" | "Отменён";
type DeliveryMethod = "Не выбрано" | "Курьер" | "Самовывоз" | "СДЭК";
type Order = { id: string; customer: string; item: string; productId: string; variantId: string; quantity: number; delivery: DeliveryMethod; state: OrderStatus; createdAt: string; completedAt?: string };
type Retailer = "Золотое яблоко" | "Лэтуаль" | "Рив Гош" | "Иль де Ботэ" | "Randewoo" | "Aroma-butik" | "Духи.рф";
const retailers: Retailer[] = ["Золотое яблоко", "Лэтуаль", "Рив Гош", "Иль де Ботэ", "Randewoo", "Aroma-butik", "Духи.рф"];
type DailyStat = { date: string; revenue: number; turnover: number; purchase: number; orderCount: number };
type CsvRow = Record<string, string>;
const DAILY_STATS_KEY = "makibo-daily-stats-v1";
const ORDERS_KEY = "makibo-admin-orders-v1";
const COMPLETED_ORDERS_KEY = "makibo-admin-completed-orders-v1";
const CATALOG_KEY = "makibo-admin-catalog-v1";
const WEEKLY_HITS_RESET_KEY = "makibo-weekly-hits-reset-v1";
// Все календарные срезы привязаны к московскому дню, а не к часовому поясу браузера.
const getMoscowDayKey = (date = new Date()) => {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Moscow", year: "numeric", month: "2-digit", day: "2-digit" }).formatToParts(date);
  const value = Object.fromEntries(parts.filter((part) => part.type !== "literal").map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
};
const getDayKey = () => getMoscowDayKey();
const moveDay = (date: string, offset: number) => { const next = new Date(`${date}T12:00:00`); next.setDate(next.getDate() + offset); return getMoscowDayKey(next); };
const formatDay = (date: string) => new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T12:00:00`));
const formatMoscowHeader = (date: Date) => {
  const weekday = new Intl.DateTimeFormat("ru-RU", { weekday: "long", timeZone: "Europe/Moscow" }).format(date);
  const calendar = new Intl.DateTimeFormat("ru-RU", { day: "numeric", month: "long", timeZone: "Europe/Moscow" }).format(date);
  const time = new Intl.DateTimeFormat("ru-RU", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Moscow" }).format(date);
  return `${weekday.charAt(0).toUpperCase()}${weekday.slice(1)}, ${calendar} · ${time}`;
};
const formatMoscowNumeric = (date: Date) => new Intl.DateTimeFormat("ru-RU", { day: "2-digit", month: "2-digit", year: "numeric", timeZone: "Europe/Moscow" }).format(date).replace(/\./g, " / ");

// CSV допускает запятую или точку с запятой, а значения в кавычках могут содержать разделители.
const parseCsv = (content: string): CsvRow[] => {
  const delimiter = content.split("\n").find((line) => line.trim())?.includes(";") ? ";" : ",";
  const rows: string[][] = []; let cell = ""; let row: string[] = []; let quoted = false;
  for (let index = 0; index < content.length; index += 1) {
    const char = content[index];
    if (char === '"' && content[index + 1] === '"' && quoted) { cell += '"'; index += 1; continue; }
    if (char === '"') { quoted = !quoted; continue; }
    if (char === delimiter && !quoted) { row.push(cell.trim()); cell = ""; continue; }
    if ((char === "\n" || char === "\r") && !quoted) { if (char === "\r" && content[index + 1] === "\n") index += 1; row.push(cell.trim()); if (row.some(Boolean)) rows.push(row); row = []; cell = ""; continue; }
    cell += char;
  }
  row.push(cell.trim()); if (row.some(Boolean)) rows.push(row);
  if (rows.length < 2) return [];
  const headers = rows[0].map((header) => header.toLowerCase().trim().replace(/[^a-zа-я0-9]/gi, ""));
  return rows.slice(1).map((values) => Object.fromEntries(headers.map((header, index) => [header, values[index] ?? ""])));
};
const csvValue = (row: CsvRow, ...keys: string[]) => keys.map((key) => row[key]).find((value) => value?.trim())?.trim() ?? "";
// Принимает и «34 800 ₽», и «34,800.00», и обычное число из Excel.
const csvNumber = (value: string) => Number(value.replace(/\s/g, "").replace(/[^0-9,.-]/g, "").replace(",", ".")) || 0;
const csvNotes = (value: string) => value.split("|").map((note) => note.trim()).filter(Boolean);

const products: ManagedProduct[] = catalogProducts.map((product, index) => ({
  ...product,
  // Публичный артикул: его можно сообщить менеджеру или использовать в учёте.
  sku: `MK-${String(index + 1).padStart(4, "0")}`,
  stock: [31, 7, 18, 4, 13, 9, 22, 6][index % 8],
  status: index === 6 ? "Черновик" : index === 11 ? "Скрыт" : "На витрине",
  weeklyHit: Boolean(product.isBestseller),
  variants: product.volume.map((volume, variantIndex) => ({ id: `${product.id}-${volume}`, volume, price: product.price + variantIndex * 2800, purchasePrice: Math.round((product.price + variantIndex * 2800) * [0.54, 0.58, 0.61, 0.56][index % 4] / 100) * 100, stock: Math.max(1, Math.floor([31, 7, 18, 4, 13, 9, 22, 6][index % 8] / product.volume.length)) })),
}));
const ensureVariants = (item: ManagedProduct): ManagedProduct => {
  const volumes = Array.isArray(item.volume) && item.volume.length ? item.volume : [50];
  const variants = Array.isArray(item.variants) && item.variants.length
    ? item.variants
    : volumes.map((volume) => ({ id: `${item.id}-${volume}`, volume, price: item.price ?? 0, purchasePrice: 0, stock: item.stock ?? 0 }));
  return { ...item, sku: item.sku || `MK-${item.id.toUpperCase().slice(0, 8)}`, weeklyHit: item.weeklyHit ?? false, volume: volumes, variants: variants.map((variant) => ({ ...variant, purchasePrice: variant.purchasePrice ?? 0 })), stock: item.stock ?? variants.reduce((sum, variant) => sum + variant.stock, 0) };
};

const orderRows: Order[] = [
  { id: "MB-2841", customer: "Мария С.", item: "Maison Francis Kurkdjian · Baccarat Rouge", productId: "mfk-baccarat-rouge", variantId: "mfk-baccarat-rouge-70", quantity: 1, delivery: "Не выбрано", state: "Новый запрос", createdAt: new Date().toISOString() },
  { id: "MB-2840", customer: "Анна Р.", item: "Byredo · Gypsy Water", productId: "byredo-gypsy-water", variantId: "byredo-gypsy-water-50", quantity: 1, delivery: "Не выбрано", state: "Ждём подтверждение", createdAt: new Date().toISOString() },
  { id: "MB-2839", customer: "Илья П.", item: "Tom Ford · Oud Wood", productId: "tom-ford-oud-wood", variantId: "tom-ford-oud-wood-50", quantity: 1, delivery: "Не выбрано", state: "Собираем заказ", createdAt: new Date().toISOString() },
];

interface AdminPageProps { onBack: () => void; onLogout: () => void; }

export default function AdminPage({ onBack, onLogout }: AdminPageProps) {
  const [tab, setTab] = useState<Tab>("pulse");
  // Каталог сохраняется локально, поэтому импорт CSV и ручные правки не исчезают после обновления страницы.
  const [items, setItems] = useState<ManagedProduct[]>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(CATALOG_KEY) ?? "null");
      const catalog = Array.isArray(saved) ? saved.map(ensureVariants) : products;
      // Один раз очищаем стартовую редакционную подборку: дальше хиты назначаются только вручную.
      if (window.localStorage.getItem(WEEKLY_HITS_RESET_KEY) !== "done") {
        window.localStorage.setItem(WEEKLY_HITS_RESET_KEY, "done");
        return catalog.map((item) => ({ ...item, weeklyHit: false }));
      }
      return catalog;
    } catch {
      return products;
    }
  });
  // Один источник для «Заказов» и «Пульса»: новые Telegram-заказы сразу видны во всей админке.
  const normalizeOrder = (order: Partial<Order>): Order => ({
    ...order,
    id: order.id ?? `MB-${String(Date.now()).slice(-5)}`,
    customer: order.customer ?? "Заказ из Telegram",
    item: order.item ?? "Аромат",
    productId: order.productId ?? "",
    variantId: order.variantId ?? "",
    quantity: Math.max(1, Number(order.quantity) || 1),
    delivery: order.delivery ?? "Не выбрано",
    state: order.state ?? "Новый запрос",
    // Старые сохранённые записи считаем заказами текущего дня: дальше дата фиксируется автоматически.
    createdAt: typeof order.createdAt === "string" ? order.createdAt : new Date().toISOString(),
  });
  // Активный реестр: завершённые заказы из него убираются в архив.
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(ORDERS_KEY) ?? "null");
      if (!Array.isArray(saved)) return orderRows;
      return saved.map(normalizeOrder).filter((order) => order.state !== "Завершён");
    } catch {
      return orderRows;
    }
  });
  useEffect(() => {
    const refreshOrders = () => {
      try {
        const saved = JSON.parse(window.localStorage.getItem(ORDERS_KEY) ?? "[]");
        if (Array.isArray(saved)) setOrders(saved.map(normalizeOrder).filter((order) => order.state !== "Завершён"));
      } catch { /* локальный журнал остаётся в текущем состоянии */ }
    };
    window.addEventListener("makibo-orders-updated", refreshOrders);
    window.addEventListener("storage", refreshOrders);
    return () => { window.removeEventListener("makibo-orders-updated", refreshOrders); window.removeEventListener("storage", refreshOrders); };
  }, []);
  // Архив не показывается во входящих, но участвует в дневной финансовой истории.
  const [completedOrders, setCompletedOrders] = useState<Order[]>(() => {
    try {
      const archived = JSON.parse(window.localStorage.getItem(COMPLETED_ORDERS_KEY) ?? "[]");
      const previousCompleted = JSON.parse(window.localStorage.getItem(ORDERS_KEY) ?? "[]");
      const source = [
        ...(Array.isArray(archived) ? archived : []),
        ...(Array.isArray(previousCompleted) ? previousCompleted.filter((order) => order?.state === "Завершён") : []),
      ].map(normalizeOrder).map((order) => ({ ...order, state: "Завершён" as OrderStatus }));
      return Array.from(new Map(source.map((order) => [order.id, order])).values());
    } catch {
      return [];
    }
  });
  const [query, setQuery] = useState("");
  const [editor, setEditor] = useState<ManagedProduct | null>(null);
  const [toast, setToast] = useState("");
  const [filter, setFilter] = useState<"Все" | Status>("Все");
  const [csvImportOpen, setCsvImportOpen] = useState(false);
  const [csvRows, setCsvRows] = useState<CsvRow[]>([]);
  const [csvFileName, setCsvFileName] = useState("");
  const [csvError, setCsvError] = useState("");
  const [dailyDropProductId, setDailyDropProductId] = useState(() => window.localStorage.getItem(DAILY_DROP_KEY) ?? "");
  const [featuredTrioIds, setFeaturedTrioIds] = useState<string[]>(getStoredFeaturedTrio);
  const [catalogHeroPickIds, setCatalogHeroPickIds] = useState<string[]>(getStoredCatalogHeroPicks);
  const [dailyDropSearchOpen, setDailyDropSearchOpen] = useState(false);
  const [dailyDropQuery, setDailyDropQuery] = useState("");
  const [activeMoodSearch, setActiveMoodSearch] = useState<string | null>(null);
  const [moodQueries, setMoodQueries] = useState<Record<string, string>>({});
  const [moods, setMoods] = useState<Mood[]>(() => {
    try { const saved = JSON.parse(window.localStorage.getItem(MOODS_KEY) ?? "null"); return Array.isArray(saved) && saved.length ? saved : defaultMoods; } catch { return defaultMoods; }
  });
  const [csvResult, setCsvResult] = useState("");
  const [orderFilter, setOrderFilter] = useState<"Все" | OrderStatus>("Все");
  const [orderComposerOpen, setOrderComposerOpen] = useState(false);
  const [manualProductId, setManualProductId] = useState(products[0].id);
  const [manualProductQuery, setManualProductQuery] = useState("");
  const [manualProductSearchOpen, setManualProductSearchOpen] = useState(false);
  const [manualVariantId, setManualVariantId] = useState(products[0].variants[0].id);
  // Строка позволяет очистить поле перед вводом нового количества без мгновенного возврата к «1».
  const [manualQuantity, setManualQuantity] = useState("1");
  const [manualDelivery, setManualDelivery] = useState<DeliveryMethod>("Не выбрано");
  const [manualStatus, setManualStatus] = useState<OrderStatus>("Новый запрос");
  const [todayKey, setTodayKey] = useState(getDayKey);
  const [selectedDay, setSelectedDay] = useState(getDayKey);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>(() => {
    try { return JSON.parse(window.localStorage.getItem(DAILY_STATS_KEY) ?? "[]") as DailyStat[]; } catch { return []; }
  });
  const [moscowNow, setMoscowNow] = useState(() => new Date());
  const [pricingProductId, setPricingProductId] = useState(products[0].id);
  const [pricingQuery, setPricingQuery] = useState("");
  const [pricingSearchOpen, setPricingSearchOpen] = useState(false);
  const [pricingVariantId, setPricingVariantId] = useState(products[0].variants[0].id);
  const [purchaseCost, setPurchaseCost] = useState(products[0].variants[0].purchasePrice);
  const [packingCost, setPackingCost] = useState(190);
  const [deliveryCost, setDeliveryCost] = useState(0);
  const [competitorPrices, setCompetitorPrices] = useState<Record<Retailer, number>>(() => Object.fromEntries(retailers.map((retailer) => [retailer, 0])) as Record<Retailer, number>);
  const notify = (message: string) => { setToast(message); window.setTimeout(() => setToast(""), 2300); };
  const normalizedItems = useMemo(() => items.map(ensureVariants), [items]);
  useEffect(() => {
    window.localStorage.setItem(CATALOG_KEY, JSON.stringify(items));
    window.dispatchEvent(new Event("makibo-catalog-updated"));
  }, [items]);
  useEffect(() => {
    window.localStorage.setItem(MOODS_KEY, JSON.stringify(moods));
    window.dispatchEvent(new Event("makibo-moods-updated"));
  }, [moods]);
  useEffect(() => {
    if (dailyDropProductId) window.localStorage.setItem(DAILY_DROP_KEY, dailyDropProductId);
    else window.localStorage.removeItem(DAILY_DROP_KEY);
    window.dispatchEvent(new Event("makibo-daily-drop-updated"));
  }, [dailyDropProductId]);
  useEffect(() => {
    window.localStorage.setItem(FEATURED_TRIO_KEY, JSON.stringify(featuredTrioIds));
    window.dispatchEvent(new Event("makibo-featured-trio-updated"));
  }, [featuredTrioIds]);
  useEffect(() => {
    window.localStorage.setItem(CATALOG_HERO_PICKS_KEY, JSON.stringify(catalogHeroPickIds));
    window.dispatchEvent(new Event("makibo-catalog-hero-picks-updated"));
  }, [catalogHeroPickIds]);
  const manualProduct = normalizedItems.find((item) => item.id === manualProductId) ?? normalizedItems[0];
  const manualVariant = manualProduct.variants.find((variant) => variant.id === manualVariantId) ?? manualProduct.variants[0];
  const manualProductMatches = normalizedItems.filter((item) => `${item.brand} ${item.name}`.toLowerCase().includes(manualProductQuery.trim().toLowerCase())).slice(0, 6);
  const storefrontItems = normalizedItems.filter((item) => item.status === "На витрине");
  const dailyDropMatches = storefrontItems.filter((item) => `${item.brand} ${item.name}`.toLowerCase().includes(dailyDropQuery.trim().toLowerCase())).slice(0, 6);
  const shown = useMemo(() => normalizedItems.filter((item) => {
    const hasQuery = `${item.brand} ${item.name}`.toLowerCase().includes(query.trim().toLowerCase());
    return hasQuery && (filter === "Все" || item.status === filter);
  }), [normalizedItems, query, filter]);
  const patchItem = (id: string, patch: Partial<ManagedProduct>) => setItems((current) => current.map((item) => item.id === id ? { ...item, ...patch } : item));
  const toggleWeeklyHit = (id: string) => setItems((current) => {
    const item = current.find((entry) => entry.id === id);
    if (!item) return current;
    const activeHits = current.filter((entry) => entry.weeklyHit).length;
    if (!item.weeklyHit && activeHits >= 4) { notify("В Hit Parade может быть максимум 4 аромата"); return current; }
    notify(item.weeklyHit ? "Убрали из Hit Parade" : "Добавили в Hit Parade");
    return current.map((entry) => entry.id === id ? { ...entry, weeklyHit: !entry.weeklyHit } : entry);
  });
  const createDraft = () => {
    const source = normalizedItems[0];
    const id = `new-${Date.now()}`;
    const draft: ManagedProduct = { ...source, id, sku: `MK-${String(Date.now()).slice(-6)}`, name: "Новый аромат", brand: "Новый бренд", price: 0, volume: [50], stock: 0, variants: [{ id: `${id}-50`, volume: 50, price: 0, purchasePrice: 0, stock: 0 }], status: "Черновик", isNew: true };
    setItems((current) => [draft, ...current]);
    setEditor(draft);
  };
  const downloadCsvTemplate = () => {
    // Пустую строку между примерами можно удалить: обе строки считываются импортом одинаково.
    const template = [
      "sku;brand;name;volume;price;purchasePrice;family;year;description;notesTop;notesHeart;notesBase;image;status",
      "MK-0101;Creed;Aventus;50;34800;19200;древесный;2010;Яркий цитрусово-древесный аромат;бергамот|чёрная смородина;ананас|берёза;мускус|дубовый мох;;На витрине",
      "MK-0001;;;50;17900;9800;;;;;;;;;;",
    ].join("\n");
    const url = URL.createObjectURL(new Blob(["\ufeff", template], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url; link.download = "makibo-csv-template.csv"; link.click();
    URL.revokeObjectURL(url);
  };
  const readCsv = async (file?: File) => {
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".csv")) { setCsvError("Нужен файл в формате .csv"); return; }
    const rows = parseCsv(await file.text());
    if (!rows.length) { setCsvError("Не удалось прочитать строки. Проверьте первую строку с названиями колонок."); return; }
    setCsvRows(rows); setCsvFileName(file.name); setCsvError(""); setCsvResult("");
  };
  const importCsv = () => {
    if (!csvRows.length) return;
    let created = 0; let updated = 0; let skipped = 0;
    const next = [...items];
      csvRows.forEach((row, rowIndex) => {
        const sku = csvValue(row, "sku", "артикул", "артикултовара", "код", "кодтовара"); const id = csvValue(row, "id", "productid");
        const brand = csvValue(row, "brand", "бренд", "брендтовара", "марка", "производитель");
        const name = csvValue(row, "name", "название", "аромат", "названиетовара", "наименованиетовара", "наименование", "товар", "productname");
        const volume = csvNumber(csvValue(row, "volume", "объем", "объём", "объеммл", "объёммл")) || 50; const price = csvNumber(csvValue(row, "price", "цена", "ценаруб", "ценарублей")); const purchasePrice = csvNumber(csvValue(row, "purchaseprice", "purchasepriceруб", "закупочнаяцена", "закупочнаяценаруб", "закупка", "закупкаруб")); const importYear = csvNumber(csvValue(row, "year", "год", "годвыпуска"));
        const existingIndex = next.findIndex((item) => (sku && item.sku === sku) || (id && item.id === id) || (!!brand && !!name && item.brand.toLowerCase() === brand.toLowerCase() && item.name.toLowerCase() === name.toLowerCase()));
        if (existingIndex >= 0) {
          const item = ensureVariants(next[existingIndex]); const variantIndex = item.variants.findIndex((variant) => variant.volume === volume);
          const variants = variantIndex >= 0 ? item.variants.map((variant, index) => index === variantIndex ? { ...variant, price: price || variant.price, purchasePrice: purchasePrice || variant.purchasePrice } : variant) : [...item.variants, { id: `${item.id}-${volume}`, volume, price: price || item.price, purchasePrice, stock: 0 }];
          // Дозаполняем пустые карточки из товарного CSV, но не затираем уже заданные данные пустыми ячейками прайса.
          next[existingIndex] = {
            ...item,
            brand: brand || item.brand || "Без бренда",
            name: name || item.name || "Без названия",
            description: csvValue(row, "description", "описание") || item.description,
            image: csvValue(row, "image", "фото", "url", "ссылкаизображения") || item.image,
            year: importYear || item.year,
            variants,
            volume: variants.map((variant) => variant.volume),
            price: Math.min(...variants.map((variant) => variant.price)),
          }; updated += 1; return;
        }
        if (!brand || !name || !price) { skipped += 1; return; }
        const source = ensureVariants(next[0] ?? products[0]); const generatedId = (id || `${brand}-${name}`).toLowerCase().replace(/[^a-zа-я0-9]+/gi, "-").replace(/(^-|-$)/g, "") || `csv-${Date.now()}-${rowIndex}`;
        const family = csvValue(row, "family", "группа", "ольфакторнаягруппа"); const status = csvValue(row, "status", "статус"); const variant: Variant = { id: `${generatedId}-${volume}`, volume, price, purchasePrice, stock: 0 };
        next.unshift({ ...source, id: generatedId, sku: sku || `MK-${String(Date.now() + rowIndex).slice(-6)}`, brand, name, description: csvValue(row, "description", "описание") || "Описание добавит команда Makibo.", image: csvValue(row, "image", "фото", "url") || source.image, family: FAMILIES.includes(family as Product["family"]) ? family as Product["family"] : source.family, year: importYear || undefined, notes: { top: csvNotes(csvValue(row, "notestop", "верхниеноты")), heart: csvNotes(csvValue(row, "notesheart", "нотысердца")), base: csvNotes(csvValue(row, "notesbase", "базовыеноты")) }, price, volume: [volume] as Product["volume"], variants: [variant], stock: 0, status: status === "Черновик" || status === "Скрыт" ? status : "На витрине", isNew: true, isBestseller: false, weeklyHit: false }); created += 1;
      });
    setItems(next);
    const result = `Добавлено: ${created} · обновлено: ${updated}${skipped ? ` · пропущено: ${skipped}` : ""}`;
    if (!created && !updated) { setCsvError("Не нашёл строк для импорта. Для нового аромата нужны бренд, название и цена; для прайса — SKU/ID и цена."); return; }
    setCsvResult(result); setCsvError(""); notify(`CSV: ${result}`); setQuery(""); setFilter("Все");
  };
  const statusClass = (status: Status) => status === "На витрине" ? "is-on" : status === "Черновик" ? "is-draft" : "is-hidden";
  const nextProductStatus = (status: Status): Status => ({ "Черновик": "На витрине", "На витрине": "Скрыт", "Скрыт": "Черновик" })[status];
  const nextOrderStatus = (state: OrderStatus): OrderStatus => ({ "Новый запрос": "Ждём подтверждение", "Ждём подтверждение": "Собираем заказ", "Собираем заказ": "Готов к отправке", "Готов к отправке": "Завершён", "Завершён": "Новый запрос", "Отменён": "Новый запрос" })[state];
  const orderStatusTone: Record<OrderStatus, string> = { "Новый запрос": "is-new", "Ждём подтверждение": "is-confirm", "Собираем заказ": "is-packing", "Готов к отправке": "is-ready", "Завершён": "is-complete", "Отменён": "is-cancelled" };
  const safeEditor = editor ? ensureVariants(editor) : null;
  const pricingProduct = normalizedItems.find((item) => item.id === pricingProductId) ?? normalizedItems[0];
  const pricingMatches = normalizedItems.filter((item) => `${item.brand} ${item.name}`.toLowerCase().includes(pricingQuery.trim().toLowerCase())).slice(0, 6);
  const pricingVariant = pricingProduct.variants.find((variant) => variant.id === pricingVariantId) ?? pricingProduct.variants[0];
  const marketPrices = Object.values(competitorPrices).filter((price) => price > 0).sort((a, b) => a - b);
  const marketLow = marketPrices[0] ?? 0;
  const marketMedian = marketPrices.length ? marketPrices[Math.floor(marketPrices.length / 2)] : 0;
  const marginFloor = purchaseCost > 0 ? purchaseCost / (1 - 0.43) : 0;
  const suggestedPrice = marketPrices.length ? Math.round(Math.max(marginFloor, marketMedian * 0.94) / 100) * 100 : 0;
  const grossMargin = suggestedPrice > 0 ? Math.round(((suggestedPrice - purchaseCost) / suggestedPrice) * 100) : 0;
  const netProfit = suggestedPrice > 0 ? Math.round(suggestedPrice - purchaseCost - packingCost - deliveryCost) : 0;
  const netMargin = suggestedPrice > 0 ? Math.round((netProfit / suggestedPrice) * 100) : 0;
  const marketConflict = marketLow > 0 && marginFloor > marketLow;
  const applySuggestedPrice = () => {
    if (!suggestedPrice || !pricingProduct || !pricingVariant) return;
    setItems((current) => current.map((item) => {
      if (item.id !== pricingProduct.id) return item;
      const variants = ensureVariants(item).variants.map((variant) => variant.id === pricingVariant.id ? { ...variant, price: suggestedPrice } : variant);
      return { ...item, variants, volume: variants.map((variant) => variant.volume), price: Math.min(...variants.map((variant) => variant.price)) };
    }));
    notify(`${pricingProduct.brand} · ${pricingProduct.name}, ${pricingVariant.volume} мл: цена ${suggestedPrice.toLocaleString("ru-RU")} ₽ применена`);
  };
  // «Пульс» показывает общий реестр: ручной заказ виден здесь сразу, независимо от выбранного статуса.
  // Статус остаётся только этапом обработки и не скрывает заказ с главной страницы.
  const incomingOrders = orders;
  // Финансы включают активные и архивные заказы: завершение не стирает историю дня.
  const financialOrders = [...orders, ...completedOrders];
  const calculateFinances = (source: Order[]) => source.reduce((result, order) => {
    const product = normalizedItems.find((item) => item.id === order.productId);
    if (!product) return result;
    const variant = product.variants.find((entry) => entry.id === order.variantId) ?? product.variants[0];
    const catalogPrice = variant.price * order.quantity;
    const purchase = variant.purchasePrice * order.quantity;
    return { revenue: result.revenue + catalogPrice, purchase: result.purchase + purchase, gross: result.gross + catalogPrice - purchase };
  }, { revenue: 0, purchase: 0, gross: 0 });
  const finances = useMemo(() => calculateFinances(financialOrders), [financialOrders, normalizedItems]);
  const ordersToday = useMemo(() => financialOrders.filter((order) => getMoscowDayKey(new Date(order.completedAt ?? order.createdAt)) === todayKey), [financialOrders, todayKey]);
  const todayFinances = useMemo(() => calculateFinances(ordersToday), [ordersToday, normalizedItems]);
  // Закупка — факт расхода по каждому заказу; завершение меняет только операционный статус.
  const activePurchase = useMemo(() => financialOrders.reduce((sum, order) => {
    const product = normalizedItems.find((item) => item.id === order.productId);
    const variant = product?.variants.find((entry) => entry.id === order.variantId) ?? product?.variants[0];
    return sum + (variant ? variant.purchasePrice * order.quantity : 0);
  }, 0), [financialOrders, normalizedItems]);
  // Текущий срез обновляется от заказов, а история предыдущих дней остаётся неизменной.
  useEffect(() => {
    const interval = window.setInterval(() => setMoscowNow(new Date()), 15_000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextDay = getDayKey();
      setTodayKey((currentDay) => {
        if (currentDay !== nextDay) setSelectedDay((currentSelected) => currentSelected === currentDay ? nextDay : currentSelected);
        return nextDay;
      });
    }, 60_000);
    return () => window.clearInterval(interval);
  }, []);
  useEffect(() => {
    const snapshot: DailyStat = { date: todayKey, revenue: todayFinances.gross, turnover: todayFinances.revenue, purchase: todayFinances.purchase, orderCount: ordersToday.length };
    setDailyStats((current) => {
      const next = [...current.filter((item) => item.date !== todayKey), snapshot].sort((a, b) => a.date.localeCompare(b.date));
      window.localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(next));
      return next;
    });
  }, [ordersToday.length, todayFinances.gross, todayFinances.purchase, todayFinances.revenue, todayKey]);
  const selectedStat = dailyStats.find((item) => item.date === selectedDay);
  const weeklyStats = useMemo(() => Array.from({ length: 7 }, (_, index) => {
    const date = moveDay(todayKey, index - 6);
    return { date, value: dailyStats.find((item) => item.date === date)?.revenue ?? 0 };
  }), [dailyStats, todayKey]);
  const weeklyMax = Math.max(...weeklyStats.map((item) => item.value), 1);
  const recordedWeekDays = weeklyStats.filter((item) => item.value > 0).length;
  const orderTotal = (order: Order) => {
    const product = normalizedItems.find((item) => item.id === order.productId);
    const variant = product?.variants.find((entry) => entry.id === order.variantId) ?? product?.variants[0];
    return variant ? variant.price * order.quantity : 0;
  };
  const orderDetail = (order: Order) => {
    const product = normalizedItems.find((item) => item.id === order.productId);
    const variant = product?.variants.find((entry) => entry.id === order.variantId) ?? product?.variants[0];
    const total = variant ? variant.price * order.quantity : 0;
    const purchase = variant ? variant.purchasePrice * order.quantity : 0;
    return { product, variant, total, purchase, income: total - purchase };
  };
  const visibleOrders = orders.filter((order) => orderFilter === "Все" || order.state === orderFilter);
  const newRequestCount = orders.filter((order) => order.state === "Новый запрос").length;
  useEffect(() => { window.localStorage.setItem(ORDERS_KEY, JSON.stringify(orders)); }, [orders]);
  useEffect(() => { window.localStorage.setItem(COMPLETED_ORDERS_KEY, JSON.stringify(completedOrders)); }, [completedOrders]);
  const setOrderStatus = (id: string, state: OrderStatus) => {
    const order = orders.find((entry) => entry.id === id);
    if (!order) return;
    if (state === "Завершён") {
      const archivedOrder: Order = { ...order, state, completedAt: new Date().toISOString() };
      setCompletedOrders((current) => [archivedOrder, ...current.filter((entry) => entry.id !== id)]);
      setOrders((current) => current.filter((entry) => entry.id !== id));
      notify(`${order.id}: завершён и сохранён в журнале`);
      return;
    }
    if (state === "Отменён") {
      const detail = orderDetail(order);
      const day = getMoscowDayKey(new Date(order.completedAt ?? order.createdAt));
      setOrders((current) => current.filter((entry) => entry.id !== id));
      setDailyStats((current) => {
        const next = current.map((stat) => stat.date === day ? {
          ...stat,
          revenue: Math.max(0, stat.revenue - detail.income),
          turnover: Math.max(0, stat.turnover - detail.total),
          purchase: Math.max(0, stat.purchase - detail.purchase),
          orderCount: Math.max(0, stat.orderCount - 1),
        } : stat);
        window.localStorage.setItem(DAILY_STATS_KEY, JSON.stringify(next));
        return next;
      });
      notify(`${order.id}: отменён и исключён из статистики`);
      return;
    }
    setOrders((current) => current.map((entry) => entry.id === id ? { ...entry, state } : entry));
    notify(`${order.id}: ${state}`);
  };
  const setOrderDelivery = (id: string, delivery: DeliveryMethod) => setOrders((current) => current.map((order) => {
    if (order.id !== id) return order;
    notify(delivery === "Не выбрано" ? `${order.id}: получение не выбрано` : `${order.id}: ${delivery}`);
    return { ...order, delivery };
  }));
  const addTelegramOrder = () => {
    const id = `MB-${String(Date.now()).slice(-5)}`;
    const order: Order = { id, customer: "Заказ из Telegram", item: `${manualProduct.brand} · ${manualProduct.name}`, productId: manualProduct.id, variantId: manualVariant.id, quantity: Math.max(1, Number(manualQuantity) || 1), delivery: manualDelivery, state: manualStatus, createdAt: new Date().toISOString() };
    setOrders((current) => [order, ...current]);
    setOrderComposerOpen(false);
    setManualQuantity("1");
    setManualDelivery("Не выбрано");
    setManualStatus("Новый запрос");
    notify(`${id}: заказ добавлен`);
  };
  const advanceOrder = (id: string) => {
    const current = orders.find((order) => order.id === id);
    if (current) setOrderStatus(id, nextOrderStatus(current.state));
  };

  return <div className="ops-shell">
    <aside className="ops-rail">
      <button className="ops-brand" onClick={onBack} aria-label="Вернуться в магазин">m<span>a</span>kibo</button>
      <nav aria-label="Разделы управления">{([{ id: "pulse", icon: "◉", label: "Пульс" }, { id: "catalog", icon: "▦", label: "Каталог" }, { id: "pricing", icon: "₽", label: "Цены" }, { id: "orders", icon: "↗", label: "Заказы" }] as const).map((link) => <button key={link.id} className={tab === link.id ? "is-current" : ""} onClick={() => setTab(link.id)}><i>{link.icon}</i><span>{link.label}</span></button>)}</nav>
      <div className="ops-rail-bottom"><span className="ops-person">АС</span><button onClick={onBack}>В магазин ↗</button></div>
    </aside>
    <main className="ops-main">
      <header className="ops-topline"><div><span className="ops-kicker">MAKIBO / CONTROL ROOM</span><p>{formatMoscowHeader(moscowNow)} <b>●</b> МСК</p></div><div><button className="ops-help" onClick={onLogout}>Выйти</button><button onClick={createDraft} className="ops-add">+ Аромат</button></div></header>
      {tab === "pulse" && <section className="ops-page"><div className="ops-title-row"><div><h1>Сегодня<br /><em>в фокусе.</em></h1><p>Собрали только то, что требует решения прямо сейчас.</p></div><span className="ops-date">{formatMoscowNumeric(moscowNow)}<br />МСК</span></div>
        <div className="ops-scoreboard"><article><p>ВЫРУЧКА</p><strong>{finances.gross.toLocaleString("ru-RU")} <i>₽</i></strong><span className="up">Оборот − закупка · {incomingOrders.length} входящих</span></article><article><p>ОБОРОТ</p><strong>{finances.revenue.toLocaleString("ru-RU")} <i>₽</i></strong><span>Полная стоимость заказов по каталогу</span></article><article className="ops-alert"><p>ЗАКУПКА</p><strong>{activePurchase.toLocaleString("ru-RU")} <i>₽</i></strong><button onClick={() => setTab("orders")}>по всем заказам →</button></article></div><section className="ops-daily-ledger"><header><div><p>ДНЕВНОЙ ЖУРНАЛ</p><h2>{selectedDay === todayKey ? "Сегодня" : formatDay(selectedDay)}</h2><span>{selectedDay === todayKey ? "Срез обновляется по входящим заказам" : "Сохранённый срез дня"}</span></div><div className="ops-daily-controls"><button onClick={() => setSelectedDay((day) => moveDay(day, -1))} aria-label="Предыдущий день">←</button><button onClick={() => setSelectedDay(todayKey)} disabled={selectedDay === todayKey}>Сегодня</button><button onClick={() => setSelectedDay((day) => moveDay(day, 1))} disabled={selectedDay >= todayKey} aria-label="Следующий день">→</button></div></header>{selectedStat ? <div className="ops-daily-metrics"><article><span>ВЫРУЧКА</span><b>{selectedStat.revenue.toLocaleString("ru-RU")} ₽</b></article><article><span>ОБОРОТ</span><b>{selectedStat.turnover.toLocaleString("ru-RU")} ₽</b></article><article><span>ЗАКУПКА</span><b>{selectedStat.purchase.toLocaleString("ru-RU")} ₽</b></article><article><span>ЗАКАЗЫ</span><b>{selectedStat.orderCount}</b></article></div> : <div className="ops-daily-empty">За {formatDay(selectedDay)} пока нет сохранённого среза.</div>}<footer><span>История хранится в этом браузере.</span><div>{dailyStats.slice(-5).reverse().map((item) => <button key={item.date} onClick={() => setSelectedDay(item.date)} className={selectedDay === item.date ? "is-active" : ""}>{item.date.slice(8, 10)}.{item.date.slice(5, 7)}</button>)}</div></footer></section>
        <section className="ops-action-tray" aria-label="Приоритетные действия"><div><span>СЛЕДУЮЩЕЕ ДЕЙСТВИЕ</span><strong>{newRequestCount ? `Новых заявок: ${newRequestCount}` : "Новых заявок нет"}</strong><p>{newRequestCount ? "Откройте заказ и начните диалог в Telegram." : "Следующая заявка появится здесь сразу после добавления."}</p></div><button onClick={() => setTab("orders")}>К заказам <b>→</b></button><div className="ops-action-divider" /><div><span>ВХОДЯЩИЕ ЗАКАЗЫ</span><strong>{incomingOrders.length} в расчёте</strong><p>Выручка пересчитывается по их составу.</p></div><button onClick={() => setTab("orders")}>Открыть <b>→</b></button></section>
        <div className="ops-pulse-grid"><section className="ops-card ops-inbox"><div className="ops-card-head"><div><p>ВХОДЯЩИЕ</p><h2>Заказы из Telegram</h2></div><span>{String(incomingOrders.length).padStart(2, "0")}</span></div>{incomingOrders.map((order) => <button key={order.id} className="ops-order" onClick={() => setTab("orders")}><b>{order.id}</b><span><strong>{order.customer}</strong><i>{order.item}</i></span><em>{orderTotal(order).toLocaleString("ru-RU")} ₽</em><u>{order.state}</u></button>)}{incomingOrders.length === 0 && <div className="ops-orders-empty"><b>Заказов пока нет.</b><span>Добавленные вручную Telegram-заказы появятся здесь сразу.</span></div>}</section>
</div>
        <section className="ops-card ops-signal"><div><p>ОБРАБОТКА ЗА НЕДЕЛЮ</p><h2>НЕДЕЛЯ<br />В <em>РИТМЕ.</em></h2><span>{recordedWeekDays ? `Собрано ${recordedWeekDays} из 7 дневных срезов. Столбцы показывают выручку после закупки.` : "История начнёт собираться с сегодняшнего дня."}</span></div><div className="ops-wave ops-live-wave" aria-label="Выручка за последние семь дней">{weeklyStats.map((day) => <i key={day.date} title={`${formatDay(day.date)}: ${day.value.toLocaleString("ru-RU")} ₽`} style={{ height: `${day.value ? Math.max(8, Math.round(day.value / weeklyMax * 100)) : 3}%` }}><small>{day.date.slice(8, 10)}</small></i>)}</div></section>
      </section>}
      {tab === "catalog" && <section className="ops-page"><div className="ops-title-row"><div><h1>Каталог<br /><em>на ладони.</em></h1><p>Правьте ассортимент, объёмы и цены без лишних экранов.</p></div><span className="ops-total">{normalizedItems.length}<small>ароматов</small></span></div>
        <section className="ops-card ops-inventory"><div className="ops-inventory-tools"><label><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти аромат" /></label><div>{(["Все", "На витрине", "Черновик", "Скрыт"] as const).map((entry) => <button key={entry} onClick={() => setFilter(entry)} className={filter === entry ? "is-selected" : ""}>{entry}</button>)}<button className="ops-csv-trigger" onClick={() => setCsvImportOpen(true)}>↑ CSV</button></div></div><div className="ops-products">{shown.map((item) => <article key={item.id}><img src={item.image} alt={`${item.brand} ${item.name}`} /><div className="ops-product-name"><code>{item.sku}</code><strong>{item.name}</strong><span>{item.brand} · {item.volume[0]} мл</span>{item.notes.top.length || item.notes.heart.length || item.notes.base.length ? <small className="ops-notes-ready">Ноты заполнены</small> : <small className="ops-notes-pending">Пирамида на уточнении</small>}</div><b className="ops-price">от {Math.min(...item.variants.map((variant) => variant.price)).toLocaleString("ru-RU")} ₽</b><button className={`ops-status ${statusClass(item.status)}`} onClick={() => patchItem(item.id, { status: nextProductStatus(item.status) })}>{item.status}</button><button className={`ops-weekly-hit ${item.weeklyHit ? "is-active" : ""}`} onClick={() => toggleWeeklyHit(item.id)}>{item.weeklyHit ? "★ Хит недели" : "☆ В Hit Parade"}</button><button className="ops-edit" onClick={() => setEditor(item)}>Править ↗</button></article>)}</div></section><section className="ops-moods-editor"><header><div><p>ГЛАВНАЯ / ВКЛЮЧИ СОСТОЯНИЕ</p><h2>Редактор<br /><em>настроений.</em></h2></div><span>До 3 сигналов</span></header><p className="ops-moods-editor-copy">Меняйте слова, настроение и аромат — блок на главной обновится сразу.</p><div>{moods.map((mood, index) => <article key={mood.id} className={`tone-${mood.color}`}><b>0{index + 1}</b><label>Название<input value={mood.label} onChange={(event) => setMoods((current) => current.map((entry) => entry.id === mood.id ? { ...entry, label: event.target.value } : entry))} /></label><label>Подпись<input value={mood.caption} onChange={(event) => setMoods((current) => current.map((entry) => entry.id === mood.id ? { ...entry, caption: event.target.value } : entry))} /></label><label>Аромат<div className="ops-editor-scent-search"><span>⌕</span><input value={activeMoodSearch === mood.id ? moodQueries[mood.id] ?? "" : (() => { const item = storefrontItems.find((entry) => entry.id === mood.productId); return item ? `${item.brand} · ${item.name}` : ""; })()} placeholder="Найти аромат" onFocus={() => { setActiveMoodSearch(mood.id); setMoodQueries((current) => ({ ...current, [mood.id]: "" })); }} onChange={(event) => { setActiveMoodSearch(mood.id); setMoodQueries((current) => ({ ...current, [mood.id]: event.target.value })); }} />{activeMoodSearch === mood.id && <div className="ops-editor-scent-results">{storefrontItems.filter((item) => `${item.brand} ${item.name}`.toLowerCase().includes((moodQueries[mood.id] ?? "").toLowerCase())).slice(0, 6).map((item) => <button type="button" key={item.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { setMoods((current) => current.map((entry) => entry.id === mood.id ? { ...entry, productId: item.id } : entry)); setActiveMoodSearch(null); }}><img src={item.image} alt="" /><span><i>{item.brand}</i><b>{item.name}</b></span></button>)}</div>}</div></label></article>)}</div></section><section className="ops-featured-trio-editor"><header><div><p>ГЛАВНАЯ / EDIT 03</p><h2>Три флакона,<br /><em>которые нельзя пропустить.</em></h2></div><span>Ровно 3 позиции</span></header><p>Выберите ароматы для отдельной редакционной подборки на главной. На витрине появятся только опубликованные позиции.</p><div>{[0, 1, 2].map((index) => <label key={index}>0{index + 1}<select value={featuredTrioIds[index] ?? ""} onChange={(event) => setFeaturedTrioIds((current) => { const next = [...current]; next[index] = event.target.value; return next.filter(Boolean).slice(0, 3); })}><option value="">Выберите аромат</option>{storefrontItems.filter((item) => !featuredTrioIds.includes(item.id) || item.id === featuredTrioIds[index]).map((item) => <option key={item.id} value={item.id}>{item.brand} · {item.name}</option>)}</select></label>)}</div><small>{featuredTrioIds.length === 3 ? "Подборка опубликована на главной." : "Выберите ещё несколько ароматов — на главной пока действует автоматическая подборка."}</small></section><section className="ops-catalog-hero-editor"><header><div><p>КАТАЛОГ / ВЫБЕРИ СВОЙ АРОМАТ</p><h2>Флаконы<br /><em>на баннере.</em></h2></div><span>Ровно 2 позиции</span></header><p>Эти ароматы показываются в правой части баннера каталога. Выбирайте только опубликованные позиции.</p><div>{[0, 1].map((index) => <label key={index}>0{index + 1}<select value={catalogHeroPickIds[index] ?? ""} onChange={(event) => setCatalogHeroPickIds((current) => { const next = [...current]; next[index] = event.target.value; return next.filter(Boolean).slice(0, 2); })}><option value="">Выберите аромат</option>{storefrontItems.filter((item) => !catalogHeroPickIds.includes(item.id) || item.id === catalogHeroPickIds[index]).map((item) => <option key={item.id} value={item.id}>{item.brand} · {item.name}</option>)}</select></label>)}</div><small>{catalogHeroPickIds.length === 2 ? "Баннер каталога обновлён." : "Выберите два аромата — до этого используется автоматический выбор."}</small></section><section className="ops-daily-drop-editor"><div><p>ГЛАВНАЯ / DAILY DROP</p><h2>Аромат<br /><em>сегодня.</em></h2><span>Выберите флакон вручную или оставьте ежедневную автоматическую ротацию.</span></div><label>АРОМАТ В ЭФИРЕ<div className="ops-editor-scent-search"><span>⌕</span><input value={dailyDropSearchOpen ? dailyDropQuery : (() => { const item = storefrontItems.find((entry) => entry.id === dailyDropProductId); return item ? `${item.brand} · ${item.name}` : ""; })()} placeholder="Автовыбор по дню" onFocus={() => { setDailyDropSearchOpen(true); setDailyDropQuery(""); }} onChange={(event) => { setDailyDropSearchOpen(true); setDailyDropQuery(event.target.value); }} />{dailyDropSearchOpen && <div className="ops-editor-scent-results">{dailyDropMatches.map((item) => <button type="button" key={item.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { setDailyDropProductId(item.id); setDailyDropSearchOpen(false); }}><img src={item.image} alt="" /><span><i>{item.brand}</i><b>{item.name}</b></span></button>)}{!dailyDropQuery && <button type="button" className="ops-auto-choice" onMouseDown={(event) => event.preventDefault()} onClick={() => { setDailyDropProductId(""); setDailyDropSearchOpen(false); }}>↻ Автовыбор по дню</button>}</div>}</div><small>{dailyDropProductId ? "Выбранный аромат показывается на главной до следующей смены." : "Главная выбирает один из опубликованных ароматов каждый день."}</small></label></section>
      </section>}
      {tab === "pricing" && <section className="ops-page"><div className="ops-title-row"><div><h1>Цена<br /><em>без угадайки.</em></h1><p>Сверьте закупку с рынком и получите понятную цену для витрины.</p></div><span className="ops-total">43<small>% целевая маржа</small></span></div>
        <div className="price-source-note"><b>РУЧНОЙ РЕЖИМ</b><span>Введите актуальные цены конкурентов. Live-мониторинг подключается отдельно через разрешённый источник данных.</span></div>
        <section className="ops-price-workbench"><div className="ops-price-inputs"><div className="ops-price-product"><p>АРОМАТ ДЛЯ АНАЛИЗА</p><div className="ops-price-search"><span>⌕</span><input value={pricingQuery} onFocus={() => setPricingSearchOpen(true)} onChange={(event) => { setPricingQuery(event.target.value); setPricingSearchOpen(true); }} placeholder="Бренд или название" aria-label="Найти аромат для анализа" />{pricingQuery && <button type="button" onClick={() => { setPricingQuery(""); setPricingSearchOpen(false); }} aria-label="Очистить поиск">×</button>}{pricingSearchOpen && <div className="ops-price-search-results" role="listbox" aria-label="Подходящие ароматы">{pricingMatches.length ? pricingMatches.map((item) => <button type="button" role="option" key={item.id} onClick={() => { setPricingProductId(item.id); setPricingVariantId(item.variants[0].id); setPurchaseCost(item.variants[0].purchasePrice); setPricingQuery(""); setPricingSearchOpen(false); }}><img src={item.image} alt="" /><span className="ops-price-search-copy"><i>{item.brand}</i><b>{item.name}</b><small>{item.variants.slice(0, 3).map((variant) => <em key={variant.id}>{variant.volume} мл</em>)}</small></span><strong>от {Math.min(...item.variants.map((variant) => variant.price)).toLocaleString("ru-RU")} ₽</strong></button>) : <p>Ничего не нашли</p>}</div>}</div><div><img src={pricingProduct.image} alt="" /><span><b>{pricingProduct.name}</b><i>{pricingProduct.brand} · {pricingProduct.volume[0]} мл</i></span></div></div><div className="ops-price-volumes"><p>ОБЪЁМ ДЛЯ СРАВНЕНИЯ</p><div>{pricingProduct.variants.map((variant) => <button type="button" key={variant.id} onClick={() => { setPricingVariantId(variant.id); setPurchaseCost(variant.purchasePrice); }} className={pricingVariant.id === variant.id ? "is-active" : ""}>{variant.volume} мл</button>)}</div></div><label className="ops-cost-input">НАША ЗАКУПОЧНАЯ ЦЕНА<input value={purchaseCost || ""} inputMode="numeric" onChange={(event) => setPurchaseCost(Number(event.target.value) || 0)} placeholder="0" /><b>₽</b></label><div className="ops-retailer-grid">{retailers.map((retailer) => <label key={retailer}><span>{retailer}</span><div><input value={competitorPrices[retailer] || ""} inputMode="numeric" onChange={(event) => setCompetitorPrices({ ...competitorPrices, [retailer]: Number(event.target.value) || 0 })} placeholder="—" /><b>₽</b></div></label>)}</div><div className="ops-operating-costs"><p>РАСХОДЫ НА ПРОДАЖУ</p><div><label>Упаковка, ₽<input value={packingCost || ""} inputMode="numeric" onChange={(event) => setPackingCost(Number(event.target.value) || 0)} /></label><label>Доставка, ₽<input value={deliveryCost || ""} inputMode="numeric" onChange={(event) => setDeliveryCost(Number(event.target.value) || 0)} /></label></div><small>Расходы учитываются в чистой прибыли, но не меняют рыночную рекомендацию автоматически.</small></div></div>
          <aside className="ops-price-result"><p>РЕШЕНИЕ MAKIBO</p>{marketPrices.length && purchaseCost > 0 ? <><div className={`ops-price-verdict ${marketConflict ? "is-risk" : ""}`}><span>{marketConflict ? "МАРЖА ПОД РИСКОМ" : "РЕКОМЕНДУЕМ"}</span><strong>{suggestedPrice.toLocaleString("ru-RU")} <i>₽</i></strong><small>{marketConflict ? "Закупка выше безопасной границы рынка" : "Цена ниже медианы рынка, маржа сохранена"}</small></div><div className="ops-price-metrics"><span><i>Рынок от</i><b>{marketLow.toLocaleString("ru-RU")} ₽</b></span><span><i>Медиана</i><b>{marketMedian.toLocaleString("ru-RU")} ₽</b></span><span><i>Валовая маржа</i><b className={grossMargin >= 43 ? "is-good" : "is-risk"}>{grossMargin}%</b></span><span><i>Чистая прибыль</i><b className={netProfit > 0 ? "is-good" : "is-risk"}>{netProfit.toLocaleString("ru-RU")} ₽</b></span><span><i>Чистая маржа</i><b className={netMargin >= 25 ? "is-good" : "is-risk"}>{netMargin}%</b></span></div><div className="ops-price-rule"><b>КАК СЧИТАЕМ</b><p>Берём цену на 6% ниже медианы рынка, но не опускаемся ниже валовой маржи 43% от закупки.</p></div><button onClick={applySuggestedPrice}>Применить цену в каталог →</button></> : <div className="ops-price-empty"><b>01</b><strong>Нужны данные.</strong><span>Введите закупочную цену и хотя бы одну цену конкурента — расчёт появится здесь.</span></div>}</aside></section>
      </section>}
      {tab === "orders" && <section className="ops-page ops-orders-page"><div className="ops-title-row"><div><h1>Заказы<br /><em>в движении.</em></h1><p>Все действия по заказу — от сообщения в Telegram до передачи в доставку.</p></div><span className="ops-total">{orders.length}<small>в работе</small></span></div><section className="ops-order-pulse"><article><p>ВХОДЯЩИЕ</p><strong>{incomingOrders.length}</strong><span>ждут следующего шага</span></article><article><p>ПОДТВЕРЖДЕНИЕ</p><strong>{orders.filter((order) => order.state === "Ждём подтверждение").length}</strong><span>ждём ответ в Telegram</span></article><article><p>ВЫРУЧКА</p><strong>{finances.gross.toLocaleString("ru-RU")} <i>₽</i></strong><span>после закупки · {financialOrders.length} заказов</span></article></section><div className="ops-order-toolbar"><div>{(["Все", "Новый запрос", "Ждём подтверждение", "Собираем заказ", "Готов к отправке", "Завершён", "Отменён"] as const).map((status) => <button key={status} onClick={() => setOrderFilter(status)} className={orderFilter === status ? "is-active" : ""}>{status}{status !== "Все" && <i>{orders.filter((order) => order.state === status).length}</i>}</button>)}</div><div className="ops-order-toolbar-actions"><span>{visibleOrders.length} из {orders.length} заказов</span><button onClick={() => setOrderComposerOpen(true)}>+ Telegram-заказ</button></div></div><div className="ops-order-status-guide"><span><b>01</b><i>Новый запрос</i> — заказ пришёл, нужно начать диалог.</span><span><b>02</b><i>Ждём подтверждение</i> — уточняем детали в Telegram.</span><span><b>03</b><i>Собираем заказ</i> — флакон готовится к отправке.</span><span><b>04</b><i>Готов к отправке</i> — можно передавать в доставку.</span><span><b>05</b><i>Завершён</i> — заказ передан и закрыт.</span></div><section className="ops-order-board">{visibleOrders.map((order) => { const detail = orderDetail(order); return <article key={order.id} className="ops-order-detail"><header><div><span>{order.id}</span><i>СЕГОДНЯ · TELEGRAM</i></div><label className={`ops-order-state ${orderStatusTone[order.state]}`}><span>СТАТУС</span><select value={order.state} onChange={(event) => setOrderStatus(order.id, event.target.value as OrderStatus)}>{(["Новый запрос", "Ждём подтверждение", "Собираем заказ", "Готов к отправке", "Завершён", "Отменён"] as OrderStatus[]).map((status) => <option key={status} value={status}>{status}</option>)}</select></label></header><div className="ops-order-detail-main"><div className="ops-order-object">{detail.product && <img src={detail.product.image} loading="lazy" decoding="async" alt="" />}<span>{detail.product?.sku ?? "MK—"}</span></div><div className="ops-order-scent"><p>{detail.product?.brand ?? order.item}</p><strong>{detail.product?.name ?? "Аромат"}</strong><span>{detail.variant?.volume ?? "—"} мл · {order.quantity} шт. · {detail.product?.family ?? "—"}</span><button onClick={() => detail.product && setEditor(detail.product)}>Открыть карточку аромата ↗</button></div><div className="ops-order-finance"><span><i>Цена витрины</i><b>{detail.total.toLocaleString("ru-RU")} ₽</b></span><span><i>Закупка</i><b>{detail.purchase.toLocaleString("ru-RU")} ₽</b></span><span className="is-income"><i>Выручка</i><b>{detail.income.toLocaleString("ru-RU")} ₽</b></span></div></div><footer><div><span>КАНАЛ</span><b>@makibo_manager</b></div><label className="ops-order-delivery"><span>ПОЛУЧЕНИЕ</span><select value={order.delivery} onChange={(event) => setOrderDelivery(order.id, event.target.value as DeliveryMethod)}>{(["Не выбрано", "Курьер", "Самовывоз", "СДЭК"] as DeliveryMethod[]).map((method) => <option key={method} value={method}>{method === "Не выбрано" ? "Уточняется в Telegram" : method}</option>)}</select><small>Адрес и пункт выдачи остаются в Telegram.</small></label><button onClick={() => advanceOrder(order.id)}>Следующий статус <i>→</i></button></footer></article>; })}{visibleOrders.length === 0 && <div className="ops-orders-empty"><b>В этой колонке пока тихо.</b><span>Выберите другой статус, чтобы увидеть заказы.</span></div>}</section></section>}
    </main>
    {orderComposerOpen && <div className="ops-editor-backdrop ops-order-composer-backdrop" onMouseDown={() => setOrderComposerOpen(false)}><form className="ops-order-composer" onSubmit={(event) => { event.preventDefault(); addTelegramOrder(); }} onMouseDown={(event) => event.stopPropagation()}><button type="button" className="ops-editor-close" onClick={() => setOrderComposerOpen(false)}>×</button><p>НОВЫЙ ЗАКАЗ / TELEGRAM</p><h2>Добавить<br /><em>вручную.</em></h2><span className="ops-order-composer-note">Данные клиента остаются в Telegram. Здесь — только состав и операционный статус.</span><label>Аромат<div className="ops-order-product-search"><span>⌕</span><input value={manualProductQuery} placeholder={`${manualProduct.brand} · ${manualProduct.name}`} onFocus={() => setManualProductSearchOpen(true)} onChange={(event) => { setManualProductQuery(event.target.value); setManualProductSearchOpen(true); }} />{manualProductQuery && <button type="button" onClick={() => { setManualProductQuery(""); setManualProductSearchOpen(false); }} aria-label="Очистить поиск">×</button>}{manualProductSearchOpen && <div className="ops-order-product-results">{manualProductMatches.length ? manualProductMatches.map((product) => <button type="button" key={product.id} onMouseDown={(event) => event.preventDefault()} onClick={() => { setManualProductId(product.id); setManualVariantId(product.variants[0].id); setManualProductQuery(""); setManualProductSearchOpen(false); }}><img src={product.image} loading="lazy" decoding="async" alt="" /><span><i>{product.brand}</i><b>{product.name}</b><small>{product.variants.map((variant) => `${variant.volume} мл`).join(" · ")}</small></span></button>) : <p>Аромат не найден</p>}</div>}</div></label><div className="ops-order-composer-grid"><label>Объём<select value={manualVariant.id} onChange={(event) => setManualVariantId(event.target.value)}>{manualProduct.variants.map((variant) => <option key={variant.id} value={variant.id}>{variant.volume} мл · {variant.price.toLocaleString("ru-RU")} ₽</option>)}</select></label><label>Количество<input value={manualQuantity} inputMode="numeric" pattern="[0-9]*" onChange={(event) => setManualQuantity(event.target.value.replace(/[^0-9]/g, ""))} onBlur={() => { if (!manualQuantity || Number(manualQuantity) < 1) setManualQuantity("1"); }} /></label></div><div className="ops-order-composer-grid"><label>Получение<select value={manualDelivery} onChange={(event) => setManualDelivery(event.target.value as DeliveryMethod)}>{(["Не выбрано", "Курьер", "Самовывоз", "СДЭК"] as DeliveryMethod[]).map((method) => <option key={method} value={method}>{method}</option>)}</select></label><label>Статус<select value={manualStatus} onChange={(event) => setManualStatus(event.target.value as OrderStatus)}>{(["Новый запрос", "Ждём подтверждение", "Собираем заказ", "Готов к отправке", "Завершён", "Отменён"] as OrderStatus[]).map((status) => <option key={status} value={status}>{status}</option>)}</select></label></div><div className="ops-order-composer-total"><span>ПО ЦЕНЕ ВИТРИНЫ</span><b>{(manualVariant.price * Math.max(1, Number(manualQuantity) || 1)).toLocaleString("ru-RU")} ₽</b><small>Закупка: {(manualVariant.purchasePrice * Math.max(1, Number(manualQuantity) || 1)).toLocaleString("ru-RU")} ₽</small></div><button className="ops-editor-save">Добавить заказ →</button></form></div>}
    {csvImportOpen && <div className="ops-editor-backdrop" onMouseDown={() => setCsvImportOpen(false)}><section className="ops-csv-modal" onMouseDown={(event) => event.stopPropagation()}><button className="ops-editor-close" onClick={() => setCsvImportOpen(false)} aria-label="Закрыть импорт">×</button><p>CATALOG / CSV IMPORT</p><h2>Прайс в<br /><em>витрину.</em></h2><span className="ops-csv-intro">Загрузите прайс или список ароматов. Совпадения по <b>SKU</b>, <b>ID</b> или паре «бренд + название» обновят цену и объём; новые позиции будут добавлены.</span><button type="button" className="ops-csv-template" onClick={downloadCsvTemplate}>↓ Скачать шаблон CSV <span>с примерами</span></button><label className="ops-csv-drop"><input type="file" accept=".csv,text/csv" onChange={(event) => readCsv(event.target.files?.[0])} /><b>{csvFileName || "Выбрать CSV-файл"}</b><span>CSV · UTF-8 · до 500 строк</span></label>{csvError && <div className="ops-csv-error">{csvError}</div>}{csvResult && <div className="ops-csv-result">✓ {csvResult}</div>}<div className="ops-csv-schema"><b>Минимум для нового аромата</b><code>brand; name; volume; price</code><span>Для прайса достаточно <code>sku; volume; price; purchasePrice</code></span></div>{csvRows.length > 0 && <><div className="ops-csv-preview-head"><span>{csvRows.length} строк к импорту</span><small>{csvFileName}</small></div><div className="ops-csv-preview">{csvRows.slice(0, 4).map((row, index) => <div key={`${csvValue(row, "sku", "артикул", "name", "название")}-${index}`}><b>{csvValue(row, "brand", "бренд") || "—"} {csvValue(row, "name", "название", "аромат") || csvValue(row, "sku", "артикул") || "Без названия"}</b><span>{csvValue(row, "volume", "объем", "объём") || "—"} мл · {csvValue(row, "price", "цена") || "—"} ₽ · закупка {csvValue(row, "purchaseprice", "закупочнаяцена", "закупка") || "—"} ₽</span></div>)}</div><button className="ops-editor-save" onClick={importCsv}>Импортировать {csvRows.length} строк →</button></>}</section></div>}
    {safeEditor && <div className="ops-editor-backdrop" onMouseDown={() => setEditor(null)}><form className="ops-editor" onSubmit={(event) => { event.preventDefault(); const variants = safeEditor.variants.filter((variant) => variant.volume > 0); const next = { ...safeEditor, variants, volume: variants.map((variant) => variant.volume), price: Math.min(...variants.map((variant) => variant.price)), stock: variants.reduce((sum, variant) => sum + variant.stock, 0) }; patchItem(safeEditor.id, next); setEditor(null); notify("Карточка сохранена"); }} onMouseDown={(event) => event.stopPropagation()}><button type="button" onClick={() => setEditor(null)} className="ops-editor-close">×</button><p>РЕДАКТОР КАРТОЧКИ / {safeEditor.status.toUpperCase()} <span className="ops-editor-sku">ID {safeEditor.sku}</span></p><div className="ops-editor-product"><label className="ops-photo-picker"><img src={safeEditor.image} alt="" /><span>Заменить<br />фото</span><input type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) { const reader = new FileReader(); reader.onload = () => setEditor((current) => current ? { ...current, image: String(reader.result) } : current); reader.readAsDataURL(file); } }} /></label><div><h2>{safeEditor.name}</h2><span>{safeEditor.brand}</span></div></div><div className="ops-editor-fields"><label>Название<input value={safeEditor.name} onChange={(event) => setEditor({ ...safeEditor, name: event.target.value })} /></label><label>Бренд<input value={safeEditor.brand} onChange={(event) => setEditor({ ...safeEditor, brand: event.target.value })} /></label><label>Ольфакторная группа<select value={safeEditor.family} onChange={(event) => setEditor({ ...safeEditor, family: event.target.value as Product["family"] })}>{FAMILIES.map((family) => <option key={family} value={family}>{family}</option>)}</select></label><label>Год выпуска<input value={safeEditor.year ?? ""} inputMode="numeric" placeholder="Например, 2024" onChange={(event) => setEditor({ ...safeEditor, year: Number(event.target.value) || undefined })} /></label></div><label className="ops-editor-description">Описание<textarea value={safeEditor.description} rows={3} placeholder="Расскажите об аромате" onChange={(event) => setEditor({ ...safeEditor, description: event.target.value })} /></label><section className="ops-editor-notes"><div><p>КАРТА НОТ</p><span>{safeEditor.notes.top.length || safeEditor.notes.heart.length || safeEditor.notes.base.length ? "Перечисляйте через запятую." : "Карта находится на уточнении — не заполняем предположениями."}</span></div><div className="ops-editor-notes-grid"><label>Верхние ноты<input value={safeEditor.notes.top.join(", ")} placeholder="Бергамот, лимон" onChange={(event) => setEditor({ ...safeEditor, notes: { ...safeEditor.notes, top: event.target.value.split(",").map((note) => note.trim()).filter(Boolean) } })} /></label><label>Ноты сердца<input value={safeEditor.notes.heart.join(", ")} placeholder="Жасмин, ирис" onChange={(event) => setEditor({ ...safeEditor, notes: { ...safeEditor.notes, heart: event.target.value.split(",").map((note) => note.trim()).filter(Boolean) } })} /></label><label>Базовые ноты<input value={safeEditor.notes.base.join(", ")} placeholder="Мускус, кедр" onChange={(event) => setEditor({ ...safeEditor, notes: { ...safeEditor.notes, base: event.target.value.split(",").map((note) => note.trim()).filter(Boolean) } })} /></label></div></section><section className="ops-variants"><div className="ops-variants-head"><div><p>ОБЪЁМЫ И ЦЕНЫ</p><span>Для каждого объёма — своя цена и закупка.</span></div><button type="button" onClick={() => setEditor({ ...safeEditor, variants: [...safeEditor.variants, { id: `${safeEditor.id}-${Date.now()}`, volume: 50, price: 0, purchasePrice: 0, stock: 0 }] })}>+ Объём</button></div>{safeEditor.variants.map((variant, index) => <div className="ops-variant-row" key={variant.id}><label>мл<input value={variant.volume} inputMode="numeric" onChange={(event) => setEditor({ ...safeEditor, variants: safeEditor.variants.map((entry) => entry.id === variant.id ? { ...entry, volume: Number(event.target.value) || 0 } : entry) })} /></label><label>Цена, ₽<input value={variant.price} inputMode="numeric" onChange={(event) => setEditor({ ...safeEditor, variants: safeEditor.variants.map((entry) => entry.id === variant.id ? { ...entry, price: Number(event.target.value) || 0 } : entry) })} /></label><label>Закупка, ₽<input value={variant.purchasePrice || ""} inputMode="numeric" placeholder="0" onChange={(event) => setEditor({ ...safeEditor, variants: safeEditor.variants.map((entry) => entry.id === variant.id ? { ...entry, purchasePrice: Number(event.target.value) || 0 } : entry) })} /></label><button type="button" aria-label={`Удалить объём ${variant.volume} мл`} disabled={safeEditor.variants.length === 1} onClick={() => setEditor({ ...safeEditor, variants: safeEditor.variants.filter((entry) => entry.id !== variant.id) })}>×</button></div>)}</section><button className="ops-editor-save">Сохранить {safeEditor.variants.length} объём{safeEditor.variants.length === 1 ? "" : safeEditor.variants.length < 5 ? "а" : "ов"} →</button></form></div>}
    {toast && <div className="ops-toast">✓ {toast}</div>}
  </div>;
}
