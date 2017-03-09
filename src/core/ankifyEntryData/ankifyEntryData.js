import R from 'ramda';
import ankifySenseData from '../ankifySenseData/ankifySenseData';

const ankifyEntryData = R.curry((ankifySenseData, { headword, pronunciation }, entryData) => {
  const { senses } = entryData;

  const cards = R.pipe(
    R.map(
      ankifySenseData({headword, pronunciation})
    ),
    R.reject(R.isEmpty),
    R.join('\n')
  )(senses);

  return cards;
});

export {ankifyEntryData};
export default ankifyEntryData(ankifySenseData);
