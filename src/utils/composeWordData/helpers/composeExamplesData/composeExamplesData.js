import cheerify from './../cheerify/cheerify.js';
import R from 'ramda';

const removeSpeakerIcon = R.replace(/🔊/g, '');
const removeGlossary = R.replace(/\(=.*\)/g, '');
const fixDoubleSpace = R.replace(/ {2}/g, ' ');
const cleanse = R.pipe(
  removeSpeakerIcon,
  removeGlossary,
  fixDoubleSpace,
  R.trim
);

const getText = R.invoker(0, 'text');
const getForm = R.invoker(1, 'prevAll')('.PROPFORM, .PROPFORMPREP, .COLLO');

export default function getExamples(senseMarkup) {
  const $ = cheerify(senseMarkup);

  let cheerioExamples = [];
  $('.EXAMPLE').each(
    (i, el) => cheerioExamples[i] = $(el)
  );

  const examplesText = R.map(
    R.pipe(
      getText,
      cleanse,
      R.objOf('text')
    )
  )(cheerioExamples);

  const examplesForms = R.map(
    R.pipe(
      getForm,
      getText,
      R.objOf('form')
    )
  )(cheerioExamples);

  const examplesData = R.zipWith(
    R.pipe(
      R.merge,
      R.filter(R.complement(R.isEmpty))
    ), examplesForms, examplesText
  );

  return examplesData;
}