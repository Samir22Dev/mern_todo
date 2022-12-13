import React, { useEffect, useState } from 'react';
import { useParams,useNavigate } from "react-router-dom";
import Navbar from '../Navbar.js';
import { Formik } from 'formik';


import API from '../api.js';


const OneStudent = () => {

    let sid = useParams()
    console.log('id is: ', sid.sid);

    const navigate = useNavigate() 

    const [todo, setTodo] = useState({sname:"", fname:"",mobile:"", address:"", email:"", cnic:"", password:""});

    useEffect(() => {
        API.get(`/onestudent/${sid.sid}`)
            .then(function (response) {
                console.log(response.data);
                setTodo(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })

    },[])

    return (
        <React.Fragment>
            <Navbar />

            <div className="container">
                <h3>Student Record</h3>

                <Formik
                    enableReinitialize
                    initialValues={{ email:todo.email , password: todo.password , studentName: todo.sname, fatherName: todo.fname, 
                        mobile: todo.mobile, address: todo.address, cnic: todo.cnic }}
                    validate={values => {
                        const errors = {};

                        if (!values.studentName) {
                            errors.studentName = 'Student Name is required';
                        }
                        if (!values.fatherName) {
                            errors.fatherName = 'Father Name is required';
                        }
                        if (!values.mobile) {
                            errors.mobile = 'Mobile is required';
                        }
                        if (!values.address) {
                            errors.address = 'Address is required';
                        }
                        if (!values.cnic) {
                            errors.cnic = 'CNIC is required';
                        }
                        if (!values.email) {
                            errors.email = 'Email is required';
                        } else if (
                            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                        ) {
                            errors.email = 'Invalid email address';
                        }
                        if (!values.password) {
                            errors.password = 'Password is required';
                        }
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        setTimeout(() => {
                            API.put(`/onestudent/${sid.sid}`, {
                                sname: values.studentName,
                                fname: values.fatherName,
                                mobile: values.mobile,
                                address: values.address,
                                cnic: values.cnic,
                                email: values.email,
                                password: values.password
                            })
                                .then(function (response) {
                                    console.log('add data', response.data);
                                    //setStudentData(response.data);

                                    navigate("/");
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                            console.log(values);
                            setSubmitting(false);
                        }, 400);
                    }}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting,
                        /* and other goodies */
                    }) => (

                        <form onSubmit={handleSubmit} className="row g-3">

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Student Name</span>
                                <input placeholder='Student Name' type="text" onChange={handleChange} onBlur={handleBlur} value={values.studentName} className="form-control form-control-sm" name='studentName' id="staticEmail2" /> <br />
                            </div>
                            <div style={{ color: 'red' }}>{errors.studentName && touched.studentName && errors.studentName}</div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Father Name</span>
                                <input placeholder='Father Name' type="text" onChange={handleChange} onBlur={handleBlur} value={values.fatherName} className="form-control form-control-sm" name='fatherName' id="staticEmail3" />
                            </div>
                            <span style={{ color: 'red' }}>{errors.fatherName && touched.fatherName && errors.fatherName}</span>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Mobile</span>
                                <input placeholder='Mobile' type="text" onChange={handleChange} onBlur={handleBlur} value={values.mobile} className="form-control form-control-sm" name='mobile' id="staticEmail4" />
                                <span style={{ color: 'red' }}>{errors.mobile && touched.mobile && errors.mobile}</span>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Address</span>
                                <input placeholder='Address' type="text" onChange={handleChange} onBlur={handleBlur} value={values.address} className="form-control form-control-sm" name='address' id="staticEmail5" />
                                <span style={{ color: 'red' }}>{errors.address && touched.address && errors.address}</span>
                            </div>


                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">CNIC Number</span>
                                <input placeholder='CNIC' type="text" onChange={handleChange} onBlur={handleBlur} value={values.cnic} className="form-control form-control-sm" name='cnic' id="staticEmail6" />
                                <span style={{ color: 'red' }}>{errors.cnic && touched.cnic && errors.cnic}</span>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Email</span>
                                <input placeholder='Email' type="text" onChange={handleChange} onBlur={handleBlur} value={values.email} className="form-control form-control-sm" name='email' id="staticEmail7" />
                                <span style={{ color: 'red' }}>{errors.email && touched.email && errors.email}</span>
                            </div>

                            <div className="input-group mb-3">
                                <span className="input-group-text" id="basic-addon1">Password</span>
                                <input type="password" onChange={handleChange} onBlur={handleBlur} value={values.password} className="form-control form-control-sm" name='password' id="inputPassword8" placeholder="Password" />
                                <span style={{ color: 'red' }}>{errors.password && touched.password && errors.password}</span>
                            </div>
                            <div className="input-group mb-3">
                                <button type="submit" disabled={isSubmitting} className="btn btn-primary mb-3">Confirm identity</button>
                            </div>
                        </form>
                    )}
                </Formik>
            </div>
        </React.Fragment>
    )
}

export default OneStudent;