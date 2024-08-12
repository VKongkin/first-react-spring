/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';

const AppRoute = () => {
    return (

        
            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path='/students' element={<StudentForm />} />
            </Routes>
        

    );
};
export default AppRoute;