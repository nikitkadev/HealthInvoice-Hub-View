import { useState } from 'react';
import { Separator } from '../../shared/ui/seporator/Separator';
import { Status } from '../../shared/ui/status/Status';
import styles from './Docs.module.css';

export const Docs = () => {

    const [descBlock, setDescBlock] = useState<{
        visible: boolean,
        message: string,
        x: number,
        y: number
    }>({ visible: false, message: '', x: 0, y: 0 })

    const handleMouseEnter = (e: React.MouseEvent, message: string) => {
        setDescBlock({
            visible: true,
            message,
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleMouseLeave = () => {
        setDescBlock(prev => ({ ...prev, visible: false }));
    };

    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Инструкция пользования</h1>
                <Separator size='md' type='line' color='var(--border-light)' />
                <div className={styles.docs_header}>
                    <p className={styles.p}>
                        Здравствуйте еще разок! Эта страница раскроет вам все тайны функционала данного сервиса и расскажет,
                        как не потеряться в пользовательском интерфейсе, который я и так постарался максимально упростить.
                    </p>
                    <p className={styles.p}>
                        Инструкция актуальна на момент версии <b>HealthInvoice Hub 1.0.0</b> от <b>27.04.2026г.</b>
                    </p>
                </div>
                <Separator size='xs' type='space' />
                <div className={styles.docs_content_container}>
                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>Что такое HealthInvoice Hub?</h2>
                        <Separator size='sm' type='space' />
                        <p className={styles.p}>
                            «HealthInvoice Hub» (он же «Хилз Инвойс Хаб», «ЧИХ», «ХИХ» или просто «Хаб») — это специализированный
                            B2B-сервис для медицинских организаций, работающих в системе ОМС. Сервис автоматизирует трудоёмкий процесс
                            проверки реестров счетов на соответствие требованиям ТФОМС и внутренним бизнес-правилам.
                        </p>
                        <p className={styles.p}>
                            Разработан для актуализации программных продуктов ТФОМС Республики Хакасия (РХ) и обеспечения плавного
                            перехода на федеральный программный модуль «ПУМП».
                            «Хаб» берёт на себя валидацию входящих данных, медико-экономический контроль (МЭК).
                        </p>
                    </div>
                    <Separator size='sm' type='line' color='var(--border-light)' />
                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>1. Выпадающее меню</h2>
                        <Separator size='sm' type='space' />
                        <p className={styles.p}>
                            В правом верхнем углу заголовка находится кнопка, открывающая главное меню навигации.
                            Оно служит основным роутером ЧИХа — отсюда вы попадаете в любой раздел сервиса. Подробнее о каждом:
                        </p>
                        <h3 className={styles.h3}>Раздел «Профиль»</h3>
                        <p className={styles.p}>
                            Ваша личная карточка. Здесь нет сложных отчётов или активных действий, но есть важная функция —
                            не запутаться в аккаунтах. Если вы отвечаете за несколько медорганизаций или работаете с
                            разными учётными записями, «Профиль» покажет, под чьим именем вы сейчас в системе.
                            Удобно, прозрачно, никакой путаницы.
                        </p>

                        <h3 className={styles.h3}>Раздел «Журнал ФЛК»</h3>
                        <p className={styles.p}>
                            Журнал ФЛК — это центр управления проверками. Таблица, чекбоксы, правый клик, массовый запуск МЭК,
                            загрузка и кнопка обновления. Всё для того, чтобы вы быстро прожали тысячи счетов и не сошли с ума
                        </p>

                        <h3 className={styles.h3}>Раздел «Инструкция»</h3>
                        <p className={styles.p}>
                            Да, мы знаем, что документацию никто не любит читать. Но эта — исключение.
                            Здесь собрано всё, что нужно знать о работе с ЧИХом: от первого входа до массового запуска МЭК.
                        </p>

                        <h3 className={styles.h3}>Раздел «Связь с нами»</h3>
                        <p className={styles.p}>
                            Всё просто: здесь ваши контакты, чтобы вы всегда могли найти разработчика (меня) или моих коллег.
                            Если сервис работает не так, как надо, или вы просто хотите сказать спасибо — пишите.
                            Пропаду я — есть кому ответить. Без сложной маршрутизации и тикет-систем. Живые люди, живые ответы.
                        </p>

                    </div>

                    <Separator size='sm' type='line' color='var(--border-light)' />

                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>2. Журнал ФЛК</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            Здесь происходит вся магия. Это главный экран ЧИХа, где вы загружаете счета, следите за их проверкой и управляете процессом.
                        </p>

                        <p className={styles.p}>
                            Между заголовком сайта и таблицей журнала расположена панель управления.
                            Здесь собраны основные функции для работы со счетами: переключение журналов,
                            навигация по страницам (пагинация), а также кнопки «Журнал ФК», «Загрузить» и
                            «Обновить». Ниже — подробнее о каждой.
                        </p>

                        <h3 className={styles.h3}>Кнопка переключения журналов</h3>
                        <p className={styles.p}>
                            Позволяет переключаться между двумя режимами работы сервиса: «СМО РХ» (счета вашей организации)
                            и «Иногород» (счета сторонних контрагентов). От выбранного режима зависит не только то, какие счета вы
                            видите в таблице, но и логика проверки, а также место (точка записи) в базе данных, куда попадут
                            загруженные счета.
                        </p>

                        <h3 className={styles.h3}>Пагинация</h3>
                        <p className={styles.p}>
                            Счётчики не валятся одной простынёй. Данные разбиты на страницы — листайте, ищите, не теряйтесь.
                        </p>

                        <h3 className={styles.h3}>Кнопка загрузки счета</h3>
                        <p className={styles.p}>
                            Открывает модальное окно загрузки счёта. Вы можете либо выбрать файл через проводник,
                            либо просто перетащить его в область окна. Сразу после загрузки появится таблица со статусами
                            форматного контроля (ФК).
                            Если всё чисто — нажимайте «Отправить», и счета, которые прошли ФК улетают на запись (или перезапись)
                            в нашу базу данных.
                        </p>

                        <h3 className={styles.h3}>Кнопка вызова журнала форматного контроля</h3>
                        <p className={styles.p}>
                            Открывает таблицу результатов форматного контроля.
                            Здесь вы можете скачать файл с ошибками (если проверка не прошла),
                            отследить статус каждого счёта и вернуться к любому из них позже. Всё под рукой.
                        </p>

                        <Separator size='sm' type='line' color='var(--border-light)' />


                        <h2 className={styles.h2}>3. Упрощения при работе с таблицей ФЛК</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            Чтобы вы не кликали по пустоте и не проклинали всё вокруг,
                            я добавил в таблицу несколько удобных фишек. Работать с интерфейсом
                            станет заметно приятнее.
                        </p>

                        <h3 className={styles.h3}>Кликабельные строки</h3>
                        <p className={styles.p}>
                            Выделять счета (ставить галочки) теперь можно нажатием на любую область строки.
                            Не нужно целиться в маленький квадратик чекбокса — так гораздо быстрее и удобнее.
                        </p>

                        <h3 className={styles.h3}>Контекстное меню (правая кнопка мыши)</h3>
                        <p className={styles.p}>
                            Основные операции со счетами — «Провести МЭК», «Удалить», «Скачать ответ» — спрятаны в контекстное меню.
                            Оно вызывается правым кликом мыши по строке счёта или по выделенной области.
                        </p>

                        <p className={styles.p}>
                            Важный нюанс: функционал меню зависит от того, <b>как именно</b> вы выделили счёт.
                            <br /><br />• Если вы поставили галочку в чекбоксе (или выбрали строку кликом), пункт «Скачать ответ МЭК» станет неактивным.
                            <br />• Если вы не используете чекбоксы, а просто кликнули правой кнопкой по самой строке (без активных галочек) — меню будет полноценным, и отчёт скачается.
                        </p>

                    </div>

                    <Separator size='sm' type='line' color='var(--border-light)' />

                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>4. Журнал ФК</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            Стоит подробнее объяснить логику форматного контроля отправленного счета:
                            проверка проходит два последовательных этапа: метавалидация и структурная проверка.
                        </p>

                        <h3 className={styles.h3}>Метавалидация (проверка файловой структуры)</h3>
                        <p className={styles.p}>
                            На этом этапе сервис проверяет не содержание счета, а сам файл как системную единицу:
                            <br /><br />• является ли файл ZIP-архивом;
                            <br />• содержит ли архив ровно два XML-файла (H- и L-счет);
                            <br />• не повреждён ли архив.

                            <br /><br />Если ошибка возникает на этом этапе — счет не попадает в журнал ФК,
                            ответ не формируется. Вы видите ошибку сразу в интерфейсе загрузки под статусом "Не допущен" (подробнее в разделе <b>Статусы</b>).
                            Кликнув на ошибочную строку под этим статусом вам выскочит всплывающее уведомление с описанием ошибки.
                        </p>

                        <h3 className={styles.h3}>Структурная проверка (соответствие схеме)</h3>

                        <p className={styles.p}>
                            Здесь начинается работа с содержимым счетов. Сервис сверяет XML с целевой схемой (XSD):
                            проверяет типы данных (число вместо строки, дата в нужном формате), обязательность полей,
                            допустимые значения.
                        </p>
                        <p className={styles.p}>
                            Если на этом этапе найдены ошибки — они сохраняются на нашей стороне,
                            а сам счет всё равно записывается в базу данных и отображается в журнале ФК
                            со статусом «Ошибки». Вы можете скачать подробный ответ и исправить проблему.
                        </p>

                        <h3 className={styles.h3}>Скачивание ответа ФК</h3>
                        <p className={styles.p}>
                            Чтобы скачать отчёт, кликните правой кнопкой мыши по строке счёта.
                            В появившемся контекстном меню выберите «Скачать ответ».
                        </p>

                    </div>

                    <Separator size='sm' type='line' color='var(--border-light)' />

                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>5. Статусы</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            В системе имеются статусы для отображения состояния чего-либо. В нашем случае - состояние наших счетов.
                            Ниже представлены все возможные статусы и их объяснения, на которые вы можете ссылаться в случае возникновения вопросов.
                            Наведите на кнопочку напротив в виде фигурных скобок и посмотрите более подробную информацию о статусе.
                        </p>
                        <div className={styles.status_container}>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Успешно' type='success' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - успешно выполненная операция.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Операция прошла успешно. Для журнала ФК — счёт успешно прошёл проверку форматного контроля. Для журнала ЛК — счёт успешно прошёл медико-экономический контроль (МЭК).")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Ошибка' type='error' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - во время операции произошла(-и) ошибка(-и).
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Операция прошла с ошибками. Для журнала ФК — структурные несоответствия, ошибки в бизнес-логике. Для журнала ЛК — ошибки медико-экономического контроля (МЭК).")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Перезапись' type='rewriting' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - отправленный счет есть в базе и будет перезаписан.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Отправленный счёт будет перезаписан в базе. Данный статус означает, что вы уже отправляли счёт с тем же именем архива, и он будет перезаписан новой версией.")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='В процессе' type='processing' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - операция выполняется в текущий момент.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Счета под данным статусом в данный момент проходят проверки МЭК.")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>

                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Не допущен' type='meta-error' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - счет имеет мета-ошибки файла.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Отправленный на форматный контроль счёт не прошёл первый этап проверки: некорректное расширение, превышение размера, некорректное имя архива и прочее. Подробнее в разделе «Журнал ФК».")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Не проведен' type='waiting' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - счет ожидает отправки на МЭК.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Статус означает, что по данному счету не была проведена проверка МЭК.")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                            <div className={styles.status_line}>
                                <div className={styles.status_with_decription}>
                                    <div className={styles.status}>
                                        <Status text='Сбой' type='fatal-error' />
                                    </div>
                                    <div className={styles.status_description}>
                                        - во время операции произошла фатальная ошибка на сервере.
                                    </div>
                                </div>
                                <div
                                    className={styles.button}
                                    onMouseEnter={(e) => handleMouseEnter(e,
                                        "Совсем не страшный для вас, и очень страшный для нас статус, означающий ошибку в работе хранимых процедур на нашей стороне! Если у вас возникнет данный статус, мы отследим проблему и исправим ее.")}
                                    onMouseLeave={handleMouseLeave}>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24">
                                        <path
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            d="M9 17c-2 0-2-1.746-2-3.5L5.5 12L7 10.5C7 8.746 7 7 9 7m6 10c2 0 2-1.746 2-3.5l1.5-1.5l-1.5-1.5C17 8.746 17 7 15 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Separator size='sm' type='line' color='var(--border-light)' />

                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>6. Основной рабочий цикл</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            Ниже я подробно расскажу полный рабочий цикл внутри сервиса.
                        </p>

                        <h3 className={styles.h3}>1. Авторизация и пользовательское соглашение</h3>
                        <p className={styles.p}>
                            Не вижу смысла долго задерживаться на этом шаге.
                            Если вы читаете эти строки, значит, с авторизацией и
                            пользовательским соглашением вы уже разобрались.
                            Упоминаю этот этап лишь для полноты структуры.
                        </p>

                        <h3 className={styles.h3}>2. Переход к журналу ФЛК</h3>

                        <p className={styles.p}>
                            Выберите пункт «Журнал ФЛК» в меню справа сверху — попадёте в основную рабочую область сервиса.
                            <br /><br />Дальше воркфлоу зависит от ваших целей:
                            <br /><br /><b>Загрузить счёт</b> → нажмите кнопку «Загрузить» и выберите нужные файлы (о том, как обновляется журнал ФК и как устроен форматный контроль смотрите в разделе «Журнал ФК»).
                            <br /><br /><b>Провести МЭК или удалить счёт</b> → кликните правой кнопкой мыши по строке счёта и выберите действие.
                            <br /><br /><b>Массовое удаление или МЭК</b> → выделите нужные строки (через чекбоксы), выберите действие в панели и работайте с комфортом.
                        </p>

                        <h3 className={styles.h3}>3. Повторить, понять, привыкнуть</h3>

                        <p className={styles.p}>
                            Повторяя этот процесс снова и снова, вы со временем обретёте
                            устойчивый навык. Действия дойдут до автоматизма, а интерфейс
                            перестанет вызывать вопросы. Главное — не бояться ошибаться.
                            Система подскажет, где проблема, а вы просто будете её решать.
                        </p>

                    </div>

                    <Separator size='sm' type='line' color='var(--border-light)' />

                    <div className={styles.content_block}>
                        <h2 className={styles.h2}>7. Послесловие</h2>

                        <Separator size='sm' type='space' />

                        <p className={styles.p}>
                            <b>HealthInvoice Hub</b> — живой проект. Он не застыл в камне,
                            не дописан до точки и не брошен на произвол судьбы. Сейчас это рабочий
                            инструмент, который уже помогает вам проверять счета и проводить МЭК.
                            Но это только начало.
                        </p>

                        <p className={styles.p}>
                            В ближайших планах — новые фичи, которые появятся по мере
                            накопления данных и ваших сценариев работы:
                            <br /><br /><b>Фильтры </b>  — сможете отсеивать счета по дате, статусу, и другим параметрам.
                            <br /><br /><b>Сортировки</b> — таблица будет послушно строиться по любому столбцу (хоть по имени файла, хоть по количеству ошибок).
                            <br /><br /><b>Экспорт</b> — выгружать журналы в Excel/CSV для отчётности.
                        </p>

                        <p className={styles.p}>
                            Функционал будет расти вместе с вашими задачами.
                            Если чего-то не хватает — пишите. Контакты в разделе "Связь с нами".
                            А пока — пользуйтесь, тестируйте, кликайте на кнопку на главной страницы до супер-приза!
                        </p>
                    </div>
                </div>
            </div>
            {descBlock.visible && (
                <div
                    className={styles.description_block}
                    style={{ top: descBlock.y, left: descBlock.x }}>{descBlock.message}</div>
            )}
        </>

    )
}