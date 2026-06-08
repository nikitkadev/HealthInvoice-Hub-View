import styles from "./styles.module.scss";

const DefaultCategory = () => {

    return (
        <div className={styles.defaultCategoryRoot}>
            <span>Нет выбранной категории</span>
        </div>
    );

};

export default DefaultCategory;