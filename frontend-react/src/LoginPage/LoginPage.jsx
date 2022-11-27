import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';

import { authenticationService } from "@/_services";

class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        // redirect to home if already logged in
        if (authenticationService.currentUserValue) {
            this.props.history.push("/");
        }
    }

    componentDidMount() {
        function start() {
            gapi.client.init({
                clientId: '48558240281-7h99uhuuavmqgb2tffttcc9j4esr8se8.apps.googleusercontent.com',
                scope: 'email',
            });
        }

        gapi.load('client:auth2', start);
    }

    render() {
        const responseGoogleSuccess = (response) => {
            console.log(response);
            authenticationService.socialLogin(response).then(
                (user) => {
                    const { from } = this.props.location.state || {
                        from: { pathname: "/" },
                    };
                    this.props.history.push(from);
                },
                (error) => {
                    setSubmitting(false);
                    setStatus(error);
                }
            );
        };

        const responseGoogleFailure = (response) => {
            console.log("error", response);
        };

        return (
            <div>
                <div className="alert alert-info">
                    <strong>Normal User</strong> - U: user P: user
                    <br />
                    <strong>Administrator</strong> - U: admin P: admin
                </div>
                <h2>Login</h2>
                <Formik
                    initialValues={{
                        email: "",
                        password: "",
                    }}
                    validationSchema={Yup.object().shape({
                        email: Yup.string().required("Username is required"),
                        password: Yup.string().required("Password is required"),
                    })}
                    onSubmit={({ email, password }, { setStatus, setSubmitting }) => {
                        setStatus();
                        authenticationService.login(email, password).then(
                            (user) => {
                                const { from } = this.props.location.state || {
                                    from: { pathname: "/" },
                                };
                                this.props.history.push(from);
                            },
                            (error) => {
                                setSubmitting(false);
                                setStatus(error);
                            }
                        );
                    }}
                    render={({ errors, status, touched, isSubmitting }) => (
                        <Form>
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="text"
                                    className={
                                        "form-control" +
                                        (errors.email && touched.email ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={
                                        "form-control" +
                                        (errors.password && touched.password ? " is-invalid" : "")
                                    }
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                                {isSubmitting && (
                                    <img src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
                                )}
                            </div>
                            {status && <div className={"alert alert-danger"}>{status}</div>}
                        </Form>
                    )}
                />
                <GoogleLogin
                    clientId={
                        "48558240281-7h99uhuuavmqgb2tffttcc9j4esr8se8.apps.googleusercontent.com"
                    }
                    buttonText="Log in with Google"
                    cookiePolicy={"single_host_origin"}
                    onSuccess={responseGoogleSuccess}
                    onFailure={responseGoogleFailure}
                />
            </div>
        );
    }
}

export { LoginPage };
