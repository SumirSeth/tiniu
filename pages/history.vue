<template>
  <div  class="min-h-screen bg-black text-white flex flex-col items-center">
    
      <div class="flex flex-col sm:items-center gap-3 p-2">
        <p class="md:text-7xl sm:text-6xl text-6xl font-[Geist] font-bold text-pretty mt-10">tiniu: tiny urls.</p>
        <p class="md:text-3xl sm:text-2xl text-2xl font-[Geist] font-thin italic">history: view shortened urls.</p>
        <div class="flex flex-row gap-1 items-center">
          <p class="font-[Geist] font-thin italic tracking-wide hidden sm:block">home: </p>
          <button @click="navigateTo('/')" class="bg-white text-black p-1 rounded-md font-[Geist] font-medium text-md w-fit"><svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><defs><mask id="ipTHome0"><g fill="none" stroke="#fff" stroke-width="4"><path fill="#555" stroke-linecap="round" stroke-linejoin="round" d="M9 18v24h30V18L24 6z"/><path fill="#555" stroke-linejoin="round" d="M19 29v13h10V29z"/><path stroke-linecap="round" d="M9 42h30"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTHome0)"/></svg></button>
        </div>
      </div>

      <div class="flex flex-col gap-5 p-2 rounded-xl h-[75vh] font-[Geist] items-start justify-center">
        <ul>
          <li v-for="url in urlHistory" class="list-item list-decimal p-2">
              <p>{{ mainURL }}/<span class=" pl-1 px-3 py-1 rounded-xl bg-gray-900 font-[Geist]  text-white">{{ url.short_url.slice(-6) }}</span></p>
              <p><span class="opacity-60">original url: </span><a class="text-blue-600" :href=url.long_url>{{ url.long_url.length > 30? url.long_url.slice(0,30) + '...' : url.long_url }}</a></p>
              <p><span class="opacity-60">created at: </span> {{ url.created_at }}</p>
          </li>
        </ul>
      </div>


    </div>
    <footer class="fixed bottom-0 flex flex-col items-center justify-center gap-3 p-2 text-white">
      <p class="text-sm opacity-50 font-[Geist] font-thin">made with ❤️ by <a href="https://github.com/sumirseth" class="underline">sumir</a></p>
    </footer>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface UrlRecord {
  short_url: string;
  long_url: string;
  created_at: string;
}

const mainURL = ref('')
const urlHistory = ref<UrlRecord[]>([])

onMounted(() => {
  mainURL.value = window.location.origin
  const history = JSON.parse(localStorage.getItem('urlHistory') || '[]')
  urlHistory.value = history.map((item: any) => ({
    ...item,
    created_at: new Date(item.created_at).toDateString()
  }))
})
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