import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ReactComponent as Logo} from './../../logo.svg';
import './LogIn.css';
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


export default function LogIn(props) {
  const classes = useStyles();

  let state = {
    username: "",
    password: ""
  };

  const submit = () => {
    props.LogIn(state.username, state.password);
  };
  
  //   fetch('http://localhost:5000/login' , {
  //     method: "POST",
  //     headers: {
  //       'Content-type': 'application/json'
  //     },
  //     body: JSON.stringify(this.state)
  //   })
  //   .then((result) => result.json())
  //   .then((info) => { console.log(info); })
  // };
  
  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div id='login-function'className={classes.paper}>
        <a href='/'><Logo width='20vw' hasMargin/></a>
        <h3>
            Welcome back!
        </h3>  
        <p>Please fill in your login details to proceed</p>        
        <form className={classes.form} 
        onSubmit={(event) => {
          event.preventDefault();
          fetch('/login', {
            method: "POST",
            body: new FormData(event.target)
          })
            .then(res => res.json())
            .then(data => {
              console.log(data)
            })
        }} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              /* backend implementation */
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
              id="id2" //for backend
              type="submit" //for backend
              fullWidth
              variant="contained"
              label="log-in-button"
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              className={classes.submit}
              color="primary"
            >
              Log In
            </Button>
          
          <Grid id='redirect' container>
              <a href="/register">
                Don’t have an account yet? Register
              </a>
          </Grid>
        </form>
      </div>    
      

      
      
      
    </Container>

    <div id='footer-login'>        
          <p>
              &copy; Group C7, CSCI3100 Spring 2021
          </p>        
    </div>
    </ThemeProvider>
  );
}