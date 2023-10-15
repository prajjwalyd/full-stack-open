const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}


const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GOOD':
      return { good: state.good + 1, bad: state.bad, ok: state.ok }
    case 'OK':
      return { good: state.good, bad: state.bad, ok: state.ok + 1 }
    case 'BAD':
      return { good: state.good, bad: state.bad + 1, ok: state.ok }
    case 'ZERO':
      return { good: 0, bad: 0, ok: 0 }
    default: return state
  }
}


export default counterReducer