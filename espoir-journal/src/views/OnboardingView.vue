<template>
  <section class="welcome-animation" ref="welcomeAnimationRef" v-show="!showStepOne && !showStepThree">
    <div class="word-container">
      <div class="word optimism" ref="optimismRef">optimism</div>
      <div class="word faith" ref="faithRef">faith</div>
      <div class="word aspiration" ref="aspirationRef">aspiration</div>
      <div class="word promise" ref="promiseRef">promise</div>
      <div class="word expectation" ref="expectationRef">expectation</div>
      <div class="word dream" ref="dreamRef">dream</div>
      <div class="word anticipation" ref="anticipationRef">anticipation</div>
      <div class="word confidence" ref="confidenceRef">confidence</div>
      <div class="word espoir" ref="espoirRef">espoir</div>
    </div>
  </section>

  <section class="get-started" ref="getStartedRef" v-show="!showStepOne && !showStepThree">
    <p class="caption">Welcome to your journal</p>
    <p class="title">Tasks, Summary and Interactions all in one timeline</p>
  </section>

  <button class="grey invisible" ref="buttonRef" @click="handleGetStarted" v-show="!showStepOne && !showStepThree">
    Get started
  </button>

  <section v-show="showStepOne" class="step-one" ref="stepOneRef">
    <div class="text-step">
      <p class="caption-step">Step 1</p>
      <p class="title-step">Set your <SunIcon color="black" fill="black" width="40px" height="40px"/> wake up and <MoonIcon color="black" fill="black" width="40px" height="40px" /> wind down hours</p>
    </div>
    
    <div class="time-boxes">
      <div class="time-box">
        <div class="time-label">Wake up</div>
        <input type="time" v-model="form.morning" class="time-input"/>
      </div>
      
      <div class="time-box">
        <div class="time-label">Wind down</div>
        <input type="time" v-model="form.evening" class="time-input"/>
      </div>
    </div>

    <button class="base-button invisible" ref="nextButtonRef" @click="handleNextToThree">Next</button>
  </section>

  <section v-show="showStepThree" class="step-three" ref="stepThreeRef">
    <div class="espoir-final" ref="finalEspoirRef">espoir</div>
    <div class="text-container">
      <p class="welcome" ref="welcomeRef">Welcome</p>
      <p class="final-title" ref="finalTitleRef">You are all set to go!</p>
    </div>
    <div class="final-text" ref="finalTextRef" @click="handleFinalStart">
      Get started <ArrowUpIcon />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

// Stores
import { useSettingsStore } from '@/stores/settingsStore'

// Icons
import SunIcon from '@/assets/icons/SunIcon.vue'
import MoonIcon from '@/assets/icons/MoonIcon.vue'
import ArrowUpIcon from '@/assets/icons/ArrowUpIcon.vue'

const settingsStore = useSettingsStore()
const router = useRouter()
const welcomeAnimationRef = ref(null)
const espoirRef = ref(null)
const optimismRef = ref(null)
const faithRef = ref(null)
const aspirationRef = ref(null)
const promiseRef = ref(null)
const expectationRef = ref(null)
const dreamRef = ref(null)
const anticipationRef = ref(null)
const confidenceRef = ref(null)
const getStartedRef = ref(null)
const buttonRef = ref(null)
const finalEspoirRef = ref(null)
const nextButtonRef = ref(null)
const stepOneRef = ref(null)
const stepThreeRef = ref(null)
const finalTextRef = ref(null)
const welcomeRef = ref(null)
const finalTitleRef = ref(null)

const showStepOne = ref(false)
const showStepThree = ref(false)

const form = reactive({
  morning: settingsStore.morning,
  evening: settingsStore.evening,
})


onMounted(() => {
  initializeWordAnimation()
  initializeShineEffect()
})

const initializeWordAnimation = () => {
  const words = [
    faithRef.value,
    aspirationRef.value,
    promiseRef.value,
    expectationRef.value,
    dreamRef.value,
    anticipationRef.value,
    confidenceRef.value,
    espoirRef.value,
  ]

  gsap.set(words, {
    opacity: 0,
    y: -50,
    filter: 'blur(5px)',
  })

  const tl = gsap.timeline()

  const createWordAnimation = (wordRef, speed, delay = '-=0.7') => {
    tl.to(
      wordRef,
      {
        keyframes: [
          { y: -30, filter: 'blur(5px)', opacity: 1 },
          { y: 0, filter: 'blur(0px)' },
          { y: 30, filter: 'blur(5px)', opacity: 0 },
        ],
        duration: 1.5 * speed,
        ease: 'power2.inOut',
      },
      delay,
    )
  }

  tl.to(optimismRef.value, {
    opacity: 1,
    duration: 1.5,
    ease: 'power2.inOut',
    onComplete: () => {
      gsap.to(optimismRef.value, {
        y: 30,
        filter: 'blur(5px)',
        opacity: 0,
      })
    },
  })

  createWordAnimation(faithRef.value, 1.2, '-=0.5')
  createWordAnimation(aspirationRef.value, 0.9, '-=1')
  createWordAnimation(promiseRef.value, 0.9, '-=0.9')
  createWordAnimation(expectationRef.value, 0.7)
  createWordAnimation(dreamRef.value, 0.6)
  createWordAnimation(anticipationRef.value, 0.7)
  createWordAnimation(confidenceRef.value, 0.8)

  tl.to(
    espoirRef.value,
    {
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out',
      onComplete: () => animateGetStarted(),
    },
    '-=0.2',
  )
}

const animateGetStarted = () => {
  gsap.fromTo(
    getStartedRef.value.children,
    { opacity: 0, y: 20 },
    {
      opacity: 1,
      y: 0,
      duration: 1.5,
      stagger: 0.5,
      onComplete: () => {
        gsap.to(buttonRef.value, {
          opacity: 1,
          duration: 0.25,
        })
      },
    },
  )
}

const initializeShineEffect = () => {
  gsap.to(finalTextRef.value, {
    backgroundPosition: '200% center',
    duration: 2,
    repeat: -1,
    ease: 'none',
  })
}

const handleGetStarted = () => {
  const elements = [welcomeAnimationRef.value, getStartedRef.value]
  
  gsap.to(elements, {
    opacity: 0,
    duration: 0.5,
  })
  
  gsap.to(buttonRef.value, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      showStepOne.value = true
      gsap.fromTo(stepOneRef.value, 
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            gsap.to(nextButtonRef.value, {
              opacity: 1,
              duration: 1,
            })
          }
        }
      )
    }
  })
}

const handleNextToThree = () => {

  settingsStore.updateSettings(form.morning, form.evening)

 
  gsap.to(stepOneRef.value, {
    opacity: 0,
    duration: 0.5,
    onComplete: () => {
      showStepThree.value = true
      gsap.fromTo(stepThreeRef.value, 
        { opacity: 0 },
        { 
          opacity: 1,
          duration: 0.5,
          onComplete: () => {
            gsap.fromTo([finalTextRef.value, finalEspoirRef.value, welcomeRef.value, finalTitleRef.value], {
              opacity: 0,
              y: 20,
              
            }, {
              opacity: 1,
              y: 0,
              stagger: 0.5,
              duration: 1.5,})
          }
        }
      )
    }
  })

}

const handleFinalStart = () => {
  gsap.to(stepThreeRef.value, {
    opacity: 0,
    duration: 1,
    ease: 'power2.inOut',
    onComplete: () => {

      const espoirJournal = JSON.parse(localStorage.getItem('espoirJournal')) || {}
      espoirJournal.onboarding = true
      localStorage.setItem('espoirJournal', JSON.stringify(espoirJournal))

      router.push({ name: 'home' })
    }
  })
}
</script>

<style scoped>
.welcome-animation {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 7vh;
  position: relative;
  overflow: hidden;
}

.word-container {
  position: relative;
  height: 7rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.word {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  position: absolute;
  font-size: 3rem;
}

.optimism {
  opacity: 0;
}

.get-started {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  text-align: center;
  padding: 1rem;
}

.text-step {
  width: 100%;
}

.caption {
  color: rgba(var(--colorBlack), 0.6);
  opacity: 0;
}

.title {
  font-size: 2rem;
  width: 80%;
  opacity: 0;
  font-weight: 500;
  font-family: 'Onest-SemiBold';
}

.invisible {
  opacity: 0;
}

.grey {
  background-color: rgba(var(--colorBlack), 0.075);
  border: none;
  outline: none;
  width: calc(100% - 2rem);
  border-radius: 100px;
  padding: 1.25rem;
  font-size: 1rem;
  font-family: 'Onest-Medium';
  font-weight: 500;
  position: fixed;
  bottom: 0%;
  margin: 1rem;
  color: rgba(var(--colorBlack), 1);
}

.step-one {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  height: 50vh;
  width: 100%;
  padding: 0 1rem;
  position: fixed;
  bottom: 10%;
}

.caption-step {
  color: rgba(var(--colorBlack), 0.6);
}

.title-step {
  font-size: 2rem;
  font-weight: 500;
  font-family: "Onest-SemiBold";
}

.time-boxes {
  width: 100%;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.time-box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: rgba(var(--colorBlack), 0.05);
  border-radius: 12px;
}

.time-label {
  color: rgba(var(--colorBlack), 0.8);
  font-family: 'Onest-Medium';
}

.time-input {
  font-family: 'Onest-SemiBold';
  font-size: 1.1rem;
  border: none;
  background: transparent;
  outline: none;
}

.base-button {
  background-color: rgba(var(--colorBlack), 1);
  color: white;
  border: none;
  outline: none;
  width: calc(100% - 2rem);
  border-radius: 100px;
  padding: 1.25rem;
  font-size: 1rem;
  font-family: 'Onest-Medium';
  font-weight: 500;
  position: fixed;
  bottom: 0%;
  margin: 1rem;
}

.step-three {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: white;
}

.espoir-final {
  font-weight: 500;
  font-family: 'Onest-SemiBold';
  font-size: 3rem;
  margin-bottom: 2rem;
  opacity: 0;
}

.text-container {
  text-align: center;
  margin-bottom: 4rem;
}

.welcome {
  color: rgba(var(--colorBlack), 0.6);
  margin-bottom: 0.5rem;
  opacity: 0
}

.final-title {
  font-size: 2rem;
  font-weight: 500;
  opacity: 0;
  font-family: 'Onest-SemiBold';
}

.final-text {
  color: black;
  display: flex;
  gap: 0.5rem;
  opacity: 0;
  justify-content: center;
  align-items: center;
  width: calc(100% - 2rem);
  text-align: center;
  padding: 1.25rem;
  font-size: 1rem;
  font-family: 'Onest-Medium';
  font-weight: 500;
  position: fixed;
  bottom: 1%;
  cursor: pointer;
  background: linear-gradient(to right, #000 20%, #666 40%, #666 60%, #000 80%);
  background-size: 200% auto;
  color: #000;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>