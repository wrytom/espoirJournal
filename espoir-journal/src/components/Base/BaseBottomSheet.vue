<template>
  <Teleport to="body">
    <div class="bottom-sheet-container" v-show="modelValue" @click.self="close">
      <div ref="sheetContent" class="bottom-sheet" :style="{ height: `${sheetHeight}vh` }">
        <div class="content">
          <slot></slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, watch } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  modelValue: Boolean,
  initialHeight: { type: Number, default: 80 },
})

const emit = defineEmits(['update:modelValue', 'close'])
const sheetContent = ref(null)
const sheetHeight = ref(props.initialHeight)

const close = () => {
  gsap.to(sheetContent.value, {
    yPercent: 200,
    duration: 0.5,
    ease: 'power2.inOut',
    onComplete: () => {
      emit('update:modelValue', false)
      emit('close')
    },
  })
}

watch(
  () => props.modelValue,
  (newVal) => {
    const metaThemeColor = document.querySelector('meta[name="theme-color"]')
    if (newVal) {
      sheetHeight.value = props.initialHeight
      gsap.fromTo(
        sheetContent.value,
        { yPercent: 100 },
        { yPercent: 0, duration: 0.1, ease: 'power2.out' },
      )
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#808080')
    } else {
      if (metaThemeColor) metaThemeColor.setAttribute('content', '#ffffff')
    }
  },
)
</script>

<style scoped>
.bottom-sheet-container {
  position: fixed;
  inset: 0;
  background-color: rgba(var(--colorBlack), 0.5);
  z-index: 1000;
}

.bottom-sheet {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgb(var(--colorWhite));
  border-radius: 1.5rem 1.5rem 0 0;
  padding: 1.5rem;
  touch-action: none;
  transition: transform 0.3s ease;
}

.content {
  margin-top: 12px;
  overflow-y: auto;
  overflow-x: visible;
}
</style>
