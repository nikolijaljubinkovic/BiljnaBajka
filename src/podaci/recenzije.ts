export interface Recenzija {
  id: string
  biljkaId: number
  ime: string
  prezime: string
  ocena: number
  komentar: string
  datum: string
}

const KLJUC = 'biljna-bajka-recenzije'

export function ucitajRecenzije(): Recenzija[] {
  try {
    const sacuvano = localStorage.getItem(KLJUC)

    if (!sacuvano) return []

    const podaci: unknown = JSON.parse(sacuvano)

    if (!Array.isArray(podaci)) return []

    return podaci.filter((item): item is Recenzija =>
      typeof item.id === 'string' &&
      typeof item.biljkaId === 'number' &&
      typeof item.ime === 'string' &&
      typeof item.prezime === 'string' &&
      typeof item.ocena === 'number' &&
      item.ocena >= 1 &&
      item.ocena <= 5 &&
      typeof item.komentar === 'string' &&
      typeof item.datum === 'string',
    )
  } catch {
    return []
  }
}

export function sacuvajRecenziju(recenzija: Recenzija): void {
  const postojece = ucitajRecenzije()
  postojece.push(recenzija)

  localStorage.setItem(KLJUC, JSON.stringify(postojece))
}