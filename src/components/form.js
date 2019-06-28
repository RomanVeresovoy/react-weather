import React from "react"

class Form extends React.Component {
    state = {
        inputText: "",
        selectText: "1",

    }

    handleInputChange = ({ target: { value } }) => {
        this.setState({
            inputText: value,
        })
    }

    handleSelectChange = ({ target: { value } }) => {
        this.setState({
          selectText: value,
        })
      }

    handleButtonChange = (e) => {
        e.preventDefault();
        const { inputText, selectText } = this.state;
        this.props.w(inputText, selectText);

    }

    validate = () => {
        const { inputText } = this.state;
        if (inputText.trim())
            return true;
        return false;
    }

    render() {
        const { inputText, selectText } = this.state;
        return (
            <form >
                <div className="con">
                    <input type="text" name="city" placeholder="Город" value={inputText} onChange={this.handleInputChange} />
                </div>
                <div className="con">
                <select value={selectText} onChange={this.handleSelectChange}>
                    <option value="1">OpenWeatherMap</option>
                    <option value="2">Apixu</option>
                </select>
                </div>
                <div className="con">
                <button onClick={this.handleButtonChange} disabled={!this.validate()}>Получить</button>
                </div>
            </form>
        );
    }

}
export default Form;
