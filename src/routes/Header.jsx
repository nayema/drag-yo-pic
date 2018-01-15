import React from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = () => ({
  root: {
    flexGrow: 1,
    marginTop: 15
  },
  font: {
    fontFamily: 'Sedgwick Ave Display'
  }
})

const Header = ({ classes }) => (
  <div className={classes.root}>
    <Typography type="display3" gutterBottom className={classes.font}>
      DRAG YO PIC
    </Typography>
  </div>
)

export default withStyles(styles)(Header)
