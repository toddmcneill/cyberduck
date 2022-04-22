import { Store } from 'pullstate'

export const initialState = {
  account: {
    name: '',
    role: '',
    company: '',
    languages: '',
    technologies: '',
    teammates: '',
  },
}

export default new Store(initialState)
