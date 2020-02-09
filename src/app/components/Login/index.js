import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import authService from './../../services/auth'


class Login extends Component {
    state = {
        email: 'r@r.pt',
        password: '123',
        error: null
    }
    componentDidMount() {
        sessionStorage.clear('token');
    }

    doLogin = async event => {
        event.preventDefault();
        const res = await authService.login(this.state);

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
                        Email:
            <input type="text" onChange={(event) => {
                            this.setState({ ...this.state, email: event.target.value })
                        }} />
                    </label>
                    <label>
                        Password:
            <input type="text" onChange={(event) => {
                            this.setState({ ...this.state, password: event.target.value })
                        }} />
                    </label>
                    <button type="submit">Login</button>
                </form>
                {this.state.error}
            </div>
        )
    }
}

export default withRouter(Login)
