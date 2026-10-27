
<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { prijaviKorisnika } from '../podaci/autentifikacija'

const router = useRouter()
const route = useRoute()

const email = ref('')
const lozinka = ref('')
const poruka = ref('')
const greska = ref(false)
const ucitavanje = ref(false)

async function prijaviSe() {
  poruka.value = ''
  greska.value = false

  const rezultat = prijaviKorisnika(
    email.value,
    lozinka.value,
  )

  if (!rezultat.uspeh) {
    poruka.value = rezultat.poruka
    greska.value = true
    return
  }

  ucitavanje.value = true

  const trazenaPutanja = route.query.redirect
  const putanja =
    typeof trazenaPutanja === 'string' &&
    trazenaPutanja.startsWith('/') &&
    !trazenaPutanja.startsWith('//')
      ? trazenaPutanja
      : '/profil'

  try {
    await router.replace(putanja)
  } finally {
    ucitavanje.value = false
  }
}
</script>

<template>
  <main class="stranica-prijave">
    <section class="kartica-prijave">
      <p class="nadnaslov">DOBRO DOŠLI NAZAD</p>

      <h1>Lepo te je ponovo videti</h1>

      <p class="opis">
        Prijavi se na svoj nalog i nastavi svoju zelenu priču.
      </p>

      <form @submit.prevent="prijaviSe">
        <label for="email">Imejl adresa</label>
        <input
          id="email"
          v-model="email"
          type="email"
          autocomplete="username"
          placeholder="ime@example.com"
          required
        />

        <label for="lozinka">Lozinka</label>
        <input
          id="lozinka"
          v-model="lozinka"
          type="password"
          autocomplete="current-password"
          placeholder="Unesi svoju lozinku"
          required
        />

        <p
          v-if="poruka"
          class="poruka"
          :class="{ greska }"
          role="status"
        >
          {{ poruka }}
        </p>

        <button type="submit" :disabled="ucitavanje">
          {{ ucitavanje ? 'Prijavljivanje...' : 'Prijavi se' }}
        </button>
      </form>

      <p class="link-registracija">
        Nemaš nalog?
        <RouterLink to="/registracija">Registruj se</RouterLink>
      </p>

      <RouterLink class="nazad" to="/">
        ← Nazad na početnu
      </RouterLink>
    </section>
  </main>
</template>

<style scoped src="../css/Prijava.css"></style>
