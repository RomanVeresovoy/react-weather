import React from "react"

const Info = props => (
    <div className="info">
        <h4>Погода</h4>
        <h6>Ваш город: {props.city}</h6>
        <p>Узнайте погоду в любом городе!</p>
    </div>
)
export default Info;