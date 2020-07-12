import Json from '../../assets/data/**/*.json';
import Xml from '../../assets/data/**/*.xml';
import Text from '../../assets/data/**/*.txt';

import { iterate } from './utils/utils';

export default {
  data: {
    json: Object.assign(...iterate(Json, '')),
    xml: Object.assign(...iterate(Xml, '')),
    txt: Object.assign(...iterate(Text, '')),
  },
};
