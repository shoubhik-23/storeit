import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  withWidth,
} from "@material-ui/core";
import React, { Component } from "react";
import HomeCards from "./homeCards";
import openSocket from "socket.io-client";
import { style } from "./style";
import { API_POINT, Token } from "../../constant/Api";
import PaginationComponent from "../../common/paginate";
import { connect } from "react-redux";
import * as action from "../../store/action";
import CarouselComponent from "../../common/carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
class Home extends Component {
  state = {
    ref: React.createRef(),
    value: "",
    items: this.props.items,
    loading: true,
    visibleItems: this.props.visibleItems,
    searchOn: this.props.searchOn,
    page: {
      recordsPerPage: this.props.recordsPerPage,
      page: this.props.page,
      totalPage: this.props.totalPage,
    },
  };
  componentDidMount() {
    this.props.getAllItems().then((res) => {
      let page = { ...this.state.page };
      page.recordsPerPage = this.props.recordsPerPage;
      page.page = this.props.page;
      page.totalPage = this.props.totalPage;

      this.setState({ loading: false, page: page });
    });
  }

  componentDidUpdate(prevProps, prevStates) {
    this.state.ref.current && this.state.ref.current.focus();
    if (prevProps.visibleItems !== this.props.visibleItems) {
      this.setState({
        page: {
          ...this.state.page,
          page: this.props.page,
          totalPage: this.props.totalPage,
          recordsPerPage: this.props.recordsPerPage,
        },
        loading: false,
        items: this.props.items,
        visibleItems: this.props.visibleItems,
      });
    }
  }
  searchHandler = (event) => {
    let value = event.target.value;
    this.setState({ value: value });
    this.props.onSearch(value, this.state.visibleItems, this.state.items);
  };

  render() {
    return (
      <div style={{ marginTop: "60px" }}>
        {this.props.searchOn && (
          <TextField
            inputRef={this.state.ref}
            variant="outlined"
            fullWidth
            placeholder="Search here.."
            onBlur={this.props.searchOff}
            onChange={this.searchHandler}
            size="small"
          ></TextField>
        )}
        <CarouselComponent></CarouselComponent>

        <Box
          style={{
            padding: "0px 20px",
            boxSizing: "border-box",
          }}
        >
          {this.state.loading ? (
            <Box style={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress></CircularProgress>
            </Box>
          ) : (
            <Grid container spacing={5} style={{ justifyContent: "center" }}>
              {this.state.visibleItems.length > 0 &&
                this.state.visibleItems.map((el, i) => {
                  if (
                    i <
                    (this.state.page.page - 1) * this.state.page.recordsPerPage
                  )
                    return false;
                  if (
                    i >
                    this.state.page.page * this.state.page.recordsPerPage - 1
                  )
                    return false;
                  return (
                    <Grid item xs={6} sm={4} md={3} key={i}>
                      <HomeCards data={el}></HomeCards>
                    </Grid>
                  );
                })}
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <PaginationComponent
                  {...this.state.page}
                  pageChange={(event, value) => {
                    this.setState({
                      page: { ...this.state.page, page: value },
                    });
                  }}
                />
              </Grid>
            </Grid>
          )}
        </Box>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    visibleItems: state.visibleItems,
    searchOn: state.searchOn,
    page: state.page,
    totalPage: state.totalPage,
    recordsPerPage: state.recordsPerPage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getAllItems: () => dispatch(action.getAllItems()),
    searchOff: () => dispatch({ type: "searchOff" }),
    onSearch: (value, visibleItems, items) =>
      dispatch(action.onSearchHandler(value, visibleItems, items)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withWidth()(Home));
