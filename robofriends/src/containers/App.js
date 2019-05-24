import React, { Component }from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

class App extends Component {
    constructor() {
        super();
        this.state = {
            robots: [],
            searchField: ''
        }
        console.log('constructor');
    }

    componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(users => this.setState({robots: users}));

         // when component mounts set state to robots

        console.log('componentDidMount');
}
    

    onSearchChange = (event) => {
        this.setState({ searchField: event.target.value})
        console.log(event.target.value);
}
        render() {
            const { robots, searchField } = this.state;
            const filterRobots = robots.filter(robot =>{
                return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
        return (!robots.length) ?
             <h1>Loading...</h1> : 
        (
            <div className='tc'>
                <h1 className='f1'>RobotFriends</h1>
                <SearchBox searchChange={this.onSearchChange}/>
                <Scroll>
                    <CardList robots={filterRobots}/>
                </Scroll>
            </div>);
        }


    }



export default App;