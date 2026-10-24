import { createTheme } from '@mui/material/styles';
import getDesignTokens from './themePrimitives';
import {
  inputsCustomizations, dataDisplayCustomizations, feedbackCustomizations,
  navigationCustomizations, surfacesCustomizations,
} from './customizations';

// One owner per Mui key prevents a later group from silently dropping an override.
const groups = [inputsCustomizations, dataDisplayCustomizations, feedbackCustomizations, navigationCustomizations, surfacesCustomizations];
export const getTrustifyThemeOptions = (mode = 'light') => {
  const components = {};
  groups.forEach((group) => Object.entries(group).forEach(([name, customization]) => {
    if (components[name]) throw new Error(`Duplicate theme customization: ${name}`);
    components[name] = customization;
  }));
  return { ...getDesignTokens(mode), components };
};

const createTrustifyTheme = (mode = 'light') => createTheme(getTrustifyThemeOptions(mode));
export default createTrustifyTheme;
