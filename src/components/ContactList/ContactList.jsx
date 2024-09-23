import React from 'react';
import Contact from '../Contact/Contact.jsx';
import styles from './ContactList.module.css';

function ContactList({ contacts, onDelete }) {
    return (
        <ul className={styles.list}>
            {contacts.map((contact) => (
                <Contact key={contact.id} contact={contact} onDelete={onDelete} />
            ))}
        </ul>
    );
}

export default ContactList;
