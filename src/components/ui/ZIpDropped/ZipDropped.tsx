import { useState, useRef, useCallback } from 'react';
import styles from './styles.module.scss';

interface ZipDroppedProps {
    onFilesDropped: (files: File[]) => void;
    isLoading?: boolean;
}

export const ZipDropped = ({ onFilesDropped, isLoading = false }: ZipDroppedProps) => {
    const [isDragging, setIsDragging] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const filterZipFiles = useCallback((files: FileList | File[]): File[] => {
        return Array.from(files).filter(
            (f) => f.name.toLowerCase().endsWith('.zip') && f.size > 0
        );
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const zipFiles = filterZipFiles(e.dataTransfer.files);
        if (zipFiles.length) {
            onFilesDropped(zipFiles);
        }
    }, [filterZipFiles, onFilesDropped]);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const zipFiles = filterZipFiles(e.target.files);
            if (zipFiles.length) {
                onFilesDropped(zipFiles);
            }
        }
    }, [filterZipFiles, onFilesDropped]);

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
        <div className={styles.zipDroppedRoot}>
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
                    accept=".zip"
                    multiple
                    hidden
                    onChange={handleFileSelect}
                    disabled={isLoading}
                />

                {isLoading ? (
                    <div className={styles.loadingText}>
                        Ждем окончания проверки
                    </div>
                ) : isDragging ? (
                    <span className={styles.dragText}>Отпустите ZIP-файлы здесь</span>
                ) : (
                    <span className={styles.defaultText}>
                        Перетащите ZIP-файлы сюда или кликните для выбора
                    </span>
                )}
            </div>
        </div>
    );
};