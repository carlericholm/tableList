const INITIAL_STATE = {
  dogs: null,
};

const dogsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SET_DOGS':
      return {
        ...state,
        dogs: action.payload
      }

    default:
      return state;
  }
};

export default dogsReducer;
