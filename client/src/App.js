import React, { Component } from "react";
import jwtDecode from "jwt-decode";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuctionIndex from "./components/AuctionIndex";
import AuctionNew from "./components/AuctionNew";
import AuctionShow from "./components/AuctionShow";
import AuthRoute from "./components/AuthRoute";
import Navbar from "./components/Navbar";
import NotFound from "./components/NotFound";
import SignInPage from "./components/SignInPage";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null
    };
    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentWillMount() {
    this.signIn();
  }

  signIn() {
    const jwt = localStorage.getItem("jwt");

    if (jwt) {
      const payload = jwtDecode(jwt);
      this.setState({
        user: payload
      });
    }
  }

  signOut() {
    localStorage.removeItem("jwt");
    this.setState({
      user: null
    });
  }

  isSignedIn() {
    return !!this.state.user;
  }

  render() {
    // console.log(this.state.quiz);
    return (
      <Router>
        <div>
          <Navbar user={this.state.user} onSignOut={this.signOut} />

          <Switch>
            <Route exact path="/" component={AuctionIndex} />

            <Route
              exact
              path="/sign_in"
              render={props => <SignInPage {...props} onSignIn={this.signIn} />}
            />

            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              exact
              path="/auctions/new"
              component={AuctionNew}
            />

            <AuthRoute
              isAuthenticated={this.isSignedIn()}
              exact
              path="/auctions/:auctionId"
              component={AuctionShow}
            />

            <Route component={NotFound} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
