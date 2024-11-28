import { HomeCards } from "../components/HomeCards";
import { HomeWelcome } from "../components/HomeWelcome";

export const HomeView = () => {

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 text-center">
                    <HomeWelcome />
                </div>
            </div>
            <div className="row mt-5">
                <HomeCards />
            </div>
        </div>
    );
};
