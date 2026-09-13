export type Language = 'fa' | 'en' | 'ar';
export type ThemeMode = 'light' | 'dark';
export type UnitSystem = 'cm' | 'in';
export type MeasureMode = 'normal' | 'professional';
export type FitPreference = 'slim' | 'regular' | 'relaxed' | 'oversized';

export const LANGUAGES: { code: Language; nativeName: string; dir: 'rtl' | 'ltr' }[] = [
  { code: 'fa', nativeName: 'فارسی', dir: 'rtl' },
  { code: 'en', nativeName: 'English', dir: 'ltr' },
  { code: 'ar', nativeName: 'العربية', dir: 'rtl' },
];

export function detectDefaultLanguage(): Language {
  if (typeof navigator === 'undefined') return 'en';
  const nav = (navigator.language || 'en').toLowerCase();
  if (nav.startsWith('fa')) return 'fa';
  if (nav.startsWith('ar')) return 'ar';
  return 'en';
}

export function getDirection(lang: Language): 'rtl' | 'ltr' {
  return lang === 'fa' || lang === 'ar' ? 'rtl' : 'ltr';
}

type Dict = Record<string, any>;

const fa: Dict = {
  appName: 'سایز من',
  common: {
    next: 'بعدی',
    back: 'بازگشت',
    continue: 'ادامه',
    retake: 'گرفتن دوباره',
    usePhoto: 'استفاده از این عکس',
    capture: 'ثبت عکس',
    confirm: 'تأیید',
    cancel: 'انصراف',
    loading: 'در حال پردازش…',
    error: 'خطا',
    tryAgain: 'تلاش دوباره',
    done: 'پایان',
    save: 'ذخیره',
    newMeasurement: 'اندازه‌گیری جدید',
    optional: 'اختیاری',
    required: 'الزامی',
  },
  language: {
    selectTitle: 'زبان خود را انتخاب کنید',
    selectSubtitle: 'در هر زمان می‌توانید از تنظیمات زبان را تغییر دهید',
  },
  onboarding: {
    welcomeTitle: 'اندازه واقعی بدن خود را در چند ثانیه بیابید',
    welcomeSubtitle:
      'سایز من با استفاده از هوش مصنوعی و فقط چند عکس، اندازه‌های بدن و سایز لباس مناسب شما را برآورد می‌کند.',
    getStarted: 'شروع کنیم',
    modesTitle: 'دو حالت اندازه‌گیری',
    normalHint: 'با یک عکس، سریع و ساده',
    proHint: 'با سه عکس، دقیق و کامل برای خیاطی',
  },
  mode: {
    chooseTitle: 'حالت اندازه‌گیری را انتخاب کنید',
    chooseSubtitle: 'می‌توانید بعداً دوباره اندازه‌گیری کنید و حالت را تغییر دهید',
    normalTitle: 'حالت معمولی',
    normalDesc: 'فقط یک عکس از روبرو. پیشنهاد سایز سریع برای لباس‌های روزمره.',
    normalBadge: '۱ عکس · سریع',
    proTitle: 'حالت حرفه‌ای',
    proDesc: 'سه عکس (جلو، پروفیل، پشت). اندازه‌گیری کامل و دقیق برای خیاطی و دوخت سفارشی.',
    proBadge: '۳ عکس · دقیق',
    heightTitle: 'قد واقعی خود را وارد کنید',
    heightSubtitle: 'قد برای کالیبراسیون دقیق اندازه‌گیری از روی عکس‌ها الزامی است.',
    heightPlaceholder: 'مثلاً ۱۷۰',
    heightUnitCm: 'سانتی‌متر',
    startCapture: 'شروع عکس‌برداری',
  },
  capture: {
    stepOf: 'مرحله {current} از {total}',
    front: 'نمای روبرو',
    side: 'نمای پروفیل (بغل)',
    back: 'نمای پشت',
    frontInstructionTitle: 'عکس روبرو بگیرید',
    frontInstructionBody: 'بایستید رو به دوربین، دست‌ها کمی از بدن فاصله داشته باشند (حالت A).',
    sideInstructionTitle: 'عکس پروفیل بگیرید',
    sideInstructionBody: 'به پهلو بایستید، دست‌ها کاملاً کشیده و پاها کنار هم.',
    backInstructionTitle: 'عکس پشت بگیرید',
    backInstructionBody: 'پشت به دوربین بایستید، همان حالت A مانند عکس روبرو.',
    tips: [
      'تمام بدن از سر تا پا در کادر دیده شود',
      'بدن حدود ۷۰ تا ۸۰ درصد ارتفاع کادر را پر کند',
      'لباس چسبان بپوشید',
      'پس‌زمینه ساده و نور یکنواخت باشد',
    ],
    frameGood: 'قاب‌بندی مناسب است',
    frameAdjust: 'لطفاً کمی جابه‌جا شوید',
    startCountdown: 'شروع شمارش معکوس',
    counting: 'آماده باشید…',
    retakePhoto: 'گرفتن دوباره',
    usePhoto: 'تأیید و ادامه',
    uploadInstead: 'یا یک عکس از گالری انتخاب کنید',
    cameraNotAvailable: 'دوربین در دسترس نیست. لطفاً یک عکس آپلود کنید.',
    analyzingTitle: 'در حال تحلیل عکس‌های شما…',
    analyzingHint: 'هوش مصنوعی اندازه‌های بدن شما را برآورد می‌کند. این ممکن است چند لحظه طول بکشد.',
    privacyNotice:
      'عکس‌های شما فقط برای تحلیل موقت استفاده می‌شوند و هرگز ذخیره نمی‌شوند؛ بلافاصله پس از دریافت نتیجه حذف می‌گردند.',
    analysisFailed: 'تحلیل عکس‌ها ناموفق بود. لطفاً دوباره تلاش کنید.',
  },
  results: {
    title: 'نتایج اندازه‌گیری',
    measurementsTitle: 'اندازه‌های بدن',
    confidenceHigh: 'اطمینان بالا',
    confidenceMedium: 'اطمینان متوسط',
    confidenceLow: 'اطمینان پایین',
    errorRange: 'حدود خطا',
    adjustManually: 'ویرایش دستی',
    cmUnit: 'سانتی‌متر',
    inUnit: 'اینچ',
    disclaimer:
      'این یک برآورد هوش مصنوعی است. برای خیاطی حرفه‌ای و حساس، اندازه‌گیری فیزیکی همچنان توصیه می‌شود.',
    sizeChartTitle: 'سایز پیشنهادی لباس',
    fitLabel: 'ترجیح پوشش',
    fitSlim: 'تنگ',
    fitRegular: 'معمولی',
    fitRelaxed: 'راحت',
    fitOversized: 'گشاد',
    categoryTops: 'بالاتنه',
    categoryBottoms: 'شلوار',
    categoryOuterwear: 'کاپشن و کت',
    categoryDresses: 'پیراهن مجلسی',
    categoryFormal: 'رسمی',
    categorySportswear: 'ورزشی',
    categoryUnderwear: 'زیرپوش/سوتین',
    systemUS: 'آمریکا',
    systemEU: 'اروپا',
    systemUK: 'انگلیس',
    systemAsian: 'آسیایی',
    systemIntl: 'بین‌المللی',
    measurementNames: {
      shoulder_width: 'عرض شانه',
      chest: 'دور سینه',
      underbust: 'دور زیر سینه',
      waist: 'دور کمر',
      hip: 'دور باسن',
      neck: 'دور گردن',
      upper_arm: 'دور بازو',
      forearm: 'دور ساعد',
      wrist: 'دور مچ دست',
      arm_length: 'طول دست',
      inseam: 'طول داخل پا',
      thigh: 'دور ران',
      knee: 'دور زانو',
      calf: 'دور ساق پا',
      ankle: 'دور قوزک پا',
      torso_length: 'طول تنه',
      back_width: 'عرض پشت',
    },
    exactMeasurements: 'اعداد دقیق خیاطی',
    resultsFooterNote: 'می‌توانید هر مقدار را برای دقت بیشتر به‌صورت دستی ویرایش کنید.',
  },
  settings: {
    title: 'تنظیمات',
    tabGeneral: 'عمومی',
    tabAbout: 'درباره ما',
    tabPrivacy: 'حریم خصوصی',
    tabHelp: 'راهنما',
    languageLabel: 'زبان',
    unitsLabel: 'واحد اندازه‌گیری',
    themeLabel: 'ظاهر برنامه',
    themeLight: 'روشن',
    themeDark: 'تاریک',
  },
  about: {
    title: 'درباره ما',
    body:
      'این اپلیکیشن توسط تیم «bul» طراحی و توسعه داده شده است. هدف ما ارائه تجربه‌ای سریع، دقیق و امن برای برآورد اندازه بدن و سایز لباس با استفاده از هوش مصنوعی است.',
    contactTitle: 'ارتباط با ما',
    contactBody: 'برای پرسش یا پشتیبانی می‌توانید از طریق ایمیل زیر با ما در ارتباط باشید:',
    email: 'gholambul@gmail.com',
  },
  privacy: {
    title: 'حریم خصوصی',
    intro: 'حفظ حریم خصوصی شما اولویت اصلی ماست.',
    points: [
      'عکس‌هایی که می‌گیرید یا آپلود می‌کنید هرگز روی هیچ سروری ذخیره نمی‌شوند.',
      'عکس‌ها فقط به‌صورت موقت و صرفاً برای تحلیل اندازه‌گیری پردازش می‌شوند.',
      'بلافاصله پس از دریافت نتیجه، عکس‌ها به‌طور کامل و دائمی حذف می‌شوند.',
      'هیچ عکسی ذخیره، اشتراک‌گذاری یا برای هدف دیگری استفاده نمی‌شود.',
      'فقط داده‌های عددی اندازه‌گیری (بدون عکس) در تاریخچه شما نگه داشته می‌شود.',
    ],
  },
  help: {
    title: 'راهنما',
    faq: [
      {
        q: 'تفاوت حالت معمولی و حرفه‌ای چیست؟',
        a: 'حالت معمولی فقط یک عکس روبرو نیاز دارد و سایز پایه را برآورد می‌کند. حالت حرفه‌ای سه عکس (روبرو، پروفیل، پشت) می‌گیرد و اندازه‌های کامل بدن را برای خیاطی ارائه می‌دهد.',
      },
      {
        q: 'آیا عکس‌های من ذخیره می‌شوند؟',
        a: 'خیر. عکس‌ها فقط برای لحظه تحلیل استفاده و سپس بلافاصله و برای همیشه حذف می‌شوند.',
      },
      {
        q: 'چرا وارد کردن قد الزامی است؟',
        a: 'قد واقعی به هوش مصنوعی کمک می‌کند مقیاس دقیق بدن را از روی عکس محاسبه کند.',
      },
      {
        q: 'دقت این برآورد چقدر است؟',
        a: 'این یک تخمین هوش مصنوعی است و ممکن است با اندازه‌گیری فیزیکی چند سانتی‌متر تفاوت داشته باشد.',
      },
    ],
  },
  errors: {
    networkError: 'ارتباط با سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.',
    genericError: 'مشکلی پیش آمد. لطفاً دوباره تلاش کنید.',
  },
  nav: {
    capture: 'عکس‌برداری',
    results: 'نتایج',
    settings: 'تنظیمات',
  },
};

const en: Dict = {
  appName: 'My Size',
  common: {
    next: 'Next',
    back: 'Back',
    continue: 'Continue',
    retake: 'Retake',
    usePhoto: 'Use this photo',
    capture: 'Capture',
    confirm: 'Confirm',
    cancel: 'Cancel',
    loading: 'Processing…',
    error: 'Error',
    tryAgain: 'Try again',
    done: 'Done',
    save: 'Save',
    newMeasurement: 'New measurement',
    optional: 'Optional',
    required: 'Required',
  },
  language: {
    selectTitle: 'Choose your language',
    selectSubtitle: 'You can change this anytime from Settings',
  },
  onboarding: {
    welcomeTitle: 'Discover your real body size in seconds',
    welcomeSubtitle:
      'My Size uses AI and a few photos to estimate your body measurements and the right clothing size for you.',
    getStarted: "Let's get started",
    modesTitle: 'Two measurement modes',
    normalHint: 'One photo, fast and simple',
    proHint: 'Three photos, precise and complete for tailoring',
  },
  mode: {
    chooseTitle: 'Choose a measurement mode',
    chooseSubtitle: 'You can always measure again and switch modes later',
    normalTitle: 'Normal Mode',
    normalDesc: 'Just one front-view photo. Quick size suggestions for everyday clothing.',
    normalBadge: '1 photo · Fast',
    proTitle: 'Professional Mode',
    proDesc: 'Three photos (front, side, back). Complete, detailed measurements for tailoring.',
    proBadge: '3 photos · Precise',
    heightTitle: 'Enter your real height',
    heightSubtitle: 'Height is required to accurately calibrate measurements from your photos.',
    heightPlaceholder: 'e.g. 170',
    heightUnitCm: 'centimeters',
    startCapture: 'Start photo capture',
  },
  capture: {
    stepOf: 'Step {current} of {total}',
    front: 'Front view',
    side: 'Side view',
    back: 'Back view',
    frontInstructionTitle: 'Take a front-view photo',
    frontInstructionBody: 'Face the camera, arms slightly away from your body (A-pose).',
    sideInstructionTitle: 'Take a side-view photo',
    sideInstructionBody: 'Stand in profile, arms straight down, feet together.',
    backInstructionTitle: 'Take a back-view photo',
    backInstructionBody: 'Turn your back to the camera, same A-pose as the front photo.',
    tips: [
      'Full body from head to feet must be visible',
      'Body should fill about 70–80% of the frame height',
      'Wear tight-fitting clothes',
      'Use a plain background and even lighting',
    ],
    frameGood: 'Framing looks good',
    frameAdjust: 'Please adjust your position',
    startCountdown: 'Start countdown',
    counting: 'Get ready…',
    retakePhoto: 'Retake',
    usePhoto: 'Confirm and continue',
    uploadInstead: 'Or choose a photo from your gallery',
    cameraNotAvailable: 'Camera is not available. Please upload a photo instead.',
    analyzingTitle: 'Analyzing your photos…',
    analyzingHint: 'AI is estimating your body measurements. This may take a moment.',
    privacyNotice:
      'Your photos are used only for temporary analysis and are never stored — they are deleted immediately after your results are generated.',
    analysisFailed: 'Photo analysis failed. Please try again.',
  },
  results: {
    title: 'Measurement Results',
    measurementsTitle: 'Body measurements',
    confidenceHigh: 'High confidence',
    confidenceMedium: 'Medium confidence',
    confidenceLow: 'Low confidence',
    errorRange: 'Estimated error',
    adjustManually: 'Adjust manually',
    cmUnit: 'cm',
    inUnit: 'in',
    disclaimer:
      'This is an AI estimation. For critical professional tailoring, physical measurement is still recommended.',
    sizeChartTitle: 'Recommended clothing sizes',
    fitLabel: 'Fit preference',
    fitSlim: 'Slim',
    fitRegular: 'Regular',
    fitRelaxed: 'Relaxed',
    fitOversized: 'Oversized',
    categoryTops: 'Tops',
    categoryBottoms: 'Bottoms',
    categoryOuterwear: 'Outerwear',
    categoryDresses: 'Dresses',
    categoryFormal: 'Formal wear',
    categorySportswear: 'Sportswear',
    categoryUnderwear: 'Underwear / Bras',
    systemUS: 'US',
    systemEU: 'EU',
    systemUK: 'UK',
    systemAsian: 'Asian',
    systemIntl: 'International',
    measurementNames: {
      shoulder_width: 'Shoulder width',
      chest: 'Chest / Bust',
      underbust: 'Underbust',
      waist: 'Waist',
      hip: 'Hip',
      neck: 'Neck',
      upper_arm: 'Upper arm',
      forearm: 'Forearm',
      wrist: 'Wrist',
      arm_length: 'Arm length',
      inseam: 'Inseam',
      thigh: 'Thigh',
      knee: 'Knee',
      calf: 'Calf',
      ankle: 'Ankle',
      torso_length: 'Torso length',
      back_width: 'Back width',
    },
    exactMeasurements: 'Exact tailoring numbers',
    resultsFooterNote: 'You can manually edit any value for extra precision.',
  },
  settings: {
    title: 'Settings',
    tabGeneral: 'General',
    tabAbout: 'About Us',
    tabPrivacy: 'Privacy',
    tabHelp: 'Help',
    languageLabel: 'Language',
    unitsLabel: 'Measurement units',
    themeLabel: 'Appearance',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  about: {
    title: 'About Us',
    body:
      'This application is developed and owned by the bul team. Our goal is to deliver a fast, accurate, and privacy-respecting experience for estimating body measurements and clothing sizes using AI.',
    contactTitle: 'Contact',
    contactBody: 'For questions or support, you can reach us via email:',
    email: 'gholambul@gmail.com',
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'Protecting your privacy is our top priority.',
    points: [
      'Photos you take or upload are never stored on any server or permanent storage.',
      'Photos are processed temporarily only for measurement analysis.',
      'Photos are automatically and permanently deleted immediately after results are generated.',
      'No photos are saved, shared, or used for any other purpose.',
      'Only numeric measurement data (never photos) may be kept in your history.',
    ],
  },
  help: {
    title: 'Help',
    faq: [
      {
        q: 'What is the difference between Normal and Professional mode?',
        a: 'Normal mode needs only one front-view photo and estimates basic sizes. Professional mode takes three photos (front, side, back) and provides complete, detailed measurements for tailoring.',
      },
      {
        q: 'Are my photos stored?',
        a: 'No. Photos are used only for the moment of analysis and are then permanently deleted immediately.',
      },
      {
        q: 'Why is entering my height required?',
        a: 'Your real height helps the AI calculate an accurate real-world scale from your photos.',
      },
      {
        q: 'How accurate is this estimation?',
        a: 'This is an AI estimate and may differ from physical measurement by a few centimeters.',
      },
    ],
  },
  errors: {
    networkError: 'Could not reach the server. Please check your internet connection.',
    genericError: 'Something went wrong. Please try again.',
  },
  nav: {
    capture: 'Capture',
    results: 'Results',
    settings: 'Settings',
  },
};

const ar: Dict = {
  appName: 'مقاسي',
  common: {
    next: 'التالي',
    back: 'رجوع',
    continue: 'استمرار',
    retake: 'إعادة التصوير',
    usePhoto: 'استخدام هذه الصورة',
    capture: 'تصوير',
    confirm: 'تأكيد',
    cancel: 'إلغاء',
    loading: 'جارٍ المعالجة…',
    error: 'خطأ',
    tryAgain: 'حاول مرة أخرى',
    done: 'تم',
    save: 'حفظ',
    newMeasurement: 'قياس جديد',
    optional: 'اختياري',
    required: 'مطلوب',
  },
  language: {
    selectTitle: 'اختر لغتك',
    selectSubtitle: 'يمكنك تغيير هذا في أي وقت من الإعدادات',
  },
  onboarding: {
    welcomeTitle: 'اكتشف مقاس جسمك الحقيقي في ثوانٍ',
    welcomeSubtitle:
      'يستخدم تطبيق مقاسي الذكاء الاصطناعي وبضع صور لتقدير قياسات جسمك ومقاس الملابس المناسب لك.',
    getStarted: 'لنبدأ',
    modesTitle: 'وضعان للقياس',
    normalHint: 'صورة واحدة، سريعة وبسيطة',
    proHint: 'ثلاث صور، دقيقة وكاملة للتفصيل',
  },
  mode: {
    chooseTitle: 'اختر وضع القياس',
    chooseSubtitle: 'يمكنك دائمًا إعادة القياس وتغيير الوضع لاحقًا',
    normalTitle: 'الوضع العادي',
    normalDesc: 'صورة أمامية واحدة فقط. اقتراحات مقاس سريعة للملابس اليومية.',
    normalBadge: 'صورة واحدة · سريع',
    proTitle: 'الوضع الاحترافي',
    proDesc: 'ثلاث صور (أمامية، جانبية، خلفية). قياسات كاملة ودقيقة للتفصيل.',
    proBadge: '٣ صور · دقيق',
    heightTitle: 'أدخل طولك الحقيقي',
    heightSubtitle: 'الطول مطلوب لمعايرة القياسات بدقة من صورك.',
    heightPlaceholder: 'مثال: ١٧٠',
    heightUnitCm: 'سنتيمتر',
    startCapture: 'بدء التصوير',
  },
  capture: {
    stepOf: 'الخطوة {current} من {total}',
    front: 'الصورة الأمامية',
    side: 'الصورة الجانبية',
    back: 'الصورة الخلفية',
    frontInstructionTitle: 'التقط صورة أمامية',
    frontInstructionBody: 'قف مواجهًا للكاميرا، مع إبعاد الذراعين قليلًا عن الجسم.',
    sideInstructionTitle: 'التقط صورة جانبية',
    sideInstructionBody: 'قف من الجانب، الذراعان مستقيمتان للأسفل والقدمان متلاصقتان.',
    backInstructionTitle: 'التقط صورة خلفية',
    backInstructionBody: 'اجعل ظهرك للكاميرا، بنفس وضعية الصورة الأمامية.',
    tips: [
      'يجب أن يكون الجسم كاملًا من الرأس إلى القدمين ظاهرًا',
      'يجب أن يشغل الجسم حوالي ٧٠-٨٠٪ من ارتفاع الإطار',
      'يفضل ارتداء ملابس ضيقة',
      'خلفية بسيطة وإضاءة متساوية',
    ],
    frameGood: 'التأطير جيد',
    frameAdjust: 'يرجى ضبط وضعيتك',
    startCountdown: 'ابدأ العد التنازلي',
    counting: 'استعد…',
    retakePhoto: 'إعادة التصوير',
    usePhoto: 'تأكيد ومتابعة',
    uploadInstead: 'أو اختر صورة من المعرض',
    cameraNotAvailable: 'الكاميرا غير متوفرة. يرجى رفع صورة بدلاً من ذلك.',
    analyzingTitle: 'جارٍ تحليل صورك…',
    analyzingHint: 'يقوم الذكاء الاصطناعي بتقدير قياسات جسمك. قد يستغرق هذا لحظة.',
    privacyNotice:
      'تُستخدم صورك فقط للتحليل المؤقت ولا تُخزَّن أبدًا؛ تُحذف فورًا بعد إنشاء النتائج.',
    analysisFailed: 'فشل تحليل الصور. يرجى المحاولة مرة أخرى.',
  },
  results: {
    title: 'نتائج القياس',
    measurementsTitle: 'قياسات الجسم',
    confidenceHigh: 'ثقة عالية',
    confidenceMedium: 'ثقة متوسطة',
    confidenceLow: 'ثقة منخفضة',
    errorRange: 'نطاق الخطأ المقدر',
    adjustManually: 'تعديل يدوي',
    cmUnit: 'سم',
    inUnit: 'إنش',
    disclaimer:
      'هذا تقدير بالذكاء الاصطناعي. للتفصيل المهني الدقيق، يُنصح دائمًا بالقياس الفعلي.',
    sizeChartTitle: 'مقاسات الملابس المقترحة',
    fitLabel: 'تفضيل القصة',
    fitSlim: 'ضيق',
    fitRegular: 'عادي',
    fitRelaxed: 'مريح',
    fitOversized: 'واسع',
    categoryTops: 'الملابس العلوية',
    categoryBottoms: 'البناطيل',
    categoryOuterwear: 'المعاطف',
    categoryDresses: 'الفساتين',
    categoryFormal: 'ملابس رسمية',
    categorySportswear: 'ملابس رياضية',
    categoryUnderwear: 'ملابس داخلية / حمالات',
    systemUS: 'أمريكي',
    systemEU: 'أوروبي',
    systemUK: 'بريطاني',
    systemAsian: 'آسيوي',
    systemIntl: 'عالمي',
    measurementNames: {
      shoulder_width: 'عرض الكتف',
      chest: 'محيط الصدر',
      underbust: 'محيط أسفل الصدر',
      waist: 'محيط الخصر',
      hip: 'محيط الأرداف',
      neck: 'محيط الرقبة',
      upper_arm: 'محيط الذراع العلوي',
      forearm: 'محيط الساعد',
      wrist: 'محيط المعصم',
      arm_length: 'طول الذراع',
      inseam: 'طول الداخلية للرجل',
      thigh: 'محيط الفخذ',
      knee: 'محيط الركبة',
      calf: 'محيط الساق',
      ankle: 'محيط الكاحل',
      torso_length: 'طول الجذع',
      back_width: 'عرض الظهر',
    },
    exactMeasurements: 'الأرقام الدقيقة للتفصيل',
    resultsFooterNote: 'يمكنك تعديل أي قيمة يدويًا لمزيد من الدقة.',
  },
  settings: {
    title: 'الإعدادات',
    tabGeneral: 'عام',
    tabAbout: 'عنا',
    tabPrivacy: 'الخصوصية',
    tabHelp: 'المساعدة',
    languageLabel: 'اللغة',
    unitsLabel: 'وحدة القياس',
    themeLabel: 'المظهر',
    themeLight: 'فاتح',
    themeDark: 'داكن',
  },
  about: {
    title: 'عنا',
    body:
      'تم تطوير هذا التطبيق وامتلاكه من قبل فريق bul. هدفنا هو تقديم تجربة سريعة ودقيقة وتحترم الخصوصية لتقدير قياسات الجسم ومقاسات الملابس باستخدام الذكاء الاصطناعي.',
    contactTitle: 'اتصل بنا',
    contactBody: 'للأسئلة أو الدعم، يمكنك التواصل معنا عبر البريد الإلكتروني:',
    email: 'gholambul@gmail.com',
  },
  privacy: {
    title: 'سياسة الخصوصية',
    intro: 'حماية خصوصيتك هي أولويتنا القصوى.',
    points: [
      'الصور التي تلتقطها أو ترفعها لا تُخزَّن أبدًا على أي خادم أو تخزين دائم.',
      'تُعالَج الصور مؤقتًا فقط لغرض تحليل القياس.',
      'تُحذف الصور تلقائيًا وبشكل دائم فورًا بعد إنشاء النتائج.',
      'لا يتم حفظ أي صورة أو مشاركتها أو استخدامها لأي غرض آخر.',
      'يتم الاحتفاظ فقط ببيانات القياس الرقمية (وليس الصور) في سجلك.',
    ],
  },
  help: {
    title: 'المساعدة',
    faq: [
      {
        q: 'ما الفرق بين الوضع العادي والوضع الاحترافي؟',
        a: 'يتطلب الوضع العادي صورة أمامية واحدة فقط ويقدر المقاسات الأساسية. يأخذ الوضع الاحترافي ثلاث صور (أمامية وجانبية وخلفية) ويوفر قياسات كاملة ودقيقة للتفصيل.',
      },
      {
        q: 'هل تُخزَّن صوري؟',
        a: 'لا. تُستخدم الصور فقط لحظة التحليل، ثم تُحذف فورًا وبشكل دائم.',
      },
      {
        q: 'لماذا إدخال الطول مطلوب؟',
        a: 'يساعد طولك الحقيقي الذكاء الاصطناعي على حساب المقياس الحقيقي بدقة من صورك.',
      },
      {
        q: 'ما مدى دقة هذا التقدير؟',
        a: 'هذا تقدير بالذكاء الاصطناعي وقد يختلف عن القياس الفعلي بعدة سنتيمترات.',
      },
    ],
  },
  errors: {
    networkError: 'تعذر الوصول إلى الخادم. يرجى التحقق من اتصالك بالإنترنت.',
    genericError: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
  },
  nav: {
    capture: 'تصوير',
    results: 'النتائج',
    settings: 'الإعدادات',
  },
};

export const dictionaries: Record<Language, Dict> = { fa, en, ar };

export function translate(lang: Language, path: string, vars?: Record<string, string | number>): any {
  const dict = dictionaries[lang] || dictionaries.en;
  const parts = path.split('.');
  let node: any = dict;
  for (const part of parts) {
    if (node == null) break;
    node = node[part];
  }
  if (node == null) {
    // Fallback to English if a key is missing in the target language
    let fallback: any = dictionaries.en;
    for (const part of parts) {
      if (fallback == null) break;
      fallback = fallback[part];
    }
    node = fallback;
  }
  if (typeof node === 'string' && vars) {
    return Object.keys(vars).reduce(
      (acc, key) => acc.replace(`{${key}}`, String(vars[key])),
      node
    );
  }
  return node;
}