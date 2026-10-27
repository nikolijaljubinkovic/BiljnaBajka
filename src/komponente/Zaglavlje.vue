
<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

const meniOtvoren = ref(false)

function zatvoriMeni() {
  meniOtvoren.value = false
}
</script>

<template>
  <header class="zaglavlje">
    <RouterLink
      to="/"
      class="brend"
      aria-label="Biljna Bajka — početna stranica"
      @click="zatvoriMeni"
    >
      <span class="brend-simbol">B.</span>

      <span class="brend-tekst">
        <span class="brend-naziv">Biljna Bajka</span>
        <span class="brend-opis">BILJKE · CVEĆE · POKLONI</span>
      </span>
    </RouterLink>

    <button
      class="dugme-menija"
      type="button"
      :aria-expanded="meniOtvoren"
      aria-label="Otvori ili zatvori meni"
      @click="meniOtvoren = !meniOtvoren"
    >
      <span></span>
      <span></span>
    </button>

    <nav
      class="navigacija"
      :class="{ 'navigacija-otvorena': meniOtvoren }"
      aria-label="Glavna navigacija"
    >
      <RouterLink
        to="/"
        class="stavka"
        @click="zatvoriMeni"
      >
        Početna
      </RouterLink>

      <RouterLink
        to="/katalog"
        class="stavka"
        @click="zatvoriMeni"
      >
        Biljke
      </RouterLink>

      <RouterLink
        to="/buketi"
        class="stavka"
        @click="zatvoriMeni"
      >
        Buketi i pokloni
      </RouterLink>

      <RouterLink
        to="/nega"
        class="stavka"
        @click="zatvoriMeni"
      >
        Nega biljaka
      </RouterLink>

      <RouterLink
        to="/o-nama"
        class="stavka"
        @click="zatvoriMeni"
      >
        O nama
      </RouterLink>
    </nav>

    <div class="ikonice">
      <RouterLink
        to="/prijava"
        class="ikona-link"
        aria-label="Moj nalog — prijava"
        title="Moj nalog"
        @click="zatvoriMeni"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="3.5" />
          <path d="M4.5 20c.6-4 3.3-6 7.5-6s6.9 2 7.5 6" />
        </svg>
      </RouterLink>

      <RouterLink
        to="/korpa"
        class="ikona-link"
        aria-label="Korpa rezervacija"
        title="Korpa rezervacija"
        @click="zatvoriMeni"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M4 8h16l-1.5 12h-13L4 8Z" />
          <path d="M9 9V6a3 3 0 0 1 6 0v3" />
        </svg>
      </RouterLink>
    </div>
  </header>
</template>

<style scoped src="../css/Zaglavlje.css"></style>
