<template>
  <div>
    {{ route.params.id }}
  </div>
</template>

<script lang="ts" setup>

const router = useRouter()
const route = useRoute()

onMounted(async () => {

  try{
    const r = await $fetch(`/api/short/${route.params.id}`)
    console.log(r)
  } catch (err) {

    alert("Error")
    console.log(err)
    router.push('/')
  }

})

</script>

<style>

</style>