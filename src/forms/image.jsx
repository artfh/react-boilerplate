import React from 'react';

import {  FormGroup} from '../utils/forms';

import { Modal ,Button} from 'react-bootstrap';

import {ImageEditor} from './image_editor'

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

    var state = {showCropModal:false}

    if (this.props.valueLink.value) {
      var imageUrl  = '/api/files/'+this.props.valueLink.value.$oid || null
      state.imageUrl =  imageUrl
    }

    this.state =  state
    console.log("fixedSize", this.props.fixedSize);
  }


  __createPreview(file, callback) {
    var reader = new FileReader();
    reader.onloadend = (e) => {
      const imageURL = e.target.result
      callback(file, imageURL)
    };
    reader.readAsDataURL(file);
  }

  onChange(e) {
    e.preventDefault()

    if(e.target.files.length>0) {
      const file = e.target.files[0]

      if (this.props.fixedSize) {
        this.__createPreview(file, (file, imageURL)=> {
          this.setState({ showCropModal:true, originalFile: { file, imageURL }})
        })
      } else {
        this.__createPreview(file, (file, imageURL)=> {
          this.props.valueLink.requestChange(null,  [file])
          this.setState({ imageFile:file, imageUrl: imageURL})
        })
      }


    } else this._resetFile()

  }

  _resetFile() {
    this.props.valueLink.requestChange(null,  null)
    this.setState({ imageFile:null, imageUrl: null })
  }

  clearFile(e) {
    e.preventDefault()
    this._resetFile()
  }


  closeModal() {
    this.setState({showCropModal:false})
  }

  onEditFinish(file, imageURL) {
    console.log('onEditFinish',file);
    this.props.valueLink.requestChange(null,  [file])
    this.setState({ imageFile:file, imageUrl: imageURL,showCropModal:false})
  }

  renderCropModal() {

    if(!this.state.showCropModal) return null

    return (
      <Modal
        show={this.state.showCropModal}
        dialogClassName="image-editor" bsSize="large"
        onHide={()=> this.setState({showCropModal:false}) }>
        <Modal.Header closeButton>
          <Modal.Title>
            Scale and Crop
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ImageEditor
            ref="editor"
            onFinish={this.onEditFinish.bind(this)}
            image={this.state.originalFile.imageURL}
            width={this.props.fixedSize.w}
            height={this.props.fixedSize.h}/>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> this.refs.editor.finishEditing() }>Apply</Button>
          <Button onClick={()=> this.setState({showCropModal:false}) }>Cancel</Button>

        </Modal.Footer>
      </Modal>
    )
  }


  render() {

    var {name,label,placeholder,id} = this.props
    label = label || _.startCase(name);
    placeholder = placeholder || _.startCase(name);
    id = id || 'id_'+name;

    var preview = ''

    const hasValue = this.props.valueLink.value || (this.state && this.state.imageUrl) ? true : false

    if (this.state && this.state.imageUrl) {
      var style = { border:'1px solid #cccccc', marginRight:10 }
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
              <button
                className="btn btn-default"
                onClick={this.clearFile.bind(this)} >
                <span
                  className="glyphicon glyphicon-trash"
                  aria-hidden="true">
                </span>
              </button>
              : null }


              { this.renderCropModal() }


            </span>
          </FormGroup>
        );
      }
    }
