export default defineNuxtRouteMiddleware((to, from) => {
    const short_id = to.params.id
    console.log(short_id)

    try {

        // const { data } = await $fetch(`/api/short/${short_id}`)
        
        console.log(short_id)

        window.location.href = `/api/short/${short_id}`
        return
        
    } catch (error) {
        console.log(error)
        // return navigateTo('/')
    }
    
})
