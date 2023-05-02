import styles from "../../styles/Add.module.css"
import { CloudPlusFill, FolderPlus, UniversalAccess, Upload } from 'react-bootstrap-icons';

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