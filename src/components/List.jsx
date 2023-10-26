import React from 'react';
import PropTypes from 'prop-types';
import './list.css';

const List = ({ contacts, filter, deleteContact }) => {
  const filteredContacts = contacts.filter((contact) => {
    return contact.name && contact.name.toLowerCase().includes(filter && filter.toLowerCase());
  });

  console.log(filter); // Sprawdzenie, czy prop filter jest przekazywany i ma poprawną wartość
  console.log(deleteContact); // Sprawdzenie, czy prop deleteContact jest przekazywany i ma poprawną wartość
  
  return (
    <div>
      {filteredContacts.map((contact) => (
        <div key={contact.id}>
          {contact.name}: {contact.number}
          <button onClick={() => deleteContact(contact.id)}>Delete contact</button>
        </div>
      ))}
    </div>
  );
};

List.propTypes = {
  contacts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  deleteContact: PropTypes.func.isRequired,
};

export default List;