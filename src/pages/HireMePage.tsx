import { ReactNode } from 'react'
import HireMe from '../components/HireMe'
import Navbar from '../components/Navbar'
import { menuItems } from '../data'
import Footer from '../components/Footer'

function HireMePage(): ReactNode {
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