import { useState } from "react"
import styles from "../../styles/Add.module.css"
import axios from "axios"


const AddRecipe = ({ setClose }) => {
    const [file, setFile] = useState(null)
    const [title, setTitle] = useState(null)
    const [desc, setDesc] = useState(null)
    const [prep_time, setPrep] = useState(null)
    const [cook_time, setCook] = useState(null)
    const [category, setCategory] = useState(null)
    const [rating, setRating] = useState(4.5)
    const [videoLink, setVideoLink] = useState("ytb_link")
    const [paragraphs, setparagraphs] = useState([])
    const [prices, setPrices] = useState([])
    const [ingredients, setIngredients] = useState([(1, 'Eggs'), (2, 'Butter')])
    const [extra, setExtra] = useState(null)
    const URL = "https://www.thebakersbog.com/api/recipes"


    const changePrice = (e, index) => {
        const currentPrices = prices;
        currentPrices[index] = e.target.value;
        setPrices(currentPrices);
    }

    const handleExtraInput = (e) => {
        setExtra({ ...extra, [e.target.name]: e.target.value })
    }

    const handleExtra = (e) => {
        setIngredients((prev) => [...prev, extra]);
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
            const newRecipe = {
                title,
                ingredients,
                prep_time,
                cook_time,
                desc,
                img: url,
                videoLink,
                rating,
                category,
                paragraphs,
            };

            await axios.post(URL, newRecipe);
            setClose(true);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <span onClick={() => setClose(true)} className={styles.close}>
                    X
                </span>
                <h1>Add New Recipe</h1>

                {/* Image */}
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input className = {styles.fileInput} type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>

                {/* Title */}
                <div className={styles.item}>
                    <label className={styles.label}>Title</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                {/* Description */}
                <div className={styles.item}>
                    <label className={styles.label}>Description</label>
                    <textarea
                        rows={4}
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                    />
                </div>

                {/* Prep Time */}
                <div className={styles.item}>
                    <label className={styles.label}>Prep Time</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setPrep(e.target.value)}
                    />
                </div>

                {/* Cook Time */}
                <div className={styles.item}>
                    <label className={styles.label}>Cook Time</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setCook(e.target.value)}
                    />
                </div>

                {/* Category */}
                <div className={styles.item}>
                    <label className={styles.label}>Category</label>
                    <input
                        className={styles.input}
                        type="text"
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                {/* Instructions */}
                {/* <div className={styles.item}>
                    <label className={styles.label}>Instructions</label>
                    <textarea
                        rows={4}
                        type="text"
                        onChange={(e) => setInstructions(e.target.value)}
                    />
                </div> */}

                {/* <div className={styles.item}>
                    <label className={styles.label}>Ingredients</label>
                    <div className={styles.extra}>
                        <input
                            className={`${styles.input}`}
                            type="text"
                            placeholder="Item"
                            name="text"
                            onChange={handleExtraInput}
                        />
                        <button className={styles.extraButton} onClick={handleExtra}>
                            Add
                        </button>
                    </div>
                    <div className={styles.extraItems}>
                        {ingredients.map((option) => (
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

export default AddRecipe