"use client";

import { useState, useEffect, useCallback } from "react";
import { isValidWord } from "@/lib/dictionary";

type GameState = {
  board: string[];
  turn: 1 | 2;
  scores: { p1: number; p2: number };
  timeLeft: number;
  selectedCell: number | null;
  winner: 1 | 2 | null;
  lastScoredCells: number[];
  wordsFormed: string[];
  isForfeited: boolean;
};

const TURN_DURATION = 30; // 30 seconds
const WIN_SCORE = 75;

export function useLocalGame() {
  const [state, setState] = useState<GameState>({
    board: Array(64).fill(""),
    turn: 1,
    scores: { p1: 0, p2: 0 },
    timeLeft: TURN_DURATION,
    selectedCell: null,
    winner: null,
    lastScoredCells: [],
    wordsFormed: [],
    isForfeited: false,
  });

  // Timer logic
  useEffect(() => {
    if (state.winner) return;

    const timer = setInterval(() => {
      setState((prev) => {
        if (prev.timeLeft <= 1) {
          // Time's up, switch turn
          return {
            ...prev,
            turn: prev.turn === 1 ? 2 : 1,
            timeLeft: TURN_DURATION,
            selectedCell: null,
            lastScoredCells: [], // Clear on timeout
          };
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [state.turn, state.winner]);

  const selectCell = (index: number) => {
    if (state.board[index] || state.winner) return; // Can't select filled cell
    setState((prev) => ({ ...prev, selectedCell: index }));
  };

  const checkWords = (board: string[], cellIndex: number) => {
    const row = Math.floor(cellIndex / 8);
    const col = cellIndex % 8;
    
    const axes = [
      [0, 1], // Horizontal
      [1, 0], // Vertical
      [1, 1], // Diagonal \
      [1, -1] // Diagonal /
    ];

    let totalPoints = 0;
    const allScoredCells = new Set<number>();
    const formedWords: string[] = [];

    for (const [dR, dC] of axes) {
      let r = row, c = col;
      // Move backwards to find the start of the word
      while (true) {
        const prevR = r - dR, prevC = c - dC;
        if (prevR < 0 || prevR >= 8 || prevC < 0 || prevC >= 8) break;
        if (!board[prevR * 8 + prevC]) break;
        r = prevR;
        c = prevC;
      }
      
      // Move forward and collect the contiguous word
      const cells = [];
      let word = "";
      while (true) {
        if (r < 0 || r >= 8 || c < 0 || c >= 8) break;
        const idx = r * 8 + c;
        const letter = board[idx];
        if (!letter) break;
        cells.push(idx);
        word += letter;
        r += dR;
        c += dC;
      }
      
      // Check if valid
      if (word.length >= 3 && isValidWord(word)) {
        totalPoints += word.length * 10;
        cells.forEach(idx => allScoredCells.add(idx));
        formedWords.push(word);
      }
    }
    
    return { points: totalPoints, scoredCells: Array.from(allScoredCells), formedWords };
  };

  const placeLetter = (letter: string) => {
    if (state.selectedCell === null || state.winner) return;

    setState((prev) => {
      const newBoard = [...prev.board];
      newBoard[prev.selectedCell!] = letter.toUpperCase();

      const { points, scoredCells, formedWords } = checkWords(newBoard, prev.selectedCell!);
      
      const newScores = { ...prev.scores };
      if (prev.turn === 1) newScores.p1 += points;
      else newScores.p2 += points;

      let winner = prev.winner;
      if (newScores.p1 >= WIN_SCORE) winner = 1;
      if (newScores.p2 >= WIN_SCORE) winner = 2;

      return {
        ...prev,
        board: newBoard,
        scores: newScores,
        turn: prev.turn === 1 ? 2 : 1,
        timeLeft: TURN_DURATION,
        selectedCell: null,
        winner,
        lastScoredCells: scoredCells,
        wordsFormed: [...prev.wordsFormed, ...formedWords],
      };
    });
  };

  const resetGame = () => {
    setState({
      board: Array(64).fill(""),
      turn: 1,
      scores: { p1: 0, p2: 0 },
      timeLeft: TURN_DURATION,
      selectedCell: null,
      winner: null,
      lastScoredCells: [],
      wordsFormed: [],
      isForfeited: false,
    });
  };

  const forfeit = () => {
    if (state.winner) return; // already won
    setState((prev) => {
      const forfeitWinner = prev.turn === 1 ? 2 : 1;
      const newScores = { ...prev.scores };
      if (forfeitWinner === 1) newScores.p1 = WIN_SCORE;
      else newScores.p2 = WIN_SCORE;
      return {
        ...prev,
        winner: forfeitWinner,
        isForfeited: true,
        scores: newScores,
      };
    });
  };

  return {
    ...state,
    selectCell,
    placeLetter,
    resetGame,
    forfeit,
  };
}
