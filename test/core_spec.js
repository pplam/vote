// import { expect } from 'chai'
import { Map, List } from 'immutable'
import { setEntries, next, vote } from '../src/core'

describe('core logic', () => {
  describe('setEntries', () => {
    it('add a immutable list to the state', () => {
      const state = Map()
      const nextState = setEntries(state, List.of('Trainspotting', '28 Days Later'))

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.deep.equal(Map({ entries: List.of('Trainspotting', '28 Days Later') }))
    })

    it('add a array as immutable list to the state', () => {
      const state = Map()
      const nextState = setEntries(state, ['Trainspotting', '28 Days Later'])

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.deep.equal(Map({ entries: List.of('Trainspotting', '28 Days Later') }))
    })
  })

  describe('next', () => {
    it('takes the next two entries under vote', () => {
      const state = Map({ entries: List.of('Trainspotting', '28 Days Later', 'Sunshine') })
      const nextState = next(state)

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.deep.equal(Map({
      //   vote: Map({ pair: List.of('Trainspotting', '28 Days Later') }),
      //   entries: List.of('Sunshine'),
      // }))
    })

    it('puts winner of current vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 4,
            '28 Days Later': 2,
          }),
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours'),
      })
      const nextState = next(state)

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.equal(Map({
      //   vote: Map({
      //     pair: List.of('Sunshine', 'Millions'),
      //   }),
      //   entries: List.of('127 Hours', 'Trainspotting'),
      // }))
    })

    it('puts both from tied vote back to entries', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 3,
            '28 Days Later': 3,
          }),
        }),
        entries: List.of('Sunshine', 'Millions', '127 Hours'),
      })
      const nextState = next(state)

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.equal(Map({
      //   vote: Map({
      //     pair: List.of('Sunshine', 'Millions'),
      //   }),
      //   entries: List.of('127 Hours', 'Trainspotting', '28 Days Later'),
      // }))
    })

    it('marks winner when just one entry left', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 4,
            '28 Days Later': 2,
          }),
        }),
        entries: List(),
      })
      const nextState = next(state)

      console.log(JSON.stringify(nextState, null, 2))

      const nextNextState = next(state)
      console.log(JSON.stringify(nextNextState, null, 2))
      // expect(nextState).to.equal(Map({winner: 'Trainspotting'}))
    })
  })

  describe('vote', () => {
    it('creates a tally for the voted entry', () => {
      const state = Map({
        vote: Map({ pair: List.of('Trainspotting', '28 Days Later') }),
        entries: List(),
      })
      const nextState = vote(state, 'Trainspotting')

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.deep.equal(Map({
      //   vote: Map({
      //     pair: List.of('Trainspotting', '28 Days Later'),
      //     tally: Map({ Trainspotting: 1 }),
      //   }),
      //   entries: List(),
      // }))
    })

    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Trainspotting', '28 Days Later'),
          tally: Map({
            Trainspotting: 3,
            '28 Days Later': 2,
          }),
        }),
        entries: List(),
      })
      const nextState = vote(state, 'Trainspotting')

      console.log(JSON.stringify(nextState, null, 2))
      // expect(nextState).to.equal(Map({
      //   vote: Map({
      //     pair: List.of('Trainspotting', '28 Days Later'),
      //     tally: Map({
      //       Trainspotting: 4,
      //       '28 Days Later': 2,
      //     }),
      //   }),
      //   entries: List(),
      // }))
    })
  })
})
