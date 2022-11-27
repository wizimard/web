import React from 'react';

import { pizzaService } from "../_services/pizza.service";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";

class PizzaPage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pizza: {
        type: '',
        name: '',
        model: '',
        price: 0,
      },
      pizzas: [
        {
          id: null,
          type: '',
          name: '',
          model: '',
          price: 0,
        }
      ],
    };
  }

  componentDidMount() {
    pizzaService.getAll().then(pizzas => this.setState({ pizzas }));
  }

  handleClickUpdate(pizza) {
    this.setState({ pizza: pizza });
  }

  handleClickDelete(pizza) {
    pizzaService.deleteById(pizza.id).then(
      () => {
        pizzaService.getAll().then(pizzas => this.setState({ pizzas }));
      },
      error => {
        console.log(error);
      }
    );
  }

  render() {
    const { pizzas, pizza } = this.state;

    return (
      <div>
        <h1>pizzas</h1>
        <Formik
          enableReinitialize={true}
          initialValues={pizza}
          validationSchema={Yup.object().shape({
            type: Yup.string().required('Type is required'),
            name: Yup.string().required('Name is required'),
            model: Yup.string().required('Model is required'),
            price: Yup.number().positive('Price is required')
          })}
          onSubmit={({ type, name, model, price }, { setStatus, setSubmitting }) => {
            setStatus();
            if (pizza.id) {
              pizzaService.update(pizza.id, type, name, model, price)
                .then(
                  () => {
                    pizzaService.getAll().then(pizzas => this.setState({
                      pizzas, pizza: {
                        type: '',
                        name: '',
                        model: '',
                        price: 0,
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
              pizzaService.create(type, name, model, price)
                .then(
                  pizza => {
                    pizzas.push(pizza);
                    setStatus(false);
                    setSubmitting(false);

                    this.setState({
                      pizzas: pizzas, pizza: {
                        type: '',
                        name: '',
                        model: '',
                        price: 0,
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
          render={({ errors,
            status,
            touched,
            isSubmitting,
            handleChange,
            handleBlur,
            values }) => (
            <Form>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <select className={'custom-select form-control' + (errors.type && touched.type ? ' is-invalid' : '')}
                  name="type"
                  id="type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.type}>
                  <option value="0">Choose pizza type</option>
                  <option value="veg">Vegetarian</option>
                  <option value="non-veg">No Vegetarian</option>
                </select>
                <ErrorMessage name="type" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <Field name="name"
                  type="text"
                  className={'form-control' + (errors.name && touched.name ? ' is-invalid' : '')} />
                <ErrorMessage name="name" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="model">Model</label>
                <select className={'custom-select form-control' + (errors.type && touched.type ? ' is-invalid' : '')}
                  name="model"
                  id="model"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.model}>
                  <option value="0">Choose pizza model</option>
                  <option value="little">Little</option>
                  <option value="middle">Middle</option>
                  <option value="big">Big</option>
                </select>
                <ErrorMessage name="model" component="div" className="invalid-feedback" />
              </div>
              <div className="form-group">
                <label htmlFor="price" className="form-label">Price</label>
                <div className="input-group mb-3">
                  <Field type="number"
                    className={'form-control' + (errors.price && touched.price ? ' is-invalid' : '')}
                    name="price" />
                  <div className="input-group-append">
                    <span className="input-group-text">₽</span>
                  </div>
                </div>
                <ErrorMessage name="price" component="div" className="invalid-feedback" />
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
              <th scope="col">Type</th>
              <th scope="col">Name</th>
              <th scope="col">Model</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {
              pizzas.map(pizza =>
                <tr key={pizza.id}>
                  <th scope="col">{pizza.id}</th>
                  <td>{pizza.type}</td>
                  <td>{pizza.name}</td>
                  <td>{pizza.model}</td>
                  <td>{pizza.price}</td>
                  <td><button className={'btn btn-success'} onClick={this.handleClickUpdate.bind(this, pizza)}>Update</button></td>
                  <td><button className={'btn btn-danger'} onClick={this.handleClickDelete.bind(this, pizza)}>Delete</button></td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    );
  }
}

export { PizzaPage };
