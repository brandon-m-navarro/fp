import React, {Component} from 'react';
import AudioAnalyser from './AudioAnalyser';

class App extends Component {


    constructor(props) {
        super(props);
        this.state = {
            audio: null
        };
        this.toggleMicrophone = this.toggleMicrophone.bind(this);
        // this.toggleSong = this.toggleSong.bind(this);
    }

    // Use getUserMedia to request access to mic and set the audio stream if successful
    async getMicrophone() {
        const audio = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        this.setState({audio});
    }

    // Method needed to stop the audio capture as well
    // This loops through each MediaTrack associated with the MediaStream that
    // getUserMedia returns and stops them
    stopMicrophone() {
        this.state.audio.getTracks().forEach(track => track.stop());
        this.setState({ audio: null });
    }

    // Used with the button on the interface
    toggleMicrophone() {
        if (this.state.audio) {
            this.stopMicrophone();
        } else {
            this.getMicrophone();
        }
    }

    // Get song
    // async getSong() {
    //     const audio =
    // }

    render() {
        return (
            <div className="App">
                <div className="controls">
                    <button onClick={this.toggleMicrophone}>
                        {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
                    </button>
                    {/*<button onClick={this.toggleSong}>*/}
                        {/*{this.state.audio ? 'Stop song' : 'Play Song'}*/}
                    {/*</button>*/}
                </div>
                {this.state.audio ? <AudioAnalyser audio={this.state.audio}/> : ''}
            </div>
        );
    }
}

export default App;
