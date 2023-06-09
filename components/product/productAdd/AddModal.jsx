import { useState } from "react"
import styles from "./Add.module.css"
import axios from "axios"


const Add = ({ setClose }) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prices, setPrices] = useState([])
    const [extraOptions, setExtraOptions] = useState([])
    const [extra, setExtra] = useState(null)
    const URL = "https://www.thebakersbog.com/api/products"


    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value })
    }

    const handleExtra = (e) => {
        setExtraOptions((prev) => [...prev, extra]);
    }

    const handleCreate = async () => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "uploads");
        try {
            const uploadRes = await axios.post(
                "https://api.cloudinary.com/v1_1/du8fllxg7/image/upload",
                data
            );

            const { url } = uploadRes.data;
            const newProduct = {
                title,
                desc,
                prices,
                extraOptions,
                img: uploadRes.data.secure_url,
            };
            console.log(newProduct)
            await axios.post(URL, newProduct);
            setClose(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <span onClick={() => setClose(true)} className={styles.close}>
                X
            </span>
            <div className={styles.wrapper}>

                <h1>Add New Product</h1>
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input className={styles.fileInput} type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="Hopefully something yummy :)"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Desc</label>
                    <textarea
                        rows={4}
                        type="text"
                        placeholder = "A tastey treat for all to enjoy!"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>
                <div className={styles.item}>
                    <label className={styles.label}>Price</label>
                    <div className={styles.priceContainer}>
                        <input
                            className={`${styles.priceInput}`}
                            type="number"
                            placeholder="$5"
                            onChange={(e) => changePrice(e, 0)}
                        />
                    </div>
                </div>
                {/* <div className={styles.item}>
                    <label className={styles.label}>Extra</label>
                    <div className={styles.extra}>
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="text"
                            placeholder="Item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <input
                            className={`${styles.input} ${styles.inputSm}`}
                            type="number"
                            placeholder="Price"
                            name="price"
                            onChange={handleExtraInput}
                        />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                    <div className={styles.extraItems}>
                        {extraOptions.map((option) => (
                            <span key={option.text} className={styles.extraItem}>
                                {option.text}
                            </span>
                        ))}
                    </div>
                </div> */}
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default Add