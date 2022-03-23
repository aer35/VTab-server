export default class BillController {
  static calcTotal(persons: string[], items: number[]) {
    let numPers = persons.length;
    let sumTotal = items.reduce((total, item) => total + item, 0);

    return sumTotal / numPers;
  }
}
