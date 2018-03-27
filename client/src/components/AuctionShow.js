import React, { Component } from "react";
import { Auction, Bid } from "../lib/requests";
import { Form, Input, Button } from "semantic-ui-react";

class AuctionShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: {},
      bids: [],
      host: {},
      bid: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.deleteBid = this.deleteBid.bind(this);
  }

  componentDidMount() {
    Auction.one(this.props.match.params.auctionId).then(auction =>
      this.setState({
        auction: auction,
        bids: auction.bids,
        host: auction.host,
        bid: auction.max_bid + 1
      })
    );
  }

  deleteBid(event) {
    event.preventDefault();
    const id = parseInt(event.currentTarget.id, 10);
    Bid.delete(id);
  }

  handleChange = (e, { value }) => this.setState({ bid: value });

  handleSubmit(event) {
    event.preventDefault();
    Bid.create(this.props.match.params.auctionId, {
      price: this.state.bid
    });
  }

  render() {
    const { auction, bids = [] } = this.state;
    return (
      <div>
        <h2>{auction.item}</h2>
        <h3>Reserve Price: ${auction.reserve}.00</h3>
        <p>{auction.description}</p>
        <Form onSubmit={this.handleSubmit}>
          <Form.Field inline style={{ display: "flex", alignItems: "center" }}>
            <label>Submit Bid</label>
            <Input
              onChange={this.handleChange}
              placeholder="eg. $100"
              value={this.state.bid}
            />
            <Button style={{ height: "38px", marginLeft: "5px" }}>
              Submit
            </Button>
          </Form.Field>
          <h4>
            {auction.reserve > auction.max_bid
              ? "Reserve not met"
              : "Reserve price has been met"}
          </h4>
        </Form>
        <h4>Latest Bids:</h4>
        <ul>
          {bids.map((bid, key) => (
            <li key={key}>
              ${bid.price} on {bid.created}{" "}
              <Button
                onClick={this.deleteBid}
                id={bid.id}
                style={{
                  height: "25px",
                  padding: "5px",
                  fontSize: "10px",
                  margin: "5px"
                }}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default AuctionShow;
