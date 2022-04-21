import './App.css'
import { useState } from 'react'

function App() {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  const submitForm = async () => {
    setLoading(true)
    const answer = await (
      await fetch('http://localhost:5000/prompt', {
        method: 'post',
        mode: 'no-cors',
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "prompt": question }),
      })
    ).json()
    setAnswer(answer)
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
              <label>Describe your dilema* </label>
              <textarea required value={question} onChange={e => setQuestion(e.target.value)}></textarea>
              <button type="submit" disabled={!question}>Submit</button>
            </form>
          </div>

          {answer ? <div className="answer">{answer}</div> : null}
        </div>
      )}
    </div>
  )
}

export default App
