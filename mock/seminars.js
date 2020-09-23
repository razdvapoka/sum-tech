import { set } from 'date-fns'

const date = new Date()

const content = `
<p>In the speculative and satirical novel The Futurological Congress (1971) by Stanislaw Lem, who wrote Solaris ten years earlier, the cosmonaut Ijon Tichy, having attended a futurological congress gone grotesquely wrong, suddenly wakes up in the year 2039.</p>
<figure>
  <img src="/seminar-pic-1.jpg" />
  <figcaption>Fig 1.: Image desription. This future society is a thoroughly “psychemized society”.</figcaption>
</figure>
<p>This future society is a thoroughly “psychemized society” where death is a thing of the past and where suicides thus face the problem of being brought back to life against their will, unless they use a bomb to make sure that no remains are there to resurrect. These motifs bring Lem in conversation with Russian Cosmism, a futuristic philosophy influential before and after the October revolution in the Soviet Union. The seminar and conference at e-flux will explore these themes by closely reading both novels, as well as the Red Star - a popular science fiction novel by Alexander Bogdanov written in 1907 about socialism on Mars. The seminar will look comparatively at three film versions of Solaris: the first version made for Soviet TV in 1968 by Lidia Ishimbaeva and Boris Nirenburg, the 1972 film by Tarkovsky, as well as the most recent version directed by Steven Soderbergh in 2002 in the US, using these interpretations of Lem as ways to map ideological and socio-political changes in the futurological imaginary.</p>
`

const sessions = [
  `Theoretical and conceptual foundation of the programme
Organized around quick guest lectures / seminars / design charrettes
Opportunity for researchers to find and test collaborations among the group`,
  `Theoretical and conceptual foundation of the programme
Organized around quick guest lectures / seminars / design charrettes
Opportunity for researchers to find and test collaborations among the group`,
  `Theoretical and conceptual foundation of the programme
Organized around quick guest lectures / seminars / design charrettes
Opportunity for researchers to find and test collaborations among the group`,
]

const methodology = `This future society is a thoroughly “psychemized society” where death is a thing of the past and where suicides thus face the problem of being brought back to life against their will, unless they use a bomb to make sure that no remains are there to resurrect.`

export default {
  dilemmas: {
    date: set(date, { year: 2020, month: 9, date: 21 }).toJSON(),
    name: 'dilemmas',
    leader: 'name surname',
    slug: 'dilemmas',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
  'two-evolutions': {
    date: set(date, { year: 2020, month: 10, date: 5 }).toJSON(),
    name: 'two evolutions',
    leader: 'Anton Vidokle',
    slug: 'two-evolutions',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
  'space-civilizations': {
    date: set(date, { year: 2020, month: 10, date: 25 }).toJSON(),
    name: 'space civilizations',
    leader: 'Anton Vidokle',
    slug: 'space-civilizations',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
  'intel-lectronics': {
    date: set(date, { year: 2020, month: 10, date: 31 }).toJSON(),
    name: 'Intel-lectronics',
    leader: 'Anton Vidokle',
    slug: 'intel-lectronics',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
  'prolegomena-to-omnipotence': {
    date: set(date, { year: 2020, month: 11, date: 5 }).toJSON(),
    name: 'Prolegomena to Omnipo&shy;tence',
    leader: 'Anton Vidokle',
    slug: 'prolegomena-to-omnipotence',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
  phantomology: {
    date: set(date, { year: 2020, month: 11, date: 16 }).toJSON(),
    name: 'phantomology',
    leader: 'Anton Vidokle',
    slug: 'phantomology',
    diagram: '/sem-bg-1.svg',
    guests: [
      { name: 'Irmgaard Emmelheinz', country: 'Mexico' },
      { name: 'name surname', country: 'Country' },
    ],
    content,
    sessions,
    methodology,
    applyUrl: 'https://example.com',
  },
}
