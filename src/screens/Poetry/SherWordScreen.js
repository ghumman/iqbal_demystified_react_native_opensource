import React from "react";
import {
  Image,
  Platform,
  Share,
  ScrollView,
  TextInput,
  Button,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text
} from "react-native";
import StaticContentService from "../Misc/StaticContentServiceYaml";

import Moment from "moment";

import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell
} from "react-native-table-component";

import iconShare from "../../assets/android_app_assets/share.png";
import iconUploadComment from "../../assets/android_app_assets/upload_comment.png";
import iconUpVote from "../../assets/android_app_assets/vote_up_unselected.png";
import iconDownVote from "../../assets/android_app_assets/vote_down_unselected.png";

var RNFS = require("react-native-fs");
var YAML = require("yaml");

class SherPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",

      listId: "List_001",
      sherId: "",
      sherText: [],
      meaningsAvailable: new Set(),
      wordText: [],
      poemText: [],
      sherObjects: [],
      sherGeneralDiscussionServerResponse: [],
      sherDiscussionDetail: [],
      wordDiscussionDetail: [],
      mySelectedWord: "",
      mySelectedId: "1",

      userMessageSher: "",
      userMessageWord: "",

      key: "home",
      height: "40"
    };
    this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
    this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

    this.handleSubmitSher = this.handleSubmitSher.bind(this);
    this.handleSubmitWord = this.handleSubmitWord.bind(this);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Word Meanings",
    headerTitle: navigation.state.params.title || "",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  handleUserMessageSher(event) {
    this.setState({ userMessageSher: event.target.value });
  }

  handleUserMessageWord(event) {
    this.setState({ userMessageWord: event.target.value });
  }

  handleSubmitSher(event) {
    this.send_sher_message();
    event.preventDefault();
  }

  handleSubmitWord(event) {
    this.send_word_message();
    event.preventDefault();
  }

  async send_sher_message() {

    var that = this;

    // do not try pushing comment if message is empty
    if (this.state.userMessageSher.trim() != "") {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != "" &&
        this.state.password.trim() != ""
      ) {
        try {
          fetch("https://icanmakemyownapp.com/iqbal/v3/post-comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
              "sher=" +
              that.state.sherId +
              "&discussion_type=general&username=" +
              that.state.username +
              "&password=" +
              that.state.password +
              "&comment_text=" +
              that.state.userMessageSher
          }).then(async function (data) {
            that.getSherGeneralDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert("inside catch err");
          Alert.alert(err);
        }
      } // if not logged in empty
      else {
        Alert.alert("Please login first to add comments.");
      }
    } // if message is empty ends
    else {
      Alert.alert("Comments can not be empty");
    }
  }

  async send_word_message() {

    var that = this;
    if (this.state.userMessageWord.trim() != "") {
      // if user is not signed in, ask user to sign in
      if (
        this.state.username.trim() != "" &&
        this.state.password.trim() != ""
      ) {
        try {
          fetch("https://icanmakemyownapp.com/iqbal/v3/post-comment.php", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body:
              "sher=" +
              that.state.sherId +
              "&discussion_type=word-meanings&username=" +
              that.state.username +
              "&password=" +
              that.state.password +
              "&comment_text=" +
              that.state.userMessageWord +
              "&word_position=" +
              that.state.mySelectedId
          }).then(async function (data) {

            that.getSherWordDiscussion(that.state.sherId);
          }); // success function ends
        } catch (err) {
          Alert.alert("inside catch err");
          Alert.alert(err);
        }

        // console.log("messageSher sent to send sher message function");
      } // if not logged in empty
      else {
        Alert.alert("Please login first to add comments.");
      }
    } // if message is empty ends
    else {
      Alert.alert("Comments can not be empty");
    }
  }

  onSubmit = sherNumber => {
    this.props.history.push({
      pathname: "/SherPage",
      state: {
        detailSher: sherNumber,
        profileSigninConfirmation: this.state.signinConfirmation,
        profileUsername: this.state.username,
        profilePassword: this.state.password
      }
    });
  };

  async getSherGeneralDiscussion(sherName) {
    var that = this;
    try {

      var localData = { sher: sherName, discussion_type: "general" };
      fetch("https://icanmakemyownapp.com/iqbal/v3/get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sher=" + sherName + "&discussion_type=general"
      }).then(async function (data) {
        data.json().then(async function (data) {

          var sherArray = sherName.split("_");

          var path = "";
          var yamlFile = "";
          if (Platform.OS == "ios") {
            path =
              RNFS.MainBundlePath +
              "/src/assets/poems/" +
              sherArray[0] +
              "/" +
              sherArray[0] +
              "_" +
              sherArray[1] +
              ".yaml";
            yamlFile = await RNFS.readFile(path, "utf8");
          } else if (Platform.OS == "android") {
            path =
              "poems/" +
              sherArray[0] +
              "/" +
              sherArray[0] +
              "_" +
              sherArray[1] +
              ".yaml";
            yamlFile = await RNFS.readFileAssets(path, "utf8");
          }


          var sherIndex = sherArray[2] - 1;
          var yamlObject = YAML.parse(yamlFile);


          var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

          var sherTextLocal = sherTextTemp.split("|");
          that.setState({ sherText: sherTextLocal });


          var wordTextLocal = that.state.sherText[0]
            .split(" ")
            .concat(that.state.sherText[1].split(" "));
          var ii;

          for (ii = 0; ii < wordTextLocal.length; ii++) {
            if (
              wordTextLocal[ii] == "" ||
              wordTextLocal[ii] == " " ||
              wordTextLocal[ii] == "،"
            ) {
              wordTextLocal.splice(ii, 1);
              ii--;
            } else {

              wordTextLocal[ii] = wordTextLocal[ii].replace(
                /[|&!;$%@"<>()+,]/g,
                ""
              );
            } // else ends
          } // for wordTextLocal.... ends

          that.setState({ wordText: wordTextLocal });

          var poemTextLocal = yamlObject.heading[0].text;
          var sherGeneralDiscussionServerResponseLocal = data;

          that.setState({ poemText: poemTextLocal });
          that.setState({
            sherGeneralDiscussionServerResponse: sherGeneralDiscussionServerResponseLocal
          });

          that.props.navigation.setParams({ title: that.state.poemText });

          that.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      Alert.alert("inside catch err");
      Alert.alert(err);
      that.message = err;
    }
  } // async getSherGeneralDiscussion ends

  getSherDiscussion(sherGeneralDiscussionServerResponse) {
    var that = this;
    StaticContentService.getSherDiscussion(
      sherGeneralDiscussionServerResponse
    ).then(function (response) {
      var sherDiscussionDetailLocal = sherGeneralDiscussionServerResponse;

      for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {

        sherDiscussionDetailLocal[i].text = decodeURI(
          sherDiscussionDetailLocal[i].text
        );
      }
      that.setState({ sherDiscussionDetail: sherDiscussionDetailLocal });
    }); // .then(func res) ends
  }

  async getSherWordDiscussion(sherName) {
    var that = this;
    try {
      fetch("https://icanmakemyownapp.com/iqbal/v3/get-discussion.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "sher=" + sherName + "&discussion_type=word-meanings"
      }).then(async function (data) {
        data.json().then(async function (data) {

          var sherWordDiscussionServerResponse = data;

          that.getWordDiscussion(sherWordDiscussionServerResponse);
        }); // data.json().then ends
      }); // success function ends
    } catch (err) {
      // try ends
      Alert.alert("inside catch err");
      Alert.alert(err);
    } // catch ends
  }

  getWordDiscussion(sherWordDiscussionServerResponse) {
    var wordDiscussionDetailLocal = sherWordDiscussionServerResponse;

    var meaningsAvailableLocal = new Set();

    for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {
      wordDiscussionDetailLocal[i].text = decodeURI(
        wordDiscussionDetailLocal[i].text
      );
      meaningsAvailableLocal.add(wordDiscussionDetailLocal[i].wordposition);
    }
    this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });

    this.setState({ meaningsAvailable: meaningsAvailableLocal });

  }

  componentDidMount() {
    try {
      this.setState({
        signinConfirmation: this.props.navigation.getParam(
          "profileSigninConfirmation"
        )
      });
      this.setState({
        username: this.props.navigation.getParam("profileUsername")
      });
      this.setState({
        password: this.props.navigation.getParam("profilePassword")
      });
      this.setState({ sherId: this.props.navigation.getParam("detailSher") });

      let sherName = this.props.navigation.getParam("detailSher");

      this.getSherGeneralDiscussion(sherName);
      this.getSherWordDiscussion(sherName);
    } catch (e) {
      // try ends
      console.log("Inside catch");
    } // catch ends
  } // componentDidMount ends

  signMeIn = () => {
    if (this.state.username == "") {
      this.props.history.push({
        pathname: "/RegisterPage",
        state: {
          profileSigninConfirmation: this.state.signinConfirmation,
          profileUsername: this.state.username,
          profilePassword: this.state.password
        }
      });
    }
  };

  ///////////////////////////////////////////////////////////
  //	Vote Like Word
  ///////////////////////////////////////////////////////////

  vote_like_word_arrow(comment_general_id) {

    var that = this;
    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=1&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered") {
              Alert.alert("Vote registered.");
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=word-meanings&comment_id=" +
                    comment_general_id +
                    "&username=" +
                    that.state.username +
                    "&password=" +
                    that.state.password +
                    "&is_like=0&is_cancel=1"
                }).then(async function (data) {
                  data.text().then(async function (data) {
                    if (data == "vote removed") {
                      Alert.alert("Vote removed.");
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == "invalid is_cancel value") {
                      Alert.alert("You have not liked or disliked it yet.");
                    }
                  }); // data.text.then.func ends
                }); // success function ends
              } catch (err) {
                Alert.alert("inside catch err");
                Alert.alert(err);
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }
  }

  vote_like_word(comment_general_id) {

    var that = this;
    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=1&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered")
              that.getSherWordDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  ///////////////////////////////////////////////////////////
  //	Vote Dislike Word
  ///////////////////////////////////////////////////////////

  vote_dislike_word_arrow(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered") {
              Alert.alert("Vote registered.");
              that.getSherWordDiscussion(that.state.sherId);
            } else if (data == "vote already registered") {
              try {
                fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  },
                  body:
                    "sher=" +
                    that.state.sherId +
                    "&discussion_type=word-meanings&comment_id=" +
                    comment_general_id +
                    "&username=" +
                    that.state.username +
                    "&password=" +
                    that.state.password +
                    "&is_like=0&is_cancel=1"
                }).then(async function (data) {
                  data.text().then(async function (data) {
                    if (data == "vote removed") {
                      Alert.alert("Vote removed.");
                      that.getSherWordDiscussion(that.state.sherId);
                    } else if (data == "invalid is_cancel value") {
                      Alert.alert("You have not liked or disliked it yet.");
                    }
                  }); // data.text.then.func ends
                }); // success function ends
              } catch (err) {
                Alert.alert("inside catch err");
                Alert.alert(err);
              }
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
        this.message = err;
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }
  vote_dislike_word(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered")
              that.getSherWordDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
        this.message = err;
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  ///////////////////////////////////////////////////////////
  //	Vote Unregister Word
  ///////////////////////////////////////////////////////////

  vote_unregister_word(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=word-meanings&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=1"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote removed") {
              that.getSherWordDiscussion(that.state.sherId);
              Alert.alert("Your vote is removed");
            } else if (data == "invalid is_cancel value") {
              Alert.alert("You have not liked or disliked it yet.");
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  ///////////////////////////////////////////////////////////
  //	Vote Like General
  ///////////////////////////////////////////////////////////

  vote_like(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        localTestString =
          "sher=002_001_001&discussion_type=general&comment_id=319&username=agent3&password=agent&is_like=1&is_cancel=0";
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=1&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered")
              that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  ///////////////////////////////////////////////////////////
  //	Vote Dislike General
  ///////////////////////////////////////////////////////////

  vote_dislike(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=0"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote registered")
              that.getSherGeneralDiscussion(that.state.sherId);
            else if (data == "vote already registered") {
              Alert.alert(
                "Vote is already registerd. Unregister vote first and then you can revote"
              );
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  ///////////////////////////////////////////////////////////
  //	Vote Unregister General
  ///////////////////////////////////////////////////////////

  vote_unregister(comment_general_id) {

    var that = this;

    if (this.state.username != "") {
      try {
        fetch("https://icanmakemyownapp.com/iqbal/v3/vote.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          },
          body:
            "sher=" +
            that.state.sherId +
            "&discussion_type=general&comment_id=" +
            comment_general_id +
            "&username=" +
            that.state.username +
            "&password=" +
            that.state.password +
            "&is_like=0&is_cancel=1"
        }).then(async function (data) {
          data.text().then(async function (data) {
            if (data == "vote removed") {
              that.getSherGeneralDiscussion(that.state.sherId);
              Alert.alert("Your vote is removed");
            } else if (data == "invalid is_cancel value") {
              Alert.alert("You have not liked or disliked it yet.");
            }
          }); // data.text.then.func ends
        }); // success function ends
      } catch (err) {
        Alert.alert("inside catch err");
        Alert.alert(err);
      }
    } // if username not empty ends
    else {
      Alert.alert(
        "You are you not logged in. Please Login to give your feedback."
      );
    }

  }

  selectedWord(wordText, wordId) {
    this.setState({ mySelectedWord: wordText });
    this.setState({ mySelectedId: wordId + 1 });
  }

  chooseColor() {
    return {
      borderColor: "red"
    };
  }

  onShare = async () => {
    var that = this;
    try {
      const result = await Share.share({
        title: "Iqbal Demystified",
        message:
          that.state.sherText[0] +
          "\n" +
          that.state.sherText[1] +
          "\n" +
          "(Iqbal Demystified by International Iqbal Society)"
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    Moment.locale("en");

    var item4 = this.state.sherText.map((item, index) => (
      <Text key={item.index}> {item}</Text>
    ));

    const viewStylesNotSelected = {
      // borderColor: "gray",
      // borderStyle: "dotted",
      // borderWidth: 1
      borderRadius: 10
    };
    const viewStylesWithMeanings = {
      borderColor: "gray",
      borderWidth: 1,
      borderRadius: 10
    };
    const viewStylesSelected = {
      borderColor: "black",
      borderWidth: 4,
      borderRadius: 10
    };

    const textStylesNotSelected = {
      color: "gray",
      fontWeight: "normal"
    };
    const textStylesSelected = {
      color: "black",
      fontWeight: "bold"
    };

    var that = this;
    var singleWords = this.state.wordText.map(function (item, index) {
      if (parseInt(that.state.mySelectedId) == index + 1)
        return (
          <View style={[styles.button, viewStylesSelected]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonsingleWordsText, textStylesSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      else if (that.state.meaningsAvailable.has((index + 1).toString())) {
        return (
          <View style={[styles.button, viewStylesWithMeanings]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesNotSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      } else {
        return (
          <View style={[styles.button, viewStylesNotSelected]}>
            <TouchableHighlight
              key={item.index}
              onPress={() => that.selectedWord(item, index)}
            >
              <Text style={[styles.buttonText, textStylesNotSelected]}>
                {item}
              </Text>
            </TouchableHighlight>
          </View>
        );
      }
    });

    var item6 = this.state.sherDiscussionDetail.map((item, index) => (
      <View key={item.id}>
        <Text>{item.username}</Text>
        <View></View>
        <View>
          <Text>{item.timestamp}</Text>
        </View>
        <View>
          <Text>{item.text}</Text>
        </View>
        <View>
          <Button onPress={() => this.vote_like(item.id)} title="LIKE" />
        </View>
        <View>
          <Text>SCORE: {item.score}</Text>
        </View>
        <View>
          <Button onPress={() => this.vote_dislike(item.id)} title="DISLIKE" />
        </View>
        <View>
          <Text></Text>
        </View>
        <View>
          <Button
            onPress={() => this.vote_unregister(item.id)}
            title="UNREGISTER"
          />
        </View>
      </View>
    ));

    var singleWordsComments = this.state.wordDiscussionDetail.map((item, index) => {
      if (item.wordposition == this.state.mySelectedId)
        return (
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ flex: 0.1, flexDirection: "column" }}>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_like_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconUpVote}
                  />
                </TouchableHighlight>
              </View>
              <View
                style={{
                  flex: 0.2,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <Text style={{ fontSize: 24, fontWeight: "bold" }}>
                  {item.score}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <TouchableHighlight
                  onPress={() => this.vote_dislike_word_arrow(item.id)}
                >
                  <Image
                    resizeMode="stretch"
                    style={{ height: 30, width: 30 }}
                    source={iconDownVote}
                  />
                </TouchableHighlight>
              </View>
            </View>
            <View
              key={item.id}
              style={[styles.RenderedItem6View, styles.flexPoint8]}
            >
              <View style={styles.NavBar}>
                <Text>{item.username}</Text>
                <Text>{Moment(item.timestamp).format("MMM DD, YYYY")}</Text>
              </View>
              <View>
                <Text style={styles.CommentsText}>{item.text}</Text>
              </View>
            </View>
          </View>
        );
    });

    let signinTag;
    var signinMessageLocal = "";
    if (this.state.signinConfirmation === "done") {
      signinMessageLocal = this.state.username.charAt(0).toUpperCase();
      signinTag = (
        <button type="button" class="btn btn-success btn-circle btn-lg">
          {" "}
          {signinMessageLocal}{" "}
        </button>
      );
    } else {
      signinMessageLocal = "Sign In";
      signinTag = (
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => this.signMeIn()}
        >
          {" "}
          {signinMessageLocal}{" "}
        </button>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.FirstSection}>
          <ScrollView>
            <View style={styles.container}>{singleWords}</View>
          </ScrollView>
        </View>
        <View style={styles.SecondSection}>
          <ScrollView>
            <View>{singleWordsComments}</View>
          </ScrollView>
        </View>



        <View style={{
          flex: 0,
          flexGrow: 0.1,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          borderWidth: 3,
          borderColor: "black",
        }}>
          <View style={{ flex: 5 }}>


            <TextInput
              keyboardType="email-address"
              onContentSizeChange={(event) => {
                this.setState({ height: event.nativeEvent.contentSize.height })
              }}
              multiline={true}
              style={[{ height: 40, borderWidth: 3, borderColor: "gray" },
              { height: Math.max(40, this.state.height) }]}
              placeholder="Comments..."
              onChangeText={text => this.setState({ userMessageWord: text })}
              autoGrow
            />

          </View>


          <View style={{ flex: 0.8 }}>

            <TouchableHighlight onPress={this.handleSubmitWord}>
              <Image resizeMode="contain" source={iconUploadComment} />
            </TouchableHighlight>
          </View>
          <View style={{ flex: 0.8 }}>
            <TouchableHighlight onPress={() => this.onShare()}>
              <Image resizeMode="contain" source={iconShare} />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  button: {
    padding: 5,
    borderRadius: 10,
    padding: 10
  },

  buttonText: {
    textAlign: "right",
    textAlignVertical: "center",
    fontSize: 18
  },
  FirstSection: {
    flex: 0,
    flexGrow: 0.1,
    borderWidth: 1
  },
  SecondSection: {
    flex: 4,
    borderWidth: 1
  },
  buttonSelected: {
    backgroundColor: "red",
    borderRadius: 10,
    borderWidth: 1,
    width: "25%",
    height: 40
  },
  RenderedView: {
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },

  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18
  },
  CommentsText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    color: "black"
  },

  flexPoint8: {
    flex: 0.8
  },
  RenderedItem6View: {
    backgroundColor: "white",
    margin: 2,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    padding: 2
  },
  NavBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  MainContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },

  MainScrollView: {
    flex: 3,
    borderWidth: 1
  },
  WordButtons: {
    backgroundColor: "#00aeef",
    borderColor: "red",
    borderWidth: 5,
    borderRadius: 15
  }
});

export default SherPage;
