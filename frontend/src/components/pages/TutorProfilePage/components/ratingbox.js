import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import './ratingbox.css';
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import TextField from '@material-ui/core/TextField';
import mathImgNotSelected from "../../FindTutorPage/images/Math-not-selected.png";

const ratinginfo = {
    marks: "4.97/5",
    numofreviews: "(271 reviews)",
};

const useStyles = makeStyles((theme) => ({
    label: {
        fontSize: "larger",
        color: "#FFCE0A"
    },
}));

function InfoBox() {

    const classes = useStyles();

    return (
        <>
            <div className="introduction-box">
                <h1 className="teacher-mark">
                    4.97/5
                </h1>
                <h2 className="num-of-reviews">
                    {ratinginfo.numofreviews}
                </h2>
                <div className="rating-result-box" >
                    <Rating classes={{
                        label: classes.label,
                    }} name="five-star-rating" value={5} size="small" readOnly />
                    <Divider className="interval" />
                    <h4 className="reviews-received">
                        265
                    </h4>
                    <br />
                    <Rating classes={{
                        label: classes.label,
                    }} name="four-star-rating" value={4} size="small" readOnly />
                    <Divider className="interval" />
                    <h4 className="reviews-received">
                        6
                    </h4>
                    <br />
                    <Rating classes={{
                        label: classes.label,
                    }} name="three-star-rating" value={3} size="small" readOnly />
                    <Divider className="interval" />
                    <h4 className="reviews-received">
                        0
                    </h4>
                    <br />
                    <Rating classes={{
                        label: classes.label,
                    }} name="two-star-rating" value={2} size="small" readOnly />
                    <Divider className="interval" />
                    <h4 className="reviews-received">
                        0
                    </h4>
                    <br />
                    <Rating classes={{
                        label: classes.label,
                    }} name="one-star-rating" value={1} size="small" readOnly />
                    <Divider className="interval" />
                    <h4 className="reviews-received">
                        0
                    </h4>
                </div>

            </div>


        </>
    );
}

export default InfoBox;