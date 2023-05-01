import styles from "../styles/Sidebar.module.css";
import AddButton from "./AddButton";

const Sidebar = ({ admin, setClose }) => {

    const filterByType = async () => {
        return (console.log('hi'))

    };

    const toggleNav = () => {
        let nav = document.getElementById('side')
        console.log(nav.style.display)
        if (nav.style.display == 'none') {
            nav.style.display = 'block'
            nav.style.visibility = 'visible'
        }
        else {
            nav.style.display = 'none'
            nav.style.visibility = 'collapse'

        }

    }

    return (
        <div className="wrapper">
            <nav className={styles.sidebar} id="side">
                <div className={styles.sidebarHeader}>
                    <h4>Filter Products</h4>
                </div>
                <ul className="list-unstyled components" id="comps">
                    {/* <p>Dummy Heading</p> */}
                    <li className="border-bottom border-top">
                        <a className={styles.clickable} onClick={filterByType}>Breads</a>
                    </li>
                    <li className="border-bottom">
                        <a className={styles.clickable} onClick={filterByType}>Muffins</a>
                    </li>
                    <li className="border-bottom">
                        <a className={styles.clickable} onClick={filterByType}>Cakes</a>
                    </li>
                    <li className="border-bottom">
                        <a className={styles.clickable} onClick={filterByType}>Pastries</a>
                    </li>
                </ul>
            </nav>
            {/* <button className = "toggleNav" onClick={toggleNav}>Toggle</button> */}
            {admin && <AddButton setClose={setClose} />}
        </div>

    );
};

export default Sidebar;



{/* <div className={styles.content}>
<nav className="navbar navbar-expand-lg navbar-light">
    <div className="container-fluid">
        <div className={styles.sidebarCollapse}>
            <button type="button"
                id="sidebarCollapse"
                className="btn btn-info"
                onClick={() => {
                    var element = document.getElementById("side");
                    element.classList.toggle(styles.hideBar);
                }
                }>
                <i className="fas fa-align-left"></i>
                <span><ThreeDots /></span>
            </button>
        </div>
    </div>
</nav>
</div> */}