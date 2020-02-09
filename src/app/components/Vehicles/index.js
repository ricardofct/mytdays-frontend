import React, { Component } from 'react'
import vehiclesService from './../../services/vehicles';
import usersService from './../../services/users';
import { handleInputChange } from '../../helpers/component.helper';

export default class Vehicles extends Component {

    state = {
        users: [],
        vehicles: [],
        error: null,
        form: {}
    }

    constructor(props) {
        super(props)
        this.handleInputChange = handleInputChange.bind(this);
    }

    async componentDidMount() {
        this.getVehicle();
        this.getUsers();
    }

    getUsers = async () => {
        const { users, error } = await usersService.getUsersEntrepreneurs();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ users });
        }
    }

    getUserVehicles = async (userId) => {
        if (!userId) {
            this.getVehicles();
        }

        const { vehicles, error } = await usersService.getUserVehicles(userId);

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ vehicles });
        }
    }

    getVehicle = async () => {
        const { vehicles, error } = await vehiclesService.getVehicles();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ vehicles });
        }
    }

    createVehicle = async (event) => {
        event.preventDefault();
        const { error } = await vehiclesService.createVehicles(this.state.form);

        if (error) {
            this.setState({ error })
        } else {
            this.getVehicle();
        }
    }

    render() {
        const { vehicles, users } = this.state;
        return (
            <>
                <form onSubmit={this.createVehicle}>
                    <label>
                        Marca:
            <input type="text" name="name" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Matricula:
            <input type="text" name="plate" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Data da matricula:
            <input type="date" name="plateDate" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Proprietario:

                    <select name="ownerId" onChange={this.handleInputChange}>
                            <option value=""></option>
                            {users.map(user => (
                                <option value={user._id}>{user.email}</option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">Criar</button>
                </form>


                < table >
                    <thead>
                        <tr>
                            <th>Ativo</th>
                            <th>Nome</th>
                            <th>Matricula</th>
                            <th>Data da matricula</th>
                            <th>Proprietário</th>
                            <th>Criado em</th>
                            <th>Criado por</th>
                            <th>Atualizado em</th>
                            <th>Atualizado por</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map(
                            user => (
                                <tr key={user._id}>
                                    <td>{user.active + ''}</td>
                                    <td>{user.name}</td>
                                    <td>{user.plate}</td>
                                    <td>{user.plateDate}</td>
                                    <td>{user.ownerId.email}</td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.createdBy.email}</td>
                                    <td>{user.updatedAt}</td>
                                    <td>{user.updatedBy.email}</td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table >
            </>
        )
    }
}
