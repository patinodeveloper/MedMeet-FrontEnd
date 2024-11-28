import { BrowserRouter } from "react-router-dom";
import { FooterView } from "./components/layout/FooterView";
import { MainNavBar } from "./components/layout/MainNavBar";
import { DoctorRoutes } from "./routes/DoctorRoutes";

export const MedMeetApp = () => {

    return (
        <>
            <BrowserRouter>
                <header>
                    <MainNavBar />
                </header>

                <div className="container">
                    <DoctorRoutes />
                </div>

                <FooterView />
            </BrowserRouter>
        </>
    );
}
