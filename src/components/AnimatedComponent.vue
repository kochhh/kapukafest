<template>
  <div ref="target">
    <transition :name="animationType">
      <div class="animated-component" :class="{ 'shown': animate }">
        <slot />
      </div>
    </transition>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
export default {
  name: 'AnimatedComponent',
  props: {
    animationType: {
      type: String,
      required: false,
      default: 'fade'
    }
  },
  setup() {
    const target = ref()
    const animate = ref(false)
    const observer = new IntersectionObserver(
      ([entry]) => {
        animate.value = entry.isIntersecting
      }, {
        threshold: .5
      }
    )
    onMounted(() => {
      observer.observe(target.value)
    })
    return {
      animate,
      target
    }
  }
}
</script>

<style scoped>
.animated-component {
  opacity: 0;
  transform: scale(.9);
  transition: all 1s cubic-bezier(.77, 0, .175, 1);
}

.animated-component.shown {
  opacity: 1;
  transform: scale(1);
}
</style>
