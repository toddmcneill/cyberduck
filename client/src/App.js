import './App.css'
import duck from './images/duck.png'
import { useRoutes, A } from 'hookrouter'
import Main from './components/main'
import Account from './components/account'
import Tutorial from './components/tutorial'
import useLocalStorage from './useLocalStorage'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { ThemeProvider } from '@mui/material/styles'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { theme } from './theme'
import Title from './components/title'
import styles from './app.module.css'

const routes = {
  '/': () => <Main />,
  '/account': () => <Account />,
}

export default function App() {
  useLocalStorage()

  const routeResult = useRoutes(routes)
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <div className="app-background">
          <div id="top">
            <div id="duck">
              <div className="duck-body"></div>
            </div>
            <div id="sky"></div>
          </div>
          <div id="bottom">
            <div id="ground"></div>
          </div>
        </div>
        <header className="App-header">
          <div className={styles.top}>
            <div className={styles.sideSection} />
            <h1 className={styles.header}>
              <Link href="/" component={A} underline="none" color="#FFF">
                <img src={duck} className={`${styles.logo} ${styles.reverse}`} />
                <Title />
                <img src={duck} className={styles.logo} />
              </Link>
            </h1>
            <div className={`${styles.sideSection} ${styles.icons}`}>
              <Tutorial />
              <Link color="secondary" href="/account" component={A}>
                <ManageAccountsIcon />
              </Link>
            </div>
          </div>
          <Typography variant="h4" component="div">
            Your AI-Powered Rubber Duck Debugging Platform
          </Typography>
          <p className={styles.poweredBySubHeader}>
            Powered by{' '}
            <Link href="https://openai.com/" target="_blank">
              OpenAI
            </Link>
            's{' '}
            <Link href="https://en.wikipedia.org/wiki/GPT-3" target="_blank">
              GPT-3 AI
            </Link>
          </p>
        </header>
        <section className="main">{routeResult}</section>
      </div>
    </ThemeProvider>
  )
}
