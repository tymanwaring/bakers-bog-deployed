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
    const [videoLink, setVideoLink] = useState("none")
    const [ingredients, setIngredients] = useState([])
    const [ingredient, setIngredient] = useState("")
    const [paragraphs, setParagraphs] = useState([])
    const [paragraph, setParagraph] = useState("")
    const URL = "https://www.thebakersbog.com/api/recipes"


    const handleIngredientInput = (e) => {
        setIngredient(e.target.value)
    }

    const handleIngredients = (e) => {
        setIngredients((prev) => [...prev, ingredient])
        console.log(ingredients)
    }

    const handleInstructInput = (e) => {
        setParagraph(e.target.value)
    }

    const handleIntructions = (e) => {
        setParagraphs((prev) => [...prev, paragraph])
        console.log(paragraphs)
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

            const { url } = uploadRes.data.secure_url;
            console.log(uploadRes.data.secure_url)
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
            <span onClick={() => setClose(true)} className={styles.close}>
                X
            </span>
            <div className={styles.wrapper}>

                <h1>Add New Recipe</h1>

                {/* Image */}
                <div className={styles.item}>
                    <label className={styles.label}>Choose an image</label>
                    <input className={styles.fileInput} type="file" onChange={(e) => setFile(e.target.files[0])} />
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
                
                {/* Igredients */}
                <div className = {styles.item}>

                <label className={styles.label}>Ingredients</label>
                <input
                    
                    type="input"
                    placeholder="2 tablespoons butter"
                    name="Ingredients"
                    onChange={handleIngredientInput}
                />
                </div>
                

                <div className = {styles.item}>
                    <button className={styles.extraButton} onClick={handleIngredients}>
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
                <div className = {styles.item}>

                <label className={styles.label}>Intructions</label>
                <textarea
                    
                    type="textarea"
                    rows={4}
                    placeholder="Preheat oven to 450 then place cookie sheet with..."
                    name="Instructions"
                    onChange={handleInstructInput}
                />
                </div>
                

                <div className = {styles.item}>
                    <button className={styles.extraButton} onClick={handleIntructions}>
                        Add
                    </button>
                </div>

                <div className={styles.extraItems}>
                        {paragraphs.map((option) => (
                            <span key={option.text} className={styles.extraItem}>
                                {option.text}
                            </span>
                        ))}
                </div>
                
                <button className={styles.addButton} onClick={handleCreate}>
                    Create
                </button>
            </div>
        </div>
    );
};

export default AddRecipe