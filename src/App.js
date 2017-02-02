import React, { Component } from 'react'
import './App.css'
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import { ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap'
import TroopCard from './TroopCard.js'

class App extends Component {

  constructor() {
    super()
    this.state = {
      markers: [
        {pos: [63.42414, 10.39405], color: "#00f", text: "Tropp 1", hl: false},
        {pos: [63.42816, 10.40186], color: "#00f", text: "Tropp 2", hl: true},
        {pos: [63.42695, 10.39319], color: "#f00", text: "Fiende", hl: false}
      ],
      position: [63.42414, 10.39405],
      zoom : 15
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      //this.setState({position: [pos.coords.latitude, pos.coords.longitude]})
      console.log(this.state.position)
    })

  }

  addNew(event) {
    let markers = this.state.markers
    markers.push({pos: [event.latlng.lat, event.latlng.lng], color: "#0f0", text: "Manually added point", hl: false})
    this.setState(markers: markers)
  }

  rightClick(event) {
    let markers = this.state.markers
    markers.push({pos: [event.latlng.lat, event.latlng.lng], color: "#555", text: "Manually added point", hl: false})
    this.setState(markers: markers)
  }

  reCenter(position) {
    this.setState({position: position})
    let markers = this.state.markers.map(marker => {
      marker.hl = marker.pos == position
      return marker
    })

    this.setState(markers: markers)
  }

  deleteMarker(position) {
        let markers = this.state.markers.filter(marker => {marker.pos != position})
    this.setState(markers: markers)
  }

  adjustZoom(level) {
    this.setState({zoom: level})
  }

  zoomEvent(event) {
    this.setState({zoom: event.target._zoom})
  }

  render() {


    const cards = this.state.markers.map(marker => {
      return (
        <TroopCard key={marker.pos} marker={marker} centerOp={this.reCenter.bind(this, marker.pos)} delOp={this.deleteMarker.bind(this, marker.pos)} />
      )
    })

    const markers = this.state.markers.map(marker => {
      return (
        <CircleMarker radius={marker.hl ? 20 : 10} key={marker.pos} center={marker.pos} color={marker.color} fillColor={marker.color} fillOpacity="0.5">
          <Popup>
            <span>{marker.text}</span>
          </Popup>
        </CircleMarker>
      )
    })

    const map = (
      <Map id="mainmap" center={this.state.position} zoom={this.state.zoom} onClick={this.addNew.bind(this)} onContextMenu={this.rightClick.bind(this)} onZoom={this.zoomEvent.bind(this)}>
        <TileLayer
          url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
      {markers}
      </Map>
);


    return (
      <div className="App">
      {map}
      <div id="infopane">
      <span>Zoom Level: </span>
      <ButtonGroup>
        <Button onClick={this.adjustZoom.bind(this, 10)} disabled={this.state.zoom == 10}>County</Button>
        <Button onClick={this.adjustZoom.bind(this, 12)} disabled={this.state.zoom == 12}>City</Button>
        <Button onClick={this.adjustZoom.bind(this, 15)} disabled={this.state.zoom == 15}>District</Button>
        <Button onClick={this.adjustZoom.bind(this, 16)} disabled={this.state.zoom == 16}>Streets</Button>
        <Button onClick={this.adjustZoom.bind(this, 18)} disabled={this.state.zoom == 18}>Houses</Button>
      </ButtonGroup>
      {cards}
      </div>
      </div>
    );
  }
}

export default App;
