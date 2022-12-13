import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from '../Navbar';
import { BsFillPencilFill } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import API from '../api.js';


const AllStudent = () => {
    const [studentData, setStudentData] = useState([]);



    useEffect(() => {
        API.get('/allstudent')
            .then(function (response) {
                console.log(response.data);
                setStudentData(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const notify = () => {
        toast.success('Item Deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    const deleteStudent = (id) => {
        const studentCopy = studentData;
        console.log('id: ', id);


        console.log('sid', id);
        API.delete(`/allstudent/${id}`)
            .then(function (response) {
                console.log(response.data);

                const newItem = studentData.filter((newVal) => {
                    console.log('id is ', newVal._id);
                    return newVal._id !== id;

                });
                console.log('new', newItem);
                setStudentData(newItem);

                notify();
               
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    return (
        <React.Fragment>
            <Navbar />
            <div className="container">
                <h3>All Student List</h3>
                <table className="table table-striped-columns">
                    <thead>
                        <tr>
                            <th scope="col">S#</th>
                            <th scope="col">Student Name</th>
                            <th scope="col">Father Name</th>
                            <th scope="col">Address</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">CNIC</th>
                            <th scope="col">Email</th>
                            <th scope="col">Eidit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {studentData.map((student, ind) => {
                            return (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{student.sname}</td>
                                    <td>{student.fname}</td>
                                    <td>{student.address}</td>
                                    <td>{student.mobile}</td>
                                    <td>{student.cnic}</td>
                                    <td>{student.email}</td>
                                    <td><Link to={`/onestudent/${student._id}`}><BsFillPencilFill color='#1abc9c' /></Link></td>
                                    <td><MdDelete color='red' onClick={() => deleteStudent(student._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover />

        </React.Fragment>
    )
}

export default AllStudent