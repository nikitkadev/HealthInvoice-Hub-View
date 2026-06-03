import type { InvoiceShortly } from '../../types';
import RControlBriefInvoicesTable from './RControlBriefInvoicesTable/RControlBriefInvoicesTable';
import styles from './styles.module.scss';

interface RControlBriefInvoicesInformationProps {
    isBriefInvoicesFetching: boolean;
    data: InvoiceShortly[];
    fetchFinishedInvoices: (schetUid: number) => void;

};

const RControlBriefInvoicesInformation = ({
    data,
    fetchFinishedInvoices,
    isBriefInvoicesFetching }: RControlBriefInvoicesInformationProps) => {
    return (
        <div className={styles.rControlBriefInvoicesInformationRoot}>
            <RControlBriefInvoicesTable
                data={data}
                fetchFinishedInvoices={fetchFinishedInvoices}
                isLoading={isBriefInvoicesFetching}
            />
        </div>
    );
};

export default RControlBriefInvoicesInformation;