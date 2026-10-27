
<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { biljke } from '../podaci/biljke'

interface RecenzijaKorisnika {
  id: string
  biljkaId: number
  korisnikId?: string
  ime?: string
  prezime?: string
  ocena: number
  komentar: string
  datum?: string
}

const KLJUCEVI_RECENZIJA = [
  'biljna-bajka-recenzije',
  'biljnaBajkaRecenzije',
]

function ucitajRecenzije(): RecenzijaKorisnika[] {
  const sve: RecenzijaKorisnika[] = []

  for (const kljuc of KLJUCEVI_RECENZIJA) {
    try {
      const sacuvano = localStorage.getItem(kljuc)
      if (!sacuvano) continue

      const podaci: unknown = JSON.parse(sacuvano)
      if (!Array.isArray(podaci)) continue

      const validne = podaci.filter(
        (recenzija): recenzija is RecenzijaKorisnika =>
          typeof recenzija === 'object' &&
          recenzija !== null &&
          typeof recenzija.biljkaId === 'number' &&
          typeof recenzija.ocena === 'number' &&
          typeof recenzija.komentar === 'string',
      )

      sve.push(...validne)
    } catch {
      // Preskacemo neispravan zapis.
    }
  }

  return Array.from(
    new Map(sve.map(recenzija => [recenzija.id, recenzija])).values(),
  )
}

const korisnickeRecenzije = ref<RecenzijaKorisnika[]>(ucitajRecenzije())

const pretraga = ref('')
const filteriOtvoreni = ref(false)

const izabraniTip = ref('Sve biljke')
const izabranaCiljnaGrupa = ref('Sve grupe')
const izabranaOcena = ref('sve')

const minimalnaCena = ref(0)
const maksimalnaCena = ref(10000)
const sortiranje = ref('preporuceno')

const tipovi = [
  'Sve biljke',
  ...new Set(biljke.map(b => b.tip)),
]

const ciljneGrupe = [
  'Sve grupe',
  ...new Set(biljke.map(b => b.ciljnaGrupa)),
]

const procenatMinimalneCene = computed(
  () => (minimalnaCena.value / 10000) * 100,
)

const procenatMaksimalneCene = computed(
  () => (maksimalnaCena.value / 10000) * 100,
)

const stilKlizaca = computed(() => ({
  background: `linear-gradient(
    to right,
    #e0e7dc ${procenatMinimalneCene.value}%,
    #557a50 ${procenatMinimalneCene.value}%,
    #557a50 ${procenatMaksimalneCene.value}%,
    #e0e7dc ${procenatMaksimalneCene.value}%
  )`,
}))

function recenzijeZaBiljku(biljkaId: number) {
  return korisnickeRecenzije.value.filter(
    recenzija => recenzija.biljkaId === biljkaId,
  )
}

function izracunajProsecnuOcenu(biljka: (typeof biljke)[number]) {
  const recenzije = recenzijeZaBiljku(biljka.id)
  const brojPostojecih = biljka.brojOcena ?? 0

  const zbirNovih = recenzije.reduce(
    (zbir, recenzija) => zbir + recenzija.ocena,
    0,
  )

  const ukupanBroj = brojPostojecih + recenzije.length

  if (ukupanBroj === 0) return 0

  return (
    (biljka.ocena * brojPostojecih + zbirNovih) /
    ukupanBroj
  )
}

function brojOcenaZaBiljku(biljka: (typeof biljke)[number]) {
  return (biljka.brojOcena ?? 0) + recenzijeZaBiljku(biljka.id).length
}

const filtriraneBiljke = computed(() => {
  const pojam = pretraga.value.trim().toLocaleLowerCase('sr')

  const rezultat = biljke.filter(biljka => {
    const tekstPretrage = [
      biljka.naziv,
      biljka.latinskiNaziv,
      biljka.opis,
      biljka.nega,
      biljka.svetlost,
      biljka.zalivanje,
      biljka.namena,
    ]
      .filter(Boolean)
      .join(' ')
      .toLocaleLowerCase('sr')

    const brojOcena = brojOcenaZaBiljku(biljka)
    const ocena = izracunajProsecnuOcenu(biljka)

    return (
      tekstPretrage.includes(pojam) &&
      (
        izabraniTip.value === 'Sve biljke' ||
        biljka.tip === izabraniTip.value
      ) &&
      (
        izabranaCiljnaGrupa.value === 'Sve grupe' ||
        biljka.ciljnaGrupa === izabranaCiljnaGrupa.value
      ) &&
      biljka.cena >= minimalnaCena.value &&
      biljka.cena <= maksimalnaCena.value &&
      (
        izabranaOcena.value === 'sve' ||
        (
          brojOcena > 0 &&
          ocena >= Number(izabranaOcena.value)
        )
      )
    )
  })

  if (sortiranje.value === 'cena-rastuce') {
    return rezultat.sort((a, b) => a.cena - b.cena)
  }

  if (sortiranje.value === 'cena-opadajuce') {
    return rezultat.sort((a, b) => b.cena - a.cena)
  }

  if (sortiranje.value === 'ocena') {
    return rezultat.sort(
      (a, b) => izracunajProsecnuOcenu(b) - izracunajProsecnuOcenu(a),
    )
  }

  return rezultat
})

function formatirajCenu(cena: number) {
  return new Intl.NumberFormat('sr-RS').format(cena) + ' RSD'
}

function resetujFiltere() {
  pretraga.value = ''
  izabraniTip.value = 'Sve biljke'
  izabranaCiljnaGrupa.value = 'Sve grupe'
  izabranaOcena.value = 'sve'
  minimalnaCena.value = 0
  maksimalnaCena.value = 10000
  sortiranje.value = 'preporuceno'
  filteriOtvoreni.value = false
}
</script>

<template>
  <main class="katalog">
    <section class="naslov">
      <p class="nadnaslov">ZELENI KUTAK</p>
      <h1>Naše biljke</h1>
      <p>Pronađi biljku koja će uneti prirodu i svežinu u tvoj dom.</p>
    </section>

    <section class="filteri">
      <div class="filteri-naslov">
        <div>
          <p class="filteri-nadnaslov">TVOJ ZELENI KUTAK</p>
          <h2>Pronađi svoju biljku</h2>
          <p class="filteri-opis">
            Nekoliko jednostavnih izbora do biljke po tvojoj meri.
          </p>
        </div>
        <span class="filteri-ikona" aria-hidden="true">✳</span>
      </div>

      <div class="pretraga">
        <label for="pretragaBiljaka">Pretraži biljke</label>
        <div class="polje-pretrage">
          <span aria-hidden="true">⌕</span>
          <input
            id="pretragaBiljaka"
            v-model="pretraga"
            placeholder="Naziv, opis ili nega biljke..."
            type="search"
          >
        </div>
      </div>

      <button
        class="dugme-otvori-filtere"
        type="button"
        :aria-expanded="filteriOtvoreni"
        aria-controls="dodatniFilteri"
        @click="filteriOtvoreni = !filteriOtvoreni"
      >
        <span aria-hidden="true">☷</span>
        {{ filteriOtvoreni ? 'Sakrij filtere' : 'Pretraži po filterima' }}
        <span
          class="strelica-filtera"
          :class="{ otvorena: filteriOtvoreni }"
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>

      <div
        v-if="filteriOtvoreni"
        id="dodatniFilteri"
        class="sadrzaj-filtera"
      >
        <div class="polja">
          <label>
            <span class="naziv-filtera">Kategorija</span>
            <select v-model="izabraniTip">
              <option v-for="tip in tipovi" :key="tip" :value="tip">
                {{ tip }}
              </option>
            </select>
          </label>

          <label>
            <span class="naziv-filtera">Za koga je biljka?</span>
            <select v-model="izabranaCiljnaGrupa">
              <option
                v-for="grupa in ciljneGrupe"
                :key="grupa"
                :value="grupa"
              >
                {{ grupa }}
              </option>
            </select>
          </label>

          <label>
            <span class="naziv-filtera">Ocena kupaca</span>
            <select v-model="izabranaOcena">
              <option value="sve">Sve ocene</option>
              <option value="1">1+ zvezdica</option>
              <option value="2">2+ zvezdice</option>
              <option value="3">3+ zvezdice</option>
              <option value="4">4+ zvezdice</option>
              <option value="5">Samo 5 zvezdica</option>
            </select>
          </label>

          <label>
            <span class="naziv-filtera">Sortiraj po</span>
            <select v-model="sortiranje">
              <option value="preporuceno">Preporučeno</option>
              <option value="cena-rastuce">Cena: od niže ka višoj</option>
              <option value="cena-opadajuce">Cena: od više ka nižoj</option>
              <option value="ocena">Najbolje ocenjene</option>
            </select>
          </label>
        </div>

        <div class="cena">
          <div class="cena-naslov">
            <div>
              <p class="naziv-filtera">Pronađi cenu za sebe</p>
              <h3>Raspon cene</h3>
            </div>
            <span class="cena-ikona" aria-hidden="true">↔</span>
          </div>

          <div class="izabrane-cene">
            <div class="cena-vrednost">
              <span>Minimalna cena</span>
              <strong>{{ formatirajCenu(minimalnaCena) }}</strong>
            </div>
            <span class="razmak-cena">—</span>
            <div class="cena-vrednost">
              <span>Maksimalna cena</span>
              <strong>{{ formatirajCenu(maksimalnaCena) }}</strong>
            </div>
          </div>

          <div class="klizac-omotac">
            <div class="klizac-pruga" :style="stilKlizaca"></div>

            <input
              v-model.number="minimalnaCena"
              class="klizac klizac-min"
              type="range"
              min="0"
              :max="maksimalnaCena"
              step="100"
              aria-label="Minimalna cena"
            >

            <input
              v-model.number="maksimalnaCena"
              class="klizac klizac-max"
              type="range"
              :min="minimalnaCena"
              max="10000"
              step="100"
              aria-label="Maksimalna cena"
            >
          </div>

          <div class="granice-cene">
            <span>0 RSD</span>
            <span>10.000 RSD</span>
          </div>
        </div>

        <div class="filteri-dno">
          <span class="broj-rezultata">
            Pronađeno: <strong>{{ filtriraneBiljke.length }}</strong>
            {{ filtriraneBiljke.length === 1 ? 'biljka' : 'biljaka' }}
          </span>

          <button
            class="dugme-reset"
            type="button"
            @click="resetujFiltere"
          >
            <span aria-hidden="true">↺</span>
            Poništi filtere
          </button>
        </div>
      </div>
    </section>

    <section class="rezultati">
      <div class="rezultati-naslov">
        <div>
          <p class="rezultati-nadnaslov">PAŽLJIVO ODABRANO</p>
          <h2>Naša kolekcija</h2>
        </div>
        <span>
          {{ filtriraneBiljke.length }}
          {{ filtriraneBiljke.length === 1 ? 'biljka' : 'biljaka' }}
        </span>
      </div>

      <div v-if="filtriraneBiljke.length" class="mreza-biljaka">
        <article
          v-for="biljka in filtriraneBiljke"
          :key="biljka.id"
          class="kartica"
        >
          <RouterLink
            :to="`/biljka/${biljka.id}`"
            class="slika-link"
          >
            <img :src="biljka.slika" :alt="biljka.naziv">
            <span class="oznaka">{{ biljka.tip }}</span>
          </RouterLink>

          <div class="kartica-sadrzaj">
            <div class="ocena">
              <template v-if="brojOcenaZaBiljku(biljka) > 0">
                <span class="zvezdica">★</span>
                <strong>
                  {{ izracunajProsecnuOcenu(biljka).toFixed(1) }}
                </strong>
                <span class="broj-ocena">
                  ({{ brojOcenaZaBiljku(biljka) }}
                  {{ brojOcenaZaBiljku(biljka) === 1 ? 'ocena' : 'ocena' }})
                </span>
              </template>

              <span v-else class="bez-ocena">
                Još nema ocena
              </span>
            </div>

            <h3>{{ biljka.naziv }}</h3>
            <p class="latinski">{{ biljka.latinskiNaziv }}</p>
            <p class="opis">{{ biljka.opis }}</p>

            <div class="kartica-dno">
              <strong class="cena-biljke">
                {{ formatirajCenu(biljka.cena) }}
              </strong>

              <RouterLink
                :to="`/biljka/${biljka.id}`"
                class="dugme-detalji"
              >
                Detalji
              </RouterLink>
            </div>
          </div>
        </article>
      </div>

      <div v-else class="prazno">
        <span aria-hidden="true">✿</span>
        <h3>Nismo pronašli biljke</h3>
        <p>Pokušaj da promeniš kriterijume pretrage.</p>

        <button
          class="dugme-reset"
          type="button"
          @click="resetujFiltere"
        >
          Prikaži sve biljke
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped src="../css/KatalogBiljaka.css"></style>
