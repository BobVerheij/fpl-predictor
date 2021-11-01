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
  draggingIsHappening: boolean;
  setDraggingIsHappening: (input: boolean) => void;
  sort: string[];
  setSort: (input: string[]) => void;
  positionFilter: number[];
  current: number;
  bootstrap: NewBootstrap;
  isLoading: boolean;
  liveDetails: Live[];
  mainColor: string;
  setMainColor: (input: string) => void;
  secondaryColor: string;
  setSecondaryColor: (input: string) => void;
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
  current: 1,
  bootstrap: null,
  isLoading: false,
  liveDetails: null,
  mainColor: "#37003c",
  setMainColor: (input) => set({ mainColor: input }),
  secondaryColor: "#03FF86",
  setSecondaryColor: (input) => set({ secondaryColor: input }),
  setPositionFilter: (input) => set({ positionFilter: input }),
  setCurrent: (input) => set({ current: input }),
  setBootstrap: (input) => set({ bootstrap: input }),
  setIsLoading: (input) => set({ isLoading: input }),
  setLiveDetails: (input) => set({ liveDetails: input }),
  setTeams: (input) => set({ teams: input }),
  teams: [],
}));
