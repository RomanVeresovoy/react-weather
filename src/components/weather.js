import React from "react"

const Weather = props => (
        <div className="infoWeath"> 
            {props.city && 
            <div>
            <p>Местоположение: {props.city},{props.country}</p>
            <p>Температура: {props.temp}°С</p>
            <p>Ресурс: {props.resource}</p>
            <p>Последний запрос: {props.date}</p>
            </div>
            }
            <p className="error">{props.error}</p>
        </div>
    );

export default Weather;