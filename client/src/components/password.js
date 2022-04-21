import React, { useState, useEffect } from 'react'

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
    const { success } = await (
      await fetch('http://localhost:3000/check-password', {
        method: 'POST',
        headers: new Headers({
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ "password": password }),
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
      <input value={password} type='text' placeholder='password' onInput={e => setPassword(e.target.value)} />
      <button type='button' onClick={handleSavePassword} disabled={loading}>Save Password</button>
      {errorMessage}
    </div>
  )
}
