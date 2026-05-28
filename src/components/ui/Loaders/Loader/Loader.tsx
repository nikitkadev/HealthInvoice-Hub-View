import { LottieLoader } from './LottieLoader';
import styles from './styles.module.scss';

export type LoaderSize = 'xs' | 's' | 'm' | 'l' | 'xl';

interface LoaderProps {
    size?: LoaderSize
}

const Loader = ({
    size = 'xs'
}: LoaderProps) => {

    const digitalSize: Record<string, number> = {
        'xs': 150,
        's': 175,
        'm': 200,
        'l': 225,
        'xl': 250
    };

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const funnyLoaderTexts: Array<string> = [
        "Ждем выхода Пантеона 2.0...", "Сливаем легендарные осколки...", "Вспоминаем старые рейды...",
        "Отстреливаем оракулы в правильном порядке...", "Пробиваемся на сервер через дрегов...",
        "Решаем загадку лаборатории Ниобы...", "Открываем энграммку Эверверс...", "Проходим рейд Левифафан...",
        "Пытаемся выбить красную рамку...", "Велскейтим на Нессе...", "Чистим затерянный сектор..."
    ]

    return (
        <div className={styles.loaderRoot}>
            <LottieLoader size={digitalSize[size]} />
            {<p className={styles.text}>{funnyLoaderTexts[getRandomInt(0, funnyLoaderTexts.length - 1)]}</p>}
        </div>
    )
};

export default Loader;