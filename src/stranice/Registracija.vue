
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { registrujKorisnika } from '../podaci/autentifikacija'

const router = useRouter()

const ime = ref('')
const prezime = ref('')
const email = ref('')
const drzava = ref('Srbija')
const grad = ref('Beograd')
const ulica = ref('')
const brojTelefona = ref('')
const lozinka = ref('')
const potvrdaLozinke = ref('')

const poruka = ref('')
const greska = ref(false)

const gradovi: Record<string, string[]> = {
  Srbija: [
    'Beograd',
    'Novi Sad',
    'Niš',
    'Kragujevac',
    'Subotica',
    'Pančevo',
    'Zrenjanin',
    'Čačak',
    'Kraljevo',
    'Novi Pazar',
    'Drugi grad',
  ],
  'Crna Gora': [
    'Podgorica',
    'Nikšić',
    'Budva',
    'Bar',
    'Herceg Novi',
    'Kotor',
    'Tivat',
    'Bijelo Polje',
    'Cetinje',
    'Drugi grad',
  ],
  Hrvatska: [
    'Zagreb',
    'Split',
    'Rijeka',
    'Osijek',
    'Zadar',
    'Pula',
    'Dubrovnik',
    'Varaždin',
    'Slavonski Brod',
    'Drugi grad',
  ],
  'Bosna i Hercegovina': [
    'Sarajevo',
    'Banja Luka',
    'Mostar',
    'Tuzla',
    'Zenica',
    'Bijeljina',
    'Trebinje',
    'Doboj',
    'Drugi grad',
  ],
  Makedonija: [
    'Skoplje',
    'Bitolj',
    'Kumanovo',
    'Prilep',
    'Tetovo',
    'Ohrid',
    'Veles',
    'Štip',
    'Drugi grad',
  ],
}

const pozivniBrojevi: Record<string, string> = {
  Srbija: '+381',
  'Crna Gora': '+382',
  Hrvatska: '+385',
  'Bosna i Hercegovina': '+387',
  Makedonija: '+389',
}

const dostupniGradovi = computed(() => gradovi[drzava.value] ?? [])
const pozivniBroj = computed(() => pozivniBrojevi[drzava.value] ?? '')

const izabranDrugiGrad = ref(false)
const drugiGrad = ref('')

function promeniDrzavu() {
  grad.value = dostupniGradovi.value[0] ?? ''
  izabranDrugiGrad.value = false
  drugiGrad.value = ''
}

function promeniGrad() {
  izabranDrugiGrad.value = grad.value === 'Drugi grad'
  drugiGrad.value = ''
}

const konacniGrad = computed(() =>
  grad.value === 'Drugi grad' ? drugiGrad.value.trim() : grad.value,
)

function registrujSe() {
  poruka.value = ''
  greska.value = false

  if (!konacniGrad.value) {
    poruka.value = 'Izaberi ili unesi grad.'
    greska.value = true
    return
  }

  if (lozinka.value.length < 8) {
    poruka.value = 'Lozinka mora imati najmanje 8 karaktera.'
    greska.value = true
    return
  }

  if (lozinka.value !== potvrdaLozinke.value) {
    poruka.value = 'Lozinke se ne poklapaju.'
    greska.value = true
    return
  }

  const telefon = `${pozivniBroj.value} ${brojTelefona.value.trim()}`
  const adresa = `${ulica.value.trim()}, ${konacniGrad.value}, ${drzava.value}`

  const rezultat = registrujKorisnika(
    ime.value.trim(),
    prezime.value.trim(),
    email.value.trim(),
    lozinka.value,
  )

  poruka.value = rezultat.poruka
  greska.value = !rezultat.uspeh

  if (rezultat.uspeh) {
    console.log('Podaci za kontakt:', { telefon, adresa })

    setTimeout(() => {
      router.push('/prijava')
    }, 1000)
  }
}
</script>

<template>
  <main class="stranica-registracije">
    <section class="kartica-registracije">
      <div class="logo-znak">✿</div>

      <p class="nadnaslov">BILJNA BAJKA</p>
      <h1>Kreiraj svoj nalog</h1>
      <p class="opis">
        Sve za tvoj mali zeleni svet, na jednom mestu.
      </p>

      <form @submit.prevent="registrujSe">
        <section class="grupa">
          <h2>Lični podaci</h2>

          <div class="polja-u-redu">
            <div class="polje">
              <label for="ime">Ime</label>
              <input
                id="ime"
                v-model="ime"
                type="text"
                autocomplete="given-name"
                placeholder="Ime"
                required
              />
            </div>

            <div class="polje">
              <label for="prezime">Prezime</label>
              <input
                id="prezime"
                v-model="prezime"
                type="text"
                autocomplete="family-name"
                placeholder="Prezime"
                required
              />
            </div>
          </div>

          <div class="polje">
            <label for="email">Imejl adresa</label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="ime@example.com"
              required
            />
          </div>
        </section>

        <section class="grupa">
          <h2>Adresa i kontakt</h2>

          <div class="polje">
            <label for="drzava">Država</label>
            <select
              id="drzava"
              v-model="drzava"
              autocomplete="country-name"
              required
              @change="promeniDrzavu"
            >
              <option
                v-for="nazivDrzave in Object.keys(gradovi)"
                :key="nazivDrzave"
                :value="nazivDrzave"
              >
                {{ nazivDrzave }}
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
              <option
                v-for="nazivGrada in dostupniGradovi"
                :key="nazivGrada"
                :value="nazivGrada"
              >
                {{ nazivGrada }}
              </option>
            </select>
          </div>

          <div v-if="izabranDrugiGrad" class="polje">
            <label for="drugi-grad">Naziv grada</label>
            <input
              id="drugi-grad"
              v-model="drugiGrad"
              type="text"
              placeholder="Unesi naziv grada"
              required
            />
          </div>

          <div class="polje">
            <label for="ulica">Ulica i kućni broj</label>
            <input
              id="ulica"
              v-model="ulica"
              type="text"
              autocomplete="street-address"
              placeholder="Npr. Knez Mihailova 12"
              required
            />
          </div>

          <div class="polje">
            <label for="telefon">Broj telefona</label>
            <div class="telefon-unos">
              <span class="pozivni">{{ pozivniBroj }}</span>
              <input
                id="telefon"
                v-model="brojTelefona"
                type="tel"
                autocomplete="tel-national"
                placeholder="60 123 4567"
                required
              />
            </div>
          </div>
        </section>

        <section class="grupa">
          <h2>Podaci za prijavu</h2>

          <div class="polje">
            <label for="lozinka">Lozinka</label>
            <input
              id="lozinka"
              v-model="lozinka"
              type="password"
              autocomplete="new-password"
              placeholder="Najmanje 8 karaktera"
              minlength="8"
              required
            />
          </div>

          <div class="polje">
            <label for="potvrda">Potvrdi lozinku</label>
            <input
              id="potvrda"
              v-model="potvrdaLozinke"
              type="password"
              autocomplete="new-password"
              placeholder="Ponovi lozinku"
              required
            />
          </div>
        </section>

        <p
          v-if="poruka"
          class="poruka"
          :class="{ greska }"
          role="status"
          aria-live="polite"
        >
          {{ poruka }}
        </p>

        <button class="dugme-registracije" type="submit">
          Kreiraj nalog <span>→</span>
        </button>
      </form>

      <p class="link-prijava">
        Već imaš nalog?
        <RouterLink to="/prijava">Prijavi se</RouterLink>
      </p>

      <RouterLink to="/" class="nazad">
        ← Nazad na početnu
      </RouterLink>
    </section>
  </main>
</template>

<style scoped src="../css/Registracija.css"></style>
