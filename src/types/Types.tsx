import { Bootstrap, Element, LiveElement } from "fpl-api";

export interface NewStats extends LiveElement {
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

export interface NewElement extends Element {
  sortStats: {
    a: number;
    b: number;
  };
  history: NewStats[];
}

export interface NewBootstrap extends Omit<Bootstrap, "elements"> {
  elements: NewElement[];
}
