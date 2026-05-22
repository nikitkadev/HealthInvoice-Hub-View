import lottie, { type AnimationItem } from 'lottie-web';
import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';

interface LottieLoaderProps {
    size?: number;
    className?: string;
}

export const LottieLoader = ({ size = 100, className }: LottieLoaderProps) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<AnimationItem | null>(null);

    useEffect(() => {
        let isActive = true;

        import('../../../assets/cube_loader.json')
            .then((module) => {

                if (!isActive) return;

                const animationData = module.default || module;

                if (containerRef.current) {
                    animationRef.current = lottie.loadAnimation({
                        container: containerRef.current,
                        renderer: 'svg',
                        loop: true,
                        autoplay: true,
                        animationData: animationData
                    });
                }
            })
            .catch((error) => {
                console.error('Ошибка загрузки анимации:', error);
            });

        return () => {
            isActive = false;
            if (animationRef.current) {
                animationRef.current.destroy();
            }
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className={`${styles.loader} ${className || ''}`}
            style={{ width: size, height: size }}
        />
    );
};