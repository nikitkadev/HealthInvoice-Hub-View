import { lazy, Suspense } from "react";
import OverlayLoader from "../../../../ui/Loaders/OverlayLoader";

const Default = lazy(() => import('../DefaultCategory/DefaultCategory'));
const PatientSmo = lazy(() => import('../PatientSmoCategory/PatientSmoCategory'));

const categoryMap = {
    'default': Default,
    'patient-smo': PatientSmo,

} as const;

export type CategoryId = keyof typeof categoryMap;

interface CategoryRendererProps {
    categoryId: CategoryId
};

const CategoryRenderer = ({ categoryId }: CategoryRendererProps) => {

    const Component = categoryMap[categoryId];

    return (

        <Suspense fallback={<OverlayLoader />}>
            <Component />
        </Suspense>
    )
};

export default CategoryRenderer;