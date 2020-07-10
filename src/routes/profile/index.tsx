import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { AuthClient } from '../../grpc/AuthServiceClientPb';
import { LoginRequest } from '../../grpc/auth_pb';
import { WeatherClient } from '../../grpc/WeatherServiceClientPb';
import { GetWeatherRequest } from '../../grpc/weather_pb';

interface Props {
    user: string;
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(0);
    const [info, setInfo] = useState<string>('');
    const [infoWeather, setInfoWeather] = useState<string>('');
    // gets called when this route is navigated to
    useEffect(() => {
        const timer = window.setInterval(() => setTime(Date.now()), 1000);

        // gets called just before navigating away from the route
        return () => {
            clearInterval(timer);
        };
    }, []);

    // update the current time
    const increment = () => {
        setCount(count + 1);
        const authServiceClient = new AuthClient('/services/auth');
        const loginRequest = new LoginRequest();
        loginRequest.setUsername('admin');
        loginRequest.setPassword('grpc-poc');
        authServiceClient.login(loginRequest, null).then(r => {
            console.log(r);
            setInfo(s => s + '<br />' + JSON.stringify(r.toObject()));
        }).catch(e => {
            console.error(e);
        });      
        
        const weatherServiceClient = new WeatherClient('/services/weather');
        const wRequest = new GetWeatherRequest();
        wRequest.setAddress('Pitesti');
        wRequest.setUsemetric(true);
        weatherServiceClient.getWeather(wRequest, null).then(r => {
            console.log(r);
            setInfoWeather(s => s + '<br />' + JSON.stringify(r.toObject()));
        }).catch(e => {
            console.error(e);
        });    
    };

    return (
        <div class={style.profile}>
            <h1>Profile: {user}</h1>
            <p>This is the user profile for a user named {user}.</p>

            <div>Current time: {new Date(time).toLocaleString()}</div>
            <div>{info}</div>
            <div>{infoWeather}</div>
            <p>
                <button onClick={increment}>Click Me</button> Clicked {count}{" "}
                times.
            </p>
        </div>
    );
};

export default Profile;
