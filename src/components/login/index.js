import React, { Component } from "react";
import PropTypes from "prop-types";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { TextField } from "@material-ui/core";

const styles = theme => ({
  layout: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  pubKey;
  secKey;
  nickname = "null";

  handlePubkey = async e => {
    const blob = e.target.files[0];
    if (!blob) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.pubKey = reader.result;
    };
    reader.readAsText(blob);
  };

  handleSeckey = async e => {
    const blob = e.target.files[0];
    if (!blob) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.secKey = reader.result;
    };
    reader.readAsText(blob);
  };

  render() {
    const { classes, login, register } = this.props;
    return (
      <React.Fragment>
        <CssBaseline />
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Dtwi
            </Typography>

            <form className={classes.form}>
              <div
                style={{
                  border: "1px solid",
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: "#d6d7da"
                }}
              >
                <FormControl margin="normal" required fullWidth>
                  <div style={{ textAlign: "center" }}>
                    <input
                      type="file"
                      id="pubkey"
                      style={{ display: "none" }}
                      onChange={this.handlePubkey}
                    />
                    <label htmlFor="pubkey">
                      <Button raised component="span">
                        pubKey
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <div style={{ textAlign: "center" }}>
                    <input
                      type="file"
                      id="seckey"
                      style={{ display: "none" }}
                      onChange={this.handleSeckey}
                    />
                    <label htmlFor="seckey">
                      <Button raised component="span">
                        secKey
                      </Button>
                    </label>
                  </div>
                </FormControl>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={() => {
                    console.log("login", this.pubKey, this.secKey);
                    login(this.pubKey, this.secKey);
                  }}
                >
                  Sign in
                </Button>
              </div>
              <br />
              <br />
              <div
                style={{
                  textAlign: "center",
                  border: "1px solid",
                  borderRadius: 4,
                  borderWidth: 0.5,
                  borderColor: "#d6d7da"
                }}
              >
                <TextField
                  label="nick name"
                  onChange={e => {
                    this.nickname = e.target.value;
                  }}
                />
                <br />
                <br />
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => {
                    register(this.nickname);
                  }}
                >
                  register
                </Button>
              </div>
            </form>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired
};

export default function setSignin(login = () => {}, register = name => {}) {
  const Styled = withStyles(styles)(SignIn);
  return <Styled login={login} register={register} />;
}
