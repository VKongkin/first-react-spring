/* eslint-disable no-unused-vars */

const API_URL = "http://localhost:8080/api/students";

export const getStudents = async () => {
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