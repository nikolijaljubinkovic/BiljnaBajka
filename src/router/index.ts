
import { createRouter, createWebHistory } from 'vue-router'

import PocetnaStranica from '../stranice/PocetnaStranica.vue'
import KatalogBiljaka from '../stranice/KatalogBiljaka.vue'
import DetaljiBiljke from '../stranice/DetaljiBiljke.vue'
import BuketiPokloni from '../stranice/BuketiPokloni.vue'
import NegaBiljaka from '../stranice/NegaBiljaka.vue'
import ONama from '../stranice/ONama.vue'
import KorpaRezervacija from '../stranice/KorpaRezervacija.vue'
import ProfilKorisnika from '../stranice/ProfilKorisnika.vue'
import Prijava from '../stranice/Prijava.vue'
import Registracija from '../stranice/Registracija.vue'
import DetaljiBuketa from '../stranice/DetaljiBuketa.vue'

import { prijavljeniKorisnik } from '../podaci/autentifikacija'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  routes: [
    {
      path: '/',
      name: 'pocetna',
      component: PocetnaStranica,
    },
    {
      path: '/katalog',
      name: 'katalog',
      component: KatalogBiljaka,
    },
    {
      path: '/biljka/:id',
      name: 'detalji-biljke',
      component: DetaljiBiljke,
      props: true,
    },
    {
      path: '/buketi',
      name: 'buketi',
      component: BuketiPokloni,
    },
    {
      path: '/buket/:id',
      name: 'detalji-buketa',
      component: DetaljiBuketa,
    },
    {
      path: '/nega',
      name: 'nega',
      component: NegaBiljaka,
    },
    {
      path: '/o-nama',
      name: 'o-nama',
      component: ONama,
    },
    {
      path: '/korpa',
      name: 'korpa',
      component: KorpaRezervacija,
    },
    {
      path: '/profil',
      name: 'profil',
      component: ProfilKorisnika,
      meta: { zahtevaPrijavu: true },
    },
    {
      path: '/prijava',
      name: 'prijava',
      component: Prijava,
      meta: { samoZaNeprijavljene: true },
    },
    {
      path: '/registracija',
      name: 'registracija',
      component: Registracija,
      meta: { samoZaNeprijavljene: true },
    },
    {
      path: '/:putanjaKojaNePostoji(.*)*',
      redirect: '/',
    },
  ],
})

router.beforeEach((to) => {
  const prijavljen = prijavljeniKorisnik.value !== null

  if (to.meta.zahtevaPrijavu && !prijavljen) {
    return {
      name: 'prijava',
      query: { redirect: to.fullPath },
    }
  }

  if (to.meta.samoZaNeprijavljene && prijavljen) {
    return { name: 'profil' }
  }

  return true
})

export default router
