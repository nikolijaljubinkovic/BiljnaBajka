
import alokazijaDragonScale from '../slike/alokazija-dragon-scale.jpg'
import filodendronPinkPrincess from '../slike/filodendron-pink-princess.jpg'
import kraljevskiAnturijum from '../slike/kraljevski-anturijum.jpg'
import begonijaMaculata from '../slike/begonija-maculata.jpg'
import filodendronMelanochrysum from '../slike/filodendron-melanochrysum.jpg'
import stefania from '../slike/stefania.jpg'
import dioscoreaMexicana from '../slike/dioscorea-mexicana.jpg'
import hoyaCompacta from '../slike/hoya-compacta.jpg'
import trahiandra from '../slike/trahiandra.jpg'
import monsteraThaiConstellation from '../slike/monstera-thai-constellation.jpg'

export interface Biljka {
  id: number
  naziv: string
  latinskiNaziv: string
  cena: number
  tip: string
  opis: string
  nega: string
  svetlost: string
  zalivanje: string
  namena: string
  ciljnaGrupa: string
  datumProizvodnje: string
  ocena: number
  brojOcena: number
  recenzije: string[]
  slika: string
}

export const biljke: Biljka[] = [
  {
    id: 1,
    naziv: 'Alokazija Dragon Scale',
    latinskiNaziv: 'Alocasia baginda',
    cena: 4500,
    tip: 'Sobna biljka',
    opis: 'Neobična kolekcionarska biljka sa reljefnim listovima koji podsećaju na zmajeve krljušti. Idealan izbor za ljubitelje upečatljivih biljaka.',
    nega: 'Zahteva povišenu vlažnost vazduha, propustan supstrat i zaštitu od hladnoće.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati kada se gornji sloj supstrata prosuši.',
    namena: 'Za ljubitelje retkih biljaka i moderne enterijere',
    ciljnaGrupa: 'Iskusni ljubitelji biljaka i kolekcionari',
    datumProizvodnje: '2026-08-15',
    ocena: 4.9,
    brojOcena: 18,
    recenzije: [
      'Prelepi listovi i veoma zanimljiv izgled.',
      'Odlična biljka za kolekcionare, ali traži pažljivu negu.',
    ],
    slika: alokazijaDragonScale,
  },
  {
    id: 2,
    naziv: 'Filodendron Pink Princess',
    latinskiNaziv: 'Philodendron erubescens',
    cena: 5200,
    tip: 'Sobna biljka',
    opis: 'Atraktivna biljka sa tamnozelenim listovima prošaranim ružičastim nijansama. Svaki primerak ima jedinstven raspored boja.',
    nega: 'Držati na toplom mestu, uz indirektnu svetlost i umereno zalivanje.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati kada se gornjih nekoliko centimetara zemlje osuši.',
    namena: 'Za kolekcionare i ljubitelje upečatljivih boja',
    ciljnaGrupa: 'Ljubitelji dekorativnih biljaka i kolekcionari',
    datumProizvodnje: '2026-08-20',
    ocena: 4.8,
    brojOcena: 24,
    recenzije: [
      'Ružičaste šare su predivne i biljka izgleda posebno.',
      'Lepa biljka, potrebno je obezbediti joj dovoljno indirektne svetlosti.',
    ],
    slika: filodendronPinkPrincess,
  },
  {
    id: 3,
    naziv: 'Kraljevski anturijum',
    latinskiNaziv: 'Anthurium veitchii',
    cena: 6800,
    tip: 'Sobna biljka',
    opis: 'Elegantna tropska biljka prepoznatljiva po dugim, talasastim listovima koji prostoru daju izgled botaničke galerije.',
    nega: 'Potreban mu je propustan supstrat, toplota i povećana vlažnost vazduha.',
    svetlost: 'Indirektna svetlost',
    zalivanje: 'Održavati blagu vlažnost supstrata bez zadržavanja vode.',
    namena: 'Za dizajnerske enterijere i kolekcionare',
    ciljnaGrupa: 'Iskusni kolekcionari i ljubitelji tropskih biljaka',
    datumProizvodnje: '2026-08-12',
    ocena: 5.0,
    brojOcena: 12,
    recenzije: [
      'Listovi su impresivni i biljka izgleda veoma elegantno.',
      'Preporučujem je kolekcionarima koji mogu da obezbede odgovarajuću vlažnost.',
    ],
    slika: kraljevskiAnturijum,
  },
  {
    id: 4,
    naziv: 'Begonija Maculata',
    latinskiNaziv: 'Begonia maculata',
    cena: 2900,
    tip: 'Sobna biljka',
    opis: 'Dekorativna begonija sa srebrnim tačkama na listovima i crvenkastom donjom stranom. Posebno lepo izgleda na polici ili komodi.',
    nega: 'Ne voli prekomerno zalivanje. Potrebna joj je dobra cirkulacija vazduha.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati kada se površina zemlje prosuši.',
    namena: 'Za ljubitelje dekorativnih listova i elegantnih detalja',
    ciljnaGrupa: 'Početnici i ljubitelji dekorativnih sobnih biljaka',
    datumProizvodnje: '2026-08-18',
    ocena: 4.7,
    brojOcena: 16,
    recenzije: [
      'Tačkasti listovi su veoma dekorativni.',
      'Lepo izgleda u stanu, samo treba paziti da se ne zaliva previše.',
    ],
    slika: begonijaMaculata,
  },
  {
    id: 5,
    naziv: 'Filodendron Melanochrysum',
    latinskiNaziv: 'Philodendron melanochrysum',
    cena: 5900,
    tip: 'Sobna biljka',
    opis: 'Biljka baršunastih, izduženih listova i izraženih svetlijih žila. Donosi dubinu i sofisticiran izgled prostoru.',
    nega: 'Najbolje uspeva uz indirektnu svetlost, toplotu i umerenu vlažnost.',
    svetlost: 'Jarka do srednja indirektna svetlost',
    zalivanje: 'Zalivati kada se gornji sloj supstrata prosuši.',
    namena: 'Za kolekcionare i ljubitelje tropskog dizajna',
    ciljnaGrupa: 'Iskusni ljubitelji tropskih biljaka i kolekcionari',
    datumProizvodnje: '2026-08-10',
    ocena: 4.9,
    brojOcena: 9,
    recenzije: [
      'Baršunasti listovi izgledaju još lepše uživo.',
      'Odličan izbor za kolekciju tropskih biljaka.',
    ],
    slika: filodendronMelanochrysum,
  },
  {
    id: 6,
    naziv: 'Stefania',
    latinskiNaziv: 'Stephania erecta',
    cena: 3800,
    tip: 'Sobna biljka',
    opis: 'Neobična biljka sa zaobljenim, zadebljanim stablom i nežnim izdancima. Izgleda poput male prirodne skulpture.',
    nega: 'Zahteva propustan supstrat i pažljivo zalivanje, naročito tokom mirovanja.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati umereno tokom aktivnog rasta i izbegavati natapanje.',
    namena: 'Za ljubitelje neobičnih biljaka i minimalističkih prostora',
    ciljnaGrupa: 'Ljubitelji neobičnih biljaka i minimalističkog dizajna',
    datumProizvodnje: '2026-08-22',
    ocena: 4.8,
    brojOcena: 7,
    recenzije: [
      'Izgleda kao mala skulptura i lepo se uklapa u minimalistički prostor.',
      'Posebna biljka, važno je pažljivo pratiti zalivanje.',
    ],
    slika: stefania,
  },
  {
    id: 7,
    naziv: 'Dioscorea mexicana',
    latinskiNaziv: 'Dioscorea mexicana',
    cena: 7500,
    tip: 'Sobna biljka',
    opis: 'Retko izgledajuća biljka sa karakterističnim zadebljanim stablom i penjačkim izdancima. Pravi izbor za ljubitelje botaničkih rariteta.',
    nega: 'Potreban joj je veoma propustan supstrat i pažljivo prilagođeno zalivanje.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati prema fazi rasta i ne ostavljati koren u vodi.',
    namena: 'Za kolekcionare i ljubitelje botaničkih rariteta',
    ciljnaGrupa: 'Iskusni kolekcionari i ljubitelji retkih biljaka',
    datumProizvodnje: '2026-08-05',
    ocena: 5.0,
    brojOcena: 6,
    recenzije: [
      'Veoma neobična biljka koja privlači pažnju.',
      'Dobar izbor za kolekcionare koji vole botaničke raritete.',
    ],
    slika: dioscoreaMexicana,
  },
  {
    id: 8,
    naziv: 'Hoya Compacta',
    latinskiNaziv: 'Hoya carnosa compacta',
    cena: 3400,
    tip: 'Sobna biljka',
    opis: 'Neobična viseća biljka sa uvijenim, mesnatim listovima. Izgleda dekorativno na visokim policama i u visećim saksijama.',
    nega: 'Voli svetlo mesto i supstrat koji se brzo drenira.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Pustiti da se supstrat dobro prosuši između zalivanja.',
    namena: 'Za police, viseće saksije i moderne enterijere',
    ciljnaGrupa: 'Početnici i ljubitelji visećih biljaka',
    datumProizvodnje: '2026-08-17',
    ocena: 4.9,
    brojOcena: 21,
    recenzije: [
      'Prelepo izgleda na visokoj polici.',
      'Ne zahteva često zalivanje i veoma je dekorativna.',
    ],
    slika: hoyaCompacta,
  },
  {
    id: 9,
    naziv: 'Trahiandra',
    latinskiNaziv: 'Trachyandra tortilis',
    cena: 6200,
    tip: 'Sobna biljka',
    opis: 'Izuzetno neobična biljka sa uvijenim listovima koji podsećaju na apstraktnu skulpturu. Svaki primerak ima poseban karakter.',
    nega: 'Potreban joj je propustan supstrat, dosta svetlosti i pažljivo zalivanje.',
    svetlost: 'Jarka svetlost, uz postepeno privikavanje na direktno sunce',
    zalivanje: 'Zalivati umereno i pustiti da se supstrat prosuši.',
    namena: 'Za kolekcionare i ljubitelje neobičnog dizajna',
    ciljnaGrupa: 'Kolekcionari i ljubitelji skulpturalnih biljaka',
    datumProizvodnje: '2026-08-08',
    ocena: 4.8,
    brojOcena: 5,
    recenzije: [
      'Uvijeni listovi izgledaju kao prirodna umetnička instalacija.',
      'Zanimljiv izbor za one koji traže nešto drugačije.',
    ],
    slika: trahiandra,
  },
  {
    id: 10,
    naziv: 'Monstera Thai Constellation',
    latinskiNaziv: 'Monstera deliciosa Thai Constellation',
    cena: 8900,
    tip: 'Sobna biljka',
    opis: 'Posebna sorta monstere sa kremastim šarama na zelenim listovima koje podsećaju na zvezdano nebo.',
    nega: 'Najbolje uspeva na toplom mestu, uz indirektnu svetlost i propustan supstrat.',
    svetlost: 'Jarka indirektna svetlost',
    zalivanje: 'Zalivati kada se gornji sloj supstrata prosuši.',
    namena: 'Za kolekcionare i upečatljive enterijere',
    ciljnaGrupa: 'Kolekcionari i ljubitelji upečatljivih sobnih biljaka',
    datumProizvodnje: '2026-08-14',
    ocena: 5.0,
    brojOcena: 27,
    recenzije: [
      'Kremaste šare na listovima su prelepe.',
      'Veoma efektna biljka za enterijer, ali je skuplja od većine sobnih biljaka.',
    ],
    slika: monsteraThaiConstellation,
  },
]
