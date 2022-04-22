import React, { useEffect } from 'react'
import { useState } from 'react'
import Password from './password'
import styles from './main.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useMadLib } from '../madlib'
import MicIcon from '@mui/icons-material/Mic'
import MicNoneIcon from '@mui/icons-material/MicNone'

export default function Main() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [password, setPassword] = useState('')

  const completedMadLib = useMadLib(question)

  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  let recognition = new SpeechRecognition()
  recognition.lang = 'en-US'
  recognition.continuous = false
  recognition.interimResults = false
  recognition.maxAlternatives = 1

  const submitForm = async () => {
    setLoading(true)
    await fetch('prompt', {
      method: 'POST',
      headers: new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ prompt: completedMadLib, password }),
    }).then(response => {
      if (response.ok) {
        response.json().then(result => setAnswer(result.answer))
      } else {
        setLoading(false)
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    if (listening && question.length) {
      setListening(false)
      submitForm()
    }
  }, [question, listening])

  const renderSpeech = () => {
    setQuestion('')
    setListening(true)
    recognition.start()
    recognition.onresult = event => {
      let word = event.results[0][0].transcript
      setQuestion(word)
    }
  }

  const renderPassword = () => {
    if (password) {
      return null
    }
    return (
      <Password
        updatePassword={newPassword => {
          setPassword(newPassword)
        }}
      />
    )
  }

  const renderForm = () => {
    if (!password) {
      return null
    }
    return (
      <div className={styles.main}>
        <div className={styles.rectangle}>
          <div>
            <TextField
              multiline
              rows={5}
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className={styles.textarea}
              label="Describe your dilemma"
            ></TextField>
          </div>
          <div
            className="voice-input"
            onClick={() => {
              renderSpeech()
            }}
          >
            {listening ? <MicIcon color="secondary" /> : <MicNoneIcon />}
          </div>
          <div>
            <Button variant="contained" disabled={!question} onClick={submitForm}>
              Help Me!
            </Button>
          </div>
          {loading ? <p>Loading... </p> : answer && <div className={styles.answer}>{answer}</div>}
        </div>
      </div>
    )
  }

  return (
    <div>
      {renderPassword()}
      {renderForm()}
    </div>
  )
}
