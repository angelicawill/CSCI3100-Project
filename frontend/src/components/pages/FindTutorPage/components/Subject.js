import React, {useEffect, useState} from 'react';
import './Subject.css';
import mathImgSelected from '../images/Math-selected.png';
import mathImgNotSelected from '../images/Math-not-selected.png';
import bioImgSelected from '../images/Biology-selected.png';
import bioImgNotSelected from '../images/Biology-not-selected.png';
import phyImgSelected from '../images/Physics-selected.png';
import phyImgNotSelected from '../images/Physics-not-selected.png';
import chemImgSelected from '../images/Chemistry-selected.png';
import chemImgNotSelected from '../images/Chemistry-not-selected.png';
import engImgSelected from '../images/English-selected.png';
import engImgNotSelected from '../images/English-not-selected.png';
import chinImgSelected from '../images/Chinese-selected.png';
import chinImgNotSelected from '../images/Chinese-not-selected.png';



function SubjectSelecton() {
    const [click, setClick] = useState(false);
    const [statemath, setStatemath] = useState(true);
    const [statephy, setStatephy] = useState(true);
    const [statechem, setStatechem] = useState(true);
    const [statebio, setStatebio] = useState(true);
    const [stateeng, setStateeng] = useState(true);
    const [statechin, setStatechin] = useState(true);

    const MathhandleClick = (e) => {
        setClick(!click);
        setStatemath(!statemath);
        if (statemath === true){
            e.target.setAttribute( 'src', mathImgSelected);
            e.target.setAttribute('alt', 'mathImgSelected');
        }
        else {
            e.target.setAttribute( 'src', mathImgNotSelected);
            e.target.setAttribute('alt', 'mathImgNotSelected');
        }
    }

    const PhyhandleClick = (e) => {
        setClick(!click);
        setStatephy(!statephy);
        if (statephy === true){
            e.target.setAttribute( 'src', phyImgSelected);
            e.target.setAttribute('alt', 'phyImgSelected');
        }
        else {
            e.target.setAttribute( 'src', phyImgNotSelected);
            e.target.setAttribute('alt', 'phyImgNotSelected');
        }
    }

    const ChemhandleClick = (e) => {
        setClick(!click);
        setStatechem(!statechem);
        if (statechem === true){
            e.target.setAttribute( 'src', chemImgSelected);
            e.target.setAttribute('alt', 'chemImgSelected');
        }
        else {
            e.target.setAttribute( 'src', chemImgNotSelected);
            e.target.setAttribute('alt', 'chemImgNotSelected');
        }
    }

    const BiohandleClick = (e) => {
        setClick(!click);
        setStatebio(!statebio);
        if (statebio === true){
            e.target.setAttribute( 'src', bioImgSelected);
            e.target.setAttribute('alt', 'bioImgSelected');
        }
        else {
            e.target.setAttribute( 'src', bioImgNotSelected);
            e.target.setAttribute('alt', 'bioImgNotSelected');
        }
    }

    const EnghandleClick = (e) => {
        setClick(!click);
        setStateeng(!stateeng);
        if (stateeng === true){
            e.target.setAttribute( 'src', engImgSelected);
            e.target.setAttribute('alt', 'engImgSelected');
        }
        else {
            e.target.setAttribute( 'src', engImgNotSelected);
            e.target.setAttribute('alt', 'engImgNotSelected');
        }
    }

    const ChinhandleClick = (e) => {
        setClick(!click);
        setStatechin(!statechin);
        if (statechin === true){
            e.target.setAttribute( 'src', chinImgSelected);
            e.target.setAttribute('alt', 'chinImgSelected');
        }
        else {
            e.target.setAttribute( 'src', chinImgNotSelected);
            e.target.setAttribute('alt', 'chinImgNotSelected');
        }
    }


    return (
        <>
            <button className="img-wrapper math">
                <img src={mathImgNotSelected} alt="mathImgNotSelected" className="img" onClick={MathhandleClick}/>
            </button>
            <h2 className="math-title">Mathematics</h2>
            <button className="img-wrapper phy">
                <img src={phyImgNotSelected} alt="phyImgNotSelected" className="img" onClick={PhyhandleClick}/>
            </button>
            <h2 className="phy-title">Physics</h2>
            <button className="img-wrapper chem">
                <img src={chemImgNotSelected} alt="chemImgNotSelected" className="img" onClick={ChemhandleClick}/>
            </button>
            <h2 className="chem-title">Chemistry</h2>
            <button className="img-wrapper bio">
                <img src={bioImgNotSelected} alt="bioImgNotSelected" className="img" onClick={BiohandleClick}/>
            </button>
            <h2 className="bio-title">Biology</h2>
            <button className="img-wrapper eng">
                <img src={engImgNotSelected} alt="engImgNotSelected" className="img" onClick={EnghandleClick}/>
            </button>
            <h2 className="eng-title">English</h2>
            <button className="img-wrapper chin">
                <img src={chinImgNotSelected} alt="chinImgNotSelected" className="img" onClick={ChinhandleClick}/>
            </button>
            <h2 className="chin-title">Chinese</h2>
        </>
    );

}

export default SubjectSelecton;