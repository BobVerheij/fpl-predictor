/* eslint-disable no-unused-vars */
import {
  Bootstrap,
  Fixture,
  Team,
  LiveElementStats,
  Element,
  LiveElementExplainStat,
  Live,
  LiveElement,
} from "fpl-api";
import create from "zustand";

interface NewStats extends LiveElement {
  gameweek: number;
  highest: {
    minutes?: number;
    goals_scored?: number;
    assists?: number;
    clean_sheets?: number;
    goals_conceded?: number;
    own_goals?: number;
    penalties_saved?: number;
    penalties_missed?: number;
    yellow_cards?: number;
    red_cards?: number;
    saves?: number;
    bonus?: number;
    bps?: number;
    influence?: string;
    creativity?: string;
    threat?: string;
    ict_index?: string;
    total_points?: number;
    in_dreamteam?: boolean;
  };
}

interface NewElement extends Element {
  history: NewStats[];
}

interface NewBootstrap extends Omit<Bootstrap, "elements"> {
  elements: NewElement[];
}

interface State {
  draggingIsHappening: boolean;
  setDraggingIsHappening: (input: boolean) => void;
  sort: string[];
  setSort: (input: string[]) => void;
  positionFilter: number[];
  current: number;
  bootstrap: NewBootstrap;
  isLoading: boolean;
  liveDetails: Live[];
  setCurrent: (input: number) => void;
  setPositionFilter: (input: number[]) => void;
  setBootstrap: (input: NewBootstrap) => void;
  setIsLoading: (input: boolean) => void;
  setLiveDetails: (input: Live[]) => void;
  setTeams: (input: Team[]) => void;
  teams: Team[];
}

export const useStore = create<State>((set) => ({
  draggingIsHappening: false,
  setDraggingIsHappening: (input) => set({ draggingIsHappening: input }),
  sort: ["total_points"],
  setSort: (input) => set({ sort: input }),
  positionFilter: [1, 2, 3, 4],
  current: 0,
  bootstrap: null,
  isLoading: false,
  liveDetails: [],
  setPositionFilter: (input) => set({ positionFilter: input }),
  setCurrent: (input) => set({ current: input }),
  setBootstrap: (input) => set({ bootstrap: input }),
  setIsLoading: (input) => set({ isLoading: input }),
  setLiveDetails: (input) => set({ liveDetails: input }),
  setTeams: (input) => set({ teams: input }),
  teams: [],
}));
