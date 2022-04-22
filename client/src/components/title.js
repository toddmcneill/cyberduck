import React from 'react'
import Typography from '@mui/material/Typography'
import styles from './title.module.css'

export default function Title({ variant = 'h2', component = 'span' }) {
  return (
    <Typography variant={variant} component={component} className={styles.title}>
      Ć̵̨̬̱͚̤̘̾̿̔̐̓Y̵̢̙̤̱̼̦̲͒̂̆̾̈́̚͜B̶͙̪̂̿̔̀E̸̟͗̏R̸͎̞̳̃̂̔̏͐̈́D̵͖̝̻͍͗U̸̧̬̯͋̐̽̈́͗̾C̸̨̛̝̮͈̮̯̮̦̓̑͋͂K̶̨͈͓̉̎̈́͘
    </Typography>
  )
}
