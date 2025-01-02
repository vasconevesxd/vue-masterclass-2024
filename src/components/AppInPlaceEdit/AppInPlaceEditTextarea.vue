<script lang="ts" setup>
const value = defineModel<string>()
defineEmits(['commit'])
</script>

<template>
  <textarea
    class="w-full p-1 bg-transparent focus:outline-none focus:border-none focus:bg-gray-800 focus:rounded-md"
    type="text"
    @blur="$emit('commit')"
    v-model="value"
  />
</template>
