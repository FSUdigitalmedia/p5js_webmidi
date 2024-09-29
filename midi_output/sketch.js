// p5js_webmidi is a template repo with three p5.js MIDI examples

// This example shows how to send MIDI messages to a MIDI synth.
// If the mouse is pressed, the current mouseX value is sent as a MIDI cc
// if any key is pressed, a noteOn message is sent, followed by a noteOff 1 sec later

// 2024 github.com/rahji

let outputDevice; // will reference the first available MIDI output device
let modVal; // value of the modwheel control change to send
function setup() {
  createCanvas(128, 128);
  textSize(20);

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
  fill("black");
  rect(0,0,modVal,height); // shows the current modVal
  fill("silver");
  text("RESONANCE",0,height/2)

  if (mouseIsPressed) {
    modVal = map(mouseX,0,width,0,127,true);
    outputDevice.send([176, 1, modVal]); // send "modwheel" control change 
  }
}

// if a key is pressed, send a 1 second long note
function keyPressed() {
    // Send a MIDI note on message
    outputDevice.send([144, 60, 127]); // Note on, middle C, velocity 127

    // After a delay, send a MIDI note off message
    setTimeout(function() {
      outputDevice.send([128, 60, 0]); // Note off, middle C
    }, 1000); // 1000 milliseconds == 1 second
}
