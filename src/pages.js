import React from 'react'
import { Route, Link } from 'react-router-dom'
// import { Jumbotron, Col, Row, Image } from 'react-bootstrap'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card';

const Status = ({ code, children }) => (
   <Route render={({ staticContext }) => {
     if (staticContext)
       staticContext.status = code
     return children
   }}/>
)

export const NotFound = () => (
  <Status code={404}>
    <div>
      <h1>¯\_(ツ)_/¯</h1>
      <p>I have <a href = "https://youtu.be/qPefOfu2TIU?t=9">no idea</a> what this is.</p>
    </div>
  </Status>
)

// export const About2 = () => (
//   <Jumbotron>
//     <Row>
//       <Col sm = { 7 }  xs = { 12 }>
//           <h1>Hi, I am Sivan!</h1>
//           <p>
//               I build this site using <a href = 'https://facebook.github.io/react/'>React </a>
//               and <a href = 'https://golang.org/'> Go</a>. You can search above for topics
//               that you would like to discuss, but you have to <Link to = "/login">login</Link> first.
//           </p>
//
//           <p>You can check me out on <a href = "https://github.com/SivanMehta">GitHub</a>, <a href = "https://www.linkedin.com/in/sivan-mehta-059895a0">LinkedIn</a>, or even <a href = "https://www.facebook.com/SivanMehta">Facebook</a></p>
//
//           <p>You can get my resume <a href = "https://sivanmehta.github.io/Sivan-Mehta-Resume.pdf">here</a></p>
//       </Col>
//       <Col sm = { 5 } xs = { 12 }>
//         <Image src="https://sivanmehta.github.io/me.jpg" rounded style = {{ maxWidth: '100%'}} />
//       </Col>
//     </Row>
//   </Jumbotron>
// )

export const About = () => (
  <Card>
    <CardHeader title="Hi, I am Sivan!" avatar="https://sivanmehta.github.io/me.jpg" />
    <CardText>
      I build this site using <a href = 'https://facebook.github.io/react/'>React </a>
      and <a href = 'https://golang.org/'> Go</a>. You can search above for topics
      that you would like to discuss, but you have to <Link to = "/login">login</Link> first.
    </CardText>
  </Card>
)
