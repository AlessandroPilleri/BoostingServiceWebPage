class Message {

    constructor() {
        
    }

    parseMessage(json) {
        var output = "```";
        output += "Username: " + json.username;
        output += "Message: " + json.message;
        output += "```";
        return output;
    }
}

module.exports = Message;