import React from 'react';
import styles from './Contact.module.css';

function Contact({ contact, onDelete }) {
    return (
        <li className={styles.contact}>
            <p>{contact.name}</p>
            <p>{contact.number}</p>
            <button onClick={() => onDelete(contact.id)}>Delete</button>
        </li>
    );
}

export default Contact;
