import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const AppRoute = () => {
    return (

        <Router>
            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path='/students' element={<StudentForm />} />
            </Routes>
        </Router>

    );
};
export default AppRoute;