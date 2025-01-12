<template>
  <div>
    {{ response }}
  </div>
</template>


<script setup lang="ts">
const response = await useFetch('/api/hello')
</script>