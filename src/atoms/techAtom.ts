import { atom } from "recoil";

const techTreeState = atom({
  key: "tech-tree-state",
  default: [
    {
      id: 0,
      name: "Fire",
      description: "Fire is a chemical reaction that releases light and heat. It is a chemical reaction between oxygen and fuel. It is used for cooking, keeping warm, and signaling danger.",
      prerequisites: [],
      year: -3000,
    }
  ] as Tech[],
});

const yearState = atom({
  key: "year-state",
  default: -3000,
});

export {
  techTreeState,
  yearState,
};
