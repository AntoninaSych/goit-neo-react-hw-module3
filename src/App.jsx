// App.jsx
import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import SearchBox from './components/SearchBox/SearchBox';
import ContactList from './components/ContactList/ContactList';
import './App.css';

function App() {
    const [contacts, setContacts] = useState([
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);

    const [filter, setFilter] = useState('');

    // Effect to load contacts from localStorage
    useEffect(() => {
        const savedContacts = JSON.parse(localStorage.getItem('contacts'));
        if (savedContacts) {
            setContacts(savedContacts);
        }
    }, []);

    // Effect to save contacts to localStorage
    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }, [contacts]);

    const addContact = (newContact) => {
        setContacts((prevContacts) => [...prevContacts, newContact]);
    };

    const deleteContact = (id) => {
        setContacts(contacts.filter(contact => contact.id !== id));
    };

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
    };

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div>
            <h1>Phonebook</h1>
            <ContactForm addContact={addContact} />
            <SearchBox filter={filter} onFilterChange={handleFilterChange} />
            <ContactList contacts={filteredContacts} onDelete={deleteContact} />
        </div>
    );
}

export default App;
