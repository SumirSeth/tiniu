<template>
  <div  class="min-h-screen bg-black text-white flex flex-col">
    <div>
      
      <div class="flex flex-col sm:items-center gap-3 p-2">
        <p class="md:text-7xl sm:text-6xl text-6xl font-[Geist] font-bold text-pretty mt-10">tiniu: tiny urls.</p>
        <p class="md:text-3xl sm:text-2xl text-2xl font-[Geist] font-thin italic">url shortener.</p>
        <div class="flex flex-row gap-1 items-center">
          <p class="font-[Geist] font-thin italic tracking-wide hidden sm:block">view history:</p>
          <button @click="navigateTo('/history')" class="bg-white text-black p-1 rounded-md font-[Geist] font-medium text-md w-fit"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12 22q-3.55 0-6.262-2.175t-3.488-5.55q-.1-.425.15-.763t.675-.387t.75.2t.45.675q.675 2.625 2.813 4.313T12 20q3.35 0 5.675-2.325T20 12t-2.325-5.675T12 4Q9.85 4 8.012 5.062T5.1 8H7q.425 0 .713.288T8 9t-.288.713T7 10H3.6q-.55 0-.875-.437t-.15-.938q1.05-2.95 3.625-4.788T12 2q2.075 0 3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m1-10.4l2.5 2.5q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-2.8-2.8q-.15-.15-.225-.337T11 11.975V8q0-.425.288-.712T12 7t.713.288T13 8z"/></svg></button>
        </div>
        <p v-if="longurl.length > 0" class="opacity-20">( {{ longurl.length<30? longurl : longurl.slice(0,30) + '...' }} )</p>
      </div>
      <div v-if="output.length == 0" class="flex flex-col items-center gap-3 justify-center h-[80vh]">
        <div class="flex flex-row items-center gap-3">
          <label for="url" class="text-xl md:text-2xl font-[Geist] font-medium">enter a url:</label>
          <input v-model="longurl" id="url" type="text" class="p-2 rounded-md  text-white focus-visible:outline-none bg-[#161515] outline outline-1 outline-gray-950" placeholder="https://example.com"> 
        </div>
        <div class="flex flex-row gap-4">
          <button class="bg-white text-black px-6 py-2 rounded-md font-[Geist] font-medium text-md" @click="shortenURL">shorten</button>
          <button v-if="longurl.length > 0 || errorMessage.length > 0" class="bg-gray-900 text-white px-6 py-2 rounded-md font-[Geist] font-medium text-md" @click="output = '' ; errorMessage = ''; longurl = ''">clear</button>
        </div>
        <span v-if="errorMessage.length > 0" class="px-3 py-1 rounded-xl bg-gray-900 font-[Geist] font-bold  text-red-700">{{ errorMessage }}</span>
      </div>

      <div v-else class="flex flex-col items-center gap-3 justify-center h-[75vh]">
        <p v-if="output.length > 0" class="font-[Geist] font-medium">shortened link: <span class="px-3 py-1 rounded-xl bg-gray-900 font-[Geist]  text-white">{{ output }}</span></p>
        <div class="flex flex-row gap-4">
          <button class="bg-white text-black px-6 py-2 rounded-md font-[Geist] font-medium text-md" @click="copyToClip">copy</button>
          <button class="bg-gray-900 text-white px-6 py-2 rounded-md font-[Geist] font-medium text-md" @click="output = '' ; errorMessage = ''; longurl = ''">clear</button>
        </div>
      </div>
      
    </div>
    <Transition name="fade">
      <div v-if="copied" class="fixed bottom-0 right-0 flex lg:text-base md:text-sm text-xs border w-fit px-[5vh] py-[2vw] m-5 rounded-xl">
        <p class="">Copied to clipboard!</p>
      </div>
    </Transition>
    <footer class="fixed bottom-0 flex flex-col items-center justify-center gap-3 p-2 text-white">
      <p class="text-sm opacity-50 font-[Geist] font-thin">made with ❤️ by <a href="https://github.com/sumirseth" class="underline">sumir</a></p>
    </footer>
  </div>
</template>


<script setup lang="ts">
import { v4 } from 'uuid';

const longurl = ref('')
const output = ref('')
const errorMessage = ref('')
const copied = ref(false)

const copyToClip = () => {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => {
    copied.value = false
  }, 3000)
}

function isValidUrl(url: string): boolean {
  const regex = new RegExp(
    '^(https?:\\/\\/)?' + // Protocol
    '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // Domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IPv4
    '(\\:\\d+)?(\\/[-a-zA-Z0-9%_.~+]*)*' + // Port and path
    '(\\?[;&a-zA-Z0-9%_.~+=-]*)?' + // Query string
    '(\\#[-a-zA-Z0-9_]*)?$',
    'i'
  );
  return regex.test(url);
}

const shortenURL = async () => {
  if (longurl.value.length === 0) {
    errorMessage.value = 'URL is empty'
    return
  }
  if ('http://' == longurl.value.slice(0, 7)) {
  } else if ('https://' !== longurl.value.slice(0, 8)) {
    longurl.value = 'https://' + longurl.value
  }
  if (!isValidUrl(longurl.value)) {
    errorMessage.value = 'Invalid URL'
    return
  }
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
    const history = JSON.parse(localStorage.getItem('urlHistory') || '[]')
    history.push({
      short_url : res.shortUrl,
      long_url : longurl.value,
      created_at : new Date().toISOString()
    })
    localStorage.setItem('urlHistory', JSON.stringify(history))
  } catch (err:any) {
    // console.log(err)
    errorMessage.value = err.message
  }


  longurl.value = ''

}

</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.7s ease;
}

.fade-enter-from,
.fade-leave-to {
  transition: opacity 0.7s ease;
  opacity: 0;
}
</style>