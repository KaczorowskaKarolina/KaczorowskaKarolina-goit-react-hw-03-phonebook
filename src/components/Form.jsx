import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import css from './form.css';
import { nanoid } from 'nanoid';

export class Form extends Component {
  state = { name: '', number: '' };
  nameId = nanoid();
  numberId = nanoid();

  handleSubmit = evt => {
    evt.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      return;
    }

    this.props.onSubmit({ name, number });

    this.reset();
  };

  reset = () => {
    this.setState({ name: '', number: '' });
  };

  handleChange = event => {
    const { name, value } = event.target;
    console.log(value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { name, number } = this.state;
    return (
      <>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor={this.nameId}>Name</label>
          <input
            type="text"
            id={this.nameId}
            name="name"
            value={name}
            onChange={this.handleChange}
          />
          <label htmlFor={this.numberId}>Number</label>
          <input
            type="text"
            id={this.numberId}
            name="number"
            value={number}
            onChange={this.handleChange}
          />
          <button type="submit">Add contact</button>
        </form>
      </>
    );
  }
}

   Form.propTypes = {
     name: PropTypes.string,
     number: PropTypes.string,
     onSubmit: PropTypes.func.isRequired,
   };
  