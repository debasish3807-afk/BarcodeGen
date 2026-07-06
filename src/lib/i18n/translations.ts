// ======================
// i18n Translations
// ======================

export type Locale =
  | "en" | "hi" | "bn" | "es" | "fr" | "de" | "pt" | "ru"
  | "ar" | "zh" | "ja" | "ko" | "it" | "tr" | "vi" | "th"
  | "id" | "ms" | "nl" | "pl";

export interface TranslationMap {
  nav: { home: string; features: string; barcodeGenerator: string; qrGenerator: string; batchGenerator: string; templates: string; scanner: string; blog: string; faq: string; contact: string; };
  hero: { title: string; subtitle: string; cta1: string; cta2: string; };
  common: { generate: string; download: string; copy: string; reset: string; search: string; share: string; print: string; loading: string; success: string; error: string; };
  footer: { rights: string; privacy: string; terms: string; };
}

export const DEFAULT_LOCALE: Locale = "en";


export const TRANSLATIONS: Record<Locale, TranslationMap> = {
  en: {
    nav: { home: "Home", features: "Features", barcodeGenerator: "Barcode Generator", qrGenerator: "QR Generator", batchGenerator: "Batch Generator", templates: "Templates", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Contact" },
    hero: { title: "Generate Barcodes & QR Codes Instantly", subtitle: "The most powerful free barcode generator supporting 30+ formats.", cta1: "Generate Barcode", cta2: "Create QR Code" },
    common: { generate: "Generate", download: "Download", copy: "Copy", reset: "Reset", search: "Search", share: "Share", print: "Print", loading: "Loading...", success: "Success", error: "Error" },
    footer: { rights: "All rights reserved", privacy: "Privacy Policy", terms: "Terms of Service" },
  },
  hi: {
    nav: { home: "होम", features: "विशेषताएं", barcodeGenerator: "बारकोड जनरेटर", qrGenerator: "QR जनरेटर", batchGenerator: "बैच जनरेटर", templates: "टेम्पलेट", scanner: "स्कैनर", blog: "ब्लॉग", faq: "FAQ", contact: "संपर्क" },
    hero: { title: "तुरंत बारकोड और QR कोड जनरेट करें", subtitle: "30+ प्रारूपों का समर्थन करने वाला सबसे शक्तिशाली मुफ्त बारकोड जनरेटर।", cta1: "बारकोड बनाएं", cta2: "QR कोड बनाएं" },
    common: { generate: "जनरेट करें", download: "डाउनलोड", copy: "कॉपी", reset: "रीसेट", search: "खोजें", share: "शेयर", print: "प्रिंट", loading: "लोड हो रहा है...", success: "सफल", error: "त्रुटि" },
    footer: { rights: "सर्वाधिकार सुरक्षित", privacy: "गोपनीयता नीति", terms: "सेवा की शर्तें" },
  },
  bn: {
    nav: { home: "হোম", features: "বৈশিষ্ট্য", barcodeGenerator: "বারকোড জেনারেটর", qrGenerator: "QR জেনারেটর", batchGenerator: "ব্যাচ জেনারেটর", templates: "টেমপ্লেট", scanner: "স্ক্যানার", blog: "ব্লগ", faq: "FAQ", contact: "যোগাযোগ" },
    hero: { title: "তাৎক্ষণিকভাবে বারকোড এবং QR কোড তৈরি করুন", subtitle: "30+ ফরম্যাট সমর্থনকারী সবচেয়ে শক্তিশালী বিনামূল্যে বারকোড জেনারেটর।", cta1: "বারকোড তৈরি করুন", cta2: "QR কোড তৈরি করুন" },
    common: { generate: "তৈরি করুন", download: "ডাউনলোড", copy: "কপি", reset: "রিসেট", search: "খুঁজুন", share: "শেয়ার", print: "প্রিন্ট", loading: "লোড হচ্ছে...", success: "সফল", error: "ত্রুটি" },
    footer: { rights: "সর্বস্বত্ব সংরক্ষিত", privacy: "গোপনীয়তা নীতি", terms: "সেবার শর্তাবলী" },
  },

  es: {
    nav: { home: "Inicio", features: "Características", barcodeGenerator: "Generador de Códigos de Barras", qrGenerator: "Generador QR", batchGenerator: "Generador por Lotes", templates: "Plantillas", scanner: "Escáner", blog: "Blog", faq: "FAQ", contact: "Contacto" },
    hero: { title: "Genera Códigos de Barras y QR al Instante", subtitle: "El generador de códigos de barras gratuito más potente con 30+ formatos.", cta1: "Generar Código de Barras", cta2: "Crear Código QR" },
    common: { generate: "Generar", download: "Descargar", copy: "Copiar", reset: "Restablecer", search: "Buscar", share: "Compartir", print: "Imprimir", loading: "Cargando...", success: "Éxito", error: "Error" },
    footer: { rights: "Todos los derechos reservados", privacy: "Política de Privacidad", terms: "Términos de Servicio" },
  },
  fr: {
    nav: { home: "Accueil", features: "Fonctionnalités", barcodeGenerator: "Générateur de Codes-Barres", qrGenerator: "Générateur QR", batchGenerator: "Générateur par Lots", templates: "Modèles", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Contact" },
    hero: { title: "Générez des Codes-Barres et QR Instantanément", subtitle: "Le générateur de codes-barres gratuit le plus puissant avec 30+ formats.", cta1: "Générer un Code-Barres", cta2: "Créer un Code QR" },
    common: { generate: "Générer", download: "Télécharger", copy: "Copier", reset: "Réinitialiser", search: "Rechercher", share: "Partager", print: "Imprimer", loading: "Chargement...", success: "Succès", error: "Erreur" },
    footer: { rights: "Tous droits réservés", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation" },
  },
  de: {
    nav: { home: "Startseite", features: "Funktionen", barcodeGenerator: "Barcode-Generator", qrGenerator: "QR-Generator", batchGenerator: "Batch-Generator", templates: "Vorlagen", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Kontakt" },
    hero: { title: "Barcodes & QR-Codes Sofort Generieren", subtitle: "Der leistungsstärkste kostenlose Barcode-Generator mit 30+ Formaten.", cta1: "Barcode Generieren", cta2: "QR-Code Erstellen" },
    common: { generate: "Generieren", download: "Herunterladen", copy: "Kopieren", reset: "Zurücksetzen", search: "Suchen", share: "Teilen", print: "Drucken", loading: "Laden...", success: "Erfolg", error: "Fehler" },
    footer: { rights: "Alle Rechte vorbehalten", privacy: "Datenschutzrichtlinie", terms: "Nutzungsbedingungen" },
  },
  pt: {
    nav: { home: "Início", features: "Recursos", barcodeGenerator: "Gerador de Código de Barras", qrGenerator: "Gerador QR", batchGenerator: "Gerador em Lote", templates: "Modelos", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Contato" },
    hero: { title: "Gere Códigos de Barras e QR Instantaneamente", subtitle: "O gerador de códigos de barras gratuito mais poderoso com 30+ formatos.", cta1: "Gerar Código de Barras", cta2: "Criar Código QR" },
    common: { generate: "Gerar", download: "Baixar", copy: "Copiar", reset: "Redefinir", search: "Pesquisar", share: "Compartilhar", print: "Imprimir", loading: "Carregando...", success: "Sucesso", error: "Erro" },
    footer: { rights: "Todos os direitos reservados", privacy: "Política de Privacidade", terms: "Termos de Serviço" },
  },

  ru: {
    nav: { home: "Главная", features: "Возможности", barcodeGenerator: "Генератор Штрих-кодов", qrGenerator: "Генератор QR", batchGenerator: "Пакетный Генератор", templates: "Шаблоны", scanner: "Сканер", blog: "Блог", faq: "FAQ", contact: "Контакт" },
    hero: { title: "Генерируйте Штрих-коды и QR-коды Мгновенно", subtitle: "Самый мощный бесплатный генератор штрих-кодов с 30+ форматами.", cta1: "Создать Штрих-код", cta2: "Создать QR-код" },
    common: { generate: "Создать", download: "Скачать", copy: "Копировать", reset: "Сбросить", search: "Поиск", share: "Поделиться", print: "Печать", loading: "Загрузка...", success: "Успех", error: "Ошибка" },
    footer: { rights: "Все права защищены", privacy: "Политика Конфиденциальности", terms: "Условия Использования" },
  },
  ar: {
    nav: { home: "الرئيسية", features: "المميزات", barcodeGenerator: "مولد الباركود", qrGenerator: "مولد QR", batchGenerator: "مولد دفعي", templates: "القوالب", scanner: "الماسح", blog: "المدونة", faq: "الأسئلة", contact: "اتصل بنا" },
    hero: { title: "أنشئ الباركود ورموز QR فوراً", subtitle: "أقوى مولد باركود مجاني يدعم أكثر من 30 تنسيقاً.", cta1: "إنشاء باركود", cta2: "إنشاء رمز QR" },
    common: { generate: "إنشاء", download: "تحميل", copy: "نسخ", reset: "إعادة تعيين", search: "بحث", share: "مشاركة", print: "طباعة", loading: "جاري التحميل...", success: "نجاح", error: "خطأ" },
    footer: { rights: "جميع الحقوق محفوظة", privacy: "سياسة الخصوصية", terms: "شروط الخدمة" },
  },
  zh: {
    nav: { home: "首页", features: "功能", barcodeGenerator: "条码生成器", qrGenerator: "二维码生成器", batchGenerator: "批量生成器", templates: "模板", scanner: "扫描器", blog: "博客", faq: "常见问题", contact: "联系我们" },
    hero: { title: "即时生成条形码和二维码", subtitle: "最强大的免费条码生成器，支持30+格式。", cta1: "生成条形码", cta2: "创建二维码" },
    common: { generate: "生成", download: "下载", copy: "复制", reset: "重置", search: "搜索", share: "分享", print: "打印", loading: "加载中...", success: "成功", error: "错误" },
    footer: { rights: "版权所有", privacy: "隐私政策", terms: "服务条款" },
  },
  ja: {
    nav: { home: "ホーム", features: "機能", barcodeGenerator: "バーコード生成", qrGenerator: "QR生成", batchGenerator: "バッチ生成", templates: "テンプレート", scanner: "スキャナー", blog: "ブログ", faq: "FAQ", contact: "お問い合わせ" },
    hero: { title: "バーコードとQRコードを即座に生成", subtitle: "30以上のフォーマットをサポートする最も強力な無料バーコード生成ツール。", cta1: "バーコード生成", cta2: "QRコード作成" },
    common: { generate: "生成", download: "ダウンロード", copy: "コピー", reset: "リセット", search: "検索", share: "共有", print: "印刷", loading: "読み込み中...", success: "成功", error: "エラー" },
    footer: { rights: "全著作権所有", privacy: "プライバシーポリシー", terms: "利用規約" },
  },
  ko: {
    nav: { home: "홈", features: "기능", barcodeGenerator: "바코드 생성기", qrGenerator: "QR 생성기", batchGenerator: "일괄 생성기", templates: "템플릿", scanner: "스캐너", blog: "블로그", faq: "FAQ", contact: "문의" },
    hero: { title: "바코드와 QR 코드를 즉시 생성하세요", subtitle: "30개 이상의 형식을 지원하는 가장 강력한 무료 바코드 생성기.", cta1: "바코드 생성", cta2: "QR 코드 생성" },
    common: { generate: "생성", download: "다운로드", copy: "복사", reset: "초기화", search: "검색", share: "공유", print: "인쇄", loading: "로딩 중...", success: "성공", error: "오류" },
    footer: { rights: "모든 권리 보유", privacy: "개인정보 보호정책", terms: "이용약관" },
  },

  it: {
    nav: { home: "Home", features: "Funzionalità", barcodeGenerator: "Generatore Codici a Barre", qrGenerator: "Generatore QR", batchGenerator: "Generatore Batch", templates: "Modelli", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Contatto" },
    hero: { title: "Genera Codici a Barre e QR Istantaneamente", subtitle: "Il più potente generatore gratuito con 30+ formati.", cta1: "Genera Codice a Barre", cta2: "Crea Codice QR" },
    common: { generate: "Genera", download: "Scarica", copy: "Copia", reset: "Resetta", search: "Cerca", share: "Condividi", print: "Stampa", loading: "Caricamento...", success: "Successo", error: "Errore" },
    footer: { rights: "Tutti i diritti riservati", privacy: "Informativa Privacy", terms: "Termini di Servizio" },
  },
  tr: {
    nav: { home: "Ana Sayfa", features: "Özellikler", barcodeGenerator: "Barkod Oluşturucu", qrGenerator: "QR Oluşturucu", batchGenerator: "Toplu Oluşturucu", templates: "Şablonlar", scanner: "Tarayıcı", blog: "Blog", faq: "SSS", contact: "İletişim" },
    hero: { title: "Anında Barkod ve QR Kod Oluşturun", subtitle: "30+ formatı destekleyen en güçlü ücretsiz barkod oluşturucu.", cta1: "Barkod Oluştur", cta2: "QR Kod Oluştur" },
    common: { generate: "Oluştur", download: "İndir", copy: "Kopyala", reset: "Sıfırla", search: "Ara", share: "Paylaş", print: "Yazdır", loading: "Yükleniyor...", success: "Başarılı", error: "Hata" },
    footer: { rights: "Tüm hakları saklıdır", privacy: "Gizlilik Politikası", terms: "Hizmet Şartları" },
  },
  vi: {
    nav: { home: "Trang chủ", features: "Tính năng", barcodeGenerator: "Tạo Mã vạch", qrGenerator: "Tạo QR", batchGenerator: "Tạo Hàng loạt", templates: "Mẫu", scanner: "Quét", blog: "Blog", faq: "FAQ", contact: "Liên hệ" },
    hero: { title: "Tạo Mã vạch & QR Code Ngay lập tức", subtitle: "Trình tạo mã vạch miễn phí mạnh nhất hỗ trợ 30+ định dạng.", cta1: "Tạo Mã vạch", cta2: "Tạo Mã QR" },
    common: { generate: "Tạo", download: "Tải xuống", copy: "Sao chép", reset: "Đặt lại", search: "Tìm kiếm", share: "Chia sẻ", print: "In", loading: "Đang tải...", success: "Thành công", error: "Lỗi" },
    footer: { rights: "Mọi quyền được bảo lưu", privacy: "Chính sách Bảo mật", terms: "Điều khoản Dịch vụ" },
  },
  th: {
    nav: { home: "หน้าแรก", features: "คุณสมบัติ", barcodeGenerator: "ตัวสร้างบาร์โค้ด", qrGenerator: "ตัวสร้าง QR", batchGenerator: "สร้างชุด", templates: "เทมเพลต", scanner: "สแกนเนอร์", blog: "บล็อก", faq: "FAQ", contact: "ติดต่อ" },
    hero: { title: "สร้างบาร์โค้ดและ QR Code ทันที", subtitle: "ตัวสร้างบาร์โค้ดฟรีที่ทรงพลังที่สุดรองรับมากกว่า 30 รูปแบบ", cta1: "สร้างบาร์โค้ด", cta2: "สร้าง QR Code" },
    common: { generate: "สร้าง", download: "ดาวน์โหลด", copy: "คัดลอก", reset: "รีเซ็ต", search: "ค้นหา", share: "แชร์", print: "พิมพ์", loading: "กำลังโหลด...", success: "สำเร็จ", error: "ข้อผิดพลาด" },
    footer: { rights: "สงวนลิขสิทธิ์", privacy: "นโยบายความเป็นส่วนตัว", terms: "เงื่อนไขการให้บริการ" },
  },
  id: {
    nav: { home: "Beranda", features: "Fitur", barcodeGenerator: "Generator Barcode", qrGenerator: "Generator QR", batchGenerator: "Generator Batch", templates: "Template", scanner: "Pemindai", blog: "Blog", faq: "FAQ", contact: "Kontak" },
    hero: { title: "Buat Barcode & Kode QR Secara Instan", subtitle: "Generator barcode gratis paling canggih dengan dukungan 30+ format.", cta1: "Buat Barcode", cta2: "Buat Kode QR" },
    common: { generate: "Buat", download: "Unduh", copy: "Salin", reset: "Atur Ulang", search: "Cari", share: "Bagikan", print: "Cetak", loading: "Memuat...", success: "Berhasil", error: "Kesalahan" },
    footer: { rights: "Hak cipta dilindungi", privacy: "Kebijakan Privasi", terms: "Ketentuan Layanan" },
  },
  ms: {
    nav: { home: "Utama", features: "Ciri-ciri", barcodeGenerator: "Penjana Kod Bar", qrGenerator: "Penjana QR", batchGenerator: "Penjana Kelompok", templates: "Templat", scanner: "Pengimbas", blog: "Blog", faq: "FAQ", contact: "Hubungi" },
    hero: { title: "Jana Kod Bar & QR Serta-merta", subtitle: "Penjana kod bar percuma paling berkuasa dengan 30+ format.", cta1: "Jana Kod Bar", cta2: "Buat Kod QR" },
    common: { generate: "Jana", download: "Muat Turun", copy: "Salin", reset: "Set Semula", search: "Cari", share: "Kongsi", print: "Cetak", loading: "Memuat...", success: "Berjaya", error: "Ralat" },
    footer: { rights: "Hak cipta terpelihara", privacy: "Dasar Privasi", terms: "Terma Perkhidmatan" },
  },
  nl: {
    nav: { home: "Home", features: "Functies", barcodeGenerator: "Barcode Generator", qrGenerator: "QR Generator", batchGenerator: "Batch Generator", templates: "Sjablonen", scanner: "Scanner", blog: "Blog", faq: "FAQ", contact: "Contact" },
    hero: { title: "Genereer Direct Barcodes & QR-codes", subtitle: "De krachtigste gratis barcode generator met 30+ formaten.", cta1: "Barcode Genereren", cta2: "QR-code Maken" },
    common: { generate: "Genereren", download: "Downloaden", copy: "Kopiëren", reset: "Resetten", search: "Zoeken", share: "Delen", print: "Afdrukken", loading: "Laden...", success: "Succes", error: "Fout" },
    footer: { rights: "Alle rechten voorbehouden", privacy: "Privacybeleid", terms: "Servicevoorwaarden" },
  },
  pl: {
    nav: { home: "Strona główna", features: "Funkcje", barcodeGenerator: "Generator Kodów Kreskowych", qrGenerator: "Generator QR", batchGenerator: "Generator Wsadowy", templates: "Szablony", scanner: "Skaner", blog: "Blog", faq: "FAQ", contact: "Kontakt" },
    hero: { title: "Generuj Kody Kreskowe i QR Natychmiast", subtitle: "Najpotężniejszy darmowy generator kodów kreskowych z 30+ formatami.", cta1: "Generuj Kod Kreskowy", cta2: "Utwórz Kod QR" },
    common: { generate: "Generuj", download: "Pobierz", copy: "Kopiuj", reset: "Resetuj", search: "Szukaj", share: "Udostępnij", print: "Drukuj", loading: "Ładowanie...", success: "Sukces", error: "Błąd" },
    footer: { rights: "Wszelkie prawa zastrzeżone", privacy: "Polityka Prywatności", terms: "Regulamin" },
  },
};
