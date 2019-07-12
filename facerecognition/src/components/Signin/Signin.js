import React from 'react';
import './Signin.css';

class Signin extends React.Component {
    // create State
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    // get the values from signin form
    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    // event will use state to 
    onSubmitSignIn = () => {
        
        /* 
            Note: fetch by default does a get request, but we need todo a post request
            to do that we will pass a second parameter as an object that describes what
            the request will be. 
        */
       // this will send credentials to server
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
            email: this.state.signInEmail,
            password: this.state.signInPassword
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user)
                    this.props.onRouteChange('home'); // sends user to home page
                    console.log('logged in');
                }
                // else {
                //     console.log('not successful')
                // }
            })
        }
    render() {
        const { onRouteChange } = this.props;

        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-2 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"
                            onChange={this.onPasswordChange}
                            />
                        </div>
                        <label className="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label>
                        
                        <div className="">
                            <input
                                onClick={this.onSubmitSignIn} 
                                className="b ph3 pv2 mt4 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign in"/>
                        </div>
                        </fieldset>
                        <div className="lh-copy mt5 ml4">
                            <p onClick={() => onRouteChange('register')} href="#0" className="f6 fw6 link dim black db pointer">Register</p>

                            <a href="#0" className="f6 fw6 link dim black db">Forgot your password?</a>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin;