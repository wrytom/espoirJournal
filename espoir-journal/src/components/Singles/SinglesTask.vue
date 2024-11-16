<template>
  <div class="task" ref="taskRef" :style="swipeStyle">
    <div class="left" ref="leftRef">
      <component
        :is="currentIcon"
        class="icon"
        :class="{ completed: isCompleted }"
        :color="iconColor"
      />
      <h4 class="task-title" :class="{ completed: isCompleted }">{{ task }}</h4>
    </div>
    <p v-if="!isCompleted" class="time" ref="timeRef">{{ time }}</p>
    <div ref="cancelRef" class="cancel-button" :class="{ show: showCancel }" @click="handleCancel">
      <CancelIcon class="cancel-icon" />
    </div>
    <div class="particles-container" ref="particlesContainer"></div>
  </div>
  <div class="line"></div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { gsap } from 'gsap'
import { Draggable } from 'gsap/Draggable'

// Composables
import { useParticles } from '@/composables/useParticles'

// Stores
import { usePanelStore } from '@/stores/panelStore'

// Icons
import TaskIcon from '@/assets/icons/TaskIcon.vue'
import SunIcon from '@/assets/icons/SunIcon.vue'
import MoonIcon from '@/assets/icons/MoonIcon.vue'
import EmptyTaskIcon from '@/assets/icons/EmptyTaskIcon.vue'
import CancelIcon from '@/assets/icons/CancelIcon.vue'
import StarIcon from '@/assets/icons/StarIcon.vue'
import PartyIcon from '@/assets/icons/PartyIcon.vue'

gsap.registerPlugin(Draggable)

const props = defineProps({
  task: String,
  time: String,
  type: String,
  completed: Boolean,
})

const emits = defineEmits(['delete', 'toggle'])

const panelStore = usePanelStore()
const taskRef = ref(null)
const leftRef = ref(null)
const cancelRef = ref(null)
const timeRef = ref(null)
const isCompleted = ref(props.completed)
const showCancel = ref(false)
let draggable = null

const { particlesContainer, createParticles } = useParticles()

const initDraggable = () => {
  draggable = Draggable.create(taskRef.value, {
    type: 'x',
    allowNativeTouchScrolling: true,
    bounds: {
      minX: -50,
      maxX: 100,
    },
    onDrag: function () {
      if (!panelStore.isOpen && !panelStore.isOpening) {
        if (this.x > 50) {
          gsap.to(taskRef.value, {
            scale: 0.95,
            duration: 0.1,
          })
        } else if (this.x < -25) {
          showCancel.value = true
        } else {
          showCancel.value = false
          gsap.to(taskRef.value, {
            scale: 1,
            duration: 0.1,
          })
        }
      }
    },
    onDragEnd: function () {
      if (!panelStore.isOpen && !panelStore.isOpening) {
        if (this.x > 50) {
          isCompleted.value = !isCompleted.value
          emits('toggle')
          gsap.to(taskRef.value, {
            x: 0,
            scale: 1,
            duration: 0.2,
            ease: 'power2.out',
          })
        } else if (this.x < -25) {
          gsap.to(taskRef.value, {
            x: -50,
            duration: 0.2,
            ease: 'power2.out',
          })
        } else {
          gsap.to(taskRef.value, {
            x: 0,
            duration: 0.2,
            ease: 'power2.out',
          })
          showCancel.value = false
        }
      }
    },
  })[0]
}

onMounted(() => {
  initDraggable()
})

onUnmounted(() => {
  if (draggable) {
    draggable.kill()
  }
})

watch(
  () => panelStore.isOpen || panelStore.isOpening,
  (isPanelActive) => {
    if (draggable) {
      if (isPanelActive) {
        draggable.disable()
        gsap.to(taskRef.value, {
          x: 0,
          scale: 1,
          duration: 0.2,
          ease: 'power2.out',
        })
        showCancel.value = false
      } else {
        draggable.enable()
      }
    }
  },
)

const handleCancel = () => {
  const timeline = gsap.timeline()

  timeline
    .to(taskRef.value, {
      x: 0,
      duration: 0.1,
      ease: 'power2.out',
    })
    .to(taskRef.value, {
      scale: 0.9,
      duration: 0.1,
    })
    .to(taskRef.value, {
      scale: 1.1,
      opacity: 0.8,
      duration: 0.1,
    })
    .to([leftRef.value, timeRef.value, cancelRef.value], {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
    })
    .add(() => {
      createParticles({
        color: 'rgba(var(--colorBlack), 0.5)',
        particleCount: 50,
        spread: 100,
      })
    })
    .to(taskRef.value, {
      height: 0,
      opacity: 0,
      border: 'none',
      duration: 0.3,
      delay: 0.3,
      onComplete: () => {
        emits('delete')
        showCancel.value = false
      },
    })
}

const iconColor = computed(() => {
  switch (props.type) {
    case 'morning':
      return 'rgb(233, 186, 100)'
    case 'night':
      return '#800080'
    default:
      return undefined
  }
})

const currentIcon = computed(() => {
  switch (props.type) {
    case 'morning':
      return SunIcon
    case 'starred':
      return StarIcon
    case 'fun':
      return PartyIcon
    case 'night':
      return MoonIcon
    case 'empty':
      return EmptyTaskIcon
    default:
      return TaskIcon
  }
})

const swipeStyle = computed(() => ({
  transform: showCancel.value ? 'translateX(-50px)' : 'translateX(0)',
  transition: 'transform 0.3s ease',
}))
</script>

<style scoped>
.task {
  position: relative;
  width: calc(100% - 3rem);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 1.5rem;
  touch-action: pan-x;
  user-select: none;
  animation: appear 1s ease;
}

.left {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.task-title {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  font-size: 1rem;
}

.time {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  font-size: 0.8rem;
  color: rgba(var(--colorBlack), 0.5);
}

.completed {
  color: rgba(var(--colorBlack), 0.5);
}

.cancel-button {
  position: absolute;
  right: -3rem;
  top: 55%;
  transform: translateY(-50%);
  opacity: 0;
  transition: opacity 0.3s ease;
  cursor: pointer;
}

.cancel-button.show {
  opacity: 1;
}

.cancel-icon {
  color: rgba(var(--colorRed), 1);
}

.line {
  border-bottom: 1px dashed rgba(var(--colorBlack), 0.15);
  width: calc(100% - 3rem);
  margin: 0 1.5rem;
}

.particles-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  overflow: visible;
  z-index: 10;
}
</style>
