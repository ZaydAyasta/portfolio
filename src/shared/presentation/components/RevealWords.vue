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
const isInView = ref(false)
const isActive = ref(false)
let observer

const accessibleText = computed(() => props.lines.join(' '))

const offsets = [
  [-38, 12, -2.4],
  [24, -18, 1.6],
  [-14, -28, -1.2],
  [34, 20, 2.2],
  [-26, 30, 1.4],
  [18, -10, -2],
  [-44, -6, 2.8],
  [30, 34, -1.8],
]

const lineWords = computed(() => {
  let index = 0

  return props.lines.map((line) =>
    String(line)
      .split(' ')
      .filter(Boolean)
      .map((word) => {
        const offset = offsets[index % offsets.length]
        const wordData = {
          text: word,
          index,
          x: offset[0],
          y: offset[1],
          rotate: offset[2],
        }
        index += 1
        return wordData
      }),
  )
})

function syncActiveState() {
  isActive.value = props.ready && isInView.value
}

onMounted(() => {
  observer = new IntersectionObserver(
    ([entry]) => {
      isInView.value = entry.isIntersecting
      syncActiveState()
    },
    {
      rootMargin: '-14% 0px -18% 0px',
      threshold: 0.34,
    },
  )

  if (root.value) {
    observer.observe(root.value)
  }
})

watch(
  () => props.ready,
  () => {
    syncActiveState()
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <span
    ref="root"
    class="reveal-words"
    :class="{ 'is-active': isActive }"
    role="text"
    :aria-label="accessibleText"
  >
    <span v-for="(line, lineIndex) in lineWords" :key="lineIndex" class="reveal-line" aria-hidden="true">
      <span
        v-for="word in line"
        :key="`${word.text}-${word.index}`"
        class="reveal-word"
        :style="{
          '--word-delay': `${word.index * 54}ms`,
          '--word-x': `${word.x}%`,
          '--word-y': `${word.y}%`,
          '--word-rotate': `${word.rotate}deg`,
        }"
      >
        <span>{{ word.text }}</span>
      </span>
    </span>
  </span>
</template>
