import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "semantic-ui-react";
import { Token } from "../lib/requests";

class SignInPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: []
    };

    this.createToken = this.createToken.bind(this);
  }

  createToken(event) {
    const { onSignIn = () => {} } = this.props;
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    Token.create({
      email: formData.get("email"),
      password: formData.get("password")
    }).then(data => {
      if (!data.errors) {
        localStorage.setItem("jwt", data.jwt);
        onSignIn();
        this.props.history.push("/");
      } else {
        this.setState({
          errors: [
            {
              message: "Invalid username or password"
            }
          ]
        });
      }
    });
  }
  render() {
    return (
      <main className="SignInPage" style={{ margin: "0 1rem" }}>
        <h2>Sign In</h2>
        {this.state.errors.map((e, i) => (
          <div className="alert" key={i}>
            {e.message}
          </div>
        ))}
        <Form onSubmit={this.createToken}>
          <Form.Field>
            <label>Email</label>

            <input
              placeholder="example@gmail.com"
              id="email"
              type="email"
              name="email"
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" id="password" name="password" />
          </Form.Field>
          <Button type="submit">Sign In</Button>{" "}
          <small>
            <Link to="/reset_password">Forgot Password?</Link>
          </small>
        </Form>
      </main>
    );
  }
}

export default SignInPage;
