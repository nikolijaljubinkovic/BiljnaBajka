<script setup lang="ts">
import { ref, nextTick } from 'vue'

type Poruka = {
  id: number
  tekst: string
  autor: 'savetnik' | 'korisnik'
}

const otvoren = ref(false)
const prikaziPitanja = ref(true)
const unos = ref('')
const sledeciId = ref(1)

const pocetnaPoruka: Poruka = {
  id: 0,
  autor: 'savetnik',
  tekst: 'Zdravo! 🌱 Ja sam Biljni savetnik. Mogu da ti pomognem da izabereš biljku i saznaš kako se neguje. Šta te zanima?'
}

const poruke = ref<Poruka[]>([{ ...pocetnaPoruka }])

const pitanja = [
  {
    pitanje: 'Želim biljku za stan',
    odgovor:
      'Za stan su dobar izbor zamiokulkas, sanseverija i spatifilum. 🌿 Pre izbora razmisli koliko prirodne svetlosti ima prostorija i koliko često želiš da zalivaš biljku.'
  },
  {
    pitanje: 'Koja biljka se lako održava?',
    odgovor:
      'Zamiokulkas i sanseverija su poznati po jednostavnoj nezi. Ne zahtevaju često zalivanje, a mogu da uspevaju i uz manje direktne svetlosti. Ipak, nijedna biljka ne treba da stoji u potpuno neodgovarajućim uslovima.'
  },
  {
    pitanje: 'Kako se neguje orhideja?',
    odgovor:
      'Orhideju drži na mestu sa dosta indirektne svetlosti. Zalivaj je kada se supstrat skoro osuši i ne ostavljaj koren da stoji u vodi. Potrebe zavise od vrste i uslova u prostoriji.'
  },
  {
    pitanje: 'Kako često treba zalivati biljke?',
    odgovor:
      'To zavisi od vrste biljke, temperature, svetlosti i saksije. Pre zalivanja proveri vlažnost zemlje prstom. Bolje je proveriti stanje supstrata nego zalivati sve biljke po istom rasporedu.'
  },
  {
    pitanje: 'Želim biljku za poklon',
    odgovor:
      'Za poklon možeš izabrati orhideju za elegantan izgled, spatifilum za svetliji prostor ili sukulent za nekoga ko voli jednostavne biljke. Razmisli i o tome koliko vremena osoba može da posveti nezi.'
  },
  {
    pitanje: 'Šta ako biljka ima žute listove?',
    odgovor:
      'Žuti listovi mogu biti posledica prekomernog ili nedovoljnog zalivanja, promena svetlosti ili prirodnog starenja listova. Proveri vlažnost zemlje, drenažu i uslove u kojima biljka stoji pre nego što promeniš način nege.'
  }
]

function dodajPoruku(autor: Poruka['autor'], tekst: string) {
  poruke.value.push({
    id: sledeciId.value++,
    autor,
    tekst
  })
}

async function izaberiPitanje(pitanje: string, odgovor: string) {
  dodajPoruku('korisnik', pitanje)
  prikaziPitanja.value = false

  await nextTick()
  dodajPoruku('savetnik', odgovor)
}

function posaljiPoruku() {
  const tekst = unos.value.trim()

  if (!tekst) return

  dodajPoruku('korisnik', tekst)
  unos.value = ''
  prikaziPitanja.value = false

  const odgovor =
    'Hvala na pitanju! 🌿 Ovo je demonstracioni savetnik sa unapred pripremljenim odgovorima. Izaberi jedno od ponuđenih pitanja kako bi dobio/la konkretniji savet o izboru i nezi biljaka.'

  dodajPoruku('savetnik', odgovor)
}

function vratiPitanja() {
  prikaziPitanja.value = true
}

function noviRazgovor() {
  poruke.value = [{ ...pocetnaPoruka }]
  prikaziPitanja.value = true
  unos.value = ''
  sledeciId.value = 1
}

function zatvoriSavetnika() {
  otvoren.value = false
}
</script>

<template>
  <div class="savetnik-omot">
    <Transition name="prozor">
      <section
        v-if="otvoren"
        class="savetnik-prozor"
        role="dialog"
        aria-modal="false"
        aria-label="Biljni savetnik"
      >
        <header class="savetnik-zaglavlje">
          <div class="savetnik-identitet">
            <div class="savetnik-logo" aria-hidden="true">🌿</div>

            <div>
              <h2>Biljni savetnik</h2>
              <p><span class="status-tacka"></span> Pomoć pri izboru biljaka</p>
            </div>
          </div>

          <div class="zaglavlje-akcije">
            <button
              class="ikonica-dugme"
              type="button"
              aria-label="Započni novi razgovor"
              title="Novi razgovor"
              @click="noviRazgovor"
            >
              ↻
            </button>

            <button
              class="ikonica-dugme"
              type="button"
              aria-label="Zatvori savetnika"
              title="Zatvori"
              @click="zatvoriSavetnika"
            >
              ×
            </button>
          </div>
        </header>

        <div class="savetnik-telo" aria-live="polite">
          <div
            v-for="poruka in poruke"
            :key="poruka.id"
            class="poruka-red"
            :class="poruka.autor === 'korisnik' ? 'poruka-korisnika' : 'poruka-savetnika'"
          >
            <div
              v-if="poruka.autor === 'savetnik'"
              class="poruka-avatar"
              aria-hidden="true"
            >
              🌱
            </div>

            <p class="poruka-oblak">{{ poruka.tekst }}</p>
          </div>

          <div v-if="prikaziPitanja" class="ponudjena-pitanja">
            <p class="pitanja-naslov">Izaberi temu:</p>

            <button
              v-for="stavka in pitanja"
              :key="stavka.pitanje"
              class="pitanje-dugme"
              type="button"
              @click="izaberiPitanje(stavka.pitanje, stavka.odgovor)"
            >
              {{ stavka.pitanje }}
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <button
            v-else
            class="povratak-dugme"
            type="button"
            @click="vratiPitanja"
          >
            ← Prikaži ostala pitanja
          </button>
        </div>

        <form class="savetnik-unos" @submit.prevent="posaljiPoruku">
          <input
            v-model="unos"
            type="text"
            placeholder="Napiši pitanje..."
            aria-label="Napiši pitanje"
            maxlength="300"
          />

          <button
            type="submit"
            class="posalji-dugme"
            :disabled="!unos.trim()"
            aria-label="Pošalji pitanje"
            title="Pošalji"
          >
            ↑
          </button>
        </form>

        <footer class="savetnik-podnozje">
          BiljnaBajka · Saveti za ljubitelje biljaka
        </footer>
      </section>
    </Transition>

    <button
      class="savetnik-plutajuci"
      type="button"
      :aria-expanded="otvoren"
      aria-label="Otvori Biljnog savetnika"
      @click="otvoren = !otvoren"
    >
      <span v-if="!otvoren" class="plutajuci-sadrzaj">
        <span class="plutajuci-emoji" aria-hidden="true">🌿</span>
        <span class="plutajuci-tekst">Biljni savetnik</span>
      </span>

      <span v-else class="plutajuci-zatvori" aria-hidden="true">×</span>
    </button>
  </div>
</template>

<style scoped src="../css/BiljniSavetnik.css"></style>
