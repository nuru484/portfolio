// src/utils/youtube.ts
//
// Shared by validation (client + server) and the public embed, so a stored
// youtubeUrl is always one we know how to render.

/** Extracts the video id from any common YouTube URL shape, or null. */
export function youtubeVideoId(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const host = parsed.hostname.replace(/^www\.|^m\./, '');
  const isId = (v: string | null): v is string =>
    !!v && /^[A-Za-z0-9_-]{6,20}$/.test(v);

  if (host === 'youtu.be') {
    const id = parsed.pathname.slice(1).split('/')[0];
    return isId(id) ? id : null;
  }

  if (host === 'youtube.com' || host === 'youtube-nocookie.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v');
      return isId(id) ? id : null;
    }
    const match = parsed.pathname.match(/^\/(?:embed|shorts|live)\/([^/?]+)/);
    return match && isId(match[1]) ? match[1] : null;
  }

  return null;
}

/** Privacy-friendly embed URL for a validated YouTube link, or null. */
export function youtubeEmbedUrl(url: string): string | null {
  const id = youtubeVideoId(url);
  return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
}
