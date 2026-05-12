import { lazy, Suspense } from "react"

const Patient = lazy(() => import('../patient/Patient'));

const categoryMap = {
    patient: Patient
}

interface CategoryRendererProps {
    categoryId: keyof typeof categoryMap;
}

export const CategoryRenderer = ({ categoryId }: CategoryRendererProps) => {
    const Component = categoryMap[categoryId];
    return (
        <Suspense fallback={<div>Загрузка...</div>}>
            <Component />
        </Suspense>
    )
}