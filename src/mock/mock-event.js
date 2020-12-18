import {INFO_SENTENCE_MAX_NUM, OFFERS_MAX_NUM, PHOTOS_MAX_NUM, OFFER_PRICE, EVENT_PRICE} from '../const.js';
import {getRadomNum} from '../utils/utils-common.js';
import {generateRandomIndex} from '../utils/utils-event.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

const infoTest = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;
export const eventTypes = [
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
export const offers = [
  {
    type: `Check-in`,
    title: `Add breakfast`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Check-in`,
    title: `Double bed`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Check-in`,
    title: `Parking available`,
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
    type: `Restaurant`,
    title: `Vegan menu`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Restaurant`,
    title: `Book a table`,
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
    type: `Sightseeing`,
    title: `Order tickets online`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Sightseeing`,
    title: `Skip the line`,
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
    type: `Drive`,
    title: `Refueling`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Drive`,
    title: `Hitchhiking`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Train`,
    title: `Book train tickets`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Train`,
    title: `Switch to compartment carriage`,
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
    type: `Flight`,
    title: `Switch to comfort`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Flight`,
    title: `Special lunch menu`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Ship`,
    title: `Capitain's office tour`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Ship`,
    title: `Book upper-deck cabin`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Bus`,
    title: `Book bus tickets`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Bus`,
    title: `Extra-comfort seats`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Transport`,
    title: `Option`,
    price: getRadomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRadomNum(0, 1)),
  },
  {
    type: `Taxi`,
    title: `Tips for cabman`,
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

const generateOffers = (eventType) => {
  const randomOffers = new Set();
  for (let i = 0; i < getRadomNum(0, OFFERS_MAX_NUM); i++) {
    const newOffer = offers[getRadomNum(1, offers.length - 1)];
    if (eventType === newOffer.type && newOffer.isChecked) {
      randomOffers.add(newOffer);
    }
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

const generateDestinations = () => {
  let generatedDestinations = [];
  for (let i = 0; i < destinations.length; i++) {
    const newDestination = {
      NAME: destinations[i],
      INFO: generateInfo(),
      PHOTOS: generatePhotos(),
    };
    generatedDestinations.push(newDestination);
  }
  return generatedDestinations;
};

export const generatedDestinations = generateDestinations();
export const generateEvent = () => {
  const type = generateRandomIndex(eventTypes);
  const destination = generateRandomIndex(generateDestinations());
  const date = generateDate();
  const time = generateTime();
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
    price: getRadomNum(EVENT_PRICE.MIN, EVENT_PRICE.MAX),
    offers: generateOffers(type),
    isFavorite: Boolean(getRadomNum(0, 1)),
  };
};
