import { useState } from 'react';
import styles from '../styles/Contact.module.css';
import ContactForm from "../components/ContactForm";
import ContactText from "../components/ContactText";
import TestNav from "../components/TestNav";

export default function Contact({ }) {
    return (
        <div className={styles.container}>

            <div className={styles.cover}>
                <TestNav/>
                <ContactText></ContactText>
                <ContactForm></ContactForm>
            </div>
        </div>

    );
}