const NAMES = [
  'Dustin Chambers', 'James Graves', 'William Terry', 'Crystal Smith', 'Katherine Bailey', 'Deborah Butler','Virginia Guzman',
  'Helen Day', 'Duane Jones','Eugene Johnson','Antonio King','Wendy Sullivan','Lena Evans','Bobbie Bowen','Mary Johnson',
  'Joan Jones','Rachel Graham','Sandra Brown','Jennifer Morris','Vivian Clark','Beatrice Jackson','James Scott','Julie Wilson',
  'Elsie Sanchez','James Hicks'
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
  'I just like smth nature'
];


function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

function getRandomArrayElement (elements) {
  return elements[getRandomPositiveInteger(0, elements.length - 1)];
}

function createPhoto () {

  function* createID () {
    let i = 0;
    while(true) {
      yield i++;
    }
  }

  let idNumber = createID();

  return {
    id: idNumber.next().value,
    url: `./photos/${getRandomPositiveInteger(0, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomPositiveInteger(125, 500),
    comments: createUser(),
  };
}

function createUser () {

  return {
    id: '',
    avatar: `./img/avatar-${getRandomPositiveInteger(0, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
}

const similarPhoto = Array.from({length: 4}, createPhoto);
console.log(similarPhoto);
