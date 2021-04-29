import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as Logo } from './../../logo.svg';
import './Register.css';
import './../../../App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider } from '@material-ui/styles';

const font = "'Manrope', sans-serif";
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2ec5ce',
      dark: '#1e9097'
    },
    secondary: {
      main: '#FE9A22',
    },
  },

  typography: {
    fontFamily: font,
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [font],
      },
    },
  },
});


const useStyles = makeStyles((theme) => ({

  root: {
    background: 'primary',
    borderRadius: 50,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',

  },

  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  InputLabel: {
    fontFamily: 'Manrope',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

/* For select button */


export default function SignUp(props) {
  const classes = useStyles();


  let state = {
    // role: "",
    realname: "",
    phonenumber: "",
    email: "",
    username: "",
    password: ""
  };

  const submit = () => {
    props.signUp(
      state.role,
      state.realname,
      state.phonenumber,
      state.email,
      state.username,
      state.password
    );
  };

  const onChange = (event) => {
    console.log(event.target.value);
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div id='register-function' className={classes.paper}>
          <a href='/'><Logo width='20vw' hasMargin /></a>
          <h3>
            Register
        </h3>
          <p>Create a new student / tutor account for free</p>
          <form className={classes.form} onSubmit={(event) => {
            event.preventDefault();
            fetch('registration/register', {
              method: "POST",
              body: new FormData(event.target)
            })
              .then(res => res.json())
              .then(data => {
                if (data.success) {
                  window.location.assign("/registersuccess");
                }
              })
          }} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControl
                  required
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="select-role">I'm a...</InputLabel>
                  <Select
                    native
                    value={state.role}
                    onChange={onChange}
                    label="I'm a..."
                    inputProps={{
                      name: 'role',
                    }}
                  >
                    <option value={"student"}>Student</option>
                    <option value={"tutor"}>Tutor</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  /* backend implementation */
                  onChange={event => (state.realname = event.target.value)}
                  type="name"
                  name="realname" //identifier
                  id="name"
                  /* styling */
                  label="Name"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  /* backend implementation */
                  onChange={event => (state.phonenumber = event.target.value)}
                  type="tel"
                  name="phonenumber" //identifier
                  id="phonenumber"
                  /* styling */
                  label="Phone Number"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  /* backend implementation */
                  type="email"
                  name="email" //identifier
                  id="email"
                  /* styling */
                  label="Email"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  /* backend implementation */
                  onChange={event => (state.username = event.target.value)}
                  type="text"
                  name="username" //identifier
                  id="username"
                  /* styling */
                  label="Username"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  /* backend implementation */
                  onChange={event => (state.password = event.target.value)}
                  type="password"
                  name="password" //identifier
                  id="password"
                  /* styling */
                  label="Password"
                  variant="outlined"
                  required
                  fullWidth
                  autoFocus
                />
              </Grid>
            </Grid>
            <Button
              id="id1" //for backend
              type="submit" //for backend
              // onClick={submit}
              // onSubmit={submit}
              fullWidth
              variant="contained"
              label="sign-up-button"
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              className={classes.submit}
              color="primary"
            >
              Sign Up
            </Button>

            <Grid id='redirect' container>
              <a href="/login">
                Already have an account? Log in
              </a>
            </Grid>
          </form>
        </div>

      </Container>

      <div id='footer-register'>
        <p>
          &copy; Group C7, CSCI3100 Spring 2021
          </p>
      </div>
    </ThemeProvider>
  );
}