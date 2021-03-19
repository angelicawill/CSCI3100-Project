import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    container: {
        width: 300,
        position: "absolute",
        top: 505,
        left: 316,
    },
    textField: {
        width: 240,
    },
}));

function DateAndTimePickers() {

    const classes = useStyles();

    return (
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
    );
}

export default DateAndTimePickers;