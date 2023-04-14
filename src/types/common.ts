export type Mode = undefined | 'character' | 'word';

export type restTime = undefined | number;

export type playingState = 'stop' | 'start' | 'pause';

export type ModeObject = {
  name: Mode;
  wording: string;
};
