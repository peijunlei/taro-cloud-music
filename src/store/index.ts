import SearchStore from '@/package-A/pages/search/store';
import HomeStore from '@/pages/home/store';
import React from 'react';
import Global from './global';

const stores = React.createContext({
  global: new Global(),
  home: new HomeStore(),
  search: new SearchStore()
});

export default stores;