import styles from '../styles/Contact.module.css';
import ContactText from '../components/contact/ContactText/ContactText';
import ContactForm from '../components/contact/contactForm/ContactForm';
import Navbar from "../components/main/navbar/Navbar";

export default function Contact({ }) {
    return (
        <div className={styles.container}>

            <div className={styles.cover}>
                <Navbar/>
                <ContactText></ContactText>
                <ContactForm></ContactForm>
            </div>
        </div>

    );
}