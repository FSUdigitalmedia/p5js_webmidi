// A template repo with two p5.js MIDI examples
// This example shows how to get MIDI messages from MIDI controllers
// Both examples could easily be combined
// 2024 github.com/rahji

// Adapted from: https://jsfiddle.net/KeithMcMillenInstruments/zma6pzt9

let boxSize = 100;
let boxGray = 125;

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);

  // try to setup WebMIDI and call 
  // onMIDISuccess() if successful
  // or onMidiFailure() if unsuccessful
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
  } else {
    // this is if the browser doesn't have any clue about WebMIDI
    alert("No MIDI support in your browser.");
  }
}

function draw() {
  background(255);
  fill(boxGray);
  square(width/2,height/2,boxSize);
}

// onMIDISuccess is called if WebMIDI was able to be accessed
// It sets onMIDIMessage as the function to handle incoming messages
function onMIDISuccess(midiAccess) {
    let midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    let inputs = midi.inputs.values();
    // loop over all available input devices and listen for any MIDI input
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a MIDI message call the onMIDIMessage(message) function
        input.value.onmidimessage = onMIDIMessage;
        console.log("Found: " + input.value.name);
    }
}

// onMidiFailure is called if WebMIDI setup failed
function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

// onMIDIMessage is called for each new incoming MIDI message
function onMIDIMessage(message) {
    let data = message.data; // data now contains the message data (eg: command, channel, note, velocity, etc)
    // data is an array (see https://fmslogo.sourceforge.io/manual/midi-table.html)
    
    // ex 1: for a "note on" message... 
    //  data[0] = 144 (aka the "Note On" command)
    //  data[1] = the 0-127 pitch value
    //  data[2] = the 0-127 velocity value

    // change the fill color of the box based on the note pitch from a "note on" message
    if (data[0] == 144) boxGray = data[1];

    // ex 2: for a "control change" ("cc") message...
    //  data[0] = 176 (aka the "Control Change" message)
    //  data[1] = 0-127 for the specific cc we received (eg: 7 for volume, 4 for foot controller)
    //  data[2] = 0-127 for the cc value
    
    // change box size based on a specific control change
    if (data[0] == 176 && data[1] == 32) {
      boxSize = data[2];
    }

    // or change box size based on *any* control change...
    // if (data[0] == 176) boxSize = data[2];
}