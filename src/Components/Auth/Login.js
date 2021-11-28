import React, { Component } from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
} from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import firebase from 'firebase/compat/app';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      errors: [],
      loading: false,
      // usersRef: firebase.database().ref('users')
    };
  }

  //display errors
  displayErrors = (err) => err.map(
    (data, index) => (<p key={ index }>{ data.message } </p>));

  // input values changing in state
  handleChange = (e) => {
    return this.setState({ [e.target.name]: e.target.value });
  };

  //input changing errors
  inputHandleChange = (err, inputName) => {
    return err.some(
      err1 => err1.message.toLowerCase().includes(inputName)) ? 'error' : '';
  };

  // formValidation
  isFormValid = ({ email, password }) => {
    return email && password;
  };
  // handle submit button click button
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
          console.log('signed-in-user', signedInUser);
        }).catch(err => {
        console.error(err);
        this.setState(
          { errors: this.state.errors.concat(err), loading: false });
      });
    }
  };

  render() {
    const {
            email,
            password,
            errors, loading,
          } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={ { maxWidth: 450 } }>
          <Header as="h1" icon color="violet" textAlign="center">
            <Icon name="code branch" color="orange"/>
            Login to DevChat
          </Header>
          <Form onSubmit={ this.handleSubmit } size="large">
            <Segment stacked>

              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                value={ email }
                className={ this.inputHandleChange(errors, 'email') }
                onChange={ this.handleChange }
                type="email"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={ password }
                className={ this.inputHandleChange(errors, 'password') }

                onChange={ this.handleChange }
                type="password"
              />

              <Button disabled={ loading }
                      className={ loading ? 'loading' : '' } color="violet"
                      fluid size="large">
                Submit
              </Button>
            </Segment>
          </Form>
          { errors.length > 0 && (
            <Message>
              <h3>Error</h3>
              { this.displayErrors(errors) }
            </Message>
          ) }
          <Message>
            Dont have an Account? <Link to="/register">Login</Link>
          </Message>
        </Grid.Column>
        Register
      </Grid>
    );
  }
}

export default Login;
