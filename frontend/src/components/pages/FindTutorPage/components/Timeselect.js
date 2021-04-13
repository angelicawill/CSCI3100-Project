import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import './FindTutorPageStyle.css';
import Grade from '../components/Grade';

const useStyles = makeStyles(() => ({
    container: {

    },
    textField: {
        width: 240,
    },
}));

function DateAndTimePickers() {

    const classes = useStyles();

    return (
        <div className="time-select-wrapper">
        <form className={classes.container} noValidate>
            <TextField
                id="datetime-local"
                label="Input date and time..."
                type="datetime-local"
                defaultValue="2021-03-17T10:30"
                className={classes.textField}
                InputLabelProps={{
                    shrink: true,
                }}
            />
        </form>
            <><Grade /></>
        </div>
    );
}

export default DateAndTimePickers;