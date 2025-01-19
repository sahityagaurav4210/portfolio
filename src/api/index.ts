import { UserAgent } from '../constants';

export enum HTTP_VERBS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export const API_BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL || 'http://localhost:12318/api/v1';
export function getApiHeaders(): HeadersInit {
  return { 'x-api-key': import.meta.env.VITE_BACKEND_TOKEN, 'x-user-id': UserAgent };
}

export async function downloadMedia(url: string, signal?: AbortSignal) {
  try {
    const apiOptions = signal ? { signal, headers: getApiHeaders() } : { headers: getApiHeaders() };
    const media = await fetch(url, apiOptions);
    const mediaApiResponse = await media.blob();

    if (media.ok) {
      const response = URL.createObjectURL(mediaApiResponse);
      return response;
    }
    else {
      return null;
    }
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
