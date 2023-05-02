import styles from "./Add.module.css"
import { FolderPlus } from 'react-bootstrap-icons';

const AddRecipeBtn = ({ setClose }) => {
    return (
        <div
            onClick={() => setClose(false)}
            className={styles.mainAddButton}>
            <span className={styles.icon}><FolderPlus size='xs' /></span>
        </div>
    )
}

export default AddRecipeBtn