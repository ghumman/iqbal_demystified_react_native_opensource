import React from "react";
import {
  TextInput,
  Image,
  ScrollView,
  Linking,
  TouchableHighlight,
  StyleSheet,
  FlatList,
  SectionList,
  Alert,
  View,
  Text
} from "react-native";
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel
} from "react-native-simple-radio-button";
import AsyncStorage from "@react-native-community/async-storage";

import qs from "qs";

import iconReact from "../../assets/android_app_assets/react.png";
import iconVue from "../../assets/android_app_assets/vue.png";
import iconFacebook from "../../assets/android_app_assets/facebook_link.png";
import iconGithub from "../../assets/android_app_assets/github.png";
import iconIis from "../../assets/android_app_assets/iqbal_com_pk.png";
import iconAcademy from "../../assets/android_app_assets/iap.png";

const VERSION = "Version No.: 4.0.4";
const FONT = "Normal";
const TEXT = "Urdu";

var radio_props_font = [
  { label: "Normal", value: "Normal" },
  { label: "Nafees", value: "Nafees" },
  { label: "Kasheeda", value: "Kasheeda" },
  { label: "Fajer", value: "Fajer" }
];

var radio_props_text = [
  { label: "Urdu", value: "Urdu" },
  { label: "Roman English", value: "Roman" }
];

class InfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      signinConfirmation: "",
      font: "Normal",
      text: "Urdu",
      fontIndex: -1,
      textIndex: -1,
      emailText: "",
      height: 40,
      emailText: "",
      isFocused: false,

      fontIndexReady: false,
      textIndexReady: false
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerTitle: "Settings",
    headerTintColor: "black",
    headerTitleStyle: {
      fontWeight: "bold",
      fontSize: 20,
      textAlign: "center"
    }
  });

  onDidFocusCustomFunction = () => {
    console.log("Inside onDidFocusCustomFunction");
    try {
      AsyncStorage.getItem(FONT).then(res => {
        if (res !== null) {
          console.log("res is not equal to null: ");
          console.log(res);
          this.setState({ font: res });
          switch (res) {
            case "Normal":
              console.log("case is Normal");
              this.setState({ fontIndex: 0 });
              break;
            case "Nafees":
              console.log("case is Nafees");
              this.setState({ fontIndex: 1 });
              break;
            case "Kasheeda":
              console.log("case is Kasheeda");
              this.setState({ fontIndex: 2 });
              break;
            case "Fajer":
              console.log("case is Fajer");
              this.setState({ fontIndex: 3 });
              break;
          }
          console.log("this.state.fontIndex");
          console.log(this.state.fontIndex);
          this.setState({ fontIndexReady: true });
        } else {
          console.log("res: ");
          console.log(res);

          this.setState({ font: "Normal" });
          this.setState({ fontIndex: 0 });
          this.setState({ fontIndexReady: true });
        }
      });
    } catch (err) {
      console.log("err: ");
      console.log(err);
      this.setState({ font: "Normal" });
    }

    AsyncStorage.getItem(TEXT).then(res => {
      if (res !== null) {
        console.log("res is not null: ");
        console.log(res);
        this.setState({ text: res });
        switch (res) {
          case "Urdu":
            this.setState({ textIndex: 0 });
            break;
          case "Roman":
            this.setState({ textIndex: 1 });
            break;
        }
        console.log("this.state.textIndex");
        console.log(this.state.textIndex);
        this.setState({ textIndexReady: true });
      } else {
        console.log("res: ");
        console.log(res);

        this.setState({ text: "Urdu" });
        this.setState({ textIndex: 0 });
        this.setState({ textIndexReady: true });
      }
    });
  };

  componentDidMount() {
    try {
      this.onDidFocusCustomFunction();

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
    } catch (e) {
      console.log("Inside catch");
    }
  }

  updateSize = height => {
    this.setState({ height });
  };

  handleFocus = () => this.setState({ isFocused: true });

  handleBlur = () => this.setState({ isFocused: false });

  sendEmailFunction() {
    console.log("Inside sendEmailFunciton");
    this.sendEmail(
      "admin@ghummantech.com",
      "Iqbal Demystified App - User Email",
      this.state.emailText
    ).then(() => {
      console.log("Our email successful provided to device mail ");
    });
  }

  async sendEmail(to, subject, body, options = {}) {
    console.log("Inside sendEmail");
    const cc = "";
    const bcc = "";

    console.log("Before url = mailto...");
    let url = `mailto:${to}`;

    console.log("Before const query");
    const query = qs.stringify({
      subject: subject,
      body: body,
      cc: cc,
      bcc: bcc
    });

    if (query.length) {
      url += `?${query}`;
    }

    console.log("Before canOpen = await Linking...");
    const canOpen = await Linking.canOpenURL(url);

    if (!canOpen) {
      throw new Error("Provided URL can not be handled");
    }
    console.log("Before return Linking...");

    return Linking.openURL(url);
  }

  render() {
    const { emailText, height } = this.state;

    let newStyle = {
      height,
      backgroundColor: "#ffffff",
      paddingLeft: 15,
      paddingRight: 15,
      borderBottomColor: this.state.isFocused ? "black" : "gray",
      borderBottomWidth: 1
    };


    var showFontRadioForm;
    if (this.state.fontIndexReady)
      showFontRadioForm = (
        <RadioForm
          radio_props={radio_props_font}
          initial={this.state.fontIndex}
          buttonColor={"black"}
          selectedButtonColor={"black"}
          onPress={value => AsyncStorage.setItem(FONT, value)}
        />
      );
    else showFontRadioForm = null;

    var showTextRadioForm;
    if (this.state.textIndexReady)
      showTextRadioForm = (
        <RadioForm
          radio_props={radio_props_text}
          initial={this.state.textIndex}
          buttonColor={"black"}
          selectedButtonColor={"black"}
          onPress={value => {
            AsyncStorage.setItem(TEXT, value);
          }}
        />
      );
    else showTextRadioForm = null;

    var aboutText =
      "Iqbal Demystified App helps the young generation to fully understand the work of Allama Iqbal. The purpose of this app is to facilitate students who are unable to benefit from Iqbal's work because of the difficult terms used or lack of knowledge about the context of the poems.\n\nUsers can contribute to this app in several ways including but not limited to writing poem introductions, providing audios for poems and adding more references to difficult words. We are always open to suggestions and comments and are looking for other effective techniques that can facilitate learning about our lost heritage.";

    var developerText =
      "We have open-sourced our repositories and codebase in an attempt to involve the community to help us with this project. If you are interested in working on a new feature for the app, please contact us.\n\nFollowing are the 4 GitHub repositories for this project. Please get involved!";

    return (
      <View>
        <ScrollView>
          <Text style={styles.EnglishTitle}>Choose Font</Text>
          {showFontRadioForm}

          <Text style={{ color: "black" }}>
            Warning: Fonts may not show up properly on some mobile devices.
          </Text>

          <Text style={styles.EnglishTitle}>Choose Text Type</Text>
          {showTextRadioForm}

          <Text style={styles.EnglishTitle}>Contribute</Text>
          <Text style={styles.RenderedText}>
            If you have any suggestions or if you can contribute to the app in
            any way, we would really appreciate your help. Visit our Facebook
            Page to see how you can help.
          </Text>
          <TextInput
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            placeholder="Message..."
            onChangeText={emailText => this.setState({ emailText })}
            style={[newStyle]}
            editable={true}
            multiline={true}
            value={emailText}
            onContentSizeChange={e =>
              this.updateSize(e.nativeEvent.contentSize.height)
            }
          />

          <View style={styles.RenderedTextFeedbackView}>
            <TouchableHighlight onPress={() => this.sendEmailFunction()}>
              <Text style={styles.RenderedTextFeedback}>
                SEND FEEDBACK TO DEVELOPERS
              </Text>
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>About This App</Text>
          <Text style={styles.RenderedText}>{aboutText}</Text>

          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("https://www.facebook.com/IqbalDemystified")
              }
            >
              <Image source={iconFacebook} />
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>Are you a developer?</Text>
          <Text style={styles.RenderedText}>{developerText}</Text>

          {/*
	    first row of logos
	  */}

          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-around"
            }}
          >
            <View style={styles.HighlightProperties}>
              <Text style={styles.EnglishTitle}>
                Iqbal RN Android and iPhone App
              </Text>
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/ghumman/iqbal_demystified_react_native"
                  )
                }
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="center"
                  source={iconGithub}
                />
              </TouchableHighlight>
            </View>
            <View style={styles.HighlightProperties}>
              <Text style={styles.EnglishTitle}>Iqbal Demystified Old Android App</Text>
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/AzeemGhumman/iqbal-demystified-android-app"
                  )
                }
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="center"
                  source={iconGithub}
                />
              </TouchableHighlight>
            </View>
          </View>

          {/*
	    second row of logos
	  */}
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              padding: 10,
              justifyContent: "space-around"
            }}
          >
            <View style={styles.HighlightProperties}>
              <Text style={styles.EnglishTitle}>Iqbal Demystified Dataset</Text>
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/AzeemGhumman/iqbal-demystified-dataset"
                  )
                }
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="center"
                  source={iconGithub}
                />
              </TouchableHighlight>
            </View>

            <View style={styles.HighlightProperties}>
              <Text style={styles.EnglishTitle}>Iqbal Demystified Web Application</Text>
              <TouchableHighlight
                onPress={() =>
                  Linking.openURL(
                    "https://github.com/ghumman/iqbal-demystified-web"
                  )
                }
              >
                <Image
                  style={styles.RowImage}
                  resizeMode="center"
                  source={iconGithub}
                />
              </TouchableHighlight>
            </View>
          </View>

          <Text style={styles.EnglishTitle}>Vue Web Client</Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("https://iqbal-demystified.herokuapp.com/")
              }
            >
              <Image source={iconVue} />
            </TouchableHighlight>
          </View>

          <Text style={styles.EnglishTitle}>React Web Client</Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() =>
                Linking.openURL("http://iqbal-demystified-react.herokuapp.com/")
              }
            >
              <Image source={iconReact} />
            </TouchableHighlight>
          </View>

          <Text style={styles.RenderedText}>
            {"ﺷﮑﻮﮦﺀ۔ ﻇﻠﻤﺖِ ﺷﺐ ﺳﮯ ﺗﻮ ﮐﮩﯿﮟ ﺑﮩﺘﺮ ﺗﮭﺎ"}
          </Text>
          <Text style={styles.RenderedText}>
            {"ﺍﭘﻨﮯ ﺣﺼﮯ ﮐﯽ ﮐﻮﺋﯽ ﺷﻤﻊ ﺟﻼﺗﮯ ﺟﺎﺗﮯ"}
          </Text>

          <Text style={styles.EnglishTitle}>Created By</Text>
          <Text style={styles.EnglishTitle}>International Iqbal Society</Text>
          <Text style={styles.RenderedText}>{"{{Developers}}"}</Text>
          <Text style={styles.RenderedText}>Azeem Ghumman</Text>
          <Text style={styles.RenderedText}>Faizan Khan</Text>
          <Text style={styles.RenderedText}>
            Ahmed Ghumman (CEO: Ghumman Tech)
          </Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() => Linking.openURL("http://www.iqbal.com.pk/")}
            >
              <Image source={iconIis} />
            </TouchableHighlight>
          </View>
          <Text style={styles.RenderedText}>
            {"International Iqbal Society\n(Formerly DISNA)"}
          </Text>
          <Text style={styles.EnglishTitle}>Special Thanks</Text>
          <View style={styles.ImageView}>
            <TouchableHighlight
              onPress={() => Linking.openURL("http://iap.gov.pk/")}
            >
              <Image source={iconAcademy} />
            </TouchableHighlight>
          </View>
          <Text style={styles.RenderedText}>Iqbal Academy Pakistan</Text>
            <Text style={styles.RenderedText}>{VERSION}</Text>

        </ScrollView>
      </View>
    ); // return ends
  } // render function ends
} // class ends

const styles = StyleSheet.create({
  RenderedTextFeedbackView: {
    backgroundColor: "gray",
    padding: 10
  },
  RenderedTextFeedback: {
    textAlign: "center",
    padding: 10,
    fontSize: 18,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da"
  },
  RenderedText: {
    textAlign: "center",
    padding: 10,
    fontSize: 18
  },

  EnglishTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "black"
  },
  ImageView: {
    justifyContent: "center",
    alignItems: "center"
  },
  HighlightProperties: {
    flex: 1,
    overflow: "hidden",
    alignItems: "center",
    margin: 10
  },
  RowImage: {
    flex: 1
  }
});

export default InfoPage;
