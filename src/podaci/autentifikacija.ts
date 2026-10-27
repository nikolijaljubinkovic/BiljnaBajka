import { ref } from 'vue'

export interface Korisnik {
  id: string
  ime: string
  prezime: string
  email: string
  telefon?: string
  adresa?: string
  grad?: string
  drzava?: string
}

interface Nalog extends Korisnik {
  lozinka: string
}

const KLJUC_NALOGA = 'biljna-bajka-nalozi'
const KLJUC_PRIJAVLJENOG = 'biljna-bajka-prijavljeni-korisnik'

function ucitajNaloge(): Nalog[] {
  try {
    const sacuvaniPodaci = localStorage.getItem(KLJUC_NALOGA)

    if (!sacuvaniPodaci) return []

    const podaci: unknown = JSON.parse(sacuvaniPodaci)

    if (!Array.isArray(podaci)) return []

    return podaci.filter(
      (nalog): nalog is Nalog =>
        typeof nalog?.id === 'string' &&
        typeof nalog?.ime === 'string' &&
        typeof nalog?.prezime === 'string' &&
        typeof nalog?.email === 'string' &&
        typeof nalog?.lozinka === 'string',
    )
  } catch {
    return []
  }
}

function ucitajPrijavljenogKorisnika(): Korisnik | null {
  try {
    const sacuvaniPodaci = localStorage.getItem(KLJUC_PRIJAVLJENOG)

    if (!sacuvaniPodaci) return null

    const korisnik: unknown = JSON.parse(sacuvaniPodaci)

    if (
      typeof korisnik !== 'object' ||
      korisnik === null ||
      !('id' in korisnik) ||
      !('ime' in korisnik) ||
      !('prezime' in korisnik) ||
      !('email' in korisnik) ||
      typeof korisnik.id !== 'string' ||
      typeof korisnik.ime !== 'string' ||
      typeof korisnik.prezime !== 'string' ||
      typeof korisnik.email !== 'string'
    ) {
      return null
    }

    return {
      id: korisnik.id,
      ime: korisnik.ime,
      prezime: korisnik.prezime,
      email: korisnik.email,
      telefon:
        'telefon' in korisnik && typeof korisnik.telefon === 'string'
          ? korisnik.telefon
          : '',
      adresa:
        'adresa' in korisnik && typeof korisnik.adresa === 'string'
          ? korisnik.adresa
          : '',
      grad:
        'grad' in korisnik && typeof korisnik.grad === 'string'
          ? korisnik.grad
          : '',
      drzava:
        'drzava' in korisnik && typeof korisnik.drzava === 'string'
          ? korisnik.drzava
          : '',
    }
  } catch {
    return null
  }
}

export const prijavljeniKorisnik = ref<Korisnik | null>(
  ucitajPrijavljenogKorisnika(),
)

export function registrujKorisnika(
  ime: string,
  prezime: string,
  email: string,
  lozinka: string,
  telefon = '',
  adresa = '',
  grad = '',
  drzava = '',
): { uspeh: boolean; poruka: string } {
  const cistoIme = ime.trim()
  const cistoPrezime = prezime.trim()
  const cistEmail = email.trim().toLowerCase()

  if (!cistoIme || !cistoPrezime || !cistEmail || !lozinka) {
    return {
      uspeh: false,
      poruka: 'Popuni sva obavezna polja.',
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cistEmail)) {
    return {
      uspeh: false,
      poruka: 'Unesi ispravnu imejl adresu.',
    }
  }

  if (lozinka.length < 8) {
    return {
      uspeh: false,
      poruka: 'Lozinka mora imati najmanje 8 karaktera.',
    }
  }

  const nalozi = ucitajNaloge()

  if (nalozi.some(nalog => nalog.email === cistEmail)) {
    return {
      uspeh: false,
      poruka: 'Nalog sa ovom imejl adresom već postoji.',
    }
  }

  const noviNalog: Nalog = {
    id: crypto.randomUUID(),
    ime: cistoIme,
    prezime: cistoPrezime,
    email: cistEmail,
    lozinka,
    telefon: telefon.trim(),
    adresa: adresa.trim(),
    grad: grad.trim(),
    drzava: drzava.trim(),
  }

  try {
    nalozi.push(noviNalog)

    localStorage.setItem(KLJUC_NALOGA, JSON.stringify(nalozi))

    return {
      uspeh: true,
      poruka: 'Nalog je uspešno napravljen!',
    }
  } catch {
    return {
      uspeh: false,
      poruka: 'Nalog nije sačuvan. Pokušaj ponovo.',
    }
  }
}

export function prijaviKorisnika(
  email: string,
  lozinka: string,
): { uspeh: boolean; poruka: string } {
  const cistEmail = email.trim().toLowerCase()

  if (!cistEmail || !lozinka) {
    return {
      uspeh: false,
      poruka: 'Unesi imejl adresu i lozinku.',
    }
  }

  const nalog = ucitajNaloge().find(
    stavka =>
      stavka.email === cistEmail &&
      stavka.lozinka === lozinka,
  )

  if (!nalog) {
    return {
      uspeh: false,
      poruka: 'Imejl adresa ili lozinka nisu ispravni.',
    }
  }

  const korisnik: Korisnik = {
    id: nalog.id,
    ime: nalog.ime,
    prezime: nalog.prezime,
    email: nalog.email,
    telefon: nalog.telefon ?? '',
    adresa: nalog.adresa ?? '',
    grad: nalog.grad ?? '',
    drzava: nalog.drzava ?? '',
  }

  try {
    localStorage.setItem(
      KLJUC_PRIJAVLJENOG,
      JSON.stringify(korisnik),
    )

    prijavljeniKorisnik.value = korisnik

    return {
      uspeh: true,
      poruka: 'Uspešno si se prijavila!',
    }
  } catch {
    return {
      uspeh: false,
      poruka: 'Prijava nije sačuvana. Pokušaj ponovo.',
    }
  }
}

export function izmeniKontaktKorisnika(
  telefon: string,
  adresa: string,
  grad = '',
  drzava = '',
): { uspeh: boolean; poruka: string } {
  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    return {
      uspeh: false,
      poruka: 'Moraš biti prijavljena da bi izmenila podatke.',
    }
  }

  if (!telefon.trim() || !adresa.trim()) {
    return {
      uspeh: false,
      poruka: 'Unesi broj telefona i adresu.',
    }
  }

  try {
    const nalozi = ucitajNaloge()
    const indeks = nalozi.findIndex(
      nalog => nalog.id === korisnik.id,
    )

    if (indeks === -1) {
      return {
        uspeh: false,
        poruka: 'Nalog nije pronađen. Prijavi se ponovo.',
      }
    }

    const postojeciNalog = nalozi[indeks]

    if (!postojeciNalog) {
      return {
        uspeh: false,
        poruka: 'Nalog nije pronađen. Prijavi se ponovo.',
      }
    }

    nalozi[indeks] = {
      ...postojeciNalog,
      telefon: telefon.trim(),
      adresa: adresa.trim(),
      grad: grad.trim(),
      drzava: drzava.trim(),
    }

    const izmenjeniKorisnik: Korisnik = {
      ...korisnik,
      telefon: telefon.trim(),
      adresa: adresa.trim(),
      grad: grad.trim(),
      drzava: drzava.trim(),
    }

    localStorage.setItem(KLJUC_NALOGA, JSON.stringify(nalozi))
    localStorage.setItem(
      KLJUC_PRIJAVLJENOG,
      JSON.stringify(izmenjeniKorisnik),
    )

    prijavljeniKorisnik.value = izmenjeniKorisnik

    return {
      uspeh: true,
      poruka: 'Podaci su uspešno izmenjeni!',
    }
  } catch {
    return {
      uspeh: false,
      poruka: 'Izmene nisu sačuvane. Pokušaj ponovo.',
    }
  }
}

export function odjaviKorisnika(): void {
  localStorage.removeItem(KLJUC_PRIJAVLJENOG)
  prijavljeniKorisnik.value = null
}

export function daLiJePrijavljen(): boolean {
  return prijavljeniKorisnik.value !== null
}