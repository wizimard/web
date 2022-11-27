import config from 'config';
import { authHeader, handleResponse } from '@/_helpers';

export const pizzaService = {
  getAll,
  getById,
  deleteById,
  create,
  update
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/pizza`, requestOptions).then(handleResponse);
}

function getById(id) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(`${config.apiUrl}/pizza/${id}`, requestOptions).then(handleResponse);
}

function deleteById(id) {
  const requestOptions = { method: 'DELETE', headers: authHeader() };
  return fetch(`${config.apiUrl}/pizza/${id}`, requestOptions).then(handleResponse);
}

function create(type, name, model, price) {
  const data = {
    type, name, model, price
  }

  const requestOptions = {
    method: 'POST',
    headers: authHeader(),
    body: JSON.stringify(data)
  };
  return fetch(`${config.apiUrl}/pizza`, requestOptions).then(handleResponse);
}

function update(id, type, name, model, price) {
  const data = {
    type, name, model, price
  }

  const requestOptions = {
    method: 'PUT',
    headers: authHeader(),
    body: JSON.stringify(data)
  };
  return fetch(`${config.apiUrl}/pizza/${id}`, requestOptions).then(handleResponse);
}
