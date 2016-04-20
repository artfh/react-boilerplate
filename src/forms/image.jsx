import React from 'react';

import {  FormGroup} from '../utils/forms';



export class Image extends React.Component {

  render() {
    var {imageId} = this.props
    if(!imageId) return <p>
      no image
    </p>;
    var url = '/api/files/'+imageId.$oid
    return (
      <img src={url}  {...this.props}/>
    )
  }

}


export class ImageInput extends React.Component {

  constructor(props) {
    super(props);
    if (this.props.valueLink.value) {
      var imageUrl  = '/api/files/'+this.props.valueLink.value.$oid || null
      this.state = { imageUrl }
    }
  }


  _createPreview(file) {
    var self = this , newFile, reader = new FileReader();
    reader.onloadend = (e) => {
      this.setState({files:[file], imageFile:file, imageUrl: e.target.result})
    };
    reader.readAsDataURL(file);
  }

  onChange(e) {
    e.preventDefault()
    this.props.valueLink.requestChange(null,  e.target.files)

    if(e.target.files.length>0) {
      this._createPreview(e.target.files[0])
    }
  }

  clearFile(e) {
    e.preventDefault()
    console.log("clearFile");
    this.props.valueLink.requestChange(null,  e.target.files)

    this.setState({files:null, imageFile:null, imageUrl: null})
  }

  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;

    var preview = ''

    const hasValue = this.props.valueLink.value || (this.state && this.state.imageUrl) ? true : false

    if (this.state && this.state.imageUrl) {
      var style = {}
      if (this.props.thumbWidth) style.maxWidth=this.props.thumbWidth
      if (this.props.thumbHeight) style.maxHeight=this.props.thumbHeight

      preview=
      <img src={this.state.imageUrl} style={style} />
    }

    return (
      <FormGroup label={label}>
        <span>
          {preview}

          {!hasValue ?
          <span className="btn btn-default btn-file">
            Select Image
            <input
              type="file"
              className="form-control11"
              placeholder={placeholder}
              id={id}
              onChange={this.onChange.bind(this)}
              />
          </span>
        : null }

        {hasValue ?
          <button className="btn btn-default"
             onClick={this.clearFile.bind(this)} >
            <span className="glyphicon glyphicon-trash" aria-hidden="true"></span></button>
        : null }


        </span>
      </FormGroup>
    );
  }
}
