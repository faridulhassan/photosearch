import React, { Component, useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import Pagination from "@material-ui/lab/Pagination";

// import Snackbar from '@material-ui/core/Snackbar';

// import {LOADING} from './redux/actions/actionTypes';
import { loading, addPhotos } from "./redux/actions";

import Searchbar from "./components/Searchbar";
import PhotoList from "./components/PhotoList";
import "./App.scss";
/* some variables/constant */
const API_KEY = "3919009-79d0eb98510653e58766e4260";
const PER_PAGE = 50;

class App extends Component {
  componentDidMount() {
    this.handleSearch(this.props.searchText);
  }
  handleSearch = (searchText) => {
    searchText = (searchText || "").trim();
    if (this.props.searchText != searchText) {
      /* this.setState({
        pagination: { ...this.props.pagination, page: 1 },
        query: { ...this.props.query, page: 1 },
      }); */
      this.props.dispatch({
        type: "",
        payload: {
          pagination: { ...this.props.pagination, page: 1 },
          query: { ...this.props.query, page: 1 },
        },
      });
    }
    //redux loading
    this.props.dispatch(loading(true));
    this.props.dispatch({ type: "", payload: { searchText: searchText } });
    /* this.setState({ searchText: searchText }, function () {
      
    }); */
    let URL =
      "https://pixabay.com/api/?key=" +
      API_KEY +
      "&q=" +
      encodeURIComponent(this.props.searchText) +
      "&per_page=" +
      this.props.query.per_page +
      "&page=" +
      this.props.query.page;
    axios.get(URL).then((photos) => {
      document.body.scrollIntoView({ behavior: "smooth", block: "start" });
      console.log(this);
      /* this.setState({
          photos: photos.data.hits,
          pagination: {
            ...this.props.pagination,
            total: photos.data.totalHits,
          },
          // loading: false,
        }); */
      debugger;
      this.props.dispatch(
        addPhotos({
          photos: photos.data.hits,
          pagination: {
            ...this.props.pagination,
            total: photos.data.totalHits,
          },
          // loading: false,
        })
      );
      setTimeout(() => {
        //redux loading
        this.props.dispatch(loading(false));
      }, 800);
    });
  };
  render() {
    return (
      <div className="App">
        <Container>
          {/* <Snackbar open={this.props.openToast}/> */}
          <Searchbar
            handleSearch={this.handleSearch}
            value={this.props.searchText}
          />

          <Backdrop
            open={this.props.loading}
            style={{ zIndex: 10000, color: "white" }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <PhotoList
            photos={this.props.photos}
            style={{
              display: !this.props.loading ? "block" : "none",
            }}
          />
          <Pagination
            count={Math.ceil(
              this.props.pagination.total / this.props.pagination.size
            )}
            page={this.props.pagination.page}
            color="primary"
            style={{
              display: this.props.photos.length ? "flex" : "none",
              justifyContent: "center",
              margin: "20px 0",
            }}
            onChange={(evt, page) => {
              /* this.setState(
                {
                  pagination: { ...this.props.pagination, page },
                  query: { ...this.props.query, page },
                },
                function () {
                  this.handleSearch(this.props.searchText);
                }
              ); */
              this.props.dispatch({
                type: "",
                payload: {
                  pagination: { ...this.props.pagination, page },
                  query: { ...this.props.query, page },
                },
              });
              this.handleSearch(this.props.searchText);
            }}
          />
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => state;
export default connect(mapStateToProps)(App);
