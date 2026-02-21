
export interface KnowledgeItem {
    id: string;
    tags: string[];
    patterns: string[]; // Variations of questions
    answers: {
        tr: string;
        en: string;
        ar: string;
    };
}

export const knowledgeBase: KnowledgeItem[] = [
    {
        id: "pricing_factors",
        tags: ["fiyat", "ücret", "kaça", "ne kadar", "price", "cost", "how much", "السعر", "تكلفة", "كم"],
        patterns: [
            "Fiyat nedir?",
            "Saç ekimi kaç para?",
            "How much does it cost?",
            "What is the price?",
            "كم تكلفة زراعة الشعر؟",
            "ما هو السعر؟"
        ],
        answers: {
            tr: "Fiyatlarımız kişiye özel planlanır ve greft sayısı, uygulanacak teknik (DHI/FUE) veya paket içeriğine (otel/transfer dahil) göre değişir. Net bir fiyat verebilmemiz için WhatsApp üzerinden fotoğraflarınızı incelememiz gerekir.",
            en: "Our prices are personalized based on the number of grafts, the technique (DHI/FUE), and the package details (hotel/transfers). To give you an exact quote, we need to review your photos via WhatsApp.",
            ar: "تختلف أسعارنا بناءً على عدد البصيلات، التقنية المستخدمة (DHI/FUE)، وتفاصيل الباقة (بما في ذلك الفندق والنقل). للحصول على عرض سعر دقيق، نحتاج إلى فحص صورك عبر واتساب."
        }
    },
    {
        id: "process_duration",
        tags: ["süre", "kaç gün", "kaldım", "duration", "how long", "days", "stay", "مدة", "كم يوم", "البقاء"],
        patterns: [
            "İstanbul'da kaç gün kalmalıyım?",
            "İşlem ne kadar sürer?",
            "How many days should I stay?",
            "Duration of the trip?",
            "كم يوما يجب أن أبقى في اسطنبول؟",
            "كم تستغرق العملية؟"
        ],
        answers: {
            tr: "Toplamda 3 gün yeterlidir. 1. Gün: Karşılama ve otele yerleşme. 2. Gün: Operasyon günü. 3. Gün: Kontrol, ilk yıkama ve dönüş. Operasyonun kendisi ise ortalama 6-8 saat sürer.",
            en: "A total of 3 days is sufficient. Day 1: Arrival & Hotel check-in. Day 2: Operation day. Day 3: Check-up, first wash, and departure. The operation itself typically takes 6-8 hours.",
            ar: "يكفي البقاء لمدة 3 أيام. اليوم الأول: الاستقبال والفندق. اليوم الثاني: يوم العملية. اليوم الثالث: الفحص، الغسيل الأول والمغادرة. تستغرق العملية نفسها عادة 6-8 ساعات."
        }
    },
    {
        id: "dhi_fue_diff",
        tags: ["dhi", "fue", "fark", "teknik", "difference", "technique", "method", "الفرق", "تقنية", "طريقة"],
        patterns: [
            "DHI ve FUE arasındaki fark nedir?",
            "Hangisi daha iyi?",
            "What is the difference between DHI and FUE?",
            "Which method is better?",
            "ما الفرق بين DHI و FUE؟",
            "أي تقنية أفضل؟"
        ],
        answers: {
            tr: "FUE'de kanallar önceden açılır, sonra ekim yapılır. DHI (Kalem) yönteminde ise kanal açma ve ekim aynı anda yapılır. DHI, tıraşsız ekim ve sıklaştırma için daha uygundur, ancak sizin için en doğru kararı uzmanlarımız fotoğraflarınızı gördükten sonra verecektir.",
            en: "In FUE, channels are opened first, then grafts are planted. In DHI (CHOI Pen), channel opening and planting happen simultaneously. DHI is better for density and unshaved transplants, but our experts will decide the best method for you after seeing your photos.",
            ar: "في FUE، يتم فتح القنوات أولاً ثم زرع البصيلات. في DHI (قلم تشوي)، يتم فتح القنوات والزرع في وقت واحد. تعتبر DHI أفضل للكثافة والزراعة بدون حلاقة، لكن خبراءنا سيحددون الأنسب لك بعد رؤية صورك."
        }
    },
    {
        id: "pain_anesthesia",
        tags: ["ağrı", "acı", "anestezi", "pain", "hurt", "anesthesia", "الم", "وجع", "تخدير"],
        patterns: [
            "Canım acır mı?",
            "Ağrı olur mu?",
            "Is it painful?",
            "Will I feel pain?",
            "هل هي مؤلمة؟",
            "هل سأشعر بألم؟"
        ],
        answers: {
            tr: "Operasyon lokal anestezi altında yapılır, bu sayede işlem sırasında ağrı hissetmezsiniz. İsteğe bağlı olarak 'sedasyon' (hafif uyku hali) da uygulanabilir, böylece iğne girişlerini bile hissetmezsiniz.",
            en: "The operation is performed under local anesthesia, so you won't feel pain during the procedure. Optionally, 'sedation' (twilight sleep) can be applied so you don't even feel the initial injections.",
            ar: "تتم العملية تحت التخدير الموضعي، لذا لن تشعر بألم أثناء الإجراء. اختيارياً، يمكن تطبيق 'التخدير الواعي' (نوم خفيف) حتى لا تشعر حتى بالوخزات الأولية."
        }
    },
    {
        id: "recovery",
        tags: ["iyileşme", "sonuç", "ne zaman", "recovery", "healing", "result", "when", "شفاء", "نتائج", "متى"],
        patterns: [
            "Ne zaman iyileşirim?",
            "Sonuçları ne zaman görürüm?",
            "When will I recover?",
            "When will I see results?",
            "متى سأتعافى؟",
            "متى سأرى النتائج؟"
        ],
        answers: {
            tr: "İlk 3 gün dinlenmeniz önerilir. 10. günde kabuklar dökülür ve normal görünüme dönersiniz. Ekilen saçlar ilk ay dökülebilir (şok dökülme), 3. aydan itibaren kalıcı olarak çıkmaya başlar. Tam sonuç 12. ayda görülür.",
            en: "Rest is recommended for the first 3 days. By day 10, scabs fall off and you return to a normal look. Transplanted hair may shed in the first month (shock loss), and permanent growth starts from month 3. Full results are seen at month 12.",
            ar: "ينصح بالراحة في الأيام الثلاثة الأولى. بحلول اليوم العاشر، تسقط القشور وتعود لمظهرك الطبيعي. قد يتساقط الشعر المزروع في الشهر الأول (صدمة التساقط)، ويبدأ النمو الدائم من الشهر الثالث. تظهر النتائج الكاملة في الشهر الثاني عشر."
        }
    },
    {
        id: "donor_area",
        tags: ["donör", "ense", "yetmez", "yetersiz", "donor", "nape", "enough", "area", "منطقة مانحة", "كافي"],
        patterns: [
            "Donör bölgem yeterli mi?",
            "Ensem zayıf ekim olurmu?",
            "Is my donor area enough?",
            "هل المنطقة المانحة كافية؟"
        ],
        answers: {
            tr: "Donör bölgenizin (ense) verimliliği en kritik faktördür. Bunu netleştirmek için lütfen WhatsApp üzerinden arkadan ve yanlardan çekilmiş fotoğraflarınızı bizimle paylaşın.",
            en: "The efficiency of your donor area (nape) is the most critical factor. To clarify this, please share photos taken from the back and sides via WhatsApp.",
            ar: "كفاءة المنطقة المانحة (مؤخرة الرأس) هي العامل الحاسم. لتوضيح ذلك، يرجى مشاركة صور مأخوذة من الخلف والجوانب عبر واتساب."
        }
    },
    {
        id: "guarantee",
        tags: ["garanti", "tutmazsa", "guarantee", "warranty", "fail", "ضمان", "كفالة", "فشل"],
        patterns: [
            "Garanti veriyor musunuz?",
            "Ekim tutmazsa ne olur?",
            "Is there a guarantee?",
            "هل هناك ضمان؟"
        ],
        answers: {
            tr: "Ömer Yıldız süreci yönetirken en iyi klinik ve ekiplerle çalışır. Tıbbi bir işlem olduğu için %100 garanti tabiri etik değildir, ancak başarı oranlarımız çok yüksektir ve olası sorunlarda (çok nadir) revizyon desteği sunulur.",
            en: "Ömer Yıldız works with the best clinics and teams. As it is a medical procedure, the term '100% guarantee' is not ethical, but our success rates are very high and revision support is provided for potential (very rare) issues.",
            ar: "يعمل عمر يلدز مع أفضل العيادات والفرق. كإجراء طبي، مصطلح 'ضمان 100%' ليس أخلاقياً، لكن معدلات نجاحنا عالية جداً ويتم توفير دعم المراجعة للمشاكل المحتملة (نادرة جداً)."
        }
    },
    {
        id: "who_am_i",
        tags: ["ömer", "doktor", "kimsin", "kimdir", "who", "doctor", "omer", "من انت", "طبيب", "عمر"],
        patterns: [
            "Ömer Yıldız doktor mu?",
            "Kimsiniz?",
            "Is Omer Yildiz a doctor?",
            "Who are you?",
            "هل عمر يلدز طبيب؟",
            "من أنت؟"
        ],
        answers: {
            tr: "Ben Ömer Yıldız Koordinasyon Asistanıyım. Ömer Yıldız, bir Saç Ekimi Operasyon Koordinatörüdür ve sürecinizin en başından sonuna kadar en iyi hizmeti almanızı sağlar. Operasyonlar, JCI akreditasyonlu hastanelerde uzman ekiplerce gerçekleştirilir.",
            en: "I am the Ömer Yıldız Coordination Assistant. Ömer Yıldız is a Hair Transplant Operation Coordinator who ensures you get the best service from start to finish. Operations are performed by expert teams in JCI-accredited hospitals.",
            ar: "أنا مساعد تنسيق لعمر يلدز. عمر يلدز هو منسق عمليات زراعة الشعر الذي يضمن حصولك على أفضل خدمة من البداية إلى النهاية. تجرى العمليات من قبل فرق خبراء في مستشفيات معتمدة من JCI."
        }
    },
    {
        id: "contact_whatsapp",
        tags: ["iletişim", "whatsapp", "ulaş", "contact", "reach", "number", "رقم", "اتصال", "واتساب"],
        patterns: [
            "Nasıl ulaşabilirim?",
            "WhatsApp numarası nedir?",
            "How can I contact?",
            "كيف يمكنني الاتصال؟"
        ],
        answers: {
            tr: "Bize sağ alttaki WhatsApp butonuna tıklayarak veya İletişim sayfasındaki form üzerinden ulaşabilirsiniz. En hızlı dönüş için WhatsApp'ı öneriyoruz.",
            en: "You can reach us by clicking the WhatsApp button at the bottom right or via the form on the Contact page. We recommend WhatsApp for the fastest response.",
            ar: "يمكنك الوصول إلينا بالنقر على زر واتساب في أسفل اليمين أو عبر النموذج في صفحة الاتصال. نوصي باستخدام واتساب للحصول على أسرع رد."
        }
    },
    // --- New General Items ---
    {
        id: "greeting",
        tags: ["merhaba", "selam", "mrb", "slm", "hello", "hi", "hey", "hola", "مرحبا", "سلام"],
        patterns: ["Merhaba", "Selam", "Hello", "Hi"],
        answers: {
            tr: "Merhaba! 👋 Size saç ekimi süreci, fiyatlar veya teknikler hakkında nasıl yardımcı olabilirim?",
            en: "Hello! 👋 How can I help you regarding the hair transplant process, prices, or techniques?",
            ar: "مرحباً! 👋 كيف يمكنني مساعدتك بخصوص عملية زراعة الشعر، الأسعار أو التقنيات؟"
        }
    },
    {
        id: "location",
        tags: ["nerede", "adres", "konum", "yer", "where", "location", "address", "place", "اين", "عنوان", "موقع"],
        patterns: ["Yeriniz nerede?", "Hangi hastane?", "Where are you located?", "أين موقعكم؟"],
        answers: {
            tr: "Operasyonlarımız İstanbul'da, JCI akreditasyonuna sahip A+ hastanelerde gerçekleştirilmektedir. Detaylı konum bilgisi ve transfer planlaması için WhatsApp'tan iletişime geçebilirsiniz.",
            en: "Our operations are performed in JCI-accredited A+ hospitals in Istanbul. For detailed location and transfer planning, you can contact us via WhatsApp.",
            ar: "تجرى عملياتنا في مستشفيات A+ معتمدة من JCI في إسطنبول. للحصول على تفاصيل الموقع وتخطيط النقل، يمكنك التواصل معنا عبر واتساب."
        }
    },
    {
        id: "process_general",
        tags: ["süreç", "nasıl", "işleyiş", "process", "how", "steps", "prosedür", "كيف", "طريقة", "خطوات"],
        patterns: ["Süreç nasıl işliyor?", "Neler yapmam lazım?", "How does the process work?", "كيف تتم العملية؟"],
        answers: {
            tr: "Süreç çok basit: 1. Fotoğraflarınızı gönderin (Ücretsiz Analiz). 2. Size özel planlama ve fiyat sunalım. 3. İstanbul'a gelin, VIP transfer ve oteliniz hazır olsun. 4. Operasyon sonrası yeni saçlarınızla dönün.",
            en: "The process is simple: 1. Send your photos (Free Analysis). 2. We provide a custom plan & quote. 3. Arrive in Istanbul, your VIP transfer and hotel are ready. 4. Return home with your new hair.",
            ar: "العملية بسيطة جداً: 1. أرسل صورك (تحليل مجاني). 2. نقدم لك خطة وسعر مخصص. 3. تصل إلى إسطنبول، ويكون نقلك VIP وفندقك جاهزين. 4. تعود للوطن بشعرك الجديد."
        }
    }
];

export const fallbackAnswers = {
    tr: "Bu konuda sizi en doğru şekilde yönlendirmek isterim. 👇 Aşağıdaki WhatsApp butonuna tıklayarak uzmanımızla doğrudan görüşebilir ve sorularınıza anında yanıt alabilirsiniz.",
    en: "I want to guide you correctly on this. 👇 You can click the WhatsApp button below to talk directly with our expert and get instant answers.",
    ar: "أود توجيهك بشكل صحيح في هذا الشأن. 👇 يمكنك النقر على زر واتساب أدناه للتحدث مباشرة مع خبيرنا والحصول على إجابات فورية."
};

export const welcomeMessages = {
    tr: "Merhaba 👋 Ben Ömer Yıldız ekibinin asistanıyım. Size süreç, teknikler veya organizasyon hakkında bilgi verebilirim. Nasıl yardımcı olabilirim?",
    en: "Hello 👋 I'm the assistant for the Ömer Yıldız team. I can inform you about the process, techniques, or organization. How can I help?",
    ar: "مرحباً 👋 أنا مساعد فريق عمر يلدز. يمكنني إبلاغك عن العملية أو التقنيات أو التنظيم. كيف يمكنني مساعدتك؟"
};
