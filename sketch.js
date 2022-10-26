// Adapted from: https://jsfiddle.net/KeithMcMillenInstruments/zma6pzt9
// doesn't use the WebMIDI library - just the Web MIDI API

let midi, data;
let boxSize = 100;
let boxGray = 100;

function setup() {
  createCanvas(400, 400);
  // setup WebMIDI
  if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
  } else {
    alert("No MIDI support in your browser.");
  }
}

function draw() {
  background(255);
  fill(boxGray);
  rect(width/2,height/2,boxSize,boxSize);
}

// if WebMIDI was successfully setup
function onMIDISuccess(midiAccess) {
    midi = midiAccess; // this is our raw MIDI data, inputs, outputs, and sysex status
    let inputs = midi.inputs.values();
    // loop over all available inputs and listen for any MIDI input
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a MIDI message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
}

// if WebMIDI setup failed
function onMIDIFailure(error) {
    console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + error);
}

// called for each new MIDI message
function onMIDIMessage(message) {
    data = message.data; // this gives us our [command/channel, note, velocity] data
    // data is an array ... 
    // data[0] = command/channel, see https://fmslogo.sourceforge.io/manual/midi-table.html
    // data[1] = note
    // data[2] = velocity
    console.log('MIDI data', data);
    // cc example: change box size based on any control change...
    if (data[0] == 176) boxSize = data[2];
    // note example: change fill color based on note pitch (from a note on message)
    if (data[0] == 144) boxGray = data[1];
}