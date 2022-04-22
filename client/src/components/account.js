import React, { useEffect } from 'react'
import Store from '../store'

export default function Account() {
  const { role, technologies } = Store.useState(s => s.account)

  const handleUpdate = (prop, value) => {
    Store.update(s => {
      s.account[prop] = value
    })
    localStorage.setItem(prop, value)
  }

  return (
    <div>
      Account
      <input
        type="text"
        placeholder="What is your role?"
        value={role}
        onInput={e => handleUpdate('role', e.target.value)}
      />
      <input
        type="text"
        placeholder="List your technologies"
        value={technologies}
        onChange={e => handleUpdate('technologies', e.target.value)}
      />
    </div>
  )
}
