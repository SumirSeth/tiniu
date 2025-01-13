<template>
  <div class="h-screen bg-black flex text-white">
    Thank you for using tiniu! <br>
    Redirecting...
  </div>
</template>

<script lang="ts" setup>

const router = useRouter()
const route = useRoute()

onMounted(async () => {

  try{
    const r = await $fetch(`/api/short/${route.params.id}`)
    // navigateTo(r, {
    //   external: true
    // })
    window.location.href = r.url
    // router.resolve(r)
  } catch (err) {

    alert("Error: Not Found")
    router.push('/')
  }

})

</script>

<style>

</style>