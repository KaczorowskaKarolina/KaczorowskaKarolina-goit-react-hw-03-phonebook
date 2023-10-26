import React from 'react';
import PropTypes from 'prop-types';
import './list.css';

const List = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter((contact) => {
    return contact.name && contact.name.toLowerCase().includes(filter && filter.toLowerCase());
  });

  return (
  <ul>
    {filteredContacts.map((contact) =>
      <li key={contact.id}>
        {contact.name}: {contact.number}
        <button onClick={() => deleteContact(contact.id)}>Delete contact</button>
      </li>
    )}
  </ul>
);
};

List.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object),
  filter: PropTypes.string,
  deleteContact: PropTypes.func,
};

export default List;