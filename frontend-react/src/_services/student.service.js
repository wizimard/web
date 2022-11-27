import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const studentService = {
    getAll,
    getById,
    deleteById,
    create,
    update
};

function getAll() {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/student`, requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = { method: 'GET', headers: authHeader() };
    return fetch(`${config.apiUrl}/student/${id}`, requestOptions).then(handleResponse);
}

function deleteById(id) {
    const requestOptions = { method: 'DELETE', headers: authHeader() };
    return fetch(`${config.apiUrl}/student/${id}`, requestOptions).then(handleResponse);
}

function create(email, name, cardNumber, groupName, subgroup) {
    const data = {
        email: email,
        name:'IVT',
        card_number: cardNumber,
        group_name: groupName,
        subgroup: Number(subgroup)
    }

    const requestOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/student`, requestOptions).then(handleResponse);
}

function update(id, email, name, cardNumber, groupName, subgroup) {
    const data = {
        email: email,
        card_number: cardNumber,
        group_name: groupName,
        subgroup: Number(subgroup)
    }

    const requestOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify(data)
    };
    return fetch(`${config.apiUrl}/student/${id}`, requestOptions).then(handleResponse);
}
