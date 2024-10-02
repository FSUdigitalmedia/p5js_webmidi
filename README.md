# 🎛️🎹👨🏽‍💻📲🔊 p5js_webmidi

This repo contains some examples of how to communicate via MIDI using p5.js. The examples use the Web MIDI API directly and don't require the WebMIDI javascript library.

1. `midi_input` shows how to handle note and cc messages coming from a hardware or software MIDI controller
2. `midi_output` shows how to send MIDI messages to a synth (eg: [VCV Rack](https://vcvrack.com/))
3. `midi_gui` shows bi-directional communication. It sends MIDI cc messages on MIDI channel 1 while visualizing incoming cc messages that come in on MIDI channel 2. This example uses the [p5.touchgui](https://github.com/L05/p5.touchgui) library to create a GUI for sending messages and works with the included `p5js_example.vcv` patch for VCV Rack.

## Communicating via MIDI on the Same Computer

To talk MIDI between two pieces of software on the same computer, you'll need to set up a virtual MIDI device using your operating system. On MacOS, I believe you can do this using [these instructions](https://help.ableton.com/hc/en-us/articles/209774225-Setting-up-a-virtual-MIDI-bus#Mac). In Windows, you'll probably want to download and install [LoopBe1](https://www.nerds.de/en/loopbe1.html)

## See Also

* [MIDI Messages Structure](https://fmslogo.sourceforge.io/manual/midi-table.html)


