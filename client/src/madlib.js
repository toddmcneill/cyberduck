import Store from './store.js'

export function useMadLib(question) {
  const account = Store.useState(s => s.account)

  let allAnswers = []
  if (account.name) {
    allAnswers.push(`My name is ${account.name}.`)
  }
  if (account.company) {
    allAnswers.push(`I work for ${account.company}.`)
  }
  if (account.role) {
    allAnswers.push(`My role is a ${account.role}.`)
  }
  if (account.languages) {
    allAnswers.push(`I write code using these languages: ${account.languages}.`)
  }
  if (account.teammates) {
    allAnswers.push(`I work with these people: ${account.teammates}.`)
  }
  if (account.technologies) {
    allAnswers.push(`I use these technologies: ${account.technologies}.`)
  }
  allAnswers.push('I need help.')
  allAnswers.push(question)

  return allAnswers.join(' ')
}
