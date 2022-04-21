import './App.css'
import { useState } from 'react'
import Password from './components/password'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState('')

  const submitForm = async () => {
    setLoading(true)
    await fetch('http://localhost:3000/prompt', {
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }),
      body: JSON.stringify({ prompt: question, password }),
    }).then(response => {
      if(response.ok) {
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
    return <Password updatePassword={(newPassword) => {
      setPassword(newPassword)
    }}/>
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
            <label>Describe your dilema* </label>
            <textarea required value={question} onChange={e => setQuestion(e.target.value)}></textarea>
            <button type="submit" disabled={!question}>Submit</button>
          </form>
        </div>

        {answer && <pre className="answer">{answer}</pre>}
      </div>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CyberDuck</h1>
        <p>Your AI Powered Rubber Ducky Debugging Platform</p>
      </header>

      {renderPassword()}
      {renderForm()}
    </div>
  )
}

export default App
