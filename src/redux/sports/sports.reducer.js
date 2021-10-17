const INITIAL_STATE = {
  sports: null,
};

const sportsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_SPORTS':
      return {
        ...state,
        sports: action.payload
      }

    default:
      return state;
  }
};

export default sportsReducer;
