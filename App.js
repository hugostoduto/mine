import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Field from "./src/components/Field";
import params from "./src/params";
import {
  createMinedBoard,
  cloneBoard,
  openField,
  hadExplosion,
  wonGame,
  showMines,
} from "./src/logic";
import MineField from "./src/components/MineField";

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
  onOpenField = (r, c) => {
    const board = cloneBoard(this.state.board);
    openField(board, row, column);
    const lost = hadExplosion(board);
    const won = wonGame(board);
    if (lost) {
      showMines(board);
      Alert.alert("Perdeu");
    }
    if (won) {
      Alert.alert("ganhou");
    }
    this.setState({ board, lost, won });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>
          {params.getColumnsAmount()} X {params.getRowsAmount()}
        </Text>
        <View style={styles.board}>
          <MineField board={this.state.board} onOpenField={this.onOpenField} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
  },
  board: {
    alignItems: "center",
    backgroundColor: "#AAA",
  },
});
