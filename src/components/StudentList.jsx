/* eslint-disable no-unused-vars */
import { useEffect, useState, useContext } from "react";
import { getStudents } from "../services/apiService";
import { useNavigate, useLocation } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { StudentContext } from "../contexts/StudentContext";
import { deleteStudent, getStudentById, getAccessToken, getFileContent } from "../services/apiService";
import StatusIndicator from "../statusIndicator/StatusIndicator";
import LoadingProgressBar from "../loadingProgress/LoadingProgressBar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useToast } from "../toastContext/ToastContext";
import Container from 'react-bootstrap/Container';
    

const StudentList = () => {
    const { state} = useLocation();
    const { showToast } = useToast();
    const [students, setStudents] = useState([]);
    const [progress, setProgress] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { setStudent } = useContext(StudentContext);
    const SITE_ID = import.meta.env.VITE_SITE_ID;
    const DRIVE_ID = import.meta.env.VITE_DRIVE_ID;
    const [token, setToken] = useState(null);

    const [imageSrcs, setImageSrcs] = useState({});
    const [fileContent, setFileContent] = useState(null);

    // const imageUrl = async (imagePath) => {
    //     const image = await fetch("https://graph.microsoft.com/v1.0/sites/"+ SITE_ID +"/drives/"+ DRIVE_ID +"/root:/Shared Documents/images/"+ imagePath +":/content");
    //     return image;
    // }







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
        
         
        if(state && state.message){
            showToast(state.type, state.message);
        }
        loadStudents();
        const fetchData = async () => {
            const content = await getFileContent("your-filename.jpg");
            setFileContent(content);
          };
      
          fetchData();
        
    }, [state, showToast]);

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

    const test = async () => {
        const accessToken = await getAccessToken();
        const token = accessToken.access_token;
        console.log("Token ", token);
        const img = getFileContent("download.png", token)
        setImageSrcs(img);
    }

    return(

        <>
            <LoadingProgressBar progress={progress} />
        <Button variant="outline-primary" onClick={()=> test()}>Test</Button>
        <img src={imageSrcs} alt="File content" />
            
        <Container>
            <h1>Student List</h1>
            <Button variant="outline-primary" onClick={()=> studentForm()}>Create</Button>
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Address</th>
                    <th>POB</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
                </thead>
                <tbody>
                {students.map(({id, name, address, dob, imagePath, status}) => (
                        <tr key={id}>
                            <td>{id}</td>
                            <td>{name}</td>
                            <td>
                            {/* <img 
                                src={`https://crud-render-h6q5.onrender.com/api/sharepoint/image/${student.imagePath}`} 
                                // src={`https://graph.microsoft.com/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/root:/Shared Documents/images/${student.imagePath}:/content`}
                                alt={student.name} 
                                style={{ width: '100px', height: 'auto' }} // Adjust size as needed
                            /> */}
                            {fileContent ? (
                                    <img src={URL.createObjectURL(imagePath)} alt="File content" />
                                ) : (
                                    "Loading..."
                                )}
                            </td>
                            <td>{address}</td>
                            <td>{dob}</td>
                            <td><StatusIndicator status={status} /></td>
                            <td>
                                <Button variant="outline-primary" onClick={()=> onEdit({id, name, address, dob, imagePath, status})}>Edit</Button>{' '}
                                <Button variant="outline-primary" onClick={()=> getId(id)}>Edit by ID</Button>{' '}
                                <Button variant="outline-primary" onClick={()=> onDelete(id)}>Delete</Button>{' '}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <ToastContainer />       
            </Container>     
        </>
    )
}

export default StudentList;