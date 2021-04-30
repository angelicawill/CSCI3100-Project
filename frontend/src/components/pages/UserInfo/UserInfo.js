import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {ReactComponent as Logo} from './../../logo.svg';
import '../LogIn/LogIn.css';
import './../../../App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import cx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import { useFadedShadowStyles } from '@mui-treasury/styles/shadow/faded';
import { useGutterBorderedGridStyles } from '@mui-treasury/styles/grid/gutterBordered';


import Navbar from '../../Navbar/Navbar'

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

const useStyles = makeStyles((theme, palette) => ({

  card: {
    borderRadius: 12,
    minWidth: 256,
    textAlign: 'center',
    margin: 100,
  },
  avatar: {
    width: 60,
    height: 60,
    margin: 'auto',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: '0.5px',
    marginTop: 8,
    marginBottom: 0,
  },
  subheader: {
    fontSize: 14,
    marginBottom: '0.875em',
  },
  statLabel: {
    fontSize: 12,
    fontWeight: 500,
    fontFamily:'Manrope',
    margin: 0,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
    letterSpacing: '1px',
  },

  root: {
    background: 'primary',
    borderRadius: 50,
    border: 0,
    color: 'white',
    height: 48,
    padding: '30px 30px',
  
  },
}));



/* For select button */

export default function UserInfo(props) {
  const styles = useStyles();

  const shadowStyles = useFadedShadowStyles();
  const borderedGridStyles = useGutterBorderedGridStyles({
    borderColor: 'rgba(0, 0, 0, 0.08)',
    height: '50%',
  });

  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <h3>Your Profile</h3>
      <Card className={cx(styles.card)}>
        <CardContent>
          <Avatar className={styles.avatar} src={'https://i.pravatar.cc/300'} />
          <h2 className={styles.heading}>Alan Podemski</h2>
          <span className={styles.subheader}>Poland</span>
        </CardContent>
        <Divider light />
        <Box display={'flex'}>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Username</p>
            <p className={styles.statValue}>6941</p>
          </Box>
          <Box p={2} flex={'auto'} className={borderedGridStyles.item}>
            <p className={styles.statLabel}>Phone Number</p>
            <p className={styles.statValue}>12</p>
          </Box>
        </Box>
      </Card>

    <div id='footer-login'>        
          <p>
              &copy; Group C7, CSCI3100 Spring 2021
          </p>        
    </div>
    </ThemeProvider>
  );
}
