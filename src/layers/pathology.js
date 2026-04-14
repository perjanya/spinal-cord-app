export const pathology = {
  id: 'pathology',
  title: 'Pathology Layer',
  subtitle: 'Disease patterns and lesion mapping',
  svgUrl: '',
  philosophy: 'Pathology teaches the mind-body relationship through disrupted signals.',
  tracts: [
    {
      id: 'spinocerebellar',
      name: 'Spinocerebellar Tract',
      overview: 'A sensory tract that carries unconscious proprioception to the cerebellum.',
      pathway: 'Ascends ipsilaterally from the spinal cord to the cerebellum without reaching the cortex.',
      function: 'Supports coordination and balance by informing the cerebellum about limb position.',
      clinical_relevance: 'Damage causes ataxia and poor coordination in the affected limb.',
      daily_life: 'Helps you maintain balance while walking on uneven ground.',
    },
    {
      id: 'anterolateral',
      name: 'Anterolateral System',
      overview: 'A collective ascending pathway for pain and temperature.',
      pathway: 'Includes spinothalamic, spinoreticular and spinomesencephalic fibers crossing early in the spinal cord.',
      function: 'Alerts the brain to harmful stimuli and modulates arousal.',
      clinical_relevance: 'Central cord syndromes often disrupt this system first.',
      daily_life: 'Triggers reflexive withdrawal during a burn or sharp pain.',
    },
  ],
};
