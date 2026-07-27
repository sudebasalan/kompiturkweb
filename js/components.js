// Global Taşma (Horizontal Scroll) Engelleyici ve Dinamik Menü Dinleyicisi
document.addEventListener("DOMContentLoaded", function() {
    document.documentElement.classList.add('overflow-x-hidden', 'w-full');
    document.body.classList.add('overflow-x-hidden', 'w-full', 'max-w-full');
    
    loadHeader();
    loadFooter();
    initMobileMenu();
});

// Bulunulan sayfanın klasör derinliğine göre kök dizin yolunu hesaplar
function getPrefix() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);
    
    // Eğer root'ta veya index.html'deysek prefix gerekmez
    if (segments.length <= 1 || path.endsWith('/index.html') || path.endsWith('/')) {
        return '';
    }
    
    // Klasör derinliği kadar bir üst dizine çık ('../')
    return '../'.repeat(segments.length - 1);
}

// Mobil Menü Aç/Kapat İşlevi
function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', function() {
            menu.classList.toggle('hidden');
        });
    }
}

// Header'ı Yükleyen Fonksiyon
function loadHeader() {
  const p = getPrefix();
  
  const headerHTML = `
  <header id="main-header" class="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-slate-100 shadow-sm w-full">
    <section class="bg-brandRed text-white py-2.5 px-4 sm:px-6 lg:px-8 relative z-[60]" aria-label="Hızlı İletişim">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
            <address class="flex flex-wrap justify-center md:justify-start items-center gap-4 md:gap-8 not-italic">
                <a href="mailto:destek@compiturk.com.tr" class="flex items-center gap-2 text-xs md:text-sm font-medium hover:text-white/80 transition-colors" title="E-posta Gönder">
                    <i data-lucide="mail" class="w-4 h-4"></i>
                    destek@compiturk.com.tr
                </a>
                <a href="tel:+902128733537" class="flex items-center gap-2 text-xs md:text-sm font-medium hover:text-white/80 transition-colors" title="Bizi Arayın">
                    <i data-lucide="phone" class="w-4 h-4"></i>
                    +90 (212) 873 35 37
                </a>
                <a href="https://wa.me/902128733537" target="_blank" rel="noopener" class="flex items-center gap-2 text-xs md:text-sm font-semibold bg-white/10 px-3 py-1 rounded-full hover:bg-white/20 transition-all border border-white/20">
                    <i data-lucide="message-circle" class="w-4 h-4 text-white"></i>
                    WhatsApp Destek
                </a>
            </address>
            <div class="flex items-center gap-5">
                <a href="#" target="_blank" class="hover:scale-110 transition-transform"><i data-lucide="facebook" class="w-4 h-4"></i></a>
                <a href="#" target="_blank" class="hover:scale-110 transition-transform"><i data-lucide="instagram" class="w-4 h-4"></i></a>
                <a href="#" target="_blank" class="hover:scale-110 transition-transform"><i data-lucide="linkedin" class="w-4 h-4"></i></a>
            </div>
        </div>
    </section>

    <style>
        /* Mega Menu Geçiş ve Köprü Düzeltmesi */
        .mega-menu {
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
            transform: translateY(8px);
            transition: opacity 0.25s ease, transform 0.25s ease, visibility 0.25s;
        }

        /* Hover esnasında menünün açık kalmasını sağlayan görünmez köprü */
        .group:hover .mega-menu,
        .mega-menu:hover {
            visibility: visible;
            opacity: 1;
            pointer-events: auto;
            transform: translateY(0);
        }
    </style>

    <!-- 2. ANA HEADER & NAVİGASYON -->
    <div class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20 md:h-24">
                
                <!-- SOL: Kompiturk Logo -->
                <div class="flex-shrink-0">
                    <a href="${p}index.html" title="Compiturk Bilgisayar Anasayfa">
                        <img src="${p}images/kompiturk_logo.png" alt="Compiturk Logo" class="h-10 md:h-11 w-auto object-contain" />
                    </a>
                </div>

                <!-- ORTA: Navigasyon Menüsü -->
                <nav class="hidden lg:flex items-center space-x-5 xl:space-x-8 h-full relative" aria-label="Ana Menü">
                    
                    <!-- 1. Yazılım Çözümleri (Mega Dropdown) -->
                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
                            Yazılım Çözümleri <i data-lucide="chevron-down" class="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform"></i>
                        </button>
                        <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-[600px] z-50">
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl p-6">
                                <div class="grid grid-cols-2 gap-x-8 gap-y-4">
                                    <a href="${p}cozumler/pazaryeri-entegrasyonu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all border border-transparent hover:border-slate-100">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">Pazar Yeri Entegrasyonu</span>
                                    </a>
                                    <a href="${p}cozumler/xml-hub-entegrasyon.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">XML Hub — XML Entegrasyonu</span>
                                    </a>
                                    <a href="${p}cozumler/mobil-b2b-bayi-platformu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">Mobil B2B — Bayi Platformu</span>
                                    </a>
                                    <a href="${p}cozumler/ahtapot-depo-yonetimi.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">Ahtapot Depo Yönetimi</span>
                                    </a>
                                    <a href="${p}cozumler/net-tahsilat.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">Net Tahsilat</span>
                                    </a>
                                    <a href="${p}cozumler/distributor-pos.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                                        <span class="text-[13px] font-bold group-hover/item:text-brandRed">Distribütör POS</span>
                                    </a>
                                    <a href="${p}cozumler/kargo-entegrasyonu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all"><span class="text-[13px] font-bold group-hover/item:text-brandRed">Kargo Entegrasyonu</span></a>
                                    <a href="${p}cozumler/pdks.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all"><span class="text-[13px] font-bold group-hover/item:text-brandRed">PDKS</span></a>
                                </div>
                                <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                                    <a href="${p}index.html#cozumler-hizli-erisim" class="text-[13px] font-black text-brandRed hover:underline flex items-center gap-1">
                                        → TÜM YAZILIM ÇÖZÜMLERİ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. IT Altyapı & Destek -->
                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
                            IT Altyapı <i data-lucide="chevron-down" class="w-4 h-4 opacity-50"></i>
                        </button>
                        <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-64 z-50">
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 px-2">
                                <a href="${p}it-altyapi/sunucu-kurulumu.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Sunucu Kurulumu</a>
                                <a href="${p}it-altyapi/guvenlik-duvari.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Güvenlik Duvarı</a>
                                <a href="${p}it-altyapi/yedekleme-cozumleri.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Yedekleme Çözümleri</a>
                                <a href="${p}it-altyapi/ag-altyapisi.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Ağ Altyapısı</a>
                                <a href="${p}it-altyapi/yazilim-lisanslama.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Yazılım Lisanslama</a>
                                <a href="${p}it-altyapi/hosting-domain.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Hosting & Domain</a>
                                <a href="${p}it-altyapi/bilgisayar-yazici-kiralama.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Bilgisayar & Yazıcı Kiralama</a>
                                <a href="${p}it-altyapi/donanim-destegi.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Donanım Desteği</a>
                                <a href="${p}it-altyapi/yazici-kurulumu.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Yazıcı Kurulumu</a>
                                <a href="${p}it-altyapi/sarf-malzemeleri.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Sarf Malzemeleri</a>
                            </div>
                        </div>
                    </div>

                    <!-- 3. DİA ERP -->
                    <div class="relative group h-full flex items-center">
                        <a href="${p}dia-erp/dia-erp.html" class="flex items-center gap-1 text-[13px] font-bold text-brandRed hover:text-brandNavy nav-link-underline transition-colors uppercase tracking-tight py-4">
                            DİA ERP <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </a>
                        <div class="absolute top-full right-[-220px] pt-2 mega-menu w-[780px] max-w-[90vw] z-50">
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl p-6 sm:p-8">
                                <div class="grid grid-cols-3 gap-x-8 gap-y-5">
                                    <a href="${p}dia-erp/dia-on-muhasebe.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Ön Muhasebe</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Cari hesap, fatura, irsaliye</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-stok-depo.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Stok & Depo Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Barkod, lot, çoklu depo</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-mobil-saha-satis.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Mobil Saha Satış</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Rut planlama, sipariş yönetimi</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-crm-servis.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">CRM & Servis</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Müşteri ilişkileri, teknik servis</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-surec-yonetimi.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Süreç Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">İş akışı ve operasyonel otomasyon</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-e-ticaret-b2b.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">E-Ticaret & B2B</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Web mağaza ve bayi paneli</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-e-fatura.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">e-Fatura & e-İrsaliye</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">GİB uyumlu e-belge çözümleri</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-genel-muhasebe.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Genel Muhasebe</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Mizan, bilanço, resmi defterler</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-uretim.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Üretim Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">İş emri, reçete, maliyet yönetimi</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-restoran.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Restoran Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Masa, adisyon ve mutfak takibi</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-perakende.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Perakende & Mağaza</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Hızlı satış (POS), kampanya</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-personel-ik.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">Personel & İK</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Bordro, izin, SGK entegrasyonu</span>
                                    </a>
                                </div>
                                <div class="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                                    <a href="${p}index.html#dia-erp-solutions" class="text-[13px] font-black text-brandRed hover:underline flex items-center gap-1">
                                        → DİA ERP HAKKINDA DETAYLI BİLGİ
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Diğer Çözümler -->
                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
                            Diğer <i data-lucide="chevron-down" class="w-4 h-4 opacity-50"></i>
                        </button>
                        <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-48 z-50">
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 px-2">
                                <a href="${p}digercozum/ödüyo.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Ödüyo</a>
                                <a href="${p}digercozum/entegra.html" class="block px-4 py-2.5 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Entegra</a>
                            </div>
                        </div>
                    </div>

                    <!-- 5. Kurumsal -->
                    <div class="relative group h-full flex items-center">
                        <button class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
                            Kurumsal <i data-lucide="chevron-down" class="w-4 h-4 opacity-50"></i>
                        </button>
                        <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-52 z-50">
                            <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 px-2">
                                <a href="${p}kurumsal/hakkımızda.html" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="info" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Hakkımızda</span>
                                </a>
                                <a href="${p}kurumsal/haberler.html" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="newspaper" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Haberler</span>
                                </a>
                                <a href="${p}kurumsal/S.S.S.html" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="help-circle" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">S.S.S</span>
                                </a>
                                <a href="${p}kurumsal/blog.htm" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="layout" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Blog</span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- 6. İletişim -->
                    <a href="${p}iletisim/iletisim.html" class="text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">İletişim</a>
                </nav>

                <!-- SAĞ: DİA Rozetleri -->
                <div class="hidden xl:flex items-center space-x-3 border-l border-slate-100 pl-6">
                    <img src="${p}images/cozum-ortagi-logolari-01 (1).svg" alt="DİA Çözüm Ortağı" class="h-7 w-auto hover:scale-105 transition-transform" />
                    <div class="w-px h-6 bg-slate-200"></div>
                    <img src="${p}images/mavi-is-ortagi-logolari-01.svg" alt="DİA İş Ortağı" class="h-7 w-auto hover:scale-105 transition-transform" />
                </div>

                <!-- Mobil Menü Butonu -->
                <button id="mobile-menu-btn" class="lg:hidden p-2 text-brandNavy">
                    <i data-lucide="menu" class="w-8 h-8"></i>
                </button>
            </div>
        </div>

        <!-- MOBİL MENÜ (Drawer) -->
        <div id="mobile-menu" class="hidden lg:hidden bg-white border-t border-slate-100 fixed inset-x-0 bottom-0 top-[120px] overflow-y-auto z-[100] pb-20">
            <div class="px-6 py-8 space-y-6">
                <div>
                    <h3 class="text-xs font-black text-brandRed uppercase tracking-widest mb-4">Yazılım Çözümleri</h3>
                    <div class="grid grid-cols-1 gap-3 pl-3 border-l-2 border-slate-100">
                        <a href="${p}cozumler/pazar-yeri-entegrasyonu.html" class="text-sm font-bold">Pazar Yeri Entegrasyonu</a>
                        <a href="${p}cozumler/mobil-b2b-bayi-platformu.html" class="text-sm font-bold">Mobil B2B</a>
                        <a href="${p}cozumler/ahtapot-depo-yonetimi.html" class="text-sm font-bold">Ahtapot Depo Yönetimi</a>
                        <a href="${p}index.html#cozumler-hizli-erisim" class="text-sm font-bold text-brandRed uppercase">Tüm Çözümler →</a>
                    </div>
                </div>
                <div>
                    <h3 class="text-xs font-black text-brandRed uppercase tracking-widest mb-4">DİA ERP</h3>
                    <div class="grid grid-cols-1 gap-3 pl-3 border-l-2 border-slate-100 text-sm font-bold">
                        <a href="${p}dia-erp/dia-erp.html">Ön Muhasebe</a>
                        <a href="${p}dia-erp/dia-erp.html">Stok & Depo</a>
                        <a href="${p}dia-erp/dia-erp.html" class="text-brandRed uppercase">Tüm Modüller →</a>
                    </div>
                </div>
                <div class="space-y-4 pt-4 border-t border-slate-50">
                    <a href="${p}kurumsal/hakkımızda.html" class="block text-base font-bold">Kurumsal</a>
                    <a href="${p}iletisim/iletisim.html" class="block text-base font-bold text-brandRed">İletişim</a>
                </div>
            </div>
        </div>
    </div>
  </header>
  `;
  
  const headerElement = document.getElementById('global-header');
  if (headerElement) {
    headerElement.innerHTML = headerHTML;
  }
}

// Footer'ı Yükleyen Fonksiyon
function loadFooter() {
  const p = getPrefix();

  const footerHTML = `
  <footer id="main-footer" class="w-full bg-[#0B132B] text-slate-300 overflow-hidden">
    <div class="w-full !max-w-none !m-0 block bg-[#0B132B] text-slate-300 pt-16 pb-8 border-t-4 border-[#DC2626] relative z-20 mt-auto">
        
        <!-- İçeriklerin aşırı kenara yapışmaması için koruyucu iç container -->
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12 w-full">

            <!-- 5 KOLONLU GRID DÜZENİ -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">

                <!-- KOLON 1: MARKA ÖZETİ & SOSYAL MEDYA (COL-SPAN-2) -->
                <div class="lg:col-span-2 space-y-6">
                    <!-- Logolar -->
                    <div class="flex items-center gap-4 flex-wrap">
                        <a href="${p}index.html" title="Compiturk Bilgisayar Anasayfa">
                            <img src="${p}images/kompiturk_logo.png" alt="Compiturk Bilgisayar Logo" class="h-9 w-auto object-contain brightness-0 invert" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\'text-2xl font-black text-white tracking-tight\'>COMPITURK</span>';" />
                        </a>
                        <div class="w-px h-6 bg-slate-700 hidden sm:block"></div>
                        <div class="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 flex items-center justify-center">
                            <img src="${p}images/dialogo.svg" alt="DİA ERP Yetkili Çözüm Ortağı Logo" class="h-6 w-auto object-contain" />
                        </div>
                    </div>

                    <!-- Kurumsal Tanım Metni -->
                    <p class="text-sm text-slate-400 font-normal leading-relaxed max-w-md">
                        Compiturk Bilgisayar; DİA ERP İstanbul Yetkili Çözüm Ortağı ve 13+ yerli B2B yazılım geliştiricisi olarak işletmelerin dijital altyapısını güçlendirir.
                    </p>

                    <!-- Sosyal Medya İkon Kutuları -->
                    <div class="flex items-center gap-3 pt-2">
                        <a href="#" target="_blank" rel="noopener" aria-label="LinkedIn Profili" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#245BA7] hover:text-white hover:border-[#245BA7] flex items-center justify-center transition-all">
                            <i data-lucide="linkedin" class="w-4 h-4"></i>
                        </a>
                        <a href="#" target="_blank" rel="noopener" aria-label="Instagram Profili" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] flex items-center justify-center transition-all">
                            <i data-lucide="instagram" class="w-4 h-4"></i>
                        </a>
                        <a href="#" target="_blank" rel="noopener" aria-label="YouTube Kanalı" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] flex items-center justify-center transition-all">
                            <i data-lucide="youtube" class="w-4 h-4"></i>
                        </a>
                        <a href="#" target="_blank" rel="noopener" aria-label="Facebook Sayfası" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#245BA7] hover:text-white hover:border-[#245BA7] flex items-center justify-center transition-all">
                            <i data-lucide="facebook" class="w-4 h-4"></i>
                        </a>
                    </div>
                </div>

                <!-- KOLON 2: YAZILIM ÇÖZÜMLERİ -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#DC2626] pl-3">
                        Yazılım Çözümleri
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}cozumler/pazaryeri-entegrasyonu.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Pazaryeri Entegrasyonu</a></li>
                        <li><a href="${p}cozumler/ahtapot-depo-yonetimi.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Ahtapot WMS Depo</a></li>
                        <li><a href="${p}cozumler/mobil-b2b-bayi-platformu.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Mobil B2B Bayi Portalı</a></li>
                        <li><a href="${p}cozumler/net-tahsilat.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Net Tahsilat & POS</a></li>
                        <li><a href="${p}cozumler/xml-hub-entegrasyon.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">XML Hub Veri Bağlantısı</a></li>
                        <li><a href="${p}cozumler/pdks.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">PDKS Personel Takip</a></li>
                                    <a href="${p}index.html#cozumler-hizli-erisim" class="text-[13px] font-black text-white hover:underline flex items-center gap-1">
                                        → TÜM YAZILIM ÇÖZÜMLERİ
                                    </a>
                        </ul>
                </div>

                <!-- KOLON 3: DİA ERP MODÜLLERİ -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#245BA7] pl-3">
                        DİA ERP Modülleri
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}dia-erp/dia-on-muhasaebe.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Ön Muhasebe</a></li>
                        <li><a href="${p}dia-erp/dia-e-fatura.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">e-Fatura & e-İrsaliye</a></li>
                        <li><a href="${p}dia-erp/dia-stok-depo.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Stok & Depo Yönetimi</a></li>
                        <li><a href="${p}dia-erp/dia-genel-muhasebe.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Genel Muhasebe</a></li>
                        <li><a href="${p}dia-erp/dia-mobil-saha-satis.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Mobil Saha Satış</a></li>
                        <li><a href="${p}dia-erp/dia-crm-servis.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">CRM & Servis Yönetimi</a></li>
                                    <a href="${p}index.html#dia-erp-solutions" class="text-[13px] font-black text-white hover:underline flex items-center gap-1">
                                        → DİA ERP HAKKINDA DETAYLI BİLGİ
                                    </a>
                        </ul>
                </div>

                <!-- KOLON 4: IT ALTYAPI ÇÖZÜMLERİ -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#245BA7] pl-3">
                        IT Altyapı
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}it-altyapi/sunucu-kurulumu.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Sunucu & Cloud Kurulumu</a></li>
                        <li><a href="${p}it-altyapi/guvenlik-duvari.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">UTM Firewall Güvenlik</a></li>
                        <li><a href="${p}it-altyapi/yedekleme-cozumleri.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Otomatik Yedekleme</a></li>
                        <li><a href="${p}it-altyapi/ag-altyapisi.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Ağ & Kablolama</a></li>
                        <li><a href="${p}it-altyapi/yazilim-lisanslama.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Yazılım Lisanslama</a></li>
                                    <a href="${p}index.html#cozumler-hizli-erisim" class="text-[13px] font-black text-white hover:underline flex items-center gap-1">
                                        → IT & ALTYAPI HAKKINDA DETAYLI BİLGİ 
                                    </a>
                                
                        </ul>
                </div>

                <!-- KOLON 5: KURUMSAL -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#E77F18] pl-3">
                        Kurumsal
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}kurumsal/hakkımızda.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Hakkımızda</a></li>
                        <li><a href="${p}kurumsal/S.S.S.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">S.S.S. (Sıkça Sorulanlar)</a></li>
                        <li><a href="${p}kurumsal/blog.htm" class="hover:text-white hover:translate-x-1 transition-all inline-block">Blog & Rehberler</a></li>
                        <li><a href="${p}iletisim/iletisim.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">İletişim</a></li>
                    </ul>
                </div>

            </div>

            <!-- SUB-FOOTER / YASAL BANT VE TELİF -->
            <div class="border-t border-slate-800/80 pt-8 mt-12 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 text-center md:text-left">
                <div>
                    © 2026 <span class="font-bold text-slate-300">Compiturk Bilgisayar</span>. Tüm Hakları Saklıdır. DİA ERP İstanbul Yetkili Çözüm Ortağı.
                </div>
                
                <div class="flex flex-wrap justify-center gap-3 sm:gap-6 text-slate-400">
                    <a  class="hover:text-slate-200 transition-colors">KVKK Aydınlatma Metni</a>
                    <span>•</span>
                    <a  class="hover:text-slate-200 transition-colors">Gizlilik Politikası</a>
                    <span>•</span>
                    <a  class="hover:text-slate-200 transition-colors">Çerez Politikası</a>
                </div>
            </div>

        </div>
    </div>
  </footer>
  `;
  
  const footerElement = document.getElementById('global-footer');
  if (footerElement) {
    footerElement.innerHTML = footerHTML;
  }
}