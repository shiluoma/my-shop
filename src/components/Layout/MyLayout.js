import React from 'react';
import NavBar from './NavBar';
import TabBars from './TabBar';

/**
 * 将tabBar和NavBar集合在一起作为layOut扩展
 * @param {*} WrappedComponent
 */
const MyLayout = (WrappedComponent, navBarOptions) =>
  class extends WrappedComponent {
    render() {
      const elementsTree = super.render();
      const { title, border } = navBarOptions || {};
      return (
        <React.Fragment>
          <NavBar title={title} border={border} />
          <main>{elementsTree}</main>
          <TabBars />
        </React.Fragment>
      );
    }
  };

export default MyLayout;
