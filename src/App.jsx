import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useMemo, useRef, useState } from 'react';

const knowMoreBasics = `The Dorsal Column pathway is the body's high-speed data cable for discriminative touch, allowing you to recognize a coin in your pocket without looking or to feel the vibration of a tuning fork. It begins with first-order neurons in the Dorsal Root Ganglion, which send long axons up the back of the spinal cord in two bundles: the Fasciculus Gracilis for the legs and lower body, and the Fasciculus Cuneatus for the arms and upper body. These fibers stay on the same side they entered until they reach the lower medulla of the brainstem.

In the medulla, they synapse with second-order neurons at the Nucleus Gracilis and Nucleus Cuneatus. It is here that the fibers decussate in the sensory decussation, forming the Medial Lemniscus. These crossed fibers travel to the VPL nucleus of the thalamus, where third-order neurons take the information to the somatosensory cortex. Because of this crossing, the left side of your brain perceives what your right hand touches. Clinically, damage here leads to sensory ataxia, often symbolized by a positive Romberg sign.`;

const knowMoreClinical = `The Romberg test depends on the three-legged stool of balance: vision, vestibular input from the inner ear, and proprioception from the dorsal columns. Under normal conditions, the brain needs at least two of these three inputs to keep the body upright.

In a positive Romberg test, the proprioception leg is impaired by dorsal column pathway damage. With eyes open, vision compensates. When the patient closes their eyes, that compensation is removed; with only vestibular input left, the patient sways or falls.

This is sensory ataxia. It is distinct from cerebellar ataxia, where the patient remains unsteady even with eyes open. Loss of conscious joint-position sense is a hallmark of conditions such as Tabes Dorsalis and Subacute Combined Degeneration of the spinal cord.`;

const lateralOverview = `The lateral spinothalamic tract is a major ascending sensory pathway that transmits pain and temperature. It uses a three-neuron chain that quickly relays noxious and thermal information from the periphery to the cerebral cortex for conscious perception.

First-order neurons start at skin receptors, travel to the dorsal root ganglion, enter the spinal cord, and move up or down 1-2 segments through Lissauer's tract before synapsing in the dorsal horn. Second-order neurons cross through the anterior white commissure, ascend as the spinal lemniscus, and synapse in the VPL nucleus of the thalamus. Third-order neurons travel through the internal capsule to the primary somatosensory cortex.

Because the fibers cross soon after entering the spinal cord, a lateral spinothalamic tract lesion causes contralateral loss of pain and temperature, usually beginning 1-2 segments below the lesion.`;

const dcmlSupplementary = {
  title: 'SEQ',
  blocks: [
    {
      type: 'scenario',
      text: 'A 60-year-old woman was involved in a road traffic accident and sustained trauma to the right side of her spinal cord at the T8 level. On examination, she has loss of vibration sense, fine touch, and position sense in her right lower limb below the level of injury. Pain and temperature sensations are intact.',
    },
    { type: 'qa', question: 'A. State the tract that is damaged in this patient.', answer: 'DCML pathway.' },
    {
      type: 'qa',
      question: 'B. Explain why the patient has ipsilateral sensory loss in the right lower limb below the lesion.',
      answer: 'First-order neurons enter the spinal cord via dorsal roots and ascend ipsilaterally in the posterior funiculus. Lower-limb fibers travel in the fasciculus gracilis. At T8, these fibers have not yet decussated; therefore, the lesion causes ipsilateral sensory loss in the right lower limb below the lesion.',
    },
    { type: 'qa', question: 'C. State where decussation occurs in the damaged pathway.', answer: 'Decussation occurs in the lower medulla.' },
    { type: 'qa', question: 'D. State what would happen if the lesion occurred after decussation.', answer: 'A lesion after decussation causes contralateral loss of fine touch and proprioception.' },
    { type: 'heading', text: 'Curious Clinician' },
    {
      type: 'qa',
      question: '1. Why do the dorsal columns not decussate in the spinal cord unlike the spinothalamic tract?',
      answer: 'The dorsal columns carry fine and discriminative touch, vibration, conscious proprioception, and two-point discrimination. These modalities require high spatial precision, preserved somatotopic organization, and fast conduction. First-order neurons therefore ascend ipsilaterally in the posterior funiculus to the lower medulla before synapsing and crossing.',
    },
    {
      type: 'qa',
      question: '2. Why does the fasciculus gracilis carry lower-limb fibers medially and the fasciculus cuneatus carry upper-limb fibers laterally?',
      answer: 'Every spinal segment adds its sensory fibers to the lateral edge of the existing bundle. Fibers that entered lowest in the cord are pushed progressively medially as new fibers join from the side at each successive level.',
    },
    { type: 'image', src: '/Images/dcml/Positiontracts.png', alt: 'Position of gracile and cuneate fibers in the dorsal columns' },
    { type: 'subheading', text: 'Clinical significance in localizing cord lesions' },
    { type: 'paragraph', text: 'A central cord lesion, such as syringomyelia or central cord syndrome after hyperextension injury, expands outward from the center and reaches the medially placed sacral fibers last. This produces sacral sparing: proprioception may be lost in the legs while perianal sensation is preserved.' },
    { type: 'paragraph', text: 'In a peripheral cord lesion, such as an extramedullary tumor, the laterally placed cervical fibers are affected first.' },
  ],
};

const lateralSupplementary = {
  title: 'SEQ: Lateral Spinothalamic Tract',
  blocks: [
    {
      type: 'qa',
      question: '1. Why does the lateral spinothalamic tract decussate within the spinal cord rather than ascending ipsilaterally like the dorsal column pathway?',
      answer: 'The tract carries pain, temperature, and itch, which require rapid protective responses rather than highly precise spatial discrimination. First-order neurons synapse soon after entering the dorsal horn. Second-order neurons cross through the anterior white commissure within one or two spinal segments and ascend contralaterally. This early decussation rapidly sends protective sensory information to higher centers.',
    },
    {
      type: 'qa',
      question: '2. Why are sacral fibers located laterally and cervical fibers located medially within the lateral spinothalamic tract?',
      answer: 'As pain and temperature fibers enter at progressively higher levels, newly entering fibers are added medially. Fibers from lower levels are displaced laterally. From lateral to medial, the order is: Sacral -> Lumbar -> Thoracic -> Cervical.',
    },
    { type: 'heading', text: 'Clinical Significance in Localizing Cord Lesions' },
    { type: 'subheading', text: 'Central Cord Lesion (Syringomyelia)' },
    { type: 'paragraph', text: 'A syrinx expanding from the central canal first damages crossing spinothalamic fibers in the anterior white commissure. This causes bilateral pain and temperature loss, often in cervical dermatomes with a cape-like distribution over the shoulders and upper limbs. Sacral fibers lie laterally and are affected late, producing sacral sparing.' },
    { type: 'subheading', text: 'Peripheral Compression Lesion (Extramedullary Tumor)' },
    { type: 'paragraph', text: 'An outside-in tumor compresses the lateral fibers first. Sacral pain and temperature loss therefore occurs early, while cervical fibers are affected later. This sacral involvement without sacral sparing helps distinguish an extramedullary lesion from an intramedullary lesion.' },
    { type: 'heading', text: 'Curious Clinician' },
    {
      type: 'qa',
      question: 'Why does a patient with syringomyelia lose pain and temperature sensation but preserve fine touch and proprioception?',
      answer: 'Crossing spinothalamic fibers lie in the anterior white commissure beside the central canal and are damaged early by an expanding syrinx. The posteriorly placed dorsal columns remain intact initially. Pain and temperature are lost while fine touch, vibration, and proprioception are preserved, producing dissociated sensory loss.',
    },
    {
      type: 'qa',
      question: 'Why does spinothalamic sensory loss usually begin 1-2 segments below the lesion?',
      answer: "After entering the cord, first-order pain fibers travel up or down in Lissauer's tract before synapsing in the dorsal horn. The second-order neurons then cross and ascend. A lateral spinothalamic lesion therefore causes contralateral pain and temperature loss beginning about 1-2 spinal segments below the lesion.",
    },
  ],
};

const ventralSupplementary = {
  title: 'SEQ: Anterior Spinothalamic Tract',
  blocks: [
    {
      type: 'qa',
      question: '1. Why does the anterior spinothalamic tract decussate in the spinal cord similar to the lateral spinothalamic tract?',
      answer: 'The anterior spinothalamic tract carries crude touch and pressure as part of the anterolateral system. First-order neurons enter through dorsal roots and synapse mainly in the nucleus proprius, Rexed laminae III and IV. Second-order neurons cross through the anterior white commissure within one or two spinal segments and ascend contralaterally. Crude touch does not require the highly precise localization preserved by the dorsal column pathway, so it crosses early with the anterolateral system.',
    },
    {
      type: 'qa',
      question: '2. Why is sensory loss due to anterior spinothalamic tract lesions often less obvious than dorsal column lesions?',
      answer: 'Crude touch has bilateral representation. Overlapping input from the opposite side and contributions from the dorsal column pathway preserve some tactile perception after a unilateral lesion. Complete loss is uncommon; patients may detect touch but localize it poorly, so deficits can be subtle.',
    },
    { type: 'heading', text: 'Clinical Significance in Localizing Cord Lesions' },
    { type: 'subheading', text: 'Central Cord Lesion (Syringomyelia)' },
    { type: 'paragraph', text: 'As a syrinx expands around the central canal, crossing fibers of the lateral spinothalamic tract and anterior spinothalamic tract may be affected. Findings include bilateral loss of pain and temperature, variable reduction of crude touch, and initial preservation of dorsal column modalities.' },
    { type: 'subheading', text: 'Brown-Sequard Syndrome' },
    { type: 'paragraph', text: 'In spinal cord hemisection, anterior spinothalamic fibers have already crossed. There may be contralateral reduction of crude touch and pressure below the lesion, but ipsilateral sensation may persist because of bilateral representation. The deficit is often less dramatic than pain and temperature loss.' },
    { type: 'heading', text: 'Curious Clinician' },
    {
      type: 'qa',
      question: 'Why can a patient still feel touch even after severe spinothalamic tract damage?',
      answer: 'Touch travels through multiple pathways: the anterior spinothalamic tract carries crude touch, while the dorsal column-medial lemniscus pathway carries fine touch. Damage to one pathway therefore does not completely abolish tactile sensation.',
    },
  ],
};

const spinocerebellarSupplementary = {
  title: 'SEQ: Spinocerebellar Tracts',
  blocks: [
    { type: 'qa', question: '1. Why do spinocerebellar tracts terminate in the cerebellum instead of the cerebral cortex like the dorsal column pathway?', answer: 'Spinocerebellar tracts carry unconscious proprioceptive information from muscles, tendons, joints, and spinal interneurons. They continuously inform the cerebellum about body position and movement so posture, balance, and coordination can be adjusted in real time. They provide rapid feedback rather than conscious perception.' },
    { type: 'qa', question: '2. Why do both posterior and anterior spinocerebellar tracts ultimately convey information to the ipsilateral cerebellar hemisphere?', answer: 'The posterior tract ascends without crossing and enters through the inferior cerebellar peduncle. The anterior tract crosses in the spinal cord and crosses again near or within the cerebellum as it enters through the superior cerebellar peduncle. This double decussation returns information to the side of origin, matching the cerebellum\'s ipsilateral control of coordination.' },
    { type: 'heading', text: 'Clinical Significance in Localizing Cord Lesions' },
    { type: 'subheading', text: 'Lesion of the Posterior Spinocerebellar Tract' },
    { type: 'paragraph', text: 'Because the tract does not cross, a lesion produces ipsilateral limb ataxia, an unsteady gait, impaired coordination, and difficulty performing smooth movements.' },
    { type: 'subheading', text: 'Lesion of the Cerebellum' },
    { type: 'paragraph', text: 'Spinocerebellar pathways terminate ipsilaterally. A right cerebellar lesion therefore produces right-sided ataxia, dysmetria, and intention tremor.' },
    { type: 'heading', text: 'Curious Clinician' },
    { type: 'qa', question: 'Why do patients with cerebellar lesions fall toward the side of the lesion?', answer: 'Each cerebellar hemisphere coordinates the ipsilateral side of the body. Damage disrupts coordination on that same side: a right cerebellar lesion causes right-sided ataxia, and a left lesion causes left-sided ataxia.' },
    { type: 'qa', question: 'Why can a patient have severe ataxia but normal muscle strength?', answer: 'Spinocerebellar tracts do not carry motor commands. They provide feedback about limb position, muscle length, tendon tension, and ongoing movement. The patient can generate force but cannot coordinate it accurately, producing dysmetria, intention tremor, past-pointing, and gait ataxia with preserved power.' },
    { type: 'qa', question: "Why is Romberg's test usually negative in pure cerebellar disease?", answer: "Romberg's test primarily evaluates proprioceptive pathways. In cerebellar disease, proprioceptive input is intact but cannot be processed correctly. The patient is already unsteady with eyes open, and closing the eyes does not produce the defining deterioration of a positive Romberg test. In dorsal column disease, the patient is relatively stable with eyes open but falls when the eyes close." },
    { type: 'qa', question: "Why does Friedreich's ataxia produce both sensory and cerebellar ataxia?", answer: "Friedreich's ataxia affects the dorsal columns, spinocerebellar tracts, dorsal root ganglia, and corticospinal tracts. Patients lose both conscious proprioception from dorsal column dysfunction and unconscious proprioception from spinocerebellar dysfunction, causing profound gait instability and frequent falls." },
    { type: 'heading', text: 'Clinical Pearl' },
    { type: 'pearl', text: 'The dorsal columns tell the brain where the limb is. The spinocerebellar tracts tell the cerebellum what the limb is doing.\n\nDCML = Conscious proprioception\nSpinocerebellar = Unconscious proprioception' },
  ],
};

const rexedLaminaRows = [
  ['Dorsal Horn (Sensory)', 'I', 'Marginal Zone', 'Receives sharp, fast pain from A-delta fibers.'],
  ['Dorsal Horn (Sensory)', 'II', 'Substantia Gelatinosa', 'Receives dull, slow pain from C fibers. Important for pain gating and opioid receptors.'],
  ['Dorsal Horn (Sensory)', 'III and IV', 'Nucleus Proprius', 'Processes non-painful tactile stimuli such as light touch and pressure.'],
  ['Dorsal Horn (Sensory)', 'V', '-', 'Responds to complex mechanical stimuli and visceral or referred pain.'],
  ['Dorsal Horn (Sensory)', 'VI', '-', 'Processes proprioception; most prominent in cervical and lumbar enlargements.'],
  ['Intermediate (Autonomic)', 'VII', "Intermediolateral Column and Clarke's Column", 'IML carries sympathetic preganglionics T1-L2 and parasympathetics S2-S4; Clarke\'s column relays unconscious proprioception to the cerebellum.'],
  ['Ventral Horn (Motor)', 'VIII', '-', 'Commissural interneurons coordinate contralateral and multisegmental motor activity.'],
  ['Ventral Horn (Motor)', 'IX', 'Motor Nuclei', 'Alpha and gamma motor neurons innervate skeletal muscle. Medial groups serve trunk; lateral groups serve limbs.'],
  ['Central', 'X', 'Grisea Centralis', 'Gray matter around the central canal and a site of local fiber crossing.'],
];

const brownSequardRows = [
  ['Lateral Corticospinal Tract', 'Lower medulla (pyramidal decussation)', 'Ipsilateral motor loss below the lesion, progressing to upper motor neuron signs.'],
  ['Dorsal Column-Medial Lemniscus', 'Lower medulla', 'Ipsilateral loss of fine touch, vibration, two-point discrimination, and conscious proprioception.'],
  ['Lateral Spinothalamic Tract', 'Spinal cord through the anterior white commissure', 'Contralateral loss of pain and temperature, usually starting 1-2 segments below the lesion.'],
];

const lateralPathwayLevels = [
  {
    id: 'lateral-stt-modalities',
    phase: 'Level 1',
    label: 'Pain And Temperature',
    shortLabel: 'Modalities',
    prompt: 'Which type of sensation is primarily carried by the lateral spinothalamic tract?',
    type: 'mcq',
    hint: 'This tract carries protective sensations that warn about tissue damage and heat or cold.',
    options: ['Proprioception and vibration', 'Two-point discrimination', 'Crude touch and pressure', 'Pain and temperature'],
    answer: 'Pain and temperature',
    knowMore: lateralOverview,
    knowMoreImages: [
      {
        src: '/lateral-spinothalamic.png',
        alt: 'Lateral spinothalamic tract diagram',
        caption: 'Lateral spinothalamic tract overview.',
      },
    ],
  },
  {
    id: 'lateral-stt-laminae',
    phase: 'Level 2',
    label: 'Rexed Laminae',
    shortLabel: 'Laminae',
    prompt: 'C fibers carrying pain signals synapse primarily in Rexed Lamina ________ of the dorsal horn before the pathway ascends via the lateral spinothalamic tract.',
    type: 'blank',
    placeholder: 'Type the lamina',
    answer: 'Lamina I and II (Rexed)',
    acceptedAnswers: ['rexed lamina i', 'rexed lamina ii', 'rexed lamina i and ii', 'lamina i', 'lamina ii', 'lamina i and ii', 'i', 'ii', 'i and ii', '1', '2', '1 and 2'],
    accepted: ['lamina i', 'lamina 1', 'lamina ii', 'lamina 2', 'i and ii', '1 and 2', 'substantia gelatinosa'],
    minMatches: 1,
    hint: 'Slow dull pain is especially associated with the substantia gelatinosa.',
    knowMore: `C fibers are unmyelinated, slow-conducting fibers that carry dull, aching, or burning pain. They predominantly terminate in Lamina II, the substantia gelatinosa. From there, the signal is processed and passed to deeper laminae such as Lamina V or directly to second-order projection neurons that cross to form the lateral spinothalamic tract.

A-delta fibers, which carry sharp fast pain, tend to synapse primarily in Lamina I and Lamina V.`,
    knowMoreTables: [
      {
        title: 'Rexed Laminae High-Yield Map',
        headers: ['Region', 'Lamina', 'Name', 'Clinical And Functional High-Yields'],
        rows: rexedLaminaRows,
      },
    ],
  },
  {
    id: 'lateral-stt-somatotopy',
    phase: 'Level 3',
    label: 'Somatotopic Order',
    shortLabel: 'Sacral Lateral',
    prompt: 'As fibers ascend through the spinal cord within the lateral spinothalamic tract, sacral fibers are positioned most ________ and cervical fibers most ________.',
    type: 'blank',
    placeholder: 'Type both positions',
    answer: 'Lateral for sacral fibers; medial for cervical fibers',
    accepted: ['lateral', 'medial'],
    minMatches: 2,
    hint: 'Lower body fibers enter first and are pushed outward as newer higher-level fibers join medially.',
    knowMore: `The arrangement of axons in the lateral spinothalamic tract follows a layering effect. As sensory fibers enter at progressively higher spinal levels, newer fibers add to the medial side of the tract and push older lower-level fibers laterally.

Sacral and lumbar fibers enter lowest and become the most superficial or lateral fibers. Cervical and thoracic fibers join later and sit more medially.

Clinical correlation: in syringomyelia, an expanding central syrinx first affects local crossing fibers and then the medial spinothalamic fibers. A cervical syrinx can therefore cause a cape-like loss of pain and temperature across the arms and shoulders while sparing sacral sensation until later.`,
    knowMoreImages: [
      {
        src: '/Images/spinothalamic/Positiontracts.png',
        alt: 'Labeled lateral spinothalamic tract somatotopy',
        caption: 'Sacral fibers lie laterally and cervical fibers lie medially.',
      },
    ],
  },
  {
    id: 'lateral-stt-brown-sequard',
    phase: 'Level 4',
    label: 'Brown-Sequard Pattern',
    shortLabel: 'Hemisection',
    prompt: 'A 45-year-old man has loss of pain and temperature sensation on the right side below T6. MRI shows a left hemisection at T6. Which tract is responsible for the sensory deficit?',
    type: 'mcq',
    hint: 'Pain and temperature cross early, so a left cord lesion affects the right body below the lesion.',
    options: ['Left dorsal column', 'Right corticospinal tract', 'Left lateral spinothalamic tract', 'Right dorsal spinocerebellar tract'],
    answer: 'Left lateral spinothalamic tract',
    knowMore: `Brown-Sequard syndrome is an incomplete spinal cord injury caused by functional or structural hemisection of the cord. Penetrating trauma is classic, but tumors, disc herniation, multiple sclerosis plaques, epidural hematoma, and ischemia can also cause it.

In a left hemisection, the left lateral spinothalamic tract has already received pain and temperature fibers from the right side, so the sensory loss is contralateral below the lesion.`,
    knowMoreTables: [
      {
        title: 'Brown-Sequard Syndrome Pathway Pattern',
        headers: ['Affected Pathway', 'Fiber Cross-Over Location', 'Clinical Presentation Below Lesion'],
        rows: brownSequardRows,
      },
    ],
  },
  {
    id: 'lateral-stt-cordotomy',
    phase: 'Level 5',
    label: 'Ventrolateral Cordotomy',
    shortLabel: 'Cordotomy',
    prompt: 'Ventrolateral cordotomy for relief of pain in the right lower limb is being performed. Which tract is cut?',
    type: 'mcq',
    hint: 'A spinal cord lesion cuts pain from the opposite side of the body.',
    options: ['Left ventral spinothalamic tract', 'Left lateral spinothalamic tract', 'Right ventral spinothalamic tract', 'Right lateral spinothalamic tract'],
    answer: 'Left lateral spinothalamic tract',
    knowMore: `In ventrolateral cordotomy, selected pain-conducting fibers in the lateral spinothalamic tract are cut, causing contralateral loss of pain and temperature below the lesion.

Percutaneous cervical cordotomy targets the anterolateral quadrant at C1-C2. Because the lateral spinothalamic tract carries contralateral pain, a left-sided lesion can silence right-body pain. The somatotopic map matters: sacral fibers lie most laterally and cervical fibers most medially. A probe that is too medial may spare lumbar pain; one too posterior may injure the corticospinal tract.

It is uncommon today because pain can return within months as central sensitization and alternative pathways are recruited, but it can still be valuable in terminal cancer pain.`,
  },
  {
    id: 'lateral-stt-wallenberg',
    phase: 'Level 6',
    label: 'Crossed Sensory Loss',
    shortLabel: 'Wallenberg',
    prompt: 'A patient develops sudden loss of pain and temperature sensation on the right body and left face after a brainstem stroke. The lesion is most likely in the medial pons.',
    type: 'boolean',
    hint: 'Crossed face-body pain and temperature loss points to the lateral medulla, not the medial pons.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'This pattern fits lateral medullary syndrome, also called Wallenberg syndrome.',
    knowMore: `Lateral medullary syndrome usually results from ischemia in the dorsolateral medulla, often from posterior inferior cerebellar artery or vertebral artery occlusion.

It causes crossed sensory loss: ipsilateral face pain and temperature loss from spinal trigeminal tract or nucleus involvement, and contralateral body pain and temperature loss from spinothalamic tract involvement. Other same-side findings can include ataxia, Horner syndrome, dysphonia, and dysphagia. MRI is typically used to confirm the clinical diagnosis.`,
  },
  {
    id: 'lateral-stt-trigeminal-neuralgia',
    phase: 'Level 7',
    label: 'Tic Douloureux',
    shortLabel: 'Facial Pain',
    prompt: 'Tic Douloureux is characterized by severe, stabbing, brief episodes of facial pain that most frequently develop due to compression of trigeminal nerve roots.',
    type: 'boolean',
    hint: 'This is the classic description of trigeminal neuralgia.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `Tic Douloureux is another name for trigeminal neuralgia. It causes brief, severe, stabbing or electric-shock facial pain, commonly from compression of the trigeminal nerve root.

The trigeminal nerve divides into V1, V2, and V3.

V1 supplies the forehead, upper eyelid, and eye.

V2 supplies the cheek, upper lip, upper teeth, and roof of the mouth.

V3 supplies the lower jaw, lower lip, and lower teeth, and also carries motor fibers for chewing.

V2 and V3 are most commonly affected, so the pain is often mistaken for tooth or jaw disease.

Triggers include shaving, washing the face, brushing teeth, drinking hot or cold liquids, and chewing. Diagnosis is clinical, but high-resolution MRI can rule out tumors or multiple sclerosis plaques and may show vascular compression of the nerve root.`,
  },
  {
    id: 'lateral-stt-referred-gate',
    phase: 'Level 8',
    label: 'Referred Pain And Gate Control',
    shortLabel: 'Convergence',
    prompt: 'A heart attack can feel like toothache or jaw pain because of 1. ________ pain, where cardiac visceral and jaw somatic fibers converge on second-order neurons in the 2. ________ tract.',
    type: 'blank',
    placeholder: 'Type both terms',
    answer: 'Referred pain; lateral spinothalamic tract',
    accepted: ['referred', 'lateral spinothalamic'],
    minMatches: 2,
    hint: 'The brain misattributes visceral pain to a familiar somatic territory carried by the same ascending pain system.',
    knowMore: `The answer is referred pain and lateral spinothalamic tract.

Visceral afferents from the heart enter the spinal cord around T1-T5 and synapse on dorsal horn neurons that also receive somatic input from regions such as the left arm, shoulder, neck, and jaw. During cardiac ischemia, the brain may misattribute the visceral signal to a familiar somatic location.

This convergence theory also connects with gate control theory. Melzack and Wall proposed that large-diameter A-beta fibers carrying touch and vibration activate inhibitory interneurons in the substantia gelatinosa, suppressing lateral spinothalamic second-order neurons. That is why rubbing a sore area or using TENS can reduce pain at the spinal cord level.`,
    supplementary: lateralSupplementary,
  },
];

const ventralOverview = `The anterior, or ventral, spinothalamic tract carries crude touch and pressure. These sensations let a person detect that the skin has been touched or compressed, but they do not localize the point of contact as precisely as the dorsal column-medial lemniscus pathway.

Fine touch, vibration, two-point discrimination, and conscious proprioception are carried mainly by the dorsal columns. A lesion of the anterior spinothalamic tract can therefore reduce contralateral crude touch and pressure below the lesion while sparing fine touch and proprioception.`;

const mechanoreceptorRows = [
  ['Merkel disks', 'Superficial skin', 'Sustained pressure, edges, texture, and fine tactile detail.'],
  ["Meissner's corpuscles", 'Superficial dermal papillae', 'Light touch and low-frequency vibration; high density in fingertips.'],
  ['Ruffini endings', 'Deep skin and connective tissue', 'Skin stretch and sustained pressure.'],
  ['Pacinian corpuscles', 'Deep dermis and subcutaneous tissue', 'Deep pressure and high-frequency vibration.'],
  ['Free nerve endings', 'Epidermis and superficial dermis', 'Pain, temperature, itch, and some crude touch.'],
];

const ventralPathwayLevels = [
  {
    id: 'ventral-stt-modalities',
    phase: 'Level 1',
    label: 'Crude Touch And Pressure',
    shortLabel: 'Modalities',
    prompt: 'Which sensory modalities are primarily carried by the anterior spinothalamic tract?',
    type: 'mcq',
    hint: 'Fine touch and proprioception belong to the dorsal column pathway.',
    options: ['Fine touch and proprioception', 'Pain and temperature', 'Crude touch and pressure', 'Conscious proprioception and vibration'],
    answer: 'Crude touch and pressure',
    knowMore: `${ventralOverview}

Crude touch allows a person to detect that a stimulus touched the skin without accurately localizing the exact point. Fine, discriminative touch enables precise localization and identification of tactile stimuli and is carried by the dorsal column-medial lemniscus pathway.`,
    knowMoreImages: [
      {
        src: '/ventral-spinothalamic.png',
        alt: 'Ventral spinothalamic tract diagram',
        caption: 'Ventral spinothalamic tract overview.',
      },
    ],
  },
  {
    id: 'ventral-stt-mechanoreceptors',
    phase: 'Level 2',
    label: 'Tactile Mechanoreceptors',
    shortLabel: 'Receptors',
    prompt: 'Crude touch and pressure sensations carried by the anterior spinothalamic tract are detected by __________.',
    type: 'blank',
    placeholder: 'Type the receptor class',
    answer: 'Tactile mechanoreceptors',
    accepted: ['mechanoreceptors', 'tactile mechanoreceptors'],
    minMatches: 1,
    hint: 'These receptors convert mechanical deformation of skin into neural signals.',
    knowMore: `Mechanoreceptors relay mechanical stimuli into intracellular signal transduction through mechanically gated ion channels. The stimuli may include touch, pressure, stretch, sound waves, or motion.

Crude touch is poorly localized because these receptors and their pathways often have larger, more overlapping receptive fields than systems specialized for discriminative touch. The person can recognize that touch occurred, but may not accurately identify the exact location.`,
    knowMoreHighlight: 'Crude touch is poorly localized.',
    knowMoreTables: [
      {
        title: 'Tactile Mechanoreceptor Map',
        headers: ['Receptor', 'Typical Location', 'Primary Signal'],
        rows: mechanoreceptorRows,
      },
    ],
  },
  {
    id: 'ventral-stt-awc',
    phase: 'Level 3',
    label: 'Anterior White Commissure',
    shortLabel: 'Decussation',
    prompt: 'A spinal cord lesion damaging the anterior white commissure at C6 would directly affect the decussation of anterior spinothalamic tract fibers.',
    type: 'boolean',
    hint: 'Second-order anterior spinothalamic neurons cross near their entry level.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `Second-order neurons of the anterior spinothalamic tract cross the midline through the anterior white commissure within one or two spinal segments after entering the spinal cord.

A lesion involving the anterior white commissure can therefore interrupt crossing fibers carrying crude touch and pressure from nearby segmental levels.`,
    knowMoreImages: [
      {
        src: '/assets/Ventral spinothalamic tract for animation.svg',
        alt: 'Ventral spinothalamic tract labeled pathway',
        caption: 'Ventral spinothalamic tract animation asset.',
      },
    ],
  },
  {
    id: 'ventral-stt-spatial-discrimination',
    phase: 'Level 4',
    label: 'Poor Spatial Discrimination',
    shortLabel: 'Localization',
    prompt: 'During neurological examination, a patient feels cotton wool touch on the skin but cannot determine the precise point of contact. Which property explains this?',
    type: 'mcq',
    hint: 'Crude touch detects contact but localizes it poorly.',
    options: ['High receptor density', 'Small receptive fields', 'Precise somatotopic organization', 'Poor spatial discrimination'],
    answer: 'Poor spatial discrimination',
    knowMore: `Receptor density refers to how many sensory receptors are packed into a given area of skin. This is a peripheral property, not a property of the anterior spinothalamic tract itself. High receptor density, such as dense Meissner corpuscles in the fingertips, improves spatial discrimination.

Small receptive fields provide precise localization. A neuron with a small receptive field responds only when a restricted patch of skin is stimulated, allowing the brain to pinpoint the stimulus. This is characteristic of the dorsal column system: large A-beta fibers, Meissner corpuscles, and Merkel receptors with tight, well-defined receptive fields. The anterior spinothalamic tract uses C and A-delta fibers with larger receptive fields.

The anterior spinothalamic tract does have somatotopic organization, with sacral fibers lateral and cervical fibers medial, so that statement is partially true. However, somatotopy is not the same as spatial discrimination. Somatotopy preserves a body map within the tract; spatial discrimination is the ability to distinguish two nearby points. A tract can have an orderly somatotopic map and still localize poorly when its receptive fields are large.`,
  },
  {
    id: 'ventral-stt-itch',
    phase: 'Level 5',
    label: 'Itch Pathway',
    shortLabel: 'Pruritus',
    prompt: 'Itch sensation is transmitted mainly through the lateral spinothalamic tract rather than the anterior spinothalamic tract.',
    type: 'boolean',
    hint: 'The anterior tract is for crude touch and pressure.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `Itch, or pruritus, is a distinct unpleasant sensation separate from pain. It is detected by specialized free nerve endings called pruriceptors in the skin.

Histamine-dependent itch is activated through H1 receptors. Histamine-independent itch can involve proteases, PAR2, Mrgpr receptors, cytokines, and TRP channels such as TRPV1 and TRPA1.

Signals travel through unmyelinated C fibers to the dorsal horn. Second-order neurons cross the midline and ascend mainly through the lateral spinothalamic tract, continuing to thalamic and cortical regions including somatosensory, cingulate, and insular cortices.`,
  },
  {
    id: 'ventral-stt-tabes-dorsalis',
    phase: 'Level 6',
    label: 'Tabes Dorsalis',
    shortLabel: 'Stamping Gait',
    prompt: 'A patient with untreated tertiary syphilis has an unsteady stamping gait and feels as if he is walking on cotton wool. Which structure or tract is primarily degenerated?',
    type: 'mcq',
    hint: 'The anterior spinothalamic tract is spared; the missing sense is proprioception.',
    options: ['Ventral horn of the spinal cord', 'Lateral spinothalamic tract', 'Dorsal columns and dorsal roots', 'Lateral corticospinal tract'],
    answer: 'Dorsal columns and dorsal roots',
    knowMore: `Tabes dorsalis destroys large A-beta fibers in the dorsal columns and dorsal roots, abolishing proprioception, vibration sense, and fine discriminative touch. The anterior spinothalamic tract is spared, so the patient can feel crude touch and pressure but cannot tell where the feet are in space.

This produces sensory ataxia: a wide-based stamping gait where the patient slaps the feet down forcefully to maximize crude pressure input. Patients often look at the floor because vision is compensating for lost proprioception.

The Romberg test expresses this dissociation. Eyes open: visual input compensates. Eyes closed: visual compensation is removed, crude touch cannot substitute for proprioception, and the patient sways or falls. A positive Romberg points to dorsal column loss, not cerebellar disease.`,
    supplementary: ventralSupplementary,
  },
];

const friedreichRows = [
  ['Spinocerebellar tracts', 'Loss of unconscious proprioception, causing wide-based unsteady gait and frequent falls.'],
  ['Dorsal columns', 'Loss of conscious proprioception, vibration sense, and two-point discrimination.'],
  ['Dorsal root ganglia', 'Loss of deep tendon reflexes, with knee-jerk reflex often disappearing early.'],
  ['Lateral corticospinal tracts', 'Upper motor neuron signs, including lower-limb weakness and spasticity.'],
  ['Heart and metabolic systems', 'Hypertrophic cardiomyopathy and diabetes can occur.'],
];

const spinocerebellarPathwayLevels = [
  {
    id: 'spinocerebellar-unconscious-proprioception',
    phase: 'Level 1',
    label: 'Unconscious Proprioception',
    shortLabel: 'Proprioception',
    prompt: 'Which type of sensory information is primarily carried by the spinocerebellar tracts to help coordinate motor movements?',
    type: 'mcq',
    hint: 'This information goes to the cerebellum for coordination, not to cortex for conscious awareness.',
    options: ['Conscious proprioception and fine touch', 'Unconscious proprioception from muscles and joints', 'Acute, sharp localized pain', 'Discriminative two-point touch'],
    answer: 'Unconscious proprioception from muscles and joints',
    knowMore: `Unlike the dorsal column-medial lemniscus pathway, which carries conscious proprioception to the cerebral cortex, the spinocerebellar tracts transmit unconscious proprioception directly to the cerebellum.

The cerebellum uses this real-time stream from muscle spindles and Golgi tendon organs to fine-tune ongoing motor activity.`,
    knowMoreImages: [
      {
        src: '/spinocerebellar.png',
        alt: 'Anterior and posterior spinocerebellar tracts diagram',
        caption: 'Anterior and posterior spinocerebellar tracts overview.',
      },
    ],
  },
  {
    id: 'spinocerebellar-double-cross',
    phase: 'Level 2',
    label: 'Anterior Tract Double Decussation',
    shortLabel: 'Double Cross',
    prompt: 'The anterior spinocerebellar tract is unique because its fibers decussate twice and ultimately terminate in the cerebellum ipsilateral to limb origin.',
    type: 'boolean',
    hint: 'The anterior tract crosses in the spinal cord, then crosses back before cerebellar termination.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `Anterior spinocerebellar tract neurons originate from spinal border cells, cross through the anterior white commissure, ascend, then cross back within the pons or midbrain to enter the cerebellum through the superior cerebellar peduncle.

Because it crosses twice, the information ultimately regulates the ipsilateral side of the body. The posterior spinocerebellar tract stays ipsilateral and enters through the inferior cerebellar peduncle.

Clinical rule of thumb: cerebellar pathways ultimately coordinate movement on the ipsilateral side of the body.`,
  },
  {
    id: 'spinocerebellar-clarkes-column',
    phase: 'Level 3',
    label: "Clarke's Column",
    shortLabel: 'Clarke',
    prompt: 'The primary cell bodies of second-order neurons for the posterior spinocerebellar tract reside in lamina VII from T1-L2/L3, clinically known as ____________________.',
    type: 'blank',
    placeholder: 'Type the nucleus',
    answer: "Clarke's column",
    accepted: ["clarke's column", 'clarkes column', 'dorsal nucleus of clarke', 'nucleus dorsalis'],
    minMatches: 1,
    hint: 'This named column is present only between T1 and about L2/L3.',
    knowMore: `Clarke's column exists between spinal segments T1 and L2/L3. Lower-limb sensory information entering below L3 travels upward in the dorsal columns through the fasciculus gracilis until it reaches L2, where it synapses in Clarke's column to form the posterior spinocerebellar tract.

For the upper limbs, Clarke's column is absent above T1. Upper-limb proprioceptive signals travel through the fasciculus cuneatus to the accessory cuneate nucleus in the medulla, forming the cuneocerebellar tract, the upper-limb equivalent of the posterior spinocerebellar tract.`,
    knowMoreImages: [
      {
        src: '/assets/Anterior and posterior spinocerebellar tracts for animation.svg',
        alt: 'Anterior and posterior spinocerebellar tract labeled pathway',
        caption: 'Labeled spinocerebellar tract animation asset.',
      },
    ],
  },
  {
    id: 'spinocerebellar-feedback-roles',
    phase: 'Level 4',
    label: 'Internal Versus External Feedback',
    shortLabel: 'Feedback',
    prompt: 'The posterior spinocerebellar tract carries internal feedback about upper motor neuron commands, while the anterior tract carries fine proprioceptive details from individual muscles and joints.',
    type: 'boolean',
    hint: 'This statement reverses the high-yield roles of PSCT and ASCT.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'PSCT carries external fine proprioceptive feedback; ASCT carries internal spinal motor-command feedback.',
    knowMore: `Posterior spinocerebellar tract equals external feedback. It acts like a high-fidelity sensor carrying unconscious proprioception from muscle spindles and Golgi tendon organs, telling the cerebellum what muscles and joints are doing at that moment.

Anterior spinocerebellar tract equals internal feedback. It monitors spinal interneuron activity and sends the cerebellum a carbon copy of motor commands reaching the spinal cord, helping compare intended movement with actual movement.`,
  },
  {
    id: 'spinocerebellar-posterolateral-margin',
    phase: 'Level 5',
    label: 'Lateral Funiculus Location',
    shortLabel: 'Tract Location',
    prompt: 'A lesion isolates the tract on the absolute posterolateral peripheral margin of the white matter. Which pathway is disrupted?',
    type: 'mcq',
    hint: 'The posterior spinocerebellar tract forms the outer rim at the posterior-lateral edge.',
    options: ['Anterior spinothalamic tract', 'Lateral corticospinal tract', 'Posterior spinocerebellar tract', 'Fasciculus gracilis'],
    answer: 'Posterior spinocerebellar tract',
    knowMore: `The posterior spinocerebellar tract forms the outermost rim on the posterolateral edge of the white matter. The anterior spinocerebellar tract lies just anterior to it along the outer lateral edge.

Deep to these spinocerebellar tracts sits the larger lateral corticospinal tract. This layout means expanding extrinsic spinal tumors may compress spinocerebellar pathways before compressing major motor pathways.`,
  },
  {
    id: 'spinocerebellar-friedreich',
    phase: 'Level 6',
    label: "Friedreich's Ataxia",
    shortLabel: 'Friedreich',
    prompt: "Friedreich's ataxia causes degeneration of both the 1. ________ columns and the 2. ________ tracts, leading to progressive gait unsteadiness and falls.",
    type: 'blank',
    placeholder: 'Type both structures',
    answer: 'Dorsal columns and spinocerebellar tracts',
    accepted: ['dorsal', 'posterior', 'spinocerebellar'],
    minMatches: 2,
    hint: 'One system carries conscious proprioception; the other carries unconscious proprioception.',
    knowMore: `Friedreich's ataxia is a rare, progressive, autosomal recessive neurodegenerative disorder and the most common inherited ataxia. It typically presents between ages 5 and 15 and primarily targets the nervous system and heart.

It is caused by a GAA trinucleotide repeat expansion in the first intron of the FXN gene on chromosome 9. Normal individuals have fewer than 30 repeats; patients may have hundreds. The expansion silences the gene, causing frataxin deficiency. Frataxin is a mitochondrial protein involved in iron homeostasis, so deficiency leads to mitochondrial iron accumulation, oxidative stress, and damage to neurons and cardiomyocytes.

Diagnosis relies on clinical evaluation, electromyography, and genetic testing for the FXN mutation. There is no cure, but multidisciplinary care can manage symptoms and preserve quality of life.`,
    knowMoreTables: [
      {
        title: "Friedreich's Ataxia High-Yield Structure Map",
        headers: ['Damaged Structure', 'Consequence / Symptom'],
        rows: friedreichRows,
      },
    ],
    supplementary: spinocerebellarSupplementary,
  },
];

const corticospinalSupplementary = {
  title: 'SEQ: Corticospinal Tract',
  blocks: [
    {
      type: 'qa',
      question: '1. Anatomically, where do the majority of upper motor neuron fibers in the pyramidal system undergo decussation before descending into the lateral corticospinal tract?\n\nA. The midbrain peduncles\nB. The internal capsule\nC. The medullary pyramids\nD. The anterior horn of the spinal cord',
      answer: 'C. The medullary pyramids. The fibers originate in the cerebral cortex, descend through the internal capsule, and pass through the midbrain peduncles and pons before reaching the medulla. Most fibers cross in the lower medulla at the pyramidal decussation. Only after crossing do they enter the contralateral lateral corticospinal tract and continue toward lower motor neurons.',
    },
    {
      type: 'qa',
      question: '2. Which option best describes the physiological synaptic arrangement of the pyramidal system within the spinal cord?\n\nA. Synapse on dorsal root ganglia\nB. Direct synapse on skeletal muscle fibers\nC. Synapse primarily on lower motor neurons\nD. Synapse exclusively within the basal ganglia',
      answer: 'C. Synapse primarily on lower motor neurons. Dorsal root ganglia belong to sensory afferent pathways. Direct muscle innervation is performed by lower motor neurons, not descending upper motor neurons. Corticospinal upper motor neurons transmit cortical signals to spinal interneurons and lower motor neurons, the final common pathway. The basal ganglia are associated with extrapyramidal motor control rather than being the primary termination site of pyramidal fibers.',
    },
    {
      type: 'qa',
      question: '3. A lesion in the internal capsule is physiologically significant because:\n\nA. It prevents acetylcholine release at the neuromuscular junction.\nB. Descending fibers are so closely packed that a small lesion causes severe hemiparesis.\nC. It is the only site where extrapyramidal fibers originate.\nD. It is the primary site of muscle spindle reflex integration.',
      answer: 'B. Descending fibers are so closely packed that a small lesion causes severe hemiparesis. The neuromuscular junction lies at the distal end of the lower motor neuron, far from the internal capsule. Extrapyramidal pathways do not originate exclusively in the capsule, and muscle spindle reflexes are integrated segmentally in the spinal cord.',
    },
    {
      type: 'qa',
      question: '4. A patient presents with sudden weakness of the right face, arm, and leg. Examination reveals aphasia and a right extensor plantar response. Where is the most likely lesion?\n\nA. Left cerebellar hemisphere\nB. Right internal capsule\nC. Left cerebral hemisphere\nD. Spinal cord at T1',
      answer: 'C. Left cerebral hemisphere. Right-sided weakness with upper motor neuron signs localizes above the pyramidal decussation on the left. Aphasia additionally points to the language-dominant left cerebral hemisphere. A cerebellar lesion causes ipsilateral ataxia rather than hemiparesis; a right capsular lesion causes left-sided weakness; and a T1 spinal lesion would spare the face, arm, and language function.',
    },
  ],
};

const corticospinalPathwayLevels = [
  {
    id: 'corticospinal-origin',
    phase: 'Level 1',
    label: 'Cortical Origin',
    shortLabel: 'Origin',
    prompt: 'From which specific area of the cerebral cortex do the majority of fibers that form the corticospinal tract originate?',
    type: 'mcq',
    hint: 'This is the primary motor cortex, where giant Betz cells live in layer V.',
    options: ['Postcentral gyrus (Brodmann area 3, 1, 2)', 'Precentral gyrus (Brodmann area 4)', 'Occipital cortex (Brodmann area 17)', 'Temporal cortex (Brodmann area 41)'],
    answer: 'Precentral gyrus (Brodmann area 4)',
    knowMore: `Most corticospinal tract teaching centers on the primary motor cortex, the precentral gyrus or Brodmann area 4. Roughly 30% of corticospinal fibers arise from this area, while additional fibers come from premotor cortex, supplementary motor area, and primary somatosensory cortex.

The primary motor cortex contains the giant pyramidal cells of Betz in layer V. Their large myelinated axons descend to the spinal cord and help drive voluntary movement.`,
    knowMoreImages: [
      {
        src: '/Corticospinal tracts.svg',
        alt: 'Corticospinal tract overview diagram',
        caption: 'Corticospinal tract overview.',
      },
    ],
  },
  {
    id: 'corticospinal-internal-capsule',
    phase: 'Level 2',
    label: 'Internal Capsule',
    shortLabel: 'Posterior Limb',
    prompt: 'As corticospinal fibers descend from cortex toward the brainstem, they travel through the ________________________ of the internal capsule.',
    type: 'blank',
    placeholder: 'Type the internal capsule part',
    answer: 'Posterior limb',
    accepted: ['posterior limb'],
    minMatches: 1,
    hint: 'Posterior limb equals power: this is the densely packed motor pathway.',
    knowMoreHighlight: 'REMEMBER',
    knowMore: `Posterior limb = Power (motor/CST), while the anterior limb is heavily associated with Affect and behavior through frontopontine fibers.

Because the posterior limb is tightly packed, even a tiny lacunar stroke in this specific region, often caused by unmanaged hypertension obstructing the lenticulostriate arteries, can wipe out motor function for an entire half of the body and produce a pure motor stroke.`,
  },
  {
    id: 'corticospinal-crus-cerebri',
    phase: 'Level 3',
    label: 'Crus Cerebri Somatotopy',
    shortLabel: 'Midbrain Map',
    prompt: 'In the middle third of the crus cerebri, what is the corticospinal somatotopic arrangement from medial to lateral?',
    type: 'mcq',
    hint: 'Upper body and corticobulbar-adjacent fibers sit more medially; leg fibers lie laterally.',
    options: ['Face -> Arm -> Leg', 'Leg -> Arm -> Face', 'Arm -> Face -> Leg', 'Face -> Leg -> Arm'],
    answer: 'Face -> Arm -> Leg',
    knowMore: `In the midbrain crus cerebri, fibers for upper body and corticobulbar-adjacent regions are more medial, while fibers bound for lower limbs are more lateral.

This spatial organization helps localize compressive lesions, masses, or aneurysms by observing which body region loses motor function first.`,
    knowMoreImages: [
      {
        src: '/assets/Corticospinal tracts for animation.svg',
        alt: 'Labeled corticospinal tract pathway',
        caption: 'Labeled corticospinal tract animation asset.',
      },
      {
        src: '/Images/corticospinal/fibrearrangementcruscerebri.png',
        alt: 'Somatotopic fiber arrangement in the crus cerebri',
        caption: 'Corticospinal fiber arrangement within the crus cerebri.',
      },
    ],
  },
  {
    id: 'corticospinal-umn-lmn',
    phase: 'Level 4',
    label: 'UMN Versus LMN Signs',
    shortLabel: 'Motor Signs',
    prompt: 'A patient with severe weakness, marked atrophy, fasciculations, and an absent knee-jerk reflex is demonstrating classic signs of an upper motor neuron lesion.',
    type: 'boolean',
    hint: 'Fasciculations, atrophy, and lost reflexes point to the final common pathway.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'These are lower motor neuron signs.',
    knowMore: `These findings are classic lower motor neuron signs. Lower motor neurons are the final common pathway directly connecting the central nervous system to muscle. Damage causes flaccid paralysis, rapid muscle wasting, fasciculations from dying motor units, and hyporeflexia or absent reflexes.

Upper motor neuron lesions remove descending inhibitory control over spinal circuits. They produce hyperreflexia, spasticity, increased tone, clonus, and Babinski-type signs.

Upper motor neuron cell bodies are mainly in the primary motor cortex and brainstem motor centers. Their axons descend in pathways such as the corticospinal tract for limb and trunk movement and corticobulbar tract for face, head, and neck muscles. Lower motor neurons are in anterior horn cells, anterior nerve roots, cranial motor nuclei, and motor cranial nerves.`,
    knowMoreImages: [
      {
        src: '/Images/corticospinal/hyperreflexia.png',
        alt: 'Hyperreflexia following an upper motor neuron lesion',
        caption: 'Hyperreflexia is a characteristic upper motor neuron sign.',
      },
      {
        src: '/Images/corticospinal/ClinicalexamCorticospinaltracts.png',
        alt: 'Clinical examination of corticospinal tract function',
        caption: 'Clinical examination findings used to assess corticospinal tract integrity.',
      },
    ],
  },
  {
    id: 'corticospinal-reciprocal-inhibition',
    phase: 'Level 5',
    label: 'Reciprocal Inhibition',
    shortLabel: 'Antagonists',
    prompt: 'The corticospinal tract can synapse onto inhibitory interneurons, such as Ia inhibitory interneurons, to inhibit antagonist muscles while agonist muscles contract.',
    type: 'boolean',
    hint: 'Smooth movement requires quieting the antagonist while the agonist contracts.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `This is reciprocal inhibition. When the corticospinal tract helps command the biceps to contract, it also helps spinal interneurons quiet the triceps. Without this coordinated inhibition, opposing muscles would fight each other and voluntary movement would become stiff and inefficient.

After an upper motor neuron lesion, such as a stroke affecting the corticospinal tract, descending inhibitory control over spinal reflex circuits is lost. Stretch-reflex pathways become more excitable because interneuronal inhibition is reduced and alpha-gamma motor neuron activity increases. Passive limb movement consequently produces increased resistance, or spasticity, especially in antigravity muscles.

A characteristic feature is clasp-knife rigidity: strong initial resistance is followed by a sudden decrease in tone due to Golgi tendon organ-mediated autogenic inhibition.`,
    knowMoreImages: [
      {
        src: '/Images/corticospinal/reciprocalinhibition.png',
        alt: 'Reciprocal inhibition of antagonist muscles',
        caption: 'Reciprocal inhibition coordinates agonist contraction with antagonist relaxation.',
      },
    ],
  },
  {
    id: 'corticospinal-clasp-knife',
    phase: 'Level 6',
    label: 'Clasp-Knife Phenomenon',
    shortLabel: 'GTO Reflex',
    prompt: 'A spastic knee initially resists passive flexion, then suddenly collapses and flexes easily. Which reflex component is primarily responsible?',
    type: 'mcq',
    hint: 'Extreme tendon tension activates Golgi tendon organs.',
    options: ['Activation of Ib afferent fibers from Golgi tendon organs', 'Reciprocal inhibition via Ia interneurons', 'Prolonged down-regulation of alpha motor neuron acetylcholine receptors', 'Habituation of the monosynaptic reflex loop'],
    answer: 'Activation of Ib afferent fibers from Golgi tendon organs',
    knowMore: `This is the clasp-knife phenomenon, a manifestation of the inverse myotatic reflex. As the examiner forces a spastic muscle to lengthen, tension builds at the muscle-tendon junction.

That high tension activates Golgi tendon organs, which send signals through fast Ib afferent fibers. These fibers synapse on inhibitory interneurons in the spinal cord, which shut down the overactive alpha motor neurons to that same muscle. The result is a sudden drop in resistance.`,
    supplementary: corticospinalSupplementary,
  },
];

const corticobulbarNucleusRows = [
  ['Mastication', 'Trigeminal nerve (CN V)', 'Motor nucleus of CN V', 'Pons'],
  ['Facial expression', 'Facial nerve (CN VII)', 'Facial motor nucleus', 'Pons'],
  ['Swallowing and vocalizing', 'Glossopharyngeal (CN IX) and vagus (CN X)', 'Nucleus ambiguus', 'Medulla'],
  ['Shrugging and turning head', 'Spinal accessory nerve (CN XI)', 'Spinal accessory nucleus', 'C1-C5 anterior horn'],
  ['Tongue protrusion and movement', 'Hypoglossal nerve (CN XII)', 'Hypoglossal nucleus', 'Medulla'],
];

const facialPalsyRows = [
  ['Supranuclear facial palsy', 'Cortex or corticobulbar fibers above the facial nucleus', 'Contralateral lower face weakness with forehead sparing.'],
  ['Infranuclear facial palsy', 'Facial nucleus or facial nerve after it leaves the pons', 'Ipsilateral upper and lower face weakness, including impaired forehead wrinkling and eye closure.'],
];

const corticobulbarProjectionRows = [
  ['Genu of internal capsule', 'Corticobulbar tract', 'Dense descending motor fibers for face, head, neck, swallowing, and speech.'],
  ['Posterior limb of internal capsule', 'Corticospinal tract', 'Voluntary motor fibers for trunk and limbs.'],
  ['Upper facial nucleus', 'Bilateral cortical input', 'Forehead is usually spared in a unilateral UMN lesion.'],
  ['Lower facial nucleus', 'Predominantly contralateral cortical input', 'Contralateral lower facial weakness follows a unilateral UMN lesion.'],
  ['Hypoglossal nucleus', 'Mainly contralateral input', 'Tongue may deviate away from a supranuclear lesion.'],
  ['Spinal accessory nucleus', 'Mainly ipsilateral input', 'Shoulder shrug and head-turning can be affected depending on lesion side.'],
];

const corticobulbarPathwayLevels = [
  {
    id: 'corticobulbar-genu',
    phase: 'Level 1',
    label: 'Internal Capsule Genu',
    shortLabel: 'Genu',
    prompt: 'A 68-year-old patient has sudden difficulty speaking and swallowing after a lacunar infarct precisely involving the genu of the internal capsule. Which descending tract is most likely disrupted?',
    type: 'mcq',
    hint: 'The genu carries motor commands to cranial nerve motor nuclei.',
    options: ['Lateral corticospinal tract', 'Corticobulbar tract', 'Anterior corticospinal tract', 'Rubrospinal tract'],
    answer: 'Corticobulbar tract',
    knowMore: `The corticobulbar tract arises mainly from the lateral portion of the primary motor cortex, especially the face region of the precentral gyrus. Its axons descend through the genu of the internal capsule, then continue into the cerebral peduncle, basis pontis, and medullary region before distributing to cranial nerve motor nuclei.

The capsule distinction is high-yield: corticobulbar fibers pass through the genu, while corticospinal fibers pass through the posterior limb. A small genu lesion can therefore produce dysarthria, dysphagia, and facial or tongue weakness without the same limb-dominant pattern expected from a posterior limb lesion.`,
    knowMoreImages: [
      {
        src: '/assets/Corticobular tract for animation.svg',
        alt: 'Corticobulbar tract labeled pathway',
        caption: 'Corticobulbar tract pathway through the genu and brainstem motor nuclei.',
      },
    ],
    knowMoreTables: [
      {
        title: 'Corticobulbar Projection Map',
        headers: ['Site', 'Key Fibers / Input', 'Clinical High-Yield'],
        rows: corticobulbarProjectionRows,
      },
    ],
  },
  {
    id: 'corticobulbar-facial-nucleus',
    phase: 'Level 2',
    label: 'Facial Nucleus Split',
    shortLabel: 'Face',
    prompt: 'A right corticobulbar UMN lesion causes a symmetric forehead but a drooping lower left mouth. The lower facial nucleus receives predominantly 1. ________ cortical input, while the upper facial nucleus receives 2. ________ cortical input.',
    type: 'blank',
    placeholder: 'Type both cortical input patterns',
    answer: 'Contralateral; bilateral',
    accepted: ['contralateral', 'bilateral'],
    minMatches: 2,
    hint: 'Forehead sparing happens because the upper face gets commands from both hemispheres.',
    knowMore: `The facial motor nucleus in the pons is functionally split. The upper division controls the forehead and receives bilateral cortical input, so a unilateral UMN lesion usually spares forehead wrinkling. The lower division controls the lower face and receives predominantly contralateral cortical input, so a right UMN lesion weakens the left lower face.

This separates central facial palsy from peripheral facial palsy. A central lesion weakens the contralateral lower face only. A peripheral lesion at the facial nucleus or nerve weakens the entire ipsilateral half of the face, including forehead movement and eye closure.`,
    knowMoreTables: [
      {
        title: 'Central Versus Peripheral Facial Palsy',
        headers: ['Pattern', 'Lesion Location', 'Exam Finding'],
        rows: facialPalsyRows,
      },
    ],
    knowMoreEndImages: [
      {
        src: '/Images/corticobulbar/bulbarlesions.png',
        alt: 'Comparison of bulbar and pseudobulbar lesions',
        caption: 'Clinical patterns of bulbar and pseudobulbar palsy.',
      },
    ],
  },
  {
    id: 'corticobulbar-homunculus',
    phase: 'Level 3',
    label: 'Motor Homunculus Origin',
    shortLabel: 'Homunculus',
    prompt: 'The upper motor neurons that form the corticobulbar tract originate primarily within the medial and superior aspects of the precentral gyrus.',
    type: 'boolean',
    hint: 'Face and head representation sits more inferior and lateral near the lateral fissure.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'Corticobulbar fibers arise mainly from the lateral face region of the primary motor cortex.',
    knowMore: `Wilder Penfield's motor homunculus places the lower limb on the medial surface of the hemisphere, while face and head muscles are represented more inferiorly and laterally on the precentral gyrus near the lateral fissure. That lateral face area is the main cortical origin of corticobulbar fibers.

The tract then carries voluntary motor commands from cortex to cranial nerve motor nuclei, supporting facial expression, chewing, swallowing, phonation, tongue movement, and selected head or neck movements.`,
    knowMoreImages: [
      {
        src: '/assets/Corticobular tract for animation.svg',
        alt: 'Corticobulbar tract and cortical origin figure',
        caption: 'The pathway begins from the lateral motor cortex representation for face and head.',
      },
    ],
  },
  {
    id: 'corticobulbar-pseudobulbar',
    phase: 'Level 4',
    label: 'Pseudobulbar Palsy',
    shortLabel: 'Bilateral UMN',
    prompt: 'An isolated extensive bilateral corticobulbar lesion can cause severe dysphagia, dysarthria, and uncontrolled crying or laughing despite preserved facial muscle bulk.',
    type: 'boolean',
    hint: 'Bilateral UMN pathway loss affects voluntary control without denervating the muscles directly.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `This pattern is pseudobulbar palsy. It reflects bilateral upper motor neuron damage to corticobulbar pathways, causing loss of voluntary control over facial, speech, and swallowing movements. Emotional expression can become exaggerated or poorly controlled, producing pseudobulbar affect.

Bulbar palsy is different: it results from lower motor neuron damage to cranial nerve nuclei or nerves serving the face, tongue, pharynx, and larynx. Bulbar palsy is more likely to show LMN signs such as wasting, fasciculations, and reduced reflexes in affected muscles.`,
    knowMoreTables: [
      {
        title: 'Pseudobulbar Versus Bulbar Palsy',
        headers: ['Syndrome', 'Primary Lesion Type', 'Jaw Jerk', 'Affect', 'Typical Clues'],
        rows: [
          ['Pseudobulbar palsy', 'Bilateral corticobulbar UMN lesion', 'Brisk', 'Emotionally labile', 'Dysarthria, dysphagia, and preserved muscle bulk.'],
          ['Bulbar palsy', 'Cranial nerve LMN lesion in nucleus or nerve', 'Normal or absent', 'Normal', 'Dysarthria, dysphagia, tongue wasting or fasciculations, and reduced reflexes.'],
        ],
      },
    ],
  },
  {
    id: 'corticobulbar-target-nuclei',
    phase: 'Level 5',
    label: 'Target Nuclei',
    shortLabel: 'Nuclei',
    prompt: 'Which pairing correctly matches a corticobulbar-controlled muscle action with its downstream cranial nerve motor nucleus destination?',
    type: 'mcq',
    hint: 'Choose the motor action, not sensory taste or facial pain.',
    options: [
      'Shrugging the shoulders -> accessory nerve nucleus (CN XI)',
      'Moving the eyes horizontally -> Edinger-Westphal nucleus',
      'Tasting sugar on the tongue -> solitary / gustatory nucleus',
      'Sensation of a toothache -> spinal trigeminal nucleus',
    ],
    answer: 'Shrugging the shoulders -> accessory nerve nucleus (CN XI)',
    knowMore: `The corticobulbar tract is a descending motor pathway. It targets cranial nerve motor nuclei that control chewing, facial expression, swallowing, phonation, shoulder shrugging, head turning, and tongue movement.

Horizontal eye movement is coordinated through gaze centers and somatic motor nuclei such as abducens and oculomotor, while Edinger-Westphal is parasympathetic. Taste and toothache are sensory, so they do not belong to the corticobulbar motor pathway.`,
    knowMoreTables: [
      {
        title: 'Corticobulbar Muscle Action To Nucleus Map',
        headers: ['Muscle Action', 'Cranial Nerve Involved', 'Target Nucleus', 'Level'],
        rows: corticobulbarNucleusRows,
      },
    ],
  },
  {
    id: 'corticobulbar-spasticity',
    phase: 'Level 6',
    label: 'Spasticity',
    shortLabel: 'Tone',
    prompt: 'Spasticity is characterized as a velocity-dependent form of hypertonia.',
    type: 'boolean',
    hint: 'Fast passive stretch produces more resistance than slow passive stretch.',
    options: ['True', 'False'],
    answer: 'True',
    knowMore: `Spasticity is velocity-dependent hypertonia after an upper motor neuron lesion. A rapid passive stretch triggers an exaggerated stretch reflex through over-sensitive muscle spindle pathways, while a slow stretch may meet less resistance.

Rigidity, classically associated with basal ganglia disorders such as Parkinson disease, is velocity independent. The limb resists passive movement more uniformly regardless of movement speed.`,
    knowMoreTables: [
      {
        title: 'Spasticity Versus Rigidity',
        headers: ['Feature', 'Spasticity', 'Rigidity'],
        rows: [
          ['Dependence on speed', 'Velocity-dependent', 'Velocity-independent'],
          ['Typical pathway problem', 'Upper motor neuron pathway lesion', 'Basal ganglia circuit dysfunction'],
          ['Passive movement', 'More resistance with rapid stretch', 'Uniform resistance through range'],
        ],
      },
    ],
  },
];

const spinalCordPathwayLevels = [
  {
    id: 'spinal-cord-nerve-formation',
    phase: 'Phase 1 - Foundations',
    label: 'Spinal Nerve Formation',
    shortLabel: 'Formation',
    prompt: 'A spinal nerve is formed by the union of which structures?',
    type: 'mcq',
    hint: 'One root carries sensory fibers and the other carries motor fibers.',
    options: ['Two dorsal roots', 'Two ventral roots', 'A dorsal root and a ventral root', 'A dorsal ramus and a ventral ramus'],
    answer: 'A dorsal root and a ventral root',
    knowMore: `The dorsal root carries sensory fibers into the spinal cord, while the ventral root carries motor fibers away from it. Their union forms a short mixed spinal nerve, which then divides into dorsal and ventral rami.

There are eight cervical spinal nerves but only seven cervical vertebrae. C1 exits above the C1 vertebra, C8 exits between C7 and T1, and from T1 downward spinal nerves exit below the corresponding vertebra.`,
    knowMoreTables: [{
      title: 'Cervical Nerve Exit Pattern',
      headers: ['Nerve', 'Exit relationship'],
      rows: [['C1-C7', 'Above the corresponding cervical vertebra'], ['C8', 'Between C7 and T1'], ['T1 downward', 'Below the corresponding vertebra']],
    }],
    knowMoreImages: [{
      src: '/Spinal cord.svg',
      alt: 'Spinal cord and segmental spinal nerve anatomy',
      caption: 'Spinal cord segments and the paired spinal nerves that connect the cord with the body.',
    }],
  },
  {
    id: 'spinal-cord-ventral-root',
    phase: 'Phase 1 - Foundations',
    label: 'Ventral Root',
    shortLabel: 'Ventral root',
    prompt: 'The ventral root of a spinal nerve contains which type of fibers?',
    type: 'mcq',
    hint: 'Think of signals leaving the spinal cord for skeletal muscle.',
    options: ['Sensory fibers only', 'Motor fibers only', 'Mixed sensory and motor fibers', 'Postganglionic sympathetic fibers only'],
    answer: 'Motor fibers only',
    knowMore: 'Ventral rootlets arise from the anterior aspect of the spinal cord and join to form a ventral root. These fibers are motor before the root joins the sensory dorsal root to form a mixed spinal nerve.',
  },
  {
    id: 'spinal-cord-recurrent-meningeal',
    phase: 'Phase 2 - Functional Integration',
    label: 'Recurrent Meningeal Nerve',
    shortLabel: 'Meningeal',
    prompt: 'Which branch of a spinal nerve re-enters the vertebral canal through the intervertebral foramen?',
    type: 'mcq',
    hint: 'It turns back toward the meninges and vertebral canal.',
    options: ['Dorsal ramus', 'Ventral ramus', 'Recurrent meningeal nerve', 'Gray ramus communicans'],
    answer: 'Recurrent meningeal nerve',
    knowMore: 'The recurrent meningeal nerve, also called the sinuvertebral nerve, re-enters the vertebral canal. It supplies the meninges, vertebral ligaments, outer intervertebral discs, and vessels within the canal.',
  },
  {
    id: 'spinal-cord-white-rami',
    phase: 'Phase 2 - Functional Integration',
    label: 'White Rami Communicantes',
    shortLabel: 'White rami',
    prompt: 'White rami communicantes mainly carry which fibers?',
    type: 'mcq',
    hint: 'These myelinated autonomic fibers travel from T1 to L2 toward the sympathetic chain.',
    options: ['Postganglionic sympathetic fibers', 'Preganglionic sympathetic fibers', 'Somatic sensory fibers only', 'Parasympathetic fibers'],
    answer: 'Preganglionic sympathetic fibers',
    knowMore: 'White rami communicantes carry myelinated preganglionic sympathetic fibers and occur only from T1 to L2. Gray rami carry unmyelinated postganglionic fibers and connect with spinal nerves at every level.',
    knowMoreTables: [{
      title: 'Rami Communicantes',
      headers: ['Ramus', 'Fiber type', 'Distribution'],
      rows: [['White ramus', 'Preganglionic sympathetic, myelinated', 'T1-L2 only'], ['Gray ramus', 'Postganglionic sympathetic, unmyelinated', 'All spinal nerve levels']],
    }],
  },
  {
    id: 'spinal-cord-posterior-rami-plexus',
    phase: 'Phase 2 - Functional Integration',
    label: 'Spinal Nerve Plexuses',
    shortLabel: 'Plexuses',
    prompt: 'Posterior rami of spinal nerves form the major cervical, brachial, lumbar, and sacral plexuses.',
    type: 'boolean',
    hint: 'The rami supplying the limbs redistribute their fibers in plexuses.',
    options: ['True', 'False'],
    answer: 'False',
    knowMore: 'Major nerve plexuses are formed by anterior rami. Posterior rami remain segmental and supply intrinsic back muscles, facet joints, and overlying skin. Plexuses redistribute fibers from several spinal levels, providing functional overlap and redundancy.',
  },
  {
    id: 'spinal-cord-zoster',
    phase: 'Phase 3 - Clinical Reasoning',
    label: 'Herpes Zoster',
    shortLabel: 'Zoster',
    prompt: 'A patient develops a painful vesicular rash in the T8 dermatome. Where was the varicella-zoster virus most likely dormant?',
    type: 'mcq',
    hint: 'The sensory neuron cell bodies lie just outside the spinal cord.',
    options: ['Anterior horn', 'Ventral root', 'Dorsal root ganglion', 'Sympathetic chain only'],
    answer: 'Dorsal root ganglion',
    knowMore: 'Varicella-zoster virus remains latent in sensory ganglia, especially dorsal root ganglia. Reactivation travels along a sensory nerve and produces pain and rash in its dermatome.',
  },
  {
    id: 'spinal-cord-dorsal-root-lesion',
    phase: 'Phase 3 - Clinical Reasoning',
    label: 'Dorsal Root Lesion',
    shortLabel: 'Dorsal lesion',
    prompt: 'An isolated lesion of the L5 dorsal root most directly produces which deficit?',
    type: 'mcq',
    hint: 'The dorsal root is sensory before it joins the ventral root.',
    options: ['Pure motor weakness', 'Pure sensory loss', 'Mixed sensory and motor loss', 'Upper motor neuron signs'],
    answer: 'Pure sensory loss',
    knowMore: 'A dorsal root lesion interrupts afferent sensory fibers and causes segmental sensory symptoms. A ventral root lesion causes motor loss, while a mixed spinal nerve lesion can affect both sensation and lower motor neuron function.',
  },
  {
    id: 'spinal-cord-mixed-nerve-lesion',
    phase: 'Phase 3 - Clinical Reasoning',
    label: 'Mixed Spinal Nerve Lesion',
    shortLabel: 'Mixed lesion',
    prompt: 'Weakness in one myotome together with sensory loss in the corresponding dermatome most strongly suggests a lesion of the:',
    type: 'mcq',
    hint: 'Choose the structure that already contains both sensory and motor fibers.',
    options: ['Dorsal root only', 'Ventral root only', 'Spinal nerve', 'Dorsal column'],
    answer: 'Spinal nerve',
    knowMore: 'A spinal nerve is mixed. Its injury can produce segmental sensory loss plus lower motor neuron weakness, hypotonia, fasciculations, and eventual muscle wasting in the affected myotome.',
  },
  {
    id: 'spinal-cord-l5-radiculopathy',
    phase: 'Phase 3 - Clinical Reasoning',
    label: 'L5 Radiculopathy',
    shortLabel: 'L5 root',
    prompt: 'An L4-L5 disc prolapse compresses the L5 nerve root. Which pattern is most expected?',
    type: 'mcq',
    hint: 'A compressed nerve root produces both segmental motor and sensory symptoms.',
    options: ['Segmental weakness and sensory loss', 'Contralateral spastic paralysis', 'Loss of pain only below the lesion', 'Isolated autonomic dysfunction'],
    answer: 'Segmental weakness and sensory loss',
    knowMore: 'L5 radiculopathy can cause weakness of great-toe extension and ankle dorsiflexion with altered sensation over the dorsum of the foot. Sciatica commonly involves roots from L4 to S3 and may produce radiating pain, tingling, numbness, and weakness.',
  },
  {
    id: 'spinal-cord-foraminal-compression',
    phase: 'Phase 3 - Clinical Reasoning',
    label: 'Foraminal Compression',
    shortLabel: 'Foramen',
    prompt: 'Compression within an intervertebral foramen most directly threatens which structure?',
    type: 'mcq',
    hint: 'At this point sensory and motor roots have united.',
    options: ['Dorsal horn', 'Ventral horn', 'Mixed spinal nerve', 'Posterior median septum'],
    answer: 'Mixed spinal nerve',
    knowMore: 'The mixed spinal nerve and its roots occupy the intervertebral foramen. Foraminal narrowing can therefore produce radicular pain, sensory disturbance, and lower motor neuron weakness in a segmental pattern.',
  },
  {
    id: 'spinal-cord-examination',
    phase: 'Phase 4 - Clinical Examination',
    label: 'Dermatome And Myotome Exam',
    shortLabel: 'Examination',
    prompt: 'A patient has weak ankle dorsiflexion and numbness over the dorsum of the foot. Which examination approach best localizes the involved spinal level?',
    type: 'mcq',
    hint: 'Combine a sensory map with a segmental movement map.',
    options: ['Cranial nerve examination', 'Dermatome and myotome assessment', 'Cerebellar testing only', 'Autonomic reflex testing only'],
    answer: 'Dermatome and myotome assessment',
    knowMore: 'Dermatomes map skin sensation by spinal root, while myotomes map key movements. Combining them improves localization: dorsum-of-foot sensation and great-toe extension or ankle dorsiflexion point strongly toward L5.',
    knowMoreTables: [
      { title: 'Key Dermatomes', headers: ['Root', 'Sensory landmark'], rows: [['C6', 'Thumb'], ['C7', 'Middle finger'], ['L4', 'Medial leg'], ['L5', 'Dorsum of foot'], ['S1', 'Lateral foot']] },
      { title: 'Key Myotomes', headers: ['Root', 'Movement'], rows: [['C5', 'Shoulder abduction'], ['C6', 'Elbow flexion'], ['C7', 'Elbow extension'], ['L4', 'Knee extension'], ['L5', 'Great-toe extension'], ['S1', 'Plantar flexion']] },
    ],
    knowMoreImages: [{
      src: '/Cross section of spinal cord.svg',
      alt: 'Cross section of the spinal cord',
      caption: 'Cross-sectional orientation supports root and tract localization during the neurologic examination.',
    }],
  },
  {
    id: 'spinal-cord-laminectomy',
    phase: 'Phase 5 - Surgical Application',
    label: 'Lumbar Decompression',
    shortLabel: 'Surgery',
    prompt: 'Which procedure removes part of the vertebral lamina to decompress neural structures in severe lumbar disease?',
    type: 'mcq',
    hint: 'The procedure is named for the bony plate being removed.',
    options: ['Discectomy only', 'Laminectomy', 'Rhizotomy', 'Cordotomy'],
    answer: 'Laminectomy',
    knowMore: 'Compression can cause ischemia, inflammation, and demyelination, leading to radicular pain, tingling, numbness, and weakness. Decompression restores space around neural tissue; modern approaches aim to preserve nerves and stability while minimizing tissue disruption.',
    knowMoreImages: [{
      src: '/Spinal cord.svg',
      alt: 'Spinal cord within the vertebral canal',
      caption: 'Decompression creates space around neural structures while aiming to preserve stability and nerve function.',
    }],
  },
  {
    id: 'spinal-cord-stimulation',
    phase: 'Phase 6 - Advances',
    label: 'Spinal Cord Stimulation',
    shortLabel: 'Stimulation',
    prompt: 'Electrical stimulation of dorsal columns and spinal pathways to treat chronic neuropathic pain is called:',
    type: 'mcq',
    hint: 'An implanted system modulates pain signaling rather than removing tissue.',
    options: ['Transcranial magnetic stimulation', 'Deep brain stimulation', 'Spinal cord stimulation', 'Neuromuscular blockade'],
    answer: 'Spinal cord stimulation',
    knowMore: `Spinal cord stimulation is used for selected cases of failed back surgery syndrome, complex regional pain syndrome, and chronic neuropathic pain. Modern systems include high-frequency, adaptive, and wireless technologies. Their effect is commonly explained in part by modulation of pain transmission and gate-control mechanisms.

Peripheral spinal nerves may regenerate roughly 1-3 mm per day when the pathway remains intact. Central nervous system regeneration is far more limited because inhibitory molecules and scar tissue restrict axonal growth. Research includes stem cells, nerve conduits, growth factors, and AI-assisted neuroprosthetics.`,
  },
];

const pathwayLevels = [
  {
    id: 'drg',
    phase: 'Level 1',
    label: 'Receptors',
    shortLabel: 'Receptors',
    prompt:
      'The first-order neurons of the Dorsal Column pathway are located in the __________ and consist of large, heavily myelinated fibers.',
    type: 'blank',
    placeholder: 'Type the missing structure',
    answer: 'Dorsal Root Ganglion / DRG',
    accepted: ['dorsal root ganglion', 'drg'],
    minMatches: 1,
    hint: 'The cell bodies sit just outside the spinal cord in a sensory ganglion.',
    knowMore: knowMoreBasics,
    position: 'left-[25%] bottom-[8%] sm:left-[28%]',
  },
  {
    id: 'lower-medulla',
    phase: 'Level 2',
    label: 'Medulla',
    shortLabel: 'Medulla',
    prompt: 'Where do the second-order neurons of the PCML pathway decussate (cross)?',
    type: 'mcq',
    hint: 'Motor decussation is at the medulla; this sensory crossing is also in the medulla.',
    options: [
      'Anterior white commissure',
      'Sensory decussation of medulla',
      'VPL',
      'Internal capsule',
    ],
    answer: 'Sensory decussation of medulla',
    knowMore: knowMoreBasics,
    position: 'right-[23%] bottom-[25%] sm:right-[26%]',
  },
  {
    id: 'columns',
    phase: 'Level 3',
    label: 'Fasciculi Arrangement',
    shortLabel: 'Gracilis / Cuneatus',
    prompt:
      'True or False: Fibers in the Fasciculus Gracilis and Cuneatus are arranged such that sacral segments are located most laterally.',
    type: 'boolean',
    hint: 'Think lower limb first: sacral and lumbar fibers enter earlier and occupy the medial dorsal column.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'Sacral fibers are medial; cervical fibers are lateral.',
    knowMore: `${knowMoreBasics}

Lower-limb sensory fibers from sacral and lumbar segments travel medially in the Fasciculus Gracilis, while upper-limb fibers ascend more laterally in the Fasciculus Cuneatus. This somatotopic map is useful when comparing lower-limb proprioceptive load in standing and sitting professions, including foot-arch and balance-related observations.`,
    position: 'left-[17%] bottom-[37%] sm:left-[21%]',
  },
  {
    id: 'proprioception',
    phase: 'Level 4',
    label: "Romberg's Test",
    shortLabel: 'Romberg',
    prompt:
      'A patient presents with a positive Romberg test, swaying only when eyes are closed. Which receptor type is likely failing to transmit signals correctly?',
    type: 'mcq',
    hint: 'The deficit appears when visual compensation is removed, so joint-position input is the weak link.',
    options: [
      'Nociceptors',
      'Thermoreceptors',
      'Proprioceptors',
      'Photoreceptors',
    ],
    answer: 'Proprioceptors',
    knowMore: `Romberg's test is performed in three steps:

1. Ask the patient to stand with the feet together.
2. Ask the patient to close both eyes.
3. Ask the patient to maintain the posture for 60 seconds.

The test is positive if the patient cannot maintain the posture with the feet together and eyes closed, or develops marked sway or falls during the observation period.

Balance depends on three inputs: vision, proprioception, and the vestibular system. The cerebellum acts as the processor that integrates these inputs and helps produce an appropriate postural response through skeletal muscle tone. If cerebellar processing is severely impaired, the patient may already be unable to stand steadily with the eyes open; in that situation, Romberg's test cannot be meaningfully performed.

When cerebellar function is sufficiently intact, closing the eyes removes visual compensation. Proprioceptive and vestibular pathways must then provide the cerebellum with the information required to maintain balance. If proprioception is impaired, the brain cannot accurately sense limb position, and the patient sways or falls.

Romberg's test may therefore be positive in proprioceptive dysfunction, including sensory peripheral neuropathy, dorsal column dysfunction, vitamin B12 deficiency, and tabes dorsalis. It may also be positive in vestibular dysfunction, such as vestibular neuritis. In cerebellar ataxia, the patient is typically unsteady even with the eyes open, so closing the eyes does not produce the defining sensory-dependent deterioration.`,
    knowMoreImages: [
      {
        src: '/Images/dcml/balance-inputs.jpeg',
        alt: 'Vision, proprioceptive, and vestibular inputs integrated by the cerebellum to maintain balance',
        caption: 'Balance requires sensory inputs, cerebellar processing, and an effective postural response.',
      },
      {
        src: '/Images/dcml/sensory-vs-cerebellar-ataxia.png',
        alt: 'Comparison of sensory ataxia and cerebellar ataxia during Romberg testing',
        caption: 'Sensory ataxia worsens when the eyes close; cerebellar ataxia is evident even with the eyes open.',
      },
    ],
    position: 'right-[20%] bottom-[49%] sm:right-[24%]',
  },
  {
    id: 'cordotomy',
    phase: 'Level 5',
    label: 'Posterior Funiculus',
    shortLabel: 'Cordotomy',
    prompt:
      'Sparing the posterior funiculus preserves any two DCML modalities: __________ and __________.',
    type: 'blank',
    placeholder: 'Type two preserved sensations',
    answer: 'Any two: fine touch, vibration sense, conscious proprioception, or two-point discrimination',
    acceptedGroups: [
      ['fine touch', 'discriminative touch'],
      ['vibration', 'vibration sense'],
      ['proprioception', 'conscious proprioception', 'position sense', 'joint position sense'],
      ['two-point discrimination', 'two point discrimination', '2-point discrimination'],
    ],
    minMatches: 2,
    hint: 'Use any two dorsal column modalities: fine touch, vibration sense, conscious proprioception or position sense, and two-point discrimination. Do not use spinothalamic pain and temperature.',
    knowMore: knowMoreClinical,
    position: 'left-[25%] bottom-[62%] sm:left-[31%]',
  },
  {
    id: 'b12',
    phase: 'Level 6',
    label: 'Vitamin B12 Deficiency',
    shortLabel: 'B12',
    prompt:
      'True or False: In a patient with early-stage Vitamin B12 deficiency, you would expect to see a loss of pain sensation before a loss of vibration sense.',
    type: 'boolean',
    hint: 'Subacute combined degeneration commonly affects posterior columns early.',
    options: ['True', 'False'],
    answer: 'False',
    explanation: 'PCML functions such as vibration are usually compromised first.',
    knowMore: `Why does vitamin B12 deficiency damage the dorsal columns before the spinothalamic tract in subacute combined degeneration?

Dorsal column fibers are large A-beta fibers, approximately 6-12 micrometers in diameter, wrapped in thick myelin sheaths. Larger fibers have more myelin surface area and a greater ongoing metabolic demand for B12-dependent maintenance than the smaller fibers of the spinothalamic tract.

Dorsal column axons may ascend nearly the entire length of the spinal cord. More myelin must therefore be maintained along each axon, so these fibers fail earlier when B12-dependent synthesis is impaired. The fasciculus gracilis, carrying lower-limb fibers, is affected before the fasciculus cuneatus because sacral and lumbar fibers travel the longest distance. This is why symptoms commonly begin in the feet.`,
    knowMoreImages: [
      {
        src: '/Images/dcml/VitB12def.png',
        alt: 'Vitamin B12 deficiency affecting the dorsal columns',
        caption: 'Subacute combined degeneration preferentially affects long, heavily myelinated pathways.',
      },
    ],
    supplementary: dcmlSupplementary,
    position: 'right-[18%] bottom-[76%] sm:right-[25%]',
  },
];

const ascendingTracts = [
  {
    id: 'dcml',
    title: 'Dorsal Column - Medial Lemniscus',
    image: '/dcml-pathway.png',
    status: 'Ready',
    description: 'Fine touch, vibration, conscious proprioception, and two-phase flashcards.',
  },
  {
    id: 'lateral-stt',
    title: 'Lateral Spinothalamic Tract',
    image: '/lateral-spinothalamic.png',
    status: 'Ready',
    description: 'Pain, temperature, somatotopy, cordotomy, crossed sensory signs, and referred pain.',
  },
  {
    id: 'ventral-stt',
    title: 'Ventral Spinothalamic Tract',
    image: '/ventral-spinothalamic.png',
    status: 'Ready',
    description: 'Crude touch, pressure, anterior white commissure crossing, itch distinction, and tabes dorsalis.',
  },
  {
    id: 'spinocerebellar',
    title: 'Spinocerebellar Tracts',
    image: '/spinocerebellar.png',
    status: 'Ready',
    description: 'Anterior and posterior spinocerebellar tracts, Clarke\'s column, feedback roles, and Friedreich\'s ataxia.',
  },
];

const descendingTracts = [
  {
    id: 'corticospinal',
    title: 'Corticospinal Tract',
    image: '/Corticospinal tracts.svg',
    status: 'Ready',
    description: 'Voluntary motor control, internal capsule, crus cerebri somatotopy, UMN/LMN signs, and spasticity.',
  },
  {
    id: 'corticobulbar',
    title: 'Corticobulbar Tract',
    image: '/assets/Corticobular tract for animation.svg',
    status: 'Ready',
    description: 'Genu of internal capsule, facial nucleus input, pseudobulbar palsy, cranial motor nuclei, and spasticity.',
  },
  {
    id: 'other-descending',
    title: 'Other Descending Tracts',
    image: '/Corticospinal tracts.svg',
    status: 'Unmapped',
    description: 'Rubrospinal, vestibulospinal, reticulospinal, and tectospinal tracts will be mapped later.',
  },
];

const homeAudioTracks = [
  {
    title: 'Sensory pathway overview',
    src: '/audio/sensory-file.mp3',
  },
  {
    title: 'Motor pathway overview',
    src: '/audio/motor-file.mp3',
  },
];

const feedbackUrl = 'https://forms.gle/gtNquQPbzGsLYNW46';

const STORAGE_KEY = 'spinal-cord-explorer-progress-v1';

const initialProgress = {
  points: 0,
  completedLevels: [],
  attemptedLevels: [],
  correctFirstTryLevels: [],
  knowMoreLevels: [],
  badges: [],
  completedTracts: [],
};

const badges = [
  {
    id: 'spinal-cord-explorer',
    title: 'Segmental Anatomy Explorer',
    description: 'Complete every Spinal Cord and Spinal Nerve level.',
    tone: 'bg-teal-50 text-teal-900 border-teal-500',
  },
  {
    id: 'first-signal',
    title: 'First Signal',
    description: 'Complete your first pathway flashcard.',
    tone: 'bg-sky-50 text-sky-900 border-sky-400',
  },
  {
    id: 'precision-touch',
    title: 'Precision Touch',
    description: 'Answer three pathway flashcards correctly on the first try.',
    tone: 'bg-violet-50 text-violet-900 border-violet-400',
  },
  {
    id: 'curious-clinician',
    title: 'Curious Clinician',
    description: 'Open three Know more sections.',
    tone: 'bg-amber-50 text-amber-900 border-amber-400',
  },
  {
    id: 'dcml-explorer',
    title: 'DCML Explorer',
    description: 'Complete every Dorsal Column - Medial Lemniscus level.',
    tone: 'bg-emerald-50 text-emerald-900 border-emerald-500',
  },
  {
    id: 'lateral-stt-explorer',
    title: 'Pain Pathway Explorer',
    description: 'Complete every Lateral Spinothalamic Tract level.',
    tone: 'bg-rose-50 text-rose-900 border-rose-500',
  },
  {
    id: 'ventral-stt-explorer',
    title: 'Crude Touch Explorer',
    description: 'Complete every Ventral Spinothalamic Tract level.',
    tone: 'bg-cyan-50 text-cyan-900 border-cyan-500',
  },
  {
    id: 'spinocerebellar-explorer',
    title: 'Coordination Explorer',
    description: 'Complete every Spinocerebellar Tracts level.',
    tone: 'bg-indigo-50 text-indigo-900 border-indigo-500',
  },
  {
    id: 'corticospinal-explorer',
    title: 'Motor Command Explorer',
    description: 'Complete every Corticospinal Tract level.',
    tone: 'bg-rose-50 text-rose-900 border-rose-500',
  },
  {
    id: 'corticobulbar-explorer',
    title: 'Cranial Motor Explorer',
    description: 'Complete every Corticobulbar Tract level.',
    tone: 'bg-orange-50 text-orange-900 border-orange-500',
  },
];

const tractModules = {
  'spinal-nerve': {
    id: 'spinal-nerve',
    division: 'foundation',
    title: 'Spinal Nerve',
    displayTitle: 'Spinal Nerve',
    mediaType: 'video',
    videoSrc: '/audio/Spinalvideo.mp4?v=1',
    iframeTitle: 'Spinal nerve video lesson',
    levels: spinalCordPathwayLevels,
    unlockOnEnd: true,
    intro: 'Watch the Spinal Nerve video. The six-phase quiz unlocks when the video ends, with clinical tables and explanatory figures in Know more.',
  },
  dcml: {
    id: 'dcml',
    division: 'ascending',
    title: 'Dorsal Column - Medial Lemniscus',
    displayTitle: 'Dorsal Column Medial Lemniscus',
    iframeSrc: '/assets/DCMLnewwithcameramovments1.html',
    iframeTitle: 'Dorsal Column Medial Lemniscus interactive pathway',
    levels: pathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 88,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the 88-second animation, then opens from the right-side drawer.',
  },
  'lateral-stt': {
    id: 'lateral-stt',
    division: 'ascending',
    title: 'Lateral Spinothalamic Tract',
    displayTitle: 'Lateral Spinothalamic Tract',
    iframeSrc: '/assets/Lateral spinothalamic tract animation3.html',
    iframeTitle: 'Lateral Spinothalamic Tract interactive pathway',
    levels: lateralPathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 88,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the pathway animation, then opens from the right-side drawer.',
  },
  'ventral-stt': {
    id: 'ventral-stt',
    division: 'ascending',
    title: 'Ventral Spinothalamic Tract',
    displayTitle: 'Ventral Spinothalamic Tract',
    iframeSrc: '/assets/Ventral spinothalamic tract animation.html',
    iframeTitle: 'Ventral Spinothalamic Tract interactive pathway',
    levels: ventralPathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 97,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the pathway animation, then opens from the right-side drawer.',
  },
  spinocerebellar: {
    id: 'spinocerebellar',
    division: 'ascending',
    title: 'Anterior And Posterior Spinocerebellar Tracts',
    displayTitle: 'Anterior And Posterior Spinocerebellar Tracts',
    iframeSrc: '/assets/Anterior and posterior spinocerebellar tract animation.html',
    iframeTitle: 'Anterior and Posterior Spinocerebellar Tracts interactive pathway',
    levels: spinocerebellarPathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 97,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the pathway animation, then opens from the right-side drawer.',
  },
  corticospinal: {
    id: 'corticospinal',
    division: 'descending',
    title: 'Corticospinal Tract',
    displayTitle: 'Corticospinal Tract',
    iframeSrc: '/assets/Corticospinal tract animation.html',
    iframeTitle: 'Corticospinal Tract interactive pathway',
    levels: corticospinalPathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 97,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the pathway animation, then opens from the right-side drawer.',
  },
  corticobulbar: {
    id: 'corticobulbar',
    division: 'descending',
    title: 'Corticobulbar Tract',
    displayTitle: 'Corticobulbar Tract',
    iframeSrc: '/assets/Corticospinal tract animation1.html',
    iframeTitle: 'Corticobulbar Tract interactive pathway',
    levels: corticobulbarPathwayLevels,
    unlockMessageType: 'dcml-quiz-ready',
    unlockTime: 97,
    intro: 'Use the interactive corticobulbar pathway as your map. The quiz unlocks after the pathway animation, then opens from the right-side drawer.',
  },
};

function loadProgress() {
  if (typeof window === 'undefined') return initialProgress;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return initialProgress;
    return { ...initialProgress, ...JSON.parse(stored) };
  } catch {
    return initialProgress;
  }
}

function evaluateBadges(progress) {
  const earned = new Set(progress.badges);

  if (progress.completedLevels.length >= 1) earned.add('first-signal');
  if (progress.correctFirstTryLevels.length >= 3) earned.add('precision-touch');
  if (progress.knowMoreLevels.length >= 3) earned.add('curious-clinician');
  if (spinalCordPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('spinal-cord-explorer');
  if (pathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('dcml-explorer');
  if (lateralPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('lateral-stt-explorer');
  if (ventralPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('ventral-stt-explorer');
  if (spinocerebellarPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('spinocerebellar-explorer');
  if (corticospinalPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('corticospinal-explorer');
  if (corticobulbarPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('corticobulbar-explorer');

  return [...earned];
}

function getCertificateRecords(progress) {
  const readyAscendingTracts = ascendingTracts.filter((tract) => tractModules[tract.id]);
  const readyDescendingTracts = descendingTracts.filter((tract) => tractModules[tract.id]);
  const ascendingComplete = readyAscendingTracts.every((tract) => progress.completedTracts.includes(tract.id));
  const descendingComplete = readyDescendingTracts.every((tract) => progress.completedTracts.includes(tract.id));

  return [
    {
      id: 'ascending',
      title: 'Ascending Pathways Completed',
      description: 'Awarded after completion of all ascending tract pathways.',
      earned: ascendingComplete,
    },
    {
      id: 'descending',
      title: 'Descending Pathways Completed',
      description: 'Awarded after completion of all descending tract pathways.',
      earned: descendingComplete,
    },
    {
      id: 'all-tracts',
      title: 'All Spinal Cord Tracts Completed',
      description: 'Awarded when learning of all ascending and descending tracts is completed.',
      earned: ascendingComplete && descendingComplete,
    },
  ];
}

function ProgressPill({ progress, compact = false, dark = false }) {
  const certificateRecords = getCertificateRecords(progress);
  const earnedCertificateCount = certificateRecords.filter((certificate) => certificate.earned).length;

  return (
    <div className={`grid gap-2 ${compact ? '' : 'sm:grid-cols-3'}`}>
      <div className={`rounded-lg border px-4 py-3 shadow-sm ${dark ? 'border-sky-900 bg-[#0c1d36]' : 'border-slate-200 bg-white'}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-sky-300' : 'text-slate-500'}`}>Points</p>
        <p className={`mt-1 text-2xl font-semibold ${dark ? 'text-white' : 'text-slate-950'}`}>{progress.points}</p>
      </div>
      <div className={`rounded-lg border px-4 py-3 shadow-sm ${dark ? 'border-sky-900 bg-[#0c1d36]' : 'border-slate-200 bg-white'}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-violet-300' : 'text-slate-500'}`}>Badges</p>
        <p className={`mt-1 text-2xl font-semibold ${dark ? 'text-white' : 'text-slate-950'}`}>{progress.badges.length}/{badges.length}</p>
      </div>
      <div className={`rounded-lg border px-4 py-3 shadow-sm ${dark ? 'border-sky-900 bg-[#0c1d36]' : 'border-slate-200 bg-white'}`}>
        <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${dark ? 'text-pink-300' : 'text-slate-500'}`}>Certificates</p>
        <p className={`mt-1 text-sm font-semibold ${earnedCertificateCount ? 'text-emerald-400' : dark ? 'text-slate-300' : 'text-slate-500'}`}>
          {earnedCertificateCount}/3 earned
        </p>
      </div>
    </div>
  );
}

function BadgeShelf({ progress }) {
  return (
    <div className="grid gap-2">
      {badges.map((badge) => {
        const earned = progress.badges.includes(badge.id);

        return (
          <div
            key={badge.id}
            className={`rounded-lg border px-3 py-3 text-sm transition ${
              earned ? badge.tone : 'border-slate-200 bg-slate-50 text-slate-400'
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="font-semibold">{badge.title}</span>
              <span className="text-xs font-semibold uppercase tracking-[0.16em]">{earned ? 'Earned' : 'Locked'}</span>
            </div>
            <p className="mt-1 leading-5">{badge.description}</p>
          </div>
        );
      })}
    </div>
  );
}

function BadgeDrawer({ progress, isOpen, onToggle }) {
  return (
    <div className="fixed left-0 top-1/2 z-40 flex flex-row-reverse items-start">
      <button
        type="button"
        onClick={onToggle}
        className="grid h-16 w-8 -translate-y-1/2 place-items-center rounded-r-lg border border-l-0 border-amber-500 bg-amber-500 px-1 py-2 text-[10px] font-semibold text-amber-950 shadow-xl transition hover:bg-amber-400"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-expanded={isOpen}
        aria-label="Badges"
        title="Badges"
      >
        Badge
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 340 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[80vh] -translate-y-1/2 overflow-x-hidden overflow-y-auto border-y border-r border-slate-200 bg-white shadow-2xl"
      >
        <div className="w-[340px] p-4 text-slate-950">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-700">Learning Awards</p>
            <h2 className="mt-1 text-xl font-semibold">Badges</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {progress.badges.length}/{badges.length} earned across this module.
            </p>
          </div>
          <BadgeShelf progress={progress} />
        </div>
      </motion.aside>
    </div>
  );
}

function BadgeCelebration({ badge, onClose }) {
  const pieces = Array.from({ length: 24 }, (_, index) => index);

  return (
    <motion.div
      className="fixed inset-0 z-[60] grid place-items-center overflow-hidden bg-slate-950/65 px-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="badge-title"
    >
      <div className="absolute inset-0 pointer-events-none">
        {pieces.map((piece) => (
          <motion.span
            key={piece}
            className="absolute block h-3 w-3 rounded-sm"
            style={{
              left: `${8 + ((piece * 37) % 84)}%`,
              backgroundColor: ['#0ea5e9', '#10b981', '#f59e0b', '#8b5cf6'][piece % 4],
            }}
            initial={{ top: '-8%', rotate: 0 }}
            animate={{ top: '108%', rotate: 360 }}
            transition={{ duration: 2.2 + (piece % 5) * 0.18, delay: (piece % 8) * 0.08 }}
          />
        ))}
      </div>
      <motion.div
        className="relative w-full max-w-md rounded-lg border border-amber-300 bg-white p-6 text-center text-slate-950 shadow-2xl"
        initial={{ scale: 0.86, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.96, opacity: 0 }}
      >
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full border-4 border-amber-400 bg-amber-50 text-4xl font-black text-amber-700">
          B
        </div>
        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.24em] text-amber-700">Badge unlocked</p>
        <h2 id="badge-title" className="mt-2 text-3xl font-semibold text-slate-950">
          {badge.title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600">{badge.description}</p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 rounded-lg bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Continue
        </button>
      </motion.div>
    </motion.div>
  );
}

function CertificateModal({ progress, onClose }) {
  const certificateRecords = getCertificateRecords(progress);
  const earnedCertificateCount = certificateRecords.filter((certificate) => certificate.earned).length;
  const today = new Date().toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="certificate-title"
      onMouseDown={onClose}
    >
      <motion.div
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border-4 border-sky-700 bg-white p-8 text-center text-slate-950 shadow-2xl"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="sticky right-0 top-0 float-right grid h-10 w-10 place-items-center rounded-lg border border-slate-300 bg-white text-xl leading-none text-slate-600 shadow-sm transition hover:border-slate-500 hover:text-slate-950"
          aria-label="Close certificates"
          title="Close"
        >
          x
        </button>
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-sky-700">Certificate of Completion</p>
        <h2 id="certificate-title" className="mt-4 text-4xl font-semibold">Spinal Cord Tract Certificates</h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-700">
          Certificates are awarded only for full pathway groups: all ascending tracts, all descending tracts, and all tracts together.
        </p>
        <div className="mt-8 grid gap-3 text-left">
          {certificateRecords.map((certificate) => (
            <div
              key={certificate.id}
              className={`rounded-lg border p-4 ${
                certificate.earned
                  ? 'border-emerald-400 bg-emerald-50 text-emerald-950'
                  : 'border-slate-200 bg-slate-50 text-slate-500'
              }`}
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold">{certificate.title}</h3>
                  <p className="mt-1 text-sm leading-6">{certificate.description}</p>
                </div>
                <span className="w-fit rounded-md border border-current px-2 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                  {certificate.earned ? 'Earned' : 'Locked'}
                </span>
              </div>
              {certificate.earned && (
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.18em]">
                  Certificate ID: SC-{certificate.id.toUpperCase()}-{progress.completedTracts.length}-{progress.points}
                </p>
              )}
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-3 rounded-lg border border-slate-200 bg-white p-5 text-left sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Points</p>
            <p className="mt-1 text-2xl font-semibold">{progress.points}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Badges</p>
            <p className="mt-1 text-2xl font-semibold">{progress.badges.length}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificates</p>
            <p className="mt-1 text-2xl font-semibold">{earnedCertificateCount}/3</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Date</p>
            <p className="mt-1 text-sm font-semibold">{today}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg bg-sky-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}

function isAnswerCorrect(level, value) {
  if (!value) return false;
  const normalized = value.trim().toLowerCase();

  if (level.type === 'blank') {
    if (level.acceptedAnswers) {
      return level.acceptedAnswers.some((answer) => normalized === answer);
    }
    if (level.acceptedGroups) {
      const matchCount = level.acceptedGroups.filter((group) =>
        group.some((term) => normalized.includes(term))
      ).length;
      return matchCount >= (level.minMatches ?? 1);
    }
    const matchCount = level.accepted.filter((term) => normalized.includes(term)).length;
    return matchCount >= (level.minMatches ?? 1);
  }

  return normalized === level.answer.toLowerCase();
}

function SupplementaryReading({ content }) {
  return (
    <section className="mt-6 space-y-5 border-t-2 border-indigo-200 pt-6">
      <div className="rounded-lg bg-indigo-950 px-4 py-3 text-white">
        <p className="font-serif text-xl font-bold tracking-wide">{content.title}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-indigo-200">Supplementary reading</p>
      </div>

      {content.blocks.map((block, index) => {
        const key = `${block.type}-${index}`;

        if (block.type === 'scenario') {
          return (
            <div key={key} className="rounded-lg border-l-4 border-amber-500 bg-amber-50 p-4 font-serif text-base italic leading-7 text-amber-950">
              <span className="mb-2 block text-xs font-bold uppercase tracking-[0.18em] text-amber-700">Clinical scenario</span>
              {block.text}
            </div>
          );
        }

        if (block.type === 'qa') {
          return (
            <div key={key} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
              <p className="whitespace-pre-line bg-indigo-50 px-4 py-3 font-serif text-base font-bold leading-7 text-indigo-950">{block.question}</p>
              <p className="whitespace-pre-line px-4 py-3 font-sans text-sm leading-7 text-teal-900"><span className="font-bold text-teal-700">Answer: </span>{block.answer}</p>
            </div>
          );
        }

        if (block.type === 'heading') {
          return <h3 key={key} className="border-b border-rose-200 pb-2 font-serif text-xl font-bold uppercase tracking-wide text-rose-800">{block.text}</h3>;
        }

        if (block.type === 'subheading') {
          return <h4 key={key} className="font-serif text-lg font-bold text-violet-800">{block.text}</h4>;
        }

        if (block.type === 'image') {
          return <img key={key} src={block.src} alt={block.alt} className="max-h-96 w-full rounded-lg border border-slate-200 bg-white object-contain p-3" />;
        }

        if (block.type === 'pearl') {
          return <p key={key} className="whitespace-pre-line rounded-lg border border-cyan-300 bg-cyan-50 p-4 font-serif text-base font-semibold leading-7 text-cyan-950">{block.text}</p>;
        }

        return <p key={key} className="font-sans text-sm leading-7 text-slate-700">{block.text}</p>;
      })}
    </section>
  );
}

function KnowMorePanel({ level }) {
  return (
    <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Know More</p>
      {level.knowMoreHighlight && (
        <p className="rounded-lg border-l-4 border-fuchsia-500 bg-fuchsia-50 px-4 py-3 font-serif text-lg font-bold text-fuchsia-950">
          {level.knowMoreHighlight}
        </p>
      )}
      {level.knowMore && <p className="whitespace-pre-line">{level.knowMore}</p>}

      {level.knowMoreImages?.map((image) => (
        <figure key={image.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <img src={image.src} alt={image.alt} className="max-h-96 w-full object-contain p-3" />
          {image.caption && (
            <figcaption className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}

      {level.knowMoreTables?.map((table) => (
        <section key={table.title} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <div className="border-b border-slate-200 bg-slate-50 px-3 py-2">
            <p className="font-semibold text-slate-900">{table.title}</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-xs sm:text-sm">
              <thead className="bg-white text-slate-600">
                <tr>
                  {table.headers.map((header) => (
                    <th key={header} className="border-b border-slate-200 px-3 py-2 font-semibold">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {table.rows.map((row) => (
                  <tr key={row.join('-')} className="align-top odd:bg-slate-50/70">
                    {row.map((cell, index) => (
                      <td key={`${row[1]}-${index}`} className="border-b border-slate-100 px-3 py-2 leading-6">
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {level.knowMoreEndImages?.map((image) => (
        <figure key={image.src} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
          <img src={image.src} alt={image.alt} className="max-h-96 w-full object-contain p-3" />
          {image.caption && (
            <figcaption className="border-t border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
              {image.caption}
            </figcaption>
          )}
        </figure>
      ))}

      {level.supplementary && <SupplementaryReading content={level.supplementary} />}
    </div>
  );
}

function HomeAudioControls() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isPlaying, setIsPlaying] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [finished, setFinished] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const activeTrack = homeAudioTracks[trackIndex];

  const playAudio = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setIsPlaying(true);
      setShouldPlay(true);
      setAutoplayBlocked(false);
      setFinished(false);
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = volume;
  }, [volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !shouldPlay) return;

    audio.currentTime = 0;
    playAudio();
  }, [trackIndex, shouldPlay]);

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
      setShouldPlay(false);
      return;
    }

    if (finished) {
      setTrackIndex(0);
    }

    setShouldPlay(true);
    playAudio();
  };

  const handleEnded = () => {
    if (trackIndex < homeAudioTracks.length - 1) {
      setTrackIndex((current) => current + 1);
      setShouldPlay(true);
      return;
    }

    setIsPlaying(false);
    setShouldPlay(false);
    setFinished(true);
    setTrackIndex(0);
  };

  return (
    <section className="absolute bottom-5 left-4 z-20 w-fit max-w-[calc(100%-2rem)] rounded-xl border border-sky-700/70 bg-[#071426]/95 p-3 text-slate-200 shadow-xl backdrop-blur sm:left-6">
      <audio
        ref={audioRef}
        src={activeTrack.src}
        preload="auto"
        onEnded={handleEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePlayback}
            className="grid h-10 w-10 place-items-center rounded-lg bg-pink-600 text-lg font-semibold text-white transition hover:bg-pink-500"
            aria-label={isPlaying ? 'Pause audio' : finished ? 'Replay audio' : 'Play audio'}
            title={isPlaying ? 'Pause' : finished ? 'Replay' : 'Play'}
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-sky-800 text-lg font-semibold text-sky-200 transition hover:border-cyan-400 hover:text-white"
            aria-label={expanded ? 'Close volume controls' : 'Open volume controls'}
            title="Volume"
          >
            {volume === 0 ? '🔇' : '🔊'}
          </button>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="border-t border-sky-900 pt-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-300" aria-label="Audio volume">
                <span aria-hidden="true">🔉</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="w-full accent-pink-500"
                />
              </label>
              {autoplayBlocked && (
                <p className="mt-2 text-xs leading-5 text-amber-300">
                  Press play once to start audio.
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

function LandingScreen({ onSelectDivision, progress }) {
  const [labelMode, setLabelMode] = useState('tracts');
  const spinalCordSvgUrl = `/assets/Cross section of spinal cord for animation1.svg?v=2&labels=${labelMode}`;

  return (
    <div className="min-h-screen bg-[#030b18] text-slate-100">
      <header className="border-b border-sky-950 bg-[#061222]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Spinal Cord Explorer</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-white sm:text-5xl">
              Spinal Cord Explorer
            </h1>
            <p className="mt-3 max-w-3xl text-lg font-medium tracking-wide text-amber-200 sm:text-xl">
              Learn. Integrate. Heal
            </p>
          </div>
          <div className="mt-4 w-full max-w-xl">
            <ProgressPill progress={progress} dark />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(0,1.45fr)_minmax(330px,0.55fr)]">
        <section className="relative overflow-hidden rounded-2xl border border-sky-900/80 bg-[#071426] shadow-2xl">
          <div className="flex flex-col gap-3 border-b border-sky-900 bg-[#0a1930] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-pink-300">Interactive spinal cord atlas</p>
              <p className="mt-1 text-sm text-slate-300">Hover to identify a tract, then select it to start learning.</p>
            </div>
            <div className="inline-flex w-fit rounded-lg border border-sky-800 bg-[#061222] p-1" aria-label="Diagram label mode">
              {['tracts', 'functions'].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setLabelMode(mode)}
                  aria-pressed={labelMode === mode}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition ${
                    labelMode === mode
                      ? 'bg-pink-600 text-white shadow-sm'
                      : 'text-slate-400 hover:bg-sky-900/60 hover:text-white'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>
          </div>
          <div className="relative min-h-[520px] bg-[radial-gradient(circle_at_center,rgba(14,116,144,0.18),transparent_62%)] p-4 sm:p-6">
            <button
              type="button"
              onClick={() => onSelectDivision('ascending')}
              className="absolute left-5 top-4 z-10 rounded-xl border border-cyan-500 bg-white/95 px-3 py-2 text-xs font-semibold text-cyan-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-cyan-50 sm:left-10 sm:top-8 sm:px-4 sm:py-3 sm:text-sm"
            >
              Ascending Tracts
            </button>
            <button
              type="button"
              onClick={() => onSelectDivision('descending')}
              className="absolute right-5 top-4 z-10 rounded-xl border border-pink-500 bg-white/95 px-3 py-2 text-xs font-semibold text-pink-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-pink-50 sm:right-10 sm:top-8 sm:px-4 sm:py-3 sm:text-sm"
            >
              Descending Tracts
            </button>
            <object
              key={labelMode}
              data={spinalCordSvgUrl}
              type="image/svg+xml"
              title="Interactive spinal cord cross-section tract map"
              className="mx-auto h-[500px] w-full rounded-xl border-0 bg-white drop-shadow-[0_18px_38px_rgba(0,0,0,0.35)]"
            >
              <img
                src={spinalCordSvgUrl}
                alt="Cross section of spinal cord with interactive tract regions"
                className="mx-auto h-[500px] w-full object-contain"
              />
            </object>
          </div>
          <HomeAudioControls />
        </section>

        <section className="grid content-start gap-4">
          <button
            type="button"
            onClick={() => onSelectDivision('ascending')}
            className="group overflow-hidden rounded-2xl border border-cyan-500/50 bg-gradient-to-br from-cyan-500/15 via-[#0a1930] to-[#071426] p-6 text-left shadow-xl transition hover:-translate-y-1 hover:border-cyan-300"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-xl border border-cyan-300/50 bg-cyan-400/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-cyan-200">Explore Ascending tracts</span>
              <span className="text-2xl text-cyan-300 transition group-hover:translate-x-1">&gt;</span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-300">Sensory input toward the brain</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Sensory Pathways</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Fine touch, pain, temperature, crude touch, proprioception, and cerebellar coordination.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('descending')}
            className="group overflow-hidden rounded-2xl border border-pink-500/50 bg-gradient-to-br from-pink-500/15 via-[#0a1930] to-[#071426] p-6 text-left shadow-xl transition hover:-translate-y-1 hover:border-pink-300"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="rounded-xl border border-pink-300/50 bg-pink-400/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.16em] text-pink-200">Explore Descending tracts</span>
              <span className="text-2xl text-pink-300 transition group-hover:translate-x-1">&gt;</span>
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-pink-300">Motor commands toward the body</p>
            <h2 className="mt-2 text-2xl font-semibold text-white">Motor Pathways</h2>
            <p className="mt-3 text-sm leading-7 text-slate-300">
              Voluntary limb movement, cranial motor control, upper motor neuron signs, and clinical localization.
            </p>
          </button>
          <div className="rounded-2xl border border-violet-500/40 bg-[#08172b] p-5 shadow-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-violet-300">Learn in three moves</p>
            <div className="mt-4 grid gap-3">
              {[
                ['1', 'Watch', 'Follow the animated pathway and its key crossings.'],
                ['2', 'Attempt', 'Answer first; receive a targeted tip only when needed.'],
                ['3', 'Localize', 'Connect anatomy to clinical deficits and examination findings.'],
              ].map(([number, title, text]) => (
                <div key={number} className="grid grid-cols-[36px_1fr] gap-3 rounded-xl border border-sky-900 bg-[#0c1d36] p-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-violet-400/60 bg-violet-400/10 text-sm font-bold text-violet-200">{number}</span>
                  <span><span className="block text-sm font-semibold text-white">{title}</span><span className="mt-1 block text-xs leading-5 text-slate-400">{text}</span></span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function AscendingTractsScreen({ onBack, onOpenTract, progress }) {
  return (
    <div className="min-h-screen bg-[#030b18] text-slate-100">
      <header className="border-b border-sky-950 bg-[#061222]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-300 hover:text-white">
              Back to spinal cord object
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300">Ascending Tracts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Select A Sensory Pathway
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Choose a tract to explore its animation, active-recall levels, clinical localization, and supplementary learning.</p>
          </div>
          <div className="w-full max-w-xl">
            <ProgressPill progress={progress} dark />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {ascendingTracts.map((tract) => (
          <button
            key={tract.id}
            type="button"
            onClick={() => onOpenTract(tract.id)}
            className="group overflow-hidden rounded-2xl border border-cyan-900/80 bg-[#08172b] text-left shadow-xl transition hover:-translate-y-1 hover:border-cyan-400"
          >
            <div className="h-72 bg-white p-3">
              <img src={tract.image} alt={`${tract.title} diagram`} className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]" />
            </div>
            <div className="border-t border-cyan-900/80 p-5">
              <div className={`mb-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                progress.completedTracts.includes(tract.id)
                  ? 'border-lime-400/60 bg-lime-400/10 text-lime-200'
                  : 'border-cyan-500/50 bg-cyan-500/10 text-cyan-200'
              }`}>
                {progress.completedTracts.includes(tract.id) ? 'Completed' : tract.status}
              </div>
              <h2 className="text-lg font-semibold text-slate-950">{tract.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{tract.description}</p>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
}

function PlaceholderTractScreen({ tract, onBack }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
            Back to ascending tracts
          </button>
          <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">{tract.title}</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Image and module shell are ready. I will attach your questions, answers, and know-more text when you send the content.
          </p>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6">
        <section className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <img src={tract.image} alt={`${tract.title} diagram`} className="mx-auto max-h-[1180px] w-full object-contain" />
        </section>
      </main>
    </div>
  );
}

function DescendingTractsScreen({ onBack, onOpenTract, progress }) {
  return (
    <div className="min-h-screen bg-[#030b18] text-slate-100">
      <header className="border-b border-sky-950 bg-[#061222]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-5 px-4 py-6 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-300 hover:text-white">
              Back to spinal cord object
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-pink-300">Descending Tracts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-white sm:text-4xl">
              Select A Motor Pathway
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">Choose a motor pathway to connect cortical commands, brainstem crossings, examination signs, and clinical lesions.</p>
          </div>
          <div className="w-full max-w-xl">
            <ProgressPill progress={progress} dark />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-5">
        {descendingTracts.map((tract) => (
          <button
            key={tract.id}
            type="button"
            onClick={() => onOpenTract(tract.id)}
            className="group overflow-hidden rounded-2xl border border-pink-900/80 bg-[#08172b] text-left shadow-xl transition hover:-translate-y-1 hover:border-pink-400 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
            disabled={!tractModules[tract.id]}
          >
            <div className="h-72 bg-white p-3">
              <img src={tract.image} alt={`${tract.title} diagram`} className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]" />
            </div>
            <div className="border-t border-pink-900/80 p-5">
              <div className={`mb-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                progress.completedTracts.includes(tract.id)
                  ? 'border-lime-400/60 bg-lime-400/10 text-lime-200'
                  : tractModules[tract.id]
                    ? 'border-pink-500/50 bg-pink-500/10 text-pink-200'
                    : 'border-slate-700 bg-slate-900 text-slate-400'
              }`}>
                {progress.completedTracts.includes(tract.id) ? 'Completed' : tract.status}
              </div>
              <h2 className="text-lg font-semibold text-white">{tract.title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">{tract.description}</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-pink-300">{tractModules[tract.id] ? 'Begin pathway' : 'Coming later'} <span aria-hidden="true">&gt;</span></span>
            </div>
          </button>
        ))}
      </main>
    </div>
  );
}

function QuizDrawer({ levels, completedLevelIds, activeLevelId, isReady, isOpen, onToggle, onSelectLevel }) {
  const levelIds = new Set(levels.map((level) => level.id));
  const moduleCompletedLevelIds = completedLevelIds.filter((levelId) => levelIds.has(levelId));
  const nextIndex = Math.min(moduleCompletedLevelIds.length, levels.length - 1);

  return (
    <div className="fixed right-0 top-1/2 z-40 flex items-start">
      <button
        type="button"
        onClick={onToggle}
        className={`grid h-16 w-8 -translate-y-1/2 place-items-center rounded-l-lg border border-r-0 px-1 py-2 text-[10px] font-semibold shadow-xl transition ${
          isReady
            ? 'border-sky-600 bg-sky-700 text-white hover:bg-sky-800'
            : 'border-slate-300 bg-slate-200 text-slate-500'
        }`}
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        aria-expanded={isOpen}
        aria-label="Pathway Quiz"
        title="Pathway Quiz"
      >
        Quiz
      </button>

      <motion.aside
        initial={false}
        animate={{ width: isOpen ? 360 : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className="max-h-[80vh] -translate-y-1/2 overflow-x-hidden overflow-y-auto border-y border-l border-slate-200 bg-white shadow-2xl"
      >
        <div className="w-[360px] p-4 text-slate-950">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Gamified Pathway</p>
            <h2 className="mt-1 text-xl font-semibold">Pathway Quiz</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {isReady ? 'Complete each level to unlock the next.' : 'Finish the lesson video or pathway animation to unlock the quiz.'}
            </p>
          </div>

          <div className="grid overflow-hidden rounded-lg border border-slate-200">
            {levels.map((level, index) => {
              const isCompleted = moduleCompletedLevelIds.includes(level.id);
              const isUnlocked = isReady && (index <= nextIndex || isCompleted);
              const isActive = activeLevelId === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => onSelectLevel(level)}
                  className={`grid grid-cols-[1fr_auto] items-center gap-3 border-b border-slate-200 px-3 py-3 text-left text-sm transition last:border-b-0 ${
                    isActive && isUnlocked
                      ? 'bg-sky-50 text-sky-950'
                      : isReady && isCompleted
                        ? 'bg-emerald-50 text-emerald-900'
                        : isUnlocked
                          ? 'bg-white text-slate-800 hover:bg-sky-50'
                          : 'bg-slate-100 text-slate-400 grayscale'
                  }`}
                >
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.16em]">{level.phase}</span>
                    {level.label}
                  </span>
                  <span className="text-lg" aria-hidden="true">
                    {isReady && isCompleted ? '✓' : isUnlocked ? '›' : '🔒'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.aside>
    </div>
  );
}

function FlashcardModal({
  level,
  moduleTitle,
  currentLevelIndex,
  totalLevels,
  nextLevel,
  onClose,
  onComplete,
  onKnowMore,
  onGoToLevel,
}) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(true);
  const [showMore, setShowMore] = useState(false);
  const correct = useMemo(() => isAnswerCorrect(level, answer), [answer, level]);

  const submitAnswer = () => {
    if (!answer.trim()) return;
    setFeedback(correct ? 'correct' : 'incorrect');

    if (correct) {
      onComplete(level.id, true);
      setShowMore(true);
      onKnowMore(level.id);
    } else {
      onComplete(level.id, false);
      setHintVisible(true);
    }
  };

  const chooseAnswer = (option) => {
    setAnswer(option);
    const optionCorrect = isAnswerCorrect(level, option);
    setFeedback(optionCorrect ? 'correct' : 'incorrect');

    if (optionCorrect) {
      onComplete(level.id, true);
      setShowMore(true);
      onKnowMore(level.id);
    } else {
      onComplete(level.id, false);
      setHintVisible(true);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#020817]/90 px-3 py-4 backdrop-blur-md sm:px-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flashcard-title"
    >
      <motion.div
        className="max-h-[94vh] w-full max-w-5xl overflow-y-auto rounded-2xl border border-sky-800/70 bg-[#071426] p-5 text-slate-100 shadow-[0_30px_90px_rgba(0,0,0,0.55)] sm:p-7"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-sky-900/70 pb-4">
          <div>
            <nav className="mb-2 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-sky-300" aria-label="Quiz breadcrumb">
              <span>{moduleTitle}</span>
              <span className="text-slate-500">/</span>
              <span>Level {currentLevelIndex + 1} of {totalLevels}</span>
              <span className="text-slate-500">/</span>
              <span className="text-pink-300">{level.label}</span>
            </nav>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-pink-300">Clinical scenario - {level.phase}</p>
            <h2 id="flashcard-title" className="mt-1 text-2xl font-semibold text-white">
              {level.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-sky-800 bg-slate-950/40 text-xl leading-none text-slate-300 transition hover:border-pink-400 hover:text-white"
            aria-label="Close flashcard"
          >
            x
          </button>
        </div>

        <div className="rounded-xl border border-sky-900/80 bg-[#0a1930] p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => {
              setHintVisible(true);
              if (level.type === 'mcq' && hintVisible) setOptionsVisible(true);
            }}
            className="hidden"
            aria-label="Show hint"
            title="Show hint"
          >
            💡
          </button>
          <p className="text-lg font-medium leading-8 text-white sm:text-xl">{level.prompt}</p>
        </div>

        <AnimatePresence>
          {hintVisible && (
            <motion.div
              className="mt-4 rounded-lg border border-amber-400/60 bg-amber-400/10 p-4 text-sm leading-6 text-amber-100"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
            >
              {level.hint}
              {level.type === 'mcq' && !optionsVisible && (
                <button
                  type="button"
                  onClick={() => setOptionsVisible(true)}
                  className="mt-3 block rounded-lg border border-amber-600 px-3 py-2 text-sm font-semibold text-amber-900 transition hover:bg-amber-100"
                >
                  Show answer options
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-5">
          {level.type === 'blank' ? (
            <div className="flex flex-col gap-3 sm:flex-row">
              <input
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setFeedback(null);
                }}
                disabled={feedback === 'correct'}
                placeholder={level.placeholder}
                className="min-h-12 flex-1 rounded-lg border border-sky-800 bg-[#061222] px-4 text-white outline-none transition placeholder:text-slate-500 focus:border-pink-400 focus:ring-2 focus:ring-pink-500/20"
              />
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim() || feedback === 'correct'}
                className="min-h-12 rounded-lg bg-pink-600 px-5 font-semibold text-white transition hover:bg-pink-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                Check
              </button>
            </div>
          ) : level.type === 'mcq' && !optionsVisible ? (
            <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
              Use the hint first, then reveal the options when you are ready.
            </div>
          ) : (
            <div className="grid gap-3">
              {level.options.map((option) => (
                <label
                  key={option}
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-left transition ${
                    answer === option
                      ? feedback === 'incorrect'
                        ? 'border-red-400 bg-red-500/10 text-red-100'
                        : 'border-lime-400 bg-lime-500/10 text-lime-100'
                      : 'border-sky-900 bg-[#0c1d36] text-slate-200 hover:border-pink-400 hover:bg-pink-500/10'
                  } ${feedback === 'correct' ? 'cursor-default opacity-80' : ''}`}
                >
                  <input
                    type="radio"
                    name={`quiz-${level.id}`}
                    value={option}
                    checked={answer === option}
                    disabled={feedback === 'correct'}
                    onChange={() => chooseAnswer(option)}
                    className="h-4 w-4 accent-pink-500"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>

        <AnimatePresence>
          {feedback && (
            <motion.div
              className={`mt-5 rounded-lg border p-4 ${
                feedback === 'correct'
                  ? 'border-lime-400/70 bg-lime-500/10'
                  : 'border-red-400/70 bg-red-500/10'
              }`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {feedback === 'correct' ? (
                <div className="flex flex-wrap items-center gap-3">
                  <div className="quiz-badge-pop grid h-12 w-12 place-items-center rounded-full border-2 border-amber-500 bg-amber-300 text-xl font-black text-amber-950 shadow-lg">
                    ✓
                  </div>
                  <div>
                    <p className="font-semibold text-lime-200">Correct. Level completed.</p>
                    <p className="mt-1 text-sm text-lime-100">
                      <span className="font-semibold">Answer:</span> {level.answer}
                      {level.explanation ? ` - ${level.explanation}` : ''}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      {nextLevel ? (
                        <button
                          type="button"
                          onClick={() => onGoToLevel(nextLevel)}
                          className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-500"
                        >
                          Next: {nextLevel.phase} - {nextLevel.label}
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={onClose}
                          className="rounded-lg bg-lime-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-lime-500"
                        >
                          Complete module
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg border border-sky-700 px-4 py-2 text-sm font-semibold text-sky-100 transition hover:border-sky-400 hover:text-white"
                      >
                        Back to pathway
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-red-200">Not quite. Try once more.</p>
                  <p className="mt-1 text-sm text-red-100">A targeted tip is now shown above the answer choices.</p>
                </div>
              )}

              {feedback === 'correct' && showMore && (
                <div className="mt-4 rounded-xl bg-white p-4 text-slate-950"><KnowMorePanel level={level} /></div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

function PathwayModule({ module, onBack, progress, onAnswer, onKnowMore, onShowCertificate }) {
  const pathwayFrameRef = useRef(null);
  const pathwayMediaRef = useRef(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [quizDrawerOpen, setQuizDrawerOpen] = useState(false);
  const [badgeDrawerOpen, setBadgeDrawerOpen] = useState(false);
  const completedLevelIds = progress.completedLevels;
  const moduleLevelIds = new Set(module.levels.map((level) => level.id));
  const moduleCompletedLevelIds = completedLevelIds.filter((levelId) => moduleLevelIds.has(levelId));
  const nextLevelIndex = Math.min(moduleCompletedLevelIds.length, module.levels.length - 1);
  const activeLevelIndex = activeLevel ? module.levels.findIndex((level) => level.id === activeLevel.id) : -1;
  const modalNextLevel = activeLevelIndex >= 0 ? module.levels[activeLevelIndex + 1] : null;

  const completeLevel = (levelId, correct) => onAnswer(module.id, module.levels, levelId, correct);

  useEffect(() => {
    setActiveLevel(null);
    setQuizReady(false);
    setQuizDrawerOpen(false);
    setBadgeDrawerOpen(false);
  }, [module.id]);

  useEffect(() => {
    const unlockQuiz = () => {
      setQuizReady(true);
      setQuizDrawerOpen(true);
    };

    const handleMessage = (event) => {
      if (event.origin !== window.location.origin) return;
      if (module.unlockMessageType && event.data?.type === module.unlockMessageType) unlockQuiz();
    };

    window.addEventListener('message', handleMessage);

    const timer = quizReady ? undefined : window.setInterval(() => {
      const media = module.mediaType === 'video'
        ? pathwayMediaRef.current
        : pathwayFrameRef.current?.contentDocument?.querySelector('audio, video');

      const reachedUnlockTime = Number.isFinite(module.unlockTime) && media?.currentTime >= module.unlockTime;
      if (media?.ended || reachedUnlockTime) {
        unlockQuiz();
        window.clearInterval(timer);
      }
    }, 750);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (timer) window.clearInterval(timer);
    };
  }, [module.mediaType, module.unlockMessageType, module.unlockTime, quizReady]);

  const backDestination = module.division === 'foundation' ? 'home' : `${module.division} tracts`;

  return (
    <div className="min-h-screen bg-[#030b18] text-slate-100">
      <header className="border-b border-sky-950 bg-[#061222]">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="w-fit text-sm font-semibold text-sky-300 hover:text-white">
            Back to {backDestination}
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-amber-300">Spinal Cord Explorer</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-white sm:text-4xl">
                {module.title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-300">
                {module.intro}
              </p>
            </div>
            <button
              type="button"
              onClick={onShowCertificate}
              className="w-fit rounded-lg border border-pink-400/60 bg-pink-500/15 px-4 py-3 text-sm font-semibold text-pink-100 transition hover:bg-pink-500/25"
            >
              View Certificates
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-4 py-5 sm:px-6 lg:grid-cols-[270px_minmax(0,1fr)]">
        <aside className="hidden rounded-2xl border border-sky-900/80 bg-[#08172b] p-4 shadow-2xl lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Learning path</p>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            {quizReady ? 'Attempt each level. A tip appears only after an incorrect answer.' : 'Complete the pathway lesson to unlock the clinical questions.'}
          </p>
          <div className="mt-4 grid gap-2">
            {module.levels.map((level, index) => {
              const isCompleted = moduleCompletedLevelIds.includes(level.id);
              const isUnlocked = quizReady && (index <= nextLevelIndex || isCompleted);
              const isActive = activeLevel?.id === level.id;

              return (
                <button
                  key={level.id}
                  type="button"
                  disabled={!isUnlocked}
                  onClick={() => setActiveLevel(level)}
                  className={`rounded-xl border px-3 py-3 text-left transition ${
                    isActive
                      ? 'border-pink-400 bg-pink-500/15 text-white'
                      : isCompleted
                        ? 'border-lime-500/50 bg-lime-500/10 text-lime-100'
                        : isUnlocked
                          ? 'border-sky-900 bg-[#0c1d36] text-slate-200 hover:border-sky-500'
                          : 'border-slate-800 bg-slate-950/30 text-slate-600'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-pink-300">{level.phase}</span>
                  <span className="mt-1 block text-sm font-semibold">{level.label}</span>
                </button>
              );
            })}
          </div>
          <button type="button" onClick={() => setBadgeDrawerOpen(true)} className="mt-4 w-full rounded-xl border border-violet-500/50 bg-violet-500/10 px-3 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/20">
            View learning awards
          </button>
        </aside>

        <div className="min-w-0">
        <section className="relative overflow-hidden rounded-2xl border border-sky-900/80 bg-[#071426] shadow-2xl">
          <div className="flex flex-col gap-2 border-b border-sky-900 bg-[#0a1930] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-pink-300">Interactive pathway</p>
              <p className="mt-1 text-base font-semibold text-white">{module.displayTitle}</p>
            </div>
            <span className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${quizReady ? 'border-lime-400/60 bg-lime-400/10 text-lime-200' : 'border-amber-400/60 bg-amber-400/10 text-amber-200'}`}>
              {quizReady ? 'Quiz unlocked' : 'Lesson in progress'}
            </span>
          </div>
          <div className="relative min-h-[70vh] bg-slate-950">
            {module.mediaType === 'video' ? (
              <video
                ref={pathwayMediaRef}
                src={module.videoSrc}
                title={module.iframeTitle}
                controls
                autoPlay
                playsInline
                preload="auto"
                onEnded={() => {
                  setQuizReady(true);
                  setQuizDrawerOpen(true);
                }}
                className="h-[70vh] w-full bg-black object-contain"
              />
            ) : (
              <iframe
                ref={pathwayFrameRef}
                src={module.iframeSrc}
                title={module.iframeTitle}
                className="h-[70vh] w-full border-0"
              />
            )}
          </div>
        </section>
        <section className="mt-4 rounded-2xl border border-sky-900/80 bg-[#08172b] p-4">
          <ProgressPill progress={progress} dark />
        </section>
        <div className="mt-4 flex items-center justify-between rounded-2xl border border-sky-900/80 bg-[#08172b] px-4 py-3">
          <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">Module progress</span>
          <div className="flex gap-2">
            {module.levels.map((level, index) => (
              <span key={level.id} className={`grid h-8 w-8 place-items-center rounded-full border text-xs font-bold ${moduleCompletedLevelIds.includes(level.id) ? 'border-lime-400 bg-lime-400/20 text-lime-200' : index === nextLevelIndex && quizReady ? 'border-pink-400 bg-pink-500/20 text-pink-200' : 'border-sky-900 bg-slate-950/30 text-slate-500'}`}>{index + 1}</span>
            ))}
          </div>
        </div>
        </div>
      </main>

      <BadgeDrawer
        progress={progress}
        isOpen={badgeDrawerOpen}
        onToggle={() => setBadgeDrawerOpen((value) => !value)}
      />

      <div className="lg:hidden">
        <QuizDrawer
          levels={module.levels}
          completedLevelIds={completedLevelIds}
          activeLevelId={activeLevel?.id}
          isReady={quizReady}
          isOpen={quizDrawerOpen}
          onToggle={() => setQuizDrawerOpen((value) => !value)}
          onSelectLevel={(level) => {
            setActiveLevel(level);
            setQuizDrawerOpen(false);
          }}
        />
      </div>

      <AnimatePresence>
        {activeLevel && (
          <FlashcardModal
            key={activeLevel.id}
            level={activeLevel}
            moduleTitle={module.title}
            currentLevelIndex={activeLevelIndex}
            totalLevels={module.levels.length}
            nextLevel={modalNextLevel}
            onClose={() => setActiveLevel(null)}
            onComplete={completeLevel}
            onKnowMore={onKnowMore}
            onGoToLevel={setActiveLevel}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function FeedbackLink() {
  return (
    <a
      href={feedbackUrl}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-50 rounded-lg border border-sky-500 bg-sky-700 px-4 py-3 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-sky-800"
    >
      Feedback
    </a>
  );
}

function DeveloperFooter() {
  return (
    <footer className="border-t border-sky-950 bg-[#061222] px-4 py-5 text-slate-400 sm:px-6">
      <div className="mx-auto max-w-[1500px] text-sm leading-6">
        <div>
          <p className="font-semibold text-slate-200">Developed by</p>
          <p>Dr. Prarthana KG, Department of Human Biology, IMU University, Bukit Jalil, Kuala Lumpur, Malaysia.</p>
          <p>Dr. Viveka S, Department of Anatomy, Shridevi Medical College, Tumkur, India.</p>
        </div>
      </div>
    </footer>
  );
}

function getInitialNavigation() {
  if (typeof window === 'undefined') {
    return { screen: 'landing', activeTractId: null };
  }

  const moduleId = new URLSearchParams(window.location.search).get('module');

  if (moduleId === 'spinal-cord') {
    return { screen: 'foundation', activeTractId: 'spinal-nerve' };
  }

  const module = moduleId ? tractModules[moduleId] : null;

  if (!module) {
    return { screen: 'landing', activeTractId: null };
  }

  return { screen: module.division, activeTractId: module.id };
}

export default function App() {
  const initialNavigation = useMemo(getInitialNavigation, []);
  const [screen, setScreen] = useState(initialNavigation.screen);
  const [activeTractId, setActiveTractId] = useState(initialNavigation.activeTractId);
  const [progress, setProgress] = useState(loadProgress);
  const [celebrationBadge, setCelebrationBadge] = useState(null);
  const [isCertificateOpen, setIsCertificateOpen] = useState(false);
  const activeTract = [...ascendingTracts, ...descendingTracts].find((tract) => tract.id === activeTractId);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const updateProgress = (producer) => {
    setProgress((current) => {
      const next = producer(current);
      const nextBadges = evaluateBadges(next);
      const newBadgeId = nextBadges.find((badgeId) => !current.badges.includes(badgeId));
      const updated = { ...next, badges: nextBadges };

      if (newBadgeId) {
        setCelebrationBadge(badges.find((badge) => badge.id === newBadgeId));
      }

      return updated;
    });
  };

  const recordAnswer = (tractId, levels, levelId, correct) => {
    updateProgress((current) => {
      const alreadyAttempted = current.attemptedLevels.includes(levelId);
      const completedLevels = !correct || current.completedLevels.includes(levelId)
        ? current.completedLevels
        : [...current.completedLevels, levelId];
      const attemptedLevels = alreadyAttempted ? current.attemptedLevels : [...current.attemptedLevels, levelId];
      const correctFirstTryLevels =
        correct && !alreadyAttempted && !current.correctFirstTryLevels.includes(levelId)
          ? [...current.correctFirstTryLevels, levelId]
          : current.correctFirstTryLevels;
      const completedTracts =
        levels.every((level) => completedLevels.includes(level.id)) && !current.completedTracts.includes(tractId)
          ? [...current.completedTracts, tractId]
          : current.completedTracts;
      const points = current.points + (alreadyAttempted ? 0 : 10) + (correct && !alreadyAttempted ? 20 : 0) +
        (completedTracts.length > current.completedTracts.length ? 50 : 0);

      return {
        ...current,
        points,
        completedLevels,
        attemptedLevels,
        correctFirstTryLevels,
        completedTracts,
      };
    });
  };

  const recordKnowMore = (levelId) => {
    updateProgress((current) => {
      if (current.knowMoreLevels.includes(levelId)) return current;

      return {
        ...current,
        points: current.points + 10,
        knowMoreLevels: [...current.knowMoreLevels, levelId],
      };
    });
  };

  let content;

  if (screen === 'landing') {
    content = (
      <LandingScreen
        progress={progress}
        onSelectDivision={(division) => {
          setScreen(division);
          setActiveTractId(null);
        }}
        onOpenTract={(tractId, division) => {
          setScreen(division);
          setActiveTractId(tractId);
        }}
      />
    );
  } else if (screen === 'descending' && !activeTractId) {
    content = (
      <DescendingTractsScreen
        progress={progress}
        onBack={() => setScreen('landing')}
        onOpenTract={(tractId) => {
          setActiveTractId(tractId);
        }}
      />
    );
  } else if (screen === 'ascending' && !activeTractId) {
    content = (
      <AscendingTractsScreen
        progress={progress}
        onBack={() => setScreen('landing')}
        onOpenTract={(tractId) => {
          setActiveTractId(tractId);
        }}
      />
    );
  } else if (tractModules[activeTractId]) {
    content = (
      <PathwayModule
        module={tractModules[activeTractId]}
        progress={progress}
        onBack={() => {
          if (tractModules[activeTractId]?.division === 'foundation') setScreen('landing');
          setActiveTractId(null);
        }}
        onAnswer={recordAnswer}
        onKnowMore={recordKnowMore}
        onShowCertificate={() => setIsCertificateOpen(true)}
      />
    );
  } else {
    content = <PlaceholderTractScreen tract={activeTract} onBack={() => setActiveTractId(null)} />;
  }

  return (
    <>
      <FeedbackLink />
      {content}
      <DeveloperFooter />
      <AnimatePresence>
        {celebrationBadge && (
          <BadgeCelebration badge={celebrationBadge} onClose={() => setCelebrationBadge(null)} />
        )}
        {isCertificateOpen && <CertificateModal progress={progress} onClose={() => setIsCertificateOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
