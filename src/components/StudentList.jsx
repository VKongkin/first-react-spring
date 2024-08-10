/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { getStudents } from "../services/apiService";
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { StudentContext } from "../contexts/StudentContext";
import { deleteStudent, getStudentById } from "../services/apiService";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import LoadingProgressBar from "../loadingProgress/LoadingProgressBar";

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setStudent } = useContext(StudentContext);


    const loadStudents = async () => {
        setLoading(true);
        setProgress(0);
        let interval;

        try{
            interval = setInterval(()=>{
                setProgress((prev)=> Math.min(prev + 10, 98));
            }, 100);
            
            const data = await getStudents();
            if(data){
                setStudents(data);
                clearInterval(interval);
                setProgress(100);
                console.log(data);
            }

        }catch(error){
            console.log("Error loading students", error);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        loadStudents();
        
    }, []);

    const getId = async (id) => {
        setLoading(true);
        setProgress(0);
        let interval;
        try{
            interval = setInterval(()=>{
                setProgress((prev)=> Math.min(prev + 10, 98));
            }, 100);
            
            const data = await getStudentById(id);
            if(data){
                setStudent(data);
                clearInterval(interval);
                setProgress(100);
                navigate("/students");
                console.log("Student ", data);
            }

        }catch(error){
            console.log("Error loading students", error);
        }finally{
            setLoading(false);
        }
        
        
    }
    const onEdit = (student) => {
        setStudent(student);
        navigate("/students");
        console.log("Student ", student);
    }
    const onDelete = async (id) => {
        const data = await getStudentById(id);
        const result = await deleteStudent(data);
        
        console.log("Student ", result);
        loadStudents();
    }

    const studentForm = () => {
        navigate("/students");
    }

    return(
        <div>
            <LoadingProgressBar progress={progress} />
            <h1>Student List</h1>
            <Button variant="outline-primary" onClick={()=> studentForm()}>Create</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Address</th>
                    <th>POB</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map((student) => (
                        <tr key={student.id}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.address}</td>
                            <td>{student.dob}</td>
                            <td><StatusIndicator status={student.status} /></td>
                            <td>
                                <Button variant="outline-primary" onClick={()=> onEdit(student)}>Edit</Button>{' '}
                                <Button variant="outline-primary" onClick={()=> getId(student.id)}>Edit by ID</Button>{' '}
                                <Button variant="outline-primary" onClick={()=> onDelete(student.id)}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
 
        </div>
    )
}

export default StudentList;