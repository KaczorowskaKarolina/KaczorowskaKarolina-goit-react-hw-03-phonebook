import React from 'react';
import ReactDOM from 'react-dom/client';
import { nanoid } from 'nanoid';
import { App } from './components/App';
import './index.css';

class PhonebookApp extends React.Component {
  state = {
    contacts: [],
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
        <h1>Phonebook App</h1>
        <App
          contacts={this.showFilteredContact()}
          filter={filter}
          onFilterChange={this.onFilterChange}
          addContactOnSubmit={this.addContactOnSubmit}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PhonebookApp />
  </React.StrictMode>
);