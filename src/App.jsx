import AppRoute from "./AppRoute";
import { StudentContextProvider } from "./contexts/StudentContext";
import NavBar from "./navbar/navbar";
import { BrowserRouter as Router } from "react-router-dom";
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <StudentContextProvider>
            <Router>
                <NavBar />
                <AppRoute />
            </Router>

        </StudentContextProvider>
    );
}
export default App;