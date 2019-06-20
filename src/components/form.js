import React from "react"

const Form = props => (
    <form onSubmit={props.weather}>
        <div className="con">
            <input type="text" name="city" placeholder="Город" />
        </div>
        <div className="con">
            <button>Получить</button>
        </div>
        <div className="con">
            <select name="resource" id="sel">
                <option value="1">OpenWeatherMap</option>
                <option value="2">Apixu</option>
            </select>
        </div >

    </form >
)
export default Form;    