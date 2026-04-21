import { useCallback } from 'react';
import { API_BASE_URL, getApiHeaders } from '../api';
import SkillImage from '../assets/skill.avif';

function useAppHelperFn() {
  async function loadCaptchaAudio(captchaId: string): Promise<string> {
    const rawBlob = await fetch(`${API_BASE_URL}/captcha/audio/${captchaId}`, {
      headers: getApiHeaders(),
      keepalive: true,
    });

    const blob = await rawBlob.blob();
    return URL.createObjectURL(blob);
  }

  const getResourceUrl = useCallback(function (relativeUrl: string | undefined | null) {
    return relativeUrl ? `${import.meta.env.VITE_BACKEND_BASE_URL}${relativeUrl}` : SkillImage;
  }, []);

  return { loadCaptchaAudio, getResourceUrl };
}

export default useAppHelperFn;
