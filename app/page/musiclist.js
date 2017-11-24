import React from 'react'
import MusicListItem from './musiclistitem'

let MusicList = React.createClass({
  render(){
    let listEle = null;
    listEle =this.props.musiclist.map((item)=>{
      return (<MusicListItem focus={item == this.props.currentMusicItem} key={item.id} musicItem={item}>{item.title}</MusicListItem>)
    });
    return (
      <ul>{listEle}</ul>
    )
  }
})

export default MusicList;
