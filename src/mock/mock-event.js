import dayjs from "dayjs";

const INFO_SENTENCE_MAX_NUM = 5;
const OFFERS_MAX_NUM = 5;

const getRadomNum = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const infoTest = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
const eventTypes = [
  `Check-in`,
  `Sightseeing`,
  `Restaurant`,
  `Taxi`,
  `Bus`,
  `Train`,
  `Ship`,
  `Transport`,
  `Drive`,
  `Flight`,
];
const destinations = [`Madrid`, `New-York`, `Las Vegas`, `Tokyo`, `Deli`];
const offers = [
  {
    type: `food`,
    title: `Add breakfast`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `food`,
    title: `Lunch in city`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `transport`,
    title: `Order Uber`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `transport`,
    title: `Rent a car`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `flight`,
    title: `Add luggage`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `flight`,
    title: `Switch to comfort`,
    price: `${getRadomNum(10, 100)}$`,
  },
  {
    type: `Sightseeing`,
    title: `Book tickets`,
    price: `${getRadomNum(10, 100)}$`,
  },
];

const generateData = (data) => {
  const randomData = data[getRadomNum(0, data.length - 1)];
  return randomData;
};

const generateInfo = () => {
  const infoArray = infoTest.split(`. `);
  let randomInfo = [];
  for (let i = 0; i < INFO_SENTENCE_MAX_NUM; i++) {
    randomInfo.push(infoArray[getRadomNum(0, infoArray.length - 1)]);
  }
  return randomInfo;
};

const generateOffers = () => {
  let randomOffers = [];
  for (let i = 0; i < OFFERS_MAX_NUM; i++) {
    randomOffers.push(offers[getRadomNum(0, offers.length - 1)]);
  }
  return randomOffers;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRadomNum(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();
};

const generateTime = () => {
  const eventTime = {
    START: getRadomNum(0, 11),
    END: getRadomNum(12, 23),
  };
  eventTime.DURATION = eventTime.END - eventTime.START;
  return eventTime;
};

export const generateEvent = () => {
  const type = generateData(eventTypes);
  const destination = generateData(destinations);
  const date = generateDate();
  const time = generateTime();
  const info = generateInfo();

  return {
    type,
    destination,
    date,
    time,
    info,
    photo: `http://picsum.photos/248/152?r=${Math.random()}`,
    price: `${getRadomNum(10, 1000)}$`,
    offers: generateOffers(),
    isFavourite: Boolean(getRadomNum(0, 1)),
  };
};
