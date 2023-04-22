import React, { Component } from "react";
import minimartService from "../services/minimart.service";

export default class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.sendLogin = this.sendLogin.bind(this);
        this.preLogin = this.preLogin.bind(this);

        this.state = {
            username: "",
            password: "",
            isAdmin: false,
            submitted: false,

            loggedIn: false
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    sendLogin() {
        var data = {
            username: this.state.username,
            password: this.state.password
        };

        minimartService.login(data)
            .then(response => {
                if (response.data) {
                    this.setState({
                        username: response.data.username,
                        role: response.data.role,
                        loggedIn: true
                    })
                }
                console.log(response.data);
            })
            .catch(e => {
              console.log(e);
            });
    }

    preLogin() {
        this.setState({
            username: "",
            role: "User",

            loggedIn: false
        });
    }
    
    render() {
        return (
            <div className="submit-form">
                {this.state.loggedIn ? (
                    <div>
                        <h4>Successful login!</h4>
                    </div>
                ) : (
                    <div>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                required
                                value={this.state.username}
                                onChange={this.onChangeUsername}
                                name="username"
                            />
                        </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={this.state.password}
                            onChange={this.onChangePassword}
                            name="password"
                        />
                        </div>
                        <button onClick={this.sendLogin} className="btn btn-success">
                            Enter
                        </button>
                    </div>
                )

                }

            </div>
        )
    }

}