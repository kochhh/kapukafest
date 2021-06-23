<template>
  <main class="animated" :class="{ 'is-shown': visible }">
    <section-intro />
    <section-about />
    <section-lineup />
    <section-details />
    <section-register />
    <section-contacts />
  </main>
</template>

<script>
import SectionIntro from './components/SectionIntro.vue'
import SectionAbout from './components/SectionAbout.vue'
import SectionLineup from './components/SectionLineup.vue'
import SectionDetails from './components/SectionDetails.vue'
import SectionRegister from './components/SectionRegister.vue'
import SectionContacts from './components/SectionContacts.vue'

export default {
  name: 'App',
  data() {
    return {
      visible: false
    }
  },
  components: {
    SectionIntro,
    SectionAbout,
    SectionLineup,
    SectionDetails,
    SectionRegister,
    SectionContacts
  },
  mounted() {
    window.addEventListener('load', () => {
      this.visible = true
    })

    let vh = window.innerHeight * .01
    document.documentElement.style.setProperty('--vh', `${vh}px`)

    window.addEventListener('resize', () => {
      let vh = window.innerHeight * .01
      document.documentElement.style.setProperty('--vh', `${vh}px`)
    })
  },
}
</script>

<style scoped>
.animated {
  opacity: 0;
  transition: opacity .8s cubic-bezier(.77, 0, .175, 1);
}

.animated.is-shown {
  opacity: 1;
}
</style>
