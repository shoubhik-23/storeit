import { Box, Button, Grid } from "@material-ui/core";
import React, { Component } from "react";
import HomeCards from "./homeCards";
import openSocket from "socket.io-client";
import { style } from "./style";
import { API_POINT, Token } from "../../constant/Api";
import PaginationComponent from "../../common/pagination";
import { connect } from "react-redux";
import * as action from "../../store/action";
class Home extends Component {
  state = {
    items: this.props.items,
    visibleItems: this.props.visibleItems,
    page: {
      currentPage: 1,
      totalPage: 4,
      records: 5,
    },
  };
  componentDidMount() {
    this.props.getAllItems();
  }

  componentDidUpdate(prevProps, prevStates) {
    if (prevProps.visibleItems !== this.props.visibleItems) {
      this.setState({
        items: this.props.items,
        visibleItems: this.props.visibleItems,
      });
    }
  }

  render() {
    return (
      <Box
        style={{
          padding: "0px 20px",
          boxSizing: "border-box",
        }}
      >
        <Grid container spacing={5} style={{ justifyContent: "center" }}>
          {this.state.visibleItems.length > 0 &&
            this.state.visibleItems.map((el, i) => {
              return (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <HomeCards data={el}></HomeCards>
                </Grid>
              );
            })}
        </Grid>
        <PaginationComponent {...this.state.page}></PaginationComponent>
      </Box>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    visibleItems: state.visibleItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => dispatch(action.getAllItems()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
