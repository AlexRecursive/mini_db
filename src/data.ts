export interface IItems {
  i: string,
  x: number,
  y: number,
  w: number,
  h: number,
  static?: boolean
}

export const itemsDefault: IItems[] = [
  {i: 'add', x: 0, y: 0, w: 1, h: 1, static: true},
  {i: 'First', x: 1, y: 0, w: 1, h: 1},
  {i: 'Second', x: 2, y: 0, w: 1, h: 1},
  {i: 'Third', x: 3, y: 0, w: 1, h: 1}
]