/**
 * Kompiturk IT Çözümleri - Ortak Canlı Temas & Teklif Modalı
 * Tüm IT sayfalarında dinamik başlık ve Tailwind uyumlu arayüz sunar.
 */

(function () {
    // 1. Sayfa Başlığını ve Bulunulan Hizmeti Dinamik Algıla
    const pageTitle = document.title || "IT Altyapı Çözümleri";
    const h1Heading = document.querySelector('h1')?.innerText || "IT Altyapı Çözümlerimiz";

    // 2. Widget HTML Yapısını Dinamik Oluştur
    const widgetHTML = `
        <!-- Floating Tetikleyici Buton -->
        <div id="it-cta-floating-btn" class="fixed bottom-6 right-6 z-50 transition-all duration-500 transform translate-y-20 opacity-0">
            <button onclick="toggleItModal(true)" class="flex items-center gap-3 bg-[#245BA7] hover:bg-blue-700 text-white font-bold py-3.5 px-5 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-all group">
                <span class="relative flex h-3 w-3">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span class="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                </span>
                <span class="text-xs sm:text-sm font-semibold tracking-wide">Hızlı IT Keşfi & Teklif Al</span>
                <i data-lucide="message-square-plus" class="w-5 h-5 group-hover:rotate-12 transition-transform"></i>
            </button>
        </div>

        <!-- Pop-up Modal Yapısı -->
        <div id="it-cta-modal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-300">
            <div class="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-100 relative transform scale-95 transition-all duration-300" id="it-cta-modal-card">
                
                <!-- Kapatma Butonu -->
                <button onclick="toggleItModal(false)" class="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors">
                    <i data-lucide="x" class="w-5 h-5"></i>
                </button>

                <!-- Header -->
                <div class="space-y-2 mb-6">
                    <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#245BA7] text-xs font-bold uppercase tracking-wider">
                        <i data-lucide="shield-check" class="w-3.5 h-3.5"></i>
                        <span>Kompiturk Uzman Desteği</span>
                    </div>
                    <h3 class="text-xl font-extrabold text-slate-900 tracking-tight" id="it-modal-dynamic-title">
                        ${h1Heading} İçin Ücretsiz Keşif
                    </h3>
                    <p class="text-xs sm:text-sm text-slate-500">
                        Şirketinizin ihtiyaçlarına özel çözüm ve fiyat teklifini 15 dakika içinde hazırlayalım.
                    </p>
                </div>

                <!-- Form -->
                <form id="it-cta-form" onsubmit="handleItFormSubmit(event)" class="space-y-4">
                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Ad Soyad / Firma Adı *</label>
                        <input type="text" required placeholder="Ahmet Yılmaz - XYZ Lojistik" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#245BA7] focus:ring-2 focus:ring-[#245BA7]/20 transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Telefon Numarası *</label>
                        <input type="tel" required placeholder="05XX XXX XX XX" class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#245BA7] focus:ring-2 focus:ring-[#245BA7]/20 transition-all">
                    </div>

                    <div>
                        <label class="block text-xs font-bold text-slate-700 mb-1">Talep Özeti (İsteğe Bağlı)</label>
                        <textarea rows="2" placeholder="Örn: 20 kullanıcılı sunucu kurulumu ve yedekleme desteği..." class="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:border-[#245BA7] focus:ring-2 focus:ring-[#245BA7]/20 transition-all resize-none"></textarea>
                    </div>

                    <button type="submit" class="w-full bg-[#245BA7] hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:shadow-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                        <span>Ücretsiz Danışmanlık ve Teklif İsteyin</span>
                        <i data-lucide="send" class="w-4 h-4"></i>
                    </button>
                </form>

                <!-- Başarı Mesajı (Form Gönderilince) -->
                <div id="it-cta-success" class="hidden text-center py-8 space-y-3">
                    <div class="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                        <i data-lucide="check-circle" class="w-6 h-6"></i>
                    </div>
                    <h4 class="text-lg font-bold text-slate-900">Talebiniz Alındı!</h4>
                    <p class="text-xs text-slate-500">IT uzmanlarımız en kısa sürede sizinle iletişime geçecektir.</p>
                </div>

            </div>
        </div>
    `;

    // 3. HTML Gövdesine Ekle
    document.body.insertAdjacentHTML('beforeend', widgetHTML);

    // 4. Lucide İkonlarını Yeniden Başlat (Varsa)
    if (window.lucide) {
        lucide.createIcons();
    }

    // 5. Belirli Bir Süre veya Scroll Sonrası Tetikle
    setTimeout(() => {
        const btn = document.getElementById('it-cta-floating-btn');
        if (btn) {
            btn.classList.remove('translate-y-20', 'opacity-0');
        }
    }, 3000); // Sayfa açıldıktan 3 saniye sonra buton görünür
})();

// Modal Aç/Kapa Fonksiyonu
function toggleItModal(show) {
    const modal = document.getElementById('it-cta-modal');
    const card = document.getElementById('it-cta-modal-card');

    if (show) {
        modal.classList.remove('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-95');
        card.classList.add('scale-100');
    } else {
        modal.classList.add('opacity-0', 'pointer-events-none');
        card.classList.remove('scale-100');
        card.classList.add('scale-95');
    }
}

// Form Gönderim Yönetimi
function handleItFormSubmit(e) {
    e.preventDefault();
    document.getElementById('it-cta-form').classList.add('hidden');
    document.getElementById('it-cta-success').classList.remove('hidden');

    setTimeout(() => {
        toggleItModal(false);
        // Formu sıfırla
        setTimeout(() => {
            document.getElementById('it-cta-form').reset();
            document.getElementById('it-cta-form').classList.remove('hidden');
            document.getElementById('it-cta-success').classList.add('hidden');
        }, 500);
    }, 2500);
}