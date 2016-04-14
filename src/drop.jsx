import React from 'react';

import { Input, ButtonGroup, Form, FormGroup, createFormData} from './utils/forms';

var imgPath = require('./p11.png');
import fetch from 'isomorphic-fetch'
import request from 'superagent'



class Preview extends React.Component {
  render() {
    const {file, imageUrl} = this.props.file

    var img = new Image()
    img.src = imageUrl

    console.log('file',file, img.width)
    return (
      <div>
        {file.name}, type: {file.type}, size: {img.width} x {img.height}<br/>
        <hr/>

      <img src={ imageUrl} />

      </div>
    )
  }

}





class Dropzone extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     file:null
   }
  }

  onDrop(e) {
    e.preventDefault();
    console.log(e.target.files);
    _.each(e.target.files, this._createPreview.bind(this));
  }


  _createPreview (file){
         var self = this , newFile, reader = new FileReader();

         reader.onloadend = (e) => {
           newFile = {file:file, imageUrl:e.target.result};
           console.log('file loaded', file)

           if (self.props.onDrop) {
             self.props.onDrop(newFile);
           }

           self.setState({file:newFile})

         };
         reader.readAsDataURL(file);
  }

  render() {
    return (
      <div>
        <input  type='file' multiple ref='fileInput' onChange={this.onDrop.bind(this)} />
             {this.props.children}
<hr/>
{this.state.file ?
  <Preview file={this.state.file}/> : null
}

      </div>
    )
  }
}


export class FileInput extends React.Component {


  onChange(e) {
    e.preventDefault();
    console.log(e.target.files);
    //_.each(e.target.files, this._createPreview.bind(this));
    this.props.valueLink.requestChange(null,  e.target.files)
    this.setState({files:e.target.files})
  }

  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;

    var ch = ''
    if (this.state && this.state.files) {
      ch=_.map(this.state.files, f => <span style={{backgroundColor:'#eeeeee', padding:5}}>{f.name}</span>)
    }



    return (
      <FormGroup label={label}>

        <span>
        <span className="btn btn-default btn-file">
         Select File

        <input
          type="file"
          className="form-control11"
          placeholder={placeholder}
          id={id}
          onChange={this.onChange.bind(this)}

          />

        </span>

        {' '}{ch}



      </span>

      </FormGroup>
    );
  }


}

 export class TestForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = { data: {} };
  }

  componentDidMount(){
  }

handleSubmit(value, files) {
  console.log('form submitted', value, files )

  var formData = new FormData();
  var self=this
  formData.append("json", JSON.stringify( value ));
  _.each(_.keys(files), prop=> {
      var p = prop;
      _.each(files[prop], f=> {
        formData.append(p, f);
        console.log(">>>>",p,f);
      })
  })

  //createFormData(value, files)
  request
    .post('/api/post_form')
    .send(formData)
    .set('Accept', 'application/json')
    .end(function(err, res){
    });


}

  handleSubmit1(value) {


var request = require('superagent');
  console.log('form submitted', value, this.refs.file1.getDOMNode().files[0])

  var formData = new FormData();
  formData.append("f1", this.refs.file1.getDOMNode().files[0]);
  formData.append("f1", this.refs.file1.getDOMNode().files[1]);
  formData.append("json", JSON.stringify( value ));

request
  .post('/api/post_form')
  .send(formData)
  .set('Accept', 'application/json')
  .end(function(err, res){
  });

    // var fd = new FormData();
    // fd.append( 'file', this.refs.file1.getDOMNode().files[0])
    // fd.append( "json", JSON.stringify( value ) );
    //
    // fetch("/echo/json/",
    // {
    //     method: "POST",
    //     body: fd
    // })


    //console.log('form submitted', value, this.refs.file1.getDOMNode().files);
  }


  onFileChange() {
    console.log(this.refs.file1);
  }

  render() {
    return (
      <div>
      <h1 className="page-header">Form</h1>

          <Form value={this.state.data} no-validation
              onSubmit={this.handleSubmit.bind(this)}
            >
              <Input name="name"/>

                <FileInput name="file" type="file"/>


              <ButtonGroup>
                  <button  className="btn btn-success"
                    style={{marginRight:'5px'}}>Save</button>
              </ButtonGroup>

          </Form>
    </div>

    );
  }
}



export const DropTest = ()=> (
  <div>


<TestForm />





  </div>
)
