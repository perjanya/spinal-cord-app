export const neurology = {
  id: 'neurology',
  title: 'Neurology Layer',
  subtitle: 'Functional circuits and clinical localization',
  svgUrl: '',
  philosophy: 'Neurological insight arises from observing how pathways connect mind and movement.',
  tracts: [
    {
      id: 'vestibulospinal',
      name: 'Vestibulospinal Tract',
      overview: 'A descending pathway that stabilizes posture and balance.',
      pathway: 'Begins in vestibular nuclei and descends ipsilaterally to spinal motor neurons.',
      function: 'Maintains upright posture during head motion and sudden shifts.',
      clinical_relevance: 'Lesions lead to balance problems and trunk instability.',
      daily_life: 'Keeps you steady when the bus accelerates or turns sharply.',
    },
    {
      id: 'tectospinal',
      name: 'Tectospinal Tract',
      overview: 'A descending tract coordinating head and eye movements.',
      pathway: 'Originates in the superior colliculus and crosses near the midbrain before descending.',
      function: 'Aligns gaze and head position in response to visual stimuli.',
      clinical_relevance: 'Damage impairs reflexive head turning to new visual targets.',
      daily_life: 'Helps you turn toward a sudden flash of light or movement.' ,
    },
  ],
};
