import { lazy, Suspense } from "react"

const Patient = lazy(() => import('../patient/Patient'));
const SummaryCases = lazy(() => import('../summaryCases/SummaryCases'));
const Covid = lazy(() => import('../covid/Covid'));

const categoryMap = {
    patient: Patient,
    cases: SummaryCases,
    covid: Covid
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