import { API_BASE_URL, getApiHeaders } from '../api';

function useAppHelperFn() {
  async function loadCaptchaAudio(captchaId: string): Promise<string> {
    const rawBlob = await fetch(`${API_BASE_URL}/captcha/audio/${captchaId}`, {
      headers: getApiHeaders(),
      keepalive: true,
    });

    const blob = await rawBlob.blob();
    return URL.createObjectURL(blob);
  }

  return { loadCaptchaAudio };
}

export default useAppHelperFn;
