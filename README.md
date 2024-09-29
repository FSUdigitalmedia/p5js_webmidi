# p5js_webmidi

This repo contains some examples of how to communicate via MIDI using p5.js. The examples use the Web MIDI API directly and don't require the WebMIDI javascript library.

1. `midi_input` shows how to handle note and cc messages coming from a hardware or software MIDI controller
2. `midi_output` shows how to send MIDI messages to a synth (eg: [VCV Rack](https://vcvrack.com/))
3. `midi_gui` shows bi-directional communication. It sends MIDI cc messages on MIDI channel 1 while visualizing incoming cc messages that come in on MIDI channel 2. This example uses the [p5.touchgui](https://github.com/L05/p5.touchgui) library to create a GUI for sending messages and works with the included `p5js_example.vcv` patch for VCV Rack. This sketch has less comments than the other two. Reference those others before looking at this one.

## Communicating via MIDI on the Same Computer

To talk MIDI between two pieces of software on the same computer, you'll need to set up a virtual MIDI device using your operating system. On MacOS, I believe you can do this using [Audio MIDI Setup](https://support.apple.com/guide/audio-midi-setup/set-up-midi-devices-ams875bae1e0/mac). In Windows, you'll probably want to download and install [LoopBe1](https://www.nerds.de/en/loopbe1.html)

## See Also

* [MIDI Table](https://fmslogo.sourceforge.io/manual/midi-table.html)


