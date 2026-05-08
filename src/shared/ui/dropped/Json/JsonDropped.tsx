
import { Separator } from '../../seporator/Separator';
import { useCallback, useRef, useState } from "react";
import styles from './JsonDropped.module.css';

interface JsonDroppedProps {
    onFileDropped: (file: File) => void;
    isLoading?: boolean;
}

export const JsonDropped = ({ onFileDropped, isLoading = false }: JsonDroppedProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filterJsonFile = useCallback((files: FileList | File[]): File | null => {
        const fileArray = Array.from(files);

        if (fileArray.length !== 1) {
            alert('Пожалуйста, выберите один файл');
            return null;
        }

        const file = fileArray[0];

        if (!file.name.toLowerCase().endsWith('.json')) {
            alert('Пожалуйста, выберите файл с расширением .json');
            return null;
        }

        if (file.size === 0) {
            alert('Файл не может быть пустым');
            return null;
        }

        return file;
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const jsonFile = filterJsonFile(e.dataTransfer.files);
        if (jsonFile) {
            onFileDropped(jsonFile);
        }
    }, [filterJsonFile, onFileDropped]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const jsonFile = filterJsonFile(e.target.files);
            if (jsonFile) {
                onFileDropped(jsonFile);
            }
        }
        e.target.value = '';
    }, [filterJsonFile, onFileDropped]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setIsDragging(false);
        }
    }, []);

    return (
        <div className={styles.container}>
            <div
                onClick={() => !isLoading && inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''} ${isLoading ? styles.loading : ''}`}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".json"
                    hidden
                    onChange={handleFileSelect}
                    disabled={isLoading}
                />

                {isLoading ? (
                    <div className={styles.loadingText}>
                        Ждем окончания проверки
                    </div>
                ) : isDragging ? (
                    <span className={styles.dragText}>Отпустите JSON-файл здесь</span>
                ) : (
                    <span className={styles.defaultText}>
                        Сюда закинуть JSON с данными пользователей!
                    </span>
                )}
            </div>
            <Separator type='line' size='xs' color='var(--border-light)' />
        </div>
    );
};