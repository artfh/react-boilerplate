import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router'


export  class Tab extends React.Component {

  selectTab(e) {
    console.log('Tab.selectTab',this.props.tabKey);
    this.props.selectTab(this.props.tabKey);
  }

  render() {
    return   <li role="presentation" className={this.props.active ? 'active':''}>
                  <a onClick={this.selectTab.bind(this)}>{this.props.title}</a></li>;
  }

}


export class Tabs extends React.Component {

  constructor(props) {
     super(props);
     this.state = {
       selected:0
     };
   }

  selectTab(i) {
    console.log("Tabs.selectTab",i);
    this.setState({selected:i});
  }

  render() {
    var activeTab;
    var tabs = React.Children.map(this.props.children, (tab, i)=> {
      let active = i == this.state.selected;
      if (active) {
        activeTab = tab
      }
			return React.cloneElement(tab, {
				selectTab: this.selectTab.bind(this),
				key: i,
        tabKey:i,
        active
			});
		}, this);

    var tabContent= (activeTab && activeTab.props.children) || []

    return   <div><ul className="nav nav-tabs">
              {tabs}
              </ul><p/>
              <div>{tabContent}</div>

    </div>;
  }
}
