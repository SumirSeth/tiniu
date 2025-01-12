<template>
  <Link rel="icon" href="/favicon.svg" />
  <div  class="min-h-screen bg-black text-white flex flex-col">
    <div>
      
      <div class="flex flex-col items-center gap-3">
        <p class="text-7xl font-[Geist] font-bold text-pretty mt-10">tiniu: tiny urls.</p>
        <p class="text-3xl font-[Geist] font-thin italic">url shortener.</p>
        <p v-if="url.length > 0" class="opacity-20">( {{ url }} )</p> 
      </div>
      
      <div class="flex flex-col items-center gap-3 justify-center h-[80vh]">
        <div class="flex flex-row items-center gap-3">
          <label for="url" class="text-xl font-[Geist] font-medium">enter a url:</label>
          <input v-model="url" id="url" type="text" class="p-2 rounded-md  text-white focus-visible:outline-none bg-gray-900 outline outline-1 outline-gray-800" placeholder="https://example.com"> 
        </div>
        <button class="bg-white text-black px-6 py-2 rounded-md font-[Geist] font-medium">shorten</button>
      </div>
      
      
    </div>
  </div>
</template>


<script setup lang="ts">
const {data, pending, error, status} = await useFetch('/api/hello')

const url = ref('')

</script>