
<script setup lang="ts">
import { RouterLink } from 'vue-router'

import uvodnaBiljka from '../slike/uvodna-biljka.jpg'
import biljkeZaProstor from '../slike/biljke-za-prostor.jpg'
import buketiIPokloni from '../slike/buketi-i-pokloni.jpg'
import negaBiljaka from '../slike/nega-biljaka.jpg'
</script>

<template>
  <main class="pocetna">
    <!-- UVODNI DEO -->
    <section class="uvod">
      <div class="uvodna-pozadina"></div>

      <div class="uvod-tekst">
        <p class="uvodna-oznaka">
          <span class="oznaka-linija"></span>
          VAŠ MALI BOTANIČKI SVET
        </p>

        <h1>
          Priroda koja<br />
          prostoru daje<br />
          <span>dušu.</span>
        </h1>

        <p class="uvodni-opis">
          Posebne biljke, pažljivo birani cvetni aranžmani
          i pokloni koji unose toplinu u svaki trenutak.
        </p>

        <div class="uvodna-dugmad">
          <RouterLink to="/katalog" class="dugme-glavno">
            Istražite kolekciju
            <span>↗</span>
          </RouterLink>
        </div>

        <div class="uvodne-prednosti">
          <div class="prednost">
            <span class="prednost-broj">01</span>
            <span>Pažljivo odabrane biljke</span>
          </div>

          <div class="prednost">
            <span class="prednost-broj">02</span>
            <span>Pokloni sa posebnom pričom</span>
          </div>
        </div>
      </div>

      <div class="uvod-slika">
        <RouterLink
          to="/katalog"
          class="slika-okvir"
          aria-label="Pogledajte katalog biljaka"
        >
          <img
            :src="uvodnaBiljka"
            alt="Dekorativna zelena biljka u elegantnoj saksiji"
          />
        </RouterLink>

        <div class="slika-ukras ukras-gore"></div>
        <div class="slika-ukras ukras-dole"></div>

        <div class="plocica-slika">
          <span class="plocica-simbol">✳</span>
          <div>
            <p>UNESITE PRIRODU U DOM</p>
            <span>Pronađite svoju biljku.</span>
          </div>
        </div>
      </div>
    </section>

    <!-- KATEGORIJE -->
    <section class="kategorije">
      <div class="naslov-kategorija">
        <p class="mala-oznaka">OTKRIJTE NAŠ SVET</p>
        <h2>Pronađite nešto posebno.</h2>
      </div>

      <div class="kategorije-mreza">
        <RouterLink to="/katalog" class="kategorija">
          <div class="kategorija-slika">
            <img
              :src="biljkeZaProstor"
              alt="Zelene biljke za uređenje enterijera"
            />
            <span class="kategorija-broj">01</span>
          </div>

          <div class="kategorija-tekst">
            <div>
              <h3>Biljke za vaš prostor</h3>
              <p>Pronađite novu zelenu omiljenu biljku.</p>
            </div>
            <span class="kategorija-strelica">↗</span>
          </div>
        </RouterLink>

        <RouterLink to="/buketi" class="kategorija">
          <div class="kategorija-slika">
            <img
              :src="buketiIPokloni"
              alt="Pažljivo aranžirani buketi i cveće"
            />
            <span class="kategorija-broj">02</span>
          </div>

          <div class="kategorija-tekst">
            <div>
              <h3>Buketi i pokloni</h3>
              <p>Mali znak pažnje koji govori mnogo.</p>
            </div>
            <span class="kategorija-strelica">↗</span>
          </div>
        </RouterLink>

        <RouterLink to="/nega" class="kategorija">
          <div class="kategorija-slika">
            <img
              :src="negaBiljaka"
              alt="Nega i uzgajanje biljaka"
            />
            <span class="kategorija-broj">03</span>
          </div>

          <div class="kategorija-tekst">
            <div>
              <h3>Nega biljaka</h3>
              <p>Sve što je potrebno za zdrav rast.</p>
            </div>
            <span class="kategorija-strelica">↗</span>
          </div>
        </RouterLink>
      </div>
    </section>
  </main>
</template>

<style scoped src="../css/UvodnaSekcija.css"></style>
