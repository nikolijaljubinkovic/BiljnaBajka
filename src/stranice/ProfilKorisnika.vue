
<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import {
  prijavljeniKorisnik,
  odjaviKorisnika,
  izmeniKontaktKorisnika,
} from '../podaci/autentifikacija'

const router = useRouter()

const korisnik = computed(() => prijavljeniKorisnik.value)

const inicijali = computed(() => {
  if (!korisnik.value) return 'BB'

  const ime = korisnik.value.ime?.trim().charAt(0) ?? ''
  const prezime = korisnik.value.prezime?.trim().charAt(0) ?? ''

  return (ime + prezime).toUpperCase() || 'BB'
})

const telefonKorisnika = computed(
  () => korisnik.value?.telefon || '',
)

const adresaKorisnika = computed(
  () => korisnik.value?.adresa || '',
)

const drzave = [
  'Srbija',
  'Crna Gora',
  'Hrvatska',
  'Bosna i Hercegovina',
  'Makedonija',
]

const gradovi: Record<string, string[]> = {
  Srbija: [
    'Beograd', 'Novi Sad', 'Niš', 'Kragujevac', 'Subotica',
    'Pančevo', 'Zrenjanin', 'Čačak', 'Kraljevo', 'Novi Pazar',
    'Drugi grad',
  ],
  'Crna Gora': [
    'Podgorica', 'Nikšić', 'Budva', 'Bar', 'Herceg Novi',
    'Kotor', 'Tivat', 'Bijelo Polje', 'Cetinje', 'Drugi grad',
  ],
  Hrvatska: [
    'Zagreb', 'Split', 'Rijeka', 'Osijek', 'Zadar',
    'Pula', 'Dubrovnik', 'Varaždin', 'Slavonski Brod', 'Drugi grad',
  ],
  'Bosna i Hercegovina': [
    'Sarajevo', 'Banja Luka', 'Mostar', 'Tuzla', 'Zenica',
    'Bijeljina', 'Trebinje', 'Doboj', 'Drugi grad',
  ],
  Makedonija: [
    'Skoplje', 'Bitolj', 'Kumanovo', 'Prilep', 'Tetovo',
    'Ohrid', 'Veles', 'Štip', 'Drugi grad',
  ],
}

const pozivniBrojevi: Record<string, string> = {
  Srbija: '+381',
  'Crna Gora': '+382',
  Hrvatska: '+385',
  'Bosna i Hercegovina': '+387',
  Makedonija: '+389',
}

const uredjivanje = ref(false)
const telefon = ref('')
const drzava = ref('Srbija')
const grad = ref('')
const drugiGrad = ref('')
const koristiDrugiGrad = ref(false)
const ulica = ref('')
const brojKuce = ref('')
const poruka = ref('')
const greska = ref('')
const cuvanje = ref(false)

const dostupniGradovi = computed(
  () => gradovi[drzava.value] ?? [],
)

const pozivniBroj = computed(
  () => pozivniBrojevi[drzava.value] ?? '+381',
)

const konacniGrad = computed(() =>
  koristiDrugiGrad.value ? drugiGrad.value.trim() : grad.value,
)

function popuniFormu() {
  const korisnikTrenutno = korisnik.value

  telefon.value = korisnikTrenutno?.telefon || ''
  drzava.value = drzave.includes(korisnikTrenutno?.drzava || '')
    ? korisnikTrenutno!.drzava!
    : 'Srbija'

  ulica.value = ''
  brojKuce.value = ''

  const sacuvanaAdresa = korisnikTrenutno?.adresa || ''
  const sacuvaniGrad = korisnikTrenutno?.grad || ''

  if (sacuvanaAdresa) {
    // Ako je adresa sačuvana kao "ulica, grad, država",
    // pokušavamo da popunimo odgovarajuća polja.
    const delovi = sacuvanaAdresa.split(',').map(deo => deo.trim())

    if (delovi.length >= 3) {
      ulica.value = delovi.slice(0, -2).join(', ')
      const moguciGrad = delovi[delovi.length - 2]
      const mogucaDrzava = delovi[delovi.length - 1]

      if (drzave.includes(mogucaDrzava)) {
        drzava.value = mogucaDrzava
      }

      if (dostupniGradovi.value.includes(moguciGrad)) {
        grad.value = moguciGrad
        koristiDrugiGrad.value = false
        drugiGrad.value = ''
      } else {
        grad.value = 'Drugi grad'
        drugiGrad.value = moguciGrad
        koristiDrugiGrad.value = true
      }
    } else {
      ulica.value = sacuvanaAdresa
      grad.value = sacuvaniGrad
    }
  } else {
    grad.value = sacuvaniGrad
  }

  if (sacuvaniGrad && !dostupniGradovi.value.includes(sacuvaniGrad)) {
    grad.value = 'Drugi grad'
    drugiGrad.value = sacuvaniGrad
    koristiDrugiGrad.value = true
  } else if (sacuvaniGrad) {
    grad.value = sacuvaniGrad
    koristiDrugiGrad.value = false
  }

  brojKuce.value = ''
  poruka.value = ''
  greska.value = ''
}

watch(
  () => korisnik.value?.id,
  () => {
    popuniFormu()
    uredjivanje.value = false
  },
  { immediate: true },
)

function promeniDrzavu() {
  grad.value = ''
  drugiGrad.value = ''
  koristiDrugiGrad.value = false
}

function promeniGrad() {
  koristiDrugiGrad.value = grad.value === 'Drugi grad'

  if (!koristiDrugiGrad.value) {
    drugiGrad.value = ''
  }
}

function zapocniIzmenu() {
  popuniFormu()
  uredjivanje.value = true
  poruka.value = ''
  greska.value = ''
}

function otkaziIzmenu() {
  popuniFormu()
  uredjivanje.value = false
}

function sacuvajIzmene() {
  poruka.value = ''
  greska.value = ''

  if (!telefon.value.trim()) {
    greska.value = 'Unesi broj telefona.'
    return
  }

  if (!ulica.value.trim()) {
    greska.value = 'Unesi naziv ulice.'
    return
  }

  if (!brojKuce.value.trim()) {
    greska.value = 'Unesi kućni broj.'
    return
  }

  if (!konacniGrad.value.trim()) {
    greska.value = 'Izaberi grad ili unesi naziv grada.'
    return
  }

  if (!drzava.value) {
    greska.value = 'Izaberi državu.'
    return
  }

  const adresa = `${ulica.value.trim()} ${brojKuce.value.trim()}, ${konacniGrad.value}, ${drzava.value}`
  const rezultat = izmeniKontaktKorisnika(
    telefon.value.trim(),
    adresa,
    konacniGrad.value,
    drzava.value,
  )

  if (!rezultat.uspeh) {
    greska.value = rezultat.poruka
    return
  }

  poruka.value = rezultat.poruka
  uredjivanje.value = false
}

function odjaviSe() {
  odjaviKorisnika()
  router.replace('/')
}
</script>

<template>
  <main class="stranica-profila">
    <div class="pozadinski-ukras ukras-jedan"></div>
    <div class="pozadinski-ukras ukras-dva"></div>

    <section class="profil-kontejner">
      <template v-if="korisnik">
        <div class="zaglavlje-profila">
          <div class="oznaka-stranice">
            <span class="tackica"></span>
            MOJ ZELENI KUTAK
          </div>

          <h1>
            Dobro došla nazad,
            <em>{{ korisnik.ime }}.</em>
          </h1>

          <p class="uvodni-tekst">
            Tvoj mali kutak za sve što raste, cveta i ulepšava tvoj dom.
          </p>
        </div>

        <section class="kartica-identiteta">
          <div class="gornji-deo-kartice">
            <div class="avatar">{{ inicijali }}</div>

            <div class="osnovni-podaci">
              <span class="mali-naslov">TVOJ NALOG</span>
              <h2>{{ korisnik.ime }} {{ korisnik.prezime }}</h2>
              <p>{{ korisnik.email }}</p>
            </div>

            <div class="oznaka-clanstva">
              <span class="list-ikona">✿</span>
              <span>Član Biljne Bajke</span>
            </div>
          </div>

          <div class="linija"></div>

          <section class="sekcija-podataka">
            <div class="naslov-podataka">
              <span class="naslovna-ikona">♧</span>
              <div>
                <h3>Lični podaci</h3>
                <p>Osnovne informacije o tvom nalogu</p>
              </div>
            </div>

            <div class="detalji-naloga">
              <div class="detalj">
                <span class="ikona-detalja">♙</span>
                <div>
                  <span class="naziv-detalja">Ime i prezime</span>
                  <strong>{{ korisnik.ime }} {{ korisnik.prezime }}</strong>
                </div>
              </div>

              <div class="detalj">
                <span class="ikona-detalja">✉</span>
                <div>
                  <span class="naziv-detalja">Imejl adresa</span>
                  <strong>{{ korisnik.email }}</strong>
                </div>
              </div>
            </div>
          </section>

          <div class="linija"></div>

          <section class="sekcija-podataka">
            <div class="naslov-podataka">
              <span class="naslovna-ikona">⌖</span>
              <div>
                <h3>Kontakt i adresa</h3>
                <p>Broj telefona i adresa za kontakt</p>
              </div>
            </div>

            <template v-if="!uredjivanje">
              <div class="detalji-naloga">
                <div class="detalj">
                  <span class="ikona-detalja">☎</span>
                  <div>
                    <span class="naziv-detalja">Broj telefona</span>
                    <strong v-if="telefonKorisnika">
                      {{ telefonKorisnika }}
                    </strong>
                    <span v-else class="nedostaje-podatak">
                      Nije unet
                    </span>
                  </div>
                </div>

                <div class="detalj">
                  <span class="ikona-detalja">⌂</span>
                  <div>
                    <span class="naziv-detalja">Adresa</span>
                    <strong v-if="adresaKorisnika">
                      {{ adresaKorisnika }}
                    </strong>
                    <span v-else class="nedostaje-podatak">
                      Nije uneta
                    </span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="dugme-izmeni"
                @click="zapocniIzmenu"
              >
                <span>✎</span>
                Izmeni podatke
              </button>
            </template>

            <form v-else class="forma-izmene" @submit.prevent="sacuvajIzmene">
              <div class="polje">
                <label for="telefon">Broj telefona</label>
                <div class="telefon-unos">
                  <span class="pozivni-broj">{{ pozivniBroj }}</span>
                  <input
                    id="telefon"
                    v-model="telefon"
                    type="tel"
                    autocomplete="tel"
                    placeholder="Unesi broj telefona"
                    required
                  />
                </div>
                <small>
                  Izaberi državu ispod da promeniš pozivni broj.
                </small>
              </div>

              <div class="polje">
                <label for="drzava">Država</label>
                <select
                  id="drzava"
                  v-model="drzava"
                  required
                  @change="promeniDrzavu"
                >
                  <option
                    v-for="stavka in drzave"
                    :key="stavka"
                    :value="stavka"
                  >
                    {{ stavka }}
                  </option>
                </select>
              </div>

              <div class="polje">
                <label for="grad">Grad</label>
                <select
                  id="grad"
                  v-model="grad"
                  required
                  @change="promeniGrad"
                >
                  <option disabled value="">Izaberi grad</option>
                  <option
                    v-for="stavka in dostupniGradovi"
                    :key="stavka"
                    :value="stavka"
                  >
                    {{ stavka }}
                  </option>
                </select>
              </div>

              <div v-if="koristiDrugiGrad" class="polje">
                <label for="drugi-grad">Naziv grada</label>
                <input
                  id="drugi-grad"
                  v-model="drugiGrad"
                  type="text"
                  placeholder="Unesi naziv grada"
                  required
                />
              </div>

              <div class="polja-adrese">
                <div class="polje">
                  <label for="ulica">Ulica</label>
                  <input
                    id="ulica"
                    v-model="ulica"
                    type="text"
                    autocomplete="street-address"
                    placeholder="Naziv ulice"
                    required
                  />
                </div>

                <div class="polje polje-kucni-broj">
                  <label for="broj-kuce">Kućni broj</label>
                  <input
                    id="broj-kuce"
                    v-model="brojKuce"
                    type="text"
                    placeholder="Broj"
                    required
                  />
                </div>
              </div>

              <p v-if="greska" class="poruka poruka-greska">
                {{ greska }}
              </p>

              <p v-if="poruka" class="poruka poruka-uspeh">
                {{ poruka }}
              </p>

              <div class="dugmad-forme">
                <button type="submit" class="dugme-sacuvaj">
                  Sačuvaj izmene
                </button>
                <button
                  type="button"
                  class="dugme-otkazi"
                  @click="otkaziIzmenu"
                >
                  Otkaži
                </button>
              </div>
            </form>

            <p v-if="poruka && !uredjivanje" class="poruka poruka-uspeh">
              {{ poruka }}
            </p>
          </section>
        </section>

        <section class="brze-akcije">
          <div class="naslov-sekcije">
            <h2>Tvoj biljni svet</h2>
            <p>Gde želiš dalje?</p>
          </div>

          <div class="akcije-mreza">
            <RouterLink to="/korpa" class="akcija-kartica">
              <span class="akcija-ikona">🛍</span>
              <span class="akcija-tekst">
                <strong>Moja korpa</strong>
                <small>Pogledaj odabrane biljke</small>
              </span>
              <span class="strelica">↗</span>
            </RouterLink>

            <RouterLink to="/katalog" class="akcija-kartica">
              <span class="akcija-ikona">❋</span>
              <span class="akcija-tekst">
                <strong>Istraži biljke</strong>
                <small>Pronađi novu zelenu ljubav</small>
              </span>
              <span class="strelica">↗</span>
            </RouterLink>
          </div>
        </section>

        <div class="donji-deo">
          <button
            type="button"
            class="dugme-odjava"
            @click="odjaviSe"
          >
            <span>↪</span>
            Odjavi se sa naloga
          </button>

          <RouterLink to="/" class="povratak">
            ← Nazad na početnu
          </RouterLink>
        </div>
      </template>

      <template v-else>
        <div class="prazan-avatar">✿</div>
        <p class="nadnaslov">BILJNA BAJKA</p>

        <h1>
          Tvoj zeleni kutak
          <em>te čeka.</em>
        </h1>

        <p class="uvodni-tekst">
          Prijavi se da bi pristupila svom profilu i nastavila
          da otkrivaš biljke koje unose život u tvoj dom.
        </p>

        <div class="dugmad-prijave">
          <RouterLink to="/prijava" class="dugme-glavno">
            Prijavi se <span>→</span>
          </RouterLink>
          <RouterLink to="/registracija" class="dugme-sporedno">
            Napravi nalog
          </RouterLink>
        </div>

        <RouterLink to="/" class="povratak">
          ← Nazad na početnu
        </RouterLink>
      </template>
    </section>
  </main>
</template>

<style scoped src="../css/ProfilKorisnika.css"></style>
