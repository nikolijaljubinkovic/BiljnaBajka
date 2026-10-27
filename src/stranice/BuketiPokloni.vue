
<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'

import ruze from '../slike/buket-ruze.jpg'
import tulipani from '../slike/buket-tulipani.jpg'
import ljubicasti from '../slike/buket-ljubicasti.jpg'
import ljiljani from '../slike/buket-ljiljani.jpg'
import crveneRuže from '../slike/buket-crvene-ruze.jpg'
import gerbere from '../slike/buket-gerbere.jpg'
import poljskoCvece from '../slike/buket-poljsko-cvece.jpg'
import hortenzije from '../slike/buket-hortenzije.jpg'
import bozuri from '../slike/buket-bozuri.jpg'
import sezonski from '../slike/buket-sezonski.jpg'

const router = useRouter()

interface Buket {
  id: number
  naziv: string
  opis: string
  cena: number
  kategorija: string
  slika: string
  oznaka: string
}

const buketi: Buket[] = [
  {
    id: 11,
    naziv: 'Nežnost ruža',
    opis: 'Nežna kombinacija ružičastih i belih ruža za posebne trenutke.',
    cena: 3200,
    kategorija: 'Romantični',
    slika: ruze,
    oznaka: 'Bestseller',
  },
  {
    id: 12,
    naziv: 'Prolećni tulipani',
    opis: 'Veseli tulipani koji unose svežinu, boju i radost u svaki dan.',
    cena: 2400,
    kategorija: 'Sezonski',
    slika: tulipani,
    oznaka: 'Prolećni izbor',
  },
  {
    id: 13,
    naziv: 'Ljubičasta elegancija',
    opis: 'Aranžman ljubičastih tonova za ljubitelje nesvakidašnjeg cveća.',
    cena: 3500,
    kategorija: 'Elegantni',
    slika: ljubicasti,
    oznaka: 'Poseban izbor',
  },
  {
    id: 14,
    naziv: 'Bela sofisticiranost',
    opis: 'Elegantni beli ljiljani za poklon koji ostavlja utisak.',
    cena: 3900,
    kategorija: 'Elegantni',
    slika: ljiljani,
    oznaka: 'Premium',
  },
  {
    id: 15,
    naziv: 'Crvena strast',
    opis: 'Klasične crvene ruže koje govore više od hiljadu reči.',
    cena: 4200,
    kategorija: 'Romantični',
    slika: crveneRuže,
    oznaka: 'Ljubavni favorit',
  },
  {
    id: 16,
    naziv: 'Sunčani gerberi',
    opis: 'Vedre gerbere koje donose optimizam i dobro raspoloženje.',
    cena: 2600,
    kategorija: 'Šareni',
    slika: gerbere,
    oznaka: 'Veseli izbor',
  },
  {
    id: 17,
    naziv: 'Tajna bašte',
    opis: 'Romantična mešavina poljskog cveća prirodnog izgleda.',
    cena: 2800,
    kategorija: 'Prirodni',
    slika: poljskoCvece,
    oznaka: 'Prirodna lepota',
  },
  {
    id: 18,
    naziv: 'Plava harmonija',
    opis: 'Hortenzije i nežni plavi tonovi za poseban i elegantan poklon.',
    cena: 3800,
    kategorija: 'Elegantni',
    slika: hortenzije,
    oznaka: 'Jedinstven',
  },
  {
    id: 19,
    naziv: 'Ružičasti božuri',
    opis: 'Bujni ružičasti božuri za luksuzan i nezaboravan poklon.',
    cena: 4500,
    kategorija: 'Romantični',
    slika: bozuri,
    oznaka: 'Premium',
  },
  {
    id: 20,
    naziv: 'Cvetna čarolija',
    opis: 'Šareni sezonski aranžman od pažljivo odabranog cveća.',
    cena: 3000,
    kategorija: 'Šareni',
    slika: sezonski,
    oznaka: 'Omiljeni miks',
  },
]

const pretraga = ref('')
const kategorija = ref('Sve kategorije')
const sortiranje = ref('preporuceno')
const maksimalnaCena = ref(5500)

const kategorije = [
  'Sve kategorije',
  'Romantični',
  'Elegantni',
  'Sezonski',
  'Šareni',
  'Prirodni',
]

const filtriraniBuketi = computed(() => {
  let rezultat = buketi.filter((buket) => {
    const izraz = pretraga.value.toLocaleLowerCase('sr-RS').trim()

    const odgovaraPretrazi =
      buket.naziv.toLocaleLowerCase('sr-RS').includes(izraz) ||
      buket.opis.toLocaleLowerCase('sr-RS').includes(izraz) ||
      buket.kategorija.toLocaleLowerCase('sr-RS').includes(izraz)

    const odgovaraKategoriji =
      kategorija.value === 'Sve kategorije' ||
      buket.kategorija === kategorija.value

    const odgovaraCeni = buket.cena <= maksimalnaCena.value

    return odgovaraPretrazi && odgovaraKategoriji && odgovaraCeni
  })

  if (sortiranje.value === 'cenaRastuce') {
    rezultat = [...rezultat].sort((a, b) => a.cena - b.cena)
  } else if (sortiranje.value === 'cenaOpadajuce') {
    rezultat = [...rezultat].sort((a, b) => b.cena - a.cena)
  } else if (sortiranje.value === 'naziv') {
    rezultat = [...rezultat].sort((a, b) =>
      a.naziv.localeCompare(b.naziv, 'sr'),
    )
  }

  return rezultat
})

function formatirajCenu(cena: number) {
  return cena.toLocaleString('sr-RS')
}

function otvoriDetalje(buket: Buket) {
  router.push(`/buket/${buket.id}`)
}

function resetujFiltere() {
  pretraga.value = ''
  kategorija.value = 'Sve kategorije'
  maksimalnaCena.value = 5500
  sortiranje.value = 'preporuceno'
}
</script>

<template>
  <main class="stranica-buketa">
    <section class="hero-buketa">
      <div class="hero-tekst">
        <span class="mali-naslov">CVEĆE SA POSEBNOM PRIČOM</span>
        <h1>Buketi koji <em>govore</em> srcem.</h1>
        <p>
          Za male znakove pažnje, velike trenutke i sve one dane
          kada želiš nekome da izmamiš osmeh.
        </p>
        <a href="#ponuda" class="dugme-hero">
          Otkrij našu kolekciju <span>↘</span>
        </a>
      </div>

      <div class="hero-slika">
        <img :src="bozuri" alt="Elegantni buket ružičastih božura" />
        <div class="hero-napomena">
          <span>✳</span>
          <div>
            <strong>Birano s ljubavlju</strong>
            <small>Svaki buket je posebna priča.</small>
          </div>
        </div>
      </div>
    </section>

    <section id="ponuda" class="ponuda">
      <div class="naslov-ponude">
        <div>
          <span class="mali-naslov">NAŠA CVETNA KOLEKCIJA</span>
          <h2>Pronađi svoj <em>buket</em></h2>
          <p>Pažljivo odabrani aranžmani za svaki povod.</p>
        </div>
        <span class="broj-buketa">
          {{ filtriraniBuketi.length }} aranžmana
        </span>
      </div>

      <div class="filteri">
        <label class="polje-pretrage">
          <span>⌕</span>
          <input
            v-model="pretraga"
            type="search"
            placeholder="Pretraži bukete..."
          />
        </label>

        <label class="polje-filtera">
          <span>Kategorija</span>
          <select v-model="kategorija">
            <option v-for="opcija in kategorije" :key="opcija" :value="opcija">
              {{ opcija }}
            </option>
          </select>
        </label>

        <label class="polje-filtera">
          <span>Sortiraj</span>
          <select v-model="sortiranje">
            <option value="preporuceno">Preporučeni</option>
            <option value="cenaRastuce">Cena: od niže ka višoj</option>
            <option value="cenaOpadajuce">Cena: od više ka nižoj</option>
            <option value="naziv">Naziv: A–Š</option>
          </select>
        </label>
      </div>

      <div class="filter-cene">
        <div class="filter-cene-naslov">
          <label for="maksimalna-cena">Maksimalna cena</label>
          <strong>{{ formatirajCenu(maksimalnaCena) }} RSD</strong>
        </div>

        <input
          id="maksimalna-cena"
          v-model.number="maksimalnaCena"
          type="range"
          min="2000"
          max="5500"
          step="100"
        />

        <div class="raspon-cene">
          <span>2.000 RSD</span>
          <span>5.500 RSD</span>
        </div>
      </div>

      <div v-if="filtriraniBuketi.length" class="mreza-buketa">
        <article
          v-for="(buket, indeks) in filtriraniBuketi"
          :key="buket.id"
          class="kartica-buketa"
          :style="{ '--redosled': indeks }"
        >
          <div class="slika-buketa">
            <RouterLink
              :to="`/buket/${buket.id}`"
              class="link-slike"
              :aria-label="`Pogledaj detalje: ${buket.naziv}`"
            >
              <img :src="buket.slika" :alt="buket.naziv" loading="lazy" />
            </RouterLink>
            <span class="oznaka">{{ buket.oznaka }}</span>
          </div>

          <div class="sadrzaj-kartice">
            <div class="kategorija-kartice">{{ buket.kategorija }}</div>

            <h3>
              <RouterLink
                :to="`/buket/${buket.id}`"
                class="link-naziva"
              >
                {{ buket.naziv }}
              </RouterLink>
            </h3>

            <p>{{ buket.opis }}</p>

            <div class="dno-kartice">
              <div class="cena">
                <strong>{{ formatirajCenu(buket.cena) }}</strong>
                <span>RSD</span>
              </div>

              <button
                type="button"
                class="dugme-dodaj"
                @click="otvoriDetalje(buket)"
              >
                Pogledaj detalje <span>↗</span>
              </button>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="prazan-rezultat">
        <span>✿</span>
        <h3>Nismo pronašli taj buket</h3>
        <p>Pokušaj sa drugim nazivom, kategorijom ili cenom.</p>
        <button
          type="button"
          class="dugme-hero"
          @click="resetujFiltere"
        >
          Prikaži sve bukete
        </button>
      </div>
    </section>

    <section class="zavrsna-poruka">
      <span>✳</span>
      <p>Najlepši pokloni nisu stvari, već osećaj koji ostavljaju.</p>
      <span>✳</span>
    </section>
  </main>
</template>

<style scoped src="../css/BuketiPokloni.css"></style>
