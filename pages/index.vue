<template>
  <Link rel="icon" href="/favicon.svg" />
  <div  class="min-h-screen bg-black text-white flex flex-col">
    <div>
      
      <div class="flex flex-col sm:items-center gap-3 p-2">
        <p class="md:text-7xl sm:text-6xl text-5xl font-[Geist] font-bold text-pretty mt-10">tiniu: tiny urls.</p>
        <p class="md:text-3xl sm:text-2xl text-xl font-[Geist] font-thin italic">url shortener.</p>
        <p v-if="longurl.length > 0" class="opacity-20">( {{ longurl }} )</p> 
      </div>
      
      <div class="flex flex-col items-center gap-3 justify-center h-[80vh]">
        <div class="flex flex-row items-center gap-3">
          <label for="url" class="text-xl md:text-2xl font-[Geist] font-medium">enter a url:</label>
          <input v-model="longurl" id="url" type="text" class="p-2 rounded-md  text-white focus-visible:outline-none bg-[#161515] outline outline-1 outline-gray-950" placeholder="https://example.com"> 
        </div>
        <button class="bg-white text-black px-6 py-2 rounded-md font-[Geist] font-medium" @click="shortenURL">shorten</button>
      </div>
      {{ output }}
      {{ errorMessage }}
      
    </div>
  </div>
</template>


<script setup lang="ts">
import { v4 } from 'uuid';

const longurl = ref('')
const output = ref('output')
const errorMessage = ref('')



const shortenURL = async () => {
  try {
    const res = await $fetch('/api/shorten',{
      method: 'POST',
      body: { url: longurl.value }
    })
    if ('shortUrl' in res) {
      output.value = res.shortUrl
    } else {
      output.value = res.message
    }
    // output.value = res
  } catch (err:any) {
    console.log(err)
    errorMessage.value = err.message
  }

}

</script>