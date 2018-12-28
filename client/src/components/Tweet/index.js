import React, { Component, Fragment } from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'

const styles = {
    card: {
      maxWidth: 345
    },
    media: {
      objectFit: 'cover'
    },
  }

class Tweet extends Component {
    constructor() {
        super()
        this.state = {
            tweetTime: ""
        }
        
    }

    componentDidMount() {
        const theMoment = moment(this.tweet().created_at, 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').fromNow()
       this.setState({tweetTime: theMoment })  
    }
    tweet() {
        return this.props.tweet;
    }

    render(h) {
        const tweet = this.tweet()
        const tweetTime = this.state.tweetTime
        const text = tweet.text
        const user = tweet.user
        let tweetAuthor = ""
        if(text.startsWith("RT @")) {
            tweetAuthor = "Retweeted>>>" + text.substring(
                text.indexOf("RT @") + 2, 
                text.indexOf(":")
            ) + "'s Post"
        } else {
            tweetAuthor = "by @" +  user.screen_name
        }
        
        return(
            <Fragment>
                <Card>
                    <CardActionArea>
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            {tweetAuthor}
                        </Typography>
                        <Typography gutterBottom variant="h6" component="h3">
                            {tweetTime}
                        </Typography>
                        <Typography component="p">
                            {text}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card>
                <Divider light />
            </Fragment>
        )
    }
}

Tweet.propTypes = {
    classes: PropTypes.object
  }
  
export default withStyles(styles)(Tweet)