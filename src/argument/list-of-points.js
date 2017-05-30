import React from 'react'
import { ListGroup, ListGroupItem,
         Panel, Badge } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class PointList extends React.Component {
  constructor(props) {
    super(props)

    this.renderPoints = this.renderPoints.bind(this)
  }

  renderPoints() {
    const style = {
      width: "100%",
      "white-space": "nowrap",
      overflow: "hidden",
      "text-overflow": "ellipsis"
    }
    const renderPoint = (point, i) => (
      <ListGroupItem href = "#" key = { i + point.text.slice(0, 3) }>
        <p style = { style }>{ point.text }</p>
        <Link to = { "/argument/" + this.props.arg + "/" + point.text } >
          <Badge pullRight> { point.value } </Badge>
        </Link>
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
