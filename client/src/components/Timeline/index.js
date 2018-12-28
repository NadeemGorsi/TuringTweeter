import React, { Component, Fragment } from 'react'
import Tweet from '../Tweet'
import TweetEmbed from 'react-tweet-embed'
import placeholder from '../../images/placeholder.gif'
import placeholder2 from '../../images/placeholder2.gif'

export default class Timeline extends Component {
    constructor (){
        super()
        this.state = {
            tweets: [],
            tweetsModePro: false,
            user: {},
            dp: "",
            isLoading: true
        }
    }
    
    

    componentDidMount() {
        fetch(`/1.1/statuses/user_timeline.json?count=${this.props.count}&screen_name=${this.props.screenName}`)
          .then(res => res.json())
          .then(tweets => this.setState({
              tweets: tweets, 
              user: tweets[0].user,
              tweetsModePro: this.props.tweetsModePro,
              profileBanner: tweets[0].user.profile_banner_url,
              dp: tweets[0].user.profile_image_url.replace("_normal", ""),
              isLoading: false
            }, () => console.log('Tweets fetched...', tweets)))
    }

    handleImageErrored() {
        this.setState((prev)=> {
            return {
                profileBanner: placeholder,
                dp: placeholder
            }
        })
    }


    render(h) {
        const tweetsModePro = this.props.tweetsModePro
        const twits = this.state.tweets.map((tweet, index)=> { 
            return tweetsModePro ? 
                <TweetEmbed key={index} id={tweet.id_str} /> :
                <Tweet key={index} tweet={tweet} />
            })
        const { user } = this.state
        const { dp } = this.state
        const { profileBanner } = this.state
        const { isLoading } = this.state
        const loader = <img src={placeholder2} 
        height="100%" width="100%" />

        return(
            <Fragment>
            <div className="overflow-hidden">
                <img src={profileBanner} 
                onError={this.handleImageErrored.bind(this)}
                alt={`banner for ${user.screenName}`} height="200" width="100%" />
                <img src={dp} 
                onError={this.handleImageErrored.bind(this)}
                alt={`profile for ${user.screenName}`} width="90" />
            </div>
                { isLoading ? loader : twits }
            </Fragment>
        )
    }
}

