<template>
  <div class="h-screen bg-black flex text-white">
    Thank you for using tiniu! <br>
    Redirecting...
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  middleware: 'redirect'
})

// const router = useRouter()
// const route = useRoute()
// const { id } = route.params

// onMounted(async () => {

//   try{
//     // const r = await $fetch(`/api/short/${route.params.id}`)
//     // navigateTo(r, {
//     //   external: true
//     // })
//     window.location.href = `/api/short/${id}`
//     // router.resolve(r)
//   } catch (err) {
//     console.log(err)
//     alert("Error: Not Found")
//     router.push('/')
//   }

// })

</script>

<style>

</style>