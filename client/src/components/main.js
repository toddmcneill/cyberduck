import React from 'react'
import { useState } from 'react'
import Password from './password'
import styles from './main.module.css'
import ReactDOM from 'react-dom'
import Button from '@mui/material/Button'
import { useMadLib } from '../madlib'

export default function Main() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const completedMadLib = useMadLib(question)

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
    if (loading) {
      return <p>Loading... </p>
    }
    return (
      <div>
        <div>
          <form className="form" onSubmit={submitForm}>
            <label>Describe your dilemma* </label>
            <textarea
              required
              value={question}
              onChange={e => setQuestion(e.target.value)}
              className={styles.textarea}
            ></textarea>
            <Button variant="contained" type="submit" disabled={!question}>
              Submit
            </Button>
          </form>
        </div>

        {answer && <pre className="answer">{answer}</pre>}
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
