export const physiology = {
  id: 'physiology',
  title: 'Physiology Layer',
  subtitle: 'Flow of neural signals and synaptic dynamics',
  svgUrl: '',
  philosophy: 'Motor and sensory balance reflects the flow of intention and experience.',
  tracts: [
    {
      id: 'dorsal_column',
      name: 'Dorsal Column',
      overview: 'An ascending tract carrying fine touch and proprioceptive information.',
      pathway: 'Enters via the dorsal root, ascends ipsilaterally in the spinal cord, and synapses in the medulla before crossing.',
      function: 'Provides the brain with precise information about limb position and texture.',
      clinical_relevance: 'Lesions cause loss of vibration and proprioception below the lesion.',
      daily_life: 'Lets you know the exact location of your hand without looking at it.',
    },
    {
      id: 'rubrospinal',
      name: 'Rubrospinal Tract',
      overview: 'A descending tract involved in gross motor control and posture.',
      pathway: 'Originates in the red nucleus, crosses immediately, and descends through the spinal cord.',
      function: 'Supports limb movement coordination and tone.',
      clinical_relevance: 'Often affected in brainstem injuries with impaired voluntary movement control.',
      daily_life: 'Stabilizes posture when reaching for a cup or changing stance.',
    },
  ],
};
