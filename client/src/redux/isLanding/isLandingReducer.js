import { IN_LANDING_PAGE, NOT_LANDING_PAGE } from './isLandingTypes';

const initialState = {
  isLanding: true,
};

const isLandingReducer = (state = initialState, action) => {
  const { type } = action;
  switch (type) {
    case IN_LANDING_PAGE:
      return {
        ...state,
        isLanding: true,
      };
    case NOT_LANDING_PAGE:
      return {
        ...state,
        isLanding: false,
      };
    default:
      return state;
  }
};

export default isLandingReducer;
