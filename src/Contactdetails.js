import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import axios from 'axios';
import { config } from './Config';


class Contactdetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactName: '',
            contactPhone: '',
            emailId: '',
            lastModified: ''
        }
    }


    componentWillReceiveProps(nextProps) {
        console.log("nextProps", nextProps);
    }

    handleClick(event, role) {
        console.log('self props', this.props.appContext)
            if (this.state.contactName.length <= 0 && this.state.contactPhone.length <= 0 && this.state.emailId.length ) {
                alert("Mandatory fields are missing");
                return;
            }
            var payload = {
                "contactName": this.state.contactName,
                "contactPhone": this.state.contactPhone,
                "emailId": this.state.emailId,
                "lastModified": this.state.lastModified
            }
            axios.post(config.apiBaseUrl + 'contact', payload)
                .then(function (response) {
                    console.log(response);
                    if (response.status === 200) {
                        console.log("Contact details Created!!");
                        alert("Contact details created!!");
                    } else {
                        console.log("some error ocurred", response.status);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                        <AppBar
                            title= "Contact Details"
                        />
                        <TextField
                            hintText="Enter your Contact Name"
                            required
                            floatingLabelText="Contact Name"
                            onChange={(event, newValue) => this.setState({ contactName: newValue })}
                        />
                        <br />
                        <TextField
                            hintText="Enter your  Contact Phone Number"
                            floatingLabelText="Contact Number"
                            onChange={(event, newValue) => this.setState({contactPhone: newValue })}
                        />
                        <br />
                        <TextField
                            hintText= "Enter Your Email Id"
                            floatingLabelText="Email Id"
                            onChange={(event, newValue) => this.setState({ emailId: newValue })}
                        />
                        <br />
                        <TextField
                            floatingLabelText="Last Modified"
                            type="date" className={"datecolor"}
                            onChange={(event, newValue) => this.setState({ lastModified: newValue })}
                        />
                        <br/>
                          
                        <RaisedButton label="Submit" primary={true} style={style}
                            onClick={(event) => this.handleClick(event, this.props.role)} />

                    </div>
                </MuiThemeProvider>
            </div>
        );
    }
}

const style = {
    margin: 15,
};

export default Contactdetails;
