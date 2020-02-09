import React, { Component } from 'react'
import usersService from './../../services/users';
import workersService from './../../services/workers';
import { handleInputChange } from '../../helpers/component.helper';
import vehicles from '../../services/vehicles';

export default class Workers extends Component {

    state = {
        users: [],
        entrepreneurs: [],
        workers: [],
        vehicles: {},
        error: null,
        form: {}
    }

    constructor(props) {
        super(props)
        this.handleInputChange = handleInputChange.bind(this);
    }

    async componentDidMount() {
        this.getWorkers();
        this.getUsers();
        this.getEntrepreneurs();
    }

    getUsers = async () => {
        const { users, error } = await usersService.getUsers();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ users });
        }
    }

    getEntrepreneurs = async () => {
        const { users, error } = await usersService.getUsersEntrepreneurs();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ entrepreneurs: users });
        }
    }

    getOwnerVehicles = async (ownerId) => {
        const { vehicles, error } = await usersService.getUserVehicles(ownerId);

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ vehicles: { ...this.state.vehicles, [ownerId]: vehicles } });
        }
    }

    getWorkers = async (event) => {
        const { workers, error } = event ? await usersService.getUserWorkers(event.target.value) : await workersService.getWorkers();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ workers });
        }
    }

    createWorkers = async (event) => {
        event.preventDefault();
        const { error } = await workersService.createWorkers(this.state.form);

        if (error) {
            this.setState({ error })
        } else {
            this.getWorkers();
        }
    }

    addWorkerVehicle = async (workerId, vehicleId) => {
        const { error } = await workersService.addWorkerVehicle(workerId, vehicleId);

        if (error) {
            this.setState({ error })
        } else {
            this.getWorkers();
        }
    }

    render() {
        const { workers, users, entrepreneurs, vehicles } = this.state;
        return (
            <>
                <form onSubmit={this.createWorkers}>
                    <label>
                        Proprietario:

                                <select name="ownerId" onChange={this.handleInputChange}>
                            <option key={0} value=""></option>
                            {users.filter(user => user.permissions && user.permissions.entrepreneur).map(user => (
                                <option key={user._id} value={user._id}>{user.email}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Funcionário:

                                <select name="userId" onChange={this.handleInputChange}>
                            <option key={0} value=""></option>
                            {users.map(user => (
                                <option key={user._id} value={user._id}>{user.email}</option>
                            ))}
                        </select>
                    </label>

                    <button type="submit">Criar</button>
                </form>

                <label>
                    Filtrar lista:

                                <select name="userId" onChange={this.getWorkers}>
                        <option key={0} value=""></option>
                        {entrepreneurs.map(user => (
                            <option key={user._id} value={user._id}>{user.email}</option>
                        ))}
                    </select>
                </label>


                < table >
                    <thead>
                        <tr>
                            <th>Ativo</th>
                            <th>Empregador</th>
                            <th>Funcionário</th>
                            <th>Veiculos</th>
                            <th>Criado em</th>
                            <th>Criado por</th>
                            <th>Atualizado em</th>
                            <th>Atualizado por</th>
                        </tr>
                    </thead>
                    <tbody>
                        {workers.map(
                            user => (
                                <tr key={user._id}>
                                    <td>{user.active + ''}</td>
                                    <td>{user.ownerId.email}</td>
                                    <td>{user.userId.email}</td>
                                    <td>
                                        <ul>{user.vehicles.map(
                                            veiculo => (<li>{veiculo.name + '-' + veiculo.plate}</li>)
                                        )}
                                        </ul>
                                    </td>
                                    <td>{user.createdAt}</td>
                                    <td>{user.createdBy.email}</td>
                                    <td>{user.updatedAt}</td>
                                    <td>{user.updatedBy.email}</td>
                                    <td>
                                        <select onFocus={(event) => this.getOwnerVehicles(user.ownerId._id)} onChange={(event) => this.addWorkerVehicle(user._id, event.target.value)}>
                                            <option key={0} value=""></option>
                                            {vehicles[user.ownerId._id] && vehicles[user.ownerId._id].map(vehicle => (
                                                <option key={vehicle._id} value={vehicle._id}>{vehicle.name + ' ' + vehicle.plate}</option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </table >
            </>
        )
    }
}

