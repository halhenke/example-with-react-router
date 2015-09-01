import React from 'react';
import {Route, DefaultRoute, RouteHandler, Link} from 'react-router';
import {ComponentRouter, LocationHtml5, Url, getDefault} from 'component-router';

import styles from './App.css';
import sideStyles from '../SideBar.css';
import * as data from '../data';
import {FooBar, Quickstart} from '..';
import {Sidebar, Index, Item} from '..';

const Header = React.createClass({
  render() {
    return (
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <Url query={{page: 'quickstart'}} isActiveClass={styles.active}>Quickstart</Url>
            </li>
            <li>
              <Url query={{page: 'foobar'}} isActiveClass={styles.active}>FooBar</Url>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
});


const SideApp = React.createClass({
  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render() {
    const activeCategory = this.context.router.getCurrentParams().category;

    return (
      <div>
        <div className={sideStyles.Sidebar}>
          <Sidebar activeCategory={activeCategory} categories={data.getAll()}/>
          <div>
            <ul>
              <li>
                <Link to="Component - FooBar"> Component - FooBar
                </Link>
              </li>
              <li>
                <Link to="Component - All Examples"> Component - All Examples
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="Content">
          <RouteHandler/>
        </div>
      </div>
    );
  }
});


const PlainFooApp = React.createClass({
  render() {
    return (
      <div className={styles.app}>
        <LocationHtml5 />

        <ComponentRouter namespace="foobar" config={FooBar} className={styles.content} />

      </div>
    );
  }
});

const BigFooApp = React.createClass({
  render() {
    return (
      <div className={styles.app}>
        <LocationHtml5 />

        <Header />
        <ComponentRouter namespace="page" config={{
          [getDefault()]: 'quickstart',
          foobar: FooBar,
          quickstart: Quickstart
        }} className={styles.content} />

      </div>
    );
  }
});


const routes = (
  <Route handler={SideApp}>
    <DefaultRoute handler={Index}/>
    <Route name="item" path=":category/:name" handler={Item} />
    <Route name="Component - FooBar" path="component-foo" handler={PlainFooApp} />
    <Route name="Component - All Examples" path="component-all" handler={BigFooApp} />
  </Route>
);

export default routes;
