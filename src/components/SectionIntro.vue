<template>
  <section class="min-h-screen bg-gradient-to-b from-[#fd9d79] via-[#fda27c] to-[#fdab91] relative z-0 overflow-hidden" id="intro">
    <kinesis-container
      :duration="1500"
      class="absolute z-[-1] left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-120 md:scale-108 w-full h-full"
      style="display: block;"
      aria-hidden="true"
      hidden
    >
      <kinesis-element
        :strength="0"
        tag="img"
        :src="'/layer-1.webp'"
        class="absolute w-full h-full object-cover"
      />
      <kinesis-element
        :strength="5"
        tag="img"
        :src="'/layer-2.webp'"
        class="absolute w-full h-full object-cover"
      />
      <kinesis-element
        :strength="10"
        tag="img"
        :src="'/layer-3.webp'"
        class="absolute w-full h-full object-cover"
      />
      <kinesis-element
        :strength="15"
        tag="img"
        :src="'/layer-4.webp'"
        class="absolute w-full h-full object-cover"
      />
      <kinesis-element
        :strength="20"
        tag="img"
        :src="'/layer-5.webp'"
        class="absolute w-full h-full object-cover"
      />
      <kinesis-element
        :strength="25"
        tag="img"
        :src="'/layer-6.webp'"
        class="absolute w-full h-full object-cover"
      />
    </kinesis-container>
    <div class="container pointer-events-none">
      <h1
        class="min-h-screen flex flex-col justify-center text-center uppercase text-[#ffe2a4] mx-auto max-w-[732px] px-4 md:px-0 py-10 animated"
        :class="{ 'is-shown': visible }"
      >
        <div class="text-base lg:text-2xl font-light tracking-widest">
          Десятий щорiчний лiтнiй фестиваль
        </div>
        <div class="my-6 flex-shrink-0">
          <img src="/logo.svg" class="block max-w-full" width="700" height="242" alt="">
          <span class="sr-only">Карпати Kapukafest</span>
        </div>
        <div class="text-lg md:text-xl lg:text-4xl tracking-widest">
          21–24 серпня 2021
        </div>
      </h1>
    </div>
    <a
      href="#about"
      class="text-white absolute left-1/2 bottom-10 transform -translate-x-1/2 w-12 h-10 flex items-center justify-center opacity-50 hover:opacity-100"
      title="Гортати вниз"
      v-smooth-scroll="{ updateHistory: false }"
    >
      <chevron-down-icon class="h-8 w-8 animate-bounce" />
    </a>
  </section>
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/outline'

export default {
  data() {
    return {
      visible: false
    }
  },
  components: {
    ChevronDownIcon
  },
  mounted() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        this.visible = true
      }, 1000);
    })
  },
}
</script>

<style scoped>
.animated {
  opacity: 0;
  transform: scale(.9);
  transition: opacity 1.5s cubic-bezier(.77, 0, .175, 1), transform 1.5s cubic-bezier(.77, 0, .175, 1);
}

.animated.is-shown {
  opacity: 1;
  transform: scale(1);
}
</style>
