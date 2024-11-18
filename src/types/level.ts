// types/level.ts

export type LevelResponse = {
  id: number;
  name: string;
  image: string;
  numTopics: number;
  numWords: number;
};

export type LevelCreateRequest = {
  name: string;
  image: string;
};
