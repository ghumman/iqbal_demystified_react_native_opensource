import React from 'react';
import {
  Picker,
  ScrollView,
  Button,
  StyleSheet,
  Alert,
  View,
  Text,
} from 'react-native';

import {
  Table,
  TableWrapper,
  Row,
  Col,
} from 'react-native-table-component';

import AsyncStorage from '@react-native-community/async-storage';


const USERNAME = 'username';
const PASSWORD = 'password';
const MESSAGE = 'message';

class ProfilePage extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      username: '',
      password: '',
      signinConfirmation: '',

      pictures: [],
      listId: 'List_001',
      poemList: [],
      poemListName: [],
      bookName: [],
      bookNameUrdu: '',
      bookNameEnglish: '',
      bookSections: [],
      onePoem: '',
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
    };

    this.dropChange = this.dropChange.bind(this);
  }

  static navigationOptions = {
    title: 'My Profile',
    headerStyle: {},
    headerTintColor: 'red',
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      textAlign: 'center',
    },
  };

  dropChange(event: any) {
    this.setState({ dropdownState: event.target.value });
  }


  componentDidMount() {
    try {
      this.setState({
        signinConfirmation: this.props.navigation.getParam(
          'profileSigninConfirmation',
        ),
      });
      this.setState({
        username: this.props.navigation.getParam('profileUsername'),
      });
      this.setState({
        password: this.props.navigation.getParam('profilePassword'),
      });
      this.get_leader_board();
      console.log(this.state.leaderBoardTextOddWord);
    } catch (e) {
      console.log('Inside catch');
    }
  }

  signMeIn = () => {
    if (this.state.username == '') {
      this.props.history.push({
        pathname: '/RegisterPage',
        state: {
          profileSigninConfirmation: this.state.signinConfirmation,
          profileUsername: this.state.username,
          profilePassword: this.state.password,
        },
      });
    }
  };

  myDownloads = () => {
    console.log('this.state.username');
    console.log(this.state.username);

    console.log('this.state.password');
    console.log(this.state.password);
    this.props.navigation.navigate('DownloadAudios', {
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      profileSigninConfirmation: this.state.signinConfirmation,
    });
  };

  changePassword = () => {
    console.log('this.state.username');
    console.log(this.state.username);

    console.log('this.state.password');
    console.log(this.state.password);
    this.props.navigation.navigate('ChangePassword', {
      profileUsername: this.state.username,
      profilePassword: this.state.password,
      profileSigninConfirmation: this.state.signinConfirmation,
    });
  };

  signOut = () => {
    AsyncStorage.removeItem(USERNAME);
    AsyncStorage.removeItem(PASSWORD);
    AsyncStorage.removeItem(MESSAGE);
    console.log('All store variables are removed');

    this.props.navigation.navigate('Home', {
      profileUsername: '',
      profilePassword: '',
      profileSigninConfirmation: '',
    });
  };

  async get_leader_board() {
    let leaderBoardTextLocal = [];
    const leaderBoardTextEvenLocal: any = [];
    const leaderBoardTextOddLocal: any = [];
    const leaderBoardTextEvenDiscussionLocal: any = [];
    const leaderBoardTextOddDiscussionLocal: any = [];
    const leaderBoardTextEvenWordLocal: any = [];
    const leaderBoardTextOddWordLocal: any = [];

    const that = this;
    try {
      fetch('https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }).then(async (data) => {
        data.text().then(async (data) => {
          console.log('data');
          console.log(data);

          leaderBoardTextLocal = data.split(',');
          leaderBoardTextLocal.splice(-1, 1);
          for (var i = 0; i < leaderBoardTextLocal.length; i++) {
            if (i % 2 === 0) {
              leaderBoardTextEvenLocal.push(leaderBoardTextLocal[i]);
            } else {
              leaderBoardTextOddLocal.push(leaderBoardTextLocal[i]);
            }
          }
          for (var i = 0; i < leaderBoardTextEvenLocal.length; i++) {
            if (i < 10) {
              leaderBoardTextEvenDiscussionLocal.push(
                leaderBoardTextEvenLocal[i],
              );
              leaderBoardTextOddDiscussionLocal.push(
                leaderBoardTextOddLocal[i],
              );
              that.state.leaderBoardTextEvenDiscussionName.push({
                name: leaderBoardTextEvenLocal[i],
              });
              that.state.leaderBoardTextOddDiscussionName.push({
                points: leaderBoardTextOddLocal[i],
              });
              that.state.leaderBoardTextDiscussionConcat.push({
                name: leaderBoardTextEvenLocal[i],
                points: leaderBoardTextOddLocal[i],
              });
            } else {
              leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[i]);
              leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[i]);

              that.state.leaderBoardTextEvenWordName.push({
                name: leaderBoardTextEvenLocal[i],
              });
              that.state.leaderBoardTextOddWordName.push({
                points: leaderBoardTextOddLocal[i],
              });
              that.state.leaderBoardTextWordConcat.push({
                name: leaderBoardTextEvenLocal[i],
                points: leaderBoardTextOddLocal[i],
              });
            }
          }

          that.setState({ leaderBoardText: leaderBoardTextLocal });
          that.setState({ leaderBoardTextEven: leaderBoardTextEvenLocal });
          that.setState({ leaderBoardTextOdd: leaderBoardTextOddLocal });
          that.setState({
            leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal,
          });
          that.setState({
            leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal,
          });
          that.setState({
            leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal,
          });
          that.setState({
            leaderBoardTextOddWord: leaderBoardTextOddWordLocal,
          });
        }); // data.text().then ends
      }); // then async func ends
    } catch (err) {
      Alert.alert('inside catch err');
      Alert.alert(err);
    }
    console.log('messageSher sent to send sher message function');
    console.log('ajax: that.state.leaderBoardTextEvenDiscussion');
    console.log(that.state.leaderBoardTextEvenDiscussion);
  }

  render() {
    let signinMessageLocal = '';
    if (this.state.signinConfirmation === 'done') {
      signinMessageLocal = this.state.username.charAt(0).toUpperCase();
    } else {
      signinMessageLocal = 'Sign In';
    }

    const itemOddWord = this.state.leaderBoardTextOddWord.map((item: any) => (
      <Text key={item}>
        {' '}
        {item}
      </Text>
    ));

    const itemEvenWord = this.state.leaderBoardTextEvenWord.map((item: any) => (
      <Text key={item}>
        {' '}
        {item}
      </Text>
    ));

    const itemOddDiscussion = this.state.leaderBoardTextOddDiscussion.map(
      (item: any) => (
        <Text key={item}>
          {' '}
          {item}
        </Text>
      ),
    );

    const itemEvenDiscussion = this.state.leaderBoardTextEvenDiscussion.map(
      (item: any) => (
        <Text key={item}>
          {' '}
          {item}
        </Text>
      ),
    );


    const tableHeader = ['Leaderboard Name', 'Points'];

    let myTable: any = '';

    if (this.state.dropdownState === 'discussion') {
      myTable = (
        <Table>
          <Row
            data={tableHeader}
            flexArr={[1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={itemEvenDiscussion}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
            <Col
              data={itemOddDiscussion}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      );
    } else {
      myTable = (
        <Table>
          <Row
            data={tableHeader}
            flexArr={[1, 1]}
            style={styles.head}
            textStyle={styles.text}
          />
          <TableWrapper style={styles.wrapper}>
            <Col
              data={itemEvenWord}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
            <Col
              data={itemOddWord}
              style={styles.title}
              heightArr={[28, 28, 28, 28, 28, 28, 28, 28, 28, 28]}
              textStyle={styles.text}
            />
          </TableWrapper>
        </Table>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.6 }}>
          <View style={styles.UsernameView}>
            <View style={styles.UsernameViewInner}>
              <Text style={styles.Username}>{this.state.username}</Text>
            </View>
          </View>

          <Text style={styles.Message}>Now you can write comments!</Text>
          <Text style={styles.Message}>
            You can also vote to others' comments!
          </Text>
          <Text style={styles.Message}>More profile features coming soon!</Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'stretch',
              padding: 1,
            }}
          >
            <View>
              <Button onPress={() => this.myDownloads()} title="MY DOWNLOADS" />
            </View>
            <View>
              <Button
                onPress={() => this.changePassword()}
                title="CHANGE PASSWORD"
              />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: 1,
            }}
          >
            <Button onPress={() => this.signOut()} title="SIGN OUT" />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View>
            <Picker
              selectedValue={this.state.dropdownState}
              onValueChange={(itemValue) => this.setState({ dropdownState: itemValue })}
            >
              <Picker.Item label="Discussion" value="discussion" />
              <Picker.Item label="Word Meanings" value="word" />
            </Picker>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <ScrollView>{myTable}</ScrollView>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  head: { height: 28, backgroundColor: '#f1f8ff' },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  text: { textAlign: 'center' },

  Message: {
    textAlign: 'center',
  },
  UsernameView: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  UsernameViewInner: {
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#d6d7da',
  },
  Username: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
  },
});
// return <h1>I got following message : {this.props.location.state.detail}</h1>

export default ProfilePage;