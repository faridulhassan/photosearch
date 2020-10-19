import React, { Component, useEffect, useState } from "react";
import axios from "axios";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
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
        page: 1
      },
      query: {
        per_page: PER_PAGE,
        page: 1
      }
    };
    this.handleSearch = this.handleSearch.bind(this);
  }
  componentDidMount() {
    this.handleSearch(this.state.searchText);
  }
  handleSearch(searchText) {
    /* if(this.state.searchText === searchText) {
      return;
    } */
    this.setState({ loading: true }, function () {
      this.setState({ searchText: searchText, xloading: true }, function () {
        let URL =
          "https://pixabay.com/api/?key=" +
          API_KEY +
          "&q=" +
          encodeURIComponent(this.state.searchText) + 
          "&per_page=" + this.state.query.per_page + 
          "&page=" + this.state.query.page;
        axios.get(URL).then((photos) => {
          console.log('hello', this);
          // debugger;
          console.log(photos.data.hits);
          console.log(photos.data.total);
          // debugger;
          document.body.scrollIntoView({behavior: 'smooth', block: 'start'});
          this.setState({
            photos: photos.data.hits,
            pagination: { ...this.state.pagination, total: photos.data.total },
            loading: false,
          });
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
          <Pagination
            count={Math.ceil(
              this.state.pagination.total / this.state.pagination.size
            )}
            color="primary"
            style={{
              display: this.state.photos.length ? "flex" : "none",
              justifyContent: "center",
              margin: "20px 0",
            }}
            onChange={(evt, page)=> {
              console.log(this);
              this.setState({
                pagination: { ...this.state.pagination, page },
                query: { ...this.state.query, page },
              }, function() {
                this.handleSearch(this.state.searchText);
              });
              console.log(evt);
              console.log(page);
            }}
          />
        </Container>
      </div>
    );
  }
}
