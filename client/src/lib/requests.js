const DOMAIN = "localhost:3000";
const BASE_URL = `http://${DOMAIN}`;

function getJWT() {
  return localStorage.getItem("jwt");
}

const Auction = {
  all() {
    return fetch(`${BASE_URL}/auctions`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  delete(id) {
    return fetch(`${BASE_URL}/auctions/${id}`, {
      headers: {
        Authorization: getJWT()
      },
      method: "DELETE"
    }).then(res => res.json());
  },
  //----------------------------------------------
  create(params) {
    return fetch(`${BASE_URL}/auctions`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const Token = {
  create(params) {
    return fetch(`${BASE_URL}/tokens`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  }
};

const Bid = {
  create(id, params) {
    return fetch(`${BASE_URL}/auctions/${id}/bids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: getJWT()
      },
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  delete(id) {
    return fetch(`${BASE_URL}/bids/${id}`, {
      headers: {
        Authorization: getJWT()
      },
      method: "DELETE"
    }).then(res => res.json());
  }
};

const User = {
  create(params) {
    return fetch(`${BASE_URL}/users`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify(params)
    }).then(res => res.json());
  },
  //----------------------------------------------
  one(id) {
    return fetch(`${BASE_URL}/users/${id}`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  },
  //----------------------------------------------
  all() {
    return fetch(`${BASE_URL}/users`, {
      headers: {
        Authorization: getJWT()
      }
    }).then(res => res.json());
  }
};

export { User, Auction, Token, Bid };
