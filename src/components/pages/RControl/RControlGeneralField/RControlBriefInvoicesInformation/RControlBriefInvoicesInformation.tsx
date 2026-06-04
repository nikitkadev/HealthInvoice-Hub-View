import type { InvoiceShortly } from '../../types';
import RControlBriefInvoicesTable from './RControlBriefInvoicesTable/RControlBriefInvoicesTable';
import styles from './styles.module.scss';

interface RControlBriefInvoicesInformationProps {
    isBriefInvoicesFetching: boolean;
    data: InvoiceShortly[];
    setSelectedInvoice: (invoice: InvoiceShortly) => void;

};

const RControlBriefInvoicesInformation = ({
    data,
    isBriefInvoicesFetching,
    setSelectedInvoice }: RControlBriefInvoicesInformationProps) => {
    return (
        <div className={styles.rControlBriefInvoicesInformationRoot}>
            <RControlBriefInvoicesTable
                data={data}
                isLoading={isBriefInvoicesFetching}
                setSelectedInvoice={setSelectedInvoice}
            />
        </div>
    );
};

export default RControlBriefInvoicesInformation;