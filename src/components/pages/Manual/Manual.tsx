import styles from './styles.module.scss';
import config from '../../../../package.json';
import GorizontalSeparator from '../../ui/Seporators/GorizontalSeporator';
import Status from '../../ui/Status';
import { InvoiceStatus } from '../../../app/types/InvoiceStatus';

const Manual = () => {
    return (
        <div className={styles.manualRoot}>
            <div className={styles.wrapper}>
                <h1>Инструкция на момент версии {config.version}</h1>

                <GorizontalSeparator size='md' type='space' />

                <h2>Разработчик вещает</h2>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    Коллеги! Я не профессионал писать инструкции, но убрал всю воду — только суть.
                </p>

                <p>
                    Инструкция построена просто: заголовок — что делать, описание — как и зачем.
                </p>

                <p>
                    В конце — дополнительная информация и FAQ
                    (Frequently Asked Questions — часто задаваемые вопросы).
                </p>

                <GorizontalSeparator size='md' type='space' />

                <h2>Желанная цель</h2>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    Загрузить ZIP-архив с реестрами в систему для дальнейшей проверки ФК и отправки на МЭК.
                </p>

                <p>
                    После проверки МЭК скачайте файл ответа. Если есть ошибки — исправьте их и отправьте счет повторно, если ошибок нет — смело отправляйте счет на боевой контур!
                </p>

                <p>
                    Примерно в таком представление находится данный сервис!
                </p>

                <GorizontalSeparator size='md' type='space' />

                <h2>Как загрузить</h2>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 1. Открыть журнал</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    В меню справа сверху представлен раздел "Журнал ЛК". Данный журнал является основным в ЧИХе
                    и в нем находятся основные функции сервиса. Смело перейдите в него, чтобы выполнить шаг 1.
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 2. Загрузить счета</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    В журнале ЛК найдите кнопку <strong>«Добавить счета»</strong>. Нажмите — справа откроется панель загрузки.
                </p>

                <p>
                    В панели есть Drag & Drop зона: просто перетащите ZIP-архивы с счетами
                    (или кликните на зону и выберите файлы в проводнике).
                </p>

                <p>
                    После отправки появится анимация загрузки, а по окончании проверки —
                    итоги по каждому счету.
                </p>

                <p>
                    Чтобы скачать файл ответа ФК: вызовите контекстное меню правой кнопкой мыши
                    на нужном счете → выберите <strong>«Скачать ответ МЭК»</strong>.
                </p>

                <p>
                    Счета под статусами "Ошибки" и "Успешно" попадают в журнал ФК, который можно открыть по кнопке <strong>«Журнал ФК»</strong> в меню ЧИХа.
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 3. Дождаться записи в БД</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    После отправки счетов на запись они начнут записываться в базу данных.
                    Длительность зависит от объема счетов, но обычно занимает пару секунд на каждый счет.
                </p>

                <p>
                    Периодически обновляйте журнал кнопкой <strong>«Обновить журнал»</strong>,
                    чтобы видеть свежие счета в таблице.
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 4. Отправить на МЭК</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    Выделите счета (хотя бы один). Нажмите правой кнопкой мыши — откроется контекстное меню.
                    Выберите <strong>«Провести МЭК»</strong> — счета встанут в очередь на проверку.
                    Также в меню доступны: скачать ответ, просмотреть ошибки, удалить счета.
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 5. Дождаться проверки</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    Дождитесь окончания проверки МЭК. В среднем на один счёт уходит 1-2 минуты.
                    Периодически обновляйте журнал — статусы будут обновляться.
                </p>

                <p>
                    В этот момент можно отойти от компьютера и сделать зарядку для глаз!
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Шаг 6. Скачать ответ МЭК</h3>

                <GorizontalSeparator size='xs' type='space' />

                <p>
                    И последний шаг: в зависимости от статуса действуйте по сценарию:
                </p>

                <p>
                    <strong>Статус «Успешно»</strong> — счёт можно смело отправлять в боевой контур.
                    <br /><strong>Статус «Ошибки»</strong> — скачайте ответ МЭК через контекстное меню,
                    исправьте ошибки и повторите шаги заново.
                </p>

                <GorizontalSeparator size='sm' type='space' />

                <h2>Дополнительно</h2>

                <GorizontalSeparator size='sm' type='space' />

                <h3>Статусы сервиса HealthInvoice Hub</h3>

                <GorizontalSeparator size='sm' type='space' />


                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.Fatal} />
                    <p>— сбой со стороны ТФОМС РХ в работе процедуры проведения МЭК.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.FormatControlError} />
                    <p>— проверка ФК или МЭК выявила ошибки по счету.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.Success} />
                    <p>— проверка ФК или МЭК не выявила ошибок по счету.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.NotAllowed} />
                    <p>— проверка ФК выявила критическую ошибку по счету.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.Pending} />
                    <p>— счет ожидает, когда пользователь отправит его на МЭК.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.Processing} />
                    <p>— происходит проверка МЭК.</p>
                </div>

                <GorizontalSeparator size='xs' type='space' />

                <div className={styles.statusInfo}>
                    <Status status={InvoiceStatus.Rewrite} />
                    <p>— проверка ФК выявила раннее записанный счет, который при отправке будет перезаписан.</p>
                </div>
            </div>
        </div>
    )
};

export default Manual;