
import { reactive } from 'vue'
import { prijavljeniKorisnik } from './autentifikacija'

export type TipProizvoda = 'biljka' | 'buket'

export type StatusRezervacije =
  | 'rezervisano'
  | 'pristiglo'
  | 'otkazano'

export interface Rezervacija {
  id: string
  korisnikId: string
  proizvodId: string
  naziv: string
  cena: number
  slika: string
  tip: TipProizvoda
  kolicina: number
  status: StatusRezervacije
  datumRezervacije: string
  datumProizvodnje?: string
  ocena?: number
}

const KLJUC_REZERVACIJA = 'biljna-bajka-rezervacije'

function ucitajRezervacije(): Rezervacija[] {
  try {
    const sacuvano = localStorage.getItem(KLJUC_REZERVACIJA)

    if (!sacuvano) return []

    const podaci: unknown = JSON.parse(sacuvano)

    if (!Array.isArray(podaci)) return []

    return podaci.filter(
      (stavka): stavka is Rezervacija =>
        typeof stavka?.id === 'string' &&
        typeof stavka?.korisnikId === 'string' &&
        typeof stavka?.proizvodId === 'string' &&
        typeof stavka?.naziv === 'string' &&
        typeof stavka?.cena === 'number' &&
        typeof stavka?.slika === 'string' &&
        (stavka?.tip === 'biljka' || stavka?.tip === 'buket') &&
        typeof stavka?.kolicina === 'number' &&
        ['rezervisano', 'pristiglo', 'otkazano'].includes(stavka?.status) &&
        typeof stavka?.datumRezervacije === 'string',
    )
  } catch {
    return []
  }
}

export const rezervacije = reactive<Rezervacija[]>(
  ucitajRezervacije(),
)

function sacuvajRezervacije(): boolean {
  try {
    localStorage.setItem(
      KLJUC_REZERVACIJA,
      JSON.stringify(rezervacije),
    )
    return true
  } catch {
    return false
  }
}

export function mojeRezervacije(): Rezervacija[] {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) return []

  return rezervacije.filter(
    stavka => stavka.korisnikId === korisnik.id,
  )
}

export function napraviRezervaciju(
  proizvod: {
    id: string
    naziv: string
    cena: number
    slika: string
    tip: TipProizvoda
    datumProizvodnje?: string
  },
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Prijavi se da bi rezervisala proizvod.',
    }
  }

  const novaRezervacija: Rezervacija = {
    id: crypto.randomUUID(),
    korisnikId: korisnik.id,
    proizvodId: proizvod.id,
    naziv: proizvod.naziv,
    cena: proizvod.cena,
    slika: proizvod.slika,
    tip: proizvod.tip,
    kolicina: 1,
    status: 'rezervisano',
    datumRezervacije: new Date().toISOString(),
    datumProizvodnje: proizvod.datumProizvodnje,
  }

  rezervacije.push(novaRezervacija)

  if (!sacuvajRezervacije()) {
    rezervacije.pop()

    return {
      uspeh: false,
      poruka: 'Rezervacija nije sačuvana. Pokušaj ponovo.',
    }
  }

  return {
    uspeh: true,
    poruka: `${proizvod.naziv} je uspešno rezervisan i dodat u tvoju korpu rezervacija.`,
  }
}

export function promeniStatusRezervacije(
  id: string,
  noviStatus: StatusRezervacije,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return { uspeh: false, poruka: 'Prijavi se da bi nastavila.' }
  }

  const stavka = rezervacije.find(
    item => item.id === id && item.korisnikId === korisnik.id,
  )

  if (!stavka) {
    return { uspeh: false, poruka: 'Rezervacija nije pronađena.' }
  }

  // Otkazivanje je dozvoljeno samo dok je rezervacija aktivna.
  if (noviStatus === 'otkazano' && stavka.status !== 'rezervisano') {
    return {
      uspeh: false,
      poruka: 'Možeš otkazati samo aktivnu rezervaciju.',
    }
  }

  // U prototipu se dolazak proizvoda simulira promenom statusa.
  if (noviStatus === 'pristiglo' && stavka.status !== 'rezervisano') {
    return {
      uspeh: false,
      poruka: 'Samo aktivna rezervacija može biti označena kao pristigla.',
    }
  }

  const prethodniStatus = stavka.status
  stavka.status = noviStatus

  if (!sacuvajRezervacije()) {
    stavka.status = prethodniStatus
    return {
      uspeh: false,
      poruka: 'Promena nije sačuvana. Pokušaj ponovo.',
    }
  }

  return { uspeh: true, poruka: 'Status rezervacije je promenjen.' }
}

export function promeniKolicinuRezervacije(
  id: string,
  kolicina: number,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return { uspeh: false, poruka: 'Prijavi se da bi nastavila.' }
  }

  const stavka = rezervacije.find(
    item => item.id === id && item.korisnikId === korisnik.id,
  )

  if (!stavka) {
    return { uspeh: false, poruka: 'Rezervacija nije pronađena.' }
  }

  if (stavka.status !== 'rezervisano') {
    return {
      uspeh: false,
      poruka: 'Možeš menjati količinu samo dok je rezervacija aktivna.',
    }
  }

  if (!Number.isInteger(kolicina) || kolicina < 1) {
    return {
      uspeh: false,
      poruka: 'Količina mora biti najmanje 1.',
    }
  }

  const prethodnaKolicina = stavka.kolicina
  stavka.kolicina = kolicina

  if (!sacuvajRezervacije()) {
    stavka.kolicina = prethodnaKolicina
    return {
      uspeh: false,
      poruka: 'Izmena nije sačuvana. Pokušaj ponovo.',
    }
  }

  return { uspeh: true, poruka: 'Količina je izmenjena.' }
}

export function obrisiRezervaciju(
  id: string,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return { uspeh: false, poruka: 'Prijavi se da bi nastavila.' }
  }

  const indeks = rezervacije.findIndex(
    item => item.id === id && item.korisnikId === korisnik.id,
  )

  if (indeks === -1) {
    return { uspeh: false, poruka: 'Rezervacija nije pronađena.' }
  }

  const stavka = rezervacije[indeks]

  if (!stavka || stavka.status !== 'pristiglo') {
    return {
      uspeh: false,
      poruka: 'Možeš ukloniti samo rezervaciju sa statusom „pristiglo“.',
    }
  }

  rezervacije.splice(indeks, 1)

  if (!sacuvajRezervacije()) {
    rezervacije.splice(indeks, 0, stavka)
    return {
      uspeh: false,
      poruka: 'Rezervacija nije obrisana. Pokušaj ponovo.',
    }
  }

  return { uspeh: true, poruka: 'Rezervacija je uklonjena.' }
}

export function mozeDaOceniBiljku(
  proizvodId: string,
): boolean {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) return false

  return rezervacije.some(
    stavka =>
      stavka.korisnikId === korisnik.id &&
      stavka.proizvodId === proizvodId &&
      stavka.tip === 'biljka' &&
      stavka.status === 'pristiglo',
  )
}

export function oceniRezervaciju(
  id: string,
  ocena: number,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return { uspeh: false, poruka: 'Prijavi se da bi ocenila biljku.' }
  }

  if (!Number.isInteger(ocena) || ocena < 1 || ocena > 5) {
    return { uspeh: false, poruka: 'Ocena mora biti od 1 do 5.' }
  }

  const stavka = rezervacije.find(
    item => item.id === id && item.korisnikId === korisnik.id,
  )

  if (!stavka || stavka.tip !== 'biljka' || stavka.status !== 'pristiglo') {
    return {
      uspeh: false,
      poruka: 'Možeš oceniti samo pristiglu, prethodno rezervisanu biljku.',
    }
  }

  const prethodnaOcena = stavka.ocena
  stavka.ocena = ocena

  if (!sacuvajRezervacije()) {
    stavka.ocena = prethodnaOcena
    return {
      uspeh: false,
      poruka: 'Ocena nije sačuvana. Pokušaj ponovo.',
    }
  }

  return { uspeh: true, poruka: 'Hvala ti na oceni!' }
}

export function ukupnaCenaRezervacija(): number {
  return mojeRezervacije()
    .filter(stavka => stavka.status !== 'otkazano')
    .reduce(
      (ukupno, stavka) => ukupno + stavka.cena * stavka.kolicina,
      0,
    )
}
