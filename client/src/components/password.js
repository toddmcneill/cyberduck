import React, { useState, useEffect } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export default function Password({ updatePassword }) {
  const [password, setPassword] = useState('')
  const [savedPassword, setSavedPassword] = useState(null)
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    const localStoragePassword = localStorage.getItem('password')
    if (localStoragePassword) {
      setSavedPassword(localStoragePassword)
      updatePassword(localStoragePassword)
    }
  }, [])

  const handleSavePassword = async () => {
    setLoading(true)
    setErrorMessage('')
    const { success } = await (
      await fetch('check-password', {
        method: 'POST',
        headers: new Headers({
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ password: password }),
      })
    ).json()
    if (success) {
      localStorage.setItem('password', password)
      setSavedPassword(password)
      updatePassword(password)
    } else {
      setErrorMessage('Invalid password')
    }
    setLoading(false)
  }

  if (savedPassword) {
    return ''
  }

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        <TextField
          style={{ backgroundColor: 'white' }}
          value={password}
          type="text"
          placeholder="password"
          onInput={e => setPassword(e.target.value)}
        />
      </div>
      <div>
        <Button variant="contained" onClick={handleSavePassword} disabled={loading}>
          Save Password
        </Button>
      </div>
      <div>{errorMessage}</div>
    </div>
  )
}
