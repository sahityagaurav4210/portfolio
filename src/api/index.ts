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
  return { 'x-api-key': import.meta.env.VITE_BACKEND_TOKEN, 'user-agent': UserAgent };
}
