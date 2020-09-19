import { set } from 'date-fns'

const date = new Date()

export default {
  headerText: `
<p>In September 1974, the American science-fiction writer Philipp K. Dick, wrote a letter to the FBI,
claiming that there was a communist conspiracy disguised as science-fiction literature. This
conspiracy was orchestrated by a communist committee, which — according to Philipp K. Dick —
operated under the name of “Stanislaw Lem”.</p>
<p>While of course he was neither a committee, nor a conspiracy; Stanislaw Lem was a writer that produced a body of work so vast and so far-reaching, that it is easy to understand Philipp K. Dick’s refusal to accept that it was the work of only one person.<p/><br/>
Summa Technologiae School is organized in cooperation between e-flux and Adam Mickeiwicz Institute and curated by Julieta Aranda.
`,
  description: `Summa Technologiae begins as a pedagogical investigation that will consist of 6 seminars in different educational institutions around the world, based on the work of Stanislaw Lem and its impact across disciplines: from Literature, to Film, Philosophy, Sculpture, Architecture, Technological Innovation, and Computer Science.
  `,
  keywords: [
    'Speculative fiction',
    'Philosophy',
    'Artificial Intelligence',
    'Ecology',
    'Limits to growth',
    'Film',
    'Communication platforms development',
    'Psychoanalysis',
    'Outer space',
    'Space race',
    'Social evolution',
    'Political tendencies',
    'Architecture',
  ],
  objective: `
The main objective of this project is to try to understand the extension of Lem’s influence, across time, across geography and across disciplines. Stanislaw Lem's works addresses the human condition unflinchingly and yet with humor; he used speculations on technology as a way to speak to philosophy, and philosophy as a means with which to understand technological developments, the nature of intelligence, and the possibility of communication both with other forms of intelligence but more importantly, with ourselves across timespans and distance.`,
  lem: {
    photo: '/lem.jpg',
    bio: `
  <p>Stanislaw Lem was a Polish writer of science fiction and essays on various subjects, including philosophy, futurology, and literary criticism. Many of his science fiction stories include satire and humor. Lem's books have been translated into 41 languages and have sold over 45 million copies. From the 1950s to 2000s, he published many books, both science fiction and philosophical/futurological. Worldwide, he is best known as the author of the 1961 novel Solaris, which has been made into a feature film three times. In 1976, Theodore Sturgeon wrote that Lem was the most widely read science fiction writer in the world. The total print of Lem's books is over 30 million copies.</p>
  <p>Lem's works explore philosophical themes through speculation on technology, the nature of intelligence, the impossibility of communication with and understanding of alien intelligence, despair about human limitations, and humanity's place in the universe. They are sometimes presented as fiction, but others are in the form of essays or philosophical books.</p>
  <p>Translating his works is difficult due to passages with elaborate word formation, idiomatic wordplay, alien or robotic poetry, and puns.</p>
  `,
  },
  seminars: {
    description: `
The seminars will begin in the fall of 2020. Each seminar will meet at its own frequency (some of them every two weeks, some of them monthly, some of them every two months) and they will run the length of an “academic” semester. Half of the participants to each seminar will be there by invitation, and the seminar leaders will choose the other half through a process of open application.
  `,
    items: [
      {
        date: set(date, { year: 2020, month: 9, date: 21 }).toJSON(),
        name: 'dilemmas',
        leader: 'name surname',
        slug: 'dilemmas',
        diagram: '/sem-bg-1.svg',
      },
      {
        date: set(date, { year: 2020, month: 10, date: 5 }).toJSON(),
        name: 'two evolutions',
        leader: 'Anton Vidokle',
        slug: 'two-evolutions',
        diagram: '/sem-bg-1.svg',
      },
      {
        date: set(date, { year: 2020, month: 10, date: 25 }).toJSON(),
        name: 'space civilizations',
        leader: 'Anton Vidokle',
        slug: 'space-civilizations',
        diagram: '/sem-bg-1.svg',
      },
      {
        date: set(date, { year: 2020, month: 10, date: 31 }).toJSON(),
        name: 'Intel-lectronics',
        leader: 'Anton Vidokle',
        slug: 'intel-lectronics',
        diagram: '/sem-bg-1.svg',
      },
      {
        date: set(date, { year: 2020, month: 11, date: 5 }).toJSON(),
        name: 'Prolegomena to Omnipotence',
        leader: 'Anton Vidokle',
        slug: 'prolegomena-to-omnipotence',
        diagram: '/sem-bg-1.svg',
      },
      {
        date: set(date, { year: 2020, month: 11, date: 16 }).toJSON(),
        name: 'phantomology',
        leader: 'Anton Vidokle',
        slug: 'phantomology',
        diagram: '/sem-bg-1.svg',
      },
    ],
  },
  outcomes: {
    text: 'Possible seminar outcomes include:',
    items: ['film', 'text', 'imagery', 'exploration', 'dialogue'],
  },
  speakers: [
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Anton Vidokle',
      isLeader: true,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
    {
      name: 'Speaker Speaker',
      isLeader: false,
      photo: '/vidokle.png',
    },
  ],
  secondPhase: `the second phase of the project will be <em>a series of conferences</em> which will take place in 2021`,
}
