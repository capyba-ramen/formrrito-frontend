import * as React from 'react';
import { useLocation } from 'react-router-dom';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import * as classNames from 'classnames/bind';
import style from './FormTabs.module.scss';
const cx = classNames.bind(style);

const FormTabs = () => {
  const [value, setValue] = React.useState('#questions');
  const location = useLocation();

  React.useEffect(() => {
    switch (location.hash) {
      case '#questions':
        setValue('#questions');
        break;
      case '#responses':
        setValue('#responses');
        break;
      default:
        setValue('#questions');
        break;
    }
  }, [location.hash]);

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="primary"
      indicatorColor="primary"
      aria-label="primary tabs example"
      variant="fullWidth"
      centered
      classes={{
        root: cx('root'),
      }}
    >
      <Tab value="#questions" label="Questions" disableRipple href="#questions" />
      <Tab value="#responses" label="Responses" disableRipple href="#responses" />
    </Tabs>
  );
};

FormTabs.displayName = 'FormTabs';

export default FormTabs;
