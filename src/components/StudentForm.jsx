/* eslint-disable no-const-assign */
/* eslint-disable no-unused-vars */
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useState, useContext, useEffect } from 'react';
import { StudentContext } from '../contexts/StudentContext';
import InputGroup from 'react-bootstrap/InputGroup';
import { updateStudent, createStudent, createWithFile } from '../services/apiService';
import LoadingProgressBar from "../loadingProgress/LoadingProgressBar";
import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo
} from 'ckeditor5';
import 'ckeditor5/ckeditor5.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from '../toastContext/ToastContext';
import Container from 'react-bootstrap/Container';


const StudentForm=()=>{
    const { showToast } = useToast();
    const navigate = useNavigate();
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const {student, setStudent} = useContext(StudentContext);
    const [ form, setForm]=useState({id: '', name: '', address: '', dob: '', status: ''});
    const [file, setFile] = useState(null);

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
    const test = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('student', JSON.stringify(form));
        if (file) {
          formData.append('file', file);
        }
      
        // Log the contents of the FormData object
        for (let [key, value] of formData.entries()) {
          console.log(`${key}: ${value}`);
        }
      
        try {
          const response = await fetch('http://localhost:8080/api/students/createFile', {
            method: 'POST',
            body: formData
          });
          const result = await response.json();
          console.log('Response:', result);
        } catch (error) {
          console.error('Error uploading data:', error);
        }
      };
      

    const onSubmit=async(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append('student', JSON.stringify(form)); // Convert form data to JSON string
        if (file) {
            console.log("File ", file);
            formData.append('file', file); // Append the file, if any
            
        }

        let message = '';
        let type = '';

        if(form.id){

            try{
                console.log("Student ", form);
                const result = await updateStudent(form);
                if(result){
                    message = 'Student Updated Successfully';
                    type = 'success';
                }else{
                    message = 'Student Updated Failed';
                    type = 'error';
                }
                console.log(result);
                
            }catch(error){
                message = 'Something when wrong: ',error;
                type = 'error';
            }

        }else{
            try {
                const response = await createWithFile(form, file);
                if (response) {
                    console.log('Student created successfully:', await response.json());
                    message = 'Student created Successfully';
                    type = 'success';
                } else {
                    message = 'Student created Failed';
                    type = 'error';
                }
            } catch (error) {
                console.error('Error creating student:', error);
                toast.error('An error occurred while creating the student.');
            }
        }
       
            navigate("/", {state: { message: message, type: type}});
      
    }
    const handleChange = (e, editor = null) => {
        if (editor) {
            // Handle CKEditor change
            const data = editor.getData();
            setForm((prevForm) => ({
                ...prevForm,
                [e]: data, // `e` should be the field name passed when calling this function
            }));
        } else {
            // Handle regular input change
            const { name, value } = e.target;
            setForm((prevForm) => ({
                ...prevForm,
                [name]: value,
            }));
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };
    

    const toastSuccess = () =>{
        toast.success('Student Created Successfully');
    }
    const toastFail = () =>{
        toast.error('Student Created Successfully');
    }
    const toastWarning = () =>{
        toast.warning('Student Created Successfully');
    }

    return (
        <>
            <LoadingProgressBar progress={progress} />

        <Container>
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
                {/* <InputGroup >
                <InputGroup.Text>POB</InputGroup.Text>
                <Form.Control value={form.dob} name='dob' onChange={handleChange} aria-label="DOB" />
                </InputGroup> */}
                
                <CKEditor 
                    data={form.dob}
                    onChange={(event, editor) => handleChange('dob', editor)}
                    editor={ ClassicEditor }
                    config={ {
                        toolbar: [
                        'undo', 'redo', '|',
                        'heading', '|', 'bold', 'italic', '|',
                        'link', 'insertTable', 'mediaEmbed', '|',
                        'bulletedList', 'numberedList', 'indent', 'outdent'
                        ],
                        plugins: [
                        Bold,
                        Essentials,
                        Heading,
                        Indent,
                        IndentBlock,
                        Italic,
                        Link,
                        List,
                        MediaEmbed,
                        Paragraph,
                        Table,
                        Undo
                        ],
                        initialData: '',
                    } }
                />
                <InputGroup >
                <InputGroup.Text>Status</InputGroup.Text>
                <Form.Control value={form.status} name='status' onChange={handleChange} aria-label="Status" />
                </InputGroup>
                <InputGroup className="mb-3">
                    <InputGroup.Text>Upload File</InputGroup.Text>
                    <Form.Control type="file" onChange={handleFileChange} />
                </InputGroup>

            
            <Button variant="primary" type="submit">
                {form.id ? 'Update' : 'Create'}
            </Button>
            </Form>
            
            <Button className='btn btn-success' onClick={toastSuccess}>Sucesss</Button>
            <Button className='btn btn-btn-primary' onClick={toastFail}>Error</Button>
            <Button className='btn btn-warning' onClick={toastWarning}>Warning</Button>
            <Button className='btn btn-info' onClick={test}>Test</Button>
            <ToastContainer />
            </Container>
        </>
        
    )
}
export default StudentForm;