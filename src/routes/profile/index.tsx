import { FunctionalComponent, h } from "preact";
import { useEffect, useState } from "preact/hooks";
import * as style from "./style.css";
import { AuthClient } from '../../grpc/AuthServiceClientPb';
import { LoginRequest } from '../../grpc/auth_pb';

interface Props {
    user: string;
}

const Profile: FunctionalComponent<Props> = (props: Props) => {
    const { user } = props;
    const [time, setTime] = useState<number>(Date.now());
    const [count, setCount] = useState<number>(0);

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
        const authServiceClient = new AuthClient('./services/auth');
        const loginRequest = new LoginRequest();
        loginRequest.setUsername('admin');
        loginRequest.setPassword('grpc-poc');
        authServiceClient.login(loginRequest, null).then(r => {
            console.log(r);
        }).catch(e => {
            console.error(e);
        });        
    };

    return (
        <div class={style.profile}>
            <h1>Profile: {user}</h1>
            <p>This is the user profile for a user named {user}.</p>

            <div>Current time: {new Date(time).toLocaleString()}</div>

            <p>
                <button onClick={increment}>Click Me</button> Clicked {count}{" "}
                times.
            </p>
        </div>
    );
};

export default Profile;
