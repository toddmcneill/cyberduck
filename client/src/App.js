import './App.css'
import duck from './images/duck.png'
import { useRoutes, A } from 'hookrouter'
import Main from './components/main'
import Account from './components/account'

import styles from './app.module.css'

const routes = {
  '/': () => <Main />,
  '/account': () => <Account />
}

export default function App() {
  const routeResult = useRoutes(routes)
  return (
    <div className="App">
      <header className="App-header">
        <h1 className={styles.header}>
          <img src={duck} className={`${styles.logo} ${styles.reverse}`} />
          <span className={styles.headerText}>C̷̄͋Ÿ̴̈́B̴̅̅Ë̸́͌Ŕ̷͂D̵̖̿Ù̸̆C̵̛̍Ḱ̷̐</span>
          <img src={duck} className={styles.logo} />
        </h1>
        <p>Your AI-Powered Rubber Duck Debugging Platform</p>
        <p className={styles.poweredBySubHeader}>Powered by <a href="https://openai.com/">OpenAI</a>'s <a href="https://en.wikipedia.org/wiki/GPT-3">GPT-3 AI</a></p>
        <A href='/'>Main</A>
        <A href='/account'>Account</A>
      </header>
      {routeResult}
    </div>
  )
}
