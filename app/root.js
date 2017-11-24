import React from 'react'
import Header from './components/header'
import Player from './page/player'
import MusicList from './page/musiclist'
import MUSIC_LIST from './config/musiclist'
import Default from './config/test'
import {Router,IndexRoute,Link,Route,hashHistory} from 'react-router'
import Pubsub from 'pubsub-js'
let App = React.createClass({
	getInitialState(){
		return {
			musiclist:MUSIC_LIST,
			currentMusicItem:MUSIC_LIST[0]
		}
	},
	playMusic(musicItem){
		$('#player').jPlayer('setMedia',{
			mp3:musicItem.file
		}).jPlayer('play');
		this.setState({
			currentMusicItem:musicItem
		})
	},
	playNext(type='next'){
		let index = this.findMusicIndex(this.state.currentMusicItem);
		let newIndex = null
		let musicListLength = this.state.musiclist.length;
		if(type ==='next'){
			newIndex = (index +1) % musicListLength;
		}else {
			newIndex = (index - 1 + musicListLength) % musicListLength;
		}
		this.playMusic(this.state.musiclist[newIndex])
	},
	findMusicIndex(musicItem){
		return this.state.musiclist.indexOf(musicItem);
	},
	componentDidMount(){
		$('#player').jPlayer({

			supplied:'mp3',
			wmode:'window'
		});
		$('#player').bind($.jPlayer.event.ended,(e)=>{
			this.playNext();
		})

		this.playMusic(this.state.currentMusicItem)

		Pubsub.subscribe('DELETE_MUSIC',(msg,musicItem)=>{
			this.setState({
				musiclist:this.state.musiclist.filter(item=>{
					return item !== musicItem;
				})
			})
		})
		Pubsub.subscribe('PLAY_MUSIC',(msg,musicItem)=>{
			this.playMusic(musicItem)
		})
		Pubsub.subscribe('PLAY_PREV',(msg,musicItem)=>{
			this.playNext('prev')
		})
		Pubsub.subscribe('PLAY_NEXT',(msg,musicItem)=>{
			this.playNext('next')
		})
	},
	componentWillUnMount(){
		Pubsub.unsubscribe('PLAY_MUSIC')
		Pubsub.unsubscribe('DELETE_MUSIC')
		Pubsub.unsubscribe('PLAY_PREV')
		Pubsub.unsubscribe('PLAY_NEXT')
		$('#player').unbind($.jPlayer.event.ended)
	},

	render(){
		return (
			<div>


				<Header />

				<div id="player">
				</div>
				{React.cloneElement(this.props.children,this.state)}



			</div>
		)

		;
	}
})
console.log('default',Default)
console.log('MUSIC_LIST',MUSIC_LIST)
let Root = React.createClass({
	render(){
		return (
			<Router history={hashHistory}>

				<Route path="/" component={App}>

					<IndexRoute component={Player}>
					</IndexRoute>

					<Route path="/list" component={MusicList}>
					</Route>

				</Route>

			</Router>
		)
	}
})

export default Root
