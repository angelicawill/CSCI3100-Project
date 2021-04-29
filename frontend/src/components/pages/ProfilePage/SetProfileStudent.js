import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { ReactComponent as Logo } from './../../logo.svg';
import './SetProfile.css';
import './../../../App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


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

const marks = [
  {
    value: 100,
    label: 'HKD 100',
  },
  {
    value: 200,
    label: 'HKD 200',
  },
];


export default function SetProfileStudent(props) {
  const classes = useStyles();


  let state = {
    grade: "",
    subjectsNeedHelp: "",
    freeTime: "",
    preferredFee: "",
    preferredTeachingMode: ""
  };

  const setState = React.useState({
    grade: "",
    subjectsNeedHelp: "",
    freeTime: "",
    preferredFee: "",
    preferredTeachingMode: ""
  });

  const handleChange = (event) => {
    setState(event.target.value);
  };


  const submit = () => {
    props.SetProfileStudent(
      state.grade,
      state.subjectsNeedHelp,
      state.freeTime,
      state.preferredFee,
      state.preferredTeachingMode
    );
  };



  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div id='setProfile-function' className={classes.paper}>
          <a href='/'><Logo width='20vw' hasMargin /></a>
          <h3>
            Set up your student profile
          </h3>
          <p>Fill in the form below</p>
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
                  <InputLabel htmlFor="select-grade">Select Grade</InputLabel>
                  <Select
                    native
                    value={state.grade}
                    onChange={handleChange}
                    label="Select Grade"
                    inputProps={{
                      name: 'grade',
                    }}
                  >
                    <option value={"1"}>Kindergarten</option>
                    <option value={"2"}>Primary</option>
                    <option value={"3"}>Junior Secondary</option>
                    <option value={"4"}>Senior Secondary</option>
                    <option value={"5"}>Undergraduate</option>
                    <option value={"6"}>Others</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="select-subject">Select Subject</InputLabel>
                  <Select
                    native
                    value={state.subjectsNeedHelp}
                    onChange={handleChange}
                    label="Select Subject"
                    inputProps={{
                      name: 'subjectsNeedHelp',
                    }}
                  >
                    <option value={"Mathematics"}>Mathematics</option>
                    <option value={"Physics"}>Physics</option>
                    <option value={"Chemistry"}>Chemistry</option>
                    <option value={"Biology"}>Biology</option>
                    <option value={"English"}>English</option>
                    <option value={"Chinese"}>Chinese</option>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl
                  required
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel htmlFor="select-teachingMode">Select Teaching Mode</InputLabel>
                  <Select
                    native
                    value={state.preferredTeachingMode}
                    onChange={handleChange}
                    label="Preferred Teaching Mode"
                    inputProps={{
                      name: 'preferredTeachingMode',
                    }}
                  >
                    <option value={"single"}>One-on-one Teaching</option>
                    <option value={"multi"}>Group Teaching</option>
                    <option value={"both"}>Both</option>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <Button
              id="id1" //for backend
              type="submit" //for backend
              // onClick={submit}
              // onSubmit={submit}
              fullWidth
              variant="contained"
              label="set-profile-button"
              classes={{
                root: classes.root, // class name, e.g. `classes-nesting-root-x`
                label: classes.label, // class name, e.g. `classes-nesting-label-x`
              }}
              className={classes.submit}
              color="primary"
            >
              Save Profile
            </Button>
          </form>
        </div>

      </Container>

      <div id='footer-setProfile'>
        <p>
          &copy; Group C7, CSCI3100 Spring 2021
          </p>
      </div>
    </ThemeProvider>
  );
}