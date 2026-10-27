
<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { daLiJePrijavljen } from '../podaci/autentifikacija'
import {
  stavkeKorpe,
  promeniKolicinu,
  ukloniIzKorpe,
} from '../podaci/korpa'
import {
  mojeRezervacije,
  promeniStatusRezervacije,
  promeniKolicinuRezervacije,
  obrisiRezervaciju,
  oceniRezervaciju,
  type Rezervacija,
  type StatusRezervacije,
} from '../podaci/rezervacije'
import {
  mojePorudzbine,
  kreirajPorudzbinu,
  promeniStatusPorudzbine,
  oznaciPorudzbinuKaoPristiglu,
  oceniStavkuPorudzbine,
  type Porudzbina,
  type StavkaPorudzbine,
  type StatusPorudzbine,
} from '../podaci/porudzbine'

const router = useRouter()

const porudzbineKorisnika = computed(() => mojePorudzbine())

// Sprečava da se već kupljene biljke ponovo prikazuju u korpi.
const povezaneRezervacije = computed(() => {
  const ids = porudzbineKorisnika.value.flatMap(p =>
    p.stavke
      .map(s => s.rezervacijaId)
      .filter((id): id is string => Boolean(id)),
  )

  return new Set(ids)
})

const biljkeRezervisane = computed(() =>
  mojeRezervacije().filter(
    stavka =>
      stavka.tip === 'biljka' &&
      !povezaneRezervacije.value.has(stavka.id),
  ),
)

const buketiUKorpi = computed(() =>
  stavkeKorpe.filter(stavka => stavka.tip === 'buket'),
)

const aktivneBiljke = computed(() =>
  biljkeRezervisane.value.filter(
    stavka => stavka.status === 'rezervisano',
  ),
)

const brojBiljaka = computed(() =>
  aktivneBiljke.value.reduce(
    (zbir, stavka) => zbir + stavka.kolicina,
    0,
  ),
)

const brojBuketa = computed(() =>
  buketiUKorpi.value.reduce(
    (zbir, stavka) => zbir + stavka.kolicina,
    0,
  ),
)

const ukupnaCenaBiljaka = computed(() =>
  aktivneBiljke.value.reduce(
    (zbir, stavka) => zbir + stavka.cena * stavka.kolicina,
    0,
  ),
)

const ukupnaCenaBuketa = computed(() =>
  buketiUKorpi.value.reduce(
    (zbir, stavka) => zbir + stavka.cena * stavka.kolicina,
    0,
  ),
)

const ukupno = computed(
  () => ukupnaCenaBiljaka.value + ukupnaCenaBuketa.value,
)

const imaBiljaka = computed(
  () => biljkeRezervisane.value.length > 0,
)

const imaBuketa = computed(
  () => buketiUKorpi.value.length > 0,
)

const imaAktivnihArtikala = computed(
  () => brojBiljaka.value > 0 || brojBuketa.value > 0,
)

function formatirajCenu(cena: number): string {
  return `${cena.toLocaleString('sr-RS')} RSD`
}

function formatirajDatum(datum: string): string {
  const vrednost = new Date(datum)

  if (Number.isNaN(vrednost.getTime())) {
    return 'Datum nije dostupan'
  }

  return new Intl.DateTimeFormat('sr-RS', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(vrednost)
}

function tekstStatusaRezervacije(
  status: StatusRezervacije,
): string {
  const nazivi: Record<StatusRezervacije, string> = {
    rezervisano: 'Rezervisano',
    pristiglo: 'Pristiglo',
    otkazano: 'Otkazano',
  }

  return nazivi[status]
}

function tekstStatusaPorudzbine(
  status: StatusPorudzbine,
): string {
  const nazivi: Record<StatusPorudzbine, string> = {
    potvrdjena: 'Potvrđena',
    u_pripremi: 'U pripremi',
    pristiglo: 'Pristiglo',
    otkazano: 'Otkazano',
  }

  return nazivi[status]
}

// Funkcije za rezervisane biljke

function promeniBrojBiljaka(
  stavka: Rezervacija,
  kolicina: number,
) {
  const rezultat = promeniKolicinuRezervacije(stavka.id, kolicina)

  if (!rezultat.uspeh) {
    window.alert(rezultat.poruka)
  }
}

function otkaziRezervaciju(stavka: Rezervacija) {
  if (
    !window.confirm(
      `Da li želiš da otkažeš rezervaciju za „${stavka.naziv}“?`,
    )
  ) {
    return
  }

  const rezultat = promeniStatusRezervacije(stavka.id, 'otkazano')
  window.alert(rezultat.poruka)
}

function ukloniRezervacijuBiljke(stavka: Rezervacija) {
  if (
    !window.confirm(
      `Da li želiš da ukloniš rezervaciju za „${stavka.naziv}“?`,
    )
  ) {
    return
  }

  const rezultat = obrisiRezervaciju(stavka.id)
  window.alert(rezultat.poruka)
}

function oceniBiljku(
  stavka: Rezervacija,
  ocena: number,
) {
  const rezultat = oceniRezervaciju(stavka.id, ocena)
  window.alert(rezultat.poruka)
}

// Funkcije za bukete

function promeniBrojBuketa(id: string, kolicina: number) {
  promeniKolicinu(id, 'buket', kolicina)
}

function ukloniBuket(id: string, naziv: string) {
  if (
    !window.confirm(
      `Da li želiš da ukloniš buket „${naziv}“ iz korpe?`,
    )
  ) {
    return
  }

  ukloniIzKorpe(id, 'buket')
}

// Simulacija plaćanja — ne vrši se stvarna naplata.

function nastaviNaPlacanje() {
  if (!daLiJePrijavljen()) {
    router.push({
      path: '/prijava',
      query: { redirect: '/korpa' },
    })
    return
  }

  if (!imaAktivnihArtikala.value) {
    window.alert('Korpa je prazna. Dodaj artikal pre kupovine.')
    return
  }

  const potvrda = window.confirm(
    `SIMULACIJA PLAĆANJA\n\n` +
    `Ukupan iznos: ${formatirajCenu(ukupno.value)}\n\n` +
    `Potvrdi kupovinu. Neće biti izvršena stvarna naplata.`,
  )

  if (!potvrda) return

  const rezultat = kreirajPorudzbinu()
  window.alert(rezultat.poruka)
}

// Funkcije za istoriju porudžbina

function otkaziPorudzbinu(porudzbina: Porudzbina) {
  if (
    !window.confirm(
      `Da li želiš da otkažeš porudžbinu ${porudzbina.broj}?`,
    )
  ) {
    return
  }

  const rezultat = promeniStatusPorudzbine(
    porudzbina.id,
    'otkazano',
  )

  window.alert(rezultat.poruka)
}

function staviUPripremu(porudzbina: Porudzbina) {
  const rezultat = promeniStatusPorudzbine(
    porudzbina.id,
    'u_pripremi',
  )

  window.alert(rezultat.poruka)
}

function simulirajPristizanje(porudzbina: Porudzbina) {
  const rezultat = oznaciPorudzbinuKaoPristiglu(porudzbina.id)
  window.alert(rezultat.poruka)
}

function oceniStavku(
  porudzbina: Porudzbina,
  stavka: StavkaPorudzbine,
  ocena: number,
) {
  const rezultat = oceniStavkuPorudzbine(
    porudzbina.id,
    stavka.id,
    ocena,
  )

  window.alert(rezultat.poruka)
}
</script>

<template>
  <main class="stranica-korpe">
    <header class="zaglavlje-stranice">
      <p class="nadnaslov">TVOJ IZBOR, TVOJA ZELENA PRIČA</p>
      <h1>Moja korpa</h1>
      <p class="uvod">
        Tvoje omiljene biljke i buketi, spremni za sledeći korak.
      </p>
    </header>

    <div
      class="raspored-korpe"
      :class="{ 'korpa-prazna': !imaAktivnihArtikala }"
    >
      <div class="artikli-korpe">
        <!-- REZERVISANE BILJKE -->
        <section
          v-if="daLiJePrijavljen() && imaBiljaka"
          class="sekcija-korpe"
        >
          <div class="naslov-stavki">
            <div>
              <p class="oznaka-sekcije">TVOJ ZELENI IZBOR</p>
              <h2>Rezervisane biljke</h2>
            </div>
            <span class="broj-rezervacija">
              {{ biljkeRezervisane.length }}
              {{ biljkeRezervisane.length === 1 ? 'stavka' : 'stavki' }}
            </span>
          </div>

          <article
            v-for="stavka in biljkeRezervisane"
            :key="stavka.id"
            class="stavka"
            :class="{ 'stavka-otkazana': stavka.status === 'otkazano' }"
          >
            <img
              :src="stavka.slika"
              :alt="stavka.naziv"
              class="slika-proizvoda"
            />

            <div class="detalji">
              <span class="tip-proizvoda">BILJKA</span>
              <h3>{{ stavka.naziv }}</h3>

              <span
                class="status"
                :class="`status-${stavka.status}`"
              >
                {{ tekstStatusaRezervacije(stavka.status) }}
              </span>

              <p class="datum">
                Rezervisano: {{ formatirajDatum(stavka.datumRezervacije) }}
              </p>

              <p class="cena-jedinice">
                {{ formatirajCenu(stavka.cena) }} / kom.
              </p>

              <div
                v-if="stavka.status === 'rezervisano'"
                class="kontrole"
              >
                <button
                  type="button"
                  :disabled="stavka.kolicina <= 1"
                  :aria-label="`Smanji količinu za ${stavka.naziv}`"
                  @click="promeniBrojBiljaka(stavka, stavka.kolicina - 1)"
                >
                  −
                </button>

                <span>{{ stavka.kolicina }}</span>

                <button
                  type="button"
                  :aria-label="`Povećaj količinu za ${stavka.naziv}`"
                  @click="promeniBrojBiljaka(stavka, stavka.kolicina + 1)"
                >
                  +
                </button>
              </div>

              <p v-else class="kolicina-fiksna">
                Količina: {{ stavka.kolicina }}
              </p>
            </div>

            <div class="desna-strana">
              <strong
                class="cena-stavke"
                :class="{ 'cena-precrtana': stavka.status === 'otkazano' }"
              >
                {{ formatirajCenu(stavka.cena * stavka.kolicina) }}
              </strong>

              <button
                v-if="stavka.status === 'rezervisano'"
                type="button"
                class="ukloni"
                @click="otkaziRezervaciju(stavka)"
              >
                Otkaži rezervaciju
              </button>

              <button
                v-if="stavka.status === 'pristiglo'"
                type="button"
                class="ukloni"
                @click="ukloniRezervacijuBiljke(stavka)"
              >
                Ukloni rezervaciju
              </button>
            </div>

            <div
              v-if="stavka.status === 'pristiglo'"
              class="ocenjivanje"
            >
              <p class="naslov-ocene">
                {{ stavka.ocena ? 'Tvoja ocena' : 'Oceni ovu biljku' }}
              </p>

              <div class="zvezdice">
                <button
                  v-for="zvezda in 5"
                  :key="zvezda"
                  type="button"
                  :class="{
                    izabrana: !!stavka.ocena && zvezda <= stavka.ocena,
                  }"
                  :aria-label="`Oceni sa ${zvezda} od 5 zvezdica`"
                  @click="oceniBiljku(stavka, zvezda)"
                >
                  ★
                </button>
              </div>

              <p v-if="stavka.ocena" class="postojeca-ocena">
                Sačuvala si ocenu: {{ stavka.ocena }}/5
              </p>
            </div>

            <p
              v-if="stavka.status === 'otkazano'"
              class="poruka-otkazivanja"
            >
              Ova rezervacija je otkazana i ne ulazi u ukupan iznos.
            </p>
          </article>
        </section>

        <!-- BUKETI -->
        <section v-if="imaBuketa" class="sekcija-korpe">
          <div class="naslov-stavki">
            <div>
              <p class="oznaka-sekcije">TVOJ CVETNI IZBOR</p>
              <h2>Buketi u korpi</h2>
            </div>
            <span class="broj-rezervacija">
              {{ brojBuketa }}
              {{ brojBuketa === 1 ? 'buket' : 'buketa' }}
            </span>
          </div>

          <article
            v-for="buket in buketiUKorpi"
            :key="`buket-${buket.id}`"
            class="stavka"
          >
            <img
              :src="buket.slika"
              :alt="buket.naziv"
              class="slika-proizvoda"
            />

            <div class="detalji">
              <span class="tip-proizvoda">BUKET</span>
              <h3>{{ buket.naziv }}</h3>

              <p class="cena-jedinice">
                {{ formatirajCenu(buket.cena) }} / kom.
              </p>

              <div class="kontrole">
                <button
                  type="button"
                  :disabled="buket.kolicina <= 1"
                  :aria-label="`Smanji količinu za ${buket.naziv}`"
                  @click="promeniBrojBuketa(buket.id, buket.kolicina - 1)"
                >
                  −
                </button>

                <span>{{ buket.kolicina }}</span>

                <button
                  type="button"
                  :aria-label="`Povećaj količinu za ${buket.naziv}`"
                  @click="promeniBrojBuketa(buket.id, buket.kolicina + 1)"
                >
                  +
                </button>
              </div>
            </div>

            <div class="desna-strana">
              <strong class="cena-stavke">
                {{ formatirajCenu(buket.cena * buket.kolicina) }}
              </strong>

              <button
                type="button"
                class="ukloni"
                @click="ukloniBuket(buket.id, buket.naziv)"
              >
                Ukloni buket
              </button>
            </div>
          </article>
        </section>

        <!-- PRAZNA KORPA -->
        <section
          v-if="!imaAktivnihArtikala"
          class="prazna-korpa"
        >
          <div class="ikona">❀</div>
          <h2>Korpa je trenutno prazna</h2>
          <p>
            Pronađi biljku koja će ulepšati tvoj prostor ili buket
            kojim ćeš nekoga obradovati.
          </p>

          <div class="dugmad">
            <RouterLink to="/katalog" class="dugme-glavno">
              Pogledaj biljke
            </RouterLink>

            <RouterLink to="/buketi" class="dugme-sporedno">
              Istraži bukete
            </RouterLink>
          </div>
        </section>
      </div>

      <!-- OBRAČUN SA DESNE STRANE -->
      <aside
        v-if="imaAktivnihArtikala"
        class="rezime"
      >
        <p class="oznaka-sekcije">TVOJA PORUDŽBINA</p>
        <h2>Pregled kupovine</h2>

        <div class="red-rezimea">
          <span>Biljke</span>
          <span>{{ brojBiljaka }}</span>
        </div>

        <div class="red-rezimea">
          <span>Buketi</span>
          <span>{{ brojBuketa }}</span>
        </div>

        <div class="red-rezimea">
          <span>Vrednost biljaka</span>
          <span>{{ formatirajCenu(ukupnaCenaBiljaka) }}</span>
        </div>

        <div class="red-rezimea">
          <span>Vrednost buketa</span>
          <span>{{ formatirajCenu(ukupnaCenaBuketa) }}</span>
        </div>

        <div class="ukupno">
          <span>Ukupno za plaćanje</span>
          <strong>{{ formatirajCenu(ukupno) }}</strong>
        </div>

        <button
          type="button"
          class="dugme-glavno dugme-placanje"
          @click="nastaviNaPlacanje"
        >
          Nastavi na plaćanje
        </button>

        <p class="napomena">
          Plaćanje je simulirano. Neće biti naplaćen stvarni novac.
        </p>

        <RouterLink to="/katalog" class="nastavi-razgledanje">
          Nastavi razgledanje
        </RouterLink>
      </aside>
    </div>

    <!-- ISTORIJA PORUDŽBINA -->
    <section
      v-if="daLiJePrijavljen() && porudzbineKorisnika.length"
      class="istorija"
    >
      <div class="zaglavlje-istorije">
        <p class="oznaka-sekcije">TVOJE KUPOVINE</p>
        <h2>Prethodne porudžbine</h2>
        <p>Pregled statusa, detalja i ocena tvojih porudžbina.</p>
      </div>

      <article
        v-for="porudzbina in porudzbineKorisnika"
        :key="porudzbina.id"
        class="kartica-porudzbine"
      >
        <div class="zaglavlje-porudzbine">
          <div>
            <span class="broj-porudzbine">
              Porudžbina {{ porudzbina.broj }}
            </span>
            <p class="datum">
              Datum kupovine: {{ formatirajDatum(porudzbina.datum) }}
            </p>
          </div>

          <span
            class="status"
            :class="`status-${porudzbina.status}`"
          >
            {{ tekstStatusaPorudzbine(porudzbina.status) }}
          </span>
        </div>

        <div
          v-for="stavka in porudzbina.stavke"
          :key="stavka.id"
          class="stavka-istorije"
        >
          <img
            :src="stavka.slika"
            :alt="stavka.naziv"
            class="slika-istorije"
          />

          <div class="detalji-istorije">
            <h3>{{ stavka.naziv }}</h3>
            <p>
              {{ stavka.tip === 'biljka' ? 'Biljka' : 'Buket' }}
              · Količina: {{ stavka.kolicina }}
            </p>
            <span class="cena-jedinice">
              {{ formatirajCenu(stavka.cena) }} / kom.
            </span>

            <div
              v-if="
                porudzbina.status === 'pristiglo' &&
                stavka.tip === 'biljka'
              "
              class="ocenjivanje ocena-istorije"
            >
              <p class="naslov-ocene">
                {{ stavka.ocena ? 'Tvoja ocena' : 'Oceni biljku' }}
              </p>

              <div class="zvezdice">
                <button
                  v-for="zvezda in 5"
                  :key="zvezda"
                  type="button"
                  :class="{
                    izabrana: !!stavka.ocena && zvezda <= stavka.ocena,
                  }"
                  :aria-label="`Oceni sa ${zvezda} od 5 zvezdica`"
                  @click="oceniStavku(porudzbina, stavka, zvezda)"
                >
                  ★
                </button>
              </div>

              <p v-if="stavka.ocena" class="postojeca-ocena">
                Sačuvana ocena: {{ stavka.ocena }}/5
              </p>
            </div>
          </div>

          <strong class="cena-stavke">
            {{ formatirajCenu(stavka.cena * stavka.kolicina) }}
          </strong>
        </div>

        <div class="ukupno-porudzbine">
          <span>Ukupna vrednost</span>
          <strong>{{ formatirajCenu(porudzbina.ukupno) }}</strong>
        </div>

        <div
          v-if="
            porudzbina.status === 'potvrdjena' ||
            porudzbina.status === 'u_pripremi'
          "
          class="akcije-porudzbine"
        >
          <button
            v-if="porudzbina.status === 'potvrdjena'"
            type="button"
            class="dugme-sporedno"
            @click="staviUPripremu(porudzbina)"
          >
            Simuliraj pripremu
          </button>

          <button
            type="button"
            class="dugme-sporedno"
            @click="simulirajPristizanje(porudzbina)"
          >
            Simuliraj pristizanje
          </button>

          <button
            type="button"
            class="dugme-otkazi"
            @click="otkaziPorudzbinu(porudzbina)"
          >
            Otkaži porudžbinu
          </button>
        </div>

        <p
          v-if="porudzbina.status === 'otkazano'"
          class="poruka-otkazivanja"
        >
          Ova porudžbina je otkazana.
        </p>
      </article>
    </section>
  </main>
</template>

<style scoped src="../css/KorpaRezervacija.css"></style>
