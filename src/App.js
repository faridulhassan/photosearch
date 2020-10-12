import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
// import Snackbar from '@material-ui/core/Snackbar';

import Searchbar from "./components/Searchbar";
import PhotoList from "./components/PhotoList";
import "./App.scss";

const API_KEY = "3919009-79d0eb98510653e58766e4260";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      photos: [],
      searchText: "Mountain",
      openToast: true
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.handleSearch(this.state.searchText);
  }
  handleSearch(searchText) {
    debugger;
    this.setState({ loading: true }, function () {
      this.setState({ searchText: searchText, xloading: true }, function () {
        let URL =
          "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          encodeURIComponent(this.state.searchText);
        axios.get(URL).then((photos) => {
          console.log(photos.data.hits);
          this.setState({ photos: photos.data.hits, loading: false });
        });
      });
    });
  }
  render() {
    return (
      <div className="App">
        <Container>
          {/* <Snackbar open={this.state.openToast}/> */}
          <Searchbar
            handleSearch={this.handleSearch}
            value={this.state.searchText}
          />
          <div
            className=""
            style={{
              textAlign: "center",
              marginBottom: 20,
              display: this.state.loading ? "block" : "none",
            }}
          >
            <CircularProgress
              style={{
                display: "inline-block",
              }}
            />
          </div>
          <PhotoList
            photos={this.state.photos}
            style={{
              display: !this.state.loading ? "block" : "none",
            }}
          />
        </Container>
      </div>
    );
  }
}
