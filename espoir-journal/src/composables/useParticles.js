import { ref } from 'vue'
import { gsap } from 'gsap'

export const useParticles = () => {
  const particlesContainer = ref(null)

  const createParticle = (container, options = {}) => {
    const {
      size = Math.random() * 3 + 2,
      color = 'currentColor',
      particleCount = 20,
      spread = 100,
      duration = 0.7,
    } = options

    const particle = document.createElement('div')
    particle.className = 'particle'
    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      pointer-events: none;
      z-index: 100;
    `

    const startX = Math.random() * container.offsetWidth
    const startY = Math.random() * container.offsetHeight

    particle.style.left = `${startX}px`
    particle.style.top = `${startY}px`

    container.appendChild(particle)

    gsap.to(particle, {
      x: (Math.random() - 0.5) * spread,
      y: (Math.random() - 0.5) * spread,
      opacity: 0,
      duration: duration + Math.random() * 0.5,
      ease: 'power2.out',
      onComplete: () => {
        particle.remove()
      }
    })
  }

  const createParticles = (options = {}) => {
    if (!particlesContainer.value) return

    const { particleCount = 20 } = options
    for (let i = 0; i < particleCount; i++) {
      createParticle(particlesContainer.value, options)
    }
  }

  return {
    particlesContainer,
    createParticles
  }
}