class Month {
  year: number;
  index: number;
  name: string;
  totalDays: number;
  #monthData: [string, number][];

  constructor(month: string) {
    this.name = month;
    this.year = new Date().getFullYear();
    this.#monthData = [
      ['January', 31],
      ['February', 28],
      ['March', 31],
      ['April', 30],
      ['May', 31],
      ['June', 30],
      ['July', 31],
      ['August', 31],
      ['September', 30],
      ['October', 31],
      ['November', 30],
      ['December', 31],
    ];
    this.index = this.#monthData.findIndex((data) => month === data[0]);
    this.totalDays = this.#monthData[this.index][1];
  }

  #parseFirstWeek = (startIndex: number, day = 1) => {
    const previousDay = new Date(this.year, this.index, 0).getDate();
    let firstWeek: number[] = [];
    for (let i = 0; i < 7; i++) {
      if (i < startIndex) {
        firstWeek.push(previousDay - startIndex + 1 + i);
      } else {
        firstWeek.push(day);
        day++;
      }
    }
    const result: [number[], number] = [firstWeek, day];
    return result;
  };

  #parseWeek = (weekStart: number) => {
    const week = [];
    for (let i = 0; i < 7; i++) {
      week.push(weekStart);
      weekStart++;
    }
    const result: [number[], number] = [week, weekStart];
    return result;
  };

  #parseFinalWeek = (start: number, end: number) => {
    const finalWeek = [];
    while (start <= end) {
      finalWeek.push(start);
      start++;
    }
    for (let i = 0; finalWeek.length < 7; i++) {
      finalWeek.push(i + 1);
    }
    return finalWeek;
  };

  parseMonth = () => {
    const firstWeekdayIndex = new Date(2021, this.index, 1).getDay();
    let parsedMonth: number[][] = [];

    const [week, day] = this.#parseFirstWeek(firstWeekdayIndex);
    parsedMonth.push(week);

    const fillWeeks = (startDay: number): void => {
      if (this.totalDays - startDay < 7) return;
      const [newWeek, updatedDay] = this.#parseWeek(startDay);
      parsedMonth.push(newWeek);
      return fillWeeks(updatedDay);
    };

    fillWeeks(day);

    if (parsedMonth[parsedMonth.length - 1][6] < this.totalDays) {
      parsedMonth.push(
        this.#parseFinalWeek(parsedMonth[parsedMonth.length - 1][6] + 1, this.totalDays),
      );
    }

    return parsedMonth;
  };
}

export default Month;
