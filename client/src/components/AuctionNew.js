import React, { Component } from "react";
import { Auction } from "../lib/requests";
import { Form, Button } from "semantic-ui-react";

class AuctionNew extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    Auction.create({
      auction: {
        item: formData.get("item"),
        description: formData.get("description"),
        reserve: formData.get("reserve"),
        end_date: formData.get("end_date")
      }
    }).then(data => {
      if (!data.errors) {
        this.props.history.push(`/`);
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Item</label>
          <input name="item" placeholder="item" />
        </Form.Field>
        <Form.Field>
          <label>Description</label>
          <input
            name="description"
            placeholder="A brief description of the item"
          />
        </Form.Field>
        <Form.Field>
          <label>Reserve Price</label>
          <input name="reserve" placeholder="Reserve" />
        </Form.Field>
        <Form.Field>
          <label>End Date (yyyy/mm/dd)</label>
          <input name="end_date" placeholder="2018/05/31" />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

export default AuctionNew;
