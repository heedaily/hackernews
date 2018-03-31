import React from 'react';
import fontawesome from '@fortawesome/fontawesome'
import { faSpinner } from '@fortawesome/fontawesome-free-solid'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'

import Button from './Button';

fontawesome.library.add(faSpinner);

const Loading = () =>
  <div><FontAwesomeIcon icon={["fas", "spinner"]} pulse fixedWidth /></div>

const withLoading = (Component) => ({ isLoading, ...rest }) =>
  isLoading
    ? <Loading />
    : <Component { ...rest } />

const ButtonWithLoading = withLoading(Button);

export {
  ButtonWithLoading
};

export default ButtonWithLoading;