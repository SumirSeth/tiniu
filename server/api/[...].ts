export default defineEventHandler(async (event) => {
  return {
    data: 'invalid request',
    status: 400
  }
})
