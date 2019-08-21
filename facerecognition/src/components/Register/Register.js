import React from 'react';

class Register extends React.Component {
    // create State
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }
    // get the values from signin form
    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }
    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
        // event will use state to 
    onSubmitSignIn = () => {
    
        /* 
            Note: fetch by default does a get request, but we need todo a post request
            to do that we will pass a second parameter as an object that describes what
            the request will be. 
        */
        // this will send credentials to server
        fetch('https://still-oasis-63584.herokuapp.com/register', {
            method: 'post',
            headers: {'content-Type': 'application/json'},
            body: JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
            })
        })
            .then(res => res.json())
            .then(user => {
                if(user.id){
                    this.props.loadUser(user); // 1. load user
                    this.props.onRouteChange('home'); // 2. sends user to home page
                }
                // else {
                //     console.log('not successful')
                // }
            })
        }
    render() { 
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-2 center">
                <main className="pa4 black-80">
                    <div className="measure center">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f4 fw6 ph0 mh0">Register</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="text " name="name" id="name"
                            onChange={ this.onNameChange }/>
                        </div>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="email" name="email-address"  id="email-address"
                            onChange={ this.onEmailChange }/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                            <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                            type="password" name="password"  id="password"
                            onChange = { this.onPasswordChange }/>
                        </div>
                            <input
                                onClick={this.onSubmitSignIn} 
                                className="b mt3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Sign Up"/>
                        </fieldset>

                    </div>
                </main>
            </article>
        );
    }

} 
export default Register;