// ════════════════════════════════════════════════════════
//  WAMY — Constants.js
//  All static data and configuration constants
// ════════════════════════════════════════════════════════

export const PAGES = ['marche', 'search', 'outils', 'dividendes', 'portfolio', 'favoris'];

export const MASI_DATA = {
  value:    13847.22,
  change:   -1.43,       // % daily change
  points:   -200.95,     // point change
  ytd:      -3.28,       // % year-to-date
  cap:      '776.8B',    // total market cap in MAD
  vol:      '287.4M',    // total daily volume in MAD
};

export const MOCK_USER = {
  name: 'Ayoub',
  email: 'ayoub@wamy.ma',
  avatar: 'A',
  balance: 145200.00,
  dailyPnl: +1.24,         // percent
  dailyPnlAmount: 1782.50, // MAD
};

export const MOCK_PORTFOLIO = [
  { ticker: 'ATW', qty: 10,  avgPrice: 680  },
  { ticker: 'BCP', qty: 50,  avgPrice: 285  },
  { ticker: 'IAM', qty: 100, avgPrice: 92   },
  { ticker: 'MNG', qty: 2,   avgPrice: 7400 },
  { ticker: 'TQM', qty: 15,  avgPrice: 1750 },
];


export const AVATAR_BG = {
  banques: '1d4ed8', mines: '92400e', batiment: 'c2410c', energie: 'b45309',
  telecom: '6d28d9', agroalimentaire: '166534', transport: '0f766e',
  immobilier: '9f1239', assurances: '9d174d', distribution: 'b45309',
  industrie: '1e40af', sante: '166534', holding: '581c87'
};

export const SECTOR_LABELS = {
  banques: 'Banques', mines: 'Mines', batiment: 'Bâtiment', energie: 'Énergie',
  telecom: 'Télécom', agroalimentaire: 'Agro', transport: 'Transport',
  immobilier: 'Immobilier', assurances: 'Assurances', distribution: 'Auto',
  industrie: 'Industrie', sante: 'Santé', holding: 'Holding'
};

export const SECTOR_COLORS = {
  banques: 'c2', mines: 'c3', batiment: 'c6', energie: 'c3', telecom: 'c5',
  agroalimentaire: 'c1', transport: 'c7', immobilier: 'c4', assurances: 'c8',
  distribution: 'c6', industrie: 'c6', sante: 'c1', holding: 'c5'
};

export const RAW_STOCKS = [
  // BANQUES
  { rank:1,  name:'Attijariwafa Bank',    ticker:'ATW',  sector:'banques',         price:692,    change:-3.20, vol:'50.23M', ytd:-7.10,  cap:'149.0B', div:34.5,  divYield:4.99, divFreq:'Annuel', divDate:'Mai 2025',  domain:'attijariwafabank.ma' },
  { rank:2,  name:'Bank Of Africa',       ticker:'BOA',  sector:'banques',         price:219.5,  change:+0.23, vol:'47.32M', ytd:-4.57,  cap:'48.4B',  div:9.0,   divYield:4.10, divFreq:'Annuel', divDate:'Mai 2025',  domain:'bankofafrica.ma' },
  { rank:3,  name:'BCP',                  ticker:'BCP',  sector:'banques',         price:253,    change:+0.40, vol:'2.58M',  ytd:-12.12, cap:'51.4B',  div:12.0,  divYield:4.74, divFreq:'Annuel', divDate:'Mai 2025',  domain:'gbp.ma' },
  { rank:4,  name:'BMCI',                 ticker:'BMCI', sector:'banques',         price:640,    change:-0.62, vol:'0.41M',  ytd:-3.20,  cap:'8.6B',   div:32.0,  divYield:5.00, divFreq:'Annuel', divDate:'Juin 2025', domain:'bmci.ma' },
  { rank:5,  name:'CFG Bank',             ticker:'CFG',  sector:'banques',         price:28.5,   change:+1.07, vol:'1.20M',  ytd:+8.30,  cap:'2.4B',   div:0.8,   divYield:2.81, divFreq:'Annuel', divDate:'Juin 2025', domain:'cfg.ma' },
  { rank:6,  name:'CIH Bank',             ticker:'CIH',  sector:'banques',         price:356,    change:-0.84, vol:'3.12M',  ytd:-8.20,  cap:'13.5B',  div:17.0,  divYield:4.78, divFreq:'Annuel', divDate:'Mai 2025',  domain:'cihbank.ma' },
  { rank:7,  name:'Crédit du Maroc',      ticker:'CDM',  sector:'banques',         price:580,    change:-1.19, vol:'0.28M',  ytd:-5.40,  cap:'5.8B',   div:27.0,  divYield:4.66, divFreq:'Annuel', divDate:'Juin 2025', domain:'creditdumaroc.ma' },
  { rank:8,  name:'Salafin',              ticker:'SLF',  sector:'banques',         price:382,    change:-1.28, vol:'0.36M',  ytd:-5.90,  cap:'3.1B',   div:19.0,  divYield:4.97, divFreq:'Annuel', divDate:'Mai 2025',  domain:'salafin.ma' },
  // ASSURANCES
  { rank:9,  name:'AFMA SA',              ticker:'AFM',  sector:'assurances',      price:1350,   change:+0.52, vol:'0.12M',  ytd:+3.10,  cap:'2.7B',   div:55.0,  divYield:4.07, divFreq:'Annuel', divDate:'Juin 2025', domain:'afma.ma' },
  { rank:10, name:'Agma Lahlou-Tazi',     ticker:'AGM',  sector:'assurances',      price:4250,   change:-0.47, vol:'0.08M',  ytd:+1.90,  cap:'3.4B',   div:200.0, divYield:4.71, divFreq:'Annuel', divDate:'Juin 2025', domain:'agma.ma' },
  { rank:11, name:'AtlantaSanad',         ticker:'ATL',  sector:'assurances',      price:140,    change:+0.72, vol:'0.54M',  ytd:+5.40,  cap:'8.4B',   div:6.0,   divYield:4.29, divFreq:'Annuel', divDate:'Juin 2025', domain:'atlantasanad.ma' },
  { rank:12, name:'Sanlam Maroc',         ticker:'SAH',  sector:'assurances',      price:1120,   change:-0.35, vol:'0.09M',  ytd:-2.60,  cap:'4.5B',   div:48.0,  divYield:4.29, divFreq:'Annuel', divDate:'Juin 2025', domain:'sanlam.ma' },
  { rank:13, name:'Wafa Assurance',       ticker:'WAA',  sector:'assurances',      price:4200,   change:-0.95, vol:'0.89M',  ytd:+2.10,  cap:'31.5B',  div:210.0, divYield:5.00, divFreq:'Annuel', divDate:'Juin 2025', domain:'wafaassurance.ma' },
  // MINES
  { rank:14, name:'Managem',              ticker:'MNG',  sector:'mines',           price:7901,   change:-1.30, vol:'13.74M', ytd:+21.55, cap:'93.7B',  div:200.0, divYield:2.53, divFreq:'Annuel', divDate:'Juin 2025', domain:'managemgroup.com' },
  { rank:15, name:'Minière Touissit',     ticker:'CMT',  sector:'mines',           price:1840,   change:+0.87, vol:'0.32M',  ytd:+14.20, cap:'7.4B',   div:75.0,  divYield:4.08, divFreq:'Annuel', divDate:'Juin 2025', domain:'cmtmaroc.ma' },
  { rank:16, name:'Smi',                  ticker:'SMI',  sector:'mines',           price:2250,   change:-0.44, vol:'0.18M',  ytd:+9.80,  cap:'6.3B',   div:90.0,  divYield:4.00, divFreq:'Annuel', divDate:'Juin 2025', domain:'smi.ma' },
  { rank:17, name:'Sonasid',              ticker:'SID',  sector:'mines',           price:382,    change:-2.04, vol:'0.54M',  ytd:-12.30, cap:'2.3B',   div:15.0,  divYield:3.93, divFreq:'Annuel', divDate:'Juin 2025', domain:'sonasid.ma' },
  { rank:18, name:'Delta Holding',        ticker:'DHO',  sector:'mines',           price:35.8,   change:+0.56, vol:'1.90M',  ytd:+5.40,  cap:'5.4B',   div:1.2,   divYield:3.35, divFreq:'Annuel', divDate:'Juin 2025', domain:'deltaholding.ma' },
  { rank:19, name:'Zellidja S.A.',        ticker:'ZDJ',  sector:'mines',           price:325,    change:-1.52, vol:'0.14M',  ytd:-8.70,  cap:'1.6B',   div:12.0,  divYield:3.69, divFreq:'Annuel', divDate:'Juin 2025', domain:'zellidja.ma' },
  // BÂTIMENT
  { rank:20, name:'Ciments du Maroc',     ticker:'CMA',  sector:'batiment',        price:1730,   change:-3.35, vol:'11.80M', ytd:-7.39,  cap:'25.0B',  div:85.0,  divYield:4.91, divFreq:'Annuel', divDate:'Mai 2025',  domain:'cimentsdumaroc.com' },
  { rank:21, name:'LafargeHolcim Maroc',  ticker:'LHM',  sector:'batiment',        price:1750,   change:-1.57, vol:'6.35M',  ytd:-5.41,  cap:'41.0B',  div:90.0,  divYield:5.14, divFreq:'Annuel', divDate:'Juin 2025', domain:'lafargeholcim.ma' },
  { rank:22, name:'SGTM',                 ticker:'GTM',  sector:'batiment',        price:720,    change:-1.37, vol:'11.40M', ytd:-23.40, cap:'43.2B',  div:28.0,  divYield:3.89, divFreq:'Annuel', divDate:'Juil 2025', domain:'sgtm.ma' },
  { rank:23, name:'TGCC',                 ticker:'TGC',  sector:'batiment',        price:720,    change:-2.04, vol:'6.89M',  ytd:-22.99, cap:'25.0B',  div:22.0,  divYield:3.06, divFreq:'Annuel', divDate:'Juil 2025', domain:'tgcc.ma' },
  { rank:24, name:'Colorado',             ticker:'COL',  sector:'batiment',        price:62,     change:-1.59, vol:'0.78M',  ytd:-18.40, cap:'2.5B',   div:2.5,   divYield:4.03, divFreq:'Annuel', divDate:'Juil 2025', domain:'colorado.ma' },
  { rank:25, name:'Afric Industries',     ticker:'AFI',  sector:'batiment',        price:390,    change:+0.26, vol:'0.15M',  ytd:+4.50,  cap:'1.2B',   div:14.0,  divYield:3.59, divFreq:'Annuel', divDate:'Juin 2025', domain:'africindustries.ma' },
  { rank:26, name:'Jet Contractors',      ticker:'JET',  sector:'batiment',        price:285,    change:-0.70, vol:'0.22M',  ytd:-11.80, cap:'2.1B',   div:10.0,  divYield:3.51, divFreq:'Annuel', divDate:'Juil 2025', domain:'jetcontractors.ma' },
  { rank:27, name:'Delattre Levivier',    ticker:'DLM',  sector:'batiment',        price:120,    change:+1.69, vol:'0.34M',  ytd:+7.20,  cap:'0.8B',   div:4.5,   divYield:3.75, divFreq:'Annuel', divDate:'Juin 2025', domain:'dlm.ma' },
  // ÉNERGIE
  { rank:28, name:'Taqa Morocco',         ticker:'TQM',  sector:'energie',         price:1835,   change:+2.23, vol:'129M',   ytd:-14.85, cap:'43.3B',  div:113.0, divYield:6.16, divFreq:'Annuel', divDate:'Juin 2025', domain:'taqamorocco.ma' },
  { rank:29, name:'TotalEnergies Maroc',  ticker:'TMA',  sector:'energie',         price:1850,   change:-0.54, vol:'0.65M',  ytd:-1.20,  cap:'11.1B',  div:82.0,  divYield:4.43, divFreq:'Annuel', divDate:'Juin 2025', domain:'totalenergies.ma' },
  { rank:30, name:'Maghreb Oxygène',      ticker:'MOX',  sector:'energie',         price:620,    change:+0.49, vol:'0.11M',  ytd:+2.80,  cap:'1.6B',   div:24.0,  divYield:3.87, divFreq:'Annuel', divDate:'Juin 2025', domain:'maghreboxy.ma' },
  { rank:31, name:'Afriquia Gaz',         ticker:'GAZ',  sector:'energie',         price:4320,   change:-0.28, vol:'0.24M',  ytd:+5.10,  cap:'10.8B',  div:180.0, divYield:4.17, divFreq:'Annuel', divDate:'Juin 2025', domain:'afriquiagaz.ma' },
  // TÉLÉCOM & TECH
  { rank:32, name:'Maroc Telecom',        ticker:'IAM',  sector:'telecom',         price:94.3,   change:-1.67, vol:'5.88M',  ytd:-15.12, cap:'82.9B',  div:6.38,  divYield:6.77, divFreq:'Annuel', divDate:'Juin 2025', domain:'iam.ma' },
  { rank:33, name:'HPS',                  ticker:'HPS',  sector:'telecom',         price:6520,   change:+1.24, vol:'0.31M',  ytd:+18.90, cap:'12.9B',  div:175.0, divYield:2.68, divFreq:'Annuel', divDate:'Juin 2025', domain:'hps-worldwide.com' },
  { rank:34, name:'Involys',              ticker:'INV',  sector:'telecom',         price:56.5,   change:+0.89, vol:'0.22M',  ytd:+4.10,  cap:'0.6B',   div:2.0,   divYield:3.54, divFreq:'Annuel', divDate:'Juil 2025', domain:'involys.com' },
  { rank:35, name:'M2M Group',            ticker:'M2M',  sector:'telecom',         price:780,    change:+2.10, vol:'0.18M',  ytd:+12.40, cap:'1.6B',   div:24.0,  divYield:3.08, divFreq:'Annuel', divDate:'Juin 2025', domain:'m2mgroup.com' },
  { rank:36, name:'Disty Technologies',   ticker:'DYT',  sector:'telecom',         price:180,    change:-0.55, vol:'0.19M',  ytd:-3.80,  cap:'0.7B',   div:6.0,   divYield:3.33, divFreq:'Annuel', divDate:'Juin 2025', domain:'disty.ma' },
  { rank:37, name:'Disway',               ticker:'DWY',  sector:'telecom',         price:420,    change:+0.72, vol:'0.14M',  ytd:+6.20,  cap:'0.5B',   div:15.0,  divYield:3.57, divFreq:'Annuel', divDate:'Juin 2025', domain:'disway.ma' },
  { rank:38, name:'IB Maroc.com',         ticker:'IBC',  sector:'telecom',         price:42.5,   change:-1.16, vol:'0.08M',  ytd:-7.40,  cap:'0.2B',   div:1.5,   divYield:3.53, divFreq:'Annuel', divDate:'Juil 2025', domain:'ibmaroc.com' },
  { rank:39, name:'Microdata',            ticker:'MIC',  sector:'telecom',         price:350,    change:+0.29, vol:'0.06M',  ytd:+1.50,  cap:'0.3B',   div:12.0,  divYield:3.43, divFreq:'Annuel', divDate:'Juin 2025', domain:'microdata.ma' },
  { rank:40, name:'S.M. Monétique',       ticker:'SMM',  sector:'telecom',         price:1250,   change:+1.63, vol:'0.09M',  ytd:+9.30,  cap:'1.1B',   div:50.0,  divYield:4.00, divFreq:'Annuel', divDate:'Juin 2025', domain:'sm-monetique.com' },
  { rank:41, name:'Cash Plus',            ticker:'CAP',  sector:'telecom',         price:360,    change:+0.84, vol:'0.11M',  ytd:+5.60,  cap:'0.7B',   div:14.0,  divYield:3.89, divFreq:'Annuel', divDate:'Juin 2025', domain:'cashplus.ma' },
  // AGROALIMENTAIRE
  { rank:42, name:'Cosumar',              ticker:'CSR',  sector:'agroalimentaire', price:188,    change:-1.57, vol:'8.30M',  ytd:-9.18,  cap:'17.8B',  div:9.5,   divYield:5.05, divFreq:'Annuel', divDate:'Juin 2025', domain:'cosumar.ma' },
  { rank:43, name:'Label Vie',            ticker:'LBV',  sector:'agroalimentaire', price:5400,   change:-1.10, vol:'0.42M',  ytd:-3.70,  cap:'20.1B',  div:180.0, divYield:3.33, divFreq:'Annuel', divDate:'Juil 2025', domain:'labelvie.ma' },
  { rank:44, name:'Lesieur Cristal',      ticker:'LES',  sector:'agroalimentaire', price:165,    change:-0.60, vol:'1.20M',  ytd:-4.90,  cap:'6.6B',   div:7.5,   divYield:4.55, divFreq:'Annuel', divDate:'Juin 2025', domain:'lesieurchristal.ma' },
  { rank:45, name:'Mutandis',             ticker:'MUT',  sector:'agroalimentaire', price:123,    change:-0.81, vol:'1.10M',  ytd:-7.60,  cap:'2.8B',   div:4.5,   divYield:3.66, divFreq:'Annuel', divDate:'Juin 2025', domain:'mutandis.ma' },
  { rank:46, name:'Oulmès',               ticker:'OUL',  sector:'agroalimentaire', price:2350,   change:+0.43, vol:'0.19M',  ytd:+3.80,  cap:'6.6B',   div:85.0,  divYield:3.62, divFreq:'Annuel', divDate:'Juin 2025', domain:'oulmes.ma' },
  { rank:47, name:'Cartier Saada',        ticker:'CRS',  sector:'agroalimentaire', price:48,     change:-2.04, vol:'0.32M',  ytd:-14.20, cap:'0.5B',   div:1.5,   divYield:3.13, divFreq:'Annuel', divDate:'Juil 2025', domain:'cartier-saada.ma' },
  { rank:48, name:'Dari Couspate',        ticker:'DRI',  sector:'agroalimentaire', price:3150,   change:+0.64, vol:'0.14M',  ytd:+8.70,  cap:'3.5B',   div:110.0, divYield:3.49, divFreq:'Annuel', divDate:'Juin 2025', domain:'dari-couspate.com' },
  { rank:49, name:'Unimer',               ticker:'UMR',  sector:'agroalimentaire', price:75,     change:-1.32, vol:'0.28M',  ytd:-9.30,  cap:'1.1B',   div:2.5,   divYield:3.33, divFreq:'Annuel', divDate:'Juin 2025', domain:'unimer.ma' },
  { rank:50, name:'SBM',                  ticker:'SBM',  sector:'agroalimentaire', price:2150,   change:+0.23, vol:'0.12M',  ytd:+2.90,  cap:'3.2B',   div:80.0,  divYield:3.72, divFreq:'Annuel', divDate:'Juin 2025', domain:'sbm.ma' },
  // TRANSPORT
  { rank:51, name:'Marsa Maroc',          ticker:'MSA',  sector:'transport',       price:775,    change:-1.41, vol:'38.32M', ytd:-19.78, cap:'56.9B',  div:46.0,  divYield:5.94, divFreq:'Annuel', divDate:'Juin 2025', domain:'marsamaroc.ma' },
  { rank:52, name:'CTM',                  ticker:'CTM',  sector:'transport',       price:1540,   change:-0.32, vol:'0.21M',  ytd:-2.50,  cap:'4.0B',   div:55.0,  divYield:3.57, divFreq:'Annuel', divDate:'Juin 2025', domain:'ctm.ma' },
  { rank:53, name:'Timar',                ticker:'TIM',  sector:'transport',       price:385,    change:+0.26, vol:'0.08M',  ytd:+1.80,  cap:'0.5B',   div:14.0,  divYield:3.64, divFreq:'Annuel', divDate:'Juin 2025', domain:'timar.ma' },
  // IMMOBILIER
  { rank:54, name:'Addoha',               ticker:'ADH',  sector:'immobilier',      price:18.5,   change:-2.63, vol:'62.40M', ytd:-15.80, cap:'9.3B',   div:0.5,   divYield:2.70, divFreq:'Annuel', divDate:'Juil 2025', domain:'addoha.ma' },
  { rank:55, name:'Alliances Immobilier', ticker:'ADI',  sector:'immobilier',      price:45.2,   change:-1.09, vol:'4.20M',  ytd:-22.10, cap:'3.8B',   div:1.5,   divYield:3.32, divFreq:'Annuel', divDate:'Juil 2025', domain:'alliancesdeveloppement.ma' },
  { rank:56, name:'Aradei Capital',       ticker:'ARD',  sector:'immobilier',      price:480,    change:+0.42, vol:'0.31M',  ytd:+5.20,  cap:'4.8B',   div:20.0,  divYield:4.17, divFreq:'Annuel', divDate:'Juin 2025', domain:'aradeicapital.com' },
  { rank:57, name:'Balima',               ticker:'BAL',  sector:'immobilier',      price:148,    change:-0.67, vol:'0.09M',  ytd:-4.50,  cap:'0.7B',   div:6.0,   divYield:4.05, divFreq:'Annuel', divDate:'Juin 2025', domain:'balima.ma' },
  { rank:58, name:'Immorente Invest',     ticker:'IMO',  sector:'immobilier',      price:105,    change:+0.96, vol:'0.22M',  ytd:+4.90,  cap:'2.1B',   div:4.5,   divYield:4.29, divFreq:'Annuel', divDate:'Juin 2025', domain:'immorente.ma' },
  { rank:59, name:'Résidences Dar Saada', ticker:'RDS',  sector:'immobilier',      price:38.5,   change:-1.54, vol:'1.80M',  ytd:-18.60, cap:'2.1B',   div:1.2,   divYield:3.12, divFreq:'Annuel', divDate:'Juil 2025', domain:'darsaada.ma' },
  // DISTRIBUTION AUTO
  { rank:60, name:'Auto Hall',            ticker:'ATH',  sector:'distribution',    price:78,     change:+0.65, vol:'1.24M',  ytd:+3.40,  cap:'4.4B',   div:3.5,   divYield:4.49, divFreq:'Annuel', divDate:'Juin 2025', domain:'autohall.ma' },
  { rank:61, name:'Auto Nejma',           ticker:'NEJ',  sector:'distribution',    price:1820,   change:-0.55, vol:'0.07M',  ytd:-1.90,  cap:'1.8B',   div:70.0,  divYield:3.85, divFreq:'Annuel', divDate:'Juin 2025', domain:'autonejmavw.com' },
  { rank:62, name:'Ennakl Automobiles',   ticker:'NKL',  sector:'distribution',    price:140,    change:+1.45, vol:'0.35M',  ytd:+7.80,  cap:'1.0B',   div:5.5,   divYield:3.93, divFreq:'Annuel', divDate:'Juin 2025', domain:'ennakl.com.tn' },
  // INDUSTRIE
  { rank:63, name:'Snep',                 ticker:'SNP',  sector:'industrie',       price:880,    change:-0.34, vol:'0.16M',  ytd:-2.80,  cap:'2.6B',   div:35.0,  divYield:3.98, divFreq:'Annuel', divDate:'Juin 2025', domain:'snep.ma' },
  { rank:64, name:'Aluminium du Maroc',   ticker:'ALM',  sector:'industrie',       price:1560,   change:+0.78, vol:'0.12M',  ytd:+5.40,  cap:'3.1B',   div:60.0,  divYield:3.85, divFreq:'Annuel', divDate:'Juin 2025', domain:'aluminium-maroc.com' },
  { rank:65, name:'Fenie Brossette',      ticker:'FBR',  sector:'industrie',       price:310,    change:-0.64, vol:'0.09M',  ytd:-4.60,  cap:'1.6B',   div:12.0,  divYield:3.87, divFreq:'Annuel', divDate:'Juin 2025', domain:'feniebrossette.ma' },
  { rank:66, name:'Med Paper',            ticker:'MDP',  sector:'industrie',       price:58,     change:-1.69, vol:'0.28M',  ytd:-12.10, cap:'0.6B',   div:2.0,   divYield:3.45, divFreq:'Annuel', divDate:'Juil 2025', domain:'medpaper.ma' },
  { rank:67, name:'Maghrebail',           ticker:'MAB',  sector:'industrie',       price:430,    change:+0.47, vol:'0.11M',  ytd:+3.10,  cap:'1.3B',   div:17.0,  divYield:3.95, divFreq:'Annuel', divDate:'Juin 2025', domain:'maghrebail.ma' },
  { rank:68, name:'Maroc Leasing',        ticker:'MLE',  sector:'industrie',       price:265,    change:-0.37, vol:'0.08M',  ytd:-2.40,  cap:'0.8B',   div:10.0,  divYield:3.77, divFreq:'Annuel', divDate:'Juin 2025', domain:'marocleasing.ma' },
  { rank:69, name:'Réalisations Méca.',   ticker:'SRM',  sector:'industrie',       price:1940,   change:+0.52, vol:'0.06M',  ytd:+4.20,  cap:'1.9B',   div:75.0,  divYield:3.87, divFreq:'Annuel', divDate:'Juin 2025', domain:'srm.ma' },
  // SANTÉ
  { rank:70, name:'Akdital',              ticker:'AKT',  sector:'sante',           price:480,    change:+2.78, vol:'0.58M',  ytd:+22.40, cap:'14.4B',  div:8.0,   divYield:1.67, divFreq:'Annuel', divDate:'Juin 2025', domain:'akdital.ma' },
  { rank:71, name:'Promopharm',           ticker:'PRO',  sector:'sante',           price:1450,   change:+0.35, vol:'0.14M',  ytd:+6.20,  cap:'2.9B',   div:55.0,  divYield:3.79, divFreq:'Annuel', divDate:'Juin 2025', domain:'promopharm.ma' },
  { rank:72, name:'Sothema',              ticker:'SOT',  sector:'sante',           price:2250,   change:-0.44, vol:'0.19M',  ytd:+8.40,  cap:'5.6B',   div:90.0,  divYield:4.00, divFreq:'Annuel', divDate:'Juin 2025', domain:'sothema.com' },
  // HOLDING
  { rank:73, name:'Al Mada',              ticker:'ALM2', sector:'holding',         price:2100,   change:+0.19, vol:'0.42M',  ytd:+3.80,  cap:'45.0B',  div:70.0,  divYield:3.33, divFreq:'Annuel', divDate:'Juin 2025', domain:'almada.ma' },
  { rank:74, name:'Eqdom',                ticker:'EQD',  sector:'holding',         price:960,    change:-0.31, vol:'0.11M',  ytd:-2.10,  cap:'3.8B',   div:40.0,  divYield:4.17, divFreq:'Annuel', divDate:'Juin 2025', domain:'eqdom.ma' },
  { rank:75, name:'Rebab Company',        ticker:'REB',  sector:'holding',         price:24.5,   change:+1.24, vol:'0.09M',  ytd:+6.40,  cap:'0.4B',   div:0.8,   divYield:3.27, divFreq:'Annuel', divDate:'Juil 2025', domain:'rebab.ma' },
  { rank:76, name:'Risma',                ticker:'RIS',  sector:'holding',         price:175,    change:+1.16, vol:'0.34M',  ytd:+12.80, cap:'2.6B',   div:5.0,   divYield:2.86, divFreq:'Annuel', divDate:'Juin 2025', domain:'risma.ma' },
  { rank:77, name:'Valoris',              ticker:'VAL',  sector:'holding',         price:162,    change:+0.62, vol:'0.12M',  ytd:+4.10,  cap:'0.8B',   div:6.0,   divYield:3.70, divFreq:'Annuel', divDate:'Juin 2025', domain:'valoris.ma' },
  // SUSPENDU
  { rank:78, name:'Samir (Suspendu)',     ticker:'SAM',  sector:'energie',         price:0,      change:0,     vol:'—',      ytd:0,      cap:'—',      div:0,     divYield:0,    divFreq:'—',      divDate:'Suspendu',  domain:'samir.ma' },
];
export const SPARKLINE_DATA = {
  "ATW": [
    23,
    12,
    12,
    22,
    15,
    9,
    19,
    13
  ],
  "BOA": [
    18,
    12,
    16,
    26,
    6,
    5,
    19,
    8
  ],
  "BCP": [
    24,
    6,
    11,
    19,
    11,
    5,
    24,
    5
  ],
  "BMCI": [
    24,
    14,
    7,
    21,
    13,
    6,
    18,
    9
  ],
  "CFG": [
    20,
    7,
    8,
    17,
    9,
    16,
    26,
    14
  ],
  "CIH": [
    20,
    6,
    16,
    19,
    7,
    8,
    22,
    10
  ],
  "CDM": [
    15,
    12,
    7,
    16,
    11,
    11,
    21,
    9
  ],
  "SLF": [
    25,
    6,
    11,
    21,
    12,
    13,
    20,
    6
  ],
  "AFM": [
    23,
    12,
    5,
    17,
    13,
    13,
    23,
    12
  ],
  "AGM": [
    20,
    16,
    15,
    15,
    14,
    15,
    16,
    6
  ],
  "ATL": [
    25,
    14,
    5,
    20,
    12,
    15,
    23,
    12
  ],
  "SAH": [
    15,
    12,
    15,
    26,
    5,
    13,
    26,
    13
  ],
  "WAA": [
    18,
    15,
    5,
    25,
    9,
    6,
    24,
    7
  ],
  "MNG": [
    26,
    13,
    11,
    24,
    13,
    6,
    17,
    8
  ],
  "CMT": [
    24,
    15,
    13,
    23,
    7,
    7,
    21,
    16
  ],
  "SMI": [
    24,
    15,
    7,
    23,
    16,
    9,
    19,
    9
  ],
  "SID": [
    16,
    16,
    11,
    18,
    12,
    13,
    18,
    7
  ],
  "DHO": [
    23,
    12,
    15,
    26,
    11,
    15,
    26,
    14
  ],
  "ZDJ": [
    16,
    9,
    12,
    24,
    9,
    14,
    19,
    15
  ],
  "CMA": [
    18,
    15,
    10,
    24,
    14,
    13,
    26,
    16
  ],
  "LHM": [
    26,
    14,
    14,
    25,
    5,
    11,
    24,
    5
  ],
  "GTM": [
    17,
    8,
    13,
    24,
    13,
    16,
    18,
    12
  ],
  "TGC": [
    17,
    6,
    8,
    18,
    9,
    11,
    17,
    12
  ],
  "COL": [
    24,
    5,
    15,
    18,
    6,
    16,
    15,
    14
  ],
  "AFI": [
    24,
    11,
    14,
    16,
    9,
    15,
    21,
    12
  ],
  "JET": [
    20,
    6,
    12,
    24,
    9,
    13,
    17,
    15
  ],
  "DLM": [
    16,
    12,
    5,
    18,
    5,
    14,
    23,
    6
  ],
  "TQM": [
    16,
    10,
    9,
    23,
    13,
    16,
    20,
    15
  ],
  "TMA": [
    19,
    5,
    10,
    21,
    6,
    15,
    18,
    15
  ],
  "MOX": [
    17,
    11,
    6,
    21,
    15,
    8,
    21,
    15
  ],
  "GAZ": [
    24,
    6,
    16,
    22,
    16,
    12,
    19,
    13
  ],
  "IAM": [
    23,
    9,
    14,
    23,
    13,
    11,
    24,
    13
  ],
  "HPS": [
    25,
    16,
    7,
    25,
    6,
    11,
    18,
    16
  ],
  "INV": [
    21,
    7,
    7,
    25,
    7,
    16,
    18,
    16
  ],
  "M2M": [
    23,
    9,
    6,
    15,
    6,
    15,
    20,
    8
  ],
  "DYT": [
    18,
    14,
    16,
    17,
    7,
    13,
    16,
    15
  ],
  "DWY": [
    22,
    7,
    5,
    21,
    5,
    13,
    15,
    6
  ],
  "IBC": [
    24,
    9,
    10,
    22,
    8,
    5,
    16,
    10
  ],
  "MIC": [
    25,
    7,
    15,
    26,
    15,
    10,
    18,
    8
  ],
  "SMM": [
    24,
    5,
    13,
    16,
    14,
    12,
    24,
    9
  ],
  "CAP": [
    20,
    11,
    8,
    16,
    12,
    14,
    24,
    7
  ],
  "CSR": [
    25,
    12,
    6,
    15,
    6,
    8,
    22,
    11
  ],
  "LBV": [
    18,
    9,
    9,
    16,
    12,
    12,
    21,
    11
  ],
  "LES": [
    21,
    16,
    8,
    17,
    15,
    9,
    16,
    9
  ],
  "MUT": [
    22,
    10,
    15,
    25,
    6,
    16,
    21,
    8
  ],
  "OUL": [
    18,
    11,
    9,
    15,
    6,
    13,
    15,
    6
  ],
  "CRS": [
    23,
    9,
    14,
    22,
    7,
    11,
    18,
    9
  ],
  "DRI": [
    16,
    8,
    6,
    15,
    11,
    11,
    18,
    14
  ],
  "UMR": [
    16,
    5,
    8,
    23,
    6,
    14,
    20,
    6
  ],
  "SBM": [
    15,
    11,
    9,
    19,
    7,
    5,
    15,
    6
  ],
  "MSA": [
    19,
    5,
    5,
    22,
    8,
    11,
    21,
    11
  ],
  "CTM": [
    19,
    16,
    5,
    21,
    8,
    13,
    23,
    15
  ],
  "TIM": [
    23,
    13,
    16,
    15,
    9,
    7,
    19,
    11
  ],
  "ADH": [
    23,
    7,
    8,
    16,
    11,
    10,
    15,
    14
  ],
  "ADI": [
    18,
    9,
    7,
    25,
    15,
    15,
    20,
    11
  ],
  "ARD": [
    21,
    7,
    10,
    15,
    11,
    16,
    16,
    14
  ],
  "BAL": [
    24,
    9,
    8,
    21,
    13,
    5,
    17,
    12
  ],
  "IMO": [
    16,
    15,
    12,
    24,
    14,
    14,
    19,
    14
  ],
  "RDS": [
    21,
    15,
    14,
    23,
    9,
    13,
    20,
    8
  ],
  "ATH": [
    15,
    6,
    6,
    23,
    16,
    12,
    19,
    15
  ],
  "NEJ": [
    22,
    11,
    10,
    25,
    12,
    8,
    19,
    16
  ],
  "NKL": [
    24,
    16,
    14,
    24,
    6,
    9,
    18,
    6
  ],
  "SNP": [
    24,
    15,
    15,
    16,
    11,
    12,
    23,
    11
  ],
  "ALM": [
    20,
    13,
    13,
    25,
    9,
    16,
    16,
    10
  ],
  "FBR": [
    20,
    5,
    11,
    26,
    10,
    9,
    16,
    7
  ],
  "MDP": [
    17,
    8,
    13,
    20,
    7,
    8,
    26,
    8
  ],
  "MAB": [
    26,
    11,
    8,
    24,
    12,
    16,
    25,
    7
  ],
  "MLE": [
    17,
    6,
    16,
    20,
    6,
    5,
    21,
    8
  ],
  "SRM": [
    24,
    14,
    16,
    23,
    8,
    9,
    17,
    14
  ],
  "AKT": [
    15,
    5,
    14,
    15,
    16,
    14,
    22,
    11
  ],
  "PRO": [
    15,
    14,
    8,
    24,
    12,
    8,
    15,
    11
  ],
  "SOT": [
    26,
    12,
    13,
    22,
    9,
    10,
    16,
    16
  ],
  "ALM2": [
    24,
    11,
    13,
    24,
    15,
    15,
    24,
    8
  ],
  "EQD": [
    18,
    5,
    15,
    17,
    5,
    15,
    20,
    8
  ],
  "REB": [
    20,
    11,
    15,
    17,
    5,
    16,
    15,
    5
  ],
  "RIS": [
    15,
    7,
    13,
    18,
    16,
    15,
    26,
    15
  ],
  "VAL": [
    21,
    16,
    12,
    23,
    10,
    10,
    22,
    9
  ],
  "SAM": [
    23,
    13,
    16,
    16,
    9,
    14,
    19,
    16
  ]
};
