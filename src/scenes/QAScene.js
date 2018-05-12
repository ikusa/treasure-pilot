// @flow

import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DARK_NAVI, LIGHT_BLUE, ORANGE, WHITE} from '../general/colors';
import getStatusBarHeight from '../helpers/getStatusBarHeight';
import {qaList} from '../data/q&a';
import CheckItem from '../general/core-ui/CheckItem';
type Props = {
  navigation: Navigation,
};
type State = {
  value: ?number,
};

export default class QAScene extends Component<Props, State> {
  state = {
    value: null,
  };
  render() {
    // $FlowFixMe;
    let {data} = this.props.navigation.state.params;
    let dataToObject = JSON.parse(data);
    let qa = qaList[dataToObject.id - 1];
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Question & Answer</Text>
        </View>
        <ScrollView style={{marginTop: 40}}>
          {this._renderQuestion(qa)}
          {this._renderAnswers(qa)}
          <TouchableOpacity
            onPress={() => this._onSubmit()}
            style={styles.submit}
          >
            <Text style={styles.desc}>GO !!!</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  }

  _onSubmit() {}
  _renderQuestion(qa: Object) {
    return (
      <View style={styles.question}>
        <Text style={styles.subtitle}>Pertanyaan No. 1</Text>
        <Text style={styles.desc}>{qa.question}</Text>
      </View>
    );
  }

  _renderAnswers(qa: Object) {
    return (
      <View style={styles.question}>
        <Text style={styles.subtitle}>Pilih Jawaban</Text>
        <View style={styles.wrapper}>
          {qa.answers.map((answer, index) => (
            <Answer
              key={index}
              checked={index === this.state.value}
              value={answer.value}
              onPress={() => this._onPress(index)}
            />
          ))}
        </View>
      </View>
    );
  }

  _onPress(value) {
    this.setState({value});
  }
}

type AnswerProps = {
  checked: boolean,
  value: string,
  onPress: () => void,
};

function Answer(props: AnswerProps) {
  let {value, checked, onPress} = props;
  return (
    <TouchableOpacity style={styles.answer} onPress={onPress}>
      <CheckItem
        type="radioButton"
        size={23}
        color={WHITE}
        checked={checked}
        onPress={onPress}
      />
      <Text style={styles.desc}>{value}</Text>
    </TouchableOpacity>
  );
}
let styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: DARK_NAVI,
  },
  header: {
    flex: 1,
    paddingTop: getStatusBarHeight(),
    maxHeight: 70,
    backgroundColor: LIGHT_BLUE,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  title: {
    fontSize: 20,
    color: WHITE,
  },
  question: {
    marginVertical: 10,
    marginHorizontal: 10,
    backgroundColor: ORANGE,
    borderRadius: 5,
  },
  subtitle: {
    color: WHITE,
    fontSize: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  desc: {
    color: WHITE,
    fontSize: 16,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
    padding: 10,
  },
  answer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 10,
  },
  submit: {
    borderRadius: 5,
    backgroundColor: LIGHT_BLUE,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 10,
    padding: 10,
  },
});
