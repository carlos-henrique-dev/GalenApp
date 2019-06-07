export const Types = {
  DRUGSTORE_LOGIN: 'DRUGSTORE_LOGIN',
  DRUGSTORE_LOGOUT: 'DRUGSTORE_LOGOUT',
  DRUGSTORE_LOGIN_ERROR: 'DRUGSTORE_LOGIN_ERROR',
};

const initialState = {
  id: '',
  email: '',
  name: '',
  token: '',
  isLogged: null,
  error: null,
  allNight: null,
  photo: null,
  cnpj: '',
  contacts: '',
  manager: '',
  street: '',
  number: '',
  neighborhood: '',
  zipcode: '',
  city: '',
  state: '',
  longitude: '',
  latitude: '',
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case Types.DRUGSTORE_LOGIN:
      return {
        ...state,
        id: action.payload.id,
        email: action.payload.email,
        name: action.payload.name,
        token: action.payload.token,
        isLogged: true,
        allNight: action.payload.allNight,
        cnpj: action.payload.cnpj,
        contacts: action.payload.contacts,
        manager: action.payload.manager,
        street: action.payload.street,
        number: action.payload.number,
        neighborhood: action.payload.neighborhood,
        zipcode: action.payload.zipcode,
        city: action.payload.city,
        state: action.payload.state,
        longitude: action.payload.longitude,
        latitude: action.payload.latitude,
      };
    default:
      return state;
  }
}

export function drugstoreLogin(data) {
  return {
    type: Types.DRUGSTORE_LOGIN,
    payload: {
      id: data.drugstore._id,
      email: '',
      name: data.drugstore.name,
      token: data.token,
      allNight: data.drugstore.allNigth,
      cnpj: data.cnpj,
      contacts: data.drugstore.contacts,
      manager: data.drugstore.manager,
      street: data.drugstore.address.street,
      number: data.drugstore.address.number,
      neighborhood: data.drugstore.address.neighborhood,
      zipcode: data.drugstore.address.zipcode,
      city: data.drugstore.address.city,
      state: data.drugstore.address.state,
      longitude: data.drugstore.address.gpsCoordinates.longitude,
      latitude: data.drugstore.address.gpsCoordinates.latitude,
    },
  };
}
