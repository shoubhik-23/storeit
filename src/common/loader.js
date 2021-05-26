import { ClassSharp } from '@material-ui/icons'
import React from 'react'
import classes from "./loader.module.css"

function Loader() {
    return (
        <div  className={classes.ripple} ><div></div><div className={classes.ad}>4</div></div>
    )
}

export default Loader
