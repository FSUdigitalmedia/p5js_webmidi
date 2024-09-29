// A template repo with two p5.js MIDI examples
// This example shows how to send MIDI messages to a MIDI synth.
// Both examples could easily be combined.
// 2024 github.com/rahji

let outputDevice; // will reference the first available MIDI output device

function setup() {
  createCanvas(400, 400);
  rectMode(CENTER);

  // try to setup WebMIDI and set outputDevice to the first available device
  navigator.requestMIDIAccess()
  .then(function(midiAccess) {
    // Get the first available MIDI output port
    outputDevice = midiAccess.outputs.values().next().value;
  })
  .catch(function(error) {
    console.error("Error accessing MIDI devices");
    //console.error(error);
  });
}

function draw() {
  background(255);
  
  if (mouseIsPressed) {
    let ccVal = map(mouseX,0,width,0,127,true);
    outputDevice.send([176, 1, ccVal]); // send "modwheel" control change 
  }
}

// if a key is pressed, send a 1 second long note
function keyPressed() {
    // Send a MIDI note on message
    outputDevice.send([144, 60, 127]); // Note on, middle C, velocity 127

    // After a delay, send a MIDI note off message
    setTimeout(function() {
      outputDevice.send([128, 60, 0]); // Note off, middle C
    }, 1000);
}
