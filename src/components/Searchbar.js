import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";

const handleSearch = (searchText, handleSearch) => (event) => {
  event.preventDefault();
  handleSearch(searchText);
};

function Searchbar(props) {
  const [searchText, setSearchText] = useState(props.value || "");
  return (
    <div style={{ marginBottom: 50, textAlign: "center" }}>
      <Grid container justify="center">
        <Grid item xs={12}>
          <h1 className="">Simple Photo Search App with React.js</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <form
            onSubmit={handleSearch(searchText, props.handleSearch)}
            xstyle={{ display: "flex" }}
          >
            <div className="search-with-btn-wrapper">
              <TextField
                label="Search"
                // size="small"
                variant="outlined"
                defaultValue={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
                autoFocus={true}
                fullWidth={true}
              />
              <Button
                variant="contained"
                color="primary"
                type="submit" 
                endIcon={<SearchIcon style={{ margin: 0 }} />}
              ></Button>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  );
}

export default Searchbar;
