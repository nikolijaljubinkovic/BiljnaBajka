
import { reactive } from 'vue'

export interface StavkaKorpe {
  id: string
  naziv: string
  cena: number
  slika: string
  tip: 'biljka' | 'buket'
  kolicina: number
}

function ucitajKorpu(): StavkaKorpe[] {
  try {
    const sacuvano = localStorage.getItem('biljna-bajka-korpa')
    if (!sacuvano) return []

    const podaci: unknown = JSON.parse(sacuvano)
    if (!Array.isArray(podaci)) return []

    return podaci.filter(
      (stavka): stavka is StavkaKorpe =>
        typeof stavka?.id === 'string' &&
        typeof stavka?.naziv === 'string' &&
        typeof stavka?.cena === 'number' &&
        typeof stavka?.slika === 'string' &&
        (stavka?.tip === 'biljka' || stavka?.tip === 'buket') &&
        typeof stavka?.kolicina === 'number',
    )
  } catch {
    return []
  }
}

export const stavkeKorpe = reactive<StavkaKorpe[]>(ucitajKorpu())

function sacuvajKorpu() {
  try {
    localStorage.setItem('biljna-bajka-korpa', JSON.stringify(stavkeKorpe))
  } catch {
    // Korpa ostaje dostupna dok je aplikacija otvorena.
  }
}

export function dodajUKorpu(stavka: Omit<StavkaKorpe, 'kolicina'>) {
  const postojeca = stavkeKorpe.find(
    item => item.id === stavka.id && item.tip === stavka.tip,
  )

  if (postojeca) {
    postojeca.kolicina++
  } else {
    stavkeKorpe.push({ ...stavka, kolicina: 1 })
  }

  sacuvajKorpu()
}

export function ukloniIzKorpe(id: string, tip: StavkaKorpe['tip']) {
  const indeks = stavkeKorpe.findIndex(
    item => item.id === id && item.tip === tip,
  )

  if (indeks !== -1) {
    stavkeKorpe.splice(indeks, 1)
    sacuvajKorpu()
  }
}

export function promeniKolicinu(
  id: string,
  tip: StavkaKorpe['tip'],
  kolicina: number,
) {
  const stavka = stavkeKorpe.find(
    item => item.id === id && item.tip === tip,
  )

  if (!stavka) return

  if (kolicina <= 0) {
    ukloniIzKorpe(id, tip)
    return
  }

  stavka.kolicina = kolicina
  sacuvajKorpu()
}

export function isprazniKorpu() {
  stavkeKorpe.splice(0, stavkeKorpe.length)
  sacuvajKorpu()
}

export function ukupnaCena() {
  return stavkeKorpe.reduce(
    (ukupno, stavka) => ukupno + stavka.cena * stavka.kolicina,
    0,
  )
}

export function brojStavkiUKorpi() {
  return stavkeKorpe.reduce(
    (ukupno, stavka) => ukupno + stavka.kolicina,
    0,
  )
}
