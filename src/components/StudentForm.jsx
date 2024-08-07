/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateStudent, createStudent } from '../services/apiService';
import LoadingProgressBar from "../loadingProgress/LoadingProgressBar";


const StudentForm=()=>{
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const {student, setStudent} = useContext(StudentContext);
    const [ form, setForm]=useState({id: '', name: '', address: '', dob: '', status: ''});

    useEffect(() => {

        let interval;

            if(student){
                setForm(student);
                console.log("Student ", student);
                interval = setInterval(()=>{
                    setProgress((prev)=> Math.min(prev + 10, 90));
                }, 100);

                setTimeout(()=>{
                    clearInterval(interval);
                    setProgress(100);
                    setLoading(false);
                }, 100);
            }else{
                setLoading(false);
            }

        return () => {
            setStudent(null);
            clearInterval(interval);
        }
    }, [student, setStudent]);
    
    const onBack=()=>{
        navigate("/");
    
    }

    const onSubmit=async(e)=>{
        e.preventDefault();
        if(form.id){
            console.log("Student ", form);
            const result = await updateStudent(form);
            console.log(result);
        }else{
            const result = await createStudent(form);
            console.log(result);
        }
        
        navigate("/");
    }

    const handleChange=(e)=>{
        setStudent({...form, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <LoadingProgressBar progress={progress} />
            <h1>Student Form</h1>
            <Button variant="outline-primary" onClick={()=> onBack()}>Back to Student List</Button>

            <Form onSubmit={onSubmit}>
{/* 
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Name</Form.Label>
                <Form.Control value={student.name} name='name' onChange={handleChange} type="email" placeholder="Enter email" />
            </Form.Group> */}
                <InputGroup >
                <InputGroup.Text>Name</InputGroup.Text>
                <Form.Control value={form.name} name='name' onChange={handleChange} aria-label="Name" />
                </InputGroup>
                <InputGroup >
                <InputGroup.Text>Address</InputGroup.Text>
                <Form.Control value={form.address} name='address' onChange={handleChange} aria-label="Address" />
                </InputGroup>
                <InputGroup >
                <InputGroup.Text>POB</InputGroup.Text>
                <Form.Control value={form.dob} name='dob' onChange={handleChange} aria-label="DOB" />
                </InputGroup>
                <InputGroup >
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Control value={form.status} name='status' onChange={handleChange} aria-label="Status" />
                </InputGroup>


            <Button variant="primary" type="submit">
                {form.id ? 'Update' : 'Create'}
            </Button>
            </Form>
        </div>
    )
}
export default StudentForm;