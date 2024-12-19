import { BrowserRouter } from "react-router-dom";
import { FooterView } from "./components/layout/FooterView";
import { MainNavBar } from "./components/layout/MainNavBar";
import { AppRoutes } from "./routes/AppRoutes";

export const MedMeetApp = () => {
    return (
        <>
            <BrowserRouter>
                <div className="d-flex flex-column min-vh-100">
                    <header>
                        <MainNavBar />
                    </header>

                    <main className="container-fluid flex-grow-1">
                        <AppRoutes />
                    </main>

                    <footer className="text-center pb-3">
                        <FooterView />
                    </footer>
                </div>
            </BrowserRouter>
        </>
    );
};

