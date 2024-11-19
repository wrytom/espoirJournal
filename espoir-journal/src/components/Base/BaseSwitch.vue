<template>
    <div class="toggle-container">
      <label v-if="label" class="toggle-label">{{ label }}</label>
      <label class="switch">
        <input
          type="checkbox"
          :checked="modelValue"
          @change="$emit('update:modelValue', $event.target.checked)"
        />
        <span class="slider"></span>
      </label>
    </div>
  </template>
  
  <script setup>
  defineProps({
    modelValue: {
      type: Boolean,
      required: true
    },
    label: {
      type: String,
      default: ''
    }
  })
  defineEmits(['update:modelValue'])
  </script>
  
  <style scoped>
  .toggle-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
  
  .toggle-label {
    margin-right: 10px;
    color: rgba(var(--colorBlack), 0.8);
  }
  
  .switch {
    position: relative;
    display: inline-block;
    width: 53px;
    height: 29px;
  }
  
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }
  
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(var(--colorBlack), 0.3);
    transition: 0.4s;
    border-radius: 24px;
  }
  
  .slider:before {
    position: absolute;
    content: "";
    height: 25px;
    width: 25px;
    left: 2px;
    bottom: 2px;
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
  
  input:checked + .slider {
    background-color: rgba(var(--colorPrimary), 1);
  }
  
  input:checked + .slider:before {
    transform: translateX(24px);
  }
  </style>