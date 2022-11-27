import { authenticationService } from '@/_services';

export function authHeader() {
    // return authorization header with jwt token
    const currentUser = authenticationService.currentUserValue;
    if (currentUser && currentUser.token) {
        return {
            accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser.token}`
        };
    } else {
        return {};
    }
}
