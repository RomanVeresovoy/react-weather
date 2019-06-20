import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY1 = "85dd40017593db581d452010f9bb2dab";
const API_KEY2 = "a8523cfc7ddd4112ab4121800191506";

class App extends React.Component {
  state = {
    temp: undefined,
    city: undefined,
    country: undefined,
    resource: undefined,
    date: undefined,
    error: undefined
  }

  componentDidMount() {
    this.checkIP();
  }

  checkIP = async () => {
    let city;
    await fetch(`http://api.ipstack.com/check?access_key=462ab66cac6243ce4e5c8fd20c89e897`)
      .then(response => response.json())
      .then(data => {
        city = data.city;
      })
      .catch(error => console.log(error));
    this.getSelect(city)
  }

  readText = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    this.getSelect(city);
  }

  choiseResource = (city, select) => {
    let flag = 0;
    let flag1 = 0;
    for (var i = 0; i < localStorage.length; i++) {
      let myKey = localStorage.key(i);
      let keyCity = myKey.slice(0, -1)
      let resource = myKey.slice(-1);
      if (keyCity == city) {
        flag = 1;
        if (resource == "O" && select == 1)
          flag1 = 1;
        if (resource == "A" && select == 2)
          flag1 = 2;
      }
    }
    if (flag && flag1) {
      if (flag1 == 1) {
        this.writeObjectOpenWeatherMap(city);
      }
      if (flag1 === 2) {
        this.writeObjectApixu(city);
      }
    }
    else {
      if (select == 1)
        this.getWeatherOpenWeatherMap(city);
      else
        this.getWeatherResourceApixu(city)
    }
  }

  writeObjectOpenWeatherMap = (city) => {
    let obState = JSON.parse(localStorage.getItem(city + "O"))
    let datePastRequest = obState.date;
    let dateNow = Date.parse(new Date());
    let time = this.getDate(datePastRequest);
    if ((dateNow - datePastRequest) > 7200000) {
      this.getWeatherOpenWeatherMap(city);
    }
    else {
      let obState = JSON.parse(localStorage.getItem(city));
    }
    this.setState({
      temp: obState.temp,
      city: obState.city,
      country: obState.country,
      resource: obState.resource,
      date: time,
      error: undefined
    });
  }

  writeObjectApixu = (city) =>{
    let obState = JSON.parse(localStorage.getItem(city + "A"))
    let datePastRequest = obState.date;
    let dateNow = Date.parse(new Date());
    let time = this.getDate(datePastRequest);
    if ((dateNow - datePastRequest) > 7200000) {
      this.getWeatherResourceApixu(city)
    }
    else {
      let obState = JSON.parse(localStorage.getItem(city));
    }
    this.setState({
      temp: obState.temp,
      city: obState.city,
      country: obState.country,
      resource: obState.resource,
      date: time,
      error: undefined
    });
  }

  getDate = (datePastRequest) => {
    let date = new Date();
    date.setTime(datePastRequest);
    let minutes = date.getMinutes();
    if (minutes < 10) { minutes = '0' + minutes }
    let seconds =date.getSeconds();
    if (seconds < 10) { seconds = '0' + seconds }
    let time = date.getHours() + ":" + minutes + ":" + seconds;
    return time;
  }
  ob = {
    temp: undefined,
    city: undefined,
    country: undefined,
    resource: undefined,
    date: undefined,
  }

  getWeatherOpenWeatherMap = async (city) => {
    await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY1}&units=metric`)
      .then(response => response.json())
      .then(data => {
        const dateRequest = Date.parse(new Date())
        let time = this.getDate(dateRequest);
        this.setState({
          temp: data.main.temp,
          city: data.name,
          country: data.sys.country,
          resource: "OpenWeatherMap",
          date: time,
          error: undefined
        });
        this.ob.temp = data.main.temp;
        this.ob.city = data.name;
        this.ob.country = data.sys.country;
        this.ob.resource = "OpenWeatherMap";
        this.ob.date = dateRequest;
        localStorage.setItem(city + "O", JSON.stringify(this.ob))
      })
      .catch(() => {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          resource: undefined,
          error: "Введены неверные данные!",
        });
      });
  }

  getWeatherResourceApixu = async (city) => {
    await fetch(`http://api.apixu.com/v1/current.json?key=${API_KEY2}&q=${city}`)
      .then(response => response.json())
      .then(data => {
        const dateRequest = Date.parse(new Date())
        let time = this.getDate(dateRequest);
        this.setState({
          temp: data.current.temp_c,
          city: data.location.name,
          country: data.location.country,
          resource: "Apixu",
          date: time,
          error: undefined
        });
        this.ob.temp = data.current.temp_c;
        this.ob.city = data.location.name;
        this.ob.country = data.location.country;
        this.ob.resource = "Apixu";
        this.ob.date = dateRequest;
        localStorage.setItem(city + "A", JSON.stringify(this.ob))
      })
      .catch(() => {
        this.setState({
          temp: undefined,
          city: undefined,
          country: undefined,
          resource: undefined,
          error: "Введены неверные данные!",
        });
      });
  }

  getSelect = (city) => {
    let select = document.querySelector("#sel");
    let sel = select.value;
    console.log("selectttttttt", sel);
    if (city) {
      this.choiseResource(city, sel);
    }
    else {
      this.setState({
        temp: undefined,
        city: undefined,
        country: undefined,
        resource: undefined,
        error: "Введите название города!"
      });
    }
  }

  render() {
    const { temp, city, country, resource, date, error } = this.state;
    return (
      <div className="wrapper">
        <div className="container">
          <div className="row">
            <div className="col-sm-5 form">
              <Info />
              <Form weather={this.readText} />
              <Weather
                temp={temp}
                city={city}
                country={country}
                resource={resource}
                date={date}
                error={error}
              />
            </div>
          </div>
        </div>
      </div>
    );

  }
}

export default App;