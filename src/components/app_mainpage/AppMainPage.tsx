import { useEffect, useState } from 'react';
import { Separator } from '../../shared/ui/seporator/Separator';
import { toast } from 'react-toastify';

import styles from './AppMainPage.module.css';

export const AppMainPage = () => {
    const [count, setCount] = useState(0);

    const prizeMessages = new Map([
        [20, { type: 'success', text: "Серьезно, этим кто-то пользуется?!" }],
        [100, { type: 'info', text: "Вы что, тестируете меня?" }],
        [200, { type: 'info', text: "Остановитесь..." }],
        [500, { type: 'info', text: "Ладно, продолжайте!" }],
        [100, { type: 'warning', text: "Вы ещё здесь?" }],
        [10000, { type: 'error', text: "Знаете, в конце не будет супер приза!" }],
        [20000, {type: 'success', text: "Нет, ну если вы настаиваете..."}]
    ]);

    useEffect(() => {
       const prize = prizeMessages.get(count);

       if(prize){
        switch(prize.type){
            case 'success': toast.success(prize.text); break;
            case 'info': toast.info(prize.text); break;
            case 'warning': toast.warning(prize.text); break;
            case 'error': toast.error(prize.text); break;
        }
       }
    }, [count]);

    const handleClick = () => {
        setCount(count + 2);
    }
    return (
        <>
            <div className={styles.container}>
                <h1 className={styles.h1}>Добро пожаловать в HealthInvoice Hub!</h1>
                <Separator type='space' size='sm' />
                <h2 className={styles.h2}>Дисклеймер для отважных:</h2>
                <p className={styles.p}>
                    Этот сервис сейчас в активной разработке,
                    поэтому давайте будем честными: всё,
                    что здесь происходит, ползает через
                    удивительную технологию VipNet,
                    которая сама по себе уже испытание на прочность.
                    Ситуация печальная, но выбора нет...
                    Я это к тому, что проблем с работой не избежать, но мы все дружно постараемся!
                </p>
                <p className={styles.p}>
                    Пожалуйста, не бойтесь сломать работу <b>"ЧИХ"</b> (обиходное название данной платформы)!
                    Это не катастрофа, а наша текущая цель.
                    На этом этапе мы как раз ищем узкие места нашей программы.
                    Самым активным выдадим достижение и отдельное место в наших сердцах!
                </p>
                <p className={styles.p}>
                    Если заметите какие-то косяки, странности,
                    ошибки — не стесняйтесь, сразу пишите мне.
                    Я — разработчик этой платформы, и буду рад обратной связи.
                </p>

                <Separator type='space' size='sm' />
                <h2 className={styles.h2}>Как начать:</h2>
                <p className={styles.p}>
                    Справа сверху находится главное меню.
                    Через него можно перемещаться по сервису:
                    журнал, профиль, документация, техподдержка
                    (для самых острых вопросов), выход из профиля.
                    Админка пока в разработке, но скоро подтянется.
                </p>
                <Separator type='space' size='sm' />
                <h2 className={styles.h2}>Шеф меня прибьет за это:</h2>
                <p className={styles.p}>Если станет скучно - возвращайтесь, я сделал вам кликер. Просто нажимайте на кнопку и все: смысла нет.. пока что!
                    Разработаем систему достижений и подкрутим множитель. И да, тут один клик считается за два, так просто интереснее!</p>
                <Separator type='space' size='lg' />
                <div className={styles.buttons_container}>
                    <button
                        className={styles.button}
                        onClick={handleClick}>
                        Антистрессовых нажатий: {count}
                    </button>
                </div>
            </div>
        </>
    )
}
