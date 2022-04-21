import './App.css'
import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const submitForm = async () => {
    setLoading(true)
    const res = await fetch('/prompt', { method: 'post', body: JSON.stringify({ prompt: question }) })
    if (res.ok) {
      const answer = await await res.json()
      setAnswer(answer)
      setLoading(false)
    }
    setLoading(false)
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>CyberDuck</h1>
        <p>Your AI Powered Rubber Ducky Debugging Platform</p>
      </header>

      {loading ? (
        <p>Loading... </p>
      ) : (
        <div>
          <div>
            <form className="form" onSubmit={submitForm}>
              <label>Describe your dilema: </label>
              <textarea value={question} onChange={e => setQuestion(e.value)}></textarea>
              <button type="submit">Submit</button>
            </form>
          </div>

          {answer ? <div className="answer">{answer}</div> : null}
        </div>
      )}
    </div>
  )
}

export default App
