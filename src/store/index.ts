import SearchStore from '@/package-A/pages/search/store';
import HomeStore from '@/pages/home/store';
import React from 'react';

const stores = React.createContext({
  home: new HomeStore(),
  search: new SearchStore()
});

export default stores;