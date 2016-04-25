import React from 'react';
import request from 'superagent'

import { FormGroup } from './forms';



export class File extends React.Component {


  componentDidMount(){
    if(this.props.fileId) {
      request
      .get(`/api/files/${this.props.fileId.$oid}?meta=true`)
      .set('Accept', 'application/json')
      .end( (err, res) => {
        this.setState({file:res.body })
      })
    }
  }

  render() {
    var {fileId} = this.props
    if(!fileId) return <p>
      no file
    </p>;

    return (
      <a href={'/api/files/'+fileId.$oid}>{this.state && this.state.file? this.state.file.filename: 'File'}</a>
    )
  }

}


export class FileInput extends React.Component {

  constructor(props) {
    super(props);
    this.state = { file:null }
  }


  componentDidMount(){
    const hasFile = this.props.valueLink.value && this.props.valueLink.value.$oid
    if (hasFile) {
      const fileId  = this.props.valueLink.value.$oid
      request
      .get(`/api/files/${fileId}?meta=true`)
      .set('Accept', 'application/json')
      .end( (err, res) => {
        console.log('load',err,res);
        this.setState({file:res.body, newFile:false})
      })
    }

  }

  onChange(e) {
    e.preventDefault()
    this.props.valueLink.requestChange(null,  e.target.files)
    const hasFile = e.target.files && e.target.files.length>0
    if (hasFile) {
      const file = e.target.files[0]
      const meta = { filename:file.name }
      this.setState({file:meta, newFile:true})
    } else {
      this.setState({file:null})
    }
  }

  clearFile(e) {
    e.preventDefault()
    console.log("clearFile");
    this.props.valueLink.requestChange(null,  null)
    this.setState({file:null})
  }

  _createPreview() {
    if (this.state.file) {
      return <span  style={{backgroundColor:'#eeeeee', padding:5}}>
        {this.state.file.filename}
      </span>
    }
    return null
  }

  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;


    return (
      <FormGroup label={label}>
        <span>


          {!this.state.file ?
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
            : null }

            { this._createPreview()}
            {' '}

            {this.state.file ?
              <button
                className="btn btn-default"
                onClick={this.clearFile.bind(this)} >
                <span
                  className="glyphicon glyphicon-trash"
                  aria-hidden="true">
                </span>
              </button>
              : null }

            </span>
          </FormGroup>
        );
      }
    }
