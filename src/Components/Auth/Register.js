import React, { Component } from "react";
import {
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Segment,
  Button,
} from "semantic-ui-react";

import { Link } from "react-router-dom";
import firebase from "../../firebase";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    };
  }
  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleChange = (event) => {
    event.preventDefault();
    firebase()
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((createdUser) => {
        console.log(createdUser);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const { username, email, password, passwordConfirmation } = this.state;
    return (
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="puzzle piece" color="orange" />
            Register for Devchat
          </Header>
          <Form onSubmit={this.handleChange} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="username"
                icon="user"
                iconPosition="left"
                placeholder="Username"
                value={username}
                onChange={this.handleChange}
                type="text"
              />
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                value={email}
                onChange={this.handleChange}
                type="emial"
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                value={password}
                onChange={this.handleChange}
                type="passowrd"
              />
              <Form.Input
                fluid
                name="passwordConfirmation"
                icon="repeat"
                iconPosition="left"
                placeholder="Password confirmation"
                value={passwordConfirmation}
                onChange={this.handleChange}
                type="password"
              />
              <Button color="orange" fluid size="large">
                submit
              </Button>
            </Segment>
          </Form>
          <Message>
            {" "}
            Already a User? <Link to="/login">Login</Link>
          </Message>
        </Grid.Column>
        Register
      </Grid>
    );
  }
}
export default Register;
