import HomeStore from '@/pages/home/store';
import React from 'react';

const stores = React.createContext({
  home: new HomeStore(),
});

export default stores;