initialstate = {
  Login1: '',
  showHome: true,
  chauvhir: {},
  chauvhirls: {},
};
export default (state = initialstate, action) => {
  switch (action.type) {
    case 'User_Login_Request':
      return {...state, isFetching: true};
    case 'User_Login_Success':
      return {...state, isFetching: false, Login1: action.payload};
    case 'User_Login_Error':
      return {...state, isFetching: false};
    case 'setHome':
      return {...state, showHome: false};
    case 'set_Chauvihar_event':
      return {...state, chauvhir: action.payload};
    case 'set_Chauvihar_event_page':
      return {...state, chauvhirls: action.payload};

    default:
      return state;
  }
};
