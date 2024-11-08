import styles from './styles.module.scss';
import clsx from "clsx";

 const FormSearch = ({value, onChange}) => {
    return (
        <div className={styles.searchBox}>
            <input
                type="text"
                placeholder="Search..."
                value={value}
                onChange={onChange}
                className="border-2 m-3 p-2"
            />
        </div>
    )
 }

 export { FormSearch };