import React, { Component } from 'react'
import usersService from './../../services/users';

export default class Users extends Component {

    state = {
        users: [],
        error: null
    }

    async componentDidMount() {
        const { users, error } = await usersService.getUsers();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ users });
        }
    }

    render() {
        const { users } = this.state;
        return (
            <table>
                <thead>
                    <tr>
                        <th>Ativo</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Permissões</th>
                        <th>Último login</th>
                        <th>Tentativas restantes</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(
                        user => (
                            <tr key={user._id}>
                                <td>{user.active + ''}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.permissions ? `Básico: ${user.permissions.basic}
                                Trabalhador: ${user.permissions.worker}
                                Empresário: ${user.permissions.entrepreneur}
                                Admin: ${user.permissions.superhero} ` : ''}</td>
                                <td>{user.lastLogin}</td>
                                <td>{user.loginTries}</td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        )
    }
}
