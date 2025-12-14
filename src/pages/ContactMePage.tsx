import { memo, ReactNode, useEffect, useState } from 'react';
import Contact from '../views/Contact';
import Navbar from '../components/Navbar';
import { menuItems } from '../data';
import Footer from '../components/Footer';
import { useNavigate } from 'react-router-dom';
import { ApiController, ApiStatus } from '../api';
import Loader from '../components/Loader';

function ContactMePage(): ReactNode {
  const [apiSignal, setApiSignal] = useState<boolean | null>(null);
  const [apiResponses, setApiResponses] = useState({
    pingApi: false,
    updateWebsiteViewsApi: false,
  });
  const navigate = useNavigate();

  async function updateWebsiteViews() {
    const controller = new ApiController();

    try {
      const rawWebsiteViewsResponse = await controller.POST("baas/website");

      if (rawWebsiteViewsResponse.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setApiResponses(prev => ({ ...prev, updateWebsiteViewsApi: true }));
      }
    } catch {
      setApiSignal(false);
      setApiResponses(prev => ({ ...prev, updateWebsiteViewsApi: true }));
    }
  }

  async function ping() {
    const controller = new ApiController();

    try {
      const response = await controller.GET("ping");

      if (response.status === ApiStatus.SUCCESS) {
        setApiSignal(true);
      } else {
        setApiSignal(false);
        setApiResponses(prev => ({ ...prev, pingApi: true }));
      }
    } catch {
      setApiSignal(false);
      setApiResponses(prev => ({ ...prev, pingApi: true }));
    }
  }

  useEffect(() => {
    Promise.all([ping(), updateWebsiteViews()]);
  }, []);

  if (apiSignal === null) return <Loader />;
  else if (apiResponses.pingApi && apiResponses.updateWebsiteViewsApi) navigate("/offline");
  else
    return (
      <>
        <Navbar
          menuItems={menuItems}
          url={`${import.meta.env.VITE_BACKEND_BASE_URL}/baas/files/download-cv`}
          disabled
        />

        <Contact />

        <div>
          <Footer />
        </div>
      </>
    );
}

export default memo(ContactMePage);