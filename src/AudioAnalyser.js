/* Going to pass the audio stream to this component. This
   component is going to be responsible for using WebAudio
   to analyse the audio stream and store the analysis in the state*/

import React, {Component} from 'react';
import AudioVisualiser from './AudioVisualiser'

class AudioAnalyser extends Component {
    // Initialize with an empty Uint8Array and bind the scope of tick to the component
    constructor(props) {
        super(props);
        this.state = { audioData: new Uint8Array(0) };
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        // Setup WebAudio objects
        this.audioContext = new (window.AudioContext ||
            window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        // From the AnalyserNode, we need to get the data for the visualization
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        // Pass the microphone stream for the source of the AudioContext
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);

        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
    }

    /* Will run every time requestAnimationFrame runs. Will copy the current
       waveform as an array of integers, and then update the audioData property
       in the component's state with the dataArray*/
    tick() {
        this.analyser.getByteTimeDomainData(this.dataArray);
        this.setState({ audioData: this.dataArray });
        this.rafId = requestAnimationFrame(this.tick);
    }

    componentWillUnmount() {
        cancelAnimationFrame(this.rafId);
        this.analyser.disconnect();
        this.source.disconnect();
    }

    render() {
        return <AudioVisualiser audioData={this.state.audioData} />;
    }
}

export default AudioAnalyser;