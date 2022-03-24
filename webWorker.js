// Who will spawn the web worker?
var speech_recog_worker = new Worker("speech_recog.js")

speech_recog_worker.onmessage = (e) => {
    action = e.data
}