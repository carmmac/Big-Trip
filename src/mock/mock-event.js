import {INFO_SENTENCE_MAX_NUM, OFFERS_MAX_NUM, PHOTOS_MAX_NUM, OFFER_PRICE, EVENT_PRICE} from '../const.js';
import {getRadomNum} from '../utils/utils-common.js';
import {generateRandomIndex} from '../utils/utils-event.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

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
export const destinations = [`Madrid`, `New-York`, `Las Vegas`, `Tokyo`, `Deli`];
const offers = [
  {
    type: `Check-in`,
    title: `Add breakfast`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Restaurant`,
    title: `Lunch in city`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Sightseeing`,
    title: `Order Uber`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Drive`,
    title: `Rent a car`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Flight`,
    title: `Add luggage`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Ship`,
    title: `Add luggage`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Flight`,
    title: `Switch to comfort`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Sightseeing`,
    title: `Book tickets`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Bus`,
    title: `Book tickets`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
];

const generateInfo = () => {
  const infoArray = infoTest.split(`. `);
  const randomInfo = [];
  for (let i = 0; i < getRadomNum(0, INFO_SENTENCE_MAX_NUM); i++) {
    randomInfo.push(infoArray[getRadomNum(0, infoArray.length - 1)]);
  }
  return randomInfo;
};

const generateOffers = () => {
  const randomOffers = [];
  for (let i = 0; i < getRadomNum(0, OFFERS_MAX_NUM); i++) {
    randomOffers.push(offers[getRadomNum(0, offers.length - 1)]);
  }
  return randomOffers;
};

const generatePhotos = () => {
  const randomPhotos = [];
  for (let i = 0; i < getRadomNum(0, PHOTOS_MAX_NUM); i++) {
    randomPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return randomPhotos;
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
    START: eventTime.START,
    END: eventTime.END,
    DURATION: {
      HOUR: eventTime.END.HOUR - eventTime.START.HOUR,
      MINUTE: eventTime.END.MINUTE - eventTime.START.MINUTE
    }
  };
};

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateEvent = () => {
  const type = generateRandomIndex(eventTypes);
  const destination = generateRandomIndex(destinations);
  const date = generateDate();
  const time = generateTime();
  const info = generateInfo();
  const duration = {
    HOUR: time.END.HOUR - time.START.HOUR,
    MINUTE: time.END.MINUTE - time.START.MINUTE
  };

  return {
    id: generateId(),
    type,
    destination,
    date,
    time,
    duration,
    info,
    photos: generatePhotos(),
    price: getRadomNum(EVENT_PRICE.MIN, EVENT_PRICE.MAX),
    offers: generateOffers(),
    isFavorite: Boolean(getRadomNum(0, 1)),
  };
};
