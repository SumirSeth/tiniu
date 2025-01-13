export default defineNuxtRouteMiddleware(async (to) => {
  const short_id = to.params.id

  try {
    // Use navigateTo with external option for direct redirect
    const response = await $fetch(`/api/short/${short_id}`, {
      headers: {
        'Accept': 'application/json'
      }
    })

    if (response && response.long_url) {
      return navigateTo(response.long_url, {
        external: true,
        redirectCode: 301 // Permanent redirect
      })
    }

    // Fallback to home if URL not found
    return navigateTo('/')

  } catch (error) {
    console.error('Redirect error:', error)
    return navigateTo('/')
  }
})
