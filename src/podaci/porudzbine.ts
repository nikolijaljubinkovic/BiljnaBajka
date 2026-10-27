
import { reactive } from 'vue'
import { prijavljeniKorisnik } from './autentifikacija'
import {
  mojeRezervacije,
  promeniStatusRezervacije,
  oceniRezervaciju,
  type TipProizvoda,
} from './rezervacije'
import {
  stavkeKorpe,
  isprazniKorpu,
} from './korpa'

export type StatusPorudzbine =
  | 'potvrdjena'
  | 'u_pripremi'
  | 'pristiglo'
  | 'otkazano'

export interface StavkaPorudzbine {
  id: string
  rezervacijaId?: string
  proizvodId: string
  naziv: string
  cena: number
  slika: string
  tip: TipProizvoda
  kolicina: number
  ocena?: number
}

export interface Porudzbina {
  id: string
  broj: string
  korisnikId: string
  datum: string
  stavke: StavkaPorudzbine[]
  ukupno: number
  status: StatusPorudzbine
}

const KLJUC = 'biljna-bajka-porudzbine'

function ucitaj(): Porudzbina[] {
  try {
    const sacuvano = localStorage.getItem(KLJUC)

    if (!sacuvano) return []

    const podaci: unknown = JSON.parse(sacuvano)

    return Array.isArray(podaci) ? podaci : []
  } catch {
    return []
  }
}

export const porudzbine = reactive<Porudzbina[]>(ucitaj())

function sacuvaj(): boolean {
  try {
    localStorage.setItem(KLJUC, JSON.stringify(porudzbine))
    return true
  } catch {
    return false
  }
}

export function mojePorudzbine(): Porudzbina[] {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) return []

  return porudzbine
    .filter(p => p.korisnikId === korisnik.id)
    .slice()
    .sort((a, b) => b.datum.localeCompare(a.datum))
}

export function kreirajPorudzbinu(): {
  uspeh: boolean
  poruka: string
} {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Prijavi se pre kupovine.',
    }
  }

  const rezervisaneBiljke = mojeRezervacije().filter(
    r => r.tip === 'biljka' && r.status === 'rezervisano',
  )

  const artikliKorpe = stavkeKorpe.filter(
    s => s.kolicina > 0,
  )

  const stavke: StavkaPorudzbine[] = [
    ...rezervisaneBiljke.map(r => ({
      id: crypto.randomUUID(),
      rezervacijaId: r.id,
      proizvodId: r.proizvodId,
      naziv: r.naziv,
      cena: r.cena,
      slika: r.slika,
      tip: r.tip,
      kolicina: r.kolicina,
      ocena: r.ocena,
    })),

    ...artikliKorpe.map(s => ({
      id: crypto.randomUUID(),
      proizvodId: s.id,
      naziv: s.naziv,
      cena: s.cena,
      slika: s.slika,
      tip: s.tip,
      kolicina: s.kolicina,
    })),
  ]

  if (!stavke.length) {
    return {
      uspeh: false,
      poruka: 'Nema artikala za kupovinu.',
    }
  }

  const porudzbina: Porudzbina = {
    id: crypto.randomUUID(),
    broj: `BB-${Date.now().toString().slice(-8)}`,
    korisnikId: korisnik.id,
    datum: new Date().toISOString(),
    stavke,
    ukupno: stavke.reduce(
      (suma, s) => suma + s.cena * s.kolicina,
      0,
    ),
    status: 'potvrdjena',
  }

  porudzbine.unshift(porudzbina)

  if (!sacuvaj()) {
    porudzbine.shift()

    return {
      uspeh: false,
      poruka: 'Porudžbina nije sačuvana. Pokušaj ponovo.',
    }
  }

  isprazniKorpu()

  return {
    uspeh: true,
    poruka: `Porudžbina ${porudzbina.broj} je potvrđena.`,
  }
}

export function promeniStatusPorudzbine(
  id: string,
  status: StatusPorudzbine,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Prijavi se da nastaviš.',
    }
  }

  const p = porudzbine.find(
    stavka =>
      stavka.id === id &&
      stavka.korisnikId === korisnik.id,
  )

  if (!p) {
    return {
      uspeh: false,
      poruka: 'Porudžbina nije pronađena.',
    }
  }

  if (
    p.status !== 'potvrdjena' &&
    p.status !== 'u_pripremi'
  ) {
    return {
      uspeh: false,
      poruka: 'Ova porudžbina više ne može da se menja.',
    }
  }

  const promenjene: string[] = []

  if (status === 'otkazano') {
    for (const s of p.stavke) {
      if (!s.rezervacijaId) continue

      const rezultat = promeniStatusRezervacije(
        s.rezervacijaId,
        'otkazano',
      )

      if (!rezultat.uspeh) {
        for (const rezervacijaId of promenjene) {
          promeniStatusRezervacije(
            rezervacijaId,
            'rezervisano',
          )
        }

        return rezultat
      }

      promenjene.push(s.rezervacijaId)
    }
  }

  const prethodniStatus = p.status
  p.status = status

  if (!sacuvaj()) {
    p.status = prethodniStatus

    if (status === 'otkazano') {
      for (const rezervacijaId of promenjene) {
        promeniStatusRezervacije(
          rezervacijaId,
          'rezervisano',
        )
      }
    }

    return {
      uspeh: false,
      poruka: 'Promena nije sačuvana.',
    }
  }

  return {
    uspeh: true,
    poruka: 'Status porudžbine je ažuriran.',
  }
}

export function oznaciPorudzbinuKaoPristiglu(
  id: string,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Prijavi se da nastaviš.',
    }
  }

  const p = porudzbine.find(
    stavka =>
      stavka.id === id &&
      stavka.korisnikId === korisnik.id,
  )

  if (
    !p ||
    !['potvrdjena', 'u_pripremi'].includes(p.status)
  ) {
    return {
      uspeh: false,
      poruka: 'Porudžbina nije dostupna za promenu statusa.',
    }
  }

  const promenjene: string[] = []

  for (const s of p.stavke) {
    if (!s.rezervacijaId) continue

    const rezultat = promeniStatusRezervacije(
      s.rezervacijaId,
      'pristiglo',
    )

    if (!rezultat.uspeh) {
      for (const rezervacijaId of promenjene) {
        promeniStatusRezervacije(
          rezervacijaId,
          'rezervisano',
        )
      }

      return rezultat
    }

    promenjene.push(s.rezervacijaId)
  }

  const prethodniStatus = p.status
  p.status = 'pristiglo'

  if (!sacuvaj()) {
    p.status = prethodniStatus

    for (const rezervacijaId of promenjene) {
      promeniStatusRezervacije(
        rezervacijaId,
        'rezervisano',
      )
    }

    return {
      uspeh: false,
      poruka: 'Promena nije sačuvana.',
    }
  }

  return {
    uspeh: true,
    poruka: 'Porudžbina je označena kao pristigla.',
  }
}

export function oceniStavkuPorudzbine(
  porudzbinaId: string,
  stavkaId: string,
  ocena: number,
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Prijavi se da oceniš biljku.',
    }
  }

  if (!Number.isInteger(ocena) || ocena < 1 || ocena > 5) {
    return {
      uspeh: false,
      poruka: 'Izaberi ocenu od 1 do 5.',
    }
  }

  const p = porudzbine.find(
    stavka =>
      stavka.id === porudzbinaId &&
      stavka.korisnikId === korisnik.id,
  )

  const s = p?.stavke.find(
    stavka => stavka.id === stavkaId,
  )

  if (
    !p ||
    p.status !== 'pristiglo' ||
    !s ||
    s.tip !== 'biljka'
  ) {
    return {
      uspeh: false,
      poruka: 'Možeš oceniti samo pristiglu biljku.',
    }
  }

  const prethodnaOcena = s.ocena
  s.ocena = ocena

  if (!sacuvaj()) {
    s.ocena = prethodnaOcena

    return {
      uspeh: false,
      poruka: 'Ocena nije sačuvana.',
    }
  }

  // Ako postoji povezana rezervacija, čuvamo ocenu i tamo.
  if (s.rezervacijaId) {
    const rezultat = oceniRezervaciju(
      s.rezervacijaId,
      ocena,
    )

    // Ocena u porudžbini je već sačuvana, pa ne blokiramo
    // korisnika ako stara rezervacija više ne postoji.
    if (!rezultat.uspeh) {
      console.warn(
        'Ocena je sačuvana u porudžbini, ali ne i u rezervaciji.',
      )
    }
  }

  return {
    uspeh: true,
    poruka: 'Hvala ti na oceni!',
  }
}
