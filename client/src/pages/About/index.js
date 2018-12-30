import React , { Component } from 'react'
import { withRouter } from "react-router-dom"


class About extends Component {
     
    render() {
        console.log(this.props.history)
        return (
            <h1>Its an About page...</h1>
        )
    }
}

export default withRouter(About)