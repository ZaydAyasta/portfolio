<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  lines: {
    type: Array,
    required: true,
  },
  ready: {
    type: Boolean,
    default: true,
  },
})

const root = ref(null)
const hasBuilt = ref(false)
const isInView = ref(false)
let observer

const accessibleText = computed(() => props.lines.join(' '))

const lineWords = computed(() => {
  let index = 0

  return props.lines.map((line) =>
    String(line)
      .split(' ')
      .filter(Boolean)
      .map((word) => {
        const order = (index * 7 + 3) % 13
        const data = {
          text: word,
          index,
          delay: order * 115 + Math.floor(index / 13) * 80,
        }
        index += 1
        return data
      }),
  )
})

function build() {
  if (!props.ready || !isInView.value || hasBuilt.value) return
  hasBuilt.value = true
  observer?.disconnect()
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting
      build()
    },
    {
      rootMargin: '0px 0px -18% 0px',
      threshold: 0.18,
    },
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

watch(
  () => props.ready,
  () => {
    build()
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <span
    ref="root"
    class="build-words"
    :class="{ 'is-built': hasBuilt }"
    role="text"
    :aria-label="accessibleText"
  >
    <span v-for="(line, lineIndex) in lineWords" :key="lineIndex" class="build-line" aria-hidden="true">
      <span
        v-for="word in line"
        :key="`${word.text}-${word.index}`"
        class="build-word"
        :style="{ '--build-delay': `${word.delay}ms` }"
      >
        <span>{{ word.text }}</span>
      </span>
    </span>
  </span>
</template>
