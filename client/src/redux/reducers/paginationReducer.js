const initialState = {
  currentPage: 0,
  drivers: [], 
  driversPerPage: 9, 
};

const paginationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'NEXT_PAGE':
      return {
        ...state,
        currentPage: state.currentPage + 1,
      };
    case 'PREV_PAGE':
      return {
        ...state,
        currentPage: Math.max(0, state.currentPage - 1),
      };
    case 'GO_TO_PAGE':
      return {
        ...state,
        currentPage: action.payload,
      };
    case 'GO_TO_FIRST_PAGE':
      return {
        ...state,
        currentPage: 0,
      };
      case 'GO_TO_LAST_PAGE':
        return {
          ...state,
          currentPage: 57 - 1,
          
        };
    default:
      return state;
  }
};

export default paginationReducer;