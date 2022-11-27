import React from "react";
import { Router, Route, Link } from "react-router-dom";

import { history, Role } from "@/_helpers";
import { authenticationService } from "@/_services";
import { PrivateRoute } from "@/_components";
import { HomePage } from "@/HomePage";
import { AdminPage } from "@/AdminPage";
import { LoginPage } from "@/LoginPage";
import { StudentPage } from "@/StudentPage";
import { PizzaPage } from "@/PizzaPage";

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null,
            isAdmin: false,
        };
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe((x) =>
            this.setState({
                currentUser: x,
                isAdmin: x && x.role === Role.Admin,
            })
        );
    }

    logout() {
        authenticationService.logout();
        history.push("/login");
    }

    render() {
        const { currentUser, isAdmin } = this.state;
        return (
            <Router history={history}>
                <div>
                    {currentUser && (
                        <nav className="navbar navbar-expand navbar-dark bg-dark">
                            <div className="navbar-nav">
                                <Link to="/" className="nav-item nav-link">
                                    Home
                                </Link>
                                {currentUser && (
                                    <Link to="/students" className="nav-item nav-link">
                                        Student
                                    </Link>
                                )}
                                {currentUser && (
                                    <Link to="/pizza" className="nav-item nav-link">
                                        Pizza
                                    </Link>
                                )}
                                {isAdmin && (
                                    <Link to="/admin" className="nav-item nav-link">
                                        Admin
                                    </Link>
                                )}
                                <a onClick={this.logout} className="nav-item nav-link">
                                    Logout
                                </a>
                            </div>
                        </nav>
                    )}
                    <div className="jumbotron">
                        <div className="container"
                            style={{ display: 'flex', justifyContent: 'center' }}>
                            <div className="row">
                                <PrivateRoute exact path="/" component={HomePage} />
                                <PrivateRoute exact path="/students" component={StudentPage} />
                                <PrivateRoute exact path="/pizza" component={PizzaPage} />
                                <PrivateRoute
                                    path="/admin"
                                    roles={[Role.Admin]}
                                    component={AdminPage}
                                />
                                <Route path="/login" component={LoginPage} />
                            </div>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }
}

export { App };
