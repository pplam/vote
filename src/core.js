import { Map, List } from 'immutable'

function getWinners(vote) {
  if (!vote) return []
  const [a, b] = vote.get('pair')
  const aTally = vote.getIn(['tally', a], 0)
  const bTally = vote.getIn(['tally', b], 0)
  if (aTally > bTally) return [a]
  if (bTally > aTally) return [b]
  return [a, b]
}

export function setEntries(state, entries) {
  return state.set('entries', List(entries))
}

export function next(state) {
  let entries = state.get('entries')
  if (!entries) return state
  entries = entries.concat(getWinners(state.get('vote')))
  if (entries.size === 1) return state.remove('vote').remove('entries').set('winner', entries.first())
  return state.merge({
    vote: Map({ pair: entries.take(2) }),
    entries: entries.skip(2),
  })
}

export function vote(state, entry) {
  return state.updateIn(['vote', 'tally', entry], (val = 0) => val + 1)
}
