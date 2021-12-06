class Message {

    constructor() {
        
    }

    parseMessage(json) {
        var output = "```";
        output += "Username: " + json.username;
        output += "\nMessage: " + json.message;
        output += "```";
        return output;
    }
}

module.exports = Message;