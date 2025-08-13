import './Quotation_Form.css';

const Quotation_Form = () => {
  return (
   <section className='Quotation_Form'>
    <div className="quote-content">
        <h2>An easy way to send requests to all suppliers</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
      </div>
      <div className="quote-form-container">
        <h3>Send quote to suppliers</h3>
        <div className="form-group">
          <input type="text" placeholder="What item you need?" />
        </div>
        <div className="form-group">
          <textarea placeholder="Type more details"></textarea>
        </div>
        <div className="form-row">
          <div className="form-group quantity-group">
            <input type="number" placeholder="Quantity" />
          </div>
          <div className="form-group pcs-group">
            <select>
              <option>Pcs</option>
              <option>Kg</option>
              <option>Box</option>
            </select>
          </div>
        </div>
        <button className="send-inquiry-btn">Send Inquiry</button>
      </div>
   </section>
  )
}

export default Quotation_Form