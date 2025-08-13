import './Services.css'

import search from '../../../assets/search.png';
import inventory from '../../../assets/inventory_2.png';
import send from '../../../assets/send.png';
import security from '../../../assets/security.png';
import imgsearch from '../../../assets/image-search-service.png'
import imginventory from '../../../assets/image-inventory-service.png'
import imgsend from '../../../assets/image-send-service.png'
import imgsecurity from '../../../assets/image-security-service.png'







const Services = () => {
  const services = [
    {
        title: 'Source from Industry Hubs',
        image: `${imgsearch}`,
        icon: `${search}`
    },
    {
        title: 'Customize Your Products',
        image: `${imginventory}`,
        icon: `${inventory}`
    },
    {
        title: 'Fast, reliable shipping by ocean or air',
        image:  `${imgsend}`,
        icon: `${send}`
    },
    {
        title: 'Product monitoring and inspection',
        image: `${imgsecurity}`,
        icon: `${security}`
    },
];


  return (
    <>
    <section className='Services'>
      <h2>Our extra services</h2>
            <div className="extra-services-grid">
                {services.map((services, index) => (
                    <div className="service-card" key={index}>
                        <div className="image-container">
                            <img src={services.image} alt={services.title} className="card-image" />
                           <figure className="service-icon">
                            <img src={services.icon} alt={`${services.title} icon`} />
                           </figure>
                            
                        </div>
                        <p className="card-title">{services.title}</p>
                    </div>
                ))}
            </div>
    </section>
    </>
  )
}

export default Services