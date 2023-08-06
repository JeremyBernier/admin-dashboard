import { MutableRefObject } from "react";

export default class MenuOption {
  key: string;
  ref?: MutableRefObject<HTMLElement | null>;

  constructor(key: string) {
    this.key = key;
    this.ref = { current: null };
    this.setRefElement = this.setRefElement.bind(this);
  }

  setRefElement(element: HTMLElement | null) {
    this.ref = { current: element };
  }
}
