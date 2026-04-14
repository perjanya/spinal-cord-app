export const anatomy = {
  id: 'anatomy',
  title: 'Anatomy Layer',
  subtitle: 'Structural map of major tracts',
  svgUrl: '',
  philosophy: 'Sensory control connects perception with body awareness in a stable foundation.',
  tracts: [
    {
      id: 'spinothalamic',
      name: 'Spinothalamic Tract',
      overview: 'An ascending sensory tract for pain and temperature from the body to the thalamus.',
      pathway: 'Originates in the dorsal horn, crosses in the spinal cord, ascends through the brainstem to the thalamus.',
      function: 'Carries pain, temperature and crude touch information to higher centers.',
      clinical_relevance: 'Lesions cause contralateral loss of pain and temperature below the lesion level.',
      daily_life: 'Feels the heat on your hand when you touch a hot object and withdraw quickly.',
    },
    {
      id: 'corticospinal',
      name: 'Corticospinal Tract',
      overview: 'A descending motor pathway controlling voluntary movement of limbs.',
      pathway: 'Begins in motor cortex, travels through internal capsule and brainstem, crosses in the medulla, and synapses in the spinal cord.',
      function: 'Transmits motor commands for finely controlled voluntary movements.',
      clinical_relevance: 'Damage leads to spastic paralysis and hyperreflexia below the lesion.',
      daily_life: 'Helps you coordinate handwriting, reaching, and walking with precision.',
    },
  ],
};
