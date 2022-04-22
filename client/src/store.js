import { Store } from 'pullstate'

export const initialState = {
  account: {
    name: '',
    role: '',
    company: '',
    languages: '',
    teammates: '',
    technologies: '',
  },
}

export default new Store(initialState)
