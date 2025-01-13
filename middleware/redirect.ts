export default defineNuxtRouteMiddleware(async (to) => {
  const short_id = to.params.id

  try {
    const response = await $fetch(`/api/short/${short_id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response && response.long_url) {
      return navigateTo(response.long_url, {
        external: true,
        redirectCode: 301 
      })
    }

    return navigateTo('/')

  } catch (error) {
    console.error('Redirect error:', error)
    return navigateTo('/')
  }
})
