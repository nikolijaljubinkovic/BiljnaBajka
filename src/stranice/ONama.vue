
<script setup lang="ts">
import { RouterLink } from 'vue-router'

import radnja from '../slike/radnja-biljna-bajka.jpg'
import buketi from '../slike/buketi-i-pokloni-o-nama.jpg'
import nega from '../slike/nega-biljaka-o-nama.jpg'
</script>

<template>
  <main class="o-nama">
    <section class="uvod">
      <div class="uvod-tekst">
        <span class="oznaka">DOBRO DOŠLI U BILJNU BAJKU</span>

        <h1>Mesto gde priroda pronalazi svoj dom.</h1>

        <p>
          Verujemo da i najmanji zeleni kutak može da unese
          toplinu, mir i posebnu čar u svakodnevni život.
          Zato smo stvorili mesto posvećeno biljkama,
          cveću i malim znacima pažnje.
        </p>
      </div>

      <div class="uvod-slika">
        <img :src="radnja" alt="Topao i zelen ambijent Biljne Bajke" />
        <div class="slika-potpis">
          <span>✳</span>
          Malo zelenila, mnogo ljubavi.
        </div>
      </div>
    </section>

    <section class="prica">
      <div class="prica-naslov">
        <span class="oznaka">KAKO JE SVE POČELO</span>
        <h2>Naša priča</h2>
        <div class="ukrasna-linija"></div>
      </div>

      <div class="prica-tekst">
        <p class="prica-uvod">
          Sve lepe priče počinju od male ideje.
        </p>

        <p>
          Biljna Bajka zamišljena je kao kutak u kojem se
          susreću ljubav prema prirodi, lepota zelenila
          i radost darivanja. Želeli smo da stvorimo
          mesto na kojem svako može da pronađe biljku
          za svoj dom ili poklon za nekoga posebnog.
        </p>

        <p>
          Verujemo da biljke nisu samo dekoracija.
          One unose život u prostor, podsećaju nas da
          usporimo i pokazuju nam koliko lepote može
          da se krije u malim, svakodnevnim stvarima.
        </p>

        <p>
          Upravo zato je Biljna Bajka više od kolekcije
          biljaka i buketa — ona je ideja o lepšem,
          zelenijem i pažljivije osmišljenom svakodnevnom
          životu.
        </p>
      </div>
    </section>

    <section class="ponuda">
      <div class="sekcija-naslov">
        <span class="oznaka">ONO ŠTO NAS INSPIRIŠE</span>
        <h2>Male stvari koje čine razliku.</h2>
        <p>
          Svaki zeleni list i svaki pažljivo odabran
          cvet deo su naše priče.
        </p>
      </div>

      <div class="ponuda-mreza">
        <article class="ponuda-kartica">
          <div class="kartica-slika">
            <img :src="radnja" alt="Zelene biljke u prijatnom ambijentu" />
          </div>
          <div class="kartica-tekst">
            <span class="kartica-broj">01 / ZELENILO</span>
            <h3>Biljke koje oplemenjuju dom</h3>
            <p>
              Pronađite biljku koja odgovara vašem
              prostoru, stilu i svakodnevici.
            </p>
            <RouterLink to="/katalog" class="tekst-link">
              Istražite biljke →
            </RouterLink>
          </div>
        </article>

        <article class="ponuda-kartica">
          <div class="kartica-slika">
            <img :src="buketi" alt="Pažljivo aranžiran buket cveća" />
          </div>
          <div class="kartica-tekst">
            <span class="kartica-broj">02 / DARIVANJE</span>
            <h3>Pokloni koji govore srcem</h3>
            <p>
              Mali znak pažnje može da pretvori
              običan dan u poseban trenutak.
            </p>
            <RouterLink to="/buketi" class="tekst-link">
              Otkrijte poklone →
            </RouterLink>
          </div>
        </article>

        <article class="ponuda-kartica">
          <div class="kartica-slika">
            <img :src="nega" alt="Pažljivo negovanje sobne biljke" />
          </div>
          <div class="kartica-tekst">
            <span class="kartica-broj">03 / PAŽNJA</span>
            <h3>Rast uz pravu negu</h3>
            <p>
              Uz malo pažnje i odgovarajuću negu,
              biljke mogu dugo da ulepšavaju vaš dom.
            </p>
            <RouterLink to="/nega" class="tekst-link">
              Saveti za negu →
            </RouterLink>
          </div>
        </article>
      </div>
    </section>

    <section class="vrednosti">
      <div class="vrednosti-naslov">
        <span class="oznaka">NAŠE VREDNOSTI</span>
        <h2>U šta verujemo</h2>
      </div>

      <div class="vrednosti-mreza">
        <article class="vrednost">
          <span class="vrednost-ikona">✳</span>
          <h3>Ljubav prema prirodi</h3>
          <p>
            Verujemo u lepotu zelenila i male promene
            koje priroda unosi u naš život.
          </p>
        </article>

        <article class="vrednost">
          <span class="vrednost-ikona">♡</span>
          <h3>Pažnja prema detaljima</h3>
          <p>
            Svaki izbor treba da bude pažljiv,
            smislen i prilagođen osobi kojoj je namenjen.
          </p>
        </article>

        <article class="vrednost">
          <span class="vrednost-ikona">❋</span>
          <h3>Radost darivanja</h3>
          <p>
            Najlepši pokloni nisu samo stvari,
            već uspomene i osećanja koja nose.
          </p>
        </article>
      </div>
    </section>

    <section class="zavrsni">
      <div class="zavrsni-sadrzaj">
        <span class="oznaka">VAŠ ZELENI KUTAK</span>
        <h2>Svaka biljka ima svoju priču. Pronađite svoju.</h2>
        <p>
          Zavirite u našu kolekciju i pronađite
          nešto što će vašem prostoru dati novi život.
        </p>
        <RouterLink to="/katalog" class="dugme dugme-svetli">
          Istražite kolekciju <span>→</span>
        </RouterLink>
      </div>
      <div class="zavrsni-dekor">b</div>
    </section>
  </main>
</template>

<style scoped src="../css/ONama.css"></style>
