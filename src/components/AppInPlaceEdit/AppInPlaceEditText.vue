<script lang="ts" setup>
const value = defineModel()
defineEmits(['commit'])
</script>

<template>
  <input
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    @blur="$emit('commit')"
    @keyup.enter="($event.target as HTMLInputElement).blur()"
    v-model="value"
  />
</template>
