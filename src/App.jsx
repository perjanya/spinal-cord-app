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
    accepted: ['lamina i', 'lamina 1', 'lamina ii', 'lamina 2', 'substantia gelatinosa'],
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
        src: '/assets/Lateral spinothalamic tract for animation with labels.svg',
        alt: 'Labeled lateral spinothalamic tract somatotopy',
        caption: 'Labeled lateral spinothalamic tract asset.',
      },
    ],
  },
  {
    id: 'lateral-stt-brown-sequard',
    phase: 'Level 4',
    label: 'Brown-Sequard Pattern',
    shortLabel: 'Hemisection',
    prompt: 'A 45-year-old man has loss of pain and temperature sensation on the right side below T6. MRI shows a left hemisection at T6. Which tract is responsible?',
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

The trigeminal nerve divides into V1, V2, and V3. V1 supplies the forehead, upper eyelid, and eye. V2 supplies the cheek, upper lip, upper teeth, and roof of the mouth. V3 supplies the lower jaw, lower lip, and lower teeth, and also carries motor fibers for chewing. V2 and V3 are most commonly affected, so the pain is often mistaken for tooth or jaw disease.

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
    prompt: 'During neurological examination, a patient feels cotton wool touch the skin but cannot determine the precise point of contact. Which property explains this?',
    type: 'mcq',
    hint: 'Crude touch detects contact but localizes it poorly.',
    options: ['High receptor density', 'Small receptive fields', 'Precise somatotopic organization', 'Poor spatial discrimination'],
    answer: 'Poor spatial discrimination',
    knowMore: `The anterior spinothalamic tract carries crude touch with large, overlapping receptive fields. When a stimulus activates these fibers, many neurons may respond over a broad area, making precise localization difficult.

High receptor density and small receptive fields improve spatial discrimination, as seen in fingertips and dorsal column-mediated discriminative touch. Somatotopy means the body map is preserved in tract geography, but that is not the same as distinguishing two nearby skin points.`,
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
  },
];

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
    knowMore: `Posterior limb means power: corticospinal motor fibers pass through the posterior limb of the internal capsule. The anterior limb is more associated with frontopontine fibers and behavior or affect.

Because fibers are tightly packed here, a small lacunar stroke, often from hypertension affecting lenticulostriate arteries, can cause pure motor weakness of an entire half of the body.`,
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

After an upper motor neuron lesion such as a stroke damaging the corticospinal tract, descending control of inhibitory interneurons breaks down. Antagonist muscles resist passive movement, contributing to spasticity and clasp-knife rigidity.`,
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
    label: 'Romberg Test',
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
    knowMore: knowMoreClinical,
    position: 'right-[20%] bottom-[49%] sm:right-[24%]',
  },
  {
    id: 'cordotomy',
    phase: 'Level 5',
    label: 'Posterior Funiculus',
    shortLabel: 'Cordotomy',
    prompt:
      "Sparing the posterior funiculus preserves __________ and __________.",
    type: 'blank',
    placeholder: 'Type two preserved sensations',
    answer: 'Vibration / Proprioception',
    accepted: ['vibration', 'proprioception'],
    minMatches: 2,
    hint: 'These are dorsal column modalities, not spinothalamic pain and temperature.',
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
    knowMore: knowMoreClinical,
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
    id: 'rubrospinal',
    title: 'Rubrospinal Tract',
    image: '/Corticospinal tracts.svg',
    status: 'Content next',
    description: 'Reserved for future descending motor tract content.',
  },
  {
    id: 'vestibulospinal',
    title: 'Vestibulospinal Tract',
    image: '/Corticospinal tracts.svg',
    status: 'Content next',
    description: 'Reserved for future descending motor tract content.',
  },
  {
    id: 'reticulospinal',
    title: 'Reticulospinal Tract',
    image: '/Corticospinal tracts.svg',
    status: 'Content next',
    description: 'Reserved for future descending motor tract content.',
  },
  {
    id: 'tectospinal',
    title: 'Tectospinal Tract',
    image: '/Corticospinal tracts.svg',
    status: 'Content next',
    description: 'Reserved for future descending motor tract content.',
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
];

const tractModules = {
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
    unlockTime: 97,
    intro: 'Use the interactive pathway as your map. The quiz unlocks after the 97-second animation, then opens from the right-side drawer.',
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
  if (pathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('dcml-explorer');
  if (lateralPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('lateral-stt-explorer');
  if (ventralPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('ventral-stt-explorer');
  if (spinocerebellarPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('spinocerebellar-explorer');
  if (corticospinalPathwayLevels.every((level) => progress.completedLevels.includes(level.id))) earned.add('corticospinal-explorer');

  return [...earned];
}

function getCertificateRecords(progress) {
  const ascendingComplete = ascendingTracts.every((tract) => progress.completedTracts.includes(tract.id));
  const descendingComplete = descendingTracts.every((tract) => progress.completedTracts.includes(tract.id));

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

function ProgressPill({ progress, compact = false }) {
  const certificateRecords = getCertificateRecords(progress);
  const earnedCertificateCount = certificateRecords.filter((certificate) => certificate.earned).length;

  return (
    <div className={`grid gap-2 ${compact ? '' : 'sm:grid-cols-3'}`}>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Points</p>
        <p className="mt-1 text-2xl font-semibold text-slate-950">{progress.points}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Badges</p>
        <p className="mt-1 text-2xl font-semibold text-slate-950">{progress.badges.length}/{badges.length}</p>
      </div>
      <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Certificates</p>
        <p className={`mt-1 text-sm font-semibold ${earnedCertificateCount ? 'text-emerald-700' : 'text-slate-500'}`}>
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
    <div className="fixed left-0 top-1/2 z-40 flex -translate-y-1/2 flex-row-reverse items-stretch">
      <button
        type="button"
        onClick={onToggle}
        className="grid h-16 w-8 place-items-center rounded-r-lg border border-l-0 border-amber-500 bg-amber-500 px-1 py-2 text-[10px] font-semibold text-amber-950 shadow-xl transition hover:bg-amber-400"
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
        className="overflow-hidden border-y border-r border-slate-200 bg-white shadow-2xl"
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
    >
      <motion.div
        className="w-full max-w-3xl rounded-lg border-4 border-sky-700 bg-white p-8 text-center text-slate-950 shadow-2xl"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
      >
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
    const matchCount = level.accepted.filter((term) => normalized.includes(term)).length;
    return matchCount >= (level.minMatches ?? 1);
  }

  return normalized === level.answer.toLowerCase();
}

function KnowMorePanel({ level }) {
  return (
    <div className="mt-4 space-y-4 border-t border-slate-200 pt-4 text-sm leading-7 text-slate-700">
      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-700">Know More</p>
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
    </div>
  );
}

function HomeAudioControls() {
  const audioRef = useRef(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
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
    audio.muted = muted;
  }, [muted, volume]);

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
    <section className="absolute bottom-24 left-4 z-20 w-[min(19rem,calc(100%-2rem))] rounded-lg border border-white/80 bg-white/90 p-3 shadow-xl backdrop-blur">
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
            className="grid h-10 w-10 place-items-center rounded-lg bg-sky-700 text-lg font-semibold text-white transition hover:bg-sky-800"
            aria-label={isPlaying ? 'Pause audio' : finished ? 'Replay audio' : 'Play audio'}
            title={isPlaying ? 'Pause' : finished ? 'Replay' : 'Play'}
          >
            {isPlaying ? 'II' : finished ? 'R' : '>'}
          </button>
          <button
            type="button"
            onClick={() => setMuted((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            aria-label={muted ? 'Unmute audio' : 'Mute audio'}
            title={muted ? 'Unmute' : 'Mute'}
          >
            {muted ? 'M' : 'S'}
          </button>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-lg font-semibold text-slate-700 transition hover:border-slate-500 hover:text-slate-950"
            aria-label={expanded ? 'Collapse audio controls' : 'Expand audio controls'}
            title={expanded ? 'Collapse' : 'Volume'}
          >
            {expanded ? '-' : '+'}
          </button>
          <span className="min-w-0 truncate text-xs font-semibold text-slate-700">
            {finished ? 'Complete' : activeTrack.title}
          </span>
        </div>
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="border-t border-slate-200 pt-3"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
            >
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                Volume
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                  className="w-full accent-sky-700"
                />
              </label>
              {autoplayBlocked && (
                <p className="mt-2 text-xs leading-5 text-amber-700">
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
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Spinal Cord Explorer</p>
          <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
            Choose A Pathway System
          </h1>
          <div className="mt-4">
            <ProgressPill progress={progress} />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[minmax(320px,520px)_1fr]">
        <section className="relative min-h-[560px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <spline-viewer
            url="https://prod.spline.design/GVrlap4FGO1V3lj4/scene.splinecode"
            className="pointer-events-none block h-[560px] w-full"
          />
          <HomeAudioControls />
          <button
            type="button"
            onClick={() => onSelectDivision('ascending')}
            className="absolute left-1/2 top-5 z-10 w-44 -translate-x-1/2 rounded-lg border border-emerald-600 bg-emerald-50/95 px-4 py-3 text-sm font-semibold text-emerald-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-emerald-100"
          >
            Ascending Tracts
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('descending')}
            className="absolute bottom-5 left-1/2 z-10 w-44 -translate-x-1/2 rounded-lg border border-rose-600 bg-rose-50/95 px-4 py-3 text-sm font-semibold text-rose-900 shadow-lg transition hover:-translate-y-0.5 hover:bg-rose-100"
          >
            Descending Tracts
          </button>
        </section>

        <section className="grid content-start gap-4">
          <button
            type="button"
            onClick={() => onSelectDivision('ascending')}
            className="rounded-lg border border-emerald-600 bg-white p-5 text-left shadow-sm transition hover:bg-emerald-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-700">Sensory input upward</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Ascending Tracts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Open DCML now, then add lateral STT, ventral STT, and spinocerebellar tract content in the same interactive format.
            </p>
          </button>
          <button
            type="button"
            onClick={() => onSelectDivision('descending')}
            className="rounded-lg border border-rose-600 bg-white p-5 text-left shadow-sm transition hover:bg-rose-50"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-rose-700">Motor output downward</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Descending Tracts</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              A placeholder destination is ready for corticospinal and related motor tract modules when you want them.
            </p>
          </button>
        </section>
      </main>
    </div>
  );
}

function AscendingTractsScreen({ onBack, onOpenTract, progress }) {
  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
              Back to spinal cord object
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-emerald-700">Ascending Tracts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Select A Sensory Pathway
            </h1>
          </div>
          <div className="w-full max-w-sm">
            <ProgressPill progress={progress} compact />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-4">
        {ascendingTracts.map((tract) => (
          <button
            key={tract.id}
            type="button"
            onClick={() => onOpenTract(tract.id)}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-500"
          >
            <div className="h-72 bg-slate-50">
              <img src={tract.image} alt={`${tract.title} diagram`} className="h-full w-full object-contain" />
            </div>
            <div className="border-t border-slate-200 p-4">
              <div className={`mb-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                progress.completedTracts.includes(tract.id)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : 'border-slate-200 bg-slate-50 text-slate-600'
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
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <button type="button" onClick={onBack} className="mb-3 text-sm font-semibold text-sky-800 hover:text-sky-950">
              Back to spinal cord object
            </button>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose-700">Descending Tracts</p>
            <h1 className="mt-2 text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
              Select A Motor Pathway
            </h1>
          </div>
          <div className="w-full max-w-sm">
            <ProgressPill progress={progress} compact />
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:px-6 md:grid-cols-2 xl:grid-cols-5">
        {descendingTracts.map((tract) => (
          <button
            key={tract.id}
            type="button"
            onClick={() => onOpenTract(tract.id)}
            className="overflow-hidden rounded-lg border border-slate-200 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:border-rose-500 disabled:cursor-not-allowed disabled:opacity-75 disabled:hover:translate-y-0"
            disabled={!tractModules[tract.id]}
          >
            <div className="h-72 bg-slate-50">
              <img src={tract.image} alt={`${tract.title} diagram`} className="h-full w-full object-contain" />
            </div>
            <div className="border-t border-slate-200 p-4">
              <div className={`mb-3 inline-flex rounded-md border px-2 py-1 text-xs font-semibold ${
                progress.completedTracts.includes(tract.id)
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-800'
                  : tractModules[tract.id]
                    ? 'border-slate-200 bg-slate-50 text-slate-600'
                    : 'border-rose-200 bg-rose-50 text-rose-700'
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

function QuizDrawer({ levels, completedLevelIds, activeLevelId, isReady, isOpen, onToggle, onSelectLevel }) {
  const levelIds = new Set(levels.map((level) => level.id));
  const moduleCompletedLevelIds = completedLevelIds.filter((levelId) => levelIds.has(levelId));
  const nextIndex = Math.min(moduleCompletedLevelIds.length, levels.length - 1);

  return (
    <div className="fixed right-0 top-1/2 z-40 flex -translate-y-1/2 items-stretch">
      <button
        type="button"
        onClick={onToggle}
        className={`grid h-16 w-8 place-items-center rounded-l-lg border border-r-0 px-1 py-2 text-[10px] font-semibold shadow-xl transition ${
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
        className="overflow-hidden border-y border-l border-slate-200 bg-white shadow-2xl"
      >
        <div className="w-[360px] p-4 text-slate-950">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">Gamified Pathway</p>
            <h2 className="mt-1 text-xl font-semibold">Pathway Quiz</h2>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              {isReady ? 'Complete each level to unlock the next.' : 'Finish the pathway animation to unlock the quiz.'}
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

function FlashcardModal({ level, onClose, onComplete, onKnowMore }) {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [hintVisible, setHintVisible] = useState(false);
  const [optionsVisible, setOptionsVisible] = useState(level.type !== 'mcq');
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
    }
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="flashcard-title"
    >
      <motion.div
        className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-lg border border-slate-300 bg-white p-5 text-slate-950 shadow-2xl sm:p-6"
        initial={{ scale: 0.96, y: 16 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.98, y: 12 }}
      >
        <div className="mb-5 flex items-start justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-sky-700">{level.phase}</p>
            <h2 id="flashcard-title" className="mt-1 text-2xl font-semibold text-slate-950">
              {level.label}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-300 text-xl leading-none text-slate-600 transition hover:border-slate-500 hover:text-slate-950"
            aria-label="Close flashcard"
          >
            x
          </button>
        </div>

        <div className="flex items-start gap-3">
          <button
            type="button"
            onClick={() => {
              setHintVisible(true);
              if (level.type === 'mcq' && hintVisible) setOptionsVisible(true);
            }}
            className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-amber-300 bg-amber-50 text-xl transition hover:bg-amber-100"
            aria-label="Show hint"
            title="Show hint"
          >
            💡
          </button>
          <p className="text-lg leading-8 text-slate-900">{level.prompt}</p>
        </div>

        <AnimatePresence>
          {hintVisible && (
            <motion.div
              className="mt-4 rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm leading-6 text-amber-950"
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
                className="min-h-12 flex-1 rounded-lg border border-slate-300 bg-white px-4 text-slate-950 outline-none transition focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
              />
              <button
                type="button"
                onClick={submitAnswer}
                disabled={!answer.trim() || feedback === 'correct'}
                className="min-h-12 rounded-lg bg-sky-700 px-5 font-semibold text-white transition hover:bg-sky-800 disabled:cursor-not-allowed disabled:bg-slate-300"
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
                      ? 'border-sky-700 bg-sky-50 text-sky-950'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-sky-600 hover:bg-sky-50'
                  } ${feedback === 'correct' ? 'cursor-default opacity-80' : ''}`}
                >
                  <input
                    type="radio"
                    name={`quiz-${level.id}`}
                    value={option}
                    checked={answer === option}
                    disabled={feedback === 'correct'}
                    onChange={() => chooseAnswer(option)}
                    className="h-4 w-4 accent-sky-700"
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
                  ? 'border-emerald-300 bg-emerald-50'
                  : 'border-red-300 bg-red-50'
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
                    <p className="font-semibold text-emerald-800">Correct. Badge unlocked.</p>
                    <p className="mt-1 text-sm text-emerald-900">
                      <span className="font-semibold">Answer:</span> {level.answer}
                      {level.explanation ? ` - ${level.explanation}` : ''}
                    </p>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="font-semibold text-red-700">Incorrect. Try again.</p>
                  <p className="mt-1 text-sm text-red-900">Use the hint, then submit another answer.</p>
                </div>
              )}

              {feedback === 'correct' && showMore && <KnowMorePanel level={level} />}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

function PathwayModule({ module, onBack, progress, onAnswer, onKnowMore, onShowCertificate }) {
  const pathwayFrameRef = useRef(null);
  const [activeLevel, setActiveLevel] = useState(null);
  const [quizReady, setQuizReady] = useState(false);
  const [quizDrawerOpen, setQuizDrawerOpen] = useState(false);
  const [badgeDrawerOpen, setBadgeDrawerOpen] = useState(false);
  const completedLevelIds = progress.completedLevels;

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
      if (event.data?.type === module.unlockMessageType) unlockQuiz();
    };

    window.addEventListener('message', handleMessage);

    const timer = quizReady ? undefined : window.setInterval(() => {
      const audio = pathwayFrameRef.current?.contentDocument?.querySelector('audio');

      if (audio?.currentTime >= module.unlockTime) {
        unlockQuiz();
        window.clearInterval(timer);
      }
    }, 750);

    return () => {
      window.removeEventListener('message', handleMessage);
      if (timer) window.clearInterval(timer);
    };
  }, [module.unlockMessageType, module.unlockTime, quizReady]);

  return (
    <div className="min-h-screen bg-[#f7fafc] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-5 sm:px-6">
          <button type="button" onClick={onBack} className="w-fit text-sm font-semibold text-sky-800 hover:text-sky-950">
            Back to {module.division === 'descending' ? 'descending' : 'ascending'} tracts
          </button>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-sky-700">Spinal Cord Explorer</p>
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-normal text-slate-950 sm:text-4xl">
                {module.title}
              </h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                {module.intro}
              </p>
            </div>
            <button
              type="button"
              onClick={onShowCertificate}
              className="w-fit rounded-lg bg-sky-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-sky-800"
            >
              View Certificates
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-5 sm:px-6">
        <section className="relative overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 bg-slate-50 px-12 py-4 text-center">
            <p className="text-base font-semibold text-slate-800">{module.displayTitle}</p>
          </div>
          <div className="relative min-h-[70vh] bg-slate-950">
            <iframe
              ref={pathwayFrameRef}
              src={module.iframeSrc}
              title={module.iframeTitle}
              className="h-[70vh] w-full border-0"
            />
          </div>
        </section>
        <section className="mt-4">
          <ProgressPill progress={progress} />
        </section>
      </main>

      <BadgeDrawer
        progress={progress}
        isOpen={badgeDrawerOpen}
        onToggle={() => setBadgeDrawerOpen((value) => !value)}
      />

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

      <AnimatePresence>
        {activeLevel && (
          <FlashcardModal
            key={activeLevel.id}
            level={activeLevel}
            onClose={() => setActiveLevel(null)}
            onComplete={completeLevel}
            onKnowMore={onKnowMore}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState('landing');
  const [activeTractId, setActiveTractId] = useState(null);
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
        onBack={() => setActiveTractId(null)}
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
      {content}
      <AnimatePresence>
        {celebrationBadge && (
          <BadgeCelebration badge={celebrationBadge} onClose={() => setCelebrationBadge(null)} />
        )}
        {isCertificateOpen && <CertificateModal progress={progress} onClose={() => setIsCertificateOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
