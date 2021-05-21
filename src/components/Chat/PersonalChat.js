import * as actions from '../../actions/index'
import { connect } from 'react-redux'
//  import { Launcher } from 'react-chat-window'
import ChatBox, { ChatFrame } from 'react-chat-plugin';
import { Launcher } from '../ChatLauncher'
import {
    TextField,
    Button,
    Grid
} from '@material-ui/core'
import { useEffect, useState } from 'react'
import { sendMessage } from 'react-chat-engine'
import axios from 'axios'
import firebase from 'firebase/app'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginRight: 400
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));
const PersonalChat = (props) => {
    const classes = useStyles();

    const [msg, setMsg] = useState('');
    const [anotherEnd, setAnotherEnd] = useState(props.match.params.id);
    const [end, setMyEnd] = useState(null);
    useEffect(() => {
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        setMyEnd(userId)
        //console.log(props.match.params.id)
        axios.get(`https://6h6nlvoxy8.execute-api.ap-south-1.amazonaws.com/Staging01/fetch-chat?user1=${userId}&user2=${anotherEnd}`)
            .then(res => {
                var msgs = res.data;
                var temp = [];
                for (var i = 0; i < msgs.length; i++) {
                    if (msgs[i].senderUserId === userId) {
                        temp.push({
                            author: 'me',
                            type: 'text',
                            data: {
                                text: msgs[i].message
                            }
                        })
                    }
                    else {
                        temp.push(
                            {
                                author: 'them',
                                type: 'text',
                                data: {
                                    text: msgs[i].message
                                }
                            }
                        )
                    }
                }
                for (var i = 0; i < temp.length; i++) {
                    props.insertMessages(temp[i]);
                }

            })
    }, [])
    //console.log(props.messages)
    const sendMsg = (event) => {
        let user = firebase.auth().currentUser;
        let userId = user.uid;
        const text = { "action": "onMessage", "message": event.data.text, "receiverUserId": anotherEnd, "senderUserId": userId }
        // console.log(event)
        props.client.send(JSON.stringify(text));
        props.insertMessages(event)
    }
    return (

        <>
            <Grid container className={classes.root} spacing={2}>

                <Grid style={{}} item xs={12} sm={4}>

                    {/* <ChatFrame
      chatbox={
        <ChatBox
          //onSendMessage={handleOnSendMessage}
          userId={1}
          messages={attr.messages}
          width={'300px'}
          showTypingIndicator={true}
          activeAuthor={{ username: 'user2', id: 2, avatarUrl: null }}
        />
      }
     // icon={<RobotIcon className="Icon" />}
     // clickIcon={handleClickIcon}
      showChatbox={attr.showChatbox}
      showIcon={attr.showIcon}
      iconStyle={{ background: 'red', fill: 'white' }}
    >
      <div className="Greeting" style={{ width: '300px' }}>
        👋 Hey, I’m a ChatBot! Want to see what I can do?
      </div>
    </ChatFrame> */}

                    <Launcher

                        agentProfile={{
                            teamName: 'Matched user',
                            imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
                        }}
                        onMessageWasSent={(event) => sendMsg(event)}
                        messageList={props.messages}
                        showEmoji
                        isOpen={true}
                    />
                </Grid>

            </Grid>
            {/* <Grid container className={classes.root} spacing={2}> */}



            {/* <Grid container className={classes.root} spacing={2}> */}


            {/* </Grid> */}


        </>

    )
}


const mapStateToProps = (state) => {
    return {
        messages: state.messages,
        client: state.client
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        insertMessages: (msg) => dispatch(actions.insertMessages(msg)),
        setClient: (client) => dispatch(actions.setClient(client))
    }
}



// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(PersonalChat);
/**
 * Mild symptoms
1) my profile edit and create loading (P)
2) chat window in position  (P)
3) my library 0 book case (P)
4) login correction (P)
5) library on submit loader then page refresh
6) my profile onEdit loader
7) lat long existing use (G)


Serious symptoms:
1) signup forward to my profile

option symptoms:
1) nav color
2) navigation permanent
 */