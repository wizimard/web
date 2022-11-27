import React from 'react';

import { authenticationService } from '@/_services';
import { userService } from "../_services";
import {studentService} from "../_services/student.service";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            userFromApi: null
        };
    }

    componentDidMount() {
        const { currentUser } = this.state;
        //studentService.getById(1).then(userFromApi => this.setState({ userFromApi }));
    }

    render() {
        const { currentUser, userFromApi } = this.state;
        return (
            <div>
                <h1>Home</h1>
                <p>You're logged in with React & JWT!!</p>
                <p>This page can be accessed by all authenticated users.</p>
                <div>
                    Current user from secure api end point:
                    {currentUser &&
                        <ul>
                            <li>{currentUser.user.name}</li>
                        </ul>
                    }
                </div>
            </div>
        );
    }
}

export { HomePage };
