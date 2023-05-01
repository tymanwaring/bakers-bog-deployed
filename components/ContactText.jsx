import styles from '../styles/ContactText.module.css';
import Image from "next/image";

const ContactText = () => {
    return (
        <div className="container text-center">
            {/* <div className="row">
                <div className="col-12">
                    <Image src="/img/Logo.png" alt="" width="300px" height="300px" />
                </div>
            </div> */}
            <div className="row">
                <div className="col-12">
                    <h1 className={styles.top_padding}>Contact</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <br></br>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className={`${styles.txt} divider py-1 bg-light rounded`}></div>
                </div>
                <div className="col">

                </div>
                <div className="col">

                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <br></br>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <h4 className={styles.txt}>Have a question or want to work together? Use the contact form below and let&aposs link up!</h4>
                    <h4 className={styles.bottom_padding}>Let&aposs also connect on Pintrest, Instagram, Youtube, and Twitter!</h4>
                </div>
            </div>

        </div>


    );
}

export default ContactText;