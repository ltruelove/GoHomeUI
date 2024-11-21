import React from "react";

export default function TempHumidity(props){
    const name = props.sensorName;
    const data = props.data;

    return(
        <>
            <p><strong>{name}</strong></p>
            <p>Fahrenheit: <strong>{data.TemperatureF.toFixed(2)}&#176;</strong> - Celcius: <strong>{data.TemperatureC.toFixed(2)}&#176;</strong> - Humidity: <strong>{data.Humidity}&#37;</strong></p>
        </>
    )
}