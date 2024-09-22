import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import InputMask from 'react-input-mask';
import * as Yup from 'yup';
import { nanoid } from 'nanoid';
import styles from './ContactForm.module.css';


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
                    />
                    <ErrorMessage name="name" component="div" className={styles.error} />

                    <label htmlFor="number">Number</label>

                    <InputMask
                        mask="+38 \099 999 99 99"
                        maskChar={null}
                        value={values.number}
                        onChange={(e) => setFieldValue('number', e.target.value)}
                    >
                        {(inputProps) => (
                            <Field
                                {...inputProps}
                                name="number"
                                placeholder="+38 0XX XXX XX XX"
                                className={styles.input}
                            />
                        )}
                    </InputMask>

                    <ErrorMessage name="number" component="div" className={styles.error} />

                    <button type="submit">Add contact</button>
                </Form>
            )}
        </Formik>
    );
}

export default ContactForm;
