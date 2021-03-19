import React from 'react';
import {makeStyles, ThemeProvider, withStyles} from '@material-ui/core/styles';
import { orange } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme } from '@material-ui/core/styles'


const Checkboxgroup = withStyles({
    root: {
        color: orange[400],
        '&$checked': {
            color: orange[600],
        },
    },
    checked: {},
})((props) => <Checkbox color="default" {...props} />);

const theme = createMuiTheme({
    typography: {
        body1: {
            color: "black"
        }
    }
})

const useStyles = makeStyles((theme) => ({
    container: {
        width: 400,
        height: 100,
        position:"absolute",
        top: 640,
        left: 320
    },
}));

function Teachingmodeselect() {

    const [state, setState] = React.useState({
        checkedA: true,
        checkedB: true,
        checkedC: true,
        checkedD: true,
    });

    const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    const classes = useStyles();


    return (
        <FormGroup row className={classes.container}>
            <ThemeProvider theme={theme}>
                <FormControlLabel className="one-to-one"
                                  control={<Checkboxgroup checked={state.checkedA} onChange={handleChange} name="checkedA" />}
                                  label="1-to-1 Teaching"
                />
                <FormControlLabel
                    control={<Checkboxgroup checked={state.checkedC} onChange={handleChange} name="checkedC" />}
                    label="Offline"
                />
                <FormControlLabel
                    control={<Checkboxgroup checked={state.checkedB} onChange={handleChange} name="checkedB" />}
                    label="Group Teaching"
                />
                <FormControlLabel
                    control={<Checkboxgroup checked={state.checkedD} onChange={handleChange} name="checkedD" />}
                    label="Online"
                />
            </ThemeProvider>
        </FormGroup>
    );
}

export default Teachingmodeselect;