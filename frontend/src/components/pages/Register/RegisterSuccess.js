import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ReactComponent as Logo} from './../../logo.svg';
import './Register.css';
import './../../../App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import {Alert, AlertTitle} from '@material-ui/lab';

// when the user successfully registered this is the display.

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


export default function RegisterSuccess(props) {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div id='register' className={classes.paper}>
        <a href='/'><Logo width='20vw' hasMargin/></a>
        <div id='register-success'>
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <p>You have successfully registered!</p>
             
                <div id='redirect-success'>
                    <a href="/login">
                    <strong>Go to sign in page</strong>
                    </a>
                </div>
              
            </Alert>
        </div>  
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