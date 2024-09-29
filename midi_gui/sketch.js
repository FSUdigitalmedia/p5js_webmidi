// p5js_webmidi is a template repo with three p5.js MIDI examples

// This example shows bi-directional communication:
// 1. checkbox and 2d slider GUI elements send cc messages
// 2. incoming cc messages are visualized using a flashing square

// 2024 github.com/rahji

let outputDevice; // will reference the first available MIDI output device

let boxSize; // size of the flashing square (it is either 0 or 32, as determined by incoming cc's)
let fm, freq, vol; // things that will be sent as cc's based on GUI interaction

// this sketches uses the p5.touchgui library, which must be included in the index.html file
let gui;
let slider2d, checkbox;

// setup() runs once, when the sketch is started
function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);

  // try to setup WebMIDI and do two things:
  // 1. set outputDevice to the first available output device
  // 2. set up a listener function that responds to midi messages from *any* input device
  navigator.requestMIDIAccess()
  .then(function(midiAccess) {

    // 1. Get the first available MIDI output port
    outputDevice = midiAccess.outputs.values().next().value;
    
    // 2. loop over all available input devices and listen for any MIDI input
    let inputs = midiAccess.inputs.values();
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a MIDI message call the onMIDIMessage(message) function
        input.value.onmidimessage = onMIDIMessage;
    }

  })
  .catch(function(error) {
    console.error("Error accessing MIDI devices");
    //console.error(error);
  });

  // set up the GUI elements
  gui = createGui();
  checkbox = createCheckbox("Play", 10, 40, 32, 32);
  checkbox.onChange = onCheckboxChange; // point to a handler function
  slider2d = createSlider2d("Slider2d", 10, 100, 175, 175, 0, 127, 0, 127);
}

// runs once per frame
function draw() {
  background(255);
  drawGui();
  fill("black");
  text(checkbox.label,50,60);

  if (slider2d.isChanged) {
    outputDevice.send([176, 0, slider2d.valX]); // send cc 0 for x axis
    outputDevice.send([176, 4, slider2d.valY]); // send cc 4 for y axis
  }

  fill("darkRed");
  square(155,56,boxSize,8); // it's always drawn but sometimes boxSize is 0
}

// when the checkbox is changed, send either a 0 or 127 value for cc 8
// depending on the state of the checkbox.
function onCheckboxChange() {
  if (checkbox.val) {
    outputDevice.send([176, 8, 127]); // highest value 127 for cc 8
  } else {
    outputDevice.send([176, 8, 0]); // lowest value 0 for cc 8
  }
}

// onMIDIMessage is called for each new incoming MIDI message.
// note that the command number is 177 because 176 + 1 is a cc on channel 2
function onMIDIMessage(message) {
  if (message.data[0] == 177) { // any cc on channel 2
    boxSize = map( message.data[2], 0,127, 0,32);  // set boxSize to cc value
  }
}