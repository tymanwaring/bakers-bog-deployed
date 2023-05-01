import { useState } from 'react';
import styles from '../styles/ContactForm.module.css';
import axios from 'axios'

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const URL = "https://www.thebakersbog.com/api/contacts"
  
  const handleSubmit = async e => {
    e.preventDefault();
    const data = {
      name,
      email,
      message,
    };
    document.getElementById('contact_form').reset()
    await axios.post(URL, data);

    
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-1"></div>
        <div className="col-10">
          <div className={styles.feedbackForm}>
            <form id = "contact_form" onSubmit={handleSubmit}>
              <div className="container text-center">
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlInput1"></label>
                      <input type="name" className="form-control" id="exampleFormControlInput1" placeholder="Name" onChange={e => setName(e.target.value)} />
                    </div>
                    <div className={styles.padder}>
                      <div className="form-group">
                        <label htmlFor="exampleFormControlInput1"></label>
                        <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com" onChange={e => setEmail(e.target.value)} />
                      </div>
                    </div>
                  </div>
                  <div className="col-4">
                    <div className="form-group">
                      <label htmlFor="exampleFormControlTextarea1"></label>
                      <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" placeholder="I love your bread!" onChange={e => setMessage(e.target.value)}></textarea>
                    </div>
                  </div>
                </div>
              </div>
              <button onClick={() => document.getElementById} type="submit">Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>


  );
}

export default ContactForm;