import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import MaskedInput from 'react-text-mask';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';

// Define the validation schema
const validationSchema = Yup.object({
    name: Yup.string()
        .min(3, 'Name must be at least 3 characters')
        .max(50, 'Name cannot exceed 50 characters')
        .required('Name is required'),
    number: Yup.string()
        .matches(/^\+38\s0\d{2}\s\d{3}\s\d{2}\s\d{2}$/, 'Phone number must be in the format +38 0XX XXX XX XX')
        .required('Phone number is required'),
});

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

function ContactForm({ addContact }) {
    return (
        <Formik
            initialValues={{ name: '', number: '' }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
                addContact({ ...values, id: nanoid() });
                resetForm();
            }}
        >
            {({ values, setFieldValue }) => (
                <Form className={styles.form}>
                    <label htmlFor="name">Name</label>
                    <Field
                        name="name"
                        value={values.name}
                        onChange={(e) => setFieldValue('name', capitalizeFirstLetter(e.target.value))}
                        placeholder="Enter your name"
                        className={styles.input}
                    />
                    <ErrorMessage name="name" component="div" className={styles.error} />

                    <label htmlFor="number">Number</label>

                    {/* Используем MaskedInput для маски номера телефона */}
                    <MaskedInput
                        mask={['+', '3', '8', ' ', '0', /[1-9]/, /\d/, ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, ' ', /\d/, /\d/]}
                        value={values.number}
                        onChange={(e) => setFieldValue('number', e.target.value)}
                        placeholder="+38 0XX XXX XX XX"
                        className={styles.input}
                    />

                    <ErrorMessage name="number" component="div" className={styles.error} />

                    <button type="submit" className={styles.button}>
                        Add contact
                    </button>
                </Form>
            )}
        </Formik>
    );
}

export default ContactForm;
