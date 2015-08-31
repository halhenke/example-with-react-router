import React from 'react';
import routes from './App';
import Router from 'react-router';


// Router.run(routes, Router.HashLocation, (Root) => {
Router.run(routes, Router.HistoryLocation, (Root) => {
  React.render(<Root/>, document.body);
});

