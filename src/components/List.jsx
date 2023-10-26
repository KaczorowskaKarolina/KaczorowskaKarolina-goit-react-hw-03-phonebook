import React from 'react';
import PropTypes from 'prop-types';
import './list.css';

const List = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter((contact) => {
    return contact.name.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <ul className="list">
      {filteredContacts.map((contact) => (
        <li key={contact.id} className="list-item">
          {contact.name}: {contact.number}
          <button
            className="list-item__delete-button"
            onClick={() => deleteContact(contact.id)}
          >
            Delete contact
          </button>
        </li>
      ))}
    </ul>
  );
};

List.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default List;