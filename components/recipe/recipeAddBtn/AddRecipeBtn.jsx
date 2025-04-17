import styles from "./Add.module.css"

const AddRecipeBtn = ({ setClose }) => {
    return (
        <button
            onClick={() => setClose(false)}
            className="px-4 py-1.5 text-sm bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 rounded-md font-serif transition-colors">
            Add
        </button>
    )
}

export default AddRecipeBtn