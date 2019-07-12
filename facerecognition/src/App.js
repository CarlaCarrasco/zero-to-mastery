import React, { Component } from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import './App.css';

const app = new Clarifai.App({
  apiKey: '6c46dc22769f4fd09b96c7ee63b28c73'
})
const particlesOptions = {
  particles: {
    number: {
      value: 100,
      desity: {
        enable: true,
        value_area: 800, 
      }
    }
  }
}

class App extends Component {
  constructor(){
    super();
      this.state = {
        input: '',
        imageUrl: '',
        box: {},
        route: 'signin',
        isSignedIn: false,
        user: {
          id: "",
          name:'',
          email: '',
          entries: 0,
          joined: ''
        }
      }
  }

  loadUser = (user) => {
    this.setState({user: {
      id: user.id,
      name:user.name,
      email: user.email,
      entries: user.entries,
      joined: user.joined
    }})
  }

  // componentDidMount() {
  //   fetch('http://localhost:300')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width); // width of bounding box side 
    const height = Number(image.height); // height of bounding box side
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box); 
    this.setState({box: box})
  }
  onInputChange = (event) => {
    console.log('onInputChange');
    this.setState({input: event.target.value});
  }
  onPictureSubmit = () => {
    console.log('button clicked')
    this.setState({imageUrl: this.state.input});
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL,
        this.state.input)
      .then(response => {
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
  }
  // onPictureSubmit = () => {
  //   this.setState({imageUrl: this.state.input});
  //   console.log('hello')
  //   app.models
  //   .predict(
  //     Clarifai.FACE_DETECT_MODEL, 
  //     this.state.input)
  //   .then(response => {
  //       // if we have a response
  //       if(response) {
  //         // run image
  //         fetch('http://localhost:3001/image', {
  //           method: 'put',
  //           headers: {'content-Type': 'application/json'},
  //           body: JSON.stringify({
  //           id: this.state.user.id
  //         })
  //       })
  //     }
  //     this.displayFaceBox(this.calculateFaceLocation(response));
  //   })
  //     .catch(err => console.log(err));
  //   }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
    
  }
  render() {
    const { isSignedIn, imageUrl, route, box } = this.state;
    return (
      <div className="App">
          <Particles className='particles'
              params={particlesOptions}
            />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
         ? <div>
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <Logo />
            <ImageLinkForm 
              onInputChange={this.onInputChange} 
              onPictureSubmit={this.onPictureSubmit}
            />
            
            <FaceRecognition box={box} imageUrl={imageUrl}  />
        </div>
        : (
          this.state.route === 'signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
        }
      </div>
    );
        }
      }



export default App;
