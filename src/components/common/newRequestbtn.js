import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import { TiDocumentAdd } from "react-icons/ti";


const NewRequestBtn = props => {
  const ColorButton = withStyles(theme => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    }
  }))(Button);
  const useStyles = makeStyles(theme => ({
    margin: {
      margin: theme.spacing(1.4)
    },
    extendedIcon: {
      marginRight: theme.spacing(1)
    }
  }));
  const classes = useStyles();
  return (
    <>
      <ColorButton
        style={{
          display: "block",
          color: "#fff",
          borderRadius: 25,
          outline: "none",
          width: 150,
          fontSize: 13
        }}
        variant="contained"
        color="primary"
        className={classes.margin}
      >
        <TiDocumentAdd size="25" style={{ marginLeft: 5 }} />
        <span style={{ fontFamily: "IRANYekanBold", }}>درخواست جدید</span>
      </ColorButton>
      {/* <button className="new-request-box-inside-btn">
        <FontAwesomeIcon icon={faFolderPlus} />
        <span className="new-request-box-inside-btn-txt">درخواست جدید</span>
      </button> */}
    </>
  );
};

export default NewRequestBtn;
