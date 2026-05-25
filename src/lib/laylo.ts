const LAYLO_GRAPHQL_URL = 'https://laylo.com/api/graphql';

export interface LayloSubscribeResult {
  ok: boolean;
  userMessage: string;
  logMessage?: string;
}

export async function subscribeEmailToLaylo(email: string, token: string): Promise<LayloSubscribeResult> {
  try {
    const response = await fetch(LAYLO_GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query: `
          mutation SubscribeToUser($email: String) {
            subscribeToUser(email: $email)
          }
        `,
        variables: { email }
      })
    });

    const raw = await response.text();
    let data: any = null;
    try {
      data = raw ? JSON.parse(raw) : null;
    } catch {
      data = null;
    }

    const isSubscribed = data?.data?.subscribeToUser === true;
    if (response.ok && isSubscribed) {
      return { ok: true, userMessage: 'Subscribed.' };
    }

    const layloError =
      data?.errors?.[0]?.message ??
      data?.message ??
      `Laylo request failed with status ${response.status}.`;

    return {
      ok: false,
      userMessage: 'Could not subscribe right now. Please try again in a moment.',
      logMessage: layloError
    };
  } catch (error) {
    return {
      ok: false,
      userMessage: 'Could not subscribe right now. Please try again in a moment.',
      logMessage: error instanceof Error ? error.message : 'Unknown Laylo network error.'
    };
  }
}
