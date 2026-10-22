/* =====================================================
   HarvestShare - script.js
   All interactivity for the produce-sharing website.
   Written in plain (vanilla) JavaScript:
   variables, functions, arrays, objects, loops,
   event listeners and DOM manipulation.

   Sections:
   1.  Sample data            8.  Filtering
   2.  Translations           9.  Filter events
   3.  Backup images          10. Request popup
   4.  Saved data             11. Card clicks
   5.  Page elements          12. Add-produce form
   6.  Helper functions       13. Theme (dark/light)
   7.  Drawing the cards      14. Language (English/Dari)
                              15. Menu + page load
   ===================================================== */

// -----------------------------------------------------
// 1. SAMPLE DATA
// An array of objects. Each object is one produce listing.
// "nameFa" and "descFa" hold the Dari version of the text.
// -----------------------------------------------------
const sampleProduce = [
  {
    id: 1,
    name: "Heirloom Tomatoes",
    nameFa: "بادنجان رومی محلی",
    category: "Vegetable",
    quantity: "2 kg",
    location: "Maplewood",
    gardener: "Sarah Green",
    description:
      "Sweet, sun-ripened tomatoes from my raised beds. Perfect for salads and sauces.",
    descFa: "بادنجان رومی شیرین و رسیده از باغچه من. عالی برای سلاد و سس.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 2,
    name: "Crisp Garden Apples",
    nameFa: "سیب تازه باغ",
    category: "Fruit",
    quantity: "15 pieces",
    location: "Oakdale",
    gardener: "James Miller",
    description:
      "Sweet and crunchy apples from our old tree. Great for snacking or baking pies.",
    descFa:
      "سیب‌های شیرین و ترد از درخت کهن ما. برای خوردن و پختن کیک عالی است.",
    harvested: "Picked yesterday",
    image:
      "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 3,
    name: "Fresh Carrots",
    nameFa: "زردک تازه",
    category: "Vegetable",
    quantity: "1 kg",
    location: "Riverside",
    gardener: "Maria Lopez",
    description:
      "Bright, crunchy carrots pulled this morning. Tops included if you like making pesto.",
    descFa: "زردک‌های تازه و ترد که همین امروز صبح کشیده شده‌اند.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1447175008436-054170c2e45d?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 4,
    name: "Garden Strawberries",
    nameFa: "توت زمینی باغ",
    category: "Fruit",
    quantity: "500 g",
    location: "Hillcrest",
    gardener: "Emma Wilson",
    description:
      "Small but super sweet strawberries. Best eaten on the same day you collect them.",
    descFa: "توت زمینی‌های کوچک اما بسیار شیرین. بهتر است همان روز خورده شوند.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 5,
    name: "Butterhead Lettuce",
    nameFa: "کاهوی نرم",
    category: "Vegetable",
    quantity: "3 heads",
    location: "Maplewood",
    gardener: "David Chen",
    description:
      "Soft, fresh lettuce heads. Far more than my family can eat this week.",
    descFa:
      "کاهوی تازه و نرم. بسیار بیشتر از آنچه خانواده‌ام این هفته می‌خورد.",
    harvested: "Picked yesterday",
    image:
      "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 6,
    name: "Juicy Lemons",
    nameFa: "لیموی آبدار",
    category: "Fruit",
    quantity: "8 pieces",
    location: "Sunnyvale",
    gardener: "Anna Petrova",
    description:
      "Fragrant lemons from a very generous tree. Lovely for lemonade and baking.",
    descFa:
      "لیموهای خوشبو از یک درخت بسیار پربار. برای لیموناد و شیرینی‌پزی عالی است.",
    harvested: "Picked this week",
    image:
      "https://images.unsplash.com/photo-1590502593747-42a996133562?auto=format&fit=crop&w=800&q=80",
    requested: true, // this sample starts as "already requested" to show both states
    isMine: false,
  },
  {
    id: 7,
    name: "Garden Cucumbers",
    nameFa: "بادرنگ باغ",
    category: "Vegetable",
    quantity: "6 pieces",
    location: "Riverside",
    gardener: "Tom Baker",
    description:
      "Cool, crisp cucumbers. Ideal for salads, sandwiches and quick pickles.",
    descFa: "بادرنگ‌های تازه و ترد. مناسب برای سلاد، ساندویچ و ترشی.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 8,
    name: "Colourful Bell Peppers",
    nameFa: "مرچ دلمه‌ای رنگارنگ",
    category: "Vegetable",
    quantity: "1 kg",
    location: "Downtown",
    gardener: "Priya Sharma",
    description:
      "A cheerful mix of red, yellow and green peppers with a lovely sweet crunch.",
    descFa: "ترکیبی شاد از مرچ سرخ، زرد و سبز با مزه شیرین و ترد.",
    harvested: "Picked yesterday",
    image:
      "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 9,
    name: "Zucchini (Courgettes)",
    nameFa: "کدوی سبز",
    category: "Vegetable",
    quantity: "4 pieces",
    location: "Hillcrest",
    gardener: "Lucas Brown",
    description:
      "The classic gardener's surplus! Tender young zucchini, great for grilling.",
    descFa: "اضافه کلاسیک هر باغبان! کدوی جوان و نرم، عالی برای کباب کردن.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1583687355032-89b902b7335f?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 10,
    name: "Sweet Oranges",
    nameFa: "مالته شیرین",
    category: "Fruit",
    quantity: "10 pieces",
    location: "Sunnyvale",
    gardener: "Sofia Rossi",
    description:
      "Juicy, thin-skinned oranges. Wonderful for fresh juice in the morning.",
    descFa: "مالته‌های آبدار با پوست نازک. برای آبمیوه تازه صبحگاهی عالی است.",
    harvested: "Picked this week",
    image:
      "https://images.unsplash.com/photo-1547514701-42782101795e?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 11,
    name: "New Potatoes",
    nameFa: "کچالوی نو",
    category: "Vegetable",
    quantity: "3 kg",
    location: "Oakdale",
    gardener: "Henry Clark",
    description:
      "Freshly dug potatoes with thin skins. Delicious boiled with a little butter.",
    descFa: "کچالوهای تازه با پوست نازک. آب‌پز با کمی مسکه بسیار مزه‌دار است.",
    harvested: "Picked yesterday",
    image:
      "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
  {
    id: 12,
    name: "Garden Blueberries",
    nameFa: "زغال‌اخته باغ",
    category: "Fruit",
    quantity: "300 g",
    location: "Downtown",
    gardener: "Grace Lee",
    description:
      "A small box of sweet blueberries from my bushes. First come, first served.",
    descFa: "یک قطی کوچک زغال‌اخته شیرین از بوته‌های من. هر کس زودتر بیاید.",
    harvested: "Picked today",
    image:
      "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?auto=format&fit=crop&w=800&q=80",
    requested: false,
    isMine: false,
  },
];

// -----------------------------------------------------
// 2. TRANSLATIONS
// One object for English ("en") and one for Dari ("fa").
// Each piece of text has a short "key" such as "nav.home".
// In index.html the same key is written as data-i18n="nav.home".
// -----------------------------------------------------
const translations = {
  en: {
    "nav.home": "Home",
    "nav.how": "How It Works",
    "nav.browse": "Browse Produce",
    "nav.share": "Share Produce",

    "hero.badge": "Community produce exchange",
    "hero.title1": "Fresh from the garden,",
    "hero.title2": "shared with neighbours.",
    "hero.subtitle":
      "HarvestShare helps gardeners list their extra fruit and vegetables so people nearby can enjoy them — less food waste, fresher dinners, and friendlier streets.",
    "hero.browseBtn": "Browse Produce",
    "hero.shareBtn": "Share Your Harvest",
    "hero.available": "listings available",
    "hero.availableSub": "Shared by gardeners near you",

    "stats.listings": "Fresh listings",
    "stats.neighbours": "Neighbours sharing",
    "stats.kg": "480 kg",
    "stats.rescued": "Produce rescued",
    "stats.waste": "Good food wasted",

    "how.eyebrow": "How it works",
    "how.title": "Sharing in three simple steps",
    "how.subtitle":
      "No accounts, no payments, no fuss. Just gardeners and neighbours helping each other out.",
    "step1.number": "Step 1",
    "step1.title": "List your extras",
    "step1.text":
      "Gardeners add surplus fruit and vegetables with the simple form below — it takes less than a minute.",
    "step2.number": "Step 2",
    "step2.title": "Browse & request",
    "step2.text":
      "Neighbours search, filter by category and area, then send a request for something they would love to cook.",
    "step3.number": "Step 3",
    "step3.title": "Meet & share",
    "step3.text":
      "Arrange a quick doorstep pickup. Less waste, fresher food, and maybe a new friend on your street.",

    "browse.eyebrow": "Fresh near you",
    "browse.title": "Browse neighbourhood produce",
    "browse.subtitle":
      "Search by name, or filter by category, location and availability to find something tasty nearby.",
    "search.placeholder": "Search produce by name...",
    "filter.all": "All",
    "filter.fruits": "Fruits",
    "filter.vegetables": "Vegetables",
    "filter.allLocations": "All locations",
    "filter.anyStatus": "Any availability",
    "filter.availableOnly": "Available only",
    "filter.requestedOnly": "Already requested",
    "results.showing": "Showing",
    "results.of": "of",
    "results.listings": "listings",

    "empty.title": "No produce found",
    "empty.text":
      "Try a different search word, or clear the filters to see everything.",
    "empty.button": "Clear all filters",

    "card.grownBy": "Grown by",
    "card.available": "available",
    "card.request": "Request",
    "card.requested": "Requested",
    "card.statusAvailable": "Available",
    "card.yourListing": "This is your listing",
    "card.remove": "Remove",

    "cat.fruit": "Fruit",
    "cat.vegetable": "Vegetable",
    "harvest.today": "Picked today",
    "harvest.yesterday": "Picked yesterday",
    "harvest.week": "Picked this week",

    "add.eyebrow": "For gardeners",
    "add.title": "Share your extra produce",
    "add.text":
      "Glut of courgettes? Apple tree working overtime? Add a listing and a neighbour will happily take the extras off your hands.",
    "add.tip1": "Only list produce you would happily eat yourself.",
    "add.tip2": 'Give a clear quantity, like "2 kg" or "6 pieces".',
    "add.tip3": "Say when it was picked so neighbours know it is fresh.",
    "add.tip4":
      "Your listing is saved in the browser, so it stays after a refresh.",

    "form.title": "Add a new listing",
    "form.note": "Fields marked * are required.",
    "form.name": "Produce name *",
    "form.namePh": "e.g. Cherry Tomatoes",
    "form.category": "Category *",
    "form.chooseCategory": "Choose a category",
    "form.quantity": "Quantity *",
    "form.quantityPh": "e.g. 2 kg or 6 pieces",
    "form.location": "Location *",
    "form.locationPh": "e.g. Maplewood",
    "form.gardener": "Your name *",
    "form.gardenerPh": "e.g. Alex Johnson",
    "form.harvest": "When was it picked?",
    "form.photo": "Photo URL (optional)",
    "form.description": "Short description (optional)",
    "form.descriptionPh": "Tell neighbours a little about it...",
    "form.submit": "Add Listing",

    "error.name": "Please enter the name of the produce.",
    "error.category": "Please choose a category.",
    "error.quantity": "Please enter a quantity.",
    "error.location": "Please enter your area or neighbourhood.",
    "error.gardener": "Please enter your name.",
    "error.fillFields":
      "Please fill in all the highlighted fields before adding your listing.",

    "msg.thanks": "Thank you",
    "msg.listingLive": "Your listing for NAME is now live below.",
    "msg.listingAdded": "Listing added: NAME.",
    "msg.listingRemoved": "Your listing for NAME was removed.",
    "msg.confirmRemove": "Remove your listing for NAME?",
    "msg.defaultDesc": "Fresh from my garden and ready for a new home.",

    "modal.title": "Request",
    "modal.text":
      "You are requesting QTY of NAME from GARDENER in PLACE. Leave your name and they will arrange a pickup with you.",
    "modal.name": "Your name *",
    "modal.namePh": "e.g. Sam Taylor",
    "modal.note": "Message for the gardener (optional)",
    "modal.notePh": "e.g. I can collect this evening after 6pm.",
    "modal.cancel": "Cancel",
    "modal.send": "Send Request",
    "modal.nameError":
      "Please enter your name so the gardener knows who is asking.",
    "modal.sent":
      "Request sent, NAME! GARDENER will be in touch to arrange pickup.",

    "cta.title": "More tomatoes than you can eat?",
    "cta.text":
      "Somewhere on your street, a neighbour is dreaming of exactly those tomatoes.",
    "cta.button": "Share Your Harvest",

    "footer.about":
      "A friendly neighbourhood project that connects gardeners with surplus produce to neighbours who will enjoy it. Fresh food, zero waste.",
    "footer.quickTitle": "Quick Links",
    "footer.catTitle": "Categories",
    "footer.catFruit": "Fresh Fruits",
    "footer.catVeg": "Fresh Vegetables",
    "footer.catAll": "Everything",
    "footer.projectTitle": "About This Project",
    "footer.projectText":
      "Final course project built with plain HTML, CSS and JavaScript only — no frameworks and no backend. Just open index.html in a browser.",
    "footer.rights": "HarvestShare. Made for learning.",
    "footer.slogan": "Grown locally, shared generously.",

    "theme.toDark": "Switch to dark mode",
    "theme.toLight": "Switch to light mode",
    "theme.darkOn": "Dark mode turned on.",
    "theme.lightOn": "Light mode turned on.",
    "lang.switch": "Switch language to Dari",
    "lang.changed": "Language changed to English.",

    "credits.button": "Made by",
    "credits.title": "Made by",
    "credits.text":
      "This HarvestShare project was designed and built by our team for the final course project.",
    "credits.name1": "Nima Nabizada",
    "credits.name2": "Abdul Musawer Yosufzai",
    "credits.name3": "Fazl Rahman Pakhtoon",
    "credits.tap": "Click to see contact",
    "credits.whatsapp": "WhatsApp",
    "credits.email": "Email",
    "credits.note": "Built with HTML, CSS and vanilla JavaScript.",
    "credits.close": "Close",
    "credits.toast": "Project by Nima, Abdul Musawer and Fazl Rahman.",
  },

  fa: {
    "nav.home": "خانه",
    "nav.how": "چگونه کار می‌کند",
    "nav.browse": "مرور محصولات",
    "nav.share": "اشتراک محصول",

    "hero.badge": "تبادل محصولات محله",
    "hero.title1": "تازه از باغچه،",
    "hero.title2": "برای همسایگان شما.",
    "hero.subtitle":
      "هارویست‌شیر به باغبانان کمک می‌کند میوه و سبزی اضافی خود را فهرست کنند تا همسایگان نزدیک از آن استفاده کنند — ضایعات کمتر، غذای تازه‌تر و محله‌ای صمیمی‌تر.",
    "hero.browseBtn": "مرور محصولات",
    "hero.shareBtn": "محصول خود را شریک شوید",
    "hero.available": "فهرست موجود است",
    "hero.availableSub": "به اشتراک گذاشته شده توسط باغبانان نزدیک شما",

    "stats.listings": "فهرست‌های تازه",
    "stats.neighbours": "همسایگان مشارکت‌کننده",
    "stats.kg": "۴۸۰ کیلوگرم",
    "stats.rescued": "محصول نجات‌یافته",
    "stats.waste": "غذای خوب ضایع‌شده",

    "how.eyebrow": "چگونه کار می‌کند",
    "how.title": "اشتراک‌گذاری در سه گام ساده",
    "how.subtitle":
      "بدون حساب کاربری، بدون پرداخت و بدون دردسر. فقط باغبانان و همسایگانی که به یکدیگر کمک می‌کنند.",
    "step1.number": "گام ۱",
    "step1.title": "اضافه‌های خود را فهرست کنید",
    "step1.text":
      "باغبانان میوه و سبزی اضافی خود را با فرم ساده پایین اضافه می‌کنند — کمتر از یک دقیقه وقت می‌گیرد.",
    "step2.number": "گام ۲",
    "step2.title": "جستجو و درخواست",
    "step2.text":
      "همسایگان جستجو می‌کنند، بر اساس دسته و منطقه فیلتر می‌کنند و برای آنچه دوست دارند درخواست می‌فرستند.",
    "step3.number": "گام ۳",
    "step3.title": "دیدار و اشتراک",
    "step3.text":
      "یک تحویل کوتاه دم دروازه هماهنگ کنید. ضایعات کمتر، غذای تازه‌تر و شاید یک دوست جدید در محله.",

    "browse.eyebrow": "تازه در نزدیکی شما",
    "browse.title": "مرور محصولات محله",
    "browse.subtitle":
      "بر اساس نام جستجو کنید، یا با دسته، موقعیت و موجودی فیلتر کنید تا چیز خوشمزه‌ای در نزدیکی خود پیدا کنید.",
    "search.placeholder": "جستجوی محصول بر اساس نام...",
    "filter.all": "همه",
    "filter.fruits": "میوه‌ها",
    "filter.vegetables": "سبزیجات",
    "filter.allLocations": "همه موقعیت‌ها",
    "filter.anyStatus": "هر وضعیت",
    "filter.availableOnly": "فقط موجود",
    "filter.requestedOnly": "درخواست‌شده",
    "results.showing": "نمایش",
    "results.of": "از",
    "results.listings": "فهرست",

    "empty.title": "محصولی یافت نشد",
    "empty.text":
      "کلمه دیگری را جستجو کنید، یا فیلترها را پاک کنید تا همه چیز را ببینید.",
    "empty.button": "پاک کردن همه فیلترها",

    "card.grownBy": "باغبان:",
    "card.available": "موجود",
    "card.request": "درخواست",
    "card.requested": "درخواست شد",
    "card.statusAvailable": "موجود",
    "card.yourListing": "این فهرست شما است",
    "card.remove": "حذف",

    "cat.fruit": "میوه",
    "cat.vegetable": "سبزی",
    "harvest.today": "امروز چیده شده",
    "harvest.yesterday": "دیروز چیده شده",
    "harvest.week": "این هفته چیده شده",

    "add.eyebrow": "برای باغبانان",
    "add.title": "محصولات اضافی خود را شریک شوید",
    "add.text":
      "کدوی زیاد دارید؟ درخت سیب شما پربار شده؟ یک فهرست اضافه کنید تا همسایه‌ای با خوشحالی اضافه‌ها را ببرد.",
    "add.tip1": "فقط محصولی را فهرست کنید که خودتان با میل می‌خورید.",
    "add.tip2": "مقدار را روشن بنویسید، مانند «۲ کیلوگرم» یا «۶ دانه».",
    "add.tip3": "بنویسید چه وقت چیده شده تا همسایگان از تازگی آن مطمئن شوند.",
    "add.tip4":
      "فهرست شما در مرورگر ذخیره می‌شود و پس از تازه‌سازی صفحه باقی می‌ماند.",

    "form.title": "افزودن فهرست جدید",
    "form.note": "فیلدهای دارای * الزامی هستند.",
    "form.name": "نام محصول *",
    "form.namePh": "مثال: بادنجان رومی",
    "form.category": "دسته *",
    "form.chooseCategory": "یک دسته انتخاب کنید",
    "form.quantity": "مقدار *",
    "form.quantityPh": "مثال: ۲ کیلوگرم یا ۶ دانه",
    "form.location": "موقعیت *",
    "form.locationPh": "مثال: کارته پروان",
    "form.gardener": "نام شما *",
    "form.gardenerPh": "مثال: احمد رضایی",
    "form.harvest": "چه وقت چیده شد؟",
    "form.photo": "لینک عکس (اختیاری)",
    "form.description": "توضیح کوتاه (اختیاری)",
    "form.descriptionPh": "کمی درباره آن به همسایگان بگویید...",
    "form.submit": "افزودن فهرست",

    "error.name": "لطفاً نام محصول را وارد کنید.",
    "error.category": "لطفاً یک دسته را انتخاب کنید.",
    "error.quantity": "لطفاً مقدار را وارد کنید.",
    "error.location": "لطفاً منطقه یا محله خود را وارد کنید.",
    "error.gardener": "لطفاً نام خود را وارد کنید.",
    "error.fillFields":
      "لطفاً پیش از افزودن فهرست، همه فیلدهای مشخص‌شده را پر کنید.",

    "msg.thanks": "تشکر",
    "msg.listingLive": "فهرست شما برای NAME اکنون در پایین فعال است.",
    "msg.listingAdded": "فهرست اضافه شد: NAME.",
    "msg.listingRemoved": "فهرست شما برای NAME حذف شد.",
    "msg.confirmRemove": "آیا فهرست خود برای NAME را حذف می‌کنید؟",
    "msg.defaultDesc": "تازه از باغچه من و آماده برای خانه‌ای جدید.",

    "modal.title": "درخواست",
    "modal.text":
      "شما QTY از NAME را از GARDENER در PLACE درخواست می‌کنید. نام خود را بنویسید تا برای تحویل با شما هماهنگ کند.",
    "modal.name": "نام شما *",
    "modal.namePh": "مثال: سمیع احمدی",
    "modal.note": "پیام برای باغبان (اختیاری)",
    "modal.notePh": "مثال: امشب بعد از ساعت ۶ می‌توانم بگیرم.",
    "modal.cancel": "لغو",
    "modal.send": "ارسال درخواست",
    "modal.nameError":
      "لطفاً نام خود را وارد کنید تا باغبان بداند چه کسی درخواست داده است.",
    "modal.sent":
      "درخواست ارسال شد، NAME! GARDENER برای هماهنگی تحویل با شما تماس می‌گیرد.",

    "cta.title": "بادنجان رومی بیشتر از آنچه می‌توانید بخورید؟",
    "cta.text": "جایی در همین محله، همسایه‌ای آرزوی همان محصولات را دارد.",
    "cta.button": "محصول خود را شریک شوید",

    "footer.about":
      "یک پروژه دوستانه محله‌ای که باغبانان دارای محصول اضافی را به همسایگانی که از آن لذت می‌برند وصل می‌کند. غذای تازه، بدون ضایعات.",
    "footer.quickTitle": "لینک‌های سریع",
    "footer.catTitle": "دسته‌ها",
    "footer.catFruit": "میوه‌های تازه",
    "footer.catVeg": "سبزیجات تازه",
    "footer.catAll": "همه چیز",
    "footer.projectTitle": "درباره این پروژه",
    "footer.projectText":
      "پروژه نهایی دوره، ساخته‌شده تنها با HTML، CSS و جاوااسکریپت ساده — بدون فریم‌ورک و بدون بک‌اند. کافی است index.html را در مرورگر باز کنید.",
    "footer.rights": "هارویست‌شیر. ساخته شده برای یادگیری.",
    "footer.slogan": "محلی پرورش یافته، سخاوتمندانه به اشتراک گذاشته شده.",

    "theme.toDark": "تغییر به حالت تاریک",
    "theme.toLight": "تغییر به حالت روشن",
    "theme.darkOn": "حالت تاریک روشن شد.",
    "theme.lightOn": "حالت روشن فعال شد.",
    "lang.switch": "تغییر زبان به انگلیسی",
    "lang.changed": "زبان به دری تغییر کرد.",

    "credits.button": "سازندگان",
    "credits.title": "سازندگان پروژه",
    "credits.text":
      "این پروژه هارویست‌شیر توسط تیم ما برای پروژه نهایی دوره طراحی و ساخته شده است.",
    "credits.name1": "نیما نبی‌زاده",
    "credits.name2": "عبدالمصور یوسفزی",
    "credits.name3": "فضل رحمان پښتون",
    "credits.tap": "برای دیدن معلومات تماس کلیک کنید",
    "credits.whatsapp": "واتساپ",
    "credits.email": "ایمیل",
    "credits.note": "ساخته شده با HTML، CSS و جاوااسکریپت ساده.",
    "credits.close": "بستن",
    "credits.toast": "پروژه از نیما، عبدالمصور و فضل رحمان.",
  },
};

// Dari names for the sample locations.
// If a location is not in this list (for example one the user
// typed), the original text is shown instead.
const locationNames = {
  Maplewood: "میپل‌وود",
  Oakdale: "اوک‌دیل",
  Riverside: "ریورساید",
  Hillcrest: "هیل‌کرست",
  Sunnyvale: "سانی‌ویل",
  Downtown: "مرکز شهر",
};

// The language shown at the moment: "en" (English) or "fa" (Dari)
let currentLang = "en";

// t() = "translate". Give it a key, get the text in the current language.
function t(key) {
  const texts = translations[currentLang];
  if (texts[key]) {
    return texts[key];
  }
  return key; // if a key is missing we simply show the key
}

// -----------------------------------------------------
// 3. IMAGES USED AS BACKUPS
// If a photo fails to load, or the user does not provide
// one, we swap in one of these reliable images instead.
// -----------------------------------------------------
const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80";
const DEFAULT_FRUIT_IMAGE =
  "https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&w=800&q=80";
const DEFAULT_VEGETABLE_IMAGE =
  "https://images.unsplash.com/photo-1518843875459-f738682238a6?auto=format&fit=crop&w=800&q=80";

// Small SVG icons drawn inside each produce card (kept as text strings)
const ICON_PIN =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z"/><circle cx="12" cy="10" r="2.6"/></svg>';
const ICON_USER =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4.5 20.5c.8-3.4 3.9-5 7.5-5s6.7 1.6 7.5 5"/></svg>';
const ICON_BASKET =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 8h14l-1.4 11a2 2 0 0 1-2 1.8H8.4a2 2 0 0 1-2-1.8L5 8z"/><path d="M9 10V6a3 3 0 0 1 6 0v4"/></svg>';
const ICON_CLOCK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';
const ICON_CHECK =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 12.5l5 5L20 6.5"/></svg>';

// -----------------------------------------------------
// 4. LOAD SAVED DATA FROM localStorage
// Listings the user added, their requests, the chosen theme
// and the chosen language are all stored in the browser.
// -----------------------------------------------------
let userListings = [];
const savedListings = localStorage.getItem("harvestShareListings");
if (savedListings) {
  userListings = JSON.parse(savedListings);
}

let requestedIds = [];
const savedRequests = localStorage.getItem("harvestShareRequests");
if (savedRequests) {
  requestedIds = JSON.parse(savedRequests);
}

// One combined list used by the whole page.
// The visitor's own listings come first so new items are easy to spot.
let allProduce = userListings.concat(sampleProduce);

// The category filter currently chosen ("All", "Fruit" or "Vegetable")
let currentCategory = "All";

// Remembers which listing the open request popup is about
let selectedRequestId = null;

// -----------------------------------------------------
// 5. GRAB THE PAGE ELEMENTS WE NEED
// -----------------------------------------------------
const produceGrid = document.getElementById("produceGrid");
const emptyState = document.getElementById("emptyState");
const resultsCount = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");
const locationFilter = document.getElementById("locationFilter");
const availabilityFilter = document.getElementById("availabilityFilter");
const categoryPills = document.querySelectorAll(".pill");
const clearFiltersButton = document.getElementById("clearFilters");

const addForm = document.getElementById("addForm");
const nameInput = document.getElementById("fName");
const categoryInput = document.getElementById("fCategory");
const quantityInput = document.getElementById("fQuantity");
const locationInput = document.getElementById("fLocation");
const gardenerInput = document.getElementById("fGardener");
const harvestInput = document.getElementById("fHarvest");
const imageInput = document.getElementById("fImage");
const descriptionInput = document.getElementById("fDescription");
const formMessage = document.getElementById("formMessage");

const requestModal = document.getElementById("requestModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const requestForm = document.getElementById("requestForm");
const requestNameInput = document.getElementById("requestName");
const requestNoteInput = document.getElementById("requestNote");
const requestMessage = document.getElementById("requestMessage");

const toast = document.getElementById("toast");
const menuButton = document.getElementById("menuButton");
const mainNav = document.getElementById("mainNav");
const themeButton = document.getElementById("themeButton");
const langButton = document.getElementById("langButton");
const langLabel = document.getElementById("langLabel");
const creditsButton = document.getElementById("creditsButton");
const creditsModal = document.getElementById("creditsModal");

// -----------------------------------------------------
// 6. SMALL HELPER FUNCTIONS
// -----------------------------------------------------

// Save the user's own listings back into localStorage
function saveUserListings() {
  localStorage.setItem("harvestShareListings", JSON.stringify(userListings));
}

// Save the list of requested listing ids into localStorage
function saveRequestedIds() {
  localStorage.setItem("harvestShareRequests", JSON.stringify(requestedIds));
}

// A listing counts as "requested" if it started that way in the
// sample data, or if its id is in our saved requestedIds list
function isRequested(item) {
  return item.requested === true || requestedIds.indexOf(item.id) !== -1;
}

// Find one listing object by its id number (returns null if not found)
function findProduceById(id) {
  for (let i = 0; i < allProduce.length; i++) {
    if (allProduce[i].id === id) {
      return allProduce[i];
    }
  }
  return null;
}

// --- The next four functions give the correct language for a listing ---

// Produce name (Dari version when available)
function getName(item) {
  if (currentLang === "fa" && item.nameFa) {
    return item.nameFa;
  }
  return item.name;
}

// Description (Dari version when available)
function getDescription(item) {
  if (currentLang === "fa" && item.descFa) {
    return item.descFa;
  }
  return item.description;
}

// Location name (falls back to the original text)
function getLocation(place) {
  if (currentLang === "fa" && locationNames[place]) {
    return locationNames[place];
  }
  return place;
}

// Category word: "Fruit" -> "میوه"
function getCategory(category) {
  if (category === "Fruit") {
    return t("cat.fruit");
  }
  return t("cat.vegetable");
}

// Harvest sentence: "Picked today" -> "امروز چیده شده"
function getHarvest(harvested) {
  if (harvested === "Picked yesterday") {
    return t("harvest.yesterday");
  }
  if (harvested === "Picked this week") {
    return t("harvest.week");
  }
  return t("harvest.today");
}

// Translate the units inside a quantity, e.g. "2 kg" -> "2 کیلوگرم"
function getQuantity(quantity) {
  if (currentLang === "en") {
    return quantity;
  }
  let text = quantity;
  text = text.replace(" kg", " کیلوگرم");
  text = text.replace(" g", " گرام");
  text = text.replace(" pieces", " دانه");
  text = text.replace(" heads", " عدد");
  return text;
}

// Show a short confirmation message at the bottom of the screen
let toastTimer = null;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer); // restart the timer if a toast is already showing
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 3600);
}

// -----------------------------------------------------
// 7. BUILD THE LOCATION DROPDOWN
// Collects every different location from the listings
// so the filter always matches the data on the page.
// -----------------------------------------------------
function buildLocationOptions() {
  const locations = [];
  for (let i = 0; i < allProduce.length; i++) {
    const place = allProduce[i].location;
    if (locations.indexOf(place) === -1) {
      // only add it once
      locations.push(place);
    }
  }
  locations.sort(); // alphabetical order

  const previousChoice = locationFilter.value;
  locationFilter.innerHTML =
    '<option value="All locations">' + t("filter.allLocations") + "</option>";
  for (let i = 0; i < locations.length; i++) {
    // The value stays in English so filtering keeps working,
    // only the visible label is translated.
    locationFilter.innerHTML +=
      '<option value="' +
      locations[i] +
      '">' +
      getLocation(locations[i]) +
      "</option>";
  }

  // Keep the visitor's previous choice if it still exists
  if (locations.indexOf(previousChoice) !== -1) {
    locationFilter.value = previousChoice;
  }
}

// -----------------------------------------------------
// 8. DRAW THE PRODUCE CARDS
// Takes a list of listings and builds one card for each.
// -----------------------------------------------------
function renderProduce(list) {
  produceGrid.innerHTML = ""; // clear the old cards first

  // Show or hide the "no results" message
  if (list.length === 0) {
    emptyState.hidden = false;
  } else {
    emptyState.hidden = true;
  }

  resultsCount.textContent =
    t("results.showing") +
    " " +
    list.length +
    " " +
    t("results.of") +
    " " +
    allProduce.length +
    " " +
    t("results.listings");

  // Build one card per item using a loop
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    const requested = isRequested(item);

    // Availability badge (green) or "Requested" badge (amber)
    let statusBadge = "";
    let requestButton = "";
    if (requested) {
      statusBadge =
        '<span class="badge badge-status badge-requested">' +
        t("card.requested") +
        "</span>";
      requestButton =
        '<button type="button" class="request-btn" disabled>' +
        ICON_CHECK +
        t("card.requested") +
        "</button>";
    } else {
      statusBadge =
        '<span class="badge badge-status badge-available">' +
        t("card.statusAvailable") +
        "</span>";
      requestButton =
        '<button type="button" class="request-btn" data-id="' +
        item.id +
        '">' +
        t("card.request") +
        "</button>";
    }

    // Listings added by the visitor get an extra row with a remove option
    let ownRow = "";
    if (item.isMine) {
      ownRow =
        '<div class="own-row">' +
        "<span>" +
        t("card.yourListing") +
        "</span>" +
        '<button type="button" class="remove-btn" data-id="' +
        item.id +
        '">' +
        t("card.remove") +
        "</button>" +
        "</div>";
    }

    // One card of HTML. The onerror attribute swaps in a backup
    // photo if this item's image ever fails to load.
    const cardHtml =
      '<article class="card">' +
      '<div class="card-image">' +
      '<img src="' +
      item.image +
      '" alt="' +
      getName(item) +
      '" loading="lazy" ' +
      "onerror=\"this.onerror=null;this.src='" +
      FALLBACK_IMAGE +
      "';\">" +
      '<span class="badge badge-category badge-' +
      item.category.toLowerCase() +
      '">' +
      getCategory(item.category) +
      "</span>" +
      statusBadge +
      "</div>" +
      '<div class="card-body">' +
      '<h3 class="card-title">' +
      getName(item) +
      "</h3>" +
      '<p class="card-desc">' +
      getDescription(item) +
      "</p>" +
      '<ul class="card-meta">' +
      "<li>" +
      ICON_PIN +
      getLocation(item.location) +
      "</li>" +
      "<li>" +
      ICON_USER +
      t("card.grownBy") +
      " " +
      item.gardener +
      "</li>" +
      "<li>" +
      ICON_BASKET +
      getQuantity(item.quantity) +
      " " +
      t("card.available") +
      "</li>" +
      "</ul>" +
      '<div class="card-footer">' +
      '<span class="harvest-info">' +
      ICON_CLOCK +
      getHarvest(item.harvested) +
      "</span>" +
      requestButton +
      "</div>" +
      ownRow +
      "</div>" +
      "</article>";

    produceGrid.innerHTML += cardHtml;
  }
}

// -----------------------------------------------------
// 9. FILTERING
// Reads the search box and the three filters, works out
// which listings match, then redraws the cards.
// -----------------------------------------------------
function applyFilters() {
  const searchText = searchInput.value.toLowerCase().trim();
  const chosenLocation = locationFilter.value;
  const chosenAvailability = availabilityFilter.value;

  const filtered = []; // listings that pass every check end up here

  for (let i = 0; i < allProduce.length; i++) {
    const item = allProduce[i];

    // Check 1: does the name contain the search text?
    // We look in both languages so searching always works.
    const englishName = item.name.toLowerCase();
    const dariName = item.nameFa ? item.nameFa : item.name;
    const matchesSearch =
      englishName.indexOf(searchText) !== -1 ||
      dariName.indexOf(searchText) !== -1;

    // Check 2: does the category match the chosen pill?
    const matchesCategory =
      currentCategory === "All" || item.category === currentCategory;

    // Check 3: does the location match the dropdown?
    const matchesLocation =
      chosenLocation === "All locations" || item.location === chosenLocation;

    // Check 4: does the availability match?
    let matchesAvailability = true;
    if (chosenAvailability === "Available") {
      matchesAvailability = isRequested(item) === false;
    } else if (chosenAvailability === "Requested") {
      matchesAvailability = isRequested(item) === true;
    }

    if (
      matchesSearch &&
      matchesCategory &&
      matchesLocation &&
      matchesAvailability
    ) {
      filtered.push(item);
    }
  }

  renderProduce(filtered);
}

// Change the active category pill and re-run the filters.
// Used by the pills, the footer links and the "clear" button.
function setCategory(category) {
  currentCategory = category;
  for (let i = 0; i < categoryPills.length; i++) {
    if (categoryPills[i].getAttribute("data-category") === category) {
      categoryPills[i].classList.add("active");
    } else {
      categoryPills[i].classList.remove("active");
    }
  }
  applyFilters();
}

// Reset every filter back to "show everything"
function clearAllFilters() {
  searchInput.value = "";
  locationFilter.value = "All locations";
  availabilityFilter.value = "All";
  setCategory("All"); // setCategory also redraws the cards
}

// Update the two counters in the hero section
function updateStats() {
  let availableCount = 0;
  for (let i = 0; i < allProduce.length; i++) {
    if (isRequested(allProduce[i]) === false) {
      availableCount++;
    }
  }
  document.getElementById("statListings").textContent = allProduce.length;
  document.getElementById("freshCount").textContent = availableCount;
}

// -----------------------------------------------------
// 10. FILTER EVENTS
// Re-run applyFilters whenever the visitor changes anything.
// -----------------------------------------------------
searchInput.addEventListener("input", applyFilters);
locationFilter.addEventListener("change", applyFilters);
availabilityFilter.addEventListener("change", applyFilters);
clearFiltersButton.addEventListener("click", clearAllFilters);

for (let i = 0; i < categoryPills.length; i++) {
  const pill = categoryPills[i];
  pill.addEventListener("click", function () {
    setCategory(pill.getAttribute("data-category"));
  });
}

// Footer category shortcuts set the same filter
const footerCategoryLinks = document.querySelectorAll(".footer-cat");
for (let i = 0; i < footerCategoryLinks.length; i++) {
  const link = footerCategoryLinks[i];
  link.addEventListener("click", function () {
    setCategory(link.getAttribute("data-category"));
  });
}

// -----------------------------------------------------
// 11. REQUEST POPUP (MODAL)
// -----------------------------------------------------
function openRequestModal(id) {
  const item = findProduceById(id);
  if (item === null) {
    return;
  }
  selectedRequestId = id;

  modalTitle.textContent = t("modal.title") + " " + getName(item);

  // Take the sentence from the dictionary and replace the
  // placeholder words with the real details of this listing.
  let sentence = t("modal.text");
  sentence = sentence.replace("QTY", getQuantity(item.quantity));
  sentence = sentence.replace("NAME", getName(item));
  sentence = sentence.replace("GARDENER", item.gardener);
  sentence = sentence.replace("PLACE", getLocation(item.location));
  modalText.textContent = sentence;

  requestNameInput.value = "";
  requestNoteInput.value = "";
  requestMessage.textContent = "";
  requestModal.hidden = false; // show the popup
  requestNameInput.focus();
}

function closeRequestModal() {
  requestModal.hidden = true;
  selectedRequestId = null;
}

// Close buttons, clicking the dark background, and the Escape key all close it
document
  .getElementById("closeModal")
  .addEventListener("click", closeRequestModal);
document
  .getElementById("cancelRequest")
  .addEventListener("click", closeRequestModal);
requestModal.addEventListener("click", function (event) {
  if (event.target === requestModal) {
    closeRequestModal();
  }
});
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeRequestModal();
    document.getElementById("creditsModal").hidden = true; // also close the credits popup
  }
});

// When the request form is submitted
requestForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  const visitorName = requestNameInput.value.trim();
  if (visitorName === "") {
    requestMessage.textContent = t("modal.nameError");
    requestMessage.className = "form-message error";
    return;
  }

  const item = findProduceById(selectedRequestId);
  if (item !== null && requestedIds.indexOf(item.id) === -1) {
    requestedIds.push(item.id); // mark this listing as requested
    saveRequestedIds();
  }

  closeRequestModal();
  applyFilters(); // redraw cards so the badge and button update
  updateStats();

  // Friendly confirmation message
  if (item !== null) {
    let message = t("modal.sent");
    message = message.replace("NAME", visitorName);
    message = message.replace("GARDENER", item.gardener);
    showToast(message);
  }
});

// -----------------------------------------------------
// 12. CLICKS INSIDE THE CARD GRID
// One listener on the grid handles every Request and
// Remove button, even though the cards are rebuilt often.
// -----------------------------------------------------
produceGrid.addEventListener("click", function (event) {
  if (event.target.classList.contains("request-btn")) {
    const id = Number(event.target.getAttribute("data-id"));
    openRequestModal(id);
  }
  if (event.target.classList.contains("remove-btn")) {
    const id = Number(event.target.getAttribute("data-id"));
    removeListing(id);
  }
});

// Remove a listing that the visitor added themselves
function removeListing(id) {
  const item = findProduceById(id);
  if (item === null) {
    return;
  }

  const question = t("msg.confirmRemove").replace(
    "NAME",
    '"' + getName(item) + '"',
  );
  const sure = confirm(question);
  if (sure === false) {
    return;
  }

  // Build a new list without this item
  const keptListings = [];
  for (let i = 0; i < userListings.length; i++) {
    if (userListings[i].id !== id) {
      keptListings.push(userListings[i]);
    }
  }
  userListings = keptListings;

  // Also forget any request made for it
  const keptRequests = [];
  for (let i = 0; i < requestedIds.length; i++) {
    if (requestedIds[i] !== id) {
      keptRequests.push(requestedIds[i]);
    }
  }
  requestedIds = keptRequests;

  saveUserListings();
  saveRequestedIds();
  allProduce = userListings.concat(sampleProduce); // rebuild the combined list
  buildLocationOptions();
  applyFilters();
  updateStats();
  showToast(t("msg.listingRemoved").replace("NAME", getName(item)));
}

// -----------------------------------------------------
// 13. ADD-PRODUCE FORM
// -----------------------------------------------------

// Mark a field as having an error (or clear the error) by
// adding/removing a class on its wrapping .form-group div.
// The CSS shows the red border and the small error text.
function setFieldError(input, hasError) {
  const group = input.closest(".form-group");
  if (hasError) {
    group.classList.add("error");
  } else {
    group.classList.remove("error");
  }
}

// Show a message inside a form. type is "success" or "error".
function showFormMessage(element, text, type) {
  element.textContent = text;
  element.className = "form-message " + type;
}

// Clear a field's error styling as soon as the visitor starts fixing it
const addFormFields = addForm.querySelectorAll("input, select, textarea");
for (let i = 0; i < addFormFields.length; i++) {
  addFormFields[i].addEventListener("input", function () {
    this.closest(".form-group").classList.remove("error");
  });
}

// When the "Add Listing" form is submitted
addForm.addEventListener("submit", function (event) {
  event.preventDefault(); // stop the page from reloading

  // Read the values and trim away spaces at the start and end
  const name = nameInput.value.trim();
  const category = categoryInput.value;
  const quantity = quantityInput.value.trim();
  const place = locationInput.value.trim();
  const gardener = gardenerInput.value.trim();
  const harvested = harvestInput.value;
  const imageUrl = imageInput.value.trim();
  const description = descriptionInput.value.trim();

  // --- Validation: every required field must be filled in ---
  let isValid = true;

  if (name === "") {
    setFieldError(nameInput, true);
    isValid = false;
  } else {
    setFieldError(nameInput, false);
  }

  if (category === "") {
    setFieldError(categoryInput, true);
    isValid = false;
  } else {
    setFieldError(categoryInput, false);
  }

  if (quantity === "") {
    setFieldError(quantityInput, true);
    isValid = false;
  } else {
    setFieldError(quantityInput, false);
  }

  if (place === "") {
    setFieldError(locationInput, true);
    isValid = false;
  } else {
    setFieldError(locationInput, false);
  }

  if (gardener === "") {
    setFieldError(gardenerInput, true);
    isValid = false;
  } else {
    setFieldError(gardenerInput, false);
  }

  if (isValid === false) {
    showFormMessage(formMessage, t("error.fillFields"), "error");
    return; // stop here — do not add anything
  }

  // --- Create the new listing object ---
  // Date.now() gives a big unique number, perfect as an id.
  // If no photo URL was given, pick a default picture for the category.
  const newItem = {
    id: Date.now(),
    name: name,
    category: category,
    quantity: quantity,
    location: place,
    gardener: gardener,
    description: description === "" ? t("msg.defaultDesc") : description,
    harvested: harvested,
    image:
      imageUrl === ""
        ? category === "Fruit"
          ? DEFAULT_FRUIT_IMAGE
          : DEFAULT_VEGETABLE_IMAGE
        : imageUrl,
    requested: false,
    isMine: true,
  };

  // Save it: user's listings are stored newest-first
  userListings.unshift(newItem);
  saveUserListings();
  allProduce = userListings.concat(sampleProduce);

  // Refresh the page pieces that depend on the data
  buildLocationOptions(); // in case a brand-new location was typed
  clearAllFilters(); // makes sure the new card is visible
  updateStats();

  // Friendly feedback, then clear the form ready for next time
  const successText =
    t("msg.thanks") +
    ", " +
    gardener +
    "! " +
    t("msg.listingLive").replace("NAME", name);
  showFormMessage(formMessage, successText, "success");
  showToast(t("msg.listingAdded").replace("NAME", name));
  addForm.reset();

  // After a short pause, scroll down so the visitor sees their new card
  setTimeout(function () {
    document.getElementById("browse").scrollIntoView({ behavior: "smooth" });
  }, 900);
});

// -----------------------------------------------------
// 14. DARK / LIGHT MODE
// Adding the class "dark" to <body> swaps all the colours,
// because the CSS variables change inside "body.dark".
// -----------------------------------------------------
function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    themeButton.setAttribute("aria-label", t("theme.toLight"));
  } else {
    document.body.classList.remove("dark");
    themeButton.setAttribute("aria-label", t("theme.toDark"));
  }
  localStorage.setItem("harvestShareTheme", theme); // remember the choice
}

themeButton.addEventListener("click", function () {
  // If the body already has the "dark" class, go back to light
  if (document.body.classList.contains("dark")) {
    applyTheme("light");
    showToast(t("theme.lightOn"));
  } else {
    applyTheme("dark");
    showToast(t("theme.darkOn"));
  }
});

// -----------------------------------------------------
// 15. LANGUAGE: ENGLISH <-> DARI
// Every translatable element in index.html has a
// data-i18n="key" attribute. We loop through them all
// and put the right text inside.
// -----------------------------------------------------
function applyLanguage(lang) {
  currentLang = lang;

  // Dari is written from right to left
  if (lang === "fa") {
    document.documentElement.lang = "fa";
    document.documentElement.dir = "rtl";
    document.body.classList.add("lang-fa");
    langLabel.textContent = "EN";
  } else {
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
    document.body.classList.remove("lang-fa");
    langLabel.textContent = "دری";
  }

  // Replace the text of every element that has data-i18n
  const textElements = document.querySelectorAll("[data-i18n]");
  for (let i = 0; i < textElements.length; i++) {
    const key = textElements[i].getAttribute("data-i18n");
    textElements[i].textContent = t(key);
  }

  // Replace the placeholder of every element that has data-i18n-placeholder
  const placeholderElements = document.querySelectorAll(
    "[data-i18n-placeholder]",
  );
  for (let i = 0; i < placeholderElements.length; i++) {
    const key = placeholderElements[i].getAttribute("data-i18n-placeholder");
    placeholderElements[i].placeholder = t(key);
  }

  // Update the two buttons in the header
  langButton.setAttribute("aria-label", t("lang.switch"));
  if (document.body.classList.contains("dark")) {
    themeButton.setAttribute("aria-label", t("theme.toLight"));
  } else {
    themeButton.setAttribute("aria-label", t("theme.toDark"));
  }

  // Rebuild the parts that JavaScript draws itself
  buildLocationOptions();
  applyFilters();

  localStorage.setItem("harvestShareLang", lang); // remember the choice
}

langButton.addEventListener("click", function () {
  if (currentLang === "en") {
    applyLanguage("fa");
  } else {
    applyLanguage("en");
  }
  showToast(t("lang.changed"));
});

// -----------------------------------------------------
// 16. "MADE BY" CREDITS POPUP
// Shows the names of the three students who built the site.
// -----------------------------------------------------
function openCreditsModal() {
  creditsModal.hidden = false;
}

function closeCreditsModal() {
  creditsModal.hidden = true;
}

creditsButton.addEventListener("click", function () {
  openCreditsModal();
  showToast(t("credits.toast"));
});

// Clicking a team member's name opens their WhatsApp and Email buttons.
// Clicking the same name again closes it.
const personButtons = document.querySelectorAll(".credits-person");
for (let i = 0; i < personButtons.length; i++) {
  personButtons[i].addEventListener("click", function () {
    // The button remembers which contact box belongs to it
    const boxId = this.getAttribute("data-member");
    const contactBox = document.getElementById(boxId);
    const row = this.closest(".credits-item");
    const isOpen = contactBox.hidden === false;

    // First close every contact box, so only one is open at a time
    for (let j = 0; j < personButtons.length; j++) {
      const otherId = personButtons[j].getAttribute("data-member");
      document.getElementById(otherId).hidden = true;
      personButtons[j].setAttribute("aria-expanded", "false");
      personButtons[j].closest(".credits-item").classList.remove("open");
    }

    // Then open this one, unless it was already open
    if (isOpen === false) {
      contactBox.hidden = false;
      this.setAttribute("aria-expanded", "true");
      row.classList.add("open");
    }
  });
}

// The X button and the Close button both shut the popup
document
  .getElementById("closeCredits")
  .addEventListener("click", closeCreditsModal);
document
  .getElementById("okCredits")
  .addEventListener("click", closeCreditsModal);

// Clicking the dark background closes it too
creditsModal.addEventListener("click", function (event) {
  if (event.target === creditsModal) {
    closeCreditsModal();
  }
});

// -----------------------------------------------------
// 17. MOBILE MENU & NAVIGATION HIGHLIGHTING
// -----------------------------------------------------
menuButton.addEventListener("click", function () {
  const isOpen = mainNav.classList.toggle("open"); // toggle returns the new state
  menuButton.setAttribute("aria-expanded", isOpen);
});

// Clicking any menu link closes the mobile menu again
const allNavLinks = mainNav.querySelectorAll("a");
for (let i = 0; i < allNavLinks.length; i++) {
  allNavLinks[i].addEventListener("click", function () {
    mainNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
}

// Highlight the menu link that was last clicked
const navLinks = mainNav.querySelectorAll(".nav-link");
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    for (let j = 0; j < navLinks.length; j++) {
      navLinks[j].classList.remove("active");
    }
    this.classList.add("active");
  });
}

// -----------------------------------------------------
// 18. PAGE LOAD
// Run these once when the page first opens.
// -----------------------------------------------------
document.getElementById("year").textContent = new Date().getFullYear();

// Use the theme and language saved last time (if there is one)
const savedTheme = localStorage.getItem("harvestShareTheme");
if (savedTheme === "dark") {
  applyTheme("dark");
} else {
  applyTheme("light");
}

const savedLang = localStorage.getItem("harvestShareLang");
if (savedLang === "fa") {
  applyLanguage("fa");
} else {
  applyLanguage("en"); // this also draws the cards and the location list
}

updateStats();
