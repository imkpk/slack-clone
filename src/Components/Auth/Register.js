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
import firebase from '../../firebase';
import md5 from 'md5';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      errors: [],
      loading: false,
      // usersRef: firebase.database().ref('users')
      usersRef:firebase?.database()?.ref('users')
    };
  }

  //if it is an empty form
  isFormEmpty = ({ username, email, password, passwordConfirmation }) => {
    // const {username, email, password, passwordConfirmation} = form;
    return (
      !username.length ||
      !email.length ||
      !password.length ||
      !passwordConfirmation.length
    );
  };
  //password validation
  isPasswordValid = ({ password, passwordConfirmation }) => {
    // return password === passwordConfirmation;
    if (password.length < 6 || passwordConfirmation.length < 6) {
      return false;
    } else return password === passwordConfirmation;
  };
//Form validation
  isFormValid = () => {
    let errors;
    errors = [];
    let error;

    if (this.isFormEmpty(this.state)) {
      error = { message: 'Fill in all fields' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: 'Password is invalid' };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

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

  //saving user in handleSubmit
  saveUser = (createdUser) => {
    return this.state.usersRef.child(createdUser.user.uid).set({
      name: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
    });
  };

  // handle submit button click button
  handleSubmit = (event) => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then((createdUser) => {
          console.log(createdUser);
          createdUser.user.updateProfile({
            displayName: this.state.username,
            photoURL: `http://gravatar.com/avatar/${ md5(
              createdUser.user.email) }?d=identicon`,
          }).then(() => {
            // this.setState({ loading: false });
            this.saveUser(createdUser).then(() => {
              console.log('user saved gravatar');
            });
          }).catch(err => {
            console.log(err);
            this.setState(
              { errors: this.state.errors.concat(err), loading: false });
          });
        })
        .catch((err) => {
          console.log(err);
          this.setState(
            { errors: this.state.errors.concat(err), loading: false });
        });
    }
  };

  render() {
    const {
            username,
            email,
            password,
            passwordConfirmation,
            errors, loading,
          } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={ { maxWidth: 450 } }>
          <Header as="h1" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange"/>
            Register for Devchat
          </Header>
          <Form onSubmit={ this.handleSubmit } size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={ username }
                onChange={ this.handleChange }
                type="text"
              />
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
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password confirmation"
                value={ passwordConfirmation }
                className={ this.inputHandleChange(errors, 'password') }
                onChange={ this.handleChange }
                type="password"
              />
              <Button disabled={ loading }
                      className={ loading ? 'loading' : '' } color="orange"
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
            Already a User? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
        Register
      </Grid>
    );
  }
}

export default Register;
