
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { biljke } from '../podaci/biljke'
import { prijavljeniKorisnik } from '../podaci/autentifikacija'
import {
  napraviRezervaciju,
  mozeDaOceniBiljku,
} from '../podaci/rezervacije'

interface SacuvanaRecenzija {
  id: string
  biljkaId: number
  ime: string
  prezime: string
  ocena: number
  komentar: string
  datum: string
}

interface PrikazanaRecenzija {
  id: string
  ime: string
  prezime: string
  ocena: number
  komentar: string
  datum?: string
  pocetna: boolean
}

const props = defineProps<{ id: string }>()
const router = useRouter()

const dodato = ref(false)
const porukaRezervacije = ref('')
const greskaRezervacije = ref(false)
const izabranaOcena = ref(5)
const komentar = ref('')
const greskaRecenzije = ref('')
const uspesnoPoslato = ref(false)

const kljucRecenzija = 'biljna-bajka-recenzije'

function ucitajRecenzije(): SacuvanaRecenzija[] {
  try {
    const podaci = localStorage.getItem(kljucRecenzija)

    if (!podaci) return []

    const rezultat: unknown = JSON.parse(podaci)

    if (!Array.isArray(rezultat)) return []

    return rezultat.filter(
      (item): item is SacuvanaRecenzija =>
        item !== null &&
        typeof item === 'object' &&
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

const sveRecenzije = ref<SacuvanaRecenzija[]>(ucitajRecenzije())

const biljka = computed(() =>
  biljke.find(item => item.id === Number(props.id)),
)

const korisnikJePrijavljen = computed(
  () => !!prijavljeniKorisnik.value,
)

const mozeDaOcenjuje = computed(() => {
  if (!biljka.value || !prijavljeniKorisnik.value) {
    return false
  }

  return mozeDaOceniBiljku(String(biljka.value.id))
})

const recenzijeZaBiljku = computed<PrikazanaRecenzija[]>(() => {
  if (!biljka.value) return []

  const pocetne: PrikazanaRecenzija[] = (
    biljka.value.recenzije ?? []
  ).map((tekst, index) => ({
    id: `pocetna-${biljka.value!.id}-${index}`,
    ime: 'Kupac Biljne Bajke',
    prezime: '',
    ocena: 5,
    komentar: tekst,
    pocetna: true,
  }))

  const korisnicke: PrikazanaRecenzija[] = sveRecenzije.value
    .filter(item => item.biljkaId === biljka.value!.id)
    .map(item => ({
      id: item.id,
      ime: item.ime,
      prezime: item.prezime,
      ocena: item.ocena,
      komentar: item.komentar,
      datum: item.datum,
      pocetna: false,
    }))
    .reverse()

  return [...korisnicke, ...pocetne]
})

const brojUkupnihOcena = computed(() => {
  if (!biljka.value) return 0

  return biljka.value.brojOcena +
    sveRecenzije.value.filter(
      item => item.biljkaId === biljka.value!.id,
    ).length
})

const prosecnaOcena = computed(() => {
  if (!biljka.value || brojUkupnihOcena.value === 0) {
    return 0
  }

  const noveRecenzije = sveRecenzije.value.filter(
    item => item.biljkaId === biljka.value!.id,
  )

  const zbirPostojecihOcena =
    biljka.value.ocena * biljka.value.brojOcena

  const zbirNovihOcena = noveRecenzije.reduce(
    (zbir, item) => zbir + item.ocena,
    0,
  )

  return (
    (zbirPostojecihOcena + zbirNovihOcena) /
    brojUkupnihOcena.value
  )
})

watch(
  () => props.id,
  () => {
    window.scrollTo({
      top: 0,
      behavior: 'auto',
    })

    dodato.value = false
    porukaRezervacije.value = ''
    greskaRezervacije.value = false
    izabranaOcena.value = 5
    komentar.value = ''
    greskaRecenzije.value = ''
    uspesnoPoslato.value = false
  },
  { immediate: true },
)

function formatirajCenu(cena: number) {
  return new Intl.NumberFormat('sr-RS').format(cena) + ' RSD'
}

function dodajBiljku() {
  if (!biljka.value) return

  if (!prijavljeniKorisnik.value) {
    router.push({
      path: '/prijava',
      query: {
        redirect: router.currentRoute.value.fullPath,
      },
    })
    return
  }

  const rezultat = napraviRezervaciju({
    id: String(biljka.value.id),
    naziv: biljka.value.naziv,
    cena: biljka.value.cena,
    slika: biljka.value.slika,
    tip: 'biljka',
  })

  porukaRezervacije.value = rezultat.poruka
  greskaRezervacije.value = !rezultat.uspeh
  dodato.value = rezultat.uspeh
}

function otvoriKorpu() {
  router.push('/korpa')
}

function postaviOcenu(ocena: number) {
  izabranaOcena.value = ocena
  greskaRecenzije.value = ''
}

function posaljiRecenziju() {
  greskaRecenzije.value = ''
  uspesnoPoslato.value = false

  const korisnik = prijavljeniKorisnik.value

  if (!korisnik) {
    greskaRecenzije.value =
      'Prijavi se na svoj nalog da bi ostavila recenziju.'
    return
  }

  if (!biljka.value) {
    greskaRecenzije.value = 'Biljka nije pronađena.'
    return
  }

  if (!mozeDaOcenjuje.value) {
    greskaRecenzije.value =
      'Ocenu možeš ostaviti tek kada tvoja rezervacija ove biljke bude označena kao pristigla.'
    return
  }

  const cistKomentar = komentar.value.trim()

  if (cistKomentar.length < 3) {
    greskaRecenzije.value =
      'Komentar treba da sadrži najmanje 3 karaktera.'
    return
  }

  if (cistKomentar.length > 1000) {
    greskaRecenzije.value =
      'Komentar može imati najviše 1000 karaktera.'
    return
  }

  const novaRecenzija: SacuvanaRecenzija = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    biljkaId: biljka.value.id,
    ime: korisnik.ime,
    prezime: korisnik.prezime,
    ocena: izabranaOcena.value,
    komentar: cistKomentar,
    datum: new Date().toLocaleDateString('sr-RS'),
  }

  const azuriraneRecenzije = [
    ...sveRecenzije.value,
    novaRecenzija,
  ]

  try {
    localStorage.setItem(
      kljucRecenzija,
      JSON.stringify(azuriraneRecenzije),
    )

    sveRecenzije.value = azuriraneRecenzije
    komentar.value = ''
    izabranaOcena.value = 5
    uspesnoPoslato.value = true
  } catch {
    greskaRecenzije.value =
      'Recenzija nije sačuvana. Proveri podešavanja pregledača i pokušaj ponovo.'
  }
}
</script>

<template>
  <main v-if="biljka" class="stranica-detalja">
    <div class="putanja">
      <RouterLink to="/">Početna</RouterLink>
      <span>/</span>
      <RouterLink to="/katalog">Biljke</RouterLink>
      <span>/</span>
      <span>{{ biljka.naziv }}</span>
    </div>

    <section class="detalji">
      <div class="slika-okvir">
        <img :src="biljka.slika" :alt="biljka.naziv" />
        <span class="oznaka">Poseban izbor</span>

        <div class="slika-potpis">
          <span>✳</span>
          Pažljivo odabrano za tvoj zeleni kutak
        </div>
      </div>

      <div class="informacije">
        <p class="nadnaslov">BILJNA BAJKA · BOTANIČKI BUTIK</p>
        <p class="latinski">{{ biljka.latinskiNaziv }}</p>
        <h1>{{ biljka.naziv }}</h1>

        <div class="ocena">
          <span class="zvezdica">★</span>
          <strong>{{ prosecnaOcena.toFixed(1) }}</strong>
          <span>{{ brojUkupnihOcena }} ocena</span>
        </div>

        <p class="cena">{{ formatirajCenu(biljka.cena) }}</p>
        <p class="opis">{{ biljka.opis }}</p>

        <div class="osobine">
          <div>
            <span>Vrsta biljke</span>
            <strong>{{ biljka.tip }}</strong>
          </div>
          <div>
            <span>Osvetljenje</span>
            <strong>{{ biljka.svetlost }}</strong>
          </div>
          <div>
            <span>Zalivanje</span>
            <strong>{{ biljka.zalivanje }}</strong>
          </div>
        </div>

        <div class="akcije">
          <button class="glavno-dugme" @click="dodajBiljku">
            Dodaj u korpu
            <span>＋</span>
          </button>

          <button
            v-if="dodato"
            class="dugme-korpa"
            @click="otvoriKorpu"
          >
            Pogledaj korpu <span>→</span>
          </button>
        </div>

        <div
          v-if="porukaRezervacije"
          class="poruka"
          :class="{ 'poruka-greska': greskaRezervacije }"
          role="status"
        >
          <span class="poruka-ikona">
            {{ greskaRezervacije ? '!' : '✓' }}
          </span>
          <div>
            <strong>{{ porukaRezervacije }}</strong>
            <p v-if="!greskaRezervacije">
              Rezervaciju možeš da pogledaš u svojoj korpi rezervacija.
            </p>
          </div>
        </div>

        <p class="napomena">
          Svaka biljka zaslužuje svoje posebno mesto.
        </p>
      </div>
    </section>

    <section class="nega">
      <div class="naslov-nege">
        <p class="nadnaslov">MALI VODIČ ZA USPEŠAN RAST</p>
        <h2>Upoznaj svoju <em>biljku</em></h2>
        <p>
          Uz nekoliko jednostavnih navika, tvoja biljka može da napreduje.
        </p>
      </div>

      <div class="nega-mreza">
        <article>
          <span class="simbol">☼</span>
          <p class="kartica-nadnaslov">01 · SVETLOST</p>
          <h3>Pravo mesto</h3>
          <p>{{ biljka.svetlost }}</p>
        </article>

        <article>
          <span class="simbol">◌</span>
          <p class="kartica-nadnaslov">02 · ZALIVANJE</p>
          <h3>Prava mera</h3>
          <p>{{ biljka.zalivanje }}</p>
        </article>

        <article>
          <span class="simbol">✿</span>
          <p class="kartica-nadnaslov">03 · DODATNI SAVETI</p>
          <h3>Mala pažnja</h3>
          <p>{{ biljka.nega }}</p>
        </article>
      </div>
    </section>

    <section class="recenzije">
      <div class="naslov-recenzija">
        <p class="nadnaslov">REČI LJUBITELJA BILJAKA</p>
        <h2>Utisci naših <em>kupaca</em></h2>
        <p>
          Svaka biljka ima svoju priču. Pročitaj iskustva onih
          koji su izabrali {{ biljka.naziv }}.
        </p>

        <div class="ukupna-ocena">
          <span class="velika-zvezda">★</span>
          <strong>{{ prosecnaOcena.toFixed(1) }}</strong>
          <span>od 5 · {{ brojUkupnihOcena }} ocena</span>
        </div>
      </div>

      <div class="forma-recenzije">
        <h3>Ostavi svoj utisak</h3>
        <p class="opis-forme">
          Podeli svoje iskustvo sa ovom biljkom sa drugim ljubiteljima zelenila.
        </p>

        <div v-if="korisnikJePrijavljen && mozeDaOcenjuje">
          <p class="prijavljeni-kupac">
            Pišeš kao
            <strong>
              {{ prijavljeniKorisnik!.ime }} {{ prijavljeniKorisnik!.prezime }}
            </strong>
          </p>

          <form @submit.prevent="posaljiRecenziju">
            <label class="oznaka-polja">Tvoja ocena</label>

            <div class="izbor-zvezdica" aria-label="Izaberi ocenu">
              <button
                v-for="zvezdica in 5"
                :key="zvezdica"
                type="button"
                :class="{ aktivna: zvezdica <= izabranaOcena }"
                :aria-label="`Ocena ${zvezdica} od 5`"
                :aria-pressed="zvezdica === izabranaOcena"
                @click="postaviOcenu(zvezdica)"
              >
                ★
              </button>
              <span>{{ izabranaOcena }} / 5</span>
            </div>

            <label for="komentar-recenzije" class="oznaka-polja">
              Tvoj komentar
            </label>
            <textarea
              id="komentar-recenzije"
              v-model="komentar"
              rows="4"
              maxlength="1000"
              placeholder="Kako ti se dopada biljka? Podeli svoje iskustvo..."
              required
            />

            <div class="broj-karaktera">
              {{ komentar.length }} / 1000 karaktera
            </div>

            <p v-if="greskaRecenzije" class="greska-recenzije" role="alert">
              {{ greskaRecenzije }}
            </p>

            <p v-if="uspesnoPoslato" class="uspeh-recenzije" role="status">
              ✓ Tvoja recenzija je uspešno sačuvana!
            </p>

            <button class="dugme-posalji" type="submit">
              Objavi recenziju <span>→</span>
            </button>
          </form>
        </div>

        <div
          v-else-if="korisnikJePrijavljen"
          class="prijava-za-recenziju"
        >
          <p>
            Recenziju možeš da ostaviš kada tvoja rezervacija ove biljke bude
            označena kao pristigla.
          </p>
          <p>
            Status svoje rezervacije možeš da proveriš u korpi rezervacija.
          </p>
        </div>

        <div v-else class="prijava-za-recenziju">
          <p>
            Da bi ostavila ocenu i komentar, prvo se prijavi na svoj nalog.
          </p>
          <RouterLink to="/prijava" class="dugme-prijava">
            Prijavi se <span>→</span>
          </RouterLink>
        </div>
      </div>

      <div v-if="recenzijeZaBiljku.length" class="recenzije-mreza">
        <article
          v-for="recenzija in recenzijeZaBiljku"
          :key="recenzija.id"
          class="recenzija-kartica"
        >
          <div class="recenzija-vrh">
            <div class="avatar-kupca">
              {{ recenzija.ime.charAt(0).toLocaleUpperCase('sr') }}
            </div>

            <div class="podaci-kupca">
              <strong>
                {{ recenzija.ime }}
                {{ recenzija.prezime }}
              </strong>
              <span>
                {{ recenzija.datum || 'Utisak o biljci' }}
              </span>
            </div>

            <span
              v-if="!recenzija.pocetna"
              class="potvrda-kupca"
              title="Recenzija sa korisničkog naloga"
            >
              ✓
            </span>
          </div>

          <div
            class="recenzija-zvezdice"
            :aria-label="`Ocena: ${recenzija.ocena} od 5`"
          >
            <span v-for="zvezdica in 5" :key="zvezdica">
              {{ zvezdica <= recenzija.ocena ? '★' : '☆' }}
            </span>
          </div>

          <p class="tekst-recenzije">„{{ recenzija.komentar }}”</p>
        </article>
      </div>

      <p v-else class="nema-recenzija">
        Još nema recenzija za ovu biljku. Budi prva koja će podeliti utisak!
      </p>
    </section>

    <section class="donji-deo">
      <div>
        <p class="nadnaslov">NASTAVI DA ISTRAŽUJEŠ</p>
        <h2>Još malo zelenila?</h2>
        <p>
          Otkrij biljku koja će se savršeno uklopiti u tvoj prostor.
        </p>
      </div>

      <RouterLink to="/katalog" class="dugme-kolekcija">
        Nazad na kolekciju <span>↗</span>
      </RouterLink>
    </section>
  </main>

  <main v-else class="nije-pronadjena">
    <span>✿</span>
    <h1>Ova biljka nije pronađena.</h1>
    <p>Možda je došlo do greške ili biljka više nije u kolekciji.</p>
    <RouterLink to="/katalog">Vrati se na biljke →</RouterLink>
  </main>
</template>

<style scoped src="../css/DetaljiBiljke.css"></style>
