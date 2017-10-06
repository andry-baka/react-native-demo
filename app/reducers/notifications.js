const types = {
  received: 'notifications_received'
};

export const notificationActionCreators = {
  receiveNotification: (notificationObject) => ({
    type: types.received,
    payload: notificationObject
  })
};

const initialState = {};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case types.received: {
      return {
        ...state,
        notificationObject: payload
      }
    }
    default: return state;
  }
};

export default reducer;