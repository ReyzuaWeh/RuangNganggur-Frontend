import AuthSwiper from "@components/AuthSwiper";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <section className="bg-gradient flex items-center lg:flex-row w-full min-h-screen">
            <div className="lg:flex hidden lg:w-1/2 lg:p-16 h-fit">
                <AuthSwiper />
            </div>
            <div className="w-full lg:w-1/2 min-h-screen lg:h-fit flex flex-col">
                {children}
            </div>
        </section>
    );
};

export default AuthLayout;
