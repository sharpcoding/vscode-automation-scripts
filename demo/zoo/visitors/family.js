import _ from 'lodash';
import R from 'ramda';

import { buyTickets } from '../../ticket-service/service';
import { goldenMantella } from '../animals/amphibians/frogs-and-toads/golden-mantella';
import { tomatoFrog } from '../animals/amphibians/frogs-and-toads/tomato-frog';
import { blueTailedFireBelliedNewt } from '../animals/amphibians/salamanders-and-newts/blue-tailed-fire-bellied-newt';
import { eastAfricanCrownedCrane } from '../animals/birds/cranes-trumpeters/east-african-crowned-crane';
import { sarusCrane } from '../animals/birds/cranes-trumpeters/sarus-crane';
import { whiteNapedCrane } from '../animals/birds/cranes-trumpeters/white-naped-crane';
import { carmineBeeEater } from '../animals/birds/kingfishers-hornbills-bee-eaters/carmine-bee-eater';
import { kookaburra } from '../animals/birds/kingfishers-hornbills-bee-eaters/kookaburra';
import { welcomePack } from './package/welcome-pack';

const functionsToCall = R.pipe(
  buyTickets,
  goldenMantella,
  tomatoFrog,
  blueTailedFireBelliedNewt,
  eastAfricanCrownedCrane,
  sarusCrane,
  whiteNapedCrane,
  carmineBeeEater,
  kookaburra,
  buffer => _.join(buffer, '\n')
);

const buffer = [];
console.log(functionsToCall(buffer));
