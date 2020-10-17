import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import GetAppIcon from "@material-ui/icons/GetApp";
import Avatar from '@material-ui/core/Avatar';

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
  // debugger;
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
            md={4}
            m={2}
            className="photolist__item"
          >
            <div className="photolist__item-inner">
              <a href={`https://pixabay.com/users/${photo.user}`} target="_blank" className="photolist__item-user">
                <Avatar alt={photo.user} src={photo.userImageURL} />
              </a>
              <img
                src={photo.largeImageURL} //largeImageURL //previewURL
                alt=""
                className="photolist__image"
              />
              <div className="photolist__item-metainfo">
                <ul className="photolist__item-count">
                  <li>
                    <ThumbUpAltIcon /> <span>{photo.likes}</span>
                  </li>
                  <li>
                    <StarBorderIcon /> <span>{photo.favorites}</span>
                  </li>
                  <li>
                    <GetAppIcon /> <span>{photo.downloads}</span>
                  </li>
                </ul>
                <ul className="photolist__item-tags">
                  {photo.tags.split(",").map((tag, _i) => (
                    <li key={_i}>{tag}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default PhotoList;
