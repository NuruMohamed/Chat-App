let el=document.getElementsByClassName('recievedMessageContent')[0];  // for testing purpose
let sendMessageButton = document.getElementById('sendMessageIcon');
let sendMessageInput = document.getElementById('sendMessageInput'); 
let messagesContainer = document.getElementById('messagesContainer'); 
const sendMessageForm = document.getElementById('sendMessage');

const connection = new WebSocket('ws://localhost:5000');
const currentUserName = prompt('Your name?');

// for testing purpose
// window.addEventListener('resize', () => {
//     el.innerHTML = `Screen H: ${screen.height} </br> Brow H: ${window.innerHeight} W: ${window.innerWidth} `;
// })


sendMessageForm.addEventListener('submit', e => {
    // prevent page refresh 
    e.preventDefault();
    // don't submit an empty space ??? the problem here is the regex must match the whole string 
    if(!(/\s+/).test(sendMessageInput.value)) {
        sendMessage();
        sendMessageInput.value ='';
    }
});

// fired when a websocket connection is established 
connection.onopen = () => {
    // when a message comes from the server
    connection.onmessage = messages => {
        parseIncomingMessage(messages);
    }
}
// fired if there is a problem when establishing a websocket connection 
connection.onerror = e => {
    console.log(e);
}
// connection.close()

// this function sends a message to the server
const sendMessage = () => {
    
    let messageToBeSent = [
        {
            userName: currentUserName,
            messageBody: sendMessageInput.value.trim()
        }
    ];
    displayMessages(messageToBeSent, 'sent')
    connection.send(JSON.stringify(messageToBeSent));
}

// displays messsages on the browser  
const displayMessages = (message, messageType) => {
    // if a message is sent by the current user
    if(messageType == 'sent') {
        // create new node for the new message
        let sendMessageContainer = document.createElement('div');
        let sendMessageContent = document.createElement('div');
        
        sendMessageContainer.setAttribute('class', 'messages sent');
        sendMessageContent.setAttribute('class', 'sentMessageContent');

        sendMessageContent.innerHTML =  message.messageBody;
        sendMessageContainer.appendChild(sendMessageContent);
        
        messagesContainer.appendChild(sendMessageContainer);

    } else if(messageType == 'recieved') { //if a message is not sent by the current user 
        // creating a new node elements to display recieved messages 
        const recievedContainer = document.createElement('div');
        const recievedUserImage = document.createElement('img');
        const recievedMessage = document.createElement('div');
        const recievedMessageUsername = document.createElement('div');
        const recievedMessageContent = document.createElement('div');

        // setting attributes to the newly created elements by a local function, setAttribute()
        setAttributes(recievedContainer, {class: 'messages recieved'});
        setAttributes(recievedUserImage, {class: 'recievedUserImage', src: 'user.svg'});
        setAttributes(recievedMessage, {class: 'recievedMessage'});
        setAttributes(recievedMessageUsername, {class: 'recievedMessageUsername'});
        setAttributes(recievedMessageContent, {class: 'recievedMessageContent'});

        // appending the newly created elements each other and to the DOM.
        messagesContainer.appendChild(recievedContainer);
        recievedContainer.appendChild(recievedUserImage);
        recievedContainer.appendChild(recievedMessage);
        recievedMessage.appendChild(recievedMessageUsername);
        recievedMessageUsername.innerHTML = message.userName;
        recievedMessage.appendChild(recievedMessageContent);
        recievedMessageContent.innerHTML = message.messageBody;
    }
    
}

const parseIncomingMessage = messages => {
    let parsedMessages = JSON.parse(messages.data)
    console.log(parsedMessages);
    parsedMessages.forEach(eachMessage => {

        if(eachMessage.userName == currentUserName) { // if the message was sent by the current user
            displayMessages(eachMessage, 'sent');
        } else {                                      // if the message was recieved by the current user or not sent by the current user
            displayMessages(eachMessage, 'recieved');
        }
        
    });
}

// set attributes to a newly created DOM nodes
const setAttributes = (node, attributes) => {
    for (key in attributes) {
        node.setAttribute(key, attributes[key])
    }
}
