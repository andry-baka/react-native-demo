const types = {
  increaseCtr: 'IncreaseCounter',
  decreaseCtr: 'DecreaseCounter',
};

export const counterActionCreators = {
  increaseCtr: (counterObject) => ({
    type: types.increaseCtr,
    payload: counterObject
  }),
  decreaseCtr: (counterObject) => ({
    type: types.decreaseCtr,
    payload: counterObject
  })
};

const initialState = { count: 0 };

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.increaseCtr: {
      return { 
        ...state,
        count: state.count + 1
      };
    }
    case types.decreaseCtr: {
      return { 
        ...state,
        count: state.count - 1
      };
    }
    default: return state;
  }
};

export default reducer;