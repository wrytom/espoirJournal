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
      d="M5.65784 11.0022L4.18747 14.3105C2.3324 18.4844 1.40486 20.5713 2.41719 21.5837C3.42951 22.596 5.51646 21.6685 9.69037 19.8134L12.9987 18.343C15.5161 17.2242 16.7748 16.6647 16.9751 15.586C17.1754 14.5073 16.2014 13.5333 14.2535 11.5854L12.4155 9.7474C10.4675 7.79944 9.49353 6.82546 8.41482 7.02575C7.33611 7.22604 6.77669 8.48475 5.65784 11.0022Z"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6.5 10.5L13.5 17.5M4.5 15.5L8.5 19.5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M16 8L19 5"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M14.1973 2C14.5963 2.66667 14.9156 4.4 13 6"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22 9.80274C21.3333 9.40365 19.6 9.08438 18 11"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M18.0009 2V2.02"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M22.0009 6V6.02"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M21.0009 13V13.02"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.0009 3V3.02"
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
