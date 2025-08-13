import './Newsletter.css'
import email from '../../assets/email.png'

const Newsletter = () => {
  return (
    <>
    <section className="newsletter-section">
            <div className="newsletter-container">
                <h2 className="newsletter-title">Subscribe on our newsletter</h2>
                <p className="newsletter-subtitle">Get daily news on upcoming offers from many suppliers all over the world</p>
                <form className="newsletter-form">
                    <div className="input-wrapper">
                        <span className="email-icon">
                            <img src={email} alt="" />
                        </span>
                        <input type="email" placeholder="Email" className="email-input" />
                    </div>
                    <button type="submit" className="subscribe-btn">Subscribe</button>
                </form>
            </div>
        </section>
    </>
  )
}

export default Newsletter