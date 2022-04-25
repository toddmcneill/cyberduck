import React, { useEffect } from 'react'
import { useState } from 'react'
import Password from './password'
import styles from './main.module.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useMadLib } from '../madlib'
import MicIcon from '@mui/icons-material/Mic'
import MicNoneIcon from '@mui/icons-material/MicNone'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

export default function Main() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [listening, setListening] = useState(false)
  const [readAnswer, setReadAnswer] = useState(false)
  const [password, setPassword] = useState('')

  const completedMadLib = useMadLib(question)

  let SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition
  let recognition = new SpeechRecognition()
  const speechSynthesis = window.webkitSpeechSynthesis || window.speechSynthesis
  let synthesis = null
  if (speechSynthesis) {
    synthesis = new SpeechSynthesisUtterance()
  }

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
        response.json().then(result => {
          setAnswer(result.answer)
          if (speechSynthesis) {
            if (!result.answer) {
              result.answer = 'No Result Found.'
            }
            synthesis.text = result.answer
            if (readAnswer) {
              speechSynthesis.speak(synthesis)
            }
          }
        })
        // Quack
        const audio = new Audio('quack.mp3')
        audio.volume = 0.3
        audio.play()
      } else {
        if (speechSynthesis) {
          synthesis.text = 'No Result Found.'
          if (readAnswer) {
            speechSynthesis.speak(synthesis)
          }
        }
        setLoading(false)
      }
    })
    setLoading(false)
  }

  useEffect(() => {
    if (listening && question.length) {
      if (speechSynthesis) {
        synthesis.text = 'Loading...'
        if (readAnswer) {
          speechSynthesis.speak(synthesis)
        }
      }
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
          <div>
            <FormControlLabel
              label="Read Answer Out Loud"
              control={
                <Checkbox
                  checked={readAnswer}
                  onChange={() => {
                    if (readAnswer) {
                      speechSynthesis.cancel()
                    }
                    setReadAnswer(!readAnswer)
                  }}
                />
              }
            />
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
