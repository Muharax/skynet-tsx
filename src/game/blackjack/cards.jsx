import AS from "../blackjack/img/AS.png";
import AD from "../blackjack/img/AD.png";
import AC from "../blackjack/img/AC.png";
import AH from "../blackjack/img/AH.png";

import S2 from "../blackjack/img/2S.png";
import C2 from "../blackjack/img/2C.png";
import H2 from "../blackjack/img/2H.png";
import D2 from "../blackjack/img/2D.png";

import S3 from "../blackjack/img/3S.png";
import D3 from "../blackjack/img/3D.png";
import H3 from "../blackjack/img/3H.png";
import C3 from "../blackjack/img/3C.png";

import S4 from "../blackjack/img/4S.png";
import D4 from "../blackjack/img/4D.png";
import H4 from "../blackjack/img/4H.png";
import C4 from "../blackjack/img/4C.png";

import S5 from "../blackjack/img/5S.png";
import D5 from "../blackjack/img/5D.png";
import H5 from "../blackjack/img/5H.png";
import C5 from "../blackjack/img/5C.png";

import S6 from "../blackjack/img/6S.png";
import D6 from "../blackjack/img/6D.png";
import H6 from "../blackjack/img/6H.png";
import C6 from "../blackjack/img/6C.png";

import S7 from "../blackjack/img/7S.png";
import D7 from "../blackjack/img/7D.png";
import H7 from "../blackjack/img/7H.png";
import C7 from "../blackjack/img/7C.png";

import S8 from "../blackjack/img/8S.png";
import D8 from "../blackjack/img/8D.png";
import H8 from "../blackjack/img/8H.png";
import C8 from "../blackjack/img/8C.png";

import S9 from "../blackjack/img/9S.png";
import D9 from "../blackjack/img/9D.png";
import H9 from "../blackjack/img/9H.png";
import C9 from "../blackjack/img/9C.png";

import S0 from "../blackjack/img/0S.png";
import D0 from "../blackjack/img/0D.png";
import H0 from "../blackjack/img/0H.png";
import C0 from "../blackjack/img/0C.png";

import JS from "../blackjack/img/JS.png";
import JD from "../blackjack/img/JD.png";
import JH from "../blackjack/img/JH.png";
import JC from "../blackjack/img/JC.png";

import QS from "../blackjack/img/QS.png";
import QD from "../blackjack/img/QD.png";
import QH from "../blackjack/img/QH.png";
import QC from "../blackjack/img/QC.png";

import KS from "../blackjack/img/KS.png";
import KD from "../blackjack/img/KD.png";
import KH from "../blackjack/img/KH.png";
import KC from "../blackjack/img/KC.png";


const cards = [

  { image: AS, suit: 'SPADES', value: 'ACE' },
  { image: AD, suit: 'DIAMONDS', value: 'ACE' },
  { image: AC, suit: 'CLUBS', value: 'ACE' },
  { image: AH, suit: 'HEARTS', value: 'ACE' },

  { image: S2, suit: 'SPADES', value: '2' },
  { image: D2, suit: 'DIAMONDS', value: '2' },
  { image: C2, suit: 'CLUBS', value: '2' },
  { image: H2, suit: 'HEARTS', value: '2' },

  { image: S3, suit: 'SPADES', value: '3' },
  { image: D3, suit: 'DIAMONDS', value: '3' },
  { image: C3, suit: 'CLUBS', value: '3' },
  { image: H3, suit: 'HEARTS', value: '3' },

  { image: S4, suit: 'SPADES', value: '4' },
  { image: D4, suit: 'DIAMONDS', value: '4' },
  { image: C4, suit: 'CLUBS', value: '4' },
  { image: H4, suit: 'HEARTS', value: '4' },
  
  { image: S5, suit: 'SPADES', value: '5' },
  { image: D5, suit: 'DIAMONDS', value: '5' },
  { image: C5, suit: 'CLUBS', value: '5' },
  { image: H5, suit: 'HEARTS', value: '5' },

  { image: S6, suit: 'SPADES', value: '6' },
  { image: D6, suit: 'DIAMONDS', value: '6' },
  { image: C6, suit: 'CLUBS', value: '6' },
  { image: H6, suit: 'HEARTS', value: '6' },

  { image: S7, suit: 'SPADES', value: '7' },
  { image: D7, suit: 'DIAMONDS', value: '7' },
  { image: C7, suit: 'CLUBS', value: '7' },
  { image: H7, suit: 'HEARTS', value: '7' },

  { image: S8, suit: 'SPADES', value: '8' },
  { image: D8, suit: 'DIAMONDS', value: '8' },
  { image: C8, suit: 'CLUBS', value: '8' },
  { image: H8, suit: 'HEARTS', value: '8' },

  { image: S9, suit: 'SPADES', value: '9' },
  { image: D9, suit: 'DIAMONDS', value: '9' },
  { image: C9, suit: 'CLUBS', value: '9' },
  { image: H9, suit: 'HEARTS', value: '9' },

  { image: S0, suit: 'SPADES', value: '10' },
  { image: D0, suit: 'DIAMONDS', value: '10' },
  { image: C0, suit: 'CLUBS', value: '10' },
  { image: H0, suit: 'HEARTS', value: '10' },

  { image: JS, suit: 'SPADES', value: 'JACK' },
  { image: JD, suit: 'DIAMONDS', value: 'JACK' },
  { image: JC, suit: 'CLUBS', value: 'JACK' },
  { image: JH, suit: 'HEARTS', value: 'JACK' },

  { image: QS, suit: 'SPADES', value: 'QUEEN' },
  { image: QD, suit: 'DIAMONDS', value: 'QUEEN' },
  { image: QC, suit: 'CLUBS', value: 'QUEEN' },
  { image: QH, suit: 'HEARTS', value: 'QUEEN' },

  { image: KS, suit: 'SPADES', value: 'KING' },
  { image: KD, suit: 'DIAMONDS', value: 'KING' },
  { image: KC, suit: 'CLUBS', value: 'KING' },
  { image: KH, suit: 'HEARTS', value: 'KING' },
];

export default cards;
