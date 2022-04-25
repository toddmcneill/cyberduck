import React, { useState, useEffect } from 'react'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import Link from '@mui/material/Link'
import duck from '../images/duck.png'
import Title from './title'
import styles from './tutorial.module.css'

export default function Tutorial() {
  const [openModal, setOpenModal] = useState(false)
  useEffect(() => {
    const modalVisited = localStorage.getItem('tutorialVisited') ? true : false
    if (!modalVisited) {
      setOpenModal(true)
    }
  }, [])

  const handleClose = () => {
    setOpenModal(false)
    localStorage.setItem('tutorialVisited', 'true')

    // Quack
    const audio = new Audio('quack.mp3')
    audio.volume = 0.3
    audio.play()
  }

  return (
    <>
      <HelpOutlineIcon color="secondary" onClick={() => setOpenModal(true)} className={styles.openButton} />
      <Modal open={openModal} onClose={handleClose}>
        <Box className={styles.box}>
          <div className={styles.headerText}>
            Welcome to <Title variant="span" /> !
          </div>
          <img src={duck} className={styles.duck} />
          <div className={styles.wikipediaLink}>
            <Link href="https://en.wikipedia.org/wiki/Rubber_duck_debugging" target="_blank">
              Rubber Duck Debugging
            </Link>
          </div>
          <ul className={styles.list}>
            <li>
              Tell cyberduck about yourself by clicking the <ManageAccountsIcon color="secondary" /> icon. This will
              allow it to give more tailored answers.
            </li>
            <li>Spill your woes to cyberduck, let it know what you're struggling with, or just ask it a question.</li>
            <li>Cyberduck will quack out wise (or not-so-wise) advice.</li>
          </ul>
          <div className={styles.button}>
            <Button variant="contained" onClick={handleClose}>
              Begin
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  )
}
