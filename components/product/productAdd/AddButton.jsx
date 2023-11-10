import styles from "./Add.module.css"
import { FolderPlus } from 'react-bootstrap-icons';

const AddButton = ({ setClose }) => {
    return (
        <div
            onClick={() => setClose(false)}
            className={styles.mainAddButton}>
            <span className={styles.icon}><FolderPlus size={32} /></span>
        </div>
    )
}

export default AddButton