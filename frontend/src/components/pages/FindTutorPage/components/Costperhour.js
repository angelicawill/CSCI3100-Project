import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { orange } from '@material-ui/core/colors';

const useStyles = makeStyles({
    root: {
        width: 312,
        position:"absolute",
        top: 718,
        left: 863,
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
            <Typography gutterBottom></Typography>
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