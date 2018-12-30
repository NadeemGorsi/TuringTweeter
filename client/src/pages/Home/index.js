import React, {Component} from 'react'
import Timeline from '../../components/Timeline'
import TimelineTabs from '../../components/TimelineTabs'

import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Hidden from '@material-ui/core/Hidden'

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing.unit * 2,
  },
})

class Home extends Component {
  constructor (){
    super()
    this.state = {
      screenNames: ["MakeSchool", "newsycombinator", "ycombinator"],
      settings: {
        tweetCount: 10,
        tweetsModePro: true,
      },
      spacing : 8
    }
  }

  render() {
    const { spacing } = this.state
    const tweetCols = [0, 1, 2].map(value => (
        <Grid key={value} item md={4}>
          <Paper>
            <Timeline count={this.state.settings.tweetCount} tweetsModePro={this.state.settings.tweetsModePro}
            screenName={this.state.screenNames[value]} />
          </Paper>
        </Grid>
      ))
    
    return (
      <div className="Home">
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <Grid container justify="center" spacing={Number(spacing)}>
              <Hidden mdUp>
                  <TimelineTabs tabsContent={[tweetCols[0], tweetCols[1], tweetCols[2]]} screenNames={this.state.screenNames} />
              </Hidden>
              <Hidden smDown>
                  {tweetCols}
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
      </div>
    )
  }
}

Home.propTypes = {
    classes: PropTypes.object
}
  
export default withStyles(styles)(Home)
