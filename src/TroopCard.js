import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer, CircleMarker } from 'react-leaflet'
import { ButtonGroup, ButtonToolbar, Button } from 'react-bootstrap'

class TroopCard extends Component {

  constructor() {
    super()
    this.state = {
      pos: [0,0],
      color: "#fff",
      text: "Unknown"
    }
  }

  componentWillMount() {
    this.setState({
      pos: this.props.marker.pos,
      color: this.props.marker.color,
      text: this.props.marker.text
    })
  }

  render() {
    return (
      <div className="card">
        <div className="stripe" style={{backgroundColor:this.state.color}}></div>
        <p>
        <b>{this.state.text}</b> at position: {this.state.pos[0]}, {this.state.pos[1]}
        </p>
        <div className="cardbuttons">
          <ButtonGroup>
          <Button onClick={this.props.centerOp} bsStyle="primary"><i className="fa fa-map-marker" aria-hidden="true"></i></Button>
          <Button bsStyle="warning">Edit</Button>
          <Button onClick={this.props.delOp} bsStyle="danger">Delete</Button>
          </ButtonGroup>
        </div>
      </div>
    );
  }
}

export default TroopCard;
