/* ════════════════════════════════════════════════════════
   WAMY — Bourse de Casablanca
   app.js — Pure Frontend (no backend, no Supabase, no auth)
   Data source: STOCKS array below (replace with your API call)
════════════════════════════════════════════════════════ */

// ══════════════════════════════════════════
// 1. STOCK DATA
// Replace this array with your real data source
// e.g. fetch('/api/stocks').then(r => r.json()).then(data => { STOCKS = data; applyFilter(); })
// ══════════════════════════════════════════
const STOCKS = [
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

// ══════════════════════════════════════════
// 2. LOGO SYSTEM
// ══════════════════════════════════════════
const AVATAR_BG = {
  banques:'1d4ed8', mines:'92400e', batiment:'c2410c', energie:'b45309',
  telecom:'6d28d9', agroalimentaire:'166534', transport:'0f766e',
  immobilier:'9f1239', assurances:'9d174d', distribution:'b45309',
  industrie:'1e40af', sante:'166534', holding:'581c87'
};

function logoHTML(ticker, sector, size = 34) {
  const bg      = AVATAR_BG[sector] || '15803d';
  const br      = size <= 28 ? '8px' : '9px';
  const letters = ticker.replace(/[^A-Z0-9]/g,'').slice(0,3) || ticker.slice(0,2).toUpperCase();
  const url     = `https://ui-avatars.com/api/?name=${encodeURIComponent(letters)}&background=${bg}&color=ffffff&size=128&bold=true&font-size=0.4`;
  const color   = getSectorColor(sector);
  return `<div class="stock-avatar logo-wrap ${color}" style="width:${size}px;height:${size}px;border-radius:${br};">
    <img src="${url}" class="company-logo avatar-visible" alt="${ticker}">
  </div>`;
}

// ══════════════════════════════════════════
// 3. APP STATE
// ══════════════════════════════════════════
let currentFilter = 'all';
let currentTab    = 'top';
let watchlist     = new Set();
let divSortKey    = 'yield';
let yieldAsc      = false;
let isLight       = false;
let currentPage   = 'marche';
let brokerFeeRate = 0.006;
let isAnimating   = false;

const PAGES = ['marche','search','outils','dividendes','favoris'];

const SECTOR_LABELS = {
  banques:'Banques', mines:'Mines', batiment:'Bâtiment', energie:'Énergie',
  telecom:'Télécom', agroalimentaire:'Agro', transport:'Transport',
  immobilier:'Immobilier', assurances:'Assurances', distribution:'Auto',
  industrie:'Industrie', sante:'Santé', holding:'Holding'
};
const SECTOR_COLORS = {
  banques:'c2', mines:'c3', batiment:'c6', energie:'c3', telecom:'c5',
  agroalimentaire:'c1', transport:'c7', immobilier:'c4', assurances:'c8',
  distribution:'c6', industrie:'c6', sante:'c1', holding:'c5'
};
function getSectorLabel(s) { return SECTOR_LABELS[s] || s; }
function getSectorColor(s)  { return SECTOR_COLORS[s] || 'c1'; }

// ══════════════════════════════════════════
// 4. WATCHLIST — localStorage only
// ══════════════════════════════════════════
function saveWatchlist() {
  try { localStorage.setItem('wamy_watchlist', JSON.stringify([...watchlist])); } catch(e){}
}
function loadWatchlist() {
  try {
    const saved = localStorage.getItem('wamy_watchlist');
    if (saved) watchlist = new Set(JSON.parse(saved));
  } catch(e){}
}

function toggleStar(e, ticker) {
  if (e) e.stopPropagation();
  const adding = !watchlist.has(ticker);
  if (adding) { watchlist.add(ticker);    showToast('⭐ Ajouté — ' + ticker); }
  else         { watchlist.delete(ticker); showToast('Retiré — ' + ticker); }
  saveWatchlist();
  applyFilter();
  if (currentPage === 'favoris') renderWatchlist();
}

function removeFav(ticker) {
  watchlist.delete(ticker);
  showToast('Retiré — ' + ticker);
  saveWatchlist();
  applyFilter();
  renderWatchlist();
}

// ══════════════════════════════════════════
// 5. SPARKLINE
// ══════════════════════════════════════════
function generateSparkline(change) {
  const up    = change >= 0;
  const color = up ? 'var(--green)' : 'var(--red)';
  const pts   = [0,1,2,3,4,5,6,7].map(i => {
    const noise = (Math.random()-0.5)*8;
    return `${i*7},${up ? 28-i*2+noise : 20+i*1.5+noise}`;
  }).join(' ');
  return `<svg viewBox="0 0 56 32" preserveAspectRatio="none">
    <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
}

// ══════════════════════════════════════════
// 6. RENDER STOCKS
// ══════════════════════════════════════════
function renderStocks(stocks, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  if (!stocks || !stocks.length) {
    container.innerHTML = `<div style="text-align:center;padding:40px 0;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">Aucun résultat trouvé</div>`;
    return;
  }
  container.innerHTML = stocks.map(s => {
    const up = s.change >= 0, dir = up ? 'up' : 'down';
    const starred   = watchlist.has(s.ticker);
    const suspended = s.ticker === 'SAM';
    return `
      <div class="stock-row ${dir} fade-in${suspended?' suspended':''}" onclick="showStockModal('${s.ticker}')">
        <div class="stock-rank">${s.rank}</div>
        ${logoHTML(s.ticker, s.sector, 34)}
        <div class="stock-info">
          <div class="stock-name">${s.name}</div>
          <div class="stock-sector">${s.ticker} · ${getSectorLabel(s.sector)}</div>
        </div>
        <div class="stock-chart">${suspended ? '' : generateSparkline(s.change)}</div>
        <div class="stock-right">
          <div class="stock-price">${suspended ? '—' : s.price.toLocaleString('fr-FR')} <span style="font-size:10px;color:var(--text3);">MAD</span></div>
          <div class="stock-change ${dir}">${suspended
            ? '<span style="color:var(--text3);font-size:10px;">Suspendu</span>'
            : `<span class="arrow-icon">${up?'▲':'▼'}</span> ${Math.abs(s.change).toFixed(2)}%`}</div>
          <div style="display:flex;gap:4px;margin-top:2px;justify-content:flex-end;flex-wrap:wrap;">
            <div class="stock-cap">${s.cap}</div>
            ${s.divYield > 0 ? `<span class="div-badge">${s.divYield.toFixed(2)}%</span>` : ''}
          </div>
        </div>
        <div class="star-btn ${starred?'starred':''}" onclick="toggleStar(event,'${s.ticker}')">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="${starred?'#f5c842':'none'}" stroke="${starred?'#f5c842':'currentColor'}" stroke-width="1.5">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
        </div>
      </div>`;
  }).join('');
}

function applyFilter() {
  let stocks = [...STOCKS];
  if (currentFilter !== 'all') stocks = stocks.filter(s => s.sector === currentFilter);
  if      (currentTab==='hausses')   stocks = stocks.filter(s=>s.change>0).sort((a,b)=>b.change-a.change);
  else if (currentTab==='baisses')   stocks = stocks.filter(s=>s.change<0).sort((a,b)=>a.change-b.change);
  else if (currentTab==='tendances') stocks = [...stocks].sort((a,b)=>(parseFloat(b.vol)||0)-(parseFloat(a.vol)||0));
  else if (currentTab==='rendement') stocks = [...stocks].sort((a,b)=>b.ytd-a.ytd);

  renderStocks(stocks, 'stock-table');

  // Update stats
  const hausses = STOCKS.filter(s=>s.change>0).length;
  const baisses = STOCKS.filter(s=>s.change<0).length;
  const stables = STOCKS.filter(s=>s.change===0).length;
  const set = (id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;};
  set('stat-hausses', hausses);
  set('stat-baisses', baisses);
  set('stat-stables', stables);
  set('stock-count', stocks.length + ' actions');
}

// ══════════════════════════════════════════
// 7. PAGE NAVIGATION
// ══════════════════════════════════════════
function showPage(page, forceDir) {
  if (!PAGES.includes(page) || page === currentPage || isAnimating) return;
  isAnimating = true;

  const prevIdx  = PAGES.indexOf(currentPage);
  const nextIdx  = PAGES.indexOf(page);
  const dir      = forceDir || (nextIdx > prevIdx ? 'left' : 'right');
  const incoming = document.getElementById('page-' + page);
  const outgoing = document.getElementById('page-' + currentPage);

  if (page === 'outils')     renderQuickRef();
  if (page === 'search')     searchStocks();
  if (page === 'dividendes') renderDivList();
  if (page === 'favoris')    renderWatchlist();

  const navTabs = document.getElementById('nav-tabs');
  if (navTabs) navTabs.style.display = page === 'marche' ? 'flex' : 'none';

  if (incoming) {
    incoming.style.transition = 'none';
    incoming.style.transform  = dir==='left' ? 'translateX(100%)' : 'translateX(-100%)';
    incoming.style.display    = 'flex';
    incoming.style.opacity    = '0.6';
  }
  incoming?.getBoundingClientRect();

  const DUR = '300ms', EASE = 'cubic-bezier(0.25,0.46,0.45,0.94)';
  if (outgoing) { outgoing.style.transition=`transform ${DUR} ${EASE},opacity ${DUR} ${EASE}`; outgoing.style.transform=dir==='left'?'translateX(-30%)':'translateX(30%)'; outgoing.style.opacity='0'; }
  if (incoming) { incoming.style.transition=`transform ${DUR} ${EASE},opacity ${DUR} ${EASE}`; incoming.style.transform='translateX(0)'; incoming.style.opacity='1'; }

  setTimeout(() => {
    if (outgoing) { outgoing.style.cssText=''; outgoing.classList.remove('active'); }
    if (incoming) { incoming.style.cssText=''; incoming.classList.add('active'); }
    document.querySelectorAll('.nav-item').forEach(n=>n.classList.remove('active'));
    document.getElementById('nav-'+page)?.classList.add('active');
    currentPage = page;
    isAnimating = false;
    if (page==='search') setTimeout(()=>document.getElementById('search-input')?.focus(), 100);
  }, 310);
}

// ══════════════════════════════════════════
// 8. FILTERS & TABS
// ══════════════════════════════════════════
function filterStocks(filter, el) {
  currentFilter = filter;
  document.querySelectorAll('.filter-chip').forEach(c=>c.classList.remove('active'));
  if (el) el.classList.add('active');
  applyFilter();
}
function setTab(el, tab) {
  currentTab = tab;
  document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
  if (el) el.classList.add('active');
  applyFilter();
}

// ══════════════════════════════════════════
// 9. SEARCH
// ══════════════════════════════════════════
function searchStocks() {
  const q = (document.getElementById('search-input')?.value||'').toLowerCase().trim();
  const pool = q ? STOCKS.filter(s =>
    s.name.toLowerCase().includes(q) ||
    s.ticker.toLowerCase().includes(q) ||
    getSectorLabel(s.sector).toLowerCase().includes(q)
  ) : STOCKS;
  renderStocks(pool, 'search-results');
}

// ══════════════════════════════════════════
// 10. CALCULATOR
// ══════════════════════════════════════════
function setBrokerFee(rate, el) {
  brokerFeeRate = rate / 100;
  document.querySelectorAll('.broker-btn').forEach(b=>b.classList.remove('active'));
  if (el) el.classList.add('active');
  document.getElementById('broker-fee-custom').value = '';
  const lbl = document.getElementById('fee-label');
  if (lbl) lbl.textContent = rate + '%';
  calculateCost();
}
function setBrokerFeeCustom(inp) {
  const v = parseFloat(inp.value);
  if (!isNaN(v) && v >= 0 && v <= 5) {
    brokerFeeRate = v / 100;
    document.querySelectorAll('.broker-btn').forEach(b=>b.classList.remove('active'));
    const lbl = document.getElementById('fee-label');
    if (lbl) lbl.textContent = v + '%';
    calculateCost();
  }
}
function calculateCost() {
  const p = parseFloat(document.getElementById('calc-price')?.value);
  const q = parseInt(document.getElementById('calc-qty')?.value);
  const content = document.getElementById('result-content');
  const empty   = document.getElementById('result-empty');
  if (!p||!q||isNaN(p)||isNaN(q)||p<=0||q<=0) {
    content?.classList.remove('show'); empty?.classList.remove('hide'); return;
  }
  const sub       = p * q;
  const courtier  = sub * brokerFeeRate;
  const tva       = courtier * 0.10;
  const bourse    = sub * 0.001;
  const total     = sub + courtier + tva + bourse;
  const totalFees = courtier + tva + bourse;
  const feesPct   = (brokerFeeRate * 100).toFixed(2);
  const set=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  set('res-subtotal', sub.toLocaleString('fr-FR',{minimumFractionDigits:2})+' MAD');
  set('res-fees',    '+'+totalFees.toLocaleString('fr-FR',{minimumFractionDigits:2})+' MAD');
  set('res-unit',    p.toLocaleString('fr-FR',{minimumFractionDigits:2})+' MAD');
  set('res-total',   total.toLocaleString('fr-FR',{minimumFractionDigits:2})+' MAD');
  const fl = document.getElementById('fees-label-result');
  if (fl) fl.textContent = `Frais (${feesPct}% + TVA + Bourse)`;
  content?.classList.add('show'); empty?.classList.add('hide');
}

function prefillCalc(price, ticker, evt) {
  if (evt) evt.stopPropagation();
  const inp   = document.getElementById('calc-price');
  const badge = document.getElementById('calc-selected-badge');
  if (inp) { inp.value=price; calculateCost(); }
  if (badge) { badge.style.display='flex'; badge.innerHTML=`<strong style="color:var(--green);">${ticker}</strong><span style="color:var(--text3);">→</span>${Number(price).toLocaleString('fr-FR')} MAD`; }
  document.querySelectorAll('.qr-card').forEach(c=>c.classList.remove('selected'));
  document.querySelector(`.qr-card[data-ticker="${ticker}"]`)?.classList.add('selected');
  inp?.scrollIntoView({behavior:'smooth',block:'center'});
}

// ══════════════════════════════════════════
// 11. QUICK REFERENCE
// ══════════════════════════════════════════
function renderQuickRef() {
  const container = document.getElementById('quick-ref');
  const countEl   = document.getElementById('qr-count');
  const q = (document.getElementById('qr-search')?.value||'').toLowerCase().trim();
  document.getElementById('qr-clear')?.classList.toggle('show', q.length>0);
  let stocks = q ? STOCKS.filter(s=>s.name.toLowerCase().includes(q)||s.ticker.toLowerCase().includes(q)||getSectorLabel(s.sector).toLowerCase().includes(q)) : STOCKS;
  if (countEl) countEl.textContent = stocks.length+' actions';
  if (!container) return;
  if (!stocks.length) { container.innerHTML=`<div style="padding:24px;text-align:center;color:var(--text3);font-family:'JetBrains Mono',monospace;font-size:12px;">Aucune action trouvée</div>`; return; }
  container.innerHTML = stocks.map(s => {
    const up=s.change>=0, susp=s.ticker==='SAM';
    return `
      <div class="qr-card" data-ticker="${s.ticker}" onclick="prefillCalc(${s.price},'${s.ticker}',event)">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">
          ${logoHTML(s.ticker, s.sector, 28)}
          <div style="min-width:0;"><div class="qr-ticker">${s.ticker}</div><div class="qr-name">${s.name}</div></div>
        </div>
        <div class="qr-price">${susp?'—':s.price.toLocaleString('fr-FR')+' MAD'}</div>
        <div class="qr-change ${up?'up':'down'}">${susp?'Suspendu':(up?'▲':'▼')+' '+Math.abs(s.change).toFixed(2)+'%'}</div>
        <button class="qr-use-btn" onclick="prefillCalc(${s.price},'${s.ticker}',event)">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg> Calculer
        </button>
      </div>`;
  }).join('');
}
function clearQrSearch() { const i=document.getElementById('qr-search'); if(i)i.value=''; renderQuickRef(); }

// ══════════════════════════════════════════
// 12. DIVIDENDES
// ══════════════════════════════════════════
function renderDivList() {
  const container = document.getElementById('div-list');
  if (!container) return;
  const q=(document.getElementById('div-search')?.value||'').toLowerCase().trim();
  let stocks = q ? STOCKS.filter(s=>s.name.toLowerCase().includes(q)||s.ticker.toLowerCase().includes(q)||getSectorLabel(s.sector).toLowerCase().includes(q)) : [...STOCKS];
  stocks = stocks.filter(s=>s.divYield>0);
  if (divSortKey==='yield') stocks.sort((a,b)=>yieldAsc?a.divYield-b.divYield:b.divYield-a.divYield);
  else if (divSortKey==='div')   stocks.sort((a,b)=>b.div-a.div);
  else if (divSortKey==='price') stocks.sort((a,b)=>b.price-a.price);
  else if (divSortKey==='name')  stocks.sort((a,b)=>a.name.localeCompare(b.name));
  const sorted=[...STOCKS].filter(s=>s.divYield>0).sort((a,b)=>b.divYield-a.divYield);
  const highest=sorted[0], lowest=sorted[sorted.length-1];
  const avg=sorted.reduce((a,s)=>a+s.divYield,0)/sorted.length;
  const set=(id,val)=>{const el=document.getElementById(id);if(el)el.textContent=val;};
  set('div-highest',highest.divYield.toFixed(2)+'%'); set('div-highest-name',highest.ticker);
  set('div-lowest', lowest.divYield.toFixed(2)+'%');  set('div-lowest-name', lowest.ticker);
  set('div-avg',    avg.toFixed(2)+'%');
  container.innerHTML=stocks.map(s=>`
    <div class="div-card fade-in" onclick="showStockModal('${s.ticker}')">
      ${logoHTML(s.ticker, s.sector, 38)}
      <div class="div-info">
        <div class="div-name">${s.name}</div>
        <div class="div-meta"><span>${s.ticker}</span><span>${getSectorLabel(s.sector)}</span><span>${s.price.toLocaleString('fr-FR')} MAD</span></div>
        <div class="div-date-badge">📅 ${s.divDate}</div>
      </div>
      <div class="div-right">
        <div class="div-yield-big">${s.divYield.toFixed(2)}%</div>
        <div class="div-amount">${s.div} MAD/action</div>
        <div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;margin-top:2px;">${s.divFreq}</div>
      </div>
    </div>`).join('');
}
function toggleYieldSort(el) {
  yieldAsc=!yieldAsc; divSortKey='yield';
  document.querySelectorAll('.div-sort-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active'); el.textContent=yieldAsc?'Rendement ↑':'Rendement ↓';
  renderDivList();
}
function sortDiv(key,el) {
  divSortKey=key;
  document.querySelectorAll('.div-sort-btn').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  const btn=document.getElementById('btn-yield'); if(btn) btn.textContent='Rendement ↓';
  renderDivList();
}

// ══════════════════════════════════════════
// 13. WATCHLIST / FAVORIS
// ══════════════════════════════════════════
function renderWatchlist() {
  const container=document.getElementById('watchlist-container');
  const countEl=document.getElementById('fav-count');
  if (!container) return;
  if (countEl) countEl.textContent=watchlist.size;
  const favs=STOCKS.filter(s=>watchlist.has(s.ticker));
  if (!favs.length) {
    container.innerHTML=`<div class="fav-empty"><div style="font-size:40px;margin-bottom:12px;">⭐</div><div class="fav-empty-text">Aucun favori pour l'instant</div><div class="fav-empty-sub">Appuyez sur l'étoile ☆ sur n'importe quelle action</div></div>`;
    return;
  }
  container.innerHTML=favs.map(s=>{
    const up=s.change>=0;
    return `
      <div class="fav-card fade-in">
        <div class="fav-card-glow ${up?'glow-green':'glow-red'}"></div>
        <div class="fav-card-inner" onclick="showStockModal('${s.ticker}')">
          ${logoHTML(s.ticker, s.sector, 38)}
          <div class="fav-card-info">
            <div class="fav-card-name">${s.name}</div>
            <div style="display:flex;align-items:center;gap:6px;margin-top:3px;flex-wrap:wrap;">
              <span class="fav-ticker-badge">${s.ticker}</span>
              <span style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;">${getSectorLabel(s.sector)}</span>
            </div>
            ${s.divYield>0?`<div style="font-size:10px;color:#f5c842;font-family:'JetBrains Mono',monospace;margin-top:4px;">Rdt ${s.divYield.toFixed(2)}%</div>`:''}
          </div>
          <div style="text-align:right;">
            <div class="fav-price">${s.price>0?s.price.toLocaleString('fr-FR')+' MAD':'—'}</div>
            <div class="fav-change ${up?'up':'down'}">${s.change!==0?(up?'▲':'▼')+' '+Math.abs(s.change).toFixed(2)+'%':'—'}</div>
            <div style="font-size:10px;color:var(--text3);font-family:'JetBrains Mono',monospace;margin-top:2px;">YTD ${s.ytd>0?'+':''}${s.ytd}%</div>
          </div>
          <div class="fav-remove-btn" onclick="event.stopPropagation();removeFav('${s.ticker}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ══════════════════════════════════════════
// 14. STOCK MODAL
// ══════════════════════════════════════════
function showStockModal(ticker) {
  const s=STOCKS.find(x=>x.ticker===ticker);
  if (!s) return;
  const up=s.change>=0, el=id=>document.getElementById(id);
  const avEl=el('modal-avatar');
  if (avEl) {
    const bg=AVATAR_BG[s.sector]||'15803d';
    const letters=s.ticker.replace(/[^A-Z0-9]/g,'').slice(0,3)||s.ticker.slice(0,2).toUpperCase();
    const url=`https://ui-avatars.com/api/?name=${encodeURIComponent(letters)}&background=${bg}&color=ffffff&size=192&bold=true&font-size=0.4`;
    avEl.innerHTML=`<img src="${url}" style="width:100%;height:100%;object-fit:cover;border-radius:14px;" alt="${s.ticker}">`;
  }
  if (el('modal-name'))   el('modal-name').textContent   = s.name;
  if (el('modal-ticker')) el('modal-ticker').textContent = s.ticker+' · '+getSectorLabel(s.sector);
  if (el('modal-price'))  el('modal-price').textContent  = s.price>0?s.price.toLocaleString('fr-FR')+' MAD':'Suspendu';
  const chEl=el('modal-change');
  if (chEl){chEl.className='stock-change '+(up?'up':'down');chEl.innerHTML=s.change!==0?`<span class="arrow-icon">${up?'▲':'▼'}</span> ${Math.abs(s.change).toFixed(2)}%`:'—';chEl.style.justifyContent='flex-end';}
  const stEl=el('modal-stats');
  if (stEl) stEl.innerHTML=[
    ['VOLUME',s.vol],['YTD',s.ytd!==0?(s.ytd>0?'+':'')+s.ytd+'%':'—'],
    ['CAPITALISATION',s.cap!=='—'?s.cap+' MAD':'—'],
    ['DIVIDENDE',s.div>0?s.div+' MAD ('+s.divYield.toFixed(2)+'%)':'—'],
    ['FRÉQUENCE',s.divFreq],['PROCHAIN DIV',s.divDate],
  ].map(([l,v])=>`<div class="modal-stat"><div class="modal-stat-label">${l}</div><div class="modal-stat-val">${v}</div></div>`).join('');
  el('stock-modal')?.classList.add('open');
}
function closeModal(e) { if(e&&e.target.id==='stock-modal') document.getElementById('stock-modal')?.classList.remove('open'); }

// ══════════════════════════════════════════
// 15. THEME
// ══════════════════════════════════════════
function toggleTheme() {
  isLight = !isLight;
  document.body.classList.toggle('light', isLight);
  document.getElementById('icon-moon').style.display = isLight ? 'none' : 'block';
  document.getElementById('icon-sun').style.display  = isLight ? 'block' : 'none';
  try { localStorage.setItem('wamy_theme', isLight ? 'light' : 'dark'); } catch(e){}
}
function loadTheme() {
  try {
    if (localStorage.getItem('wamy_theme') === 'light') {
      isLight = true; document.body.classList.add('light');
      const m=document.getElementById('icon-moon'), s=document.getElementById('icon-sun');
      if(m) m.style.display='none'; if(s) s.style.display='block';
    }
  } catch(e){}
}

// ══════════════════════════════════════════
// 16. MARKET TIMER
// Bourse de Casablanca: Mon–Fri 09:30–15:30 Rabat (UTC+1)
// ══════════════════════════════════════════
function updateMarketTimer() {
  const now   = new Date();
  const utc   = now.getTime() + now.getTimezoneOffset() * 60000;
  const rabat = new Date(utc + 3600000);
  const day   = rabat.getDay();
  const h     = rabat.getHours(), m = rabat.getMinutes();
  const total = h * 60 + m;
  const OPEN  = 9*60+30, CLOSE = 15*60+30;
  const isWeekday = day >= 1 && day <= 5;
  const isOpen    = isWeekday && total >= OPEN && total < CLOSE;

  const timerEl  = document.getElementById('market-timer');
  const statusEl = document.getElementById('market-status');
  const timeEl   = document.getElementById('market-time');
  if (!timerEl) return;

  timerEl.className = 'market-timer ' + (isOpen ? 'open' : 'closed');
  if (isOpen) {
    const rem = CLOSE - total, rh = Math.floor(rem/60), rm = rem%60;
    statusEl.textContent = 'OUVERT';
    timeEl.textContent   = `Ferme dans ${rh>0?rh+'h':''}${String(rm).padStart(2,'0')}min`;
  } else {
    statusEl.textContent = 'FERMÉ';
    const nextOpen = new Date(rabat);
    nextOpen.setHours(9, 30, 0, 0);
    if (total >= CLOSE || !isWeekday) nextOpen.setDate(nextOpen.getDate()+(day===5?3:day===6?2:1));
    const diffMs = nextOpen - rabat;
    const diffH  = Math.floor(diffMs/3600000), diffM = Math.floor((diffMs%3600000)/60000);
    timeEl.textContent = diffH < 24
      ? `Ouvre dans ${diffH}h${String(diffM).padStart(2,'0')}min`
      : `Ouvre ${['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'][nextOpen.getDay()]} 09:30`;
  }
}

// ══════════════════════════════════════════
// 17. TOAST
// ══════════════════════════════════════════
function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent=msg; t.classList.add('show');
  setTimeout(()=>t.classList.remove('show'), 2500);
}

// ══════════════════════════════════════════
// 18. SWIPE
// ══════════════════════════════════════════
function setupSwipe() {
  let sx=0, sy=0, dragging=false;
  document.addEventListener('touchstart',e=>{sx=e.touches[0].clientX;sy=e.touches[0].clientY;dragging=false;},{passive:true});
  document.addEventListener('touchmove',e=>{const dx=e.touches[0].clientX-sx,dy=e.touches[0].clientY-sy;if(!dragging&&Math.abs(dx)>Math.abs(dy)&&Math.abs(dx)>8)dragging=true;},{passive:true});
  document.addEventListener('touchend',e=>{
    if(!dragging)return;
    const dx=e.changedTouches[0].clientX-sx;
    if(Math.abs(dx)>60){const i=PAGES.indexOf(currentPage);if(dx<0&&i<PAGES.length-1)showPage(PAGES[i+1],'left');else if(dx>0&&i>0)showPage(PAGES[i-1],'right');}
    dragging=false;
  },{passive:true});
}

// ══════════════════════════════════════════
// 19. INIT
// ══════════════════════════════════════════
function initApp() {
  loadTheme();
  loadWatchlist();
  applyFilter();
  renderWatchlist();
  searchStocks();
  renderDivList();
  setupSwipe();
  updateMarketTimer();
  setInterval(updateMarketTimer, 30000);

  // ── Hook: replace static data with your live API ──────────────
  // Uncomment and adapt this block when your backend is ready:
  //
  // fetch('/api/stocks')
  //   .then(r => r.json())
  //   .then(data => {
  //     // data should be an array matching the STOCKS shape above
  //     STOCKS.length = 0;
  //     STOCKS.push(...data);
  //     applyFilter();
  //     renderDivList();
  //     renderWatchlist();
  //     searchStocks();
  //   })
  //   .catch(err => console.warn('API unavailable, using static data:', err));
}

document.readyState === 'loading'
  ? document.addEventListener('DOMContentLoaded', initApp)
  : initApp();
