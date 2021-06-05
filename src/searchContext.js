import React from 'react';

const SearchContext = React.createContext();

const SearchProvider = SearchContext.Provider;
const SearchConsumer = SearchContext.Consumer;

export { SearchProvider, SearchConsumer, SearchContext };
