import React, { Component } from 'react'
import Tweet from '../Tweet'
import TweetEmbed from 'react-tweet-embed'

export default class Timeline extends Component {
    constructor (){
        super()
        this.state = {
            tweets: [],
            tweetsModePro: true,
            user: {},
            dp: ""
        }
    }
    componentDidMount() {
        fetch(`/1.1/statuses/user_timeline.json?count=${this.props.count}&screen_name=${this.props.screenName}`)
          .then(res => res.json())
          .then(tweets => this.setState({
              tweets: tweets, 
              user: tweets[0].user,
              dp: tweets[0].user.profile_image_url.replace("_normal", "")
            }, () => console.log('Tweets fetched...', tweets)))
    }
    render(h) {
        const tweetsModePro = this.state.tweetsModePro
        const twits = this.state.tweets.map((tweet, index)=> { 
            return tweetsModePro ? 
                <TweetEmbed key={index} id={tweet.id_str} /> :
                <Tweet key={index} tweet={tweet} />
            })
        const user = this.state.user
        const dp = this.state.dp
        
        return(
            <div>
                <div className="overflow-hidden">
                    <img src={user.profile_banner_url} alt={`banner for ${user.screenName}`} height="200" />
                    <img src={dp} alt={`profile for ${user.screenName}`} width="90" />
                </div>
                {twits}
            </div>
        )
    }
}

