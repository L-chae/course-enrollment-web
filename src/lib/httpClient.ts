const isAbsoluteUrl = (url: string) => /^https?:\/\//i.test(url);

const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL;
  if (configuredSiteUrl) {
    return configuredSiteUrl;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return 'http://localhost:3000';
};

const resolveUrl = (url: string) => {
  if (isAbsoluteUrl(url)) {
    return url;
  }

  return new URL(url, getBaseUrl()).toString();
};

export async function httpClient<T>(url: string, init?: RequestInit): Promise<T> {
  const headers = new Headers(init?.headers);
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }

  const response = await fetch(resolveUrl(url), {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}
