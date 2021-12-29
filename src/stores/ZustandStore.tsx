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
import { NewBootstrap } from "../types/Types";

interface State {
  bootstrap: NewBootstrap;
  current: number;
  draggingIsHappening: boolean;
  fixtures: Fixture[];
  isLoading: boolean;
  latestGameweek: number;
  liveDetails: Live[];
  mainColor: string;
  positionFilter: number[];
  secondaryColor: string;
  setBootstrap: (input: NewBootstrap) => void;
  setCurrent: (input: number) => void;
  setDraggingIsHappening: (input: boolean) => void;
  setFixtures: (input: Fixture[]) => void;
  setIsLoading: (input: boolean) => void;
  setLatestGameweek: (input: number) => void;
  setLiveDetails: (input: Live[]) => void;
  setMainColor: (input: string) => void;
  setPositionFilter: (input: number[]) => void;
  setSecondaryColor: (input: string) => void;
  setSort: (input: string[]) => void;
  setTeams: (input: Team[]) => void;
  sort: string[];
  teams: Team[];
}

export const useStore = create<State>((set) => ({
  bootstrap: null,
  current: 1,
  draggingIsHappening: false,
  fixtures: [],
  isLoading: false,
  latestGameweek: 0,
  liveDetails: null,
  mainColor: "#37003c",
  positionFilter: [1, 2, 3, 4],
  secondaryColor: "#03FF86",
  setBootstrap: (input) => set({ bootstrap: input }),
  setCurrent: (input) => set({ current: input }),
  setDraggingIsHappening: (input) => set({ draggingIsHappening: input }),
  setFixtures: (input) => set({ fixtures: input }),
  setIsLoading: (input) => set({ isLoading: input }),
  setLatestGameweek: (input) => set({ latestGameweek: input }),
  setLiveDetails: (input) => set({ liveDetails: input }),
  setMainColor: (input) => set({ mainColor: input }),
  setPositionFilter: (input) => set({ positionFilter: input }),
  setSecondaryColor: (input) => set({ secondaryColor: input }),
  setSort: (input) => set({ sort: input }),
  setTeams: (input) => set({ teams: input }),
  sort: ["total_points"],
  teams: [],
}));
