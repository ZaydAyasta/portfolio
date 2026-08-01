<script setup>
import { computed, onBeforeUnmount, ref, useAttrs, watch } from 'vue'

defineOptions({
  inheritAttrs: false,
})

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  href: {
    type: String,
    default: '#',
  },
  target: {
    type: String,
    default: undefined,
  },
  rel: {
    type: String,
    default: undefined,
  },
  label: {
    type: String,
    default: undefined,
  },
})

const attrs = useAttrs()
const displayText = ref(props.text)
let shuffleTimer
let restoreTimer

const accessibleLabel = computed(() => props.label || props.text)

function getReducedMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function shuffleWord(word) {
  if (word.length < 2) return word

  const characters = [...word]

  for (let index = characters.length - 1; index > 0; index -= 1) {
    const nextIndex = Math.floor(Math.random() * (index + 1))
    ;[characters[index], characters[nextIndex]] = [characters[nextIndex], characters[index]]
  }

  const shuffled = characters.join('')
  return shuffled === word ? [...characters].reverse().join('') : shuffled
}

function shuffleText(text) {
  return text
    .split(' ')
    .map((word) => shuffleWord(word))
    .join(' ')
}

function stopShuffle() {
  window.clearInterval(shuffleTimer)
  window.clearTimeout(restoreTimer)
  shuffleTimer = undefined
  restoreTimer = undefined
}

function playShuffle() {
  if (getReducedMotionPreference()) return

  stopShuffle()

  let frame = 0
  const maxFrames = 6

  displayText.value = shuffleText(props.text)

  shuffleTimer = window.setInterval(() => {
    frame += 1
    displayText.value = frame >= maxFrames ? props.text : shuffleText(props.text)

    if (frame >= maxFrames) {
      stopShuffle()
    }
  }, 58)

  restoreTimer = window.setTimeout(() => {
    displayText.value = props.text
    stopShuffle()
  }, 460)
}

function resetText() {
  stopShuffle()
  displayText.value = props.text
}

watch(
  () => props.text,
  () => {
    resetText()
  },
)

onBeforeUnmount(() => {
  stopShuffle()
})
</script>

<template>
  <a
    v-bind="attrs"
    class="shuffle-link"
    :href="href"
    :target="target"
    :rel="rel"
    :aria-label="accessibleLabel"
    :data-text="text"
    @mouseenter="playShuffle"
    @focus="playShuffle"
    @mouseleave="resetText"
    @blur="resetText"
  >
    <span aria-hidden="true">{{ displayText }}</span>
  </a>
</template>
