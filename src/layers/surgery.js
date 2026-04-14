export const surgery = {
  id: 'surgery',
  title: 'Surgery Layer',
  subtitle: 'Interventions, decompression, and tract preservation',
  svgUrl: '',
  philosophy: 'Surgical care is a precise form of mindful intervention affecting neural flow.',
  tracts: [
    {
      id: 'corticobulbar',
      name: 'Corticobulbar Tract',
      overview: 'A descending pathway that controls facial and bulbar motor nuclei.',
      pathway: 'Arises from motor cortex and descends through the internal capsule to cranial nerve nuclei.',
      function: 'Drives voluntary movements of the face, jaw, and swallowing muscles.',
      clinical_relevance: 'Lesions may cause facial weakness and dysphagia after brain surgery.',
      daily_life: 'Allows coordinated speech and facial expression during conversation.',
    },
    {
      id: 'lateral_corticospinal',
      name: 'Lateral Corticospinal Tract',
      overview: 'The primary motor pathway for limb movement control, often considered in spine surgeries.',
      pathway: 'Crosses in the medullary pyramids and descends in the lateral funiculus of the spinal cord.',
      function: 'Permits precise voluntary movement of distal limbs.',
      clinical_relevance: 'Compression can cause motor weakness and altered reflexes below the lesion.',
      daily_life: 'Enables fine hand movements when writing or using tools.',
    },
  ],
};
