import { getRandomArrayElement, generateID, getRandomPositiveInteger } from './utils.js';

const NAMES = [
  'Dustin Chambers',
  'James Graves',
  'William Terry',
  'Crystal Smith',
  'Katherine Bailey',
  'Deborah Butler',
  'Virginia Guzman',
  'Helen Day',
  'Duane Jones',
  'Eugene Johnson',
  'Antonio King',
  'Wendy Sullivan',
  'Lena Evans',
  'Bobbie Bowen',
  'Mary Johnson',
  'Joan Jones',
  'Rachel Graham',
  'Sandra Brown',
  'Jennifer Morris',
  'Vivian Clark',
  'Beatrice Jackson',
  'James Scott',
  'Julie Wilson',
  'Elsie Sanchez',
  'James Hicks',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const DESCRIPTIONS = [
  'That was me yesterday',
  'Beautiful day in a beutiful place',
  'You can tell about me everything, but you should know only one thing - I don\'t care',
  'How\'s it?',
  'Good light',
  'What\'s up, gays?',
  'I just like smth nature',
];

const COUNT_PICTURES = 25;
const countPhotosID = generateID();
const countUsersID = generateID();
const countPhotos = generateID();

function createPost () {
  return {
    id: countPhotosID(),
    url: `./photos/${countPhotos()}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(125, 500),
    comments: Array.from({length: getRandomPositiveInteger(0, 6)}, createComments),
  };
}

function createComments () {
  return {
    id: countUsersID(),
    avatar: `./img/avatar-${getRandomPositiveInteger(0, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

function getPhotoGallery () {
  return Array.from({ length: COUNT_PICTURES }, createPost);
}

export { getPhotoGallery };
