/* =========================================================================
 * KOMPITURK MERKEZİ FORM VE API YAPILANDIRMASI (CENTRAL CONFIG)
 * =========================================================================
 * Backend endpoint hazır olduğunda sadece 'apiUrl' değerini doldurmanız yeterlidir.
 * Tüm sitedeki (50+ sayfa) formlar otomatik olarak bu adrese POST isteği atacaktır.
 */
window.KOMPITURK_CONFIG = window.KOMPITURK_CONFIG || {
    // Backend API URL (Örn: 'https://api.kompiturk.com.tr/api/leads' veya webhook adresi)
    apiUrl: '', 
    
    // Backend hazır olana kadar sahte (mock) başarılı cevap simülasyonu (true / false)
    useMock: true, 
    
    // Gerçekçi ağ gecikmesi simülasyonu (milisaniye cinsinden)
    mockDelayMs: 850, 
    
    // Geliştirici konsolunda giden verileri ve bildirimleri renkli göster
    debug: true 
};

// Global Taşma (Horizontal Scroll) Engelleyici ve Dinamik Menü Dinleyicisi
function initKompiturkComponents() {
    document.documentElement.classList.add('overflow-x-hidden', 'w-full');
    document.body.classList.add('overflow-x-hidden', 'w-full', 'max-w-full');

    loadHeader();
    loadFooter();
    initGlobalFormHandler();
    initScrollReveal();
    initMarqueeSliders();
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", initKompiturkComponents);
} else {
    initKompiturkComponents();
}

// Sayfa dosyası adına göre net ve kurumsal hizmet/ürün eşleştirme tablosu
const PAGE_SERVICE_MAP = {
    // DİA ERP Modülleri
    'dia-on-muhasebe.html': 'DİA Ön Muhasebe',
    'dia-genel-muhasebe.html': 'DİA Genel Muhasebe',
    'dia-e-fatura.html': 'DİA e-Fatura & e-İrsaliye',
    'dia-stok-depo.html': 'DİA Stok & Depo Yönetimi',
    'dia-mobil-saha-satis.html': 'DİA Mobil Saha Satış',
    'dia-e-ticaret-b2b.html': 'DİA E-Ticaret B2B',
    'dia-perakende.html': 'DİA Perakende Satış & POS',
    'dia-crm-servis.html': 'DİA CRM & Servis Yönetimi',
    'dia-servisyonetimi.html': 'DİA Teknik Servis Yönetimi',
    'dia-uretim.html': 'DİA Üretim Yönetimi',
    'dia-restoran.html': 'DİA Restoran & Kafe POS',
    'dia-personel-ik.html': 'DİA Personel & İK Bordro',
    'dia-disticaret.html': 'DİA Dış Ticaret & İthalat/İhracat',
    'dia-demirbas.html': 'DİA Demirbaş & Sabit Kıymet',
    'dia-surec-yonetimi.html': 'DİA Süreç Yönetimi & İş Akışı',
    'dia-yazilim-cozumleri.html': 'DİA ERP Kurumsal Çözümler',

    // Çözümler & Entegrasyonlar
    'pazaryeri-entegrasyonu.html': 'Pazaryeri Entegrasyonu',
    'xml-hub-entegrasyon.html': 'XML Hub Entegrasyonu',
    'depo-kurdu.html': 'Depo Kurdu Mobil WMS',
    'ahtapot-depo-yonetimi.html': 'Ahtapot Depo Yönetimi',
    'mobil-b2b-bayi-platformu.html': 'Mobil B2B Bayi Platformu',
    'mobil-sicak-satis.html': 'Mobil Sıcak Satış',
    'net-tahsilat.html': 'Net Tahsilat Sanal POS',
    'distributor-pos.html': 'Distribütör POS',
    'kargo-entegrasyonu.html': 'Kargo Entegrasyonu',
    'ozon-kargo.html': 'Ozon & Kargo Entegrasyonu',
    'logo-entegrasyon.html': 'Logo Yazılım Entegrasyonu',
    'ford-otosan.html': 'Ford Otosan Entegrasyonu',
    'kalite-kontrol-arsiv.html': 'Kalite Kontrol & Arşiv',
    'kantar-entegrasyonu.html': 'Kantar Entegrasyonu',
    'kompiboss.html': 'KompiBoss Yönetici Paneli',
    'kurumsal-mobil-uygulama.html': 'Kurumsal Mobil Uygulama',
    'pdks.html': 'PDKS Personel Devam Takip',
    'yazilimcozumleri.html': 'Tüm Yazılım Çözümleri',

    // IT Altyapı
    'sunucu-kurulumu.html': 'Sunucu & Cloud Kurulumu',
    'guvenlik-duvari.html': 'UTM Firewall Güvenlik Duvarı',
    'yedekleme-cozumleri.html': 'Otomatik Yedekleme Çözümleri',
    'ag-altyapisi.html': 'Kurumsal Ağ & Kablolama Altyapısı',
    'yazilim-lisanslama.html': 'Yazılım Lisanslama',
    'yazici-kurulumu.html': 'Yazıcı & Donanım Kurulumu',
    'donanim-destegi.html': 'Donanım & Teknik Servis Desteği',
    'bilgisayar-yazici-kiralama.html': 'Bilgisayar & Yazıcı Kiralama',
    'sarf-malzemeleri.html': 'Sarf Malzemeleri Tedariği',
    'hosting-domain.html': 'Kurumsal Hosting & Domain',
    'e-imza.html': 'E-İmza & KEP Hizmetleri',
    'itcozumleri.html': 'Kurumsal IT Çözümleri',

    // Diğer Çözümler
    'entegra.html': 'Entegra Entegrasyonu',
    'ödüyo.html': 'Ödüyo Ödeme Sistemleri',

    // Kurumsal
    'hakkimizda.html': 'Kurumsal İletişim & Bilgi Formu',
    'iletisim.html': 'Genel İletişim & Demo Talebi',
    'index.html': 'Anasayfa Demo & Teklif Formu'
};

// Telefon numarasını Türkiye standart formatına anlık dönüştürür (05XX XXX XX XX)
function formatPhoneNumber(value) {
    if (!value) return '';
    let digits = value.replace(/\D/g, '');
    
    // Eğer kullanıcı '5' ile başladıysa otomatik '0' ekle
    if (digits.length > 0 && digits[0] === '5') {
        digits = '0' + digits;
    }
    
    // Maksimum 11 hane (05XX XXX XX XX)
    digits = digits.substring(0, 11);
    
    if (digits.length <= 4) {
        return digits;
    } else if (digits.length <= 7) {
        return `${digits.substring(0, 4)} ${digits.substring(4)}`;
    } else if (digits.length <= 9) {
        return `${digits.substring(0, 4)} ${digits.substring(4, 7)} ${digits.substring(7)}`;
    } else {
        return `${digits.substring(0, 4)} ${digits.substring(4, 7)} ${digits.substring(7, 9)} ${digits.substring(9, 11)}`;
    }
}

// Telefon numarasının geçerli Türkiye numarası olup olmadığını doğrular
function isValidTurkishPhone(phoneStr) {
    if (!phoneStr) return false;
    const digits = phoneStr.replace(/\D/g, '');
    // 11 hane (05XXXXXXXXX veya 02XXXXXXXXX sabit hatlar)
    if (digits.length === 11 && (digits.startsWith('05') || digits.startsWith('02') || digits.startsWith('03') || digits.startsWith('04') || digits.startsWith('08'))) {
        return true;
    }
    // 10 hane (5XXXXXXXXX)
    if (digits.length === 10 && digits.startsWith('5')) {
        return true;
    }
    return false;
}

// Form içine gizli (hidden) hizmet inputu ve bot tuzağı (honeypot) ekler
function ensureServiceInput(form) {
    if (!form) return;
    
    // 1. Bot Tuzağı (Honeypot) Koruması
    if (!form.querySelector('[name="_gotcha_hp"]')) {
        const hpInput = document.createElement('input');
        hpInput.type = 'text';
        hpInput.name = '_gotcha_hp';
        hpInput.tabIndex = -1;
        hpInput.autocomplete = 'off';
        hpInput.style.cssText = 'display:none!important;position:absolute!important;left:-9999px!important;visibility:hidden!important;';
        form.prepend(hpInput);
    }

    // 2. Hizmet Bilgisi Kontrolü
    const existing = form.querySelector('[name="service"], [name="hizmet"], [name="iletisim-hizmet"], [name="selected_service"]');
    if (existing && existing.value) {
        return;
    }

    const serviceName = detectFormService(form);
    
    if (existing) {
        existing.value = serviceName;
    } else {
        const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'service';
        hiddenInput.value = serviceName;
        form.prepend(hiddenInput);
    }
}

// Bulunulan formun veya sayfanın hangi hizmete/ürüne ait olduğunu kesin olarak tespit eder
function detectFormService(form) {
    if (!form) return 'Genel İletişim / Demo Talebi';

    // 1. Form içinde açık bir select veya input seçimi var mı?
    const serviceInput = form.querySelector('[name="iletisim-hizmet"], [name="hizmet"], [name="service"], [name="selected_service"], [name="hizmet_turu"]');
    if (serviceInput && serviceInput.value && serviceInput.value.trim() !== '') {
        if (serviceInput.tagName === 'SELECT' && serviceInput.selectedOptions && serviceInput.selectedOptions.length > 0) {
            const selectedText = serviceInput.selectedOptions[0].text.trim();
            if (!selectedText.toLowerCase().includes('lütfen') && !selectedText.toLowerCase().includes('seçin')) {
                return selectedText;
            }
        }
        return serviceInput.value.trim();
    }

    // 2. Form üzerinde data-service veya data-product özniteliği var mı?
    if (form.dataset.service) return form.dataset.service;
    if (form.dataset.product) return form.dataset.product;

    // 3. Dosya adına (URL pathname) göre eşleştirme tablosundan çek (En güvenilir yöntem)
    const path = window.location.pathname;
    const filename = path.substring(path.lastIndexOf('/') + 1).toLowerCase() || 'index.html';
    if (PAGE_SERVICE_MAP[filename]) {
        return PAGE_SERVICE_MAP[filename];
    }

    // 4. Formun bulunduğu kartın veya bölümün başlığı var mı?
    const cardHeading = form.closest('.bg-white, section, div[class*="rounded"]')?.querySelector('h1, h2, h3');
    if (cardHeading && cardHeading.innerText) {
        const headingText = cardHeading.innerText.replace(/[\n\r]+/g, ' ').trim();
        const cleanHeading = headingText
            .replace(/Demo\s*&\s*Teklif(\s*Formu)?/gi, '')
            .replace(/İçin\s*Ücretsiz\s*Keşif/gi, '')
            .replace(/Demo\s*Talep\s*&\s*İletişim\s*Formu/gi, '')
            .replace(/Ücretsiz\s*Demo\s*&\s*(Teklif|Bilgi)(\s*Alın|\s*İsteyin|\s*Formu)?/gi, '')
            .replace(/Hızlı\s*Teklif\s*&\s*İletişim\s*Formu/gi, '')
            .replace(/Demo\s*İsteyin/gi, '')
            .replace(/Keşif\s*ve\s*Fiyat\s*Teklifi/gi, '')
            .trim();
        if (cleanHeading.length > 2) return cleanHeading;
    }

    // 5. Sayfa ana başlığı (h1)
    const mainH1 = document.querySelector('h1');
    if (mainH1 && mainH1.innerText) {
        const h1Text = mainH1.innerText.replace(/[\n\r]+/g, ' ').trim();
        if (h1Text.length > 2) return h1Text;
    }

    // 6. Belge başlığından (document.title) tespit et
    if (document.title) {
        const titlePart = document.title.split('|')[0].split('-')[0].trim();
        if (titlePart && titlePart.toLowerCase() !== 'kompiturk' && titlePart.toLowerCase() !== 'kompiturk bilgisayar') {
            return titlePart;
        }
    }

    return 'Genel İletişim / Demo Talebi';
}

// Form içindeki isimsiz (name özniteliği olmayan) inputları akıllıca etiketler
function ensureInputNames(form) {
    if (!form) return;
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        if (!input.name || input.name.trim() === '') {
            const type = (input.type || '').toLowerCase();
            const placeholder = (input.placeholder || '').toLowerCase();
            const id = (input.id || '').toLowerCase();
            const labelText = (input.closest('div, label')?.querySelector('label')?.innerText || '').toLowerCase();

            if (type === 'email' || placeholder.includes('eposta') || placeholder.includes('email') || labelText.includes('eposta') || labelText.includes('e-posta')) {
                input.name = 'email';
            } else if (type === 'tel' || placeholder.includes('05') || labelText.includes('telefon') || labelText.includes('gsm') || labelText.includes('phone') || id.includes('phone') || id.includes('tel')) {
                input.name = 'phone';
            } else if (labelText.includes('ad') || labelText.includes('soyad') || placeholder.includes('ahmet') || id.includes('fullname') || id.includes('name')) {
                input.name = 'fullname';
            } else if (labelText.includes('firma') || placeholder.includes('ltd') || placeholder.includes('şirket') || placeholder.includes('firma') || id.includes('company')) {
                input.name = 'company';
            } else if (input.tagName === 'TEXTAREA' || labelText.includes('mesaj') || labelText.includes('not') || labelText.includes('talep') || id.includes('message')) {
                input.name = 'message';
            } else if (input.tagName === 'SELECT' || labelText.includes('hizmet') || labelText.includes('ürün') || labelText.includes('modül')) {
                input.name = 'service';
            } else if (type === 'checkbox' && (id.includes('kvkk') || labelText.includes('kvkk'))) {
                input.name = 'kvkk_consent';
            } else {
                input.name = id || `field_${Math.random().toString(36).substring(2, 7)}`;
            }
        }
    });
}

// Modern, Tailwind & Glassmorphism Uyumlu Toast Bildirim Sistemi
function showToast({ title, message, type = 'success', duration = 5000 }) {
    let container = document.getElementById('kompiturk-toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'kompiturk-toast-container';
        container.className = 'fixed bottom-10 sm:bottom-12 right-6 z-[999999] flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0';
        document.body.appendChild(container);
    }

    const isSuccess = type === 'success';
    const borderColor = isSuccess ? 'border-emerald-500/40' : 'border-red-500/40';
    const shadowColor = isSuccess ? 'shadow-emerald-500/10' : 'shadow-red-500/10';
    const iconBg = isSuccess ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600';
    const iconSvg = isSuccess 
        ? `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7"></path></svg>`
        : `<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><line x1="12" y1="8" x2="12" y2="12" stroke-width="2"></line><line x1="12" y1="16" x2="12.01" y2="16" stroke-width="2"></line></svg>`;

    const toast = document.createElement('div');
    toast.className = `bg-white/95 backdrop-blur-md pointer-events-auto border-2 ${borderColor} rounded-2xl p-4 shadow-2xl ${shadowColor} flex items-start gap-3.5 transform translate-y-10 opacity-0 transition-all duration-300 ease-out`;
    toast.innerHTML = `
        <div class="flex-shrink-0 w-10 h-10 rounded-xl ${iconBg} flex items-center justify-center">
            ${iconSvg}
        </div>
        <div class="flex-1 pt-0.5">
            <h4 class="text-sm font-black text-slate-900 leading-tight">${title}</h4>
            <p class="text-xs text-slate-600 mt-1 leading-snug">${message}</p>
        </div>
        <button type="button" class="text-slate-400 hover:text-slate-700 p-1 transition-colors rounded-lg" aria-label="Kapat">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
    `;

    const closeBtn = toast.querySelector('button');
    const dismiss = () => {
        toast.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => {
            toast.remove();
        }, 300);
    };

    closeBtn.addEventListener('click', dismiss);
    container.appendChild(toast);

    // Giriş animasyonu
    requestAnimationFrame(() => {
        toast.classList.remove('translate-y-10', 'opacity-0');
    });

    if (duration > 0) {
        setTimeout(dismiss, duration);
    }
}

// Merkezi Asenkron Form Gönderim İşleyicisi
async function handleGlobalFormSubmit(form, e) {
    if (e) {
        e.preventDefault();
        e.stopPropagation();
    }

    if (!form) return;

    // 1. Bot Tuzağı (Honeypot) Kontrolü — Bot yakalandığında sessizce başarılı dön
    const hp = form.querySelector('[name="_gotcha_hp"]');
    if (hp && hp.value && hp.value.trim() !== '') {
        console.warn('🤖 [Bot Koruması] Spam bot formu engellendi.');
        showToast({
            type: 'success',
            title: 'Talebiniz Başarıyla Alındı!',
            message: 'Talebiniz bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.'
        });
        form.reset();
        return;
    }

    // İsimsiz inputları otomatik düzelt
    ensureInputNames(form);

    // 2. Gelişmiş Telefon Numarası Doğrulaması (Türkiye 10/11 Hane Kontrolü)
    const phoneInput = form.querySelector('input[type="tel"], [name="phone"], [name="iletisim-telefon"], [name="tel"]');
    if (phoneInput) {
        const rawPhone = phoneInput.value.trim();
        if (!isValidTurkishPhone(rawPhone)) {
            phoneInput.classList.add('border-red-500', 'ring-2', 'ring-red-500/20', 'animate-shake');
            phoneInput.focus();
            showToast({
                type: 'error',
                title: 'Geçersiz Telefon Numarası',
                message: 'Lütfen 11 haneli geçerli bir telefon numarası giriniz (Örn: 05XX XXX XX XX).'
            });
            setTimeout(() => {
                phoneInput.classList.remove('animate-shake');
            }, 500);
            return;
        } else {
            phoneInput.classList.remove('border-red-500', 'ring-2', 'ring-red-500/20');
        }
    }

    // HTML5 Doğrulama Kontrolü (Email formatı, required alanlar vb.)
    if (form.checkValidity && !form.checkValidity()) {
        if (form.reportValidity) {
            form.reportValidity();
        }
        return;
    }

    const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button:not([type="button"])');
    let originalBtnHtml = '';

    if (submitBtn) {
        originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-80', 'cursor-not-allowed');
        submitBtn.innerHTML = `
            <svg class="animate-spin -ml-1 mr-2 h-5 w-5 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Gönderiliyor...</span>
        `;
    }

    try {
        const formData = new FormData(form);
        const detectedService = detectFormService(form);
        
        const formType = formData.get('form_type') || (form.id === 'it-cta-form' ? 'hizli_it_kesif' : (window.location.pathname.includes('iletisim') ? 'genel_iletisim' : 'demo_teklif'));

        // Backend'e gidecek standart ve temiz payload nesnesi
        const payload = {
            form_type: formType,
            service: detectedService,
            fullname: '',
            phone: '',
            email: '',
            company: '',
            message: '',
            page_url: window.location.href,
            page_title: document.title,
            submitted_at: new Date().toISOString(),
            raw_fields: {}
        };

        // Form alanlarını ayrıştır ve standartlaştır
        for (const [key, value] of formData.entries()) {
            // Honeypot alanını backend payload'a dahil etme
            if (key === '_gotcha_hp') continue;

            payload.raw_fields[key] = value;

            const lowerKey = key.toLowerCase();
            if ((lowerKey.includes('name') || lowerKey.includes('ad') || lowerKey === 'fullname') && !lowerKey.includes('firma')) {
                if (!payload.fullname) payload.fullname = value;
            } else if (lowerKey.includes('phone') || lowerKey.includes('tel') || lowerKey.includes('gsm')) {
                if (!payload.phone) payload.phone = value;
            } else if (lowerKey.includes('mail') || lowerKey.includes('eposta')) {
                if (!payload.email) payload.email = value;
            } else if (lowerKey.includes('company') || lowerKey.includes('firma') || lowerKey.includes('sirket')) {
                if (!payload.company) payload.company = value;
            } else if (lowerKey.includes('mesaj') || lowerKey.includes('message') || lowerKey.includes('not') || lowerKey.includes('talep')) {
                if (!payload.message) payload.message = value;
            }
        }

        const config = window.KOMPITURK_CONFIG || {};

        if (config.debug) {
            console.log(
                '%c🚀 [Kompiturk Form Motoru] Form Gönderildi!',
                'background: #DC2626; color: #fff; padding: 4px 10px; border-radius: 6px; font-weight: bold; font-size: 12px;',
                payload
            );
        }

        // Mock veya Canlı Endpoint Gönderimi
        if (config.apiUrl && !config.useMock) {
            const response = await fetch(config.apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
        } else {
            // Sahte (Mock) gecikme simülasyonu
            const delay = config.mockDelayMs || 850;
            await new Promise(resolve => setTimeout(resolve, delay));
        }

        // Başarılı Bildirim
        showToast({
            type: 'success',
            title: 'Talebiniz Başarıyla Alındı!',
            message: `"${detectedService}" konulu talebiniz bize ulaştı. Ekibimiz en kısa sürede sizinle iletişime geçecektir.`
        });

        // Formu temizle
        form.reset();

        // Eğer IT Modal içindeyse kapatma işlemini tetikle
        if (typeof toggleItModal === 'function' && form.id === 'it-cta-form') {
            const itSuccess = document.getElementById('it-cta-success');
            const itForm = document.getElementById('it-cta-form');
            if (itSuccess && itForm) {
                itForm.classList.add('hidden');
                itSuccess.classList.remove('hidden');
                setTimeout(() => {
                    toggleItModal(false);
                    setTimeout(() => {
                        itForm.classList.remove('hidden');
                        itSuccess.classList.add('hidden');
                    }, 500);
                }, 2000);
            }
        }

    } catch (error) {
        console.error('Form gönderim hatası:', error);
        showToast({
            type: 'error',
            title: 'Gönderim Başarısız Oldu',
            message: 'Talebiniz iletilemedi. Lütfen WhatsApp veya +90 (212) 873 35 37 numarasından bize doğrudan ulaşın.'
        });
    } finally {
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-80', 'cursor-not-allowed');
            submitBtn.innerHTML = originalBtnHtml;
        }
    }
}



// Sayfa Kaydırıldıkça Elementleri Canlandıran Global Observer
function initScrollReveal() {
    const revealEls = document.querySelectorAll('.reveal-drop, .reveal-pop, .reveal-left, .reveal-right, .reveal-fade');
    if (revealEls.length === 0) return;

    // Eğer IntersectionObserver desteklenmiyorsa hepsini görünür yap
    if (!('IntersectionObserver' in window)) {
        revealEls.forEach(el => el.classList.add('active'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        root: null,
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
}

// Otomatik Kayan Ekranları (Marquee) Sonsuz Döngü İçin Klonlar ve Başlatır
function initMarqueeSliders() {
    const tracks = document.querySelectorAll('#yazilim-track, #it-track, .animate-marquee-right, .animate-marquee-left');
    tracks.forEach(track => {
        // Eğer zaten klonlandıysa tekrar klonlama
        if (track.dataset.cloned === 'true') return;
        track.dataset.cloned = 'true';

        const originalChildren = Array.from(track.children);
        if (originalChildren.length > 0) {
            // Kesintisiz sonsuz kayma için kartları bir kez klonla
            originalChildren.forEach(child => {
                const clone = child.cloneNode(true);
                clone.setAttribute('aria-hidden', 'true');
                track.appendChild(clone);
            });
        }
    });
}

// Tüm sitedeki formları dinleyen global başlatıcı
function initGlobalFormHandler() {
    // 1. Telefon Alanları İçin Otomatik Formatlayıcı (Auto-Mask: 05XX XXX XX XX)
    document.addEventListener('input', function (e) {
        const target = e.target;
        if (target && (target.type === 'tel' || target.name === 'phone' || target.name === 'iletisim-telefon' || target.id?.includes('phone') || target.id?.includes('tel'))) {
            const formatted = formatPhoneNumber(target.value);
            if (target.value !== formatted) {
                target.value = formatted;
            }
        }
    });

    // 2. Mevcut formların inline onsubmit engelleyicilerini temizle, input isimlerini ve hizmet bilgisini bağla
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        ensureServiceInput(form);
        ensureInputNames(form);
        form.onsubmit = function (e) {
            e.preventDefault();
            handleGlobalFormSubmit(form, e);
            return false;
        };
    });

    // 3. Event Delegation (Dinamik ve sonradan DOM'a eklenen formlar için)
    document.addEventListener('submit', function (e) {
        const form = e.target.closest('form');
        if (form) {
            e.preventDefault();
            e.stopPropagation();
            ensureServiceInput(form);
            handleGlobalFormSubmit(form, e);
        }
    }, true);
}

// Bulunulan sayfanın klasör derinliğine göre kök dizin yolunu hesaplar
function getPrefix() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(Boolean);

    // Klasör derinliği hesaplama düzeltmesi (Anasayfa & Alt sayfalar için)
    if (path.endsWith('.html')) {
        segments.pop();
    }

    if (segments.length === 0) return '';
    return '../'.repeat(segments.length);
}

// Mobil Menü ve Akordiyon Aç/Kapat İşlevi (Event Delegation - Anasayfa & Tüm Sayfalar Uyumlu)
function initMobileMenu() {
    document.body.addEventListener('click', function (e) {
        // Mobil Menü Aç Butonuna Tıklandıysa
        const openBtn = e.target.closest('#mobile-menu-btn');
        if (openBtn) {
            e.preventDefault();
            const currentMenu = document.getElementById('mobile-menu');
            if (currentMenu) {
                currentMenu.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
            return;
        }

        // Mobil Menü Kapat (X) Butonuna Tıklandıysa
        const closeBtn = e.target.closest('#mobile-menu-close');
        if (closeBtn) {
            e.preventDefault();
            const currentMenu = document.getElementById('mobile-menu');
            if (currentMenu) {
                currentMenu.classList.add('hidden');
                document.body.style.overflow = '';
            }
            return;
        }

        // Akordiyon Butonlarına Tıklandıysa
        const accBtn = e.target.closest('.mobile-accordion-btn');
        if (accBtn) {
            e.preventDefault();
            const content = accBtn.nextElementSibling;
            const icon = accBtn.querySelector('.acc-icon');

            if (content) {
                content.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        }
    });
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
        /* Mega Menu Geçiş ve Çakışmasız Akıllı Menü Yönetimi */
        .mega-menu {
            visibility: hidden;
            opacity: 0;
            pointer-events: none;
            transform: translateY(6px);
            transition: opacity 0.15s ease, transform 0.15s ease, visibility 0.15s;
            transition-delay: 0s;
        }

        /* Görünmez Hover Köprüsü (Nav Link ile Menü Arasındaki Boşluğu Kapatır) */
        .mega-menu::before {
            content: '';
            position: absolute;
            top: -24px;
            left: -20px;
            right: -20px;
            height: 30px;
            background: transparent;
            pointer-events: auto;
        }

        /* Sadece farenin üzerinde olduğu menü anında ve temiz açılır */
        .group:hover > .mega-menu,
        .mega-menu:hover {
            visibility: visible !important;
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: translateY(0) !important;
            transition: opacity 0.15s ease, transform 0.15s ease, visibility 0s !important;
            transition-delay: 0s !important;
        }

        /* Başka bir menüye geçildiğinde önceki menüyü ANINDA kapat (Çakışmayı önler) */
        .group:not(:hover) > .mega-menu {
            visibility: hidden !important;
            opacity: 0 !important;
            pointer-events: none !important;
            transform: translateY(6px) !important;
            transition: none !important;
        }
        
        #mobile-menu-btn * {
            pointer-events: none;
        }
    </style>

    <!-- 2. ANA HEADER & NAVİGASYON -->
    <div class="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
        <div class="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center h-20 md:h-24">
                
                <!-- SOL: Kompiturk Logo -->
                <div class="flex-shrink-0">
                    <a href="${p}index.html" title="Kompiturk Bilgisayar Anasayfa">
                        <img src="${p}images/komplogo.png" alt="Kompiturk Bilgisayar Logo" class="h-9 w-auto object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\'text-2xl font-black text-brandNavy tracking-tight\'>Kompiturk</span>';" />
                    </a>
                </div>

                <!-- ORTA: Navigasyon Menüsü -->
                <nav class="hidden lg:flex items-center space-x-5 xl:space-x-8 h-full relative" aria-label="Ana Menü">
                     <!-- 3. DİA ERP -->
                    <div class="relative group h-full flex items-center">
                        <a href="${p}dia-erp/dia-yazilim-cozumleri.html" class="flex items-center gap-1 text-[13px] font-bold text-brandRed hover:text-brandNavy nav-link-underline transition-colors uppercase tracking-tight py-4">
                            DİA ERP <i data-lucide="chevron-down" class="w-4 h-4"></i>
                        </a>
                        <div class="absolute top-full left-0 pt-2 mega-menu w-[780px] max-w-[90vw] z-50">
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
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">CRM & Müşteri Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Müşteri ilişkileri, teknik servis</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-surec-yonetimi.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">İş Akış ve Süreç Yönetimi</span>
                                        <span class="text-[11px] text-brandSlate leading-tight">İş akışı ve operasyonel otomasyon</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-e-ticaret-b2b.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">E-Ticaret & B2B &B2C </span>
                                        <span class="text-[11px] text-brandSlate leading-tight">Web mağaza ve bayi paneli</span>
                                    </a>
                                    <a href="${p}dia-erp/dia-e-fatura.html" class="flex flex-col group/dia p-1.5 hover:bg-brandIce/50 rounded-lg transition-all">
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors">E-Belge & E-Dönüşüm</span>
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
                                        <span class="text-[14px] font-bold group-hover/dia:text-brandRed transition-colors"> Mağaza Yönetimi</span>
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
<!-- 1. Yazılım Çözümleri (Mega Dropdown) -->
<div class="relative group h-full flex items-center">
    <a href="${p}cozumler/yazilimcozumleri.html" class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
        Entegre Çözümleri <i data-lucide="chevron-down" class="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform"></i>
    </a>
    <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-[600px] z-50">
        <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl p-6">
            <div class="grid grid-cols-2 grid-rows-5 grid-flow-col gap-x-8 gap-y-4">
                <!-- Sol Sütun (1 - 5) -->
                <!-- 1. Ahtapot Depo Yönetimi -->
                <a href="${p}cozumler/ahtapot-depo-yonetimi.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all border border-transparent hover:border-slate-100">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Ahtapot WMS Depo Yönetimi</span>
                </a>

                <!-- 2. Mobil B2B Bayi Platformu -->
                <a href="${p}cozumler/mobil-b2b-bayi-platformu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Mobil B2B — Bayi Platformu</span>
                </a>

                <!-- 3. Distribütör POS -->
                <a href="${p}cozumler/distributor-pos.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Distribütör POS</span>
                </a>

                <!-- 4. PDKS - Personel Takip Sistemi -->
                <a href="${p}cozumler/pdks.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">PDKS — Personel Takip Sistemi</span>
                </a>

                <!-- 5. XML Hub - XML Entegrasyonu -->
                <a href="${p}cozumler/xml-hub-entegrasyon.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">XML Hub — XML Entegrasyonu</span>
                </a>

                <!-- Sağ Sütun (6 - 10) -->
                <!-- 6. Kargo Entegrasyonu -->
                <a href="${p}cozumler/kargo-entegrasyonu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Kargo Entegrasyonu</span>
                </a>

                <!-- 7. Pazar Yeri Entegrasyonu -->
                <a href="${p}cozumler/pazaryeri-entegrasyonu.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Pazar Yeri Entegrasyonu</span>
                </a>

                <!-- 8. Kalite - Kontrol Arşiv -->
                <a href="${p}cozumler/kalite-kontrol-arsiv.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Kalite — Kontrol Arşiv</span>
                </a>

                <!-- 9. Ozon Kargo Entegrasyonu -->
                <a href="${p}cozumler/ozon-kargo.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Ozon Kargo Entegrasyonu</span>
                </a>

                <!-- 10. Kompiboss (Patron Ekranı) -->
                <a href="${p}cozumler/kompiboss.html" class="group/item flex flex-col hover:bg-brandIce p-2 rounded-lg transition-all">
                    <span class="text-[13px] font-bold group-hover/item:text-brandRed">Kompiboss (Patron Ekranı)</span>
                </a>
            </div>
            <div class="mt-4 pt-3 border-t border-slate-100 flex justify-end">
                <a href="${p}cozumler/yazilimcozumleri.html" class="text-[13px] font-black text-brandRed hover:underline flex items-center gap-1">
                    → TÜM YAZILIM ÇÖZÜMLERİ
                </a>
            </div>
        </div>
    </div>
</div>

                   <!-- 2. IT Altyapı & Destek -->
                   <div class="relative group h-full flex items-center">
                       <a href="${p}it-altyapi/itcozumleri.html" class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
                           IT Çözümleri  <i data-lucide="chevron-down" class="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform"></i>
                       </a>

                       <div class="absolute top-full left-1/2 -translate-x-1/2 pt-2 mega-menu w-64 z-50">
                           <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl py-3 px-2">
                               <a href="${p}it-altyapi/sunucu-kurulumu.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Sunucu Kurulumu</a>
                               <a href="${p}it-altyapi/guvenlik-duvari.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Güvenlik Duvarı</a>
                               <a href="${p}it-altyapi/yedekleme-cozumleri.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Yedekleme Çözümleri</a>
                               <a href="${p}it-altyapi/ag-altyapisi.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Ağ Altyapısı</a>
                               <a href="${p}it-altyapi/yazilim-lisanslama.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Yazılım Lisanslama</a>
                               <a href="${p}it-altyapi/hosting-domain.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Hosting & Domain</a>
                               <a href="${p}it-altyapi/bilgisayar-yazici-kiralama.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Bilgisayar & Yazıcı Kiralama</a>
                               <a href="${p}it-altyapi/donanim-destegi.html" class="block px-4 py-2 text-sm font-bold text-brandNavy hover:bg-brandIce hover:text-brandRed rounded-lg transition-all">Donanım Desteği</a>
                               
                               <div class="mt-2 pt-2 border-t border-slate-100 px-4">
                                   <a href="${p}it-altyapi/itcozumleri.html" class="text-[12px] font-black text-brandRed hover:underline flex items-center justify-end gap-1">
                                       Diğer IT Altyapı Çözümleri →
                                   </a>
                               </div>
                           </div>
                       </div>
                   </div>
<!-- 1. Diğer Çözümler (Mega Dropdown) -->
<div class="relative group h-full flex items-center">
    <!-- Menü Başlığı -->
    <a href="${p}index.html#diger-cozumler" class="flex items-center gap-1 text-[13px] font-bold text-brandNavy hover:text-brandRed nav-link-underline transition-colors uppercase tracking-tight py-4">
        Diğer Çözümler <i data-lucide="chevron-down" class="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform"></i>
    </a>

    <!-- Açılır Kutu (Dropdown) -->
    <div class="absolute top-full right-0 pt-2 mega-menu w-72 z-50">
        <div class="bg-white border border-slate-100 shadow-2xl rounded-2xl p-4">
            <div class="flex flex-col gap-y-1">
                
                <!-- ÖDÜYO -->
                <a href="${p}index.html#diger-cozumler" class="group/item flex flex-col hover:bg-brandIce p-3 rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <span class="text-[13px] font-bold text-brandNavy group-hover/item:text-brandRed">ÖDÜYO</span>
                </a>

                <!-- ENTEGRA -->
                <a href="${p}index.html#diger-cozumler" class="group/item flex flex-col hover:bg-brandIce p-3 rounded-xl transition-all border border-transparent hover:border-slate-100">
                    <span class="text-[13px] font-bold text-brandNavy group-hover/item:text-brandRed">ENTEGRA</span>
                </a>

            </div>
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
                                <a href="${p}kurumsal/hakkimizda.html" target ="_blank" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="info" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Hakkımızda</span>
                                </a>
                                <a href="${p}kurumsal/haberler.html" target ="_blank" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="newspaper" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Haberler</span>
                                </a>
                                <a href="${p}kurumsal/S.S.S.html" target ="_blank" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
                                    <i data-lucide="help-circle" class="w-4 h-4 text-brandSlate group-hover/sub:text-brandRed"></i>
                                    <span class="text-sm font-bold">Sıkça Sorulan Sorular </span>
                                </a>
                                <a href="${p}kurumsal/blog.html" target ="_blank" class="flex items-center gap-3 px-4 py-2.5 hover:bg-brandIce rounded-lg group/sub">
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
                <button id="mobile-menu-btn" type="button" class="lg:hidden p-2 text-brandNavy focus:outline-none cursor-pointer">
                    <i data-lucide="menu" class="w-8 h-8 pointer-events-none"></i>
                </button>
            </div>
        </div>

        <!-- DİA TARZI TAM EKRAN MOBİL MENÜ DRAWER -->
        <div id="mobile-menu" class="hidden lg:hidden fixed inset-0 z-[99999] bg-[#F8FAFC] flex flex-col h-screen w-screen overflow-y-auto">
            
            <!-- MAVİ TOP BAR (MENU BAŞLIĞI VE X BUTONU) -->
            <div class="bg-brandRed text-white px-5 py-4 flex justify-between items-center shadow-md sticky top-0 z-10">
                <span class="text-xl font-extrabold tracking-wider uppercase">MENU</span>
                <button id="mobile-menu-close" type="button" class="text-white hover:opacity-80 transition-opacity p-1">
                    <i data-lucide="x" class="w-7 h-7"></i>
                </button>
            </div>

            <!-- LİNKLER VE AKORDİYON ALANI -->
            <div class="flex-1 px-4 py-4 space-y-1">
                
                <!-- 1. Yazılım Çözümleri -->
                <div class="border-b border-slate-200/80">
                    <button type="button" class="mobile-accordion-btn w-full py-3.5 px-2 flex justify-between items-center text-[#245BA7] font-bold text-base hover:bg-slate-100/50 rounded-lg">
                        <span>Çözümler</span>
                        <i data-lucide="chevron-down" class="acc-icon w-5 h-5 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden pl-4 pb-3 space-y-2 text-sm font-semibold text-slate-600">
                        <a href="${p}cozumler/pazaryeri-entegrasyonu.html" class="block py-1.5 hover:text-brandRed">Pazar Yeri Entegrasyonu</a>
                        <a href="${p}cozumler/xml-hub-entegrasyon.html" class="block py-1.5 hover:text-brandRed">XML Hub Entegrasyonu</a>
                        <a href="${p}cozumler/mobil-b2b-bayi-platformu.html" class="block py-1.5 hover:text-brandRed">Mobil B2B Bayi Platformu</a>
                        <a href="${p}cozumler/ahtapot-depo-yonetimi.html" class="block py-1.5 hover:text-brandRed">Ahtapot Depo Yönetimi</a>
                        <a href="${p}cozumler/net-tahsilat.html" class="block py-1.5 hover:text-brandRed">Sanal POS</a>
                        <a href="${p}cozumler/distributor-pos.html" class="block py-1.5 hover:text-brandRed">Distribütör POS</a>
                        <a href="${p}cozumler/yazilimcozumleri.html" class="block py-1.5 font-bold text-brandRed">Tüm Yazılım Çözümleri →</a>
                    </div>
                </div>

                <!-- 2. DİA ERP -->
                <div class="border-b border-slate-200/80">
                    <button type="button" class="mobile-accordion-btn w-full py-3.5 px-2 flex justify-between items-center text-[#245BA7] font-bold text-base hover:bg-slate-100/50 rounded-lg">
                        <span>DİA ERP Modülleri</span>
                        <i data-lucide="chevron-down" class="acc-icon w-5 h-5 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden pl-4 pb-3 space-y-2 text-sm font-semibold text-slate-600">
                        <a href="${p}dia-erp/dia-on-muhasebe.html" class="block py-1.5 hover:text-brandRed">Ön Muhasebe</a>
                        <a href="${p}dia-erp/dia-stok-depo.html" class="block py-1.5 hover:text-brandRed">Stok & Depo Yönetimi</a>
                        <a href="${p}dia-erp/dia-mobil-saha-satis.html" class="block py-1.5 hover:text-brandRed">Mobil Saha Satış</a>
                        <a href="${p}dia-erp/dia-e-fatura.html" class="block py-1.5 hover:text-brandRed">e-Fatura & e-İrsaliye</a>
                        <a href="${p}dia-erp/dia-yazilim-cozumleri.html" class="block py-1.5 font-bold text-brandRed">Tüm DİA ERP Çözümleri →</a>
                    </div>
                </div>

                <!-- 3. IT Altyapı -->
                <div class="border-b border-slate-200/80">
                    <button type="button" class="mobile-accordion-btn w-full py-3.5 px-2 flex justify-between items-center text-[#245BA7] font-bold text-base hover:bg-slate-100/50 rounded-lg">
                        <span>IT Altyapı</span>
                        <i data-lucide="chevron-down" class="acc-icon w-5 h-5 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden pl-4 pb-3 space-y-2 text-sm font-semibold text-slate-600">
                        <a href="${p}it-altyapi/sunucu-kurulumu.html" class="block py-1.5 hover:text-brandRed">Sunucu Kurulumu</a>
                        <a href="${p}it-altyapi/guvenlik-duvari.html" class="block py-1.5 hover:text-brandRed">Güvenlik Duvarı</a>
                        <a href="${p}it-altyapi/yedekleme-cozumleri.html" class="block py-1.5 hover:text-brandRed">Yedekleme Çözümleri</a>
                        <a href="${p}it-altyapi/itcozumleri.html" class="block py-1.5 font-bold text-brandRed">Tüm IT Çözümleri →</a>
                    </div>
                </div>

                <!-- 4. Kurumsal -->
                <div class="border-b border-slate-200/80">
                    <button type="button" class="mobile-accordion-btn w-full py-3.5 px-2 flex justify-between items-center text-[#245BA7] font-bold text-base hover:bg-slate-100/50 rounded-lg">
                        <span>Kurumsal</span>
                        <i data-lucide="chevron-down" class="acc-icon w-5 h-5 transition-transform duration-200"></i>
                    </button>
                    <div class="hidden pl-4 pb-3 space-y-2 text-sm font-semibold text-slate-600">
                        <a href="${p}kurumsal/hakkimizda.html" class="block py-1.5 hover:text-brandRed">Hakkımızda</a>
                        <a href="${p}kurumsal/haberler.html" class="block py-1.5 hover:text-brandRed">Haberler</a>
                        <a href="${p}kurumsal/S.S.S.html" class="block py-1.5 hover:text-brandRed">S.S.S.</a>
                        <a href="${p}kurumsal/blog.html" class="block py-1.5 hover:text-brandRed">Blog & Rehberler</a>
                    </div>
                </div>

                <!-- 5. İletişim -->
                <div class="border-b border-slate-200/80">
                    <a href="${p}iletisim/iletisim.html" class="block py-3.5 px-2 text-[#245BA7] font-bold text-base hover:bg-slate-100/50 rounded-lg">
                        İletişim
                    </a>
                </div>

                <div class="pt-6">
                    <a href="https://wa.me/902128733537" target="_blank" class="block w-full text-center bg-[#E77F18] hover:bg-[#d67211] text-white font-extrabold text-base py-3.5 rounded-xl shadow-md transition-all">
                        Ücretsiz Demo İsteyin
                    </a>
                </div>
            </div>

            <div class="p-4 bg-white border-t border-slate-200 sticky bottom-0">
                <a href="tel:+902128733537" class="flex items-center justify-center gap-2 w-full bg-[#DC2626] hover:bg-red-700 text-white font-bold text-sm py-3 rounded-xl shadow-lg transition-all">
                    <i data-lucide="phone-call" class="w-4 h-4"></i>
                    Bizi Arayın: +90 (212) 873 35 37
                </a>
            </div>
        </div>
    </div>
  </header>
  `;

    const headerElement = document.getElementById('global-header');
    if (headerElement) {
        headerElement.innerHTML = headerHTML;

        if (typeof lucide !== 'undefined' && lucide.createIcons) {
            lucide.createIcons();
        }

        initMobileMenu();
    }
}

// Footer'ı Yükleyen Fonksiyon (Birebir İlk Verdiğin Orijinal Kod)
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
                        <a href="${p}index.html" title="Kompiturk Bilgisayar Anasayfa">
                            <img src="${p}images/komplogo.png" alt="Kompiturk Bilgisayar Logo" class="h-9 w-auto object-contain" onerror="this.onerror=null; this.parentElement.innerHTML='<span class=\'text-2xl font-black text-white tracking-tight\'>Kompiturk</span>';" />
                        </a>
                        <div class="w-px h-6 bg-slate-700 hidden sm:block"></div>
                        <div class="px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 flex items-center justify-center">
                            <img src="${p}images/dialogo.svg" alt="DİA ERP Yetkili Çözüm Ortağı Logo" class="h-6 w-auto object-contain" />
                        </div>
                    </div>

                    <!-- Kurumsal Tanım Metni -->
                    <p class="text-sm text-slate-400 font-normal leading-relaxed max-w-md">
                        Kompiturk Bilgisayar; DİA ERP İstanbul Yetkili Çözüm Ortağı ve 13+ yerli B2B yazılım geliştiricisi olarak işletmelerin dijital altyapısını güçlendirir.
                    </p>

                    <!-- Sosyal Medya İkon Kutuları -->
                    <div class="flex items-center gap-3 pt-2">
                        <!-- LinkedIn -->
                        <a href="https://www.linkedin.com/company/kompit%C3%BCrk-bilgisayar/?originalSubdomain=tr" target="_blank" rel="noopener" aria-label="LinkedIn Profili" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#245BA7] hover:text-white hover:border-[#245BA7] flex items-center justify-center transition-all">
                            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.78a1.63 1.63 0 1 0 0 3.26 1.63 1.63 0 0 0 0-3.26z"/>
                            </svg>
                        </a>

                        <!-- Instagram -->
                        <a href="https://www.instagram.com/kompiturk/" target="_blank" rel="noopener" aria-label="Instagram Profili" class="w-10 h-10 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] flex items-center justify-center transition-all">
                            <svg class="w-4 h-4 fill-none stroke-current stroke-2 stroke-round join-round" viewBox="0 0 24 24">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
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
                        <li><a href="${p}cozumler/net-tahsilat.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Sanal POS</a></li>
                        <li><a href="${p}cozumler/xml-hub-entegrasyon.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">XML Hub Veri Bağlantısı</a></li>
                        <li><a href="${p}cozumler/pdks.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">PDKS Personel Takip</a></li>
                        <li>
                            <a href="${p}cozumler/yazilimcozumleri.html" class="text-[13px] font-black text-white hover:underline flex items-center gap-1 pt-1">
                                → TÜM YAZILIM ÇÖZÜMLERİ
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- KOLON 3: DİA ERP MODÜLLERİ -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#245BA7] pl-3">
                        DİA ERP Modülleri
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}dia-erp/dia-on-muhasebe.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Ön Muhasebe</a></li>
                        <li><a href="${p}dia-erp/dia-e-fatura.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">e-Fatura & e-İrsaliye</a></li>
                        <li><a href="${p}dia-erp/dia-stok-depo.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Stok & Depo Yönetimi</a></li>
                        <li><a href="${p}dia-erp/dia-genel-muhasebe.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Genel Muhasebe</a></li>
                        <li><a href="${p}dia-erp/dia-mobil-saha-satis.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Mobil Saha Satış</a></li>
                        <li><a href="${p}dia-erp/dia-crm-servis.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">CRM & Servis Yönetimi</a></li>
                        <li>
                            <a href="${p}dia-erp/dia-yazilim-cozumleri.html" class="text-[13px] font-black text-white hover:underline flex items-center gap-1 pt-1">
                                → DİA ERP HAKKINDA DETAYLI BİLGİ
                            </a>
                        </li>
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
                        <li>
                            <a href="${p}it-altyapi/itcozumleri.html" class="text-[13px] font-black text-white hover:underline flex items-center gap-1 pt-1">
                                → IT & ALTYAPI HAKKINDA DETAYLI BİLGİ 
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- KOLON 5: KURUMSAL -->
                <div class="space-y-4">
                    <h3 class="text-xs font-black uppercase tracking-wider text-white border-l-2 border-[#E77F18] pl-3">
                        Kurumsal
                    </h3>
                    <ul class="space-y-2.5 text-xs sm:text-sm text-slate-400">
                        <li><a href="${p}kurumsal/hakkimizda.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Hakkımızda</a></li>
                        <li><a href="${p}kurumsal/S.S.S.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">S.S.S. (Sıkça Sorulanlar)</a></li>
                        <li><a href="${p}kurumsal/blog.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">Blog & Rehberler</a></li>
                        <li><a href="${p}iletisim/iletisim.html" class="hover:text-white hover:translate-x-1 transition-all inline-block">İletişim</a></li>
                    </ul>
                </div>

            </div>

            <!-- SUB-FOOTER / YASAL BANT VE TELİF -->
            <div class="border-t border-slate-800/80 pt-8 mt-12 w-full flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-400 text-center md:text-left">
                <div>
                    © 2026 <span class="font-bold text-slate-300">Kompiturk Bilgisayar</span>. Tüm Hakları Saklıdır. DİA ERP İstanbul Yetkili Çözüm Ortağı.
                </div>
                
                <div class="flex flex-wrap justify-center gap-3 sm:gap-6 text-slate-400">
                    <a href="${p}kurumsal/kvkk-aydinlatma-metni.html" class="hover:text-white hover:underline transition-colors">KVKK Aydınlatma Metni</a>
                    <span>•</span>
                    <a href="${p}kurumsal/gizlilik-politikasi.html" class="hover:text-white hover:underline transition-colors">Gizlilik Politikası</a>
                    <span>•</span>
                    <a href="${p}kurumsal/cerez-politikasi.html" class="hover:text-white hover:underline transition-colors">Çerez Politikası</a>
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