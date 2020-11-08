# React Jalali Datepicker

![Rangepicker](https://github.com/a-m-dev/react-jalali-datepicker/blob/master/src/img/jalali.png)

<br />
A Simple jalali datepicker for React and React-native!

This package is all about datepickers for react and new features of it will release very soon like `SinglePicker`, `InputPicker` and so on!

### The General Idea

This datepicker component has been developed in a way that currenly supports the Jalaali and global Gregorian calendars and the base idea was to provide a prop called `isJalaali`, wich will accept a `Boolean`, to datepicker to keep track of usage for that!

### components

- `RangePicker`
- `SinglePicker`
- `InputPicker` - currenly in development

<br />
<br />

### RangePicker

This component main use case is for selecting a range from datepicker. our date picker has two locale which is based on Jalaali and Gregorian style whcih can be modefined by `isJalaali` prop that is been passed to `RangePicker` component. a simple use case of that would be like below:

```jsx
import { RangePicker } from "react-jalali-datepicker";

const YourComponent = () => {
  return (
    <section>
      <RangePicker isJalaali={true} />
    </section>
  );
};
```

this will give you the `Rangepicker` Component to use!

#### How to get Date out of this picker?

there is a prop that os been shipped with this component called `onChangeRange`, which will accpet a function. the function will recieve an argument called `selectedRange` which is an Object that contains two keys:

- `startDate` - selected start date, default will be `null`
- `stopDate` - selected stop date, default will be `null`

these are the selected range that is being selected from range picker! you can do what ever you want to do with them like save in state or send it through api call or what ever you want to do with it!

a simple use case is like below where we just destructure the `startDate` and `stopDate` from `selectedRange` argument that is being passed to our handler and log it to the console:

```jsx
import { RangePicker } from "react-jalali-datepicker";

const YourComponent = () => {
  // you can use `useCallback` here, but i just kept it simple
  const rangeHandler = ({ startDate, stopDate }) => {
    console.log("ON_CHANGE_RANGE: ", { startDate, stopDate });
  };

  return (
    <section>
      <RangePicker isJalaali={true} onChangeRange={rangeHandler} />
    </section>
  );
};
```

#### how to disable days before today?

`RangePicker` component has a handy prop called `shouldDisableBeforeToday` which recieves a `Boolean` indicates that should the days before today be disabled or not! simple use case would be like below:

```jsx
import { RangePicker } from "react-jalali-datepicker";

const YourComponent = () => {
  // you can use `useCallback` here, but i just kept it simple
  const rangeHandler = ({ startDate, stopDate }) => {
    console.log("ON_CHANGE_RANGE: ", { startDate, stopDate });
  };

  return (
    <section>
      <RangePicker isJalaali={true} shouldDisableBeforeToday={true} />
    </section>
  );
};
```

#### how to show more month in table?

there is a props called `numberOfMonths` which most of the datepickers has these days, which will get a `Number` and it shows the number of monthes since today, for example if we are in May and the passed number was 2 the the rangepicker shows the May and June.

#### how to pass default selected range?

there is a props called `defaultSelectedRange` which will recieve an Object type with this shape:

```javascript

  {
    startDate: null,
    stopDate: null
  }

```

**keep in mind these important points**

1.  the date might be in this format all time `YYYY-MM-DD`
2.  if your `isJalaali` prop is true you might pass date in Jalaali format like `1399-3-12` and in contrast if your `isJalaali` is false you might pass date in Gregorian format like `2020-5-25`(also you can skip the leading 0 befor day and month it the day ot month has only one character); and for that you might have a mechanisem that keeps track of `isJalaali` and based on isJalaali it will give the proper values, you may need `moment-jalaali` for that to handle it in your side! and also note that there are some utils function like `converDate` which you can pull from package to handle this part a simple useCase is like below:

```js
import { convertDate, DATE_FORMATS } from "react-jalali-datepicker";

const gregDate = "2020-5-25";
const jalaaliDate = "1399-3-5";
const { GEORGIAN_DATE_FORMAT, JALAALI_DATE_FORMAT } = DATE_FORMATS;
const resultInJalaali = convertDate({ gregDate, GEORGIAN_DATE_FORMAT });
const resultInGregorian = convertDate({ jalaaliDate, GEORGIAN_DATE_FORMAT });

console.log(resultInJalaali); // 1399-3-5
console.log(resultInGregorian); // 2020-5-25
```

### some features of RangePicker component

1. if you had a button that keeps track of `isJalaali` prop to convert tha datepicker type to `Jalaali` or `Gregorian`, the `Rangepicker` component wont lost the selected range between type cahnges, you alweays have your selected range in proper format!
2. you can put some custome styles on you rangepicker to make it fully custome! since it written in BEM, you can keep track of `.range-picker` class and replace the subsequent classnames. just inspect and get the classnames to see what i mean, i will put the classnames here as soon as possible!

I will update the documentation as soon as it is possible, jut DM me or find me on social with @a_m_dev!







### Contributers

| [<img src="https://avatars1.githubusercontent.com/u/29652890?s=460&u=4eaf008b6aae70c8b7a7afa39901e0af7247644c&v=4" width="100px;"/><br /><sub><b>Ahmad Mirzaei</b></sub><br />](https://github.com/a-m-dev) | [<img src="https://avatars0.githubusercontent.com/u/40192286?s=460&v=4" width="100px;"/><br /><sub><b>Najmah Hosseini Majd</b></sub><br />](https://github.com/hosseiniMajd) |
|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
