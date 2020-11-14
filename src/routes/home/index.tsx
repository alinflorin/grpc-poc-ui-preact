import { h, Component } from "preact";
import * as style from "./style.css";
import { LoginRequest, User } from "../../grpc/auth_pb";
import { AuthClient } from "../../grpc/AuthServiceClientPb";
import { GetWeatherRequest } from '../../grpc/weather_pb';
import { WeatherClient } from '../../grpc/WeatherServiceClientPb';

class Home extends Component {
    state = { user: "", pass: "", loggedInUser: null, error: "", weather: "" };
    authClient = new AuthClient("/services/auth");
    weatherClient = new WeatherClient("/services/weather");

    logout = () => {
        this.setState({ ...this.state, error: "", loggedInUser: null, weather: "" });
    };

    getWeather = () => {
        const getWeatherRequest = new GetWeatherRequest();
        getWeatherRequest.setUsemetric(true);
        getWeatherRequest.setAddress("Something");
        this.weatherClient.getWeather(getWeatherRequest, null).then(r => {
            this.setState({...this.state, weather: JSON.stringify(r.toObject())});
        }).catch(e => {
            this.setState({...this.state, weather: JSON.stringify(e)});
        });
    };

    onSubmit = (e: any) => {
        e.preventDefault();
        const loginRequest = new LoginRequest();
        loginRequest.setUsername(this.state.user);
        loginRequest.setPassword(this.state.pass);
        this.authClient
            .login(loginRequest, null)
            .then(r => {
                if (r.getSuccesful()) {
                    this.setState({
                        ...this.state,
                        loggedInUser: r.getUser(),
                        error: ""
                    });
                    return;
                }
                this.setState({
                    ...this.state,
                    loggedInUser: null,
                    weather: "",
                    error: r.getErrorsList().join(";")
                });
            })
            .catch(e => {
                this.setState({
                    ...this.state,
                    loggedInUser: null,
                    weather: "",
                    error: JSON.stringify(e)
                });
            });
    };

    onUserInput = (e: any) => {
        const { value } = e.target;
        this.setState({ ...this.state, user: value });
    };

    onPassInput = (e: any) => {
        const { value } = e.target;
        this.setState({ ...this.state, pass: value });
    };
    
    render(_, { user, pass, loggedInUser, error, weather }) {
        return (
            <div class={style.home}>
                <h1>gRPC PoC</h1>
                <p style="color: red">{error}</p>
                <p>
                    {loggedInUser == null
                        ? "Not logged in"
                        : "Logged in as " +
                          (loggedInUser as User).getUsername()}
                </p>
                {loggedInUser == null ? (
                    <form onSubmit={this.onSubmit}>
                        <label for="user">User</label>
                        <input
                            name="user"
                            id="user"
                            type="text"
                            class="form-control input input-lg"
                            value={user}
                            onInput={this.onUserInput}
                        />
                        <br />
                        <label for="pass">Pass</label>
                        <input
                            name="pass"
                            id="pass"
                            type="password"
                            class="form-control input input-lg"
                            value={pass}
                            onInput={this.onPassInput}
                        />
                        <br />
                        <button class="btn btn-lg btn-primary btn-success" type="submit">Login</button>
                    </form>
                ) : (
                    <button onClick={this.logout}>Logout</button>
                )}
                <br />
                {loggedInUser != null ? (
                    <button onClick={this.getWeather}>Get Weather</button>
                ) : (
                    <div></div>
                )}
                <br />
                <p>{weather}</p>
            </div>
        );
    }
}

export default Home;
