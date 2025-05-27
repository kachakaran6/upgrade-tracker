export interface Upgrade {
  id: string;
  title: string;
  done: boolean;
}

export interface Project {
  name: string;
  upgrades: Upgrade[];
}
