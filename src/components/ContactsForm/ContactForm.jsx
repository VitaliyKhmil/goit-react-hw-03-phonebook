import { Component } from 'react';
import {
  FormButton,
  Label,
  ErrorText,
} from 'components/ContactsForm/ContactForm.styled';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { nanoid } from 'nanoid';
import * as yup from 'yup';

const Schema = yup.object().shape({
  name: yup.string().min(2).required(),
  number: yup.string().length(7).required(),
});

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  normalizedNumber = str => {
    const normalizedNumber =
      str[0] + str[1] + str[2] + '-' + str[3] + str[4] + '-' + str[5] + str[6];
    return normalizedNumber;
  };

  normalizedName = str => {
    const normalizedName = str
      .split(' ')
      .map(item => item[0].toUpperCase() + item.slice(1))
      .join(' ');
    return normalizedName;
  };

  handleSubmit = (values, { resetForm }) => {
    const newName = {
      id: nanoid(),
      name: this.normalizedName(values.name),
      number: this.normalizedNumber(values.number),
    };

    console.log(newName);
    this.props.onSubmit(newName);
    resetForm();
  };

  render() {
    return (
      <Formik
        initialValues={this.state}
        onSubmit={this.handleSubmit}
        validationSchema={Schema}
      >
        {props => (
          <Form>
            <Label>
              Name:
              <Field
                type="text"
                name="name"
                onChange={props.handleChange}
                value={props.values.name}
              />
              <ErrorMessage
                name="name"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </Label>
            <Label>
              Number:
              <Field
                type="tel"
                name="number"
                onChange={props.handleChange}
                value={props.values.number}
              />
              <ErrorMessage
                name="number"
                render={msg => <ErrorText>{msg}</ErrorText>}
              />
            </Label>

            <FormButton type="submit">Add contact</FormButton>
          </Form>
        )}
      </Formik>
    );
  }
}
