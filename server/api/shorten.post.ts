import { v4 as uuid } from 'uuid'
import { serverSupabaseClient } from '#supabase/server'


export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  if (!body.url || typeof body.url !== 'string') {
    return {
      status: 400,
      message: 'invalid URL'
    }
  }

  const shortId = uuid().slice(0, 6)


  const client = await serverSupabaseClient(event)
  const { data, error } = await client
    .from('urls')
    .insert({long_url: body.url, short_id: shortId})

  if (error) {
    return {
      status: 500,
      message: 'failed to insert',
      e: error,
    }
  }

  return { shortUrl: `${event.node.req.headers.host || 'tiniu.vercel.app'}/${shortId}`}

  
})
