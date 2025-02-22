import { Spinner } from "@material-tailwind/react";

const Loader = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <Spinner className="h-16 w-16" />;
        </div>
    );
};

export default Loader;