import { atom } from "recoil";

const techSelectModalOpenState = atom({
  key: "tech-select-modal-open",
  default: false,
});

export {
  techSelectModalOpenState,
};
