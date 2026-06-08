import RControlCategoriesField from '../RControlCategoriesField/RControlCategoriesField';
import Cases from './Cases';
import FinishedCases from './FinishedCases';
import Invoices from './Invoices/Invoices';

import styles from './styles.module.scss';

const RControlGeneralField = () => {

    return (

        <div className={styles.rControlGeneralFieldRoot}>

            <Invoices />
            <FinishedCases />
            <Cases />
            <RControlCategoriesField />

        </div>

    )
};

export default RControlGeneralField;