import { ToastContainer, Slide } from "react-toastify";

const ConfigToast = () => {
    return (
        <ToastContainer
            position="top-center"
            autoClose={3000}
            transition={Slide} />
    )
}

export default ConfigToast;