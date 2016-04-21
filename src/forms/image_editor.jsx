import React from 'react';

import  Editor from 'react-avatar-editor'


export  class ImageEditor extends React.Component {

  constructor(props) {
   super(props);
   this.state = {
     scale:1.0,
     img: new Image()
   }
  }

  handleScale() {
      var scale = parseFloat(this.refs.scale.value)
      this.setState({scale: scale})
  }

  handleSave() {
    console.log('handleSave', this.refs.avatar.getImage());
  }

  finishEditing() {
    console.log('finishEditing');
    const imageURL = this.refs.avatar.getImage()
    const file = dataURItoBlob(imageURL)

    this.props.onFinish(file, imageURL)
    //this.prop  console.log('handleSave', this.refs.avatar.getImage());
  }

  componentDidMount() {
    var img = new Image()
    img.onload = (ii)=>this.setState({img})
    img.src = this.props.image
  }

  render() {
    console.log("render");
    var {img} = this.state

    return (
      <div style={{textAlign:'center'}}>

        {
          //  size: {img.width} x {img.height}, scale: {this.state.scale}<br/>
        }
  <Editor
      ref="avatar"
      scale={this.state.scale}
      borderRadius={0}
      border={this.props.border}
      image={this.props.image}
      width={this.props.width}
      height={this.props.height}/>
    <hr />
      <div className="row">
        <div style={{textAlign:'center'}} >Zoom:

<input name="scale" type="range" ref="scale" style={{ marginLeft:10, marginTop:3,  width:200, display:'inline' }} onChange={this.handleScale.bind(this)} min="0.6" max="4" step="0.1" defaultValue="1" />
        </div>

      </div>

    </div>
    )
  }
}



function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/png'});
}
