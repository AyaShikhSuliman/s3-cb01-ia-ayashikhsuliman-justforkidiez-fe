import { useEffect } from "react";
import TokenManager from '../apis/TokenManager'
import { useNavigate } from 'react-router-dom';



const Notification = (props) => {
    const navigate = useNavigate()

    useEffect(() => {
        props.onUsernameInformed();
        console.log(props.messagesReceived)
    }, []);
    const MessageReceived = (props) => {
        return (
            <div>
                <b>From {props.from}</b>: {props.text}
            </div>
        )
    };
    return (
        <>
            {TokenManager.getAccessToken()
                ?
                <div>
                    {props.messagesReceived
                        .filter(message => message.from !== props.username)
                        .map(message => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
                </div>
                : navigate('/log-in')
            }
        </>
    )

};
export default Notification;