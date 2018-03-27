import React, { Component } from "react";
import { Auction } from "../lib/requests";
import { Link } from "react-router-dom";
import { Card, Icon } from "semantic-ui-react";

class AuctionIndex extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctions: []
    };
  }

  componentDidMount() {
    Auction.all().then(auctions =>
      this.setState({
        auctions: auctions
      })
    );
  }

  render() {
    const { auctions } = this.state;
    return (
      <div>
        <h2>Auction Show</h2>
        {auctions.map(auction => (
          <Card style={{ margin: "15px" }}>
            <Link to={`/auctions/${auction.id}`}>
              <Card.Content style={{ padding: "5px" }} header={auction.item} />
            </Link>
            <Card.Content description={auction.description} />
            <Card.Content extra>
              <Icon name="user" />
              Sold by: <strong>{auction.host.full_name}</strong>
            </Card.Content>
          </Card>
        ))}
      </div>
    );
  }
}

export default AuctionIndex;
