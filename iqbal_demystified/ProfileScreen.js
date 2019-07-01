import React from 'react'
import {Picker, ScrollView, TextInput, Button, TouchableHighlight, StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import StaticContentService from './StaticContentServiceYaml'

import { Table, TableWrapper, Row, Rows, Col } from 'react-native-table-component';

import AsyncStorage from '@react-native-community/async-storage';

// for formatting
// import './TabView1.css';

// import PoemPage from './PoemPage';

// import ReactTable from 'react-table'
// import 'react-table/react-table.css'

// var $ = require('jquery')
// window.jQuery = $

var  YAML = require('yaml');

const USERNAME = "username";
const PASSWORD = "password";
const MESSAGE = "message";

class ProfilePage extends React.Component {


	  constructor(props) {
		   // let  YAML = require('yamljs');
		      super(props);
		      this.state = {

			      	    username: "",
			      	    password: "", 
			            signinConfirmation: "",

			            pictures: [],
			      	    listId: "List_001",
			      	    poemList: [],
			      	    poemListName: [],
			      	    bookName: [],
			      	    bookNameUrdu: "",
				    bookNameEnglish: "",
				    bookSections: [],
				    onePoem: "",
				    poemText: [],
				    poemObjects: [],

			      	    leaderBoardText: [],
			      	    leaderBoardTextEven: [], 
			      	    leaderBoardTextOdd: [], 
			      	    leaderBoardTextEvenDiscussion: [], 
			      	    leaderBoardTextEvenDiscussionName: [], 
			      	    leaderBoardTextOddDiscussion: [],
			      	    leaderBoardTextOddDiscussionName: [],
			      	    leaderBoardTextDiscussionConcat: [],
			      	    leaderBoardTextEvenWord: [], 
			      	    leaderBoardTextEvenWordName: [], 
			      	    leaderBoardTextOddWord: [],
			      	    leaderBoardTextOddWordName: [],
			      	    leaderBoardTextWordConcat: [],

			      	    dropdownState: 'discussion',
tableHead: ['', 'Head1', 'Head2', 'Head3'],
      tableTitle: ['Title', 'Title2', 'Title3', 'Title4'],
      tableData: [
        ['1', '2', '3'],
        ['a', 'b', 'c'],
        ['1', '2', '3'],
        ['a', 'b', 'c']
      ]

			          };
		this.dropChange = this.dropChange.bind(this);

		  	}
  dropChange(event) {
	      this.setState({dropdownState: event.target.value});
	    }


	componentDidUpdate(prevProps, prevState) {
		
		  console.log("this.state.leaderBoardText")
		  console.log(this.state.leaderBoardText)

		  console.log("this.state.leaderBoardTextEven")
		  console.log(this.state.leaderBoardTextEven)

		  console.log("this.state.leaderBoardTextEvenDiscussion")
		  console.log(this.state.leaderBoardTextEvenDiscussion)

		  console.log("this.state.leaderBoardTextOddDiscussion")
		  console.log(this.state.leaderBoardTextOddDiscussion)

		  console.log("this.state.leaderBoardTextEvenWord")
		  console.log(this.state.leaderBoardTextEvenWord)

		  console.log("this.state.leaderBoardTextOddWord")
		  console.log(this.state.leaderBoardTextOddWord)


	}

	  componentDidMount() {
		  // window.scrollTo(0, 0)

	      this.get_leader_board()	      
	      // retrive the data
		   		try {
		  console.log(this.state.leaderBoardTextOddWord)
	  				this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
	  				this.setState({username: this.props.location.state.profileUsername});
	  				this.setState({password: this.props.location.state.profilePassword});
		  		}

				catch(e) {
					console.log("Inside catch");
				}

		    // this.getPoemList("List_001");
		      // fetch("https://api.example.com/items")
		      // fetch("http://icanmakemyownapp.com/iqbal/v3/get-list-of-lists.php", { mode: 'no-cors'})
		      // fetch('/get-list-of-lists.php')
		      // fetch('https://randomuser.me/api/?results=500')
		     /*
		      fetch('/get-list.php?listId=List_001', {
		      	method: 'get',
			headers: {'Content-Type':'application/text'},
		      })
		        .then(res => {
				return res.text()
			}).then((responseJson) => {
				// console.log(responseJson);
				this.setState({pictures: responseJson});
			})
			*/
		    }

	  signMeIn = () => {

		  if (this.state.username == "") {
		  	this.props.history.push({
			    pathname: '/RegisterPage',
			    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
		  	})
		  }

	  }

	  changePassword = () => {
		/*
	  	this.props.history.push({
	  		pathname: '/ChangePasswordPage',
			state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
		*/
		this.props.navigation.navigate('ChangePassword', { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: this.state.signinConfirmation });

	  }

	  signOut = () => {
		/*
		
	  	this.props.history.push({
	  		pathname: '/',
			state: { profileSigninConfirmation : "", profileUsername : "", profilePassword: ""}
	  	})
		*/
AsyncStorage.removeItem(USERNAME);
AsyncStorage.removeItem(PASSWORD);
AsyncStorage.removeItem(MESSAGE);
	console.log("All store variables are removed");

		this.props.navigation.navigate('Home', { profileUsername: "", profilePassword: "", profileSigninConfirmation: "" });

	  }


   async get_leader_board() {

	var leaderBoardTextLocal = []
	var leaderBoardTextEvenLocal = []
	var leaderBoardTextOddLocal = [] 
	var leaderBoardTextEvenDiscussionLocal = []
	var leaderBoardTextOddDiscussionLocal = []
	var leaderBoardTextEvenWordLocal = []
	var leaderBoardTextOddWordLocal = []

	           console.log("Inside get_leaser_board")
		var that = this;
			           try{

					                   // $.ajax({
							fetch(
							// url: 'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',
							'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',{
								                           // type: 'GET',
								                           method: 'GET',
								                           // dataType: 'text',
							headers: {
							    // 'Content-Type': 'text/plain',
							    'Content-Type': 'application/x-www-form-urlencoded'
							}
						}).then(async function(data){ 
							data.text().then(async function(data) {
								                           // success: (data) => {    
												                                   console.log("data");
												                                   console.log(data);

												                                   // this.state.leaderBoardText = data.split(",");
												                                   leaderBoardTextLocal = data.split(",");
												                                   // console.log("ajax: this.state.leaderBoardText");
												                                   // console.log(this.state.leaderBoardText);
												                                   // this.state.leaderBoardText.splice(-1,1);
												                                   leaderBoardTextLocal.splice(-1,1);
												                                   // console.log("ajax: this.state.leaderBoardText");
												                                   // console.log(this.state.leaderBoardText);
												                                   for (var i = 0; i < leaderBoardTextLocal.length; i++) {
																	                                           if(i % 2 === 0) { 
																							                                                   leaderBoardTextEvenLocal.push(leaderBoardTextLocal[i]);
																							                                           }
																	                                           else {
																							                                                   leaderBoardTextOddLocal.push(leaderBoardTextLocal[i]);
																							                                           }
																	                                   }
												                                   for (var i = 0; i < leaderBoardTextEvenLocal.length; i++) {
																	                                           if(i < 10 ) { 
																							                                                   leaderBoardTextEvenDiscussionLocal.push(leaderBoardTextEvenLocal[i]);
																							                                                   leaderBoardTextOddDiscussionLocal.push(leaderBoardTextOddLocal[i]);
																							                                                   that.state.leaderBoardTextEvenDiscussionName.push({"name" : leaderBoardTextEvenLocal[i]});
																							                                                   that.state.leaderBoardTextOddDiscussionName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   that.state.leaderBoardTextDiscussionConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
																	                                           else {
																							                                                   leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[i]);
																							                                                   leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[i]);
																							                                                   that.state.leaderBoardTextEvenWordName.push({"name": leaderBoardTextEvenLocal[i]});
																							                                                   that.state.leaderBoardTextOddWordName.push({"points": leaderBoardTextOddLocal[i]});
																							                                                   that.state.leaderBoardTextWordConcat.push({"name" : leaderBoardTextEvenLocal[i], "points": leaderBoardTextOddLocal[i]});
																							                                           }
	        }


					   that.setState({leaderBoardText: leaderBoardTextLocal})
					   that.setState({leaderBoardTextEven: leaderBoardTextEvenLocal})
					   that.setState({leaderBoardTextOdd: leaderBoardTextOddLocal})
					   that.setState({leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal})
					   that.setState({leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal})
					   that.setState({leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal})
					   that.setState({leaderBoardTextOddWord: leaderBoardTextOddWordLocal})
					   // this.setState({leaderBoardTextDiscussionConcat: [leaderBoardTextEvenDiscussionLocal,leaderBoardTextOddDiscussionLocal]})

												   
	});	// data.text().then ends
      	})       // then async func ends
	// } // success finishes 
// }) 
																									           }catch(err){
																										                   Alert.alert("inside catch err");
																												                   Alert.alert(err);
																														                   // this.message = err;
																																           }
																																						           console.log("messageSher sent to send sher message function");
        // console.log(this.messageSher);
												                                   console.log("ajax: that.state.leaderBoardTextEvenDiscussion");
												                                   console.log(that.state.leaderBoardTextEvenDiscussion);

	    }



			render() {




	let signinTag
	var signinMessageLocal = ""
	if (this.state.signinConfirmation  === "done") {
		signinMessageLocal = this.state.username.charAt(0).toUpperCase()
	  signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
	}
	else {
		signinMessageLocal = "Sign In"
	  signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
	}

				var itemOddWord = this.state.leaderBoardTextOddWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenWord = this.state.leaderBoardTextEvenWord.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemOddDiscussion = this.state.leaderBoardTextOddDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussion = this.state.leaderBoardTextEvenDiscussion.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item}</li>
					<Text key={item}> {item}</Text>
					// txt => <p>{txt}</p>	
				);

				var itemEvenDiscussionName = this.state.leaderBoardTextEvenDiscussionName.map( (item) =>
					// <li key={item.index}> {item.text} : {item.id}</li>
					// <li key={item}> {item.name}</li>
					<Text key={item}> {item.name}</Text>
					// txt => <p>{txt}</p>	
				);

				const columns = [{
					    Header: 'Leaderboard Name',
					    accessor: 'name' // String-based value accessors!
					  }, {
					    Header: 'Points',
					    accessor: 'points' // String-based value accessors!
					  }]
				const tableHeader = ['Leaderboard Name', 'Points']
const concatData = [this.state.leaderBoardTextEvenDiscussionName, this.state.leaderBoardTextOddDiscussionName]

	var myTable = "" 
	
	if (this.state.dropdownState === 'discussion') {
	myTable = 
        <Table>
 <Row data={tableHeader} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
<TableWrapper style={styles.wrapper}>
		

            <Col data={itemEvenDiscussion} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
            <Col data={itemOddDiscussion} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
</TableWrapper>
        </Table>
	}
	else {
	myTable = 
        <Table>
 <Row data={tableHeader} flexArr={[1, 1]} style={styles.head} textStyle={styles.text}/>
<TableWrapper style={styles.wrapper}>

            <Col data={itemEvenWord} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
            <Col data={itemOddWord} style={styles.title} heightArr={[28,28,28,28,28,28,28,28,28,28]} textStyle={styles.text}  />
</TableWrapper>
        </Table>
	}

/*

	var myTable = "" 
	
	if (this.state.dropdownState === 'discussion') {
		myTable = <ReactTable data={this.state.leaderBoardTextDiscussionConcat} columns={columns} />
	}
	else {
		myTable = <ReactTable data={this.state.leaderBoardTextWordConcat} columns={columns} />
	}
*/


/*

					<div>

						
						
					
			<div class="text-right">
	  {signinTag}
			</div>
       	   <h1 class="text-center">My Profile</h1>
						<div class="text-center">
					        <p>Now you can write comments!</p>
					        <p>You can also vote to others' comments!</p>
					        <p>More profile features coming soon!</p>

						
						<button onClick={() => this.changePassword()} > CHANGE PASSWORD </button>	
						
						<button onClick={() => this.signOut()} > SIGN OUT </button>	
						</div>
					<p>
					<select value={this.state.dropdownState} onChange={this.dropChange}>
					  <option selected value="discussion">Discussion</option>
					  <option value="word">Word Meanings</option>
					</select>
					</p>

					{myTable}




					</div>
*/
const state = this.state;
				return (
				<View>
       	   			<Text>My Profile</Text>
					        <Text>Now you can write comments!</Text>
					        <Text>You can also vote to others' comments!</Text>
					        <Text>More profile features coming soon!</Text>

					<View>	
						<Button onPress={() => this.changePassword()}  title='CHANGE PASSWORD' />	
					</View>	
					<View>
						
						<Button onPress={() => this.signOut()} title= 'SIGN OUT' />	
					</View>

						<View>

						<Picker he
						  selectedValue={this.state.dropdownState}
						  // style={{height: 50, width: 100}}
						  onValueChange={(itemValue, itemIndex) =>
						    this.setState({dropdownState: itemValue})
						  }>
						<Picker.Item label="Discussion" value="discussion" />
						<Picker.Item label="Word Meanings" value="word" />
						</Picker>
						</View>
					{myTable}

				


				</View>

				)
			}
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 28,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' }
});
		      // return <h1>I got following message : {this.props.location.state.detail}</h1>
export default ProfilePage
