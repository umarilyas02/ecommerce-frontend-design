import { Outlet } from 'react-router-dom'
import Newsletter from './Newsletter'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = () => {
  return (
   <>
   <Navbar />
   <Outlet />
   <Newsletter />
    <Footer />
   </>
  )
}

export default Layout