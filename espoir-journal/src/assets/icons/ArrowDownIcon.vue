<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :width="width"
    :height="height"
    :fill="fill"
    :color="color"
  >
    <path
      d="M12 20L12 4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M17 15C17 15 13.3175 20 11.9999 20C10.6823 20 6.99997 15 6.99997 15"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
export default {
  props: {
    width: {
      type: String,
      default: '24',
    },
    height: {
      type: String,
      default: '24',
    },
    fill: {
      type: String,
      default: 'none',
    },
    color: {
      type: String,
      default: '#000000',
    },
  },
}
</script>
