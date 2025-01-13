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

      <div class="flex flex-col gap-5 p-2 rounded-xl h-[75vh] font-[Geist] items-center justify-center">
        <div v-for="url in urlHistory">
            <p>{{ mainURL }}/<span class="px-3 py-1 rounded-xl bg-gray-900 font-[Geist]  text-white">{{ url.short_url.slice(-6) }}</span></p>
          <p>original url: <a :href=url.long_url>{{ url.long_url.length > 30? url.long_url.slice(0,30) + '...' : url.long_url }}</a></p>
        </div>
      </div>


    </div>
    <footer class="fixed bottom-0 flex flex-col items-center justify-center gap-3 p-2 text-white">
      <p class="text-sm opacity-50 font-[Geist] font-thin">made with ❤️ by <a href="https://github.com/sumirseth" class="underline">sumir</a></p>
    </footer>
</template>


<script setup lang="ts">

const mainURL = window.location.origin

const urlHistory = ref([])
onMounted(async () => {
  const history = JSON.parse(localStorage.getItem('urlHistory') || '[]')
  urlHistory.value = history
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