import React from "react";

export default function TempHumidity(props){
    const name = props.sensorName;
    const data = props.data;

    return(
        <>
            <p>{name}</p>
            <p>Humidity: {data.Humidity}</p>
            <p>Temperature F: {data.TemperatureF}</p>
            <p>Temperature C: {data.TemperatureC}</p>
        </>
    )
}