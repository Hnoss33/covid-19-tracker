import React from 'react'
import { Card, CardContent, Typography, makeStyles } from "@material-ui/core";
import './InfoBox.css'
//mirar las cartas en materialUI
//IMPORTANTE! => ESTE {...props} nos da la opcion de clickear con onclick la caja colocando {onClick={props.onClick}} en la CARD
const useStyles = makeStyles({
  root: {
    backgroundColor: '#FEF8EE',
  },
  });
  
function InfoBox({ title, cases, total, active, isRed, ...props }) {
  const classes = useStyles();
    return (
      <Card
        className= {`infoBox ${active && "infoBox--selected"} ${classes.root} ${isRed && "infoBox--red"}`}
        onClick={props.onClick}>
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary" gutterBottom>
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"}`}>
            {cases}
          </h2>
  
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    );
  }
  
  export default InfoBox;
