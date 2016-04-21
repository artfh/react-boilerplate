import React from 'react';
import request from 'superagent'


import { Input, ButtonGroup, Form, FormGroup, createFormData} from './utils/forms';
import { FileInput, File } from './forms/file'
import { ImageInput, Image } from './forms/image'

import { Modal ,Button} from 'react-bootstrap';


export class UserForm extends React.Component {

  constructor(props) {
    super(props);
    var user  = this.props.user || {}
    this.state = { data: user }
  }

  render() {
    return (
      <Form
        value={this.state.data}
        no-validation
        onSubmit={this.props.onSubmit}>
        <Input name="name"/>

        <ImageInput
          name="avatar"
          thumbWidth={200}
          thumbHeight={100} fixedSize={ {w:200,h:200} }/>


          <ImageInput
            name="photo"
            thumbWidth={200}
            thumbHeight={400} />

          <FileInput name="attachment"/>


        <ButtonGroup>
          <button
            className="btn btn-success"
            style={{marginRight:'5px'}}>Save</button>
        </ButtonGroup>

      </Form>
    );
  }
}



class UserPreview extends React.Component {

  render() {
    var {user} = this.props
    const link =  user.attachment ? <a href={'/api/files/'+user.attachment.$oid}>file</a>: null
    return (
      <div className="well">
        <h4>
          <small>User:</small> {user.name}
        </h4>

        <Image
          imageId={user.photo}
          style={{maxWidth:300, maxHeight:300 }} />

        <br/>
        Attachment: <File fileId={user.attachment}/>
      </div>
    )
  }

}



export class UserContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { user: {}, loaded:false };
  }

  componentDidMount(){
    request
    .get(`/api/user/${this.props.userId}`)
    .set('Accept', 'application/json')
    .end( (err, res) => {
      this.setState({user:res.body,loaded:true})
    })
  }

  handleSubmit(value, files) {
    request
    .post(`/api/user/${this.props.userId}`)
    .send(createFormData(value, files))
    .set('Accept', 'application/json')
    .end( (err, res)=>{
      console.log("saved!",res.body);
      this.setState({user:res.body,loaded:true})
    })
  }

  render() {
    if (!this.state.loaded) return <p>loading...</p>
    return (
      <div>
        <h1 className="page-header">User</h1>
        <div className="row">
          <div className="col-sm-6">
            <UserForm
              user={this.state.user}
              onSubmit={this.handleSubmit.bind(this)} />
          </div>
          <div className="col-sm-6">
            <UserPreview
              user={this.state.user}
              onSubmit={this.handleSubmit.bind(this)}/>

          </div>
        </div>
      </div>
    )
  }
}


export class DropTest extends React.Component {

  render() {
    return (
      <div>
        <UserContainer userId="57149070ba4d126035c4e8f3"/>
      </div>
    )
  }

}
