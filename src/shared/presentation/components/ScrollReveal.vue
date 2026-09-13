<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  as: {
    type: String,
    default: 'div',
  },
  delay: {
    type: Number,
    default: 0,
  },
})

const root = ref(null)
const isObserved = ref(false)
const isVisible = ref(false)
let observer

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  if (prefersReducedMotion()) {
    isVisible.value = true
    return
  }

  isObserved.value = true
  observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting) return

      isVisible.value = true
      observer?.disconnect()
    },
    {
      rootMargin: '0px 0px -10% 0px',
      threshold: 0.12,
    },
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <component
    :is="as"
    ref="root"
    v-bind="$attrs"
    class="scroll-reveal"
    :class="{ 'is-observed': isObserved, 'is-visible': isVisible }"
    :style="{ '--reveal-delay': `${delay}ms` }"
  >
    <slot />
  </component>
</template>
