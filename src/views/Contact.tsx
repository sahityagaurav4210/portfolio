import { Contact2 } from 'lucide-react';
import React, { ReactNode, useMemo, useState } from 'react';
import { IContract } from '../interfaces/IContact';
import { toast } from 'react-toastify';
import { ApiController, ApiStatus } from '../api';
import { getAppToastConfig } from '../config';
import SimpleHeading from '../components/SimpleHeading';
import Divider from '../components/Divider';
import useCaptcha from '../hooks/useCaptcha';
import { FloatingInput, FloatingTextarea } from '../components/FloatingInput';
import FormNotes from '../components/FormNotes';
import CaptchaSection from '../components/CaptchaSection';
import FormSubmitButton from '../components/FormSubmitButton';

function Contact(): ReactNode {
  const {
    captchaData,
    captchaId,
    isLoading,
    setIsLoading,
    isValidated,
    setIsValidated,
    loadCaptcha,
    refreshCaptcha,
    handleCaptchaAudioBtnClick,
    handleCheckBoxOnChange,
  } = useCaptcha();

  const [contractDetails, setContractDetails] = useState<IContract>({
    first_name: '',
    last_name: '',
    email: '',
    message: '',
    captcha: '',
  });

  const charsLeft = useMemo(() => 254 - contractDetails.message.length, [contractDetails]);

  function contractDetailsTextboxHandler(
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) {
    setContractDetails({ ...contractDetails, [event.target.id]: event.target.value });
  }

  const onCaptchaCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    return handleCheckBoxOnChange(contractDetails.captcha, event);
  };

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isLoading) return;

    if (!event.isTrusted) {
      toast.error('Unauthoritive submit, please try again!!!', getAppToastConfig());
      return;
    }

    if (!isValidated) {
      toast.warning('Please verify your captcha first', getAppToastConfig());
      return;
    }

    if (contractDetails.message.length < 10) {
      toast.warning('Message is too short. It must be at least 10 characters long.', getAppToastConfig());
      return;
    }

    if (contractDetails.message.length > 255) {
      toast.warning('Message is too long.', getAppToastConfig());
      return;
    }

    if (contractDetails.email.length < 5) {
      toast.warning('Email is too short. It must be at least 5 characters long.', getAppToastConfig());
      return;
    }

    if (contractDetails.first_name.length < 2) {
      toast.warning('First name is too short', getAppToastConfig());
      return;
    }

    if (contractDetails.last_name && contractDetails.last_name.length < 2) {
      toast.warning('Last name is too short', getAppToastConfig());
      return;
    }

    setIsLoading(true);

    const payload = { ...contractDetails, captchaId, captcha: undefined };
    const controller = new ApiController();

    const contractApiResponse = await controller.POST('baas/contract/create', payload);

    if (contractApiResponse.status === ApiStatus.SUCCESS)
      toast.success(contractApiResponse.message, getAppToastConfig());
    else toast.error(contractApiResponse.message, getAppToastConfig());

    setContractDetails({
      first_name: '',
      last_name: '',
      email: '',
      message: '',
      captcha: '',
    });

    setIsLoading(false);
    setIsValidated(false);
    await loadCaptcha();
  }

  return (
    <div className='container mx-auto min-h-96'>
      <SimpleHeading headingName='Contact Me' />

      <div className='my-2'>
        <p className='text-sm lg:text-lg px-2 font-roboto text-justify'>
          Feel free to reach out for collaboration, project inquiries, or any opportunities. I’m always open to
          connecting and discussing new ideas. You can contact me by filling up the form given below.
        </p>
      </div>

      <Divider />

      <form
        className='px-4 py-2 mb-2 shadow-md shadow-gray-400 border-2 my-2 mx-2 border-dashed border-orange-400 rounded-md font-roboto'
        onSubmit={handleSubmit}
      >
        <div className='my-2'>
          <h1 className='text-center text-4xl font-bold underline underline-offset-4 decoration-dashed text-orange-500'>
            Contact Form
          </h1>
        </div>

        <div className='grid lg:grid-cols-2 gap-6 mb-4'>
          <FloatingInput
            type='text'
            id='first_name'
            value={contractDetails.first_name}
            isRequired
            required
            onChange={contractDetailsTextboxHandler}
            autoComplete='off'
            autoCapitalize='on'
            autoFocus
            label='First Name'
            helperText='Only alphabets are allowed.'
          />

          <FloatingInput
            type='text'
            id='last_name'
            value={contractDetails.last_name}
            onChange={contractDetailsTextboxHandler}
            autoComplete='off'
            autoCapitalize='on'
            label='Last Name'
            helperText='Only alphabets are allowed.'
          />
        </div>

        <div className='my-2'>
          <FloatingInput
            type='email'
            id='email'
            value={contractDetails.email}
            isRequired
            required
            onChange={contractDetailsTextboxHandler}
            autoComplete='off'
            autoCapitalize='on'
            label='Email'
            helperText='Please enter a valid email address.'
          />
        </div>

        <FloatingTextarea
          id='message'
          value={contractDetails.message}
          rows={2}
          onChange={contractDetailsTextboxHandler}
          autoComplete='off'
          label='Message'
          isRequired
          helperText='Please enter your message. It should be atleast of 10 characters and can be of atmost 254 characters.'
        />

        <div className='flex items-center justify-end'>
          <p className='text-caption text-blue-400 font-bold'>{charsLeft} characters left</p>
        </div>

        <CaptchaSection
          captchaData={captchaData}
          contractDetails={contractDetails}
          contractDetailsTextboxHandler={contractDetailsTextboxHandler}
          handleCheckBoxOnChange={onCaptchaCheckboxChange}
          isLoading={isLoading}
          isValidated={isValidated}
          refreshCaptcha={refreshCaptcha}
          handleCaptchaAudioBtnClick={handleCaptchaAudioBtnClick}
        />

        <FormNotes
          customNotes={[
            <p key='note-clumsy' className='text-xs text-justify'>
              Please do not send unnecessary and clumsy messages.
            </p>,
            <p key='note-length' className='text-xs text-justify'>
              Your message must be atleast 10 characters long.
            </p>,
          ]}
        />

        <div className='flex items-center mt-4'>
          <FormSubmitButton
            disabled={isLoading || !isValidated || !captchaId || charsLeft < 0 || contractDetails.message.length < 10}
            isLoading={isLoading}
            loadingText='Loading, please wait...'
            icon={<Contact2 className='mx-2' />}
          >
            Contact Me
          </FormSubmitButton>
        </div>
      </form>
    </div>
  );
}

const MemoizedContact = React.memo(Contact);
export default MemoizedContact;
