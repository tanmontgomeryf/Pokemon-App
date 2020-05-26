import { IN_LANDING_PAGE, NOT_LANDING_PAGE } from './isLandingTypes';

export const inLandingPage = () => ({
  type: IN_LANDING_PAGE,
});

export const notLandingPage = () => ({
  type: NOT_LANDING_PAGE,
});
