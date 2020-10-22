import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";

import Pagination from "@material-ui/lab/Pagination";

// import Snackbar from '@material-ui/core/Snackbar';

import Searchbar from "./components/Searchbar";
import PhotoList from "./components/PhotoList";
import "./App.scss";
/* some variables/constant */
const API_KEY = "3919009-79d0eb98510653e58766e4260";
const PER_PAGE = 50;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      photos: [],

      searchText: "Mountain",
      openToast: true,
      pagination: {
        size: PER_PAGE,
        total: 1,
        page: 1,
      },
      query: {
        per_page: PER_PAGE,
        page: 1,
      },
    };
  }
  componentDidMount() {
    this.handleSearch(this.state.searchText);
  }
  handleSearch = (searchText) => {
    searchText = (searchText || "").trim();
    if (this.state.searchText != searchText) {
      this.setState({
        pagination: { ...this.state.pagination, page: 1 },
        query: { ...this.state.query, page: 1 },
      });
    }
    this.setState({ loading: true }, function () {
      this.setState({ searchText: searchText, xloading: true }, function () {
        let URL =
          "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          encodeURIComponent(this.state.searchText) +
          "&per_page=" +
          this.state.query.per_page +
          "&page=" +
          this.state.query.page;
        axios.get(URL).then((photos) => {
          document.body.scrollIntoView({ behavior: "smooth", block: "start" });
          console.log(this);
          this.setState({
            photos: photos.data.hits,
            pagination: {
              ...this.state.pagination,
              total: photos.data.totalHits,
            },
            // loading: false,
          });
          setTimeout(() => this.setState({ loading: false }), 800);
        });
      });
    });
  };
  render() {
    return (
      <div className="App">
        <Container>
          {/* <Snackbar open={this.state.openToast}/> */}
          <Searchbar
            handleSearch={this.handleSearch}
            value={this.state.searchText}
          />

          <Backdrop
            open={this.state.loading}
            style={{ zIndex: 10000, color: "white" }}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
          <PhotoList
            photos={this.state.photos}
            style={{
              display: !this.state.loading ? "block" : "none",
            }}
          />
          <Pagination
            count={Math.ceil(
              this.state.pagination.total / this.state.pagination.size
            )}
            page={this.state.pagination.page}
            color="primary"
            style={{
              display: this.state.photos.length ? "flex" : "none",
              justifyContent: "center",
              margin: "20px 0",
            }}
            onChange={(evt, page) => {
              this.setState(
                {
                  pagination: { ...this.state.pagination, page },
                  query: { ...this.state.query, page },
                },
                function () {
                  this.handleSearch(this.state.searchText);
                }
              );
            }}
          />
        </Container>
      </div>
    );
  }
}
