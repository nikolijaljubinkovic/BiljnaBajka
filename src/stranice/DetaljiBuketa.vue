
<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink, useRoute, useRouter } from 'vue-router'
import { buketi } from '../podaci/buketi'
import { dodajUKorpu } from '../podaci/korpa'

const route = useRoute()
const router = useRouter()
const dodato = ref(false)

const buket = computed(() =>
  buketi.find((item) => item.id === Number(route.params.id)),
)

function formatirajCenu(cena: number) {
  return new Intl.NumberFormat('sr-RS').format(cena) + ' RSD'
}

function dodajBuket() {
  if (!buket.value) return

  dodajUKorpu({
    id: String(buket.value.id),
    naziv: buket.value.naziv,
    cena: buket.value.cena,
    slika: buket.value.slika,
    tip: 'buket',
  })

  dodato.value = true
}

function otvoriKorpu() {
  router.push('/korpa')
}
</script>

<template>
  <main class="stranica">
    <div v-if="buket" class="detalji">
      <RouterLink to="/buketi" class="nazad">
        ← Nazad na bukete
      </RouterLink>

      <div class="sadrzaj">
        <div class="slika-okvir">
          <img :src="buket.slika" :alt="buket.naziv" class="slika" />
        </div>

        <section class="informacije">
          <p class="oznaka">BILJNA BAJKA · BUKETI</p>

          <p class="kategorija">{{ buket.kategorija }}</p>

          <h1>{{ buket.naziv }}</h1>

          <p class="cena">{{ formatirajCenu(buket.cena) }}</p>

          <p class="opis">{{ buket.opis }}</p>

          <div class="podaci">
            <div>
              <span>Prilika</span>
              <strong>{{ buket.prilika }}</strong>
            </div>

            <div>
              <span>Boje</span>
              <strong>{{ buket.boje }}</strong>
            </div>

            <div>
              <span>Sastav buketa</span>
              <strong>{{ buket.brojCvetova }}</strong>
            </div>
          </div>

          <div class="akcije">
            <button class="dugme" type="button" @click="dodajBuket">
              {{ dodato ? 'Dodaj još jedan buket' : 'Dodaj u korpu' }}
              <span>＋</span>
            </button>

            <button
              v-if="dodato"
              class="dugme-korpa"
              type="button"
              @click="otvoriKorpu"
            >
              Pogledaj korpu <span>→</span>
            </button>
          </div>

          <div v-if="dodato" class="potvrda" role="status">
            <span class="potvrda-ikona">✓</span>
            <div>
              <strong>Buket je uspešno dodat u tvoju korpu!</strong>
              <p>
                Možeš da nastaviš sa izborom cveća ili pogledaš svoju korpu.
              </p>
            </div>
          </div>

          <p class="napomena">
            Izaberi buket koji će ulepšati nečiji poseban dan.
          </p>
        </section>
      </div>
    </div>

    <div v-else class="nije-pronadjen">
      <h1>Buket nije pronađen</h1>
      <p>Izabrani buket trenutno nije dostupan.</p>
      <RouterLink to="/buketi" class="dugme-link">
        Pogledaj sve bukete
      </RouterLink>
    </div>
  </main>
</template>

<style scoped src="../css/DetaljiBuketa.css"></style>
