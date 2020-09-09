import React from 'react'
import { Card, CardContent, Typography } from "@material-ui/core";
import './InfoBox.css'
//mirar las cartas en materialUI
//IMPORTANTE! => ESTE {...props} nos da la opcion de clickear con onclick la caja colocando {onClick={props.onClick}} en la CARD
function InfoBox({ title, cases, total, active, isRed, ...props }) {
    console.log(title, active);
    return (
      <Card
        onClick={props.onClick}//con el ...props funciona el click
        className={`infoBox ${active && "infoBox--selected"} ${
          isRed && "infoBox--red"
        }`}
      >
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
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
