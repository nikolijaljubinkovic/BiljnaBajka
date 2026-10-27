
<script setup lang="ts">
import Zaglavlje from './komponente/Zaglavlje.vue'
import BiljniSavetnik from './komponente/BiljniSavetnik.vue'
</script>

<template>
  <div class="aplikacija">
    <Zaglavlje />
    <RouterView />
    <BiljniSavetnik />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap');

:root {
  font-family: 'Manrope', sans-serif;
  color: #294333;
  background-color: #fbfaf6;

  --tamno-zelena: #294333;
  --sumска-zelena: #405c43;
  --maslinasta: #7b8065;
  --krem: #fbfaf6;
  --svetla-krem: #f1f0e7;
  --linija: #dedfce;
  --tekst: #505b4b;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  margin: 0;
  min-width: 320px;
  min-height: 100vh;
  font-family: 'Manrope', sans-serif;
  background-color: var(--krem);
  color: var(--tamno-zelena);
  -webkit-font-smoothing: antialiased;
}

button,
input,
textarea,
select {
  font: inherit;
}

button,
a {
  -webkit-tap-highlight-color: transparent;
}

a {
  color: inherit;
}

h1,
h2,
h3,
h4 {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-weight: 500;
  line-height: 1.12;
}

button {
  cursor: pointer;
}

img {
  max-width: 100%;
}

#app {
  min-height: 100vh;
}

.aplikacija {
  min-height: 100vh;
}

/* Prilagođavanje manjim ekranima */
@media (max-width: 600px) {
  h1 {
    font-size: clamp(2.2rem, 10vw, 3.5rem);
  }

  h2 {
    font-size: clamp(1.8rem, 8vw, 2.6rem);
  }
}
</style>
