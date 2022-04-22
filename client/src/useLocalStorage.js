import { useEffect } from 'react'
import Store from './store'

export default function useLocalStorage() {
  useEffect(() => {
    Store.update(s => {
      Object.keys(s.account).forEach(key => {
        s.account[key] = localStorage.getItem(key) || ''
      })
    })
  }, [])
}
