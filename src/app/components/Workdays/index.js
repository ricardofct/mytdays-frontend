import React, { Component } from 'react'
import workdaysService from './../../services/workdays';
import workersService from './../../services/workers';
import { handleInputChange } from '../../helpers/component.helper';
import vehicles from '../../services/vehicles';

export default class Workers extends Component {

    state = {
        workdays: [],
        vehicles: [],
        error: null,
        form: {}
    }

    constructor(props) {
        super(props)
        this.handleInputChange = handleInputChange.bind(this);
    }

    getWorkerVehicles = async () => {
        const { vehicles, error } = await workersService.getWorkerVehicles();

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ vehicles });
        }
    }


    createWorkday = async (e) => {
        e.preventDefault();
        const { error } = await workdaysService.creatWorkerdayStart(this.state.form);

        if (error) {
            this.setState({ error });
        } else {
            this.getWorkdays();
        }
    }

    createWorkdayEnd = async (e, id) => {
        e.preventDefault();
        const { flagEnd, euroEnd, kmEnd, fuel } = this.state.form;

        const { error } = await workdaysService.creatWorkerdayEnd({ flag: flagEnd, euro: euroEnd, km: kmEnd, fuel, id });

        if (error) {
            this.setState({ error });
        } else {
            this.getWorkdays();
        }
    }

    getWorkdays = async () => {
        const { workdays, error } = await workdaysService.getWorkerdays();

        console.log(workdays)

        if (error) {
            this.setState({ error });
        } else {
            this.setState({ workdays });
        }
    }


    async componentDidMount() {
        this.getWorkdays();
        this.getWorkerVehicles();
    }

    render() {
        const { workdays, vehicles } = this.state;
        console.log(workdays);
        return (
            <>
                <form onSubmit={this.createWorkday}>
                    <label>
                        Veiculos:

                                <select name="vehicleId" onChange={this.handleInputChange}>
                            <option key={0} value=""></option>
                            {vehicles.map(vehicle => (
                                <option key={vehicle._id} value={vehicle._id}>{vehicle.plate} {vehicle.name}</option>
                            ))}
                        </select>
                    </label>
                    <label>
                        Bandeirada:

                        <input name="flag" type="text" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Euros:

                        <input name="euro" type="text" onChange={this.handleInputChange} />
                    </label>
                    <label>
                        Km's:

                        <input name="km" type="text" onChange={this.handleInputChange} />
                    </label>

                    <button type="submit">Criar</button>
                </form>



                < table >
                    <thead>
                        <tr>
                            <th>Veiculo</th>
                            <th colSpan="3">Entrada</th>
                            <th colSpan="4">Saída</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr >
                            <td></td>
                            <td>Bandeirada</td>
                            <td>Euros</td>
                            <td>Km's</td>
                            <td>Bandeirada</td>
                            <td>Euros</td>
                            <td>Km's</td>
                            <td>Gasoleo</td>
                        </tr>
                        {workdays.map(
                            workday => (
                                <tr key={workday._id}>
                                    <td>{workday.vehicleId.name}</td>
                                    <td>{workday.startDate.flag}</td>
                                    <td>{workday.startDate.euro}</td>
                                    <td>{workday.startDate.km}</td>
                                    {workday.endDate ? (<>
                                        <td>{workday.endDate && workday.endDate.flag}</td>
                                        <td>{workday.endDate && workday.endDate.euro}</td>
                                        <td>{workday.endDate && workday.endDate.km}</td>
                                        <td>{workday.endDate && workday.fuel}</td>
                                    </>) :
                                        (<td colSpan="4">
                                            <form onSubmit={(event) => { this.createWorkdayEnd(event, workday._id) }}>
                                                <label>
                                                    Bandeirada:

                        <input name="flagEnd" type="text" onChange={this.handleInputChange} />
                                                </label>
                                                <label>
                                                    Euros:

                        <input name="euroEnd" type="text" onChange={this.handleInputChange} />
                                                </label>
                                                <label>
                                                    Km's:

                        <input name="kmEnd" type="text" onChange={this.handleInputChange} />
                                                </label>
                                                <label>
                                                    Gasoleo:

                        <input name="fuel" type="text" onChange={this.handleInputChange} />
                                                </label>

                                                <button type="submit">Criar</button>
                                            </form>
                                        </td>)
                                    }
                                </tr>
                            )
                        )}
                    </tbody>
                </table >
            </>
        )
    }
}

