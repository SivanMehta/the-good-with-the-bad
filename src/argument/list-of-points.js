import React from 'react'
import { ListGroup, ListGroupItem,
         Panel, Label }
from 'react-bootstrap'

export default class PointList extends React.Component {
  constructor(props) {
    super(props)

    this.renderPoints = this.renderPoints.bind(this)
  }

  renderPoints() {
    const renderPoint = (point, i) => (
      <ListGroupItem href = "#" key = { i + point.text.slice(0, 3) }>
        <Label style = {{float: 'right'}}> { point.value } </Label>
        <p>{ point.text }</p>
        <p>- { point.userName }</p>
      </ListGroupItem>
    )

    return this.props.points
           .sort((b, a) => a.value - b.value)
           .map(renderPoint)
  }

  render() {
    return(
      <Panel header = { this.props.title }>
        <ListGroup fill>
          { this.renderPoints() }
        </ListGroup>
      </Panel>
    )
  }
}
