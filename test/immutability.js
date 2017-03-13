// import { expect } from 'chai'
import { List, Map } from 'immutable'

describe('immutability', () => {
  describe('a tree', () => {
    function addMovie(currentState, movie) {
      return currentState.set('movies', currentState.get('movies').push(movie))
      // return currentState.update('movies', movies => movies.push(movie))
    }

    it('is immutable', () => {
      const state = Map({
        movies: List.of('Trainspotting', '28 Days Later'),
      })
      const nextState = addMovie(state, 'sunshine')

      console.log(JSON.stringify(state, null, 2))
      console.log(JSON.stringify(nextState, null, 2))

      // expect(state).to.eql(Map({
      //   movies: List.of('Trainspotting', '28 Days Later'),
      // }))
      // expect(nextState).to.eql(Map({
      //   movies: List.of('Trainspotting', '28 Days Later', 'sunshine'),
      // }))
    })
  })
})
