import dayjs from "dayjs";
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

const INFO_SENTENCE_MAX_NUM = 5;
const OFFERS_MAX_NUM = 5;
const PHOTOS_MAX_NUM = 4;

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
    type: `Check-in`,
    title: `Add breakfast`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Restaurant`,
    title: `Lunch in city`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Sightseeing`,
    title: `Order Uber`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Drive`,
    title: `Rent a car`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Flight`,
    title: `Add luggage`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Ship`,
    title: `Add luggage`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Flight`,
    title: `Switch to comfort`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Sightseeing`,
    title: `Book tickets`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Bus`,
    title: `Book tickets`,
    price: getRadomNum(10, 100),
    isChecked: Boolean(getRadomNum(0, 1)),
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
  for (let i = 0; i < getRadomNum(0, OFFERS_MAX_NUM); i++) {
    randomOffers.push(offers[getRadomNum(0, offers.length - 1)]);
  }
  return randomOffers;
};

const generatePhotos = () => {
  const photos = [];
  for (let i = 0; i < getRadomNum(0, PHOTOS_MAX_NUM); i++) {
    photos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return photos;
};

const generateDate = () => {
  const maxDaysGap = 7;
  const daysGap = getRadomNum(-maxDaysGap, maxDaysGap);
  return dayjs().add(daysGap, `day`).toDate();
};

const generateTime = () => {
  const eventTime = {
    START: {
      HOUR: getRadomNum(0, 11),
      MINUTE: getRadomNum(0, 29)
    },
    END: {
      HOUR: getRadomNum(12, 23),
      MINUTE: getRadomNum(30, 59)
    },

  };
  return {
    START: dayjs(eventTime.START),
    END: dayjs(eventTime.END),
    DURATION: {
      HOUR: eventTime.END.HOUR - eventTime.START.HOUR,
      MINUTE: eventTime.END.MINUTE - eventTime.START.MINUTE
    }
  };
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
    photos: generatePhotos(),
    price: getRadomNum(10, 500),
    offers: generateOffers(),
    isFavorite: Boolean(getRadomNum(0, 1)),
  };
};
