import React from 'react'
import Progress from '../components/progress'

let duration = null;
let Player = React.createClass({
  getInitialState(){
		return {
			progress:'-'
		}
	},
  componentDidMount(){
		$('#player').bind($.jPlayer.event.timeupdate,(e)=>{
			duration = e.jPlayer.status.duration;
			this.setState({
				progress:e.jPlayer.status.currentPercentAbsolute
			})
		})
	},
  componentWillUnMount(){
		$('#player').unbind($.jPlayer.event.timeupdate)
	},
	progressChangeHandler(progress){
		console.log('from root widget',progress)
		$('#player').jPlayer('play',duration*progress)
		console.log('from root widget',progress)
	},
	render(){
		return (
			<div>

					<div id="player">
					</div>

					<Progress
						progress={this.state.progress}
						barColor="#ff0000"
						onProgressChange={this.progressChangeHandler} >
					</Progress>

				</div>
			)

			;
		}
})

export default Player
