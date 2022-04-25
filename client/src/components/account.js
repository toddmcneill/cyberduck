import React from 'react'
import Store from '../store'
import { Grid, Link, TextField } from '@mui/material'
import Button from '@mui/material/Button'
import { A } from 'hookrouter'
import styles from './account.module.css'

export default function Account() {
  const { role, technologies, company, languages, teammates, name } = Store.useState(s => s.account)

  const handleUpdate = (prop, value) => {
    Store.update(s => {
      s.account[prop] = value
    })
    localStorage.setItem(prop, value)
  }

  return (
    <div className={styles.account}>
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        className={styles.grid}
      >
        <Grid item className={styles.gridItem}>
          <TextField
            label="What is your name?"
            className={styles.input}
            value={name}
            onInput={e => handleUpdate('name', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <TextField
            label="What is your role?"
            className={styles.input}
            value={role}
            onInput={e => handleUpdate('role', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <TextField
            label="What is your company's name?"
            className={styles.input}
            value={company}
            onInput={e => handleUpdate('company', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <TextField
            label="What languages do you use?"
            className={styles.input}
            value={languages}
            onInput={e => handleUpdate('languages', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <TextField
            label="What technologies do you use?"
            className={styles.input}
            value={technologies}
            onInput={e => handleUpdate('technologies', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <TextField
            label="Who are your teammates?"
            className={styles.input}
            value={teammates}
            onInput={e => handleUpdate('teammates', e.target.value)}
          />
        </Grid>
        <Grid item className={styles.gridItem}>
          <Link href="/" component={A}>
            <Button variant="contained">Done</Button>
          </Link>
        </Grid>
      </Grid>
    </div>
  )
}
