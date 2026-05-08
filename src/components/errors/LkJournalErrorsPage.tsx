import { useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react';
import { LoaderBlock } from '../../shared/ui/loader/LoaderBlock';
import { api } from '../../shared/api/ApiClient';
import styles from './LkJournalErrorsPage.module.css'

interface LogicControlDefectDto {
    comment: string;
    basEl: string;
    imPol: string;
    kod: number;
    nZap: number;
    idCase: number;
    slId: string;
    fam: string;
    im: string;
    ot: string;
    dr: Date;
    date1: Date;
    date2: Date;
    iddokt: string;
}

export const LkJournalErrorsPage = () => {
    const [errors, setErrors] = useState<LogicControlDefectDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const { schetUid } = useParams<{ schetUid: string }>();
    const [searchParams] = useSearchParams();

    const journalType = Number(searchParams.get('journalType')) || 1;

    useEffect(() => {
        const fetchErrors = async () => {
            try {
                setIsLoading(true);
                const data = await api.get(`/invoices/${schetUid}/errors`, {
                    journalType: journalType.toString()
                });
                setErrors(data);
            } catch (error) {
                console.error('Ошибка загрузки:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (schetUid) {
            fetchErrors();
        }
    }, [schetUid, journalType]);

    return (
        <>
            {isLoading ? (
                <LoaderBlock text='Ожидаем пантеон рейдов...' size='small' />
            ) : (
                <div className={styles.container}>
                    <div className={styles.table_container}>
                        <table>
                            <colgroup>
                                <col style={{ width: '16px' }} />
                                <col style={{ width: '20px' }} />
                                <col style={{ width: '24px' }} />
                                <col style={{ width: '30px' }} />
                                <col style={{ width: '30px' }} />
                                <col style={{ width: '24px' }} />
                                <col style={{ width: '80px' }} />
                                <col style={{ width: '48px' }} />
                                <col style={{ width: '48px' }} />
                                <col style={{ width: '48px' }} />
                                <col style={{ width: '300px' }} />
                            </colgroup>
                            <thead>
                                <tr>
                                    <th>№</th>
                                    <th>OSHIB</th>
                                    <th>IM_POL</th>
                                    <th>BAS_EL</th>
                                    <th>N_ZAP</th>
                                    <th>IDCASE</th>
                                    <th>SL_ID</th>
                                    <th>FAM</th>
                                    <th>IM</th>
                                    <th>OT</th>
                                    <th>COMMENT</th>
                                </tr>
                            </thead>
                            <tbody>
                                {errors.map((error, index) => {
                                    return (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{error.kod}</td>
                                            <td>{error.imPol}</td>
                                            <td>{error.basEl}</td>
                                            <td>{error.nZap}</td>
                                            <td>{error.idCase}</td>
                                            <td>{error.slId}</td>
                                            <td>{error.fam}</td>
                                            <td>{error.im}</td>
                                            <td>{error.ot}</td>
                                            <td>{error.comment}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div >
            )}
        </>

    )
}