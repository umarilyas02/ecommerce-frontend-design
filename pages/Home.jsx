import Navbar from '../src/components/Layout/Navbar.jsx'
import Hero from '../src/components/Home/Hero/Hero.jsx'
import Deals_Section from '../src/components/Home/Deals_Section/Deals_Section.jsx'
import Products_Section_1 from '../src/components/Home/Products_Section_1/Products_Section_1.jsx'
import Products_Section_2 from '../src/components/Home/Products_Section_2/Products_Section_2.jsx'
import Quotation_Form from '../src/components/Home/Quotation_Form/Quotation_Form.jsx'
import Recommended_Items from '../src/components/Home/RecommendedProducts/RecommendedProducts.jsx'
import Services from '../src/components/Home/Services/Services.jsx'
import Newsletter from '../src/components/Layout/Newsletter.jsx'
import Footer from '../src/components/Layout/Footer.jsx'
import Suppliers from '../src/components/Home/Suppliers/Suppliers.jsx'

const Home = () => {
  return (
    <>
    
    {/* < Navbar /> */}
    < Hero />
    < Deals_Section />
    <Products_Section_1 />
    <Products_Section_2 />
    <Quotation_Form />
    <Recommended_Items />
    <Services />
    <Suppliers />
    {/* <Newsletter />
    < Footer /> */}

    </>
  )
}

export default Home