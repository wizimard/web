import React from 'react';

import { studentService } from "../_services/student.service";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

class StudentPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            student: {
                email: '',
                card_number: '',
                group_name: '',
                subgroup: 1,
            },
            students: [
                {
                    id: null,
                    name: '',
                    email: '',
                    card_number: '',
                    group_name: '',
                    subgroup: 1,
                }
            ],
        };
    }

    componentDidMount() {
        studentService.getAll().then(students => this.setState({ students }));
    }

    handleClickUpdate(student) {
        this.setState({ student: student });
    }

    handleClickDelete(student) {
        studentService.deleteById(student.id).then(
            () => {
                studentService.getAll().then(students => this.setState({ students }));
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        const { students, student } = this.state;

        return (
            <div>
                <h1>Students</h1>
                <Formik
                    enableReinitialize={true}
                    initialValues={student}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required('Email is required'),
                        card_number: Yup.string().required('Card Number is required'),
                        group_name: Yup.string().required('Group Name is required'),
                        subgroup: Yup.string().required('Subgroup is required')
                    })}
                    onSubmit={({ email, name, card_number, group_name, subgroup }, { setStatus, setSubmitting }) => {
                        setStatus();
                        if (student.id) {
                            studentService.update(student.id, email, name, card_number, group_name, subgroup)
                                .then(
                                    () => {
                                        studentService.getAll().then(students => this.setState({
                                            students, student: {
                                                email: '',
                                                card_number: '',
                                                group_name: '',
                                                subgroup: 1,
                                            }
                                        }));
                                        setStatus(false);
                                        setSubmitting(false);
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        } else {
                            studentService.create(email, name, card_number, group_name, subgroup)
                                .then(
                                    student => {
                                        students.push(student);
                                        setStatus(false);
                                        setSubmitting(false);

                                        this.setState({
                                            students: students, student: {
                                                email: '',
                                                card_number: '',
                                                group_name: '',
                                                subgroup: 1,
                                            }
                                        });
                                    },
                                    error => {
                                        setSubmitting(false);
                                        setStatus(error);
                                    }
                                );
                        }
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />
                                <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="cardNumber">CardNumber</label>
                                <Field name="card_number" type="text" className={'form-control' + (errors.card_number && touched.card_number ? ' is-invalid' : '')} />
                                <ErrorMessage name="card_number" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="GroupName">GroupName</label>
                                <Field name="group_name" type="text" className={'form-control' + (errors.group_name && touched.group_name ? ' is-invalid' : '')} />
                                <ErrorMessage name="group_name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="subgroup">SubGroup</label>
                                <Field name="subgroup" type="text" className={'form-control' + (errors.subgroup && touched.subgroup ? ' is-invalid' : '')} />
                                <ErrorMessage name="subgroup" component="div" className="invalid-feedback" />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary" disabled={isSubmitting}>Submit</button>
                                {isSubmitting &&
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                }
                            </div>
                            {status &&
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                        </Form>
                    )}
                />
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Card number</th>
                            <th scope="col">Group name</th>
                            <th scope="col">Subgroup</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map(student =>
                                <tr key={student.id}>
                                    <th scope="row">{student.id}</th>
                                    <td>{student.email}</td>
                                    <td>{student.card_number}</td>
                                    <td>{student.group_name}</td>
                                    <td>{student.subgroup}</td>
                                    <td><button className={'btn btn-success'} onClick={this.handleClickUpdate.bind(this, student)}>Update</button></td>
                                    <td><button className={'btn btn-danger'} onClick={this.handleClickDelete.bind(this, student)}>Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}

export { StudentPage };
