import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, SafeAreaView } from "react-native";
import Field from "./src/components/Field";
import params from "./src/params";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
  invertFlag,
  flagsUsed,
} from "./src/logic";
import MineField from "./src/components/MineField";
import Header from "./src/components/Header";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.createState();
  }
  minesAmount = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return Math.ceil(cols * rows * params.difficultLevel);
  };
  createState = () => {
    const cols = params.getColumnsAmount();
    const rows = params.getRowsAmount();
    return {
      board: createMinedBoard(rows, cols, this.minesAmount()),
      won: false,
      lost: false,
    };
  };
  onOpenField = (row, column) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);

    if (lost) {
      showMines(board);
      Alert.alert("Perdeeeeu!", "Que buuuurro!");
    }

    if (won) {
      Alert.alert("Parabéns", "Você Venceu!");
    }

    this.setState({ board, lost, won });
  };
  onSelectField = (row, column) => {
    const board = cloneBoard(this.state.board);
    invertFlag(board, row, column);
    const won = wonGame(board);

    if (won) {
      Alert.alert("Perdeeeeu!", "Que buuuurro!");
    }
    this.setState({ board, won });
  };
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Header
          newGame={() => this.setState(this.createState())}
          flagsLeft={this.minesAmount() - flagsUsed(this.state.board)}
        />
        <View style={styles.board}>
          <MineField
            board={this.state.board}
            onSelectField={this.onSelectField}
            onOpenField={this.onOpenField}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#AAA",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
});
