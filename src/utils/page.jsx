import React from 'react';
import ReactDOM from 'react-dom';

export class ContentPage extends React.Component {
  render() {
    return <div>
    <h2 className="page-header">{this.props.title}</h2>
      {this.props.children}
    </div>;
  }
}
