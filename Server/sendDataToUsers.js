// sends messages to a user 
// the two parameters: First, an object of a connected user. Second, the messages retrieved from database
const sendMessageToUser = (connectedUser, messages) => {
    
    let messageToBeSent = messages.map(element => {
                            // formatting the retrived messages in the way the client code understands. 
                            return {
                                userName: element.user,
                                messageBody: element.message_body
                            };
                        });
    // converts to JSON and sends messages to a user
    connectedUser.send(JSON.stringify(messageToBeSent));
}


module.exports = sendMessageToUser;