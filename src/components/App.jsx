import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Form } from './Form';
import { Filter } from './Filter';
import List from './List';
import { nanoid } from 'nanoid';
import 'index.css';

export const App = () => {

  class PhonebookApp extends Component {
    state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };

    componentDidMount() {
      const storedContacts = localStorage.getItem('contacts');
      if (storedContacts) {
        this.setState({ contacts: JSON.parse(storedContacts) });
      }
    }

    componentDidUpdate(prevProps, prevState) {
      if (prevState.contacts !== this.state.contacts) {
        localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      }
    }

    addContactOnSubmit = ({ name, number }) => {
      const contactOnList = this.state.contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      );

      if (contactOnList) {
        alert('This contact is already on your list');
      } else {
        const newContact = { id: nanoid(), name, number };

        this.setState(
          (prevState) => ({
            contacts: [...prevState.contacts, newContact],
          }),
          () => {
            localStorage.setItem(
              'contacts',
              JSON.stringify(this.state.contacts)
            );
          }
        );
      }
    };

    deleteContact = (contactId) => {
      const remainingContacts = this.state.contacts.filter(
        (contact) => contact.id !== contactId
      );

      this.setState({ contacts: remainingContacts }, () => {
        localStorage.setItem(
          'contacts',
          JSON.stringify(this.state.contacts)
        );
      });
    };

    onFilterChange = (event) => {
      event.preventDefault();
      this.setState({ filter: event.target.value.toLowerCase() });
    };

    showFilteredContact() {
      return this.state.contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(this.state.filter);
      });
    }

    render() {
      const filter = this.state.filter;

      return (
        <div>
          <h1>Phonebook</h1>
          <Form addContactOnSubmit={this.addContactOnSubmit} />
          <h2>Contacts</h2>
          <Filter value={filter} onFilterChange={this.onFilterChange} />
          <List
            contacts={this.showFilteredContact()}
            deleteContact={this.deleteContact}
          />
        </div>
      );
    }
  }
}
ReactDOM.render(<App />, document.getElementById('root'));