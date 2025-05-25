import { ReactNode, useEffect, useState } from 'react'
import HireMe from '../components/HireMe'
import Navbar from '../components/Navbar'
import { menuItems } from '../data'
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'
import { API_BASE_URL, getApiHeaders, HTTP_VERBS } from '../api'
import Loader from '../components/Loader'

function HireMePage(): ReactNode {
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [apiResponses, setApiResponses] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function updateWebsiteViews() {
      const controller = new AbortController();
      const timeOut = parseInt(import.meta.env.VITE_BACKEND_API_TIMEOUT) || 1000;

      const timerId = setTimeout(() => {
        controller.abort('Update website view api timeout');
      }, timeOut);

      try {
        const rawWebsiteViewsResponse = await fetch(`${API_BASE_URL}/baas/website/`, {
          signal: controller.signal,
          headers: getApiHeaders(),
          method: HTTP_VERBS.POST,
        });

        if (timerId) clearTimeout(timerId);

        if (rawWebsiteViewsResponse.ok) {
          setApiSignal(true);
          setApiResponses(true);
        } else {
          setApiSignal(false);
          setApiResponses(false);
        }
      } catch (error) {
        setApiSignal(false);
        setApiResponses(false);
      }
    }

    updateWebsiteViews();
  }, []);

  if (apiSignal === null) return <Loader />;
  else if (!apiResponses) navigate("/offline");
  else
    return (
      <>
        <Navbar menuItems={menuItems} url={`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-cv`} disabled={true} />

        <HireMe />

        <div className='xl:absolute xl:bottom-0 w-full'>
          <Footer />
        </div>
      </>
    )
}

export default HireMePage