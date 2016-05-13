import React from 'react';
import {  FormGroup} from './forms'

import RichTextEditor from 'react-rte'

export class RichText extends React.Component {

  constructor(props) {
     super(props);
     console.log('RichText()',props.valueLink.value);

     var value = props.valueLink.value ?
        RichTextEditor.createValueFromString(props.valueLink.value,'html'):
        RichTextEditor.createEmptyValue()

     this.state = {
       value,
       initialValue:true
     };
   }

   onChange(value) {
     this.setState({value});
     console.log('onChange',value.toString('html'), this.state.value.toString('html'));
     //console.log(this.props.valueLink);
     this.props.valueLink.requestChange(value.toString('html'))
   };

   componentWillReceiveProps(props) {
     console.log('RichText.componentWillReceiveProps',props.valueLink.value);


     if (this.state.initialValue) {
          console.log('RichText.setState (props)',props.valueLink.value);

       this.setState({ value : RichTextEditor.createValueFromString(props.valueLink.value,'html') || '',
        initialValue:false});
     }

     //console.log('Form.componentWillReceiveProps',props);
     //this.setState({ value : RichTextEditor.createValueFromString(props.valueLink.value,'html') || '<h1>sda</h1>'});
  }

  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;



    return (

      <FormGroup label={label}>
        <div  >
        <RichTextEditor
          value={this.state.value}
          onChange={this.onChange.bind(this)}
          className={this.props.rtClassName}
          placeholder={placeholder}
          id={id}

        />

    </div>
      </FormGroup>
    );
  }



}
