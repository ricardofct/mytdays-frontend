import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import authService from './../../services/auth'
import { handleInputChange } from '../../helpers/component.helper';


class Register extends Component {
    state = {
        error: null
    }

    constructor(props) {
        super(props)
        this.handleInputChange = handleInputChange.bind(this);
    }

    componentDidMount() {
    }

    doLogin = async event => {
        event.preventDefault();
        const res = await authService.register(this.state.form);
        debugger
        if (res.error) {
            this.setState({ error: res.error })
        } else {
            sessionStorage.setItem('token', res);
            this.props.history.push('/users');
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.doLogin}>
                    <label>
                        Username:
            <input type="text" name="name" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Email:
            <input type="text" name="email" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Password:
            <input type="text" name="password" onChange={this.handleInputChange} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                {this.state.error}
            </div>
        )
    }
}

export default withRouter(Register)
