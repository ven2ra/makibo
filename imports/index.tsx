import svgPaths from "./svg-l68bfswduw";
import imgFeaturedImage from "./62c2c87afb03550d7c6c07cfb79a7b3a02b9ea89.png";
import imgCategoryThumb from "./0c60715caa48bfb5f83c7764dd49d936e21de348.png";
import imgCategoryThumb1 from "./08b1a6504f064739eabbd5491f810cdfcc38d090.png";
import imgCategoryThumb2 from "./8b15ce90c475d0580ec9b6e84224c4807e2a4f8a.png";
import imgCategoryThumb3 from "./45f8101ec0101bd17749fc9d49d43922e6a3100f.png";
import imgCategoryThumb4 from "./6d39ff4bf1f2f1eaa670eb3c6c1b0fa9dbe21a77.png";
import imgCategoryThumb5 from "./bc68b79e9985e6ba5fc76fb33d75d425aea65673.png";
import imgProductPhoto from "./835e2a60464be893c67d6b42f91e63aafb2bae23.png";
import imgProductPhoto1 from "./93de48e84df5512ef22a3ab4c51ae08b9987c988.png";
import imgProductPhoto2 from "./175ff6cf22a4940a5bc095280cc176a80ddfb833.png";
import imgProductPhoto3 from "./d37211dd1beb73fe41904d38f759e9d48ca986c6.png";
import imgProductPhoto4 from "./4e0ef6ad829fdf3a85f05d143816242835671842.png";
import imgProductPhoto5 from "./7006ef0323c21dc67d2e73a044cf9a94eb106fbe.png";
import imgProductPhoto6 from "./31c084ee80e81e1a7a2deeecc4a1c170690e0399.png";
import imgProductPhoto7 from "./803a24b53740f80a67b5e9b53cf6c5c7358b2150.png";
import imgIllust from "./fa217a1a5297e0ad09d384ab08a4be323caa6aad.png";
import imgProductPhoto8 from "./091f8ed504788bacf84447706e499f43485dce25.png";
import imgProductPhoto9 from "./b7a914149984c9cae37f13ec01bd209f53472121.png";
import imgProductPhoto10 from "./8ee4557ae828e09c10cdd123fcc9f62f20774e4f.png";
import imgProductPhoto11 from "./adeaa3e4dc82930860558afd2d34159d5615684c.png";
import imgProductPhoto12 from "./fca9a1aae79c3e380abe3be6e364f5c6304fab13.png";
import imgThumb from "./011b72d05229a7d42953bd2c12f734e5b2c0e8c9.png";
import imgThumb1 from "./5019082ccc315325eea769ee9006c88baa17cf43.png";

function BrandLogo() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Brand-Logo">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[32px] tracking-[2px] whitespace-nowrap">MAKIBO</p>
    </div>
  );
}

function NavLinks() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Geist:Medium',sans-serif] font-medium gap-[32px] items-center leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap" data-name="Nav-Links">
      <p className="relative shrink-0">Каталог</p>
      <p className="relative shrink-0">Бренды</p>
      <p className="relative shrink-0">Новинки</p>
      <p className="relative shrink-0">Акции</p>
      <p className="relative shrink-0">Доставка</p>
    </div>
  );
}

function Search() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="search">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="search">
          <path d={svgPaths.p3f6e0f00} id="Vector" stroke="#78716C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex gap-[8px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0 w-[260px]" data-name="Search-Bar">
      <Search />
      <p className="[word-break:break-word] flex-[1_0_0] font-['Geist:Regular',sans-serif] font-normal leading-[normal] min-w-px relative text-[#78716c] text-[14px]">Поиск ароматов...</p>
    </div>
  );
}

function User() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="user">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="user">
          <path d={svgPaths.p61d9400} id="Vector" stroke="#1C1917" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function UserButton() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="User-Button">
      <User />
    </div>
  );
}

function Heart() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="heart">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="heart">
          <path d={svgPaths.pbeee300} id="Vector" stroke="#1C1917" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function FavoritesButton() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="Favorites-Button">
      <Heart />
    </div>
  );
}

function ShoppingCart() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g clipPath="url(#clip0_0_13)" id="shopping-cart">
          <path d={svgPaths.p39369500} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_13">
            <rect fill="white" height="18" width="18" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function CartIconPlate() {
  return (
    <div className="bg-[#1c1917] content-stretch flex flex-col items-center justify-center relative rounded-[20px] shrink-0 size-[40px]" data-name="Cart-Icon-Plate">
      <ShoppingCart />
    </div>
  );
}

function Badge() {
  return (
    <div className="bg-[#d4af37] content-stretch flex flex-col items-start px-[8px] py-[2px] relative rounded-[12px] shrink-0" data-name="Badge">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[12px] whitespace-nowrap">2</p>
    </div>
  );
}

function CartWrapper() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Cart-Wrapper">
      <CartIconPlate />
      <Badge />
    </div>
  );
}

function ActionsGroup() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Actions-Group">
      <SearchBar />
      <UserButton />
      <FavoritesButton />
      <CartWrapper />
    </div>
  );
}

function HeaderSection() {
  return (
    <div className="bg-white content-stretch flex items-center justify-between px-[80px] py-[20px] relative shrink-0 w-full" data-name="Header-Section">
      <div aria-hidden className="absolute border-[#e7e5e4] border-b border-solid inset-0 pointer-events-none" />
      <BrandLogo />
      <NavLinks />
      <ActionsGroup />
    </div>
  );
}

function TabForHer() {
  return (
    <div className="bg-[#d4af37] content-stretch flex items-center px-[28px] py-[10px] relative rounded-[24px] shrink-0" data-name="Tab-For-Her">
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[14px] whitespace-nowrap">Для неё</p>
    </div>
  );
}

function TabForHim() {
  return (
    <div className="content-stretch flex items-center px-[28px] py-[10px] relative rounded-[24px] shrink-0" data-name="Tab-For-Him">
      <p className="[word-break:break-word] font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#78716c] text-[14px] whitespace-nowrap">Для него</p>
    </div>
  );
}

function TabsTrack() {
  return (
    <div className="bg-white content-stretch flex gap-[6px] items-start p-[4px] relative rounded-[30px] shrink-0" data-name="Tabs-Track">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[30px]" />
      <TabForHer />
      <TabForHim />
    </div>
  );
}

function GenderTabsWrapper() {
  return (
    <div className="content-stretch flex items-start justify-center py-[24px] relative shrink-0 w-full" data-name="Gender-Tabs-Wrapper">
      <TabsTrack />
    </div>
  );
}

function TitleStack() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start relative shrink-0 w-full" data-name="Title-Stack">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#d4af37] text-[14px] tracking-[3px] uppercase w-full">НОВАЯ КОЛЛЕКЦИЯ</p>
      <p className="font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[1.1] relative shrink-0 text-[#1c1917] text-[56px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Осенние ароматы 2026
      </p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#78716c] text-[18px] w-full">Эксклюзивные новинки от мировых брендов, вдохновленные золотым сезоном и уютом.</p>
    </div>
  );
}

function CtaButton() {
  return (
    <div className="bg-[#1c1917] content-stretch flex items-center px-[32px] py-[14px] relative rounded-[30px] shrink-0" data-name="CTA-Button">
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Смотреть коллекцию</p>
    </div>
  );
}

function LeftContent() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] h-full items-start justify-center relative shrink-0 w-[560px]" data-name="Left-Content">
      <TitleStack />
      <CtaButton />
    </div>
  );
}

function RightMedia() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[16px] shrink-0 w-[480px]" data-name="Right-Media">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Featured-Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgFeaturedImage} />
      </div>
    </div>
  );
}

function HeroCard() {
  return (
    <div className="bg-gradient-to-r content-stretch flex flex-[1_0_0] from-[#f5f3ff] h-[440px] items-start justify-between min-w-px overflow-clip p-[48px] relative rounded-[24px] to-[#fffbeb]" data-name="Hero-Card">
      <LeftContent />
      <RightMedia />
    </div>
  );
}

function HeroContainer() {
  return (
    <div className="content-stretch flex items-start pb-[48px] px-[80px] relative shrink-0 w-full" data-name="Hero-Container">
      <HeroCard />
    </div>
  );
}

function SectionHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Section-Header">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#1c1917] text-[40px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Популярные бренды
      </p>
    </div>
  );
}

function BrandDior() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-DIOR">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">DIOR</p>
    </div>
  );
}

function BrandChanel() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-CHANEL">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">CHANEL</p>
    </div>
  );
}

function BrandTomFord() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-TOM FORD">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">TOM FORD</p>
    </div>
  );
}

function BrandYsl() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-YSL">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">YSL</p>
    </div>
  );
}

function BrandGuerlain() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-GUERLAIN">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">GUERLAIN</p>
    </div>
  );
}

function BrandJoMalone() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-JO MALONE">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">JO MALONE</p>
    </div>
  );
}

function BrandVersace() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-VERSACE">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">VERSACE</p>
    </div>
  );
}

function BrandGivenchy() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_50px] flex-col items-center min-w-px px-[24px] py-[16px] relative rounded-[12px]" data-name="Brand-GIVENCHY">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[#1c1917] text-[20px] tracking-[1px] whitespace-nowrap">GIVENCHY</p>
    </div>
  );
}

function BrandsGrid() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Brands-Grid">
      <BrandDior />
      <BrandChanel />
      <BrandTomFord />
      <BrandYsl />
      <BrandGuerlain />
      <BrandJoMalone />
      <BrandVersace />
      <BrandGivenchy />
    </div>
  );
}

function BrandsWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[64px] px-[80px] relative shrink-0 w-full" data-name="Brands-Wrapper">
      <SectionHeader />
      <BrandsGrid />
    </div>
  );
}

function SectionHeader1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Section-Header">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#1c1917] text-[40px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Семейства ароматов
      </p>
    </div>
  );
}

function Cat() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Цветочные">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Цветочные</p>
    </div>
  );
}

function Cat1() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Древесные">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb1} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Древесные</p>
    </div>
  );
}

function Cat2() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Восточные">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb2} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Восточные</p>
    </div>
  );
}

function Cat3() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Свежие">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb3} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Свежие</p>
    </div>
  );
}

function Cat4() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Цитрусовые">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb4} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Цитрусовые</p>
    </div>
  );
}

function Cat5() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_34px] flex-col gap-[12px] items-center min-w-px p-[16px] relative rounded-[20px]" data-name="Cat-Фужерные">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[20px]" />
      <div className="aspect-square relative rounded-[12px] shrink-0 w-full" data-name="Category-Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[12px] size-full" src={imgCategoryThumb5} />
      </div>
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#1c1917] text-[15px] whitespace-nowrap">Фужерные</p>
    </div>
  );
}

function CategoriesRow() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="Categories-Row">
      <Cat />
      <Cat1 />
      <Cat2 />
      <Cat3 />
      <Cat4 />
      <Cat5 />
    </div>
  );
}

function CategoriesWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[64px] px-[80px] relative shrink-0 w-full" data-name="Categories-Wrapper">
      <SectionHeader1 />
      <CategoriesRow />
    </div>
  );
}

function ArrowRight() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="arrow-right">
          <path d={svgPaths.p2b607f80} id="Vector" stroke="#D4AF37" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function ActionLink() {
  return (
    <div className="content-stretch flex gap-[4px] items-center relative shrink-0" data-name="Action-Link">
      <p className="[word-break:break-word] font-['Geist:Medium',sans-serif] font-medium leading-[normal] relative shrink-0 text-[#d4af37] text-[15px] whitespace-nowrap">Смотреть все</p>
      <ArrowRight />
    </div>
  );
}

function SectionHeader2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Section-Header">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#1c1917] text-[40px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Бестселлеры
      </p>
      <ActionLink />
    </div>
  );
}

function ImagePlatform() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto} />
      </div>
    </div>
  );
}

function ProductInfo() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">CHANEL</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Coco Mademoiselle</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[8px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Stack">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[16px]">14 850 ₽</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['Geist:Regular',sans-serif] font-normal line-through relative shrink-0 text-[#78716c] text-[13px]">18 200 ₽</p>
    </div>
  );
}

function ShoppingCart1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart1 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack />
      <BuyButton />
    </div>
  );
}

function CardCocoMademoiselle() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Coco Mademoiselle">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform />
      <ProductInfo />
      <ActionRow />
    </div>
  );
}

function ImagePlatform1() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto1} />
      </div>
    </div>
  );
}

function ProductInfo1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">DIOR</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">{`J'adore`}</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack1() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">13 400 ₽</p>
    </div>
  );
}

function ShoppingCart2() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton1() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart2 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow1() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack1 />
      <BuyButton1 />
    </div>
  );
}

function CardJadore() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-J'adore">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform1 />
      <ProductInfo1 />
      <ActionRow1 />
    </div>
  );
}

function ImagePlatform2() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto2} />
      </div>
    </div>
  );
}

function ProductInfo2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">TOM FORD</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Black Orchid</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack2() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[8px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Stack">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[16px]">16 900 ₽</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['Geist:Regular',sans-serif] font-normal line-through relative shrink-0 text-[#78716c] text-[13px]">21 000 ₽</p>
    </div>
  );
}

function ShoppingCart3() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton2() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart3 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow2() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack2 />
      <BuyButton2 />
    </div>
  );
}

function CardBlackOrchid() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Black Orchid">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform2 />
      <ProductInfo2 />
      <ActionRow2 />
    </div>
  );
}

function ImagePlatform3() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto3} />
      </div>
    </div>
  );
}

function ProductInfo3() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">YSL</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Libre</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack3() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">12 800 ₽</p>
    </div>
  );
}

function ShoppingCart4() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton3() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart4 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack3 />
      <BuyButton3 />
    </div>
  );
}

function CardLibre() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Libre">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform3 />
      <ProductInfo3 />
      <ActionRow3 />
    </div>
  );
}

function ImagePlatform4() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto4} />
      </div>
    </div>
  );
}

function ProductInfo4() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">JO MALONE</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">{`Wood Sage & Sea Salt`}</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">100 мл</p>
    </div>
  );
}

function PriceStack4() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">15 100 ₽</p>
    </div>
  );
}

function ShoppingCart5() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton4() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart5 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow4() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack4 />
      <BuyButton4 />
    </div>
  );
}

function CardWoodSageSeaSalt() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Wood Sage & Sea Salt">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform4 />
      <ProductInfo4 />
      <ActionRow4 />
    </div>
  );
}

function ImagePlatform5() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto5} />
      </div>
    </div>
  );
}

function ProductInfo5() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">VERSACE</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Bright Crystal</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">90 мл</p>
    </div>
  );
}

function PriceStack5() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[8px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Stack">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[16px]">10 500 ₽</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['Geist:Regular',sans-serif] font-normal line-through relative shrink-0 text-[#78716c] text-[13px]">13 000 ₽</p>
    </div>
  );
}

function ShoppingCart6() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton5() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart6 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow5() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack5 />
      <BuyButton5 />
    </div>
  );
}

function CardBrightCrystal() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Bright Crystal">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform5 />
      <ProductInfo5 />
      <ActionRow5 />
    </div>
  );
}

function ImagePlatform6() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto6} />
      </div>
    </div>
  );
}

function ProductInfo6() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">GUERLAIN</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Mon Guerlain</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack6() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">11 900 ₽</p>
    </div>
  );
}

function ShoppingCart7() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton6() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart7 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow6() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack6 />
      <BuyButton6 />
    </div>
  );
}

function CardMonGuerlain() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-Mon Guerlain">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform6 />
      <ProductInfo6 />
      <ActionRow6 />
    </div>
  );
}

function ImagePlatform7() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[200px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto7} />
      </div>
    </div>
  );
}

function ProductInfo7() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">GIVENCHY</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">{`L'Interdit`}</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack7() {
  return (
    <div className="[word-break:break-word] content-stretch flex gap-[8px] items-baseline leading-[normal] relative shrink-0 whitespace-nowrap" data-name="Price-Stack">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[16px]">12 200 ₽</p>
      <p className="[text-decoration-skip-ink:none] [text-underline-position:from-font] decoration-from-font decoration-solid font-['Geist:Regular',sans-serif] font-normal line-through relative shrink-0 text-[#78716c] text-[13px]">15 500 ₽</p>
    </div>
  );
}

function ShoppingCart8() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton7() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart8 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow7() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack7 />
      <BuyButton7 />
    </div>
  );
}

function CardLInterdit() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[14px] items-start p-[12px] relative rounded-[16px] shrink-0 w-[305px]" data-name="Card-L'Interdit">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform7 />
      <ProductInfo7 />
      <ActionRow7 />
    </div>
  );
}

function BestsellersGrid() {
  return (
    <div className="content-start flex flex-wrap gap-[24px_20px] items-start relative shrink-0 w-[1280px]" data-name="Bestsellers-Grid">
      <CardCocoMademoiselle />
      <CardJadore />
      <CardBlackOrchid />
      <CardLibre />
      <CardWoodSageSeaSalt />
      <CardBrightCrystal />
      <CardMonGuerlain />
      <CardLInterdit />
    </div>
  );
}

function BestsellersWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[64px] px-[80px] relative shrink-0 w-full" data-name="Bestsellers-Wrapper">
      <SectionHeader2 />
      <BestsellersGrid />
    </div>
  );
}

function PromoText() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[12px] items-start leading-[normal] relative shrink-0 w-[500px]" data-name="Promo-Text">
      <p className="font-['Instrument_Serif:Regular','Noto_Sans:Regular','Noto_Sans_Math:Regular','Noto_Sans_Symbols:Regular','Noto_Sans_Symbols2:Regular',sans-serif] relative shrink-0 text-[#1c1917] text-[32px] w-full" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Бесплатная доставка от 5 000 ₽
      </p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[16px] w-full">Оформите заказ на сумму от 5 000 рублей, и мы доставим его бесплатно в любую точку РФ. Самовывоз из бутика в Москве доступен сегодня.</p>
    </div>
  );
}

function PromoVisual() {
  return (
    <div className="content-stretch flex flex-col h-full items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-[300px]" data-name="Promo-Visual">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Illust">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIllust} />
      </div>
    </div>
  );
}

function PromoBanner() {
  return (
    <div className="bg-[#e2e8f0] content-stretch flex flex-[1_0_0] h-[220px] items-center justify-between min-w-px overflow-clip p-[40px] relative rounded-[24px]" data-name="Promo-Banner">
      <PromoText />
      <PromoVisual />
    </div>
  );
}

function PromoContainer() {
  return (
    <div className="content-stretch flex items-start pb-[64px] px-[80px] relative shrink-0 w-full" data-name="Promo-Container">
      <PromoBanner />
    </div>
  );
}

function SectionHeader3() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Section-Header">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#1c1917] text-[40px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Новинки сезона
      </p>
    </div>
  );
}

function ImagePlatform8() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[280px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto8} />
      </div>
    </div>
  );
}

function ProductInfo8() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">BYREDO</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">{`Bal d'Afrique`}</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack8() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">17 300 ₽</p>
    </div>
  );
}

function ShoppingCart9() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton8() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart9 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow8() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack8 />
      <BuyButton8 />
    </div>
  );
}

function CardBalDAfrique() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] flex-col gap-[14px] items-start min-w-px p-[12px] relative rounded-[16px]" data-name="Card-Bal d'Afrique">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform8 />
      <ProductInfo8 />
      <ActionRow8 />
    </div>
  );
}

function ImagePlatform9() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[280px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto9} />
      </div>
    </div>
  );
}

function ProductInfo9() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">CREED</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Aventus for Her</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">75 мл</p>
    </div>
  );
}

function PriceStack9() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">28 500 ₽</p>
    </div>
  );
}

function ShoppingCart10() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton9() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart10 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow9() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack9 />
      <BuyButton9 />
    </div>
  );
}

function CardAventusForHer() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] flex-col gap-[14px] items-start min-w-px p-[12px] relative rounded-[16px]" data-name="Card-Aventus for Her">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform9 />
      <ProductInfo9 />
      <ActionRow9 />
    </div>
  );
}

function ImagePlatform10() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[280px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto10} />
      </div>
    </div>
  );
}

function ProductInfo10() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">MAISON MARGIELA</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Replica By the Fireplace</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">100 мл</p>
    </div>
  );
}

function PriceStack10() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">14 200 ₽</p>
    </div>
  );
}

function ShoppingCart11() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton10() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart11 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow10() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack10 />
      <BuyButton10 />
    </div>
  );
}

function CardReplicaByTheFireplace() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] flex-col gap-[14px] items-start min-w-px p-[12px] relative rounded-[16px]" data-name="Card-Replica By the Fireplace">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform10 />
      <ProductInfo10 />
      <ActionRow10 />
    </div>
  );
}

function ImagePlatform11() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[280px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto11} />
      </div>
    </div>
  );
}

function ProductInfo11() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">LE LABO</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Santal 33</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">50 мл</p>
    </div>
  );
}

function PriceStack11() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">19 800 ₽</p>
    </div>
  );
}

function ShoppingCart12() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton11() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart12 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow11() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack11 />
      <BuyButton11 />
    </div>
  );
}

function CardSantal() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] flex-col gap-[14px] items-start min-w-px p-[12px] relative rounded-[16px]" data-name="Card-Santal 33">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform11 />
      <ProductInfo11 />
      <ActionRow11 />
    </div>
  );
}

function ImagePlatform12() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col h-[280px] items-center justify-center overflow-clip relative rounded-[12px] shrink-0 w-full" data-name="Image-Platform">
      <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Product-Photo">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgProductPhoto12} />
      </div>
    </div>
  );
}

function ProductInfo12() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[4px] items-start leading-[normal] relative shrink-0 w-full" data-name="Product-Info">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[12px] uppercase w-full">DIPTYQUE</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[20px] text-ellipsis w-full whitespace-nowrap">Philosykos</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[13px] w-full">75 мл</p>
    </div>
  );
}

function PriceStack12() {
  return (
    <div className="content-stretch flex items-baseline relative shrink-0" data-name="Price-Stack">
      <p className="[word-break:break-word] font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[#1c1917] text-[16px] whitespace-nowrap">16 500 ₽</p>
    </div>
  );
}

function ShoppingCart13() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="shopping-cart">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g clipPath="url(#clip0_0_15)" id="shopping-cart">
          <path d={svgPaths.pdc85300} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_15">
            <rect fill="white" height="14" width="14" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function BuyButton12() {
  return (
    <div className="bg-[#1c1917] content-stretch flex gap-[4px] items-center px-[16px] py-[8px] relative rounded-[24px] shrink-0" data-name="Buy-Button">
      <ShoppingCart13 />
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[12px] text-white whitespace-nowrap">Купить</p>
    </div>
  );
}

function ActionRow12() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Action-Row">
      <PriceStack12 />
      <BuyButton12 />
    </div>
  );
}

function CardPhilosykos() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_26px] flex-col gap-[14px] items-start min-w-px p-[12px] relative rounded-[16px]" data-name="Card-Philosykos">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[16px]" />
      <ImagePlatform12 />
      <ProductInfo12 />
      <ActionRow12 />
    </div>
  );
}

function NewScrollRow() {
  return (
    <div className="content-stretch flex gap-[20px] items-start relative shrink-0 w-full" data-name="New-Scroll-Row">
      <CardBalDAfrique />
      <CardAventusForHer />
      <CardReplicaByTheFireplace />
      <CardSantal />
      <CardPhilosykos />
    </div>
  );
}

function NewArrivalsWrapper() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start pb-[64px] px-[80px] relative shrink-0 w-full" data-name="New-Arrivals-Wrapper">
      <SectionHeader3 />
      <NewScrollRow />
    </div>
  );
}

function ArrowRight1() {
  return (
    <div className="relative shrink-0 size-[14px]" data-name="arrow-right">
      <svg className="absolute block inset-0 size-full" fill="none" height="14" preserveAspectRatio="none" viewBox="0 0 14 14" width="14">
        <g id="arrow-right">
          <path d={svgPaths.p2b607f80} id="Vector" stroke="#D4AF37" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function Action() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Action">
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[#d4af37] text-[15px] whitespace-nowrap">Узнать больше о бутике</p>
      <ArrowRight1 />
    </div>
  );
}

function BrandManifesto() {
  return (
    <div className="bg-white content-stretch flex flex-[1_0_66px] flex-col gap-[20px] items-start min-w-px p-[32px] relative rounded-[24px]" data-name="Brand-Manifesto">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] min-w-full relative shrink-0 text-[#1c1917] text-[32px] w-[min-content]" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Бутик селективной парфюмерии
      </p>
      <div className="[word-break:break-word] font-['Geist:Regular',sans-serif] font-normal leading-[0] min-w-full relative shrink-0 text-[#78716c] text-[16px] w-[min-content] whitespace-pre-wrap">
        <p className="leading-[1.5] mb-0">{`В MAKIBO мы верим, что аромат — это невидимый автограф вашей индивидуальности. Мы сотрудничаем исключительно с официальными дистрибьюторами и парфюмерными домами, гарантируя 100% оригинальность каждого флакона. `}</p>
        <p className="leading-[1.5] mb-0">​</p>
        <p className="leading-[1.5]">Посетите наш концепт-стор в Москве для индивидуальной консультации и подбора идеального парфюмерного гардероба с нашими экспертами.</p>
      </div>
      <Action />
    </div>
  );
}

function Trash() {
  return (
    <div className="relative shrink-0 size-[18px]" data-name="trash">
      <svg className="absolute block inset-0 size-full" fill="none" height="18" preserveAspectRatio="none" viewBox="0 0 18 18" width="18">
        <g id="trash">
          <path d={svgPaths.p2d931600} id="Vector" stroke="#78716C" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function CartHeader() {
  return (
    <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-name="Cart-Header">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular','Noto_Sans:Regular',sans-serif] leading-[normal] relative shrink-0 text-[#1c1917] text-[24px] whitespace-nowrap" style={{ fontVariationSettings: '"CTGR" 0, "wdth" 100, "wght" 400' }}>
        Корзина (2)
      </p>
      <Trash />
    </div>
  );
}

function ItemDetails() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="Item-Details">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[11px] w-full">CHANEL</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[16px] text-ellipsis w-full whitespace-nowrap">Coco Mademoiselle</p>
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[14px] w-full">14 850 ₽</p>
    </div>
  );
}

function Qty() {
  return (
    <div className="[word-break:break-word] bg-[#faf9f6] content-stretch flex font-['Geist:SemiBold',sans-serif] font-semibold gap-[12px] items-center leading-[normal] p-[6px] relative rounded-[12px] shrink-0 text-[#1c1917] text-[14px] whitespace-nowrap" data-name="Qty">
      <p className="relative shrink-0">—</p>
      <p className="relative shrink-0">1</p>
      <p className="relative shrink-0">+</p>
    </div>
  );
}

function CartItem() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Cart-Item-1">
      <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgThumb} />
      </div>
      <ItemDetails />
      <Qty />
    </div>
  );
}

function ItemDetails1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-[1_0_0] flex-col gap-[2px] items-start leading-[normal] min-w-px relative" data-name="Item-Details">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#d4af37] text-[11px] w-full">TOM FORD</p>
      <p className="font-['Instrument_Serif:Regular',sans-serif] not-italic overflow-hidden relative shrink-0 text-[#1c1917] text-[16px] text-ellipsis w-full whitespace-nowrap">Black Orchid</p>
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[14px] w-full">14 400 ₽</p>
    </div>
  );
}

function Qty1() {
  return (
    <div className="[word-break:break-word] bg-[#faf9f6] content-stretch flex font-['Geist:SemiBold',sans-serif] font-semibold gap-[12px] items-center leading-[normal] p-[6px] relative rounded-[12px] shrink-0 text-[#1c1917] text-[14px] whitespace-nowrap" data-name="Qty">
      <p className="relative shrink-0">—</p>
      <p className="relative shrink-0">1</p>
      <p className="relative shrink-0">+</p>
    </div>
  );
}

function CartItem1() {
  return (
    <div className="content-stretch flex gap-[12px] items-center relative shrink-0 w-full" data-name="Cart-Item-2">
      <div className="relative rounded-[8px] shrink-0 size-[64px]" data-name="Thumb">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[8px] size-full" src={imgThumb1} />
      </div>
      <ItemDetails1 />
      <Qty1 />
    </div>
  );
}

function CartItems() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Cart-Items">
      <CartItem />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 396 1" width="396">
            <line id="Line" stroke="#E7E5E4" x2="396" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <CartItem1 />
    </div>
  );
}

function SubtotalRow() {
  return (
    <div className="[word-break:break-word] content-stretch flex items-start justify-between leading-[normal] relative shrink-0 w-full whitespace-nowrap" data-name="Subtotal-Row">
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[15px]">Итого:</p>
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[#1c1917] text-[20px]">29 250 ₽</p>
    </div>
  );
}

function SubmitButton() {
  return (
    <div className="bg-[#1c1917] content-stretch flex items-center justify-center px-[32px] py-[14px] relative rounded-[30px] shrink-0 w-full" data-name="Submit-Button">
      <p className="[word-break:break-word] font-['Geist:SemiBold',sans-serif] font-semibold leading-[normal] relative shrink-0 text-[15px] text-white whitespace-nowrap">Оформить заказ</p>
    </div>
  );
}

function CheckoutBlock() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-full" data-name="Checkout-Block">
      <SubtotalRow />
      <SubmitButton />
    </div>
  );
}

function CartPreviewSidebar() {
  return (
    <div className="bg-white content-stretch flex flex-col gap-[24px] items-start p-[32px] relative rounded-[24px] shrink-0 w-[460px]" data-name="Cart-Preview-Sidebar">
      <div aria-hidden className="absolute border border-[#e7e5e4] border-solid inset-0 pointer-events-none rounded-[24px]" />
      <CartHeader />
      <CartItems />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 396 1" width="396">
            <line id="Line" stroke="#E7E5E4" x2="396" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <CheckoutBlock />
    </div>
  );
}

function CartPreviewAndInfo() {
  return (
    <div className="content-stretch flex gap-[40px] items-start pb-[80px] px-[80px] relative shrink-0 w-full" data-name="Cart-Preview-And-Info">
      <BrandManifesto />
      <CartPreviewSidebar />
    </div>
  );
}

function Instagram() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="instagram">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g clipPath="url(#clip0_0_9)" id="instagram">
          <path d={svgPaths.p3947f1c0} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
        <defs>
          <clipPath id="clip0_0_9">
            <rect fill="white" height="16" width="16" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}

function SocialInstagram() {
  return (
    <div className="bg-[#292524] content-stretch flex flex-col items-center justify-center relative rounded-[18px] shrink-0 size-[36px]" data-name="Social-instagram">
      <Instagram />
    </div>
  );
}

function Facebook() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="facebook">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="facebook">
          <path d={svgPaths.p164fd480} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SocialFacebook() {
  return (
    <div className="bg-[#292524] content-stretch flex flex-col items-center justify-center relative rounded-[18px] shrink-0 size-[36px]" data-name="Social-facebook">
      <Facebook />
    </div>
  );
}

function Youtube() {
  return (
    <div className="relative shrink-0 size-[16px]" data-name="youtube">
      <svg className="absolute block inset-0 size-full" fill="none" height="16" preserveAspectRatio="none" viewBox="0 0 16 16" width="16">
        <g id="youtube">
          <path d={svgPaths.p335d6380} id="Vector" stroke="white" strokeLinecap="round" strokeWidth="2" />
        </g>
      </svg>
    </div>
  );
}

function SocialYoutube() {
  return (
    <div className="bg-[#292524] content-stretch flex flex-col items-center justify-center relative rounded-[18px] shrink-0 size-[36px]" data-name="Social-youtube">
      <Youtube />
    </div>
  );
}

function Socials() {
  return (
    <div className="content-stretch flex gap-[12px] items-start relative shrink-0" data-name="Socials">
      <SocialInstagram />
      <SocialFacebook />
      <SocialYoutube />
    </div>
  );
}

function BrandCol() {
  return (
    <div className="content-stretch flex flex-col gap-[24px] items-start relative shrink-0 w-[300px]" data-name="Brand-Col">
      <p className="[word-break:break-word] font-['Instrument_Serif:Regular',sans-serif] leading-[normal] not-italic relative shrink-0 text-[32px] text-white tracking-[2px] whitespace-nowrap">MAKIBO</p>
      <p className="[word-break:break-word] font-['Geist:Regular',sans-serif] font-normal leading-[1.5] min-w-full relative shrink-0 text-[#78716c] text-[14px] w-[min-content]">Пространство исключительных ароматов и селективной парфюмерии. Творим историю ваших личных парфюмерных открытий.</p>
      <Socials />
    </div>
  );
}

function LinksCol() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 w-[180px]" data-name="Links-Col-1">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white w-full">Каталог</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Женские ароматы</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Мужские ароматы</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Унисекс парфюм</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Новинки брендов</p>
    </div>
  );
}

function LinksCol1() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start leading-[normal] relative shrink-0 w-[180px]" data-name="Links-Col-2">
      <p className="font-['Geist:Bold',sans-serif] font-bold relative shrink-0 text-[15px] text-white w-full">Покупателям</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Доставка и оплата</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Возврат и обмен</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Программа лояльности</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal relative shrink-0 text-[#78716c] text-[14px] w-full">Подарочные карты</p>
    </div>
  );
}

function LinksCol2() {
  return (
    <div className="[word-break:break-word] content-stretch flex flex-col gap-[16px] items-start relative shrink-0 w-[240px]" data-name="Links-Col-3">
      <p className="font-['Geist:Bold',sans-serif] font-bold leading-[normal] relative shrink-0 text-[15px] text-white w-full">Контакты</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#78716c] text-[14px] w-full">info@makibo.ru</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[normal] relative shrink-0 text-[#78716c] text-[14px] w-full">+7 (495) 123-45-67</p>
      <p className="font-['Geist:Regular',sans-serif] font-normal leading-[1.4] relative shrink-0 text-[#78716c] text-[14px] w-full">Москва, ул. Петровка, 12, Бутик MAKIBO</p>
    </div>
  );
}

function FooterColumns() {
  return (
    <div className="content-stretch flex items-start justify-between relative shrink-0 w-full" data-name="Footer-Columns">
      <BrandCol />
      <LinksCol />
      <LinksCol1 />
      <LinksCol2 />
    </div>
  );
}

function FooterBottom() {
  return (
    <div className="[word-break:break-word] content-stretch flex font-['Geist:Regular',sans-serif] font-normal items-center justify-between leading-[normal] relative shrink-0 text-[#78716c] text-[13px] w-full whitespace-nowrap" data-name="Footer-Bottom">
      <p className="relative shrink-0">© 2026 MAKIBO. Все права защищены.</p>
      <p className="relative shrink-0">Оригинальная селективная парфюмерия.</p>
    </div>
  );
}

function FooterSection() {
  return (
    <div className="bg-[#1c1917] content-stretch flex flex-col gap-[60px] items-start pb-[40px] pt-[80px] px-[80px] relative shrink-0 w-full" data-name="Footer-Section">
      <FooterColumns />
      <div className="h-0 relative shrink-0 w-full" data-name="Line">
        <div className="absolute inset-[-1px_0_0_0]">
          <svg className="block size-full" fill="none" height="1" preserveAspectRatio="none" viewBox="0 0 1280 1" width="1280">
            <line id="Line" stroke="#292524" x2="1280" y1="0.5" y2="0.5" />
          </svg>
        </div>
      </div>
      <FooterBottom />
    </div>
  );
}

export default function MakiboMarketplace() {
  return (
    <div className="bg-[#faf9f6] content-stretch flex flex-col items-start relative size-full" data-name="makibo-marketplace">
      <HeaderSection />
      <GenderTabsWrapper />
      <HeroContainer />
      <BrandsWrapper />
      <CategoriesWrapper />
      <BestsellersWrapper />
      <PromoContainer />
      <NewArrivalsWrapper />
      <CartPreviewAndInfo />
      <FooterSection />
    </div>
  );
}