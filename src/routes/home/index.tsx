import { h, Component } from "preact";
import * as style from "./style.css";
import { LoginRequest, SubscribeToNotificationsRequest, User , Notification} from "../../grpc/auth_pb";
import { AuthClient } from "../../grpc/AuthServiceClientPb";
import { GetWeatherRequest } from '../../grpc/weather_pb';
import { WeatherClient } from '../../grpc/WeatherServiceClientPb';
import { ClientReadableStream } from "grpc-web";

class Home extends Component {
    state = { user: "", pass: "", loggedInUser: null, error: "", weather: "", notif: null };
    authClient = new AuthClient("/services/auth");
    weatherClient = new WeatherClient("/services/weather");
    streamSubscription: any = null;

    logout = () => {
        this.setState({ ...this.state, error: "", loggedInUser: null, weather: "", notif: null });
        if (this.streamSubscription != null) {
            this.streamSubscription.cancel();
        }
    };

    getWeather = () => {
        const getWeatherRequest = new GetWeatherRequest();
        getWeatherRequest.setUsemetric(true);
        getWeatherRequest.setAddress("Something");
        this.weatherClient.getWeather(getWeatherRequest, null).then(r => {
            this.setState({ ...this.state, weather: `Current Temperature: ${r.getCurrenttemp()}; Wind Speed: ${r.getCurrentwindspeed()}` });
        }).catch(e => {
            this.setState({ ...this.state, weather: JSON.stringify(e) });
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

                    const nReq = new SubscribeToNotificationsRequest();
                    this.streamSubscription = this.authClient.subscribeToNotifications(nReq).on('data', n => {
                        this.setState({ ...this.state, notif: 'New notification: ' + n.getTitle() + ' - ' + n.getMessage() });
                        setTimeout(() => {
                            this.setState({ ...this.state, notif: null });
                        }, 2500);
                    }).on('error', err => {
                        console.error(err);
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

    render(_, { user, pass, loggedInUser, error, weather, notif }) {
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
                        <button class="btn btn-sm btn-danger" onClick={this.logout}>Logout</button>
                    )}
                <br /> <br />
                {loggedInUser != null ? (
                    <button class="btn btn-lg btn-success" onClick={this.getWeather}>Get Weather</button>
                ) : null}
                <br /><br />
                {loggedInUser != null && notif ? <div class={style.notif}>{notif}asd</div> : null}
                <br /><br />
                {weather ? <p class={style.notifInfo}>{weather}</p> : null}
            </div>
        );
    }
}

export default Home;
