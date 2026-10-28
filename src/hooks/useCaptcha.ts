import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { API_BASE_URL, ApiController, ApiStatus, getApiHeaders } from '../api';
import { getAppToastConfig } from '../config';
import { IApiResponse } from '../interfaces';
import useAppHelperFn from './AppHelperFn';

export function useCaptcha() {
  const { loadCaptchaAudio } = useAppHelperFn();
  const [captchaData, setCaptchaData] = useState<string>();
  const [captchaId, setCaptchaId] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const loadCaptcha = useCallback(async () => {
    const controller = new AbortController();

    setIsLoading(true);
    try {
      const timerId = setTimeout(
        () => {
          controller.abort('Captcha api timeout');
        },
        Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000
      );

      const rawCaptchaResponse = await fetch(`${API_BASE_URL}/captcha`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });

      const { data } = (await rawCaptchaResponse.json()) as IApiResponse;
      const rawCaptchaBlobResponse = await fetch(`${API_BASE_URL}${data.url}`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });
      const blob = await rawCaptchaBlobResponse.blob();
      clearTimeout(timerId);

      setCaptchaData(URL.createObjectURL(blob));
      setCaptchaId(data.captchaId);
    } catch {
      toast.warning('Failed to refresh the data', getAppToastConfig());
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reloadCaptcha = useCallback(async () => {
    if (!captchaId) {
      toast.error('Captcha ID is missing. Please try again later.', getAppToastConfig());
      return;
    }

    const controller = new AbortController();
    const timeout = Number.parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT, 10) || 1000;
    const refreshCaptchaUri = `${API_BASE_URL}/ref-captcha?captchaId=${captchaId}`;
    setIsLoading(true);

    try {
      const timerId = setTimeout(() => controller.abort('Captcha api timeout'), timeout);
      const rawCaptchaResponse = await fetch(refreshCaptchaUri, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });

      const { data } = (await rawCaptchaResponse.json()) as IApiResponse;
      const rawCaptchaBlobResponse = await fetch(`${API_BASE_URL}${data.url}`, {
        signal: controller.signal,
        headers: getApiHeaders(),
      });
      const blob = await rawCaptchaBlobResponse.blob();
      clearTimeout(timerId);

      setCaptchaData(URL.createObjectURL(blob));
    } catch {
      toast.warning('Failed to refresh the data', getAppToastConfig());
    } finally {
      setIsLoading(false);
    }
  }, [captchaId]);

  const refreshCaptcha = useCallback(async () => {
    await reloadCaptcha();
  }, [reloadCaptcha]);

  const handleCaptchaAudioBtnClick = useCallback(async () => {
    if (isLoading) return null;

    if (!captchaId) {
      toast.error('Captcha ID is missing. Please try again later.', getAppToastConfig());
      return null;
    }

    try {
      setIsLoading(true);
      const audioUrl = await loadCaptchaAudio(captchaId);
      return audioUrl;
    } catch {
      toast.error('Failed to load audio for the captcha', getAppToastConfig());
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [captchaId, isLoading, loadCaptchaAudio]);

  const handleCheckBoxOnChange = useCallback(
    async (captchaValue: string | undefined, event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();

      if (isLoading || !event.isTrusted || isValidated || !captchaId) return;

      const controller = new ApiController();

      setIsLoading(true);

      const captchaValidateResponse = await controller.GET(
        `captcha-validate?captcha=${captchaValue}&captchaId=${captchaId}`
      );

      if (captchaValidateResponse.status === ApiStatus.SUCCESS && captchaValidateResponse.message === 'Captcha verified') {
        setIsLoading(false);
        setIsValidated(true);
        toast.success(captchaValidateResponse.message, getAppToastConfig());
        return;
      }

      if (captchaValidateResponse.status === ApiStatus.ERROR || captchaValidateResponse.status === ApiStatus.EXCEPTION) {
        await loadCaptcha();
      }

      setIsLoading(false);
      toast.error(captchaValidateResponse.message, getAppToastConfig());
    },
    [captchaId, isLoading, isValidated, loadCaptcha]
  );

  useEffect(() => {
    loadCaptcha();
  }, [loadCaptcha]);

  useEffect(() => {
    let id: NodeJS.Timeout;

    if (!isValidated && captchaId) {
      id = setInterval(() => {
        reloadCaptcha();
      }, Number(import.meta.env.VITE_CAPTCHA_TIMEOUT || 5) * 60 * 1000);
    }

    return function () {
      if (id) clearInterval(id);
    };
  }, [isValidated, captchaId, reloadCaptcha]);

  return {
    captchaData,
    captchaId,
    isLoading,
    setIsLoading,
    isValidated,
    setIsValidated,
    loadCaptcha,
    reloadCaptcha,
    refreshCaptcha,
    handleCaptchaAudioBtnClick,
    handleCheckBoxOnChange,
  };
}

export default useCaptcha;
