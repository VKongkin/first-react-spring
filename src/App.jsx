import AppRoute from "./AppRoute";
import { StudentContextProvider } from "./contexts/StudentContext";
// import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <StudentContextProvider>
            <AppRoute />
        </StudentContextProvider>
    );
}
export default App;