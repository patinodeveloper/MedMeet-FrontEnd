import { BrowserRouter } from "react-router-dom";
import { FooterView } from "./components/layout/FooterView";
import { MainNavBar } from "./components/layout/MainNavBar";
import { AppRoutes } from "./routes/AppRoutes";

export const MedMeetApp = () => {

    return (
        <>
            <BrowserRouter>
                <header>
                    <MainNavBar />
                </header>

                <div className="container">
                    <AppRoutes />
                </div>

                <FooterView />
            </BrowserRouter>
        </>
    );
}
