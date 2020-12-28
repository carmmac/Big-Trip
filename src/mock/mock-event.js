import {INFO_SENTENCE_MAX_NUM, OFFERS_MAX_NUM, PHOTOS_MAX_NUM, OFFER_PRICE, EVENT_PRICE} from '../const.js';
import {getRandomNum} from '../utils/utils-common.js';
import {generateRandomIndex} from '../utils/utils-event.js';
import dayjs from 'dayjs';
import objectSupport from 'dayjs/plugin/objectSupport';
dayjs.extend(objectSupport);

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Check-in`,
    title: `Double bed`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Check-in`,
    title: `Parking available`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Restaurant`,
    title: `Lunch in city`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Restaurant`,
    title: `Vegan menu`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Restaurant`,
    title: `Book a table`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Sightseeing`,
    title: `Order Uber`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Sightseeing`,
    title: `Order tickets online`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Sightseeing`,
    title: `Skip the line`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Drive`,
    title: `Rent a car`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Drive`,
    title: `Refueling`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Drive`,
    title: `Hitchhiking`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Train`,
    title: `Book train tickets`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Train`,
    title: `Switch to compartment carriage`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Flight`,
    title: `Add luggage`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Flight`,
    title: `Switch to comfort`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Flight`,
    title: `Special lunch menu`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Ship`,
    title: `Capitain's office tour`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Ship`,
    title: `Book upper-deck cabin`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Bus`,
    title: `Book bus tickets`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Bus`,
    title: `Extra-comfort seats`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Transport`,
    title: `Option`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
  {
    type: `Taxi`,
    title: `Tips for cabman`,
    price: getRandomNum(OFFER_PRICE.MIN, OFFER_PRICE.MAX),
    isChecked: Boolean(getRandomNum(0, 1)),
    id: generateId(),
  },
];

const generateInfo = () => {
  const infoArray = infoTest.split(`. `);
  const randomInfo = [];
  const sentenceNumber = getRandomNum(0, INFO_SENTENCE_MAX_NUM);
  for (let i = 0; i < sentenceNumber; i++) {
    randomInfo.push(infoArray[getRandomNum(0, infoArray.length - 1)]);
  }
  return randomInfo;
};

const generateOffers = (eventType) => {
  return offers.slice().filter((offer) => offer.type === eventType && offer.isChecked).slice(getRandomNum(0, OFFERS_MAX_NUM));
};

const generatePhotos = () => {
  const randomPhotos = [];
  for (let i = 0; i < getRandomNum(0, PHOTOS_MAX_NUM); i++) {
    randomPhotos.push(`http://picsum.photos/248/152?r=${Math.random()}`);
  }
  return randomPhotos;
};

const generateDate = () => {
  const MAX_DAYS_GAP = 7;
  const MIN_TIME_GAP = 30;
  const MAX_TIME_GAP = 600;
  const daysGap = getRandomNum(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const timeGap = getRandomNum(-MAX_TIME_GAP, MAX_TIME_GAP);
  const dateStart = dayjs().add(daysGap, `day`).add(timeGap, `minute`);
  const dateEnd = dayjs(dateStart).add(getRandomNum(MIN_TIME_GAP, MAX_TIME_GAP), `minute`);

  return {
    START: dateStart,
    END: dateEnd
  };
};

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
  const destination = generateRandomIndex(generatedDestinations);
  const date = generateDate();
  const duration = date.END.diff(date.START, `minute`);

  return {
    id: generateId(),
    type,
    destination,
    date,
    duration,
    price: getRandomNum(EVENT_PRICE.MIN, EVENT_PRICE.MAX),
    offers: generateOffers(type),
    isFavorite: Boolean(getRandomNum(0, 1)),
  };
};
