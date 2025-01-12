import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const shortId = event.context.params?.id;

  // Use the serverSupabaseClient
  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from('urls')
    .select('long_url')
    .eq('short_id', shortId)
    .single();

  if (error || !data) {
    return sendError(event, createError({ statusCode: 404, message: 'URL not found' }));
  }

  // return sendRedirect(event, data.long_url, 302);
  return data.long_url
});
