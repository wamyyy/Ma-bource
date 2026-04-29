// ════════════════════════════════════════════════════════
//  WAMY — I18n.js  (Internationalization Module)
//  Supports: French (fr) and Arabic (ar)
//  Usage:   window.T('key') → translated string
//  Apply:   window.I18n.applyToDOM() → re-render static elements
// ════════════════════════════════════════════════════════

const TRANSLATIONS = {
  fr: {
    // ── App Meta ──────────────────────────────────────
    app_title:        'MA-BOURSE',
    app_subtitle:     'INVESTMENT',

    // ── Navigation ────────────────────────────────────
    nav_marche:       'Marché',
    nav_search:       'Recherche',
    nav_outils:       'Outils',
    nav_portfolio:    'Portefeuille',
    nav_favoris:      'Favoris',

    // ── Tabs ──────────────────────────────────────────
    tab_top:          'Top',
    tab_tendances:    'Tendances',
    tab_hausses:      'Hausses',
    tab_baisses:      'Baisses',
    tab_rendement:    'Rendement',

    // ── Market Status ─────────────────────────────────
    market_open:      'OUVERT',
    market_closed:    'FERMÉ',
    market_offline:   'HORS LIGNE',
    market_cached:    'Données en cache',

    // ── MASI Card ─────────────────────────────────────
    masi_label:       'MASI INDEX',

    // ── Stock Row / Card ──────────────────────────────
    suspended:        'Suspendu',
    stock_health:     'Santé financière',

    // ── Widgets ───────────────────────────────────────
    widget_hausses:   'TOP HAUSSES',
    widget_baisses:   'TOP BAISSES',
    widget_actifs:    'PLUS ACTIFS',
    widget_tendances: 'TENDANCES',

    // ── Offline Banner ────────────────────────────────
    offline_msg:      'Vous êtes hors ligne. Affichage des dernières données en cache.',

    // ── Modal: Stock Detail ───────────────────────────
    modal_volume:     'VOLUME',
    modal_ytd:        'YTD',
    modal_cap:        'CAPITALISATION',
    modal_div:        'DIVIDENDE',
    modal_freq:       'FRÉQUENCE',
    modal_next_div:   'PROCHAIN DIV',
    btn_alert:        'Alerte de Prix',
    btn_alert_active: 'Alerte Active',
    btn_add_port:     'Ajouter au portefeuille',
    chart_line:       'Ligne',
    chart_candle:     'Chandeliers',

    // ── Price Alert Modal ────────────────────────────
    alert_title:      'Alerte de Prix',
    alert_placeholder:'Prix cible (MAD)',
    alert_save:       'Activer l\'alerte',
    alert_delete:     'Supprimer l\'alerte',

    // ── Portfolio ────────────────────────────────────
    portfolio_empty:  'Votre portefeuille est vide',
    portfolio_add:    'Ajouter une position',
    portfolio_total:  'Valeur totale',
    portfolio_pnl:    'P&L total',
    portfolio_alloc:  'Allocation',
    portfolio_history:'Historique',
    portfolio_export: 'Exporter CSV',
    portfolio_compare:'Comparer',

    // ── Search ───────────────────────────────────────
    search_placeholder: 'Rechercher une action...',
    search_empty:     'Aucun résultat',
    no_results:       'Aucun résultat trouvé',
    search_trending:  'Tendances',
    search_recent:    'Récents',
    search_total_cos: '78 sociétés cotées à la Bourse de Casablanca',
    search_box_placeholder: 'Nom, ticker ou secteur (ex: ATW, Banques...)',

    // ── Dividends ────────────────────────────────────
    div_title:        'Rendements Dividendes',
    div_yield:        'Rendement',
    div_amount:       'Montant',
    div_date:         'Date',
    div_freq:         'Fréquence',
    div_sort_yield:   'Rendement ↕',
    div_sort_div:     'Dividende ↕',
    div_sort_price:   'Prix ↕',
    div_highest:      'PLUS HAUT',
    div_lowest:       'PLUS BAS',
    div_avg:          'MOY. MARCHÉ',
    div_search:       'Chercher une action…',

    // ── Outils ────────────────────────────────────────
    tools_hub:        'Outils',
    tools_subtitle:   'Calculateurs · Indicateurs · Dividendes',
    tools_calc:       'Calcul de Coût',
    tools_calc_desc:  'Frais, TVA & total',
    tools_plusvalues: 'Plus-Values',
    tools_pv_desc:    'Net après frais (2%) & taxes',
    tools_indicators: 'Indicateurs',
    tools_indicators_desc: 'EPS, P/E, ROE…',
    tools_formulas:   'Formules Financières',
    tools_formulas_desc: 'Référence rapide',
    tools_quickref:   'Cours Rapide',
    tools_ipo:        'Alertes IPO',
    tools_ipo_create: 'Créer une alerte',
    tools_compare:    'Comparateur',
    tools_compare_desc: 'Analyse side-by-side',
    divLabel:         'Dividendes',
    tools_div_desc:   'Rendement & tri',
    btn_calculate:    'Calculer',
    btn_reset:        'Réinitialiser',

    // ── Modal extra ───────────────────────────────────
    modal_cours:      'COURS',

    // ── Section headings ──────────────────────────────
    section_market:   'Marché',
    section_search:   'Recherche',
    section_div:      'Dividendes',
    section_port:     'Mon Portefeuille',
    section_fav:      'Mes Favoris',
    section_tools:    'Outils',
    filter_all:       'Tous',
    filter_bank:      'Banques',
    filter_ind:       'Industries',
    filter_telco:     'Telecom',
    filter_ciment:    'Ciment',
    filter_assur:     'Assurances',

    // ── Calculateur ───────────────────────────────────
    calc_main_title:  'Calculateur de Coût',
    calc_main_desc:   'Estimez le coût total incluant les frais bancaires',
    calc_price_label: 'Prix de l\'action',
    calc_qty_label:   'Nombre d\'actions',
    calc_fee_label:   'Frais courtier',
    calc_formula:     'Prix × Qté + % frais = Total',
    calc_res_title:   'Résultat du Calcul',
    calc_res_empty:   'Entrez un prix et une quantité pour calculer votre coût',
    calc_res_subtotal:'Sous-total brut',
    calc_res_unit:    'Prix unitaire',
    calc_res_total:   'TOTAL À PAYER',
    calc_tax_note:    '+ TVA 10% + Taxes Bourse/Maroclear ~0.1%',

    // ── Indicators ────────────────────────────────────
    ind_title:        'Calculateur d\'Indicateurs',
    ind_subtitle:     'Remplissez les champs pour l\'analyse fondamentale.',
    ind_shares:       'Nb d\'Actions',
    ind_revenue:      'Chiffre d\'Affaires',
    ind_expenses:     'Dépenses',
    ind_taxes:        'Taxes',
    ind_debt:         'Dette Totale',
    ind_equity:       'Fonds Propres',
    ind_assets:       'Total des Actifs',
    ind_bv:           'Val. Comptable/Act.',

    // ── Formulas ──────────────────────────────────────
    formulas_key_title: 'Formules Clés',

    // ── Quick Reference ───────────────────────────────
    qr_title:         'Actions Maroc',
    qr_subtitle:      'Référence Rapide',
    qr_search:        'Chercher… nom, ticker, secteur',

    // ── Portfolio ────────────────────────────────────
    port_title:       'Mon Portefeuille',
    port_subtitle:    'Compte Bourse simulé',
    port_balance_label: 'SOLDE TOTAL',
    port_balance_meta: 'Valeur de marché · Position ouverte',
    port_positions_title: 'Positions Ouvertes',
    btn_install_app:  'Installer l\'App',

    // ── Auth ──────────────────────────────────────────
    login_title:      'Connexion',
    login_subtitle:   'Votre portail d\'investissement',
    login_email:      'Adresse e-mail',
    login_pass:       'Mot de passe',
    btn_login:        'Connexion',
    btn_google:       'Continuer avec Google',
    btn_demo:         'Mode Visiteur',
    btn_register:     'Créer un compte',
    logout:           'Déconnexion',

    // ── Market Timer ──────────────────────────────────
    market_opens_in:  'Ouvre dans',
    market_closes_in: 'Ferme dans',
    market_status_open: 'OUVERT',
    market_status_closed: 'FERMÉ',
    market_status_offline: 'HORS LIGNE',
    market_data_cache: 'Données en cache',

    // ── Common ────────────────────────────────────────
    close:            'Fermer',
    save:             'Enregistrer',
    cancel:           'Annuler',
    confirm:          'Confirmer',
    delete:           'Supprimer',
    add:              'Ajouter',
    edit:             'Modifier',
    share:            'Partager',
    loading:          'Chargement...',
    error:            'Erreur',
    success:          'Succès',
    mad:              'MAD',
    per_share:        '/action',
    annual:           'Annuel',
    semester:         'Semestriel',
    quarterly:        'Trimestriel',
    titres:           'titres',
    empty_list:       'Votre liste est vide',
    fav_hint:         'Actions suivies',

    // -- New Modals --
    modal_price_alert_title: 'Alerte de Prix',
    modal_push_notif: 'Recevez une notification push automatique',
    modal_target_price: 'Objectif de Prix',
    placeholder_target_price: 'Prix cible',
    btn_activate_alert: 'Activer l\'alerte',
    
    modal_pv_title: 'Calcul de Plus-Value',
    modal_pv_subtitle: 'Calculateur net d\'impôt (TPCVM 15%)',
    label_buy_price: 'Prix d\'achat',
    label_sell_price: 'Prix de vente',
    label_qty: 'Quantité',
    res_net_final: 'RÉSULTAT NET FINAL',
    label_broker_fees: 'Frais (Courtage)',
    label_tax_tpcvm: 'Taxe TPCVM (15%)',
    note_tax_msg: 'L\'impôt de 15% (TPCVM) est prélevé sur le profit net après déduction des frais de courtage.',
    
    modal_ipo_title: 'Configuration Alerte IPO',
    modal_ipo_subtitle: 'Gérer le compte à rebours avant IPO',
    label_comp_name: 'Nom de l\'entreprise',
    placeholder_comp_name: 'ex: Akdital',
    label_ipo_date: 'Date limite (Jour/Mois/Année)',
    btn_add_ipo: 'Ajouter l\'Alerte',
    
    modal_compare_title: 'Comparer deux actions',
    modal_compare_subtitle: 'Évolution relative (30 derniers jours)',
    
    modal_add_pos_title: 'Ajouter une Position',
    modal_add_pos_subtitle: 'Saisir les informations de l\'achat',
    placeholder_search_stock: 'Rechercher une action... (ex: ATW, IAM)',
    label_avg_buy_price: 'Prix moyen d\'achat',
    label_total_val: 'Valeur totale',
    label_current_price: 'Cours actuel',
    label_pnl_instant: 'P&L immédiat',
    btn_add_to_port: 'Ajouter au Portefeuille',
    
    // -- Auth Extra --
    placeholder_email: 'Adresse e-mail',
    placeholder_pass: 'Mot de passe',
    divider_or: 'OU',
    
    // -- Empty States --
    port_empty_msg: 'Votre portefeuille est vide',
    port_empty_sub: 'Cliquez sur + Ajouter pour suivre vos titres',
    fav_empty_msg: 'Votre liste est vide',
    fav_empty_sub: 'Appuyez sur l\'étoile au coin d\'une action pour la suivre ici.',
    btn_explore_mkt: 'Explorer le Marché',
    
    // -- Dynamic Messages (Toasts) --
    msg_added_port: 'ajouté au portefeuille !',
    msg_removed: 'Retiré — ',
    msg_csv_exported: 'CSV Exporté avec succès !',
    msg_port_empty_toast: 'Portefeuille vide !',
    msg_no_stock_found: 'Aucune action trouvée',
    msg_welcome: 'Bienvenue',
    msg_logout_success: 'Déconnexion réussie',
    msg_invalid_email: 'Veuillez entrer une adresse e-mail valide',
    msg_short_pass: 'Le mot de passe est trop court',
    msg_added: 'Ajouté — ',
    msg_no_data: 'Pas de données disponibles',
    
    // -- User Labels --
    user_default_name: 'Utilisateur',
    user_simulated_acc: 'Compte simulé',
  },

  ar: {
    // ── App Meta ──────────────────────────────────────
    app_title:        'MA-BOURSE',
    app_subtitle:     'الاستثمار',

    // ── Navigation ────────────────────────────────────
    nav_marche:       'السوق',
    nav_search:       'البحث',
    nav_outils:       'الأدوات',
    nav_portfolio:    'المحفظة',
    nav_favoris:      'المفضلة',

    // ── Tabs ──────────────────────────────────────────
    tab_top:          'الأفضل',
    tab_tendances:    'الاتجاهات',
    tab_hausses:      'الارتفاعات',
    tab_baisses:      'الانخفاضات',
    tab_rendement:    'العائد',

    // ── Market Status ─────────────────────────────────
    market_open:      'مفتوح',
    market_closed:    'مغلق',
    market_offline:   'غير متصل',
    market_cached:    'بيانات مخزنة',

    // ── MASI Card ─────────────────────────────────────
    masi_label:       'مؤشر MASI',

    // ── Stock Row / Card ──────────────────────────────
    suspended:        'موقوف',
    stock_health:     'الصحة المالية',

    // ── Widgets ───────────────────────────────────────
    widget_hausses:   'الأعلى ارتفاعاً',
    widget_baisses:   'الأعلى انخفاضاً',
    widget_actifs:    'الأكثر نشاطاً',
    widget_tendances: 'الاتجاهات',

    // ── Offline Banner ────────────────────────────────
    offline_msg:      'أنت غير متصل بالإنترنت. عرض آخر بيانات محفوظة.',

    // ── Modal: Stock Detail ───────────────────────────
    modal_volume:     'الحجم',
    modal_ytd:        'منذ بداية العام',
    modal_cap:        'القيمة السوقية',
    modal_div:        'الأرباح',
    modal_freq:       'التكرار',
    modal_next_div:   'موعد الأرباح',
    btn_alert:        'تنبيه السعر',
    btn_alert_active: 'التنبيه نشط',
    btn_add_port:     'إضافة للمحفظة',
    chart_line:       'خط',
    chart_candle:     'شموع',

    // ── Price Alert Modal ────────────────────────────
    alert_title:      'تنبيه السعر',
    alert_placeholder:'السعر المستهدف (درهم)',
    alert_save:       'تفعيل التنبيه',
    alert_delete:     'حذف التنبيه',

    // ── Portfolio ────────────────────────────────────
    portfolio_empty:  'محفظتك فارغة',
    portfolio_add:    'إضافة مركز',
    portfolio_total:  'القيمة الإجمالية',
    portfolio_pnl:    'إجمالي الأرباح/الخسائر',
    portfolio_alloc:  'التوزيع',
    portfolio_history:'السجل',
    portfolio_export: 'تصدير CSV',
    portfolio_compare:'مقارنة',

    // ── Search ───────────────────────────────────────
    search_placeholder: 'ابحث عن سهم...',
    search_empty:     'لا توجد نتائج',
    no_results:       'لا توجد نتائج',
    search_trending:  'الاتجاهات',
    search_recent:    'الأخيرة',
    search_total_cos: '78 شركة مدرجة في بورصة الدار البيضاء',
    search_box_placeholder: 'الاسم، الرمز أو القطاع (مثال: ATW...)',

    // ── Dividends ────────────────────────────────────
    div_title:        'عوائد الأرباح',
    div_yield:        'العائد',
    div_amount:       'المبلغ',
    div_date:         'التاريخ',
    div_freq:         'التكرار',
    div_sort_yield:   'العائد ↕',
    div_sort_div:     'الأرباح ↕',
    div_sort_price:   'السعر ↕',
    div_highest:      'الأعلى',
    div_lowest:       'الأدنى',
    div_avg:          'معدل السوق',
    div_search:       'ابحث عن سهم…',

    // ── Outils ────────────────────────────────────────
    tools_hub:        'الأدوات',
    tools_subtitle:   'حاسبات · مؤشرات · أرباح',
    tools_calc:       'حاسبة التكاليف',
    tools_calc_desc:  'العمولات والضرائب والإجمالي',
    tools_plusvalues: 'الأرباح الرأسمالية',
    tools_pv_desc:    'الصافي بعد الرسوم (2%) والضرائب',
    tools_indicators: 'المؤشرات',
    tools_indicators_desc: 'EPS, P/E, ROE…',
    tools_formulas:   'الصيغ المالية',
    tools_formulas_desc: 'مرجع سريع',
    tools_quickref:   'الأسعار السريعة',
    tools_ipo:        'تنبيهات الإدراج',
    tools_ipo_create: 'إنشاء تنبيه',
    tools_compare:    'المقارنة',
    tools_compare_desc: 'تحليل جانبي',
    divLabel:         'الأرباح الموزعة',
    tools_div_desc:   'العائد والترتيب',
    btn_calculate:    'احسب',
    btn_reset:        'إعادة تعيين',

    // ── Modal extra ───────────────────────────────────
    modal_cours:      'السعر',

    // ── Section headings ──────────────────────────────
    section_market:   'السوق',
    section_search:   'البحث',
    section_div:      'الأرباح',
    section_port:     'محفظتي',
    section_fav:      'المفضلة',
    section_tools:    'الأدوات',
    filter_all:       'الكل',
    filter_bank:      'البنوك',
    filter_ind:       'الصناعة',
    filter_telco:     'الاتصالات',
    filter_ciment:    'الأسمنت',
    filter_assur:     'التأمين',

    // ── Calculateur ───────────────────────────────────
    calc_main_title:  'حاسبة التكاليف',
    calc_main_desc:   'تقدير التكلفة الإجمالية بما في ذلك الرسوم البنكية',
    calc_price_label: 'سعر السهم',
    calc_qty_label:   'عدد الأسهم',
    calc_fee_label:   'عمولة الوسيط',
    calc_formula:     'السعر × الكمية + % رسوم = الإجمالي',
    calc_res_title:   'نتيجة الحساب',
    calc_res_empty:   'أدخل السعر والكمية لحساب التكلفة',
    calc_res_subtotal:'المجموع الفرعي',
    calc_res_unit:    'سعر الوحدة',
    calc_res_total:   'الإجمالي المطلوب دفعه',
    calc_tax_note:    '+ 10% ضريبة + رسوم البورصة ~0.1%',

    // ── Indicators ────────────────────────────────────
    ind_title:        'حاسبة المؤشرات',
    ind_subtitle:     'املأ الحقول للتحليل الأساسي.',
    ind_shares:       'عدد الأسهم',
    ind_revenue:      'رقم المعاملات',
    ind_expenses:     'المصاريف',
    ind_taxes:        'الضرائب',
    ind_debt:         'إجمالي الديون',
    ind_equity:       'حقوق الملكية',
    ind_assets:       'إجمالي الأصول',
    ind_bv:           'القيمة الدفترية للسهم',

    // ── Formulas ──────────────────────────────────────
    formulas_key_title: 'الصيغ الرئيسية',

    // ── Quick Reference ───────────────────────────────
    qr_title:         'أسهم المغرب',
    qr_subtitle:      'مرجع سريع',
    qr_search:        'بحث… اسم، رمز، قطاع',

    // ── Portfolio ────────────────────────────────────
    port_title:       'محفظتي',
    port_subtitle:    'حساب بورصة محاكي',
    port_balance_label: 'الرصيد الإجمالي',
    port_balance_meta: 'القيمة السوقية · المراكز المفتوحة',
    port_positions_title: 'المراكز المفتوحة',
    btn_install_app:  'تثبيت التطبيق',

    // ── Auth ──────────────────────────────────────────
    login_title:      'تسجيل الدخول',
    login_subtitle:   'بوابتك للاستثمار',
    login_email:      'البريد الإلكتروني',
    login_pass:       'كلمة المرور',
    btn_login:        'دخول',
    btn_google:       'المتابعة مع Google',
    btn_demo:         'وضع الزائر',
    btn_register:     'إنشاء حساب',
    logout:           'تسجيل الخروج',

    // ── Market Timer ──────────────────────────────────
    market_opens_in:  'يفتح خلال',
    market_closes_in: 'يغلق خلال',
    market_status_open: 'مفتوح',
    market_status_closed: 'مغلق',
    market_status_offline: 'غير متصل',
    market_data_cache: 'بيانات مخزنة',

    // ── Common ────────────────────────────────────────
    close:            'إغلاق',
    save:             'حفظ',
    cancel:           'إلغاء',
    confirm:          'تأكيد',
    delete:           'حذف',
    add:              'إضافة',
    edit:             'تعديل',
    share:            'مشاركة',
    loading:          'جار التحميل...',
    error:            'خطأ',
    success:          'نجاح',
    mad:              'درهم',
    per_share:        '/سهم',
    annual:           'سنوي',
    semester:         'نصف سنوي',
    quarterly:        'ربع سنوي',
    titres:           'أسهم',
    empty_list:       'قائمتك فارغة',
    fav_hint:         'أسهم متبعة',

    // -- New Modals --
    modal_price_alert_title: 'تنبيه السعر',
    modal_push_notif: 'استلم إشعارات فورية تلقائياً',
    modal_target_price: 'السعر المستهدف',
    placeholder_target_price: 'السعر المطلوب',
    btn_activate_alert: 'تفعيل التنبيه',
    
    modal_pv_title: 'حساب الأرباح الرأسمالية',
    modal_pv_subtitle: 'حساب الصافي بعد الضريبة (15%)',
    label_buy_price: 'سعر الشراء',
    label_sell_price: 'سعر البيع',
    label_qty: 'الكمية',
    res_net_final: 'النتيجة الصافية النهائية',
    label_broker_fees: 'رسوم الوساطة',
    label_tax_tpcvm: 'ضريبة TPCVM (15%)',
    note_tax_msg: 'يتم احتساب ضريبة 15% على الربح الصافي بعد خصم مصاريف الوساطة.',
    
    modal_ipo_title: 'إعداد تنبيه الاكتتاب',
    modal_ipo_subtitle: 'إدارة العد التنازلي للاكتتابات القادمة',
    label_comp_name: 'اسم الشركة',
    placeholder_comp_name: 'مثال: أكديتال',
    label_ipo_date: 'التاريخ الأقصى (يوم/شهر/سنة)',
    btn_add_ipo: 'إضافة التنبيه',
    
    modal_compare_title: 'مقارنة سهمين',
    modal_compare_subtitle: 'الأداء النسبي (آخر 30 يومًا)',
    
    modal_add_pos_title: 'إضافة مركز مالي',
    modal_add_pos_subtitle: 'أدخل تفاصيل عملية الشراء',
    placeholder_search_stock: 'ابحث عن سهم... (مثال: ATW, IAM)',
    label_avg_buy_price: 'متوسط سعر الشراء',
    label_total_val: 'القيمة الإجمالية',
    label_current_price: 'السعر الحالي',
    label_pnl_instant: 'الربح/الخسارة الفورية',
    btn_add_to_port: 'إضافة إلى المحفظة',
    
    // -- Auth Extra --
    placeholder_email: 'البريد الإلكتروني',
    placeholder_pass: 'كلمة المرور',
    divider_or: 'أو',
    
    // -- Empty States --
    port_empty_msg: 'محفظتك فارغة',
    port_empty_sub: 'اضغط على + إضافة لمتابعة أسهمك',
    fav_empty_msg: 'قائمة المتابعة فارغة',
    fav_empty_sub: 'اضغط على النجمة بجانب أي سهم لمتابعته هنا.',
    btn_explore_mkt: 'استكشاف السوق',
    
    // -- Dynamic Messages (Toasts) --
    msg_added_port: 'تمت إضافته للمحفظة!',
    msg_removed: 'تمت الإزالة — ',
    msg_csv_exported: 'تم تصدير ملف CSV بنجاح!',
    msg_port_empty_toast: 'المحفظة فارغة!',
    msg_no_stock_found: 'لم يتم العثور على أي سهم',
    msg_welcome: 'مرحباً',
    msg_logout_success: 'تم تسجيل الخروج بنجاح',
    msg_invalid_email: 'يرجى إدخال بريد إلكتروني صحيح',
    msg_short_pass: 'كلمة المرور قصيرة جداً',
    msg_added: 'تمت الإضافة — ',
    msg_no_data: 'لا توجد بيانات متاحة',
    
    // -- User Labels --
    user_default_name: 'مستخدم',
    user_simulated_acc: 'حساب تجريبي',
  }
};

class I18nController {
  constructor() {
    this.lang = localStorage.getItem('wamy_lang') || 'fr';
  }

  /** Returns the translated string for the given key in the current language */
  t(key) {
    return TRANSLATIONS[this.lang]?.[key] ?? TRANSLATIONS.fr[key] ?? key;
  }

  /** Applies translations to all DOM elements with a data-i18n attribute */
  applyToDOM() {
    const isAR = this.lang === 'ar';
    
    // RTL direction
    document.documentElement.dir = isAR ? 'rtl' : 'ltr';
    document.documentElement.lang = isAR ? 'ar' : 'fr';

    // Translate all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const translated = this.t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translated;
      } else {
        el.textContent = translated;
      }
    });

    // Update active lang button styling
    document.querySelectorAll('.lang-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.lang);
    });
  }

  /** Switches the language, persists it, updates the DOM */
  setLang(code) {
    if (!TRANSLATIONS[code]) return;
    this.lang = code;
    try { localStorage.setItem('wamy_lang', code); } catch(e) {}
    this.applyToDOM();
    // Trigger app re-render for dynamic sections
    if (window.app) {
      window.app._applyFilter();
      window.app._renderDivList();
      window.app._renderQuickRef();
      window.app._renderWatchlist();
      if (window.app.currentPage === 'portfolio') window.app._renderPortfolio();
      if (window.app.currentPage === 'search') window.app._searchStocks();
    }
  }
}

// Expose globally
window.I18n = new I18nController();
window.T = (key) => window.I18n.t(key);
