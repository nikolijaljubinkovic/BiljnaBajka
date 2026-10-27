import ruze from '../slike/buket-ruze.jpg'
import tulipani from '../slike/buket-tulipani.jpg'
import ljubicasti from '../slike/buket-ljubicasti.jpg'
import ljiljani from '../slike/buket-ljiljani.jpg'
import crveneRuze from '../slike/buket-crvene-ruze.jpg'
import gerbere from '../slike/buket-gerbere.jpg'
import poljskoCvece from '../slike/buket-poljsko-cvece.jpg'
import hortenzije from '../slike/buket-hortenzije.jpg'
import bozuri from '../slike/buket-bozuri.jpg'
import sezonski from '../slike/buket-sezonski.jpg'

export interface Buket {
  id: number
  naziv: string
  cena: number
  kategorija: string
  opis: string
  prilika: string
  boje: string
  brojCvetova: string
  slika: string
}

export const buketi: Buket[] = [
  {
    id: 11,
    naziv: 'Romantične ruže',
    cena: 3500,
    kategorija: 'Ruže',
    opis: 'Elegantan buket nežnih ruža koji unosi toplinu, romantiku i posebnu čar u svaki trenutak.',
    prilika: 'Rođendan, godišnjica i romantični pokloni',
    boje: 'Roze i krem',
    brojCvetova: '15 ruža',
    slika: ruze,
  },
  {
    id: 12,
    naziv: 'Prolećni tulipani',
    cena: 2800,
    kategorija: 'Sezonsko cveće',
    opis: 'Svež i vedar buket tulipana, savršen za poklanjanje pažnje i ulepšavanje svakog prostora.',
    prilika: 'Rođendan, Dan žena i znak pažnje',
    boje: 'Različite prolećne boje',
    brojCvetova: '15 tulipana',
    slika: tulipani,
  },
  {
    id: 13,
    naziv: 'Ljubičasta elegancija',
    cena: 4200,
    kategorija: 'Mešani buketi',
    opis: 'Poseban spoj ljubičastih tonova i pažljivo odabranog cveća za sofisticiran i upečatljiv poklon.',
    prilika: 'Rođendan, proslava i zahvalnost',
    boje: 'Ljubičasta i bela',
    brojCvetova: 'Mešani buket',
    slika: ljubicasti,
  },
  {
    id: 14,
    naziv: 'Beli ljiljani',
    cena: 3900,
    kategorija: 'Ljiljani',
    opis: 'Prefinjen buket ljiljana elegantnog izgleda i nežnog utiska, namenjen posebnim prilikama.',
    prilika: 'Svečane prilike, poklon i dekoracija',
    boje: 'Bela',
    brojCvetova: '7 ljiljana',
    slika: ljiljani,
  },
  {
    id: 15,
    naziv: 'Crvena strast',
    cena: 4500,
    kategorija: 'Ruže',
    opis: 'Klasične crvene ruže koje simbolizuju ljubav, pažnju i snažne emocije.',
    prilika: 'Godišnjica, romantični poklon i iznenađenje',
    boje: 'Crvena',
    brojCvetova: '21 ruža',
    slika: crveneRuze,
  },
  {
    id: 16,
    naziv: 'Sunčane gerbere',
    cena: 2600,
    kategorija: 'Mešani buketi',
    opis: 'Vesele gerbere koje unose boju, optimizam i vedrinu u svaki dan.',
    prilika: 'Rođendan, čestitka i svakodnevni poklon',
    boje: 'Šarene',
    brojCvetova: '11 gerbera',
    slika: gerbere,
  },
  {
    id: 17,
    naziv: 'Poljska romantika',
    cena: 2400,
    kategorija: 'Sezonsko cveće',
    opis: 'Prirodno razigran buket inspirisan livadskim cvećem, za one koji vole nežnost i jednostavnost.',
    prilika: 'Znak pažnje, rođendan i poklon bez posebnog povoda',
    boje: 'Pastelne i prirodne',
    brojCvetova: 'Sezonski izbor',
    slika: poljskoCvece,
  },
  {
    id: 18,
    naziv: 'Hortenzija u pastelnim tonovima',
    cena: 3800,
    kategorija: 'Hortenzije',
    opis: 'Bujan buket hortenzija nežnih tonova koji izgleda raskošno i moderno.',
    prilika: 'Rođendan, useljenje i svečani poklon',
    boje: 'Roze, plava i bela',
    brojCvetova: '5 cvetnih stabljika',
    slika: hortenzije,
  },
  {
    id: 19,
    naziv: 'Luksuzni božuri',
    cena: 5200,
    kategorija: 'Božuri',
    opis: 'Bogati i nežni božuri raskošnih latica za poklon koji ostavlja snažan utisak.',
    prilika: 'Godišnjica, proslava i posebni trenuci',
    boje: 'Roze i krem',
    brojCvetova: '7 božura',
    slika: bozuri,
  },
  {
    id: 20,
    naziv: 'Sezonska bajka',
    cena: 3200,
    kategorija: 'Sezonsko cveće',
    opis: 'Pažljivo osmišljen buket sezonskog cveća, sastavljen tako da svaki put donese poseban doživljaj.',
    prilika: 'Rođendan, poklon i svakodnevno ulepšavanje',
    boje: 'U skladu sa sezonom',
    brojCvetova: 'Mešani buket',
    slika: sezonski,
  },
]