import React, { Suspense, lazy, Component } from 'react';
import {
    Switch,
    Route,
    Redirect,
    withRouter,
    Link
} from "react-router-dom";
import decode from "jwt-decode";

const Users = lazy(() => import('./components/Users'));
const Vehicles = lazy(() => import('./components/Vehicles'));
const Workers = lazy(() => import('./components/Workers'));
const Workdays = lazy(() => import('./components/Workdays'));

class Routes extends Component {
    tokenValidation() {
        const token = sessionStorage.getItem('token');
        if (!token) {
            return false;
        }

        const now = new Date();
        const { exp } = decode(token);
        if (now.valueOf > exp) {
            return false;
        }

        return true;
    }
    render() {
        return (
            <>
                <nav>
                    <Link to="/users" >
                        Utilizadores
                        </Link>
                    <Link to="/vehicles" >
                        Veiculos
                        </Link>
                    <Link to="/workers" >
                        Workers
                        </Link>
                    <Link to="/workdays" >
                        Workdays
                        </Link>
                </nav>

                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        {this.tokenValidation() ? <Route exact path="/users" component={Users} /> : <Redirect to="/" />}
                        {this.tokenValidation() ? <Route exact path="/vehicles" component={Vehicles} /> : <Redirect to="/" />}
                        {this.tokenValidation() ? <Route exact path="/workers" component={Workers} /> : <Redirect to="/" />}
                        {this.tokenValidation() ? <Route exact path="/workdays" component={Workdays} /> : <Redirect to="/" />}
                    </Switch>
                </Suspense>
            </>
        );
    }
}

export default withRouter(Routes);