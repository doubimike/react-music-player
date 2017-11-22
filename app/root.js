import React from 'react'
import Header from './components/header'
import Player from './page/player'

let Root = React.createClass({
	getInitialState(){
		return {

		}
	},
	componentDidMount(){
		$('#player').jPlayer({
			ready:function () {
				$('#player').jPlayer('setMedia',{
					mp3:"http://oj4t8z2d5.bkt.clouddn.com/%E9%AD%94%E9%AC%BC%E4%B8%AD%E7%9A%84%E5%A4%A9%E4%BD%BF.mp3"
				}).jPlayer('play')
			},
			supplied:'mp3',
			wmode:'window'
		});
	},
	componentWillUnMount(){

	},

	render(){
		return (
			<div>

				<Header />

					<Player></Player>

				</div>
			)

			;
		}
	})

	export default Root
