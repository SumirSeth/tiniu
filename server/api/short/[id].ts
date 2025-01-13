import { serverSupabaseClient } from '#supabase/server';

export default defineEventHandler(async (event) => {
  const shortId = event.context.params?.id;

  const client = await serverSupabaseClient(event);
  const { data, error } = await client
    .from('urls')
    .select('long_url')
    .eq('short_id', shortId)
    .single();

  if (error || !data) {
    throw createError({
      statusCode: 404,
      message: 'URL not found'
    });
  }

  // Return the URL instead of redirecting
  return { long_url: data.long_url };
});
