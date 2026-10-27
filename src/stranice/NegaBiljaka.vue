
<script setup lang="ts">
import uvodBiljke from '../slike/uvod-biljke.jpg'
import zalivanje from '../slike/zalivanje.jpg'
import svetlost from '../slike/svetlost.jpg'
import presadjivanje from '../slike/presadjivanje.jpg'
import zutiListovi from '../slike/zuti-listovi.jpg'
import negaListova from '../slike/nega-listova.jpg'
</script>

<template>
  <main class="nega-stranica">
    <section class="uvod">
      <div class="uvod-tekst">
        <span class="oznaka">BILJNA BAJKA · VODIČ ZA NEGU</span>

        <h1>Da tvoje biljke<br />rastu srećno.</h1>

        <p>
          Malo pažnje, prava nega i razumevanje potreba biljaka
          dovoljni su da tvoj zeleni kutak zablista.
        </p>

        <div class="uvod-napomena">
          <span class="list-ikona">✳</span>
          <span>Praktični saveti za svaki dan</span>
        </div>
      </div>

      <img
        :src="uvodBiljke"
        alt="Sobne biljke u prirodnom svetlu"
        class="uvod-slika"
      />
    </section>

    <section class="pregled">
      <div class="pregled-naslov">
        <span class="oznaka">ZELENI PODSETNIK</span>
        <h2>Četiri osnove zdrave biljke</h2>
      </div>

      <div class="osnove">
        <article class="osnova">
          <span class="broj">01</span>
          <h3>Voda</h3>
          <p>Zalivaj prema potrebama biljke, a ne samo prema rasporedu.</p>
        </article>

        <article class="osnova">
          <span class="broj">02</span>
          <h3>Svetlost</h3>
          <p>Pronađi mesto koje odgovara vrsti i njenim listovima.</p>
        </article>

        <article class="osnova">
          <span class="broj">03</span>
          <h3>Zemlja</h3>
          <p>Obezbedi odgovarajući supstrat i dobru drenažu.</p>
        </article>

        <article class="osnova">
          <span class="broj">04</span>
          <h3>Pažnja</h3>
          <p>Redovno pregledaj biljku i prati promene u njenom izgledu.</p>
        </article>
      </div>
    </section>

    <section class="sekcija">
      <div class="sekcija-tekst">
        <span class="oznaka">01 · VODA I VLAŽNOST</span>
        <h2>Pravilno zalivanje</h2>

        <p>
          Svaka biljka ima drugačije potrebe za vodom. Na učestalost
          zalivanja utiču vrsta biljke, veličina saksije, temperatura
          i količina svetlosti.
        </p>

        <h3>Kako da znaš kada je vreme?</h3>
        <ul>
          <li>Proveri vlažnost zemlje prstom pre zalivanja.</li>
          <li>Zalivaj polako i ravnomerno po površini zemlje.</li>
          <li>Koristi saksiju sa otvorima za odvod viška vode.</li>
          <li>Isprazni podmetač ako se u njemu zadržava voda.</li>
        </ul>

        <div class="savet">
          <strong>Važno je da znaš</strong>
          <p>
            Previše vode može dovesti do truljenja korena.
            Nemoj zalivati biljku ponovo dok je zemlja još previše vlažna.
          </p>
        </div>
      </div>

      <div class="sekcija-fotografija">
        <img :src="zalivanje" alt="Zalivanje sobne biljke" />
        <span>Voda je važna, ali je prava mera još važnija.</span>
      </div>
    </section>

    <section class="sekcija obrnuta">
      <div class="sekcija-tekst">
        <span class="oznaka">02 · SVETLOST I POLOŽAJ</span>
        <h2>Pronađi pravo mesto</h2>

        <p>
          Svetlost utiče na rast, boju i izgled listova.
          Nisu svim biljkama potrebni direktni sunčevi zraci.
        </p>

        <div class="stavka">
          <span class="stavka-broj">A</span>
          <div>
            <h3>Jaka indirektna svetlost</h3>
            <p>
              Mnoge tropske sobne biljke dobro uspevaju u svetloj
              prostoriji, zaštićene od jakog direktnog sunca.
            </p>
          </div>
        </div>

        <div class="stavka">
          <span class="stavka-broj">B</span>
          <div>
            <h3>Direktno sunce</h3>
            <p>
              Odgovara nekim vrstama, ali može izazvati opekotine
              na listovima biljaka koje ga ne podnose.
            </p>
          </div>
        </div>

        <div class="stavka">
          <span class="stavka-broj">C</span>
          <div>
            <h3>Slabije osvetljenje</h3>
            <p>
              Rast može biti sporiji. Slabije svetlo ne znači da je
              svaka biljka pogodna za takvo mesto.
            </p>
          </div>
        </div>

        <div class="savet">
          <strong>Prati izgled listova</strong>
          <p>
            Izdužene stabljike, slab rast ili blede boje mogu biti
            znak da biljka ne dobija odgovarajuću količinu svetlosti.
          </p>
        </div>
      </div>

      <div class="sekcija-fotografija">
        <img :src="svetlost" alt="Biljka pored svetlog prozora" />
        <span>Dobro odabrano mesto pomaže zdravom rastu.</span>
      </div>
    </section>

    <section class="sekcija">
      <div class="sekcija-tekst">
        <span class="oznaka">03 · ZEMLJA I SAKSIJE</span>
        <h2>Prostor za novi rast</h2>

        <p>
          Korenima su potrebni prostor, vazduh i odgovarajuća
          količina vlage. Dobar supstrat i pravilna saksija
          pomažu biljci da se razvija.
        </p>

        <h3>Kada je vreme za presađivanje?</h3>
        <ul>
          <li>Kada korenje izlazi kroz drenažne otvore.</li>
          <li>Kada se zemlja neuobičajeno brzo suši.</li>
          <li>Kada je supstrat zbijen i slabo propušta vodu.</li>
          <li>Kada biljka preraste postojeću saksiju.</li>
        </ul>

        <h3>Kako pravilno presaditi biljku?</h3>
        <p>
          Izaberi saksiju malo veću od prethodne, sa drenažnim
          otvorima. Koristi supstrat prilagođen vrsti biljke i
          pažljivo rukuj korenjem.
        </p>

        <div class="savet">
          <strong>Ne biraj preveliku saksiju</strong>
          <p>
            Prevelika količina zemlje može dugo zadržavati vlagu,
            što povećava rizik od problema sa korenom.
          </p>
        </div>
      </div>

      <div class="sekcija-fotografija">
        <img :src="presadjivanje" alt="Presađivanje biljke u novu saksiju" />
        <span>Dobra zemlja i drenaža temelj su zdravog korena.</span>
      </div>
    </section>

    <section class="prihrana">
      <div>
        <span class="oznaka">04 · HRANLJIVE MATERIJE</span>
        <h2>Prihrana za zdrav rast</h2>
        <p>
          Đubrivo dopunjuje hranljive materije koje su biljci potrebne.
          Izaberi proizvod prema vrsti biljke i uvek prati uputstvo
          za doziranje.
        </p>
      </div>

      <div class="prihrana-pravila">
        <div>
          <span>01</span>
          <p>Prihranjuj tokom aktivnog rasta, kada je to prikladno za vrstu.</p>
        </div>
        <div>
          <span>02</span>
          <p>Ne povećavaj dozu u nadi da će biljka brže rasti.</p>
        </div>
        <div>
          <span>03</span>
          <p>Smanji ili obustavi prihranu tokom mirovanja ako vrsta to zahteva.</p>
        </div>
        <div>
          <span>04</span>
          <p>Ne prihranjuj bolesnu biljku dok ne utvrdiš uzrok problema.</p>
        </div>
      </div>
    </section>

    <section class="problemi">
      <div class="naslov-problema">
        <span class="oznaka">05 · PREPOZNAJ PROMENE</span>
        <h2>Kada biljka traži pomoć</h2>
        <p>
          Promena na listovima može imati više uzroka.
          Proveri stanje zemlje, korena, svetlosti i prisustvo štetočina.
        </p>
      </div>

      <div class="problem-red">
        <img :src="zutiListovi" alt="Listovi sa žutim promenama" />
        <div>
          <h3>Žuti listovi</h3>
          <p>
            Mogu biti povezani sa prekomernim zalivanjem, lošom
            drenažom, nedostatkom svetlosti ili prirodnim starenjem.
          </p>
          <strong>Šta da uradiš:</strong>
          <p>Proveri vlagu zemlje i pregledaj ostale listove pre nego što promeniš negu.</p>
        </div>
      </div>

      <div class="problem-red">
        <img :src="negaListova" alt="Zeleni listovi sobne biljke" />
        <div>
          <h3>Suvi vrhovi i ivice listova</h3>
          <p>
            Mogu biti posledica nepravilnog zalivanja, nakupljenih
            soli u zemlji, kvaliteta vode ili uslova u prostoriji.
          </p>
          <strong>Šta da uradiš:</strong>
          <p>Proveri zemlju, uslove u prostoriji i način prihrane.</p>
        </div>
      </div>

      <div class="problem-red">
        <div class="problem-ikona">✳</div>
        <div>
          <h3>Tačkice, mrežice ili sitni insekti</h3>
          <p>
            Pregledaj naličje listova, mlade izdanke i stabljike.
            Neke štetočine su veoma sitne i teško se primećuju.
          </p>
          <strong>Šta da uradiš:</strong>
          <p>
            Odvoji biljku od ostalih i utvrdi vrstu štetočine
            pre nego što odabereš odgovarajući tretman.
          </p>
        </div>
      </div>
    </section>

    <section class="sezone">
      <span class="oznaka">06 · NEGA TOKOM GODINE</span>
      <h2>Prilagodi negu godišnjem dobu</h2>

      <div class="sezone-mreza">
        <article>
          <span class="sezona-ikona">✿</span>
          <h3>Proleće</h3>
          <p>
            Prati pojavu novog rasta. Po potrebi presadi biljku
            i postepeno prilagodi prihranu.
          </p>
        </article>

        <article>
          <span class="sezona-ikona">☀</span>
          <h3>Leto</h3>
          <p>
            Češće proveravaj vlažnost zemlje jer toplota može
            ubrzati njeno sušenje.
          </p>
        </article>

        <article>
          <span class="sezona-ikona">❧</span>
          <h3>Jesen</h3>
          <p>
            Prati promene u svetlosti i temperaturi.
            Prilagodi zalivanje sporijem rastu.
          </p>
        </article>

        <article>
          <span class="sezona-ikona">❄</span>
          <h3>Zima</h3>
          <p>
            Zaštiti biljke od hladnog promajnog vazduha
            i ne preteruj sa zalivanjem i prihranom.
          </p>
        </article>
      </div>
    </section>

    <section class="rutina">
      <div class="rutina-naslov">
        <span class="oznaka">TVOJ MALI PODSETNIK</span>
        <h2>Jednostavna rutina za svaki dan</h2>
        <p>
          Ne moraš stalno nešto da radiš. Važno je da redovno
          posmatraš biljke i reaguješ kada im je potrebna pomoć.
        </p>
      </div>

      <div class="rutina-lista">
        <p><span>✓</span> Proveri stanje zemlje pre zalivanja.</p>
        <p><span>✓</span> Obrati pažnju na boju i izgled listova.</p>
        <p><span>✓</span> Ukloni suve delove čistim makazama.</p>
        <p><span>✓</span> Povremeno pregledaj biljke zbog štetočina.</p>
        <p><span>✓</span> Prilagodi negu vrsti i godišnjem dobu.</p>
      </div>
    </section>

    <footer class="zavrsna">
      <span class="zavrsni-list">✳</span>
      <h2>Malo pažnje, mnogo zelenila.</h2>
      <p>
        Upoznaj svoju biljku, posmatraj njen rast i pruži joj
        ono što joj je zaista potrebno.
      </p>
      <span class="potpis">Sa ljubavlju, Biljna Bajka</span>
    </footer>
  </main>
</template>

<style scoped src="../css/NegaBiljaka.css"></style>
