import React from "react";
import { StyleSheet, FlatList, SectionList, Alert, View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";

// import Divider from '@material-ui/core/Divider';
// import { Divider } from 'react-native-elements';

// import StaticContentService from './StaticContentServiceYamlTest2';
import StaticContentService from './StaticContentServiceYamlTest';

var  YAML = require('yaml');

class ListPoemScreen extends React.Component {
        constructor(props) {
    super(props);   
    this.state = {  
                
                        // following three are normally passed to every page
            username: "hello",
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
            poemObjects: []
    }   // this.state ends
        }       // constructor ends
        componentDidMount() {
	// Alert.alert('inside componentDidMount')
	console.log('inside componentDidMount')
        // retrive the data
                try {
			console.log('value of this.props.navigation.getParam(profileSigninConfirmation)')
			console.log(this.props.navigation.getParam('profileSigninConfirmation'))
                        this.setState({signinConfirmation: this.props.navigation.getParam('profileSigninConfirmation')});
	console.log('setState signin confirmation passed')
                        this.setState({username: this.props.navigation.getParam('profileUsername')});
	console.log('setState username passed')
                        this.setState({password: this.props.navigation.getParam('profilePassword')});
	console.log('setState password passed')
                        let bookName = this.props.navigation.getParam('detailBook');
	console.log('setState bookName passed')
                        this.getPoemList(bookName);
	console.log('setState getPoemList passed')
                }
                catch(e) {
                        // Alert.alert("Inside catch");
                        console.log("Inside catch");
                        console.log("Error");
                        console.log(e);
                }
        }

	getPoemList(listId) {
		// Alert.alert('bookName reaceived is {bookname}')
		console.log('Inside getPoemList')
		console.log('bookName reaceived is {listId}')
		// Alert.alert(bookname)
		console.log(listId)

    // var response = StaticContentService.getPoemList(listId).then(function(result)){

    var that = this;
    StaticContentService.getPoemList(listId).then(function(response){

    	console.log("response: ");
    	console.log(response);
		
    var yamlObject = YAML.parse(response)
        
    console.log("yamlObject : ")
    console.log(yamlObject)


that.setState({poemList: yamlObject.sections});

    console.log("that.state.poemList : ")
    console.log(that.state.poemList);

    that.setState({poemListName: that.state.poemList.poems});

    console.log("that.state.poemListName : ")
    console.log(that.state.poemListName);

    console.log("yamlObject.name.text[0]")
    console.log(yamlObject.name[0].text)


    console.log("checkValueVar");

    var checkValueVar = [];

    console.log("Value of yamlObject.sections.length");
    console.log(yamlObject.sections.length);

    console.log("Value of yamlObject.sections[0].sectionName.length");
    console.log(yamlObject.sections[0].sectionName.length);

    for (var i=0; i<yamlObject.sections.length; i++) {
        try {
                if (yamlObject.sections[i].sectionName[0]) {
                        console.log(" sectionName exists" );
                        for (var j=0; j<yamlObject.sections[i].sectionName.length; j++)
                                                that.state.poemText.push({"text" : yamlObject.sections[i].sectionName[j].text, "id" : '0'});
                                        }
                }
        catch(e) {
                if (yamlObject.sections[i].poems[0].poemName[0]) {
                        console.log(" poems[0].poemName[0] exists" );
                        for (var j=0; j<yamlObject.sections[i].poems.length; j++){
                                for (var k=0; k<yamlObject.sections[i].poems[j].poemName.length; k++)
                                                        that.state.poemText.push({"text" : yamlObject.sections[i].poems[j].poemName[k].text, "id" : yamlObject.sections[i].poems[j].id})
                                                that.setState({poemObject: yamlObject.sections[i].poems[j]})
                                        }
                                }       // if yamlObject.... ends
                        }       // catch ends
                }       // for ends

    console.log("Value of poemObject: ");
    console.log(that.state.poemObject);

    console.log("checkValueVar");
    console.log(checkValueVar);
    console.log("yamlObject.sections[0].sectionName[0].text");
    console.log(yamlObject.sections[0].sectionName[0].text);


    try {
                  that.state.bookName = yamlObject.sections[0].sectionName.map((item, key) =>
                        <li key={item.text}>{item.text}</li>
                  )
    }
    catch(e) {
            console.log("caught error");
    }
    console.log("bookName: ");
    console.log(that.state.bookName);

    that.setState({bookNameUrdu: yamlObject.name[0].text});
    that.setState({bookNameEnglish: yamlObject.name[1].text});

    that.setState({bookSections: yamlObject.sections});

    console.log("bookNameUrdu: ");
    // console.log(that.state.bookNameUrdu + "");
    console.log(yamlObject.name[0].text);
    console.log("bookNameEnglish: ");
    // console.log(that.state.bookNameEnglish + "");
    console.log(yamlObject.name[1].text);

    console.log("yamlObject.sections[1].poems[0].poemName[0].text: ");
    console.log(yamlObject.sections[1].poems[0].poemName[0].text);

    that.setState({onePoem: yamlObject.sections[1].poems[0].poemName[0].text});

    

	});

    // console.log("response.name: ");
    // console.log(response.default);

    // var yamlObject = YAML.parse(response)
        
    // console.log("yamlObject : ")
    // console.log(yamlObject)

		

	}



  render() {

    var item3 = this.state.poemText.map( (item) => 
                        <Text key={item.index} onClick={() => this.onSubmit(item.id)}> {item.text}</Text> 
                );
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text>
                                <Text>
                                        {this.state.bookNameUrdu}
                                </Text>
                                <Text>
                                        {this.state.bookNameEnglish}
                                </Text>
                        </Text>
				{/*
                                <Text>
                                        {item3}
                                </Text>
				*/}
        <FlatList
          data={
		this.state.poemText
          }
          renderItem={({item}) => <Text style={styles.item} >{item.text}</Text>}
        />

        {/*<Text>{this.state.navigation.getParam(profileUsername)}</Text>*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    textAlign: 'center',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
})


export default ListPoemScreen;
