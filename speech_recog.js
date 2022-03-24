mainFunc = () => {
    let sr = new webkitSpeechRecognition();
    let i = 0;

    sr.continuous = true;
    sr.interimResults = true;
    sr.lang = 'en-US';

    sr.onstart = () => {
        console.log("Starting...")
    };

    let final_res = ""

    sr.onresult = (event) => {
        if (event.results[i].isFinal) {
            final_res = event.results[i][0].transcript;
            commandRecognizer(final_res)
            i++;
        }
    };
    sr.start()
}

// Action format: ok michael, play the music
commandRecognizer = (result) => {
    let text = result.toLowerCase().split(' ')
    console.log(text)
    let action;
    if (text[1] == "michael" && (text[0] == "okay" || text[0] == "alright" || text[0] == "hello" || text[0] == "hey")) {
        action = getAction(text);
        if (action["event"] != null) {
            sendAction(action);
        }
    } else {
        output = null;
    }
}

getAction = (text) => {
    let action = {"event": null}
    let command = text[2]

    if (command == "play" || command == "start") {
        action["event"] = "music.play"
    } else if (command == "stop" || command == "pause") {
        action["event"] = "music.pause"
    } else if (command == "loop" || command == "repeat") {
        action["event"] = "music.loop" // how to handle unloop?
    } else if (command == "skip" || command == "next") {
        action["event"] = "music.next"
    } else if (command == "restart" || command == "replay") {
        action["event"] = "music.restart"
    } else if (command == "mute") {
        action["event"] = "audio.mute"
    } else if (command == "unmute") {
        action["event"] = "audio.unmute"
    } else if (command == "slowdown") {
        action["event"] = "music.slow";
    } else {
        console.log("No action recognized.");
    }

    console.log(action)
    return action;
}

sendAction = (action) => {
    postMessage(action)
}

// next step: set up web worker
mainFunc()