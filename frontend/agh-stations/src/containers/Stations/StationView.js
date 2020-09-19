import React, {Component} from "react";
import Measurements from "../Measurements/Measurements";
import axios from "axios";
import {MEASUREMENTS_API, STATIONS_API, USERS_API} from "../../constants";
import ReactJson from "react-json-view";

class StationView extends Component {

    state = {
        station: {},
        measurements: [],
        isStationAdmin: false
    }

    componentDidMount() {
        this.getData();
    }

    getData = () => {
        axios.get(`${STATIONS_API}${this.props.match.params.stationID}/`)
            .then(res => this.setState({station: res.data}))
            .then(() => {
                    if (localStorage.getItem("username")) {
                        axios.get(`${USERS_API}?username=${localStorage.getItem("username")}`)
                            .then((res) => {
                                if (Object.keys(this.state.station).length !== 0) {
                                    const result = this.state.station.user.some((user) => {
                                        return user.url === res.data.url
                                    })
                                    this.setState({
                                        isStationAdmin: result
                                    })
                                }

                            })
                    }
                }
            ).then(() => axios.get(
            `${MEASUREMENTS_API}?id=${this.state.station.id}`
        ))
            .then(res => this.setState({measurements: res.data}))

    };


    render() {
        const jsonData = {
            "time_of_measurement": "2020-09-16 00:39:01",
            "station": 8,
            "measurement_data": [
                {
                    "name": "PM 10",
                    "value": 3,
                    "unit": "µg/m³"
                },
                {
                    "name": "PM 2,5",
                    "value": 2.3,
                    "unit": "µg/m³"
                },
                {
                    "name": "Temperatura",
                    "value": 25,
                    "unit": "°C"
                }
            ]
        }
        return (
            <div>
                <h1>Stacja: {this.state.station.name}</h1>
                {this.state.isStationAdmin ? (
                    <div>
                        <p>
                            Jako admin stacji możesz dodawać dane dla tej stacji.
                            W tym celu wyślij dane w POST requeście na adres backendowego API na adres:<br/>
                            /api/send/<br/>
                            Ciało request'u powinno być następującej postaci:
                        </p>
                        <ReactJson src={jsonData}/>
                        <p>
                            Aby pomyślnie przejść autoryzację, należy w headerze requestu
                            załączyć pole "Authorization" o wartości "Token token_użytkownika"
                            Token można otrzymać po wysłaniu POST requestu na adres API:<br/>
                            /rest-auth/authenticate/<br/>
                            Zawierającego "username" i "password" w polu danych. <br/>
                            Token jest również dostępny po zalogowaniu się
                            do przeglądarki i włączeniu trybu developera(F12) w zakładce
                            Application -> Storage -> Local Storage.
                            Pole token zawiera wartość tokenu danego użytkownika.
                        </p>
                    </div>
                ) : (
                    <p>
                        Zaawansowany widok stacji pozwala na wyświetlanie pomiarów wysyłanych do tej stacji.
                    </p>
                )
                }
                <Measurements
                    station={this.state.station}
                    isStationAdmin={this.state.isStationAdmin}
                    measurements={this.state.measurements}
                />
            </div>

        )
    }
}

export default StationView;