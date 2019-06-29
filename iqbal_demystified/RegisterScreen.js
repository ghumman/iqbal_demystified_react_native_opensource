import React from 'react'
import {ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";

// import SigninPage from './SigninPage'

// for formatting
// import './TabView1.css';

// var $ = require('jquery')
// window.jQuery = $

class Register extends React.Component {

	constructor(props) {
		super(props)
		this.state ={

		        signinConfirmation: "",
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password1: '',
			password2: '',
			errorMessage: '',
			password: ''
		}

		this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword1 = this.handleChangePassword1.bind(this);
		this.handleChangePassword2 = this.handleChangePassword2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeFirstName(event) {
		this.setState({firstName: event.target.value})
	}

	handleChangeLastName(event) {
		this.setState({lastName: event.target.value})
	}

	handleChangeUsername(event) {
		this.setState({username: event.target.value})
	}

	handleChangeEmail(event) {
		this.setState({email: event.target.value})
	}

	handleChangePassword1(event) {
		this.setState({password1: event.target.value})
	}

	handleChangePassword2(event) {
		this.setState({password2: event.target.value})
	}

	onSubmitSignin = () => {
/*
		this.props.history.push({
			pathname: 'SigninPage',
			state: {none: 'none'}
		})
*/

		console.log("Inside onSubmitSignin");
		this.props.navigation.navigate('Signin');
	}



	// handleSubmit
	handleSubmit(event) {

		console.log("first name: ");
		console.log(this.state.firstName);

		console.log("last name: ");
		console.log(this.state.lastName);

		console.log("username: ");
		console.log(this.state.username);

		console.log("email: ");
		console.log(this.state.email);

		console.log("password1: ");
		console.log(this.state.password1);

		console.log("password2: ");
		console.log(this.state.password2);

		var that = this;

		if (this.state.password1.trim() == this.state.password2.trim()){
			this.setState({password: this.state.password1})
					try{
						// $.ajax({
						fetch(
							// url: 'https://www.icanmakemyownapp.com/iqbal/v3/create-account.php',
							'https://www.icanmakemyownapp.com/iqbal/v3/create-account.php',{
                					// type: 'POST',
                					method: 'POST',
                 					// dataType: 'text',
							headers: {
							    // 'Content-Type': 'text/plain',
							    'Content-Type': 'application/x-www-form-urlencoded'
							},
		 					// data: {first_name: this.state.firstName, last_name: this.state.lastName, username: this.state.username, password: this.state.password, email: this.state.email},
		 					// data: {first_name: this.state.firstName, last_name: this.state.lastName, username: this.state.username, password: this.state.password, email: this.state.email},
		 					body: "first_name=" + that.state.firstName + "&last_name=" + that.state.lastName + "&username=" + that.state.username + "&password=" + that.state.password + "&email=" + that.state.email
						}).then(async function(data){ 
							data.text().then(async function(data) {
                 					// success: (data, status, username, message) => {	// success funciton starts

								if (data.trim() == "Your account has been created! Please check your email and activate your account by clicking on a link that we have sent you in the email. Don't forget to check in your Junk folder.")	{
									Alert.alert(data);
									console.log("Successfully Registered");
															that.setState({signinConfirmation: "done"})

						    that.props.navigation.navigate('Home', { profileUsername: that.state.username, profilePassword: that.state.password, profileSigninConfirmation: that.state.signinConfirmation });
/*
				  		    this.props.history.push({
					    	    	pathname: '/',
					    	    	state: { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation }
				  		    })	// this.props.history.push ends
*/

								}	// if data.trim... ends
								// else if account not registered
								else {
									Alert.alert("Unable to register your account:" + data);
									// this.setState({errorMessage : "Unable to register your account:" + data});
									// Alert.alert("Unable to register your account:" + data);
								}
              // }	// success function ends
	});	// data.text().then ends
      	})       // then async func ends

	// 					});	// ajax call ends
					}	// try ends
					catch(err){
						Alert.alert("inside catch err");
						Alert.alert(err);
						// this.state.errorMessage = err;
					}	// catch ends
		}	// if both passwords are same end
		else {
			Alert.alert("Passwords are not same");
			// this.setState({errorMessage: "Passwords are not same"})
		}
		
		event.preventDefault()
	}	// handleSubmit(event) ends
	componentDidMount() {
		// window.scrollTo(0, 0)
	}
/*

			<div class="text-center">
				<h1 class="text-center"> REGISTER </h1>
				<form onSubmit={this.handleSubmit}>
					<label>
				    First Name:
				    <input type="text" value={this.state.firstName} onChange={this.handleChangeFirstName} />
				  </label>
				  <p></p>

				  <label>
				    Last Name:
				    <input type="text" value={this.state.lastName} onChange={this.handleChangeLastName} />
				  </label>
				  <p></p>

				  <label>
				    Username:
				    <input type="text" value={this.state.username} onChange={this.handleChangeUsername}/>
				  </label>
				  <p></p>

				  <label>
				    Email:
				    <input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
				  </label>
				  <p></p>

				  <label>
				    Password:
				    <input type="password" value={this.state.password1} onChange={this.handleChangePassword1}/>
				  </label>
				  <p></p>

				  <label>
				    Password (again):
				    <input type="password" value={this.state.password2} onChange={this.handleChangePassword2}/>
				  </label>
				  <p></p>

				  <input type="submit" value="REGISTER" />
				</form>
				<p onClick={() => this.onSubmitSignin()}>

					Already Registered?{"\n"}
					Login Here

				</p>
			</div>
*/

	render() {
		return (
			<View>
				<Text>
					REGISTER
				</Text>
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='name'
				  style={{height: 40}}
				  placeholder="First Name"
				  onChangeText={(text) => this.setState({firstName: text})}
				/>
			
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='name'
				  style={{height: 40}}
				  placeholder="Last Name"
				  onChangeText={(text) => this.setState({lastName: text})}
				/>


				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='username'
				  style={{height: 40}}
				  placeholder="Username"
				  onChangeText={(text) => this.setState({username: text})}
				/>
			
				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='email'
				  style={{height: 40}}
				  placeholder="Email"
				  onChangeText={(text) => this.setState({email: text})}
				/>

				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  autoCompleteType='password'
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="Password"
				  onChangeText={(text) => this.setState({password1: text})}
				/>

				<TextInput
				  autoCapitalize= 'none'
				  autoCorrect= {false}
				  secureTextEntry={true}
				  style={{height: 40}}
				  placeholder="Password (again)"
				  onChangeText={(text) => this.setState({password2: text})}
				/>
				<Button onPress={this.handleSubmit} title='REGISTER'/>
				<TouchableHighlight onPress={() => this.onSubmitSignin()}>					
					<Text>
						Already Registered?{"\n"}
						Login Here
					</Text>
		
				</TouchableHighlight>

			</View>
		)	// return ends
	}	// render function ends
}

export default Register
