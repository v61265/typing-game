export type Mode = undefined | 'character' | 'word';

export type playingState = 'stop' | 'start' | 'pause' | undefined;

export type ModeObject = {
  name: Mode;
  wording: string;
};

export type TypingInfo = {
  nowIndex: number;
  isWrong: boolean;
  inputValue: string | number;
};

export type ScoreInfo = {
  allTypeNumber: number;
  correctTypeNumber: number;
  score: number;
};
