import { UserAgent } from '../constants';
import { IApiReply } from '../interfaces/IApi';

export enum HTTP_VERBS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
  OPTIONS = 'OPTIONS',
}

export enum ApiStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  EXCEPTION = 'exception',
  VALIDATION = 'validation',
  CONFLICT = 'already exists',
  UNDEFINED = 'not defined',
  UNAUTHORISED = 'unauthorised',
  NOT_FOUND = 'not found',
  FORBIDDEN = 'forbidden',
  TIMEOUT = 'api time out',
  LOGOUT = 'Logout',
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
    } else {
      return null;
    }
  } catch {
    return null;
  }
}

export class ApiController {
  public async GET(url: string): Promise<IApiReply> {
    try {
      const controller = new AbortController();
      const headers = getApiHeaders();

      setTimeout(
        () => {
          controller.abort();
        },
        Number(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 5000
      );

      const rawReply = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/${url}`, {
        method: HTTP_VERBS.GET,
        headers,
        signal: controller.signal,
      });

      const reply = (await rawReply.json()) as IApiReply;

      return reply;
    } catch {
      const reply = {
        status: ApiStatus.TIMEOUT,
        message: 'Connection broked, please try again later',
      };

      return reply;
    }
  }

  public async POST(url: string, payload?: Record<string, any>): Promise<IApiReply> {
    try {
      const controller = new AbortController();
      const headers = { ...getApiHeaders(), 'Content-Type': 'application/json', Accept: 'application/json' };
      const stringifiedPayload = payload ? { body: JSON.stringify(payload) } : {};

      setTimeout(
        () => {
          controller.abort();
        },
        Number(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 5000
      );

      const rawReply = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/${url}`, {
        method: HTTP_VERBS.POST,
        headers,
        signal: controller.signal,
        ...stringifiedPayload,
      });

      const reply = (await rawReply.json()) as IApiReply;

      return reply;
    } catch {
      const reply = {
        status: ApiStatus.TIMEOUT,
        message: 'Connection broked, please try again later',
      };

      return reply;
    }
  }
}
