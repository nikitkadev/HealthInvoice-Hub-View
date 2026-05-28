import type { LogicControlDefectDto } from './types';

import { useParams, useSearchParams } from 'react-router'
import { useEffect, useState } from 'react';
import { api } from '../../../shared/api/ApiClient';

import Loader from '../../ui/Loaders/Loader';
import styles from './styles.module.scss';

const LogicControlErrors = () => {
    const [errors, setErrors] = useState<LogicControlDefectDto[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();

    const { schetUid } = useParams<{ schetUid: string }>();

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

    useEffect(() => {
        document.title = `HIH - Ошибки счета UID: ${schetUid}`
    }, []);

    return (
        <>
            {isLoading ? (
                <Loader size='xs' />
            ) : (
                <div className={styles.logicControlErrorsRoot}>
                    <div className={styles.tableContainer}>
                        <table>
                            <colgroup>
                                <col style={{ width: '1.5rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '2rem' }} />
                                <col style={{ width: '4rem' }} />
                                <col style={{ width: '3rem' }} />
                                <col style={{ width: '3rem' }} />
                                <col style={{ width: '3.5rem' }} />
                                <col style={{ width: '15rem' }} />
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
};

export default LogicControlErrors;