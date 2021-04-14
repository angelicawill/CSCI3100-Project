import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {makeStyles} from "@material-ui/core/styles";
import './FindTutorPageStyle.css';


const useStyles = makeStyles(() => ({
    container: {

    },
}));

export default function RadioButtonsGroup() {
    const [value, setValue] = React.useState('kindergarten');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    const classes = useStyles();

    return (
        <div className="grade-wrapper">
        <FormControl component="fieldset">
            <RadioGroup
                aria-label="grade"
                name="grade"
                value={value}
                onChange={handleChange}
                row={true}
                className={classes.container}
            >
                <FormControlLabel value="kindergarten" control={<Radio color="default" />} label="Kindergarten" />
                <FormControlLabel value="senior-secondary" control={<Radio color="default" />} label="Senior Secondary" />
                <FormControlLabel value="undergraduate" control={<Radio color="default" />} label="Undergraduate" />
                <FormControlLabel value="primary" control={<Radio color="default" />} label="Primary" />
                <FormControlLabel value="junior-secondary" control={<Radio color="default" />} label="Junior Secondary" />
                <FormControlLabel value="others" control={<Radio color="default" />} label="Others" />
            </RadioGroup>
        </FormControl>
        </div>
    );
}