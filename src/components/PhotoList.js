import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  paper: {
    height: 150,
    background: "#424242",
  },
}));
function PhotoList(props) {
  const classes = useStyles();
  const photos = props.photos || [];
  const theme = {
    spacing: 8,
  };
  return (
    <div>
    <div
      style={{
        textAlign: "center",
      }}
    >
      {!photos.length ? "Sorry, No result found!" : ""}
    </div>
      <Grid container spacing={3} className="photolistContainer">
        {photos.map((photo) => (
          <Grid
            key={photo.id}
            item
            xs={12}
            sm={6}
            md={3}
            m={2}
            className="photolist__item"
          >
            <div className="photolist__item-inner">
              <img
                src={photo.largeImageURL} //largeImageURL //previewURL
                alt=""
                className="photolist__image"
              />
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PhotoList;
