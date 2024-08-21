/* eslint-disable no-unused-vars */
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import StudentList from './components/StudentList';
import StudentForm from './components/StudentForm';
import TestImage from './components/TestImage';

const AppRoute = () => {
    return (

        
            <Routes>
                <Route path="/" element={<StudentList />} />
                <Route path='/students' element={<StudentForm />} />
                <Route path='/img' element={<TestImage/>} />
            </Routes>
        

    );
};
export default AppRoute;