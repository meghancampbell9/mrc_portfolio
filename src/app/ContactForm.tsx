import React, { useState } from 'react';
import styles from './ContactForm.module.css';
import { useIsMobile } from './useIsMobile';

interface ContactFormProps {
  onClose: () => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const isMobile = useIsMobile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
    onClose();
  };

  return (
    <div className={styles.popup}>
      <h2 className={`${styles.title} ${isMobile ? styles.mobileTitle : ''}`}>
        CONTACT
      </h2>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <textarea
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.submitButton}>
              Submit
            </button>
            <button type="button" onClick={onClose} className={styles.cancelButton}>
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;