import React from "react";

export default function TempHumidity(props){
    const name = props.sensorName;
    const data = props.data;

    return(
        <>
            <p><strong>{name}</strong></p>
            <p>Fahrenheit: <strong>{data.TemperatureF ? data.TemperatureF.toFixed(2) : 'None'}&#176;</strong> - Celcius: <strong>{data.TemperatureC ? data.TemperatureC.toFixed(2) : 'None'}&#176;</strong> - Humidity: <strong>{data.Humidity? data.Humidity : 'None'}&#37;</strong></p>
        </>
    )
}