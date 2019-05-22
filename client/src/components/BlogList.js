import React, { Component } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
// import uuid from "uuid";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import PropTypes from "prop-types";

class BlogList extends Component {
  // state = {
  //   items: [
  //     { id: uuid(), name: "Eggs" },
  //     { id: uuid(), name: "Milk" },
  //     { id: uuid(), name: "Steak" },
  //     { id: uuid(), name: "Water" }
  //   ]
  // };
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    isAuthenticated: PropTypes.bool
  };

  componentDidMount() {
    this.props.getItems();
  }

  onDeleteClick = id => {
    this.props.deleteItem(id);
  };

  render() {
    const { items } = this.props.item;
    return (
      <Container>
        {/* <Button
          color="dark"
          style={{ marginBottom: "2rem" }}
          onClick={() => {
            const name = prompt("Entr Item");
            if (name) {
              this.setState(state => ({
                items: [...state.items, { id: uuid(), name }]
              }));
            }
          }}
        >
          Add Item
        </Button> */}
        <ListGroup>
          <TransitionGroup className="blog-list">
            {items.map(({ _id, name }) => (
              <CSSTransition key={_id} timeout={500} classNames="fade">
                <ListGroupItem>
                  {this.props.isAuthenticated ? (
                    <Button
                      className="remove-btn"
                      color="danger"
                      size="sm"
                      // onClick={() => {
                      //   this.setState(state => ({
                      //     items: state.items.filter(item => item.id !== id)
                      //   }));
                      // }}
                      onClick={this.onDeleteClick.bind(this, _id)}
                    >
                      &times;
                    </Button>
                  ) : null}
                  {name}
                </ListGroupItem>
              </CSSTransition>
            ))}
          </TransitionGroup>
        </ListGroup>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { getItems, deleteItem }
)(BlogList);
