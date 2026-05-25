import type { APIRoute } from 'astro';
import { subscribeEmailToLaylo } from '../../lib/laylo';
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const token = import.meta.env.LAYLO_API_TOKEN;
  if (!token) {
    return new Response(
      JSON.stringify({ success: false, message: 'Server is not configured for newsletter signups.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let email = '';
  let company = '';
  try {
    const body = await request.json();
    email = typeof body?.email === 'string' ? body.email.trim() : '';
    company = typeof body?.company === 'string' ? body.company.trim() : '';
  } catch {
    return new Response(
      JSON.stringify({ success: false, message: 'Invalid request body.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new Response(
      JSON.stringify({ success: false, message: 'Please provide a valid email address.' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  if (company) {
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  const result = await subscribeEmailToLaylo(email, token);
  if (!result.ok) {
    if (result.logMessage) {
      console.error('[laylo-subscribe] subscribe failed:', result.logMessage);
    }
    return new Response(
      JSON.stringify({ success: false, message: result.userMessage }),
      { status: 502, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
};
