import { set } from 'date-fns'

const date = new Date()

export default {
  dilemmas: {
    date: set(date, { year: 2020, month: 9, date: 21 }).toJSON(),
    name: 'dilemmas',
    leader: 'name surname',
    slug: 'dilemmas',
    diagram: '/sem-bg-1.svg',
  },
  'two-evolutions': {
    date: set(date, { year: 2020, month: 10, date: 5 }).toJSON(),
    name: 'two evolutions',
    leader: 'Anton Vidokle',
    slug: 'two-evolutions',
    diagram: '/sem-bg-1.svg',
  },
  'space-civilizations': {
    date: set(date, { year: 2020, month: 10, date: 25 }).toJSON(),
    name: 'space civilizations',
    leader: 'Anton Vidokle',
    slug: 'space-civilizations',
    diagram: '/sem-bg-1.svg',
  },
  'intel-lectronics': {
    date: set(date, { year: 2020, month: 10, date: 31 }).toJSON(),
    name: 'Intel-lectronics',
    leader: 'Anton Vidokle',
    slug: 'intel-lectronics',
    diagram: '/sem-bg-1.svg',
  },
  'prolegomena-to-omnipotence': {
    date: set(date, { year: 2020, month: 11, date: 5 }).toJSON(),
    name: 'Prolegomena to Omnipotence',
    leader: 'Anton Vidokle',
    slug: 'prolegomena-to-omnipotence',
    diagram: '/sem-bg-1.svg',
  },
  phantomology: {
    date: set(date, { year: 2020, month: 11, date: 16 }).toJSON(),
    name: 'phantomology',
    leader: 'Anton Vidokle',
    slug: 'phantomology',
    diagram: '/sem-bg-1.svg',
  },
}
