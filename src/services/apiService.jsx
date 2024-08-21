/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

// const API_URL = "https://crud-render-h6q5.onrender.com/api/students";
const API_URL = "http://localhost:8080/api/students";
// const API_URL = import.meta.env.VITE_API_URL+"/api/students";
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;
const SITE_ID = import.meta.env.VITE_SITE_ID;
const DRIVE_ID = import.meta.env.VITE_DRIVE_ID;


export async function getFileContent(filename) {
  const accessToken = await getAccessToken();
  const token = accessToken.access_token;

  const url = `https://graph.microsoft.com/v1.0/sites/${SITE_ID}/drives/${DRIVE_ID}/root:/images/${filename}:/content`;

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`Error fetching file: ${response.statusText}`);
    }

    const blob = await response.blob();
    return blob;
  } catch (error) {
    console.error("Error fetching file content: ", error);
  }
}


export const getAccessToken = async () => {

  try {
    console.log("Token ", ACCESS_TOKEN);
    const response = await fetch(ACCESS_TOKEN);
    // console.log("Token ", response.access_token);
    return await response.json();
  } catch (error) {
    console.error("Error fetching token:", error);
  }
};

export const getStudents = async () => {
  console.log(API_URL);
  try {
    const response = await fetch(API_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching students:", error);
  }
};

export const getStudentById = async (id) =>{
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

export const updateStudent = async (student) =>{
  const response = await fetch(API_URL+"/update", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  return response.text();
}

export const createStudent = async (student) =>{
  const response = await fetch(API_URL+"/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  return response.text();
}

export const createWithFile = async (student, file) => {
  const formData = new FormData();
  formData.append('student', JSON.stringify(student));
  if (file) {
    formData.append('file', file);
  }

  try {
    const response = await fetch(API_URL+"/createFile", {
      method: 'POST',
      body: formData
    });
    return await response.json();
  } catch (error) {
    console.error('Error uploading data:', error);
    throw error;
  }
};

export const deleteStudent = async (student) =>{
  const response = await fetch(API_URL+"/delete", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(student),
  });
  return response.text();
}



// export const getStudentById = async (id) => {
//     await fetch(`${API_URL}/${id}`, { method: 'POST' });
// };