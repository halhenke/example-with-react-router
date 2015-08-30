import React from 'react';
import Router from 'react-router';
import * as data from './data';
import styles from './SideBar.css';
const {Link} = Router;


const CategoryNav = React.createClass({

  propTypes: {
    category: React.PropTypes.object,
    defaultIsOpen: React.PropTypes.bool
  },

  getInitialState() {
    return {isOpen: this.props.defaultIsOpen};
  },

  getDefaultProps() {
    return {isOpen: false};
  },

  componentWillReceiveProps(newProps) {
    if (!this.state.isOpen) {
      this.setState({isOpen: newProps.defaultIsOpen});
    }
  },

  toggle() {
    this.setState({isOpen: !this.state.isOpen});
  },

  buildToggleClassName() {
    let toggleClassName = styles.CategoryNav__Toggle;

    if (this.state.isOpen) {
      toggleClassName = toggleClassName + styles['CategoryNav__Toggle--is-open'];
    }
    return toggleClassName;
  },

  renderItems() {
    const category = this.props.category;

    return this.state.isOpen ? category.items.map(function (item) {
      const params = {name: item.name, category: category.name};

      return (
        <li key={item.name}>
          <Link to="item" params={params}>{item.name}</Link>
        </li>
      );
    }) : null;
  },

  render() {
    const category = this.props.category;

    return (
      <div className="CategoryNav">
        <h3
          className={this.buildToggleClassName()}
          onClick={this.toggle}
        >{category.name}</h3>
        <ul>{this.renderItems()}</ul>
      </div>
    );
  }
});

const Sidebar = React.createClass({

  propTypes: {
    activeCategory: React.PropTypes.string,
    categories: React.PropTypes.array
  },

  renderCategory(category) {
    return (
      <CategoryNav
          key={category.name}
          defaultIsOpen={category.name === this.props.activeCategory}
          category={category}
      />
    );
  },

  render() {
    return (
      <div>
        {this.props.categories.map(this.renderCategory)}
      </div>
    );
  }
});


const Item = React.createClass({

  contextTypes: {
    router: React.PropTypes.func.isRequired
  },

  render() {
    const params = this.context.router.getCurrentParams();
    const category = data.lookupCategory(params.category);
    const item = data.lookupItem(params.category, params.name);

    return (
      <div>
        <h2>{category.name} / {item.name}</h2>
        <p>Price: ${item.price}</p>
      </div>
    );
  }
});

const Index = React.createClass({
  render() {
    return (
      <div>
        <p>Sidebar features:</p>
        <ul style={{maxWidth: '600px'}}>
          <li>User can open/close categories</li>
          <li>
            Visiting an item on first page load will automatically open
            the correct category. (Click an item, then reload the
            browser.)
          </li>
          <li>
            Navigating with forward/back buttons will open an active
            category if it is not already open. (Navigate to several
            items, close all the categories, then use back/forward
            buttons.)
          </li>
          <li>
            Only the user can close a category. (Navigating from an
            active category will not close it.)
          </li>
        </ul>
      </div>
    );
  }
});

// export {Sidebar, SideApp, Index, Item};
export {Sidebar, Index, Item};
