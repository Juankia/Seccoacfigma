import { API_URL, TENANT_ID } from '@/lib/constants/branding';
import { ApiResponse } from '@/types';

async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_URL}${endpoint}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Tenant-Id': TENANT_ID,
    ...((options.headers as Record<string, string>) || {}),
  };

  const res = await fetch(url, { ...options, headers });

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Error de red' }));
    throw new Error(error.message || `Error ${res.status}`);
  }

  const json: ApiResponse<T> = await res.json();
  return json.data;
}

export const api = {
  get: <T>(endpoint: string) => apiFetch<T>(endpoint),
  post: <T>(endpoint: string, body: unknown) =>
    apiFetch<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    }),
};
