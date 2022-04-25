import Store from './store.js'

export function useMadLib(question) {
  const account = Store.useState(s => s.account)

  let allAnswers = []
  if (account.name) {
    allAnswers.push(`Your name is ${account.name}.`)
  }
  if (account.company) {
    allAnswers.push(`You work for ${account.company}.`)
  }
  if (account.role) {
    allAnswers.push(`Your job is a ${account.role}.`)
  }
  if (account.languages) {
    allAnswers.push(`You write code using these langauges: ${account.languages}.`)
  }
  if (account.teammates) {
    allAnswers.push(`You work with these people: ${account.teammates}.`)
  }
  if (account.technologies) {
    allAnswers.push(`You use these technologies: ${account.technologies}.`)
  }
  allAnswers.push(question)

  const lastBits = ['Here is what you should do.', 'Try these steps.', 'Look at it this way.', 'Approach it like this.']

  allAnswers.push(lastBits[Math.floor(Math.random() * lastBits.length)])

  return allAnswers.join('\n')
}
