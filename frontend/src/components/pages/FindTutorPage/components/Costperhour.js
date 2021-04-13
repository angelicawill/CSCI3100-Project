import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { orange } from '@material-ui/core/colors';
import './FindTutorPageStyle.css';

const useStyles = makeStyles({
    root: {
        width: "40%",
        display: "flex",
        padding: "5vw 0vw 0vw 9vw"
    },
});

const SalarySlider = withStyles({
    root: {
        color: orange[400],
        height: 8,
    }
})(Slider);

export default function RangeSlider() {
    const classes = useStyles();
    const [value, setValue] = React.useState([40, 200]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <div className={classes.margin} />

            <SalarySlider value={value}
                          onChange={handleChange}
                          valueLabelDisplay="on"
                          aria-labelledby="range-slider"
                          max={400}
                          min={40}
                          step={10} />

        </div>
    );
}