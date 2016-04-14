import React from 'react';
var _ = require('lodash');


export const createFormData = (value, files)=> {
  var formData = new FormData()
  formData.append("json", JSON.stringify( value ))
  _.each(_.keys(files), prop=> {
    _.each(files[prop], f=>formData.append(prop, f))
  })
}


export var createLink = (that,prop, key)=> {
  var name = key+'.'+prop
  var valueLink={
    value: _.get(that.state, name),       //that.state[name],
    requestChange: (v, newfiles)=>{
      console.log('requestChange',name,v, newfiles);
      var state = that.state;
      _.set(state, name, v);

      if(newfiles) {
        var { files } = state
        if (!files) {
          files = { }
        }
        files[prop]=newfiles
        state.files=files
      }

      //state[name] = v;
      that.setState(state);
      console.log('state: ', state);

   }
  };
  return valueLink;
}


export class ButtonGroup extends React.Component {
  render() {
    return (
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
        {this.props.children}
      </div>
      </div>
    );
  }
}

export class Input extends React.Component {

  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;


    return (
      <FormGroup label={label}>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        id={id}
        {...this.props}

        />
      </FormGroup>
    );
  }


}




export class FormGroup extends React.Component {

  render() {

    var child = React.Children.only(this.props.children)
    var { id } = child.props;

    return (
        <div className="form-group">
          <label
            htmlFor={id}
            className="col-sm-2 control-label">{this.props.label}</label>
        <div className="col-sm-10">
        {this.props.children}
          </div>
        </div>
    );
  }


}

export class Form extends React.Component {

  constructor(props) {
      super(props)
      this.state = { value : props.value || {} }
      //console.log("Form", this.state);
    }

  handleSubmit(e) {
    e.preventDefault();
    //console.log('Form.handleSubmit',this.state);
    this.props.onSubmit(this.state.value, this.state.files)
  }

  componentWillReceiveProps(props) {
    //console.log('Form.componentWillReceiveProps',props);
    this.setState({ value : props.value || {}})
  }

  render() {
    //console.log('Form.render', this.state);
    var chs = React.Children.map(this.props.children, child=>{
        if (child.props.name) {
            return React.cloneElement(child, {
              valueLink: createLink(this, child.props.name,  'value')
      			});
        }
        return child;
    });


    return (
      <form className="form-horizontal" encType="multipart/form-data"
          onSubmit={this.handleSubmit.bind(this)}
          >
            {chs}
      </form>
    );
  }


}
