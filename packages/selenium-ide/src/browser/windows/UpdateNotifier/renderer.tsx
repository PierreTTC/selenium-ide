import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import AppWrapper from 'browser/components/AppWrapper'
import renderWhenReady from 'browser/helpers/renderWhenReady'
import React from 'react'

const completeStatus =
  'Update has been installed and will be applied on restart.'

let lastStatus = ''
// @ts-expect-error just whatever
window.setStatus = (status: string) => {
  lastStatus = status
}

const UpdateNotifier = () => {
  const [status, setStatus] = React.useState(lastStatus)
  React.useEffect(() => {
    // @ts-expect-error just whatever
    window.setStatus = setStatus
    setStatus(lastStatus)
  }, [])
  // @ts-expect-error this exists
  const completeUpdateNotifier = () => window.completeUpdateNotifier()
  const closeUpdateNotifier = () => window.close()

  return (
    <AppWrapper>
      <Grid className="centered pt-4" container spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1">{status}</Typography>
        </Grid>
      {status === completeStatus && (
        <>
          <Grid item xs={6}>
            <Button onClick={closeUpdateNotifier} variant="outlined">
              OK
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button onClick={completeUpdateNotifier} variant="contained">
              Restart Now
            </Button>
          </Grid>
        </>
      )}
      {status.startsWith('Error') && (
          <Grid item xs={12}>
            <Button onClick={closeUpdateNotifier} variant="outlined">
              OK
            </Button>
          </Grid>
      )}
      </Grid>
    </AppWrapper>
  )
}

renderWhenReady(UpdateNotifier)
