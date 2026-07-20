# Development and Pilot Evaluation of a Clinically Integrated Interactive Web Application for Learning Spinal Cord Tracts

## Title Page

**Title:** Development and Pilot Evaluation of a Clinically Integrated Interactive Web Application for Learning Spinal Cord Tracts

**Short title:** Interactive spinal cord tract learning module

**Authors:**  
[Author 1 name], [qualification], [affiliation]  
[Author 2 name], [qualification], [affiliation]  
[Add additional authors if applicable]

**Corresponding author:**  
[Name]  
[Department, institution, address]  
[Email]

**Article type:** Educational innovation / Original article / Short communication  

**Word count:** Approximately 3,300 words, excluding abstract, tables, and references  

**Keywords:** neuroanatomy; spinal cord tracts; anatomy education; e-learning; gamification; active recall; medical education

---

## Abstract

**Background:** Spinal cord tracts are a challenging component of neuroanatomy because learners must integrate tract location, modality, decussation, somatotopy, and clinical lesion localization. Static diagrams and didactic explanations may not sufficiently support this spatial and clinical integration.  

**Objective:** To develop and pilot-evaluate an interactive, clinically integrated web application for learning spinal cord tracts using pathway visualization, active recall, immediate feedback, and gamified progression.  

**Methods:** The Spinal Cord Explorer was developed using an instructional design approach aligned with the Analysis, Design, Development, Implementation, and Evaluation (ADDIE) framework. The application includes an interactive spinal cord atlas, pathway-specific modules, animated tract demonstrations, progressive clinical scenario questions, feedback after attempts, explanatory "Know More" panels, audio-supported learning, progress tracking, badges, and certificates. A pilot feedback survey was administered to student users after exposure to the application. Survey items evaluated interface satisfaction, effectiveness of interactive diagrams, quiz challenge level, clarity and accuracy of written explanations, device used, technical issues, and open-ended suggestions. Descriptive statistics were used to summarize quantitative responses, and open-ended comments were reviewed thematically.

**Results:** Nineteen student responses were analyzed. Overall satisfaction with the design and user interface was high, with a mean score of 4.58/5; all respondents rated the interface as 4 or 5. The effectiveness of interactive diagrams was rated 4 or 5 by all respondents, with a mean score of 4.68/5. Most students found the quiz features appropriately challenging (17/19, 89.5%). Written explanations were rated Good or Excellent by 100% of respondents for anatomy/location descriptions, 94.7% for physiological function explanations, 89.5% for pathology/clinical correlates, and 94.4% of those who rated diagram labels and annotations. Most respondents accessed the application using smartphones. Qualitative feedback supported the perceived usefulness of the module and suggested improvements such as additional tract labels, flowchart-style summaries, more topics, and smoother transitions.

**Conclusion:** The Spinal Cord Explorer was well received in this pilot evaluation and demonstrated favorable student perceptions regarding usability, interactivity, and clarity. The module offers a scalable, mobile-accessible approach to integrating neuroanatomical visualization with clinical reasoning. Further evaluation with pre-test/post-test learning outcomes, larger samples, and controlled comparison groups is warranted.

---

## Introduction

Neuroanatomy is widely perceived as one of the more difficult areas of medical education. Students must often build three-dimensional mental representations from two-dimensional diagrams while simultaneously learning clinically relevant pathways, lesion levels, and neurological deficits. This difficulty is particularly evident in spinal cord tracts, where learners must integrate several domains: anatomical location within the cord, sensory or motor modality, level of decussation, somatotopic organization, and the expected clinical deficit following a lesion. Such difficulty contributes to poor confidence in neurological localization and to the broader phenomenon often described as "neurophobia" [1].

Spinal cord tract learning is conceptually demanding because the same anatomical structure may require interpretation at multiple levels. For example, understanding the dorsal column-medial lemniscus pathway requires recognition of peripheral receptors, first-order neuron cell bodies, ipsilateral spinal cord ascent, medullary decussation, thalamic relay, and cortical perception. Similarly, the lateral spinothalamic tract requires understanding of early spinal crossing and contralateral pain and temperature loss below a lesion. Descending pathways such as the corticospinal and corticobulbar tracts require integration of motor cortex, internal capsule, brainstem, decussation, upper motor neuron signs, and cranial nerve motor control. These topics are commonly tested in clinical scenarios such as Brown-Sequard syndrome, Romberg's test, tabes dorsalis, cordotomy, pyramidal lesions, and pseudobulbar palsy.

Digital learning environments can support medical education when they are intentionally designed around learning objectives rather than used merely as repositories of information. Internet-based learning has shown effectiveness across health professions education, especially when modules are interactive and allow self-paced engagement [2,3]. Multimedia learning theory also supports the use of coordinated visual and verbal representations when complex spatial information must be learned [4]. For neuroanatomy, interactive visualizations may help learners connect pathway structure to function and clinical consequences.

Active recall and retrieval practice are also relevant to tract learning. Retrieval-based learning has been shown to enhance long-term retention more effectively than repeated study alone [5,6]. In medical education, repeated testing has similarly been associated with improved long-term retention [7]. Therefore, a tract-learning module should not simply display information; it should prompt learners to retrieve, apply, and receive feedback on clinically meaningful questions.

Gamification may further support engagement when game elements are aligned with learning goals rather than added superficially. Points, badges, progressive levels, and immediate feedback can help structure learning and sustain motivation, particularly in self-directed digital environments [8,9]. In anatomy and physiology education, serious games and gamified approaches have been proposed as tools to support revision and learner engagement [10]. However, educational technology must be evaluated for learner acceptability, usability, and perceived usefulness before larger effectiveness studies.

The present work describes the development and pilot evaluation of the Spinal Cord Explorer, a web-based interactive learning application designed to teach spinal cord tracts through pathway visualization, clinical scenario-based active recall, immediate feedback, and gamified progression. The objective was to create a mobile-accessible module that helps learners connect tract anatomy with clinical localization.

## Methods

### Study Design

This was an educational innovation and pilot evaluation study. The application was developed using an instructional design approach aligned with the ADDIE framework: Analysis, Design, Development, Implementation, and Evaluation [11]. The pilot evaluation used a cross-sectional student feedback survey after application use. The purpose of the pilot was to assess learner perception, usability, clarity, and areas for improvement rather than to establish definitive learning effectiveness.

### Educational Problem Analysis

The need for the module was identified from the educational challenge of teaching spinal cord tracts, a topic that requires integration of structural neuroanatomy and clinical neurology. Learners commonly struggle to visualize tract positions, remember crossing levels, distinguish ascending and descending pathways, and predict deficits from spinal cord and brainstem lesions. The design problem was therefore framed as follows: to create a learning environment that allows students to see the pathway, attempt clinically relevant questions, receive feedback, and progressively connect tract anatomy with patient presentations.

### Learning Objectives

The application was designed to support the following learning objectives:

1. Identify major ascending and descending spinal cord pathways.
2. Describe the sensory or motor modality carried by each tract.
3. Explain the level and clinical significance of decussation.
4. Relate tract position to somatotopy and lesion localization.
5. Predict clinical deficits in common syndromes involving spinal cord tracts.
6. Apply tract knowledge through clinical scenario-based questions.

### Design Principles

The module was designed around five educational principles:

1. **Interactive visualization:** pathway diagrams and animations were used to support spatial understanding of tract location and course.
2. **Progressive learning:** each tract was broken into sequential levels, moving from anatomy and physiology to pathology and clinical localization.
3. **Active recall:** learners were required to attempt clinical questions rather than passively read explanations.
4. **Feedback and remediation:** hints appeared after incorrect responses, and detailed explanations were provided after successful completion.
5. **Gamified progression:** progress indicators, levels, points, badges, and certificates were used to encourage completion.

### Application Development

The Spinal Cord Explorer was developed as a browser-accessible web application. It includes a home dashboard with an interactive spinal cord atlas, separation of ascending and descending tracts, and pathway-specific modules. The currently developed modules include major ascending and descending pathways such as dorsal column-medial lemniscus, lateral and anterior spinothalamic tracts, spinocerebellar tracts, corticospinal tract, and corticobulbar tract.

Each module contains an interactive pathway panel, a structured learning path, and clinical scenario questions arranged by level. Examples of learning levels include receptors, medullary decussation, tract arrangement, Romberg's test, posterior funiculus lesions, Brown-Sequard syndrome, cordotomy, tabes dorsalis, upper motor neuron signs, and corticobulbar clinical syndromes. Questions include multiple-choice, true/false, and fill-in-the-blank formats. After correct responses, learners see the expected answer and explanatory content. After incorrect attempts, a targeted hint is displayed before further attempt or review.

The interface was designed as a dark clinical dashboard to resemble a modern digital learning environment. The application supports smartphone and tablet access, reflecting current student learning habits. Navigation features include pathway selection, level progression, immediate next-level movement after successful answer completion, and persistent feedback access.

### Implementation and Participants

The pilot version was shared with student users for voluntary use. Nineteen student responses were available for analysis. Participants accessed the application using their own devices. The survey did not collect personally identifying information in the dataset analyzed for this manuscript.

### Feedback Instrument

Student feedback was collected using a Google Forms questionnaire. The survey included items on:

- overall satisfaction with design and user interface;
- effectiveness of interactive diagrams in explaining function and location of tracts;
- tracts or pathways studied using the application;
- perceived challenge level of quiz/assessment features;
- clarity and accuracy of anatomy/location descriptions;
- clarity and accuracy of physiological function explanations;
- clarity and accuracy of pathology/clinical correlates;
- clarity and accuracy of diagram labels and annotations;
- primary device used;
- technical issues or bugs encountered;
- suggestions for new features, content additions, or improvements.

Interface satisfaction and diagram effectiveness were rated on a 5-point numerical scale. Written explanation items were rated using categorical responses such as Excellent, Good, and Fair. Open-ended suggestions were reviewed to identify recurring improvement themes.

### Data Analysis

Quantitative responses were summarized using descriptive statistics. Means and medians were calculated for numerical rating items. Frequencies and percentages were calculated for categorical items. For written explanation categories, responses rated Good or Excellent were summarized as favorable ratings. Open-ended comments were reviewed narratively to identify positive feedback and suggested improvements.

### Ethical Considerations

The present manuscript is based on anonymized educational feedback from student users. Before journal submission, the authors should obtain institutional ethics committee approval or exemption, as required by the institution and target journal. The final manuscript should include the approval or exemption number in this section. If retrospective anonymized quality-improvement data are used, this should be explicitly stated according to local institutional guidance.

## Results

### Participant Responses

Nineteen student feedback responses were analyzed. Most respondents accessed the application using smartphones, indicating that the module was primarily used in a mobile learning context.

### Overall Satisfaction and Perceived Diagram Effectiveness

Overall satisfaction with the application's design and user interface was high. Eleven students rated satisfaction as 5/5 and eight rated it as 4/5, giving a mean score of 4.58/5 and a median of 5. All respondents rated the interface as either 4 or 5.

The interactive diagrams were also rated highly. Thirteen students rated diagram effectiveness as 5/5 and six rated it as 4/5. The mean diagram effectiveness score was 4.68/5, with a median of 5. All respondents rated the diagrams as either 4 or 5 for explaining the function and location of the tracts.

**Table 1. Overall student ratings of application design and interactive diagrams**

| Feedback item | Mean score /5 | Median | Rating 4 or 5, n/N (%) |
|---|---:|---:|---:|
| Overall satisfaction with design and user interface | 4.58 | 5 | 19/19 (100%) |
| Effectiveness of interactive diagrams | 4.68 | 5 | 19/19 (100%) |

### Quiz Challenge Level

Seventeen respondents (89.5%) reported that the quiz/assessment features were appropriately challenging. Two respondents (10.5%) felt that the quizzes were too easy. No respondent indicated that the quizzes were excessively difficult.

**Table 2. Perceived challenge level of quiz/assessment features**

| Response | n | % |
|---|---:|---:|
| Appropriately challenging | 17 | 89.5 |
| Too easy | 2 | 10.5 |

### Clarity and Accuracy of Written Explanations

The clarity and accuracy of written explanations were rated favorably across all domains. Anatomy/location descriptions were rated Good or Excellent by all respondents. Physiological function explanations were rated Good or Excellent by 18 of 19 respondents (94.7%). Pathology/clinical correlates were rated Good or Excellent by 17 of 19 respondents (89.5%). Diagram labels and annotations were rated Good or Excellent by 17 of 18 respondents who provided a rating (94.4%).

**Table 3. Student ratings of clarity and accuracy of written explanations**

| Domain | Excellent, n (%) | Good, n (%) | Fair, n (%) | Good/Excellent, n/N (%) |
|---|---:|---:|---:|---:|
| Anatomy/location descriptions | 9 (47.4) | 10 (52.6) | 0 (0) | 19/19 (100%) |
| Physiological function explanations | 8 (42.1) | 10 (52.6) | 1 (5.3) | 18/19 (94.7%) |
| Pathology/clinical correlates | 5 (26.3) | 12 (63.2) | 2 (10.5) | 17/19 (89.5%) |
| Diagram labels and annotations | 10 (52.6) | 7 (36.8) | 1 (5.3) | 17/18 rated (94.4%) |

### Tracts Studied

The corticospinal tract was the most commonly studied pathway, selected by 12 students (63.2%). The dorsal column-medial lemniscus pathway was studied by five students (26.3%), the spinothalamic tract by three students (15.8%), and spinocerebellar tracts by two students (10.5%). One student reported studying all listed pathways.

**Table 4. Tracts studied using the application**

| Tract/pathway | n | % of students |
|---|---:|---:|
| Corticospinal tract | 12 | 63.2 |
| Dorsal column-medial lemniscus pathway | 5 | 26.3 |
| Spinothalamic tract | 3 | 15.8 |
| Spinocerebellar tracts | 2 | 10.5 |

### Device Used

The majority of respondents accessed the application using smartphones. Fourteen respondents (73.7%) used an Android smartphone and three (15.8%) used an iOS smartphone. One respondent used a tablet, and one did not specify the device. This suggests that the application was mainly used in mobile contexts.

**Table 5. Primary device used to access the application**

| Device | n | % |
|---|---:|---:|
| Smartphone, Android | 14 | 73.7 |
| Smartphone, iOS | 3 | 15.8 |
| Tablet | 1 | 5.3 |
| Not specified | 1 | 5.3 |

### Technical Issues

Fourteen students (73.7%) reported that they did not encounter technical issues or bugs. Five students (26.3%) reported occasional technical issues. One open-ended comment mentioned that the site "glitches slightly while switching from one point to another."

### Qualitative Feedback

Open-ended comments included favorable feedback such as "It's very good" and "It's good." Suggested improvements included adding more labels to tract diagrams, presenting tracts as flowcharts, adding more topics, and improving transitions between points. These comments were used to define immediate development priorities: improved diagram labeling, flowchart summaries, expansion of content, and further technical refinement.

## Discussion

This pilot evaluation suggests that the Spinal Cord Explorer was positively received by student users. All respondents rated the design and interface as 4 or 5 out of 5, and all respondents similarly rated the interactive diagrams as 4 or 5 for explaining tract location and function. These findings support the acceptability of an interactive web-based approach to spinal cord tract learning.

The strong rating for interactive diagrams is educationally important because tract learning is heavily spatial. Students need to understand where each tract lies within the spinal cord and how this location relates to clinical deficits. Static diagrams may be useful, but interactive diagrams and animations can help learners build pathway-level mental models. This aligns with multimedia learning principles, which emphasize coordinated visual and verbal representations for complex material [4]. The application's design attempts to reduce fragmentation by combining visual tract representation, labels, pathway animation, clinical scenarios, and explanatory feedback in a single learning environment.

The quiz results also support the use of active recall in the module. Most students found the quiz features appropriately challenging. The design intentionally requires learners to attempt a question before receiving a hint or explanation. This is consistent with retrieval practice literature, which shows that attempting to retrieve information supports long-term retention more effectively than passive review [5,6]. The inclusion of immediate corrective feedback and "Know More" explanations further supports learning from errors and consolidation of correct concepts.

The favorable ratings for anatomy, physiology, pathology, and diagram-label explanations suggest that students perceived the module as clear and educationally useful across multiple domains. The slightly lower ratings for pathology/clinical correlates compared with anatomy/location descriptions may indicate that clinical localization remains more difficult for learners than structural recognition. This is expected, as clinical correlation requires transfer of anatomical knowledge to patient scenarios. It also identifies an area for further refinement, such as adding more clinical reasoning scaffolds, lesion-level summary tables, and case-based flowcharts.

The high proportion of smartphone users is notable. Seventeen of nineteen respondents used smartphones, either Android or iOS. This supports the value of a browser-based, mobile-accessible design. Mobile digital education can extend learning beyond formal classroom sessions and support self-directed revision at the learner's convenience [12]. For a topic like spinal cord tracts, brief repeated access may be particularly valuable because pathway knowledge requires repeated reinforcement and clinical application.

Gamified elements such as levels, points, badges, progress indicators, and certificates were included to support engagement and completion. Gamification should not replace sound instructional design, but when aligned with progressive learning objectives it may help structure self-directed learning and sustain motivation [8,9]. In the Spinal Cord Explorer, game elements are linked to educational progression rather than isolated reward mechanisms. Learners move from basic tract anatomy to clinical localization, and gamified progress reflects completion of learning levels.

The qualitative comments were useful for iterative design. Students suggested more labels in tract diagrams and flowchart-style summaries. These suggestions are consistent with the instructional challenge: learners want both spatial representation and sequential pathway logic. Future versions should therefore include optional flowchart panels for each tract, such as receptor -> first-order neuron -> crossing level -> ascending/descending tract -> thalamic/brainstem/cortical target -> lesion deficit. Technical feedback about slight glitches during transitions also emphasizes the need for continued usability testing across devices.

### Educational Implications

The Spinal Cord Explorer may be used as a supplementary learning tool in anatomy, neuroscience, or clinical neurology teaching. Possible uses include:

1. pre-class preparation before spinal cord tract teaching;
2. post-lecture reinforcement;
3. self-directed revision before assessments;
4. clinical correlation sessions on neurological localization;
5. small-group case-based teaching;
6. mobile-accessible resource during revision periods.

The application may also support integrated teaching between anatomy and clinical disciplines because it presents tracts not only as anatomical structures but as pathways that explain patient deficits.

### Strengths

The module has several strengths. It addresses a known difficult topic in neuroanatomy, integrates anatomy with clinical reasoning, uses interactive diagrams and animations, includes active recall and feedback, and is accessible on common student devices. The pilot feedback provides early evidence of learner acceptability and perceived usefulness. The module is also scalable, as additional neuroanatomy pathways and clinical scenarios can be added within the same framework.

### Limitations

This study has limitations. The pilot sample was small and involved 19 respondents. The evaluation measured perceptions rather than objective learning gains. No pre-test/post-test assessment was conducted in this phase. The survey instrument was developed for local feedback and was not a standardized usability instrument such as the System Usability Scale [13]. Device performance and technical issues were self-reported rather than objectively logged. The sample may also be subject to response bias, as students who used the application and completed the feedback form may have had more favorable views.

### Future Work

Future evaluation should include larger student cohorts, pre-test/post-test knowledge assessment, delayed retention testing, and comparison with conventional resources. A standardized usability scale may be added. Content validation by anatomy and clinical neuroscience experts should also be documented using a structured content validity index. Future development should include more tract labels, flowchart-style summaries, expanded modules, improved transition smoothness, and analytics for completion time, attempts, and hint usage.

## Conclusion

The Spinal Cord Explorer is a clinically integrated, interactive web application designed to support learning of spinal cord tracts. In this pilot evaluation, students reported high satisfaction with the interface, strong perceived effectiveness of interactive diagrams, appropriate quiz challenge, and favorable clarity of explanations. The predominance of smartphone use supports the feasibility of mobile-accessible neuroanatomy learning. Although further controlled evaluation is needed to demonstrate learning effectiveness, the pilot findings support the module as a promising educational innovation for spinal cord tract teaching.

## Declarations

### Ethics Approval and Consent to Participate

This section should be completed according to institutional requirements before submission. Suggested wording if exemption is granted:

"The study was reviewed by the [Name of Institutional Ethics Committee] and was granted exemption/approval [reference number]. Participation in the feedback survey was voluntary, and responses were analyzed anonymously."

If no ethics review has yet been obtained, journal submission should be delayed until institutional guidance is obtained.

### Consent for Publication

Not applicable; no identifiable participant information is included.

### Availability of Data

The anonymized summary data used for this manuscript are available from the corresponding author on reasonable request, subject to institutional policy.

### Competing Interests

The authors declare no competing interests. [Modify if applicable.]

### Funding

No external funding was received. [Modify if applicable.]

### Authors' Contributions

[Author initials] conceptualized the module. [Author initials] developed the application. [Author initials] designed the educational content. [Author initials] collected and analyzed feedback data. All authors contributed to manuscript preparation and approved the final version.

### Acknowledgements

The authors thank the student participants who used the application and provided feedback.

## References

1. Javaid MA, Chakraborty S, Cryan JF, Schellekens H, Toulouse A. Understanding neurophobia: reasons behind impaired understanding and learning of neuroanatomy in cross-sectional study. Anat Sci Educ. 2018;11(1):81-93.

2. Cook DA, Levinson AJ, Garside S, Dupras DM, Erwin PJ, Montori VM. Internet-based learning in the health professions: a meta-analysis. JAMA. 2008;300(10):1181-1196.

3. Ruiz JG, Mintzer MJ, Leipzig RM. The impact of e-learning in medical education. Acad Med. 2006;81(3):207-212.

4. Mayer RE. Multimedia Learning. 2nd ed. Cambridge: Cambridge University Press; 2009.

5. Roediger HL 3rd, Karpicke JD. Test-enhanced learning: taking memory tests improves long-term retention. Psychol Sci. 2006;17(3):249-255.

6. Roediger HL 3rd, Butler AC. The critical role of retrieval practice in long-term retention. Trends Cogn Sci. 2011;15(1):20-27.

7. Larsen DP, Butler AC, Roediger HL 3rd. Repeated testing improves long-term retention relative to repeated study: a randomised controlled trial. Med Educ. 2009;43(12):1174-1181.

8. Deterding S, Dixon D, Khaled R, Nacke L. From game design elements to gamefulness: defining "gamification". In: Proceedings of the 15th International Academic MindTrek Conference: Envisioning Future Media Environments. New York: Association for Computing Machinery; 2011. p. 9-15.

9. Sailer M, Homner L. The gamification of learning: a meta-analysis. Educ Psychol Rev. 2020;32:77-112.

10. Moro C, Phelps C, Stromberga Z. Utilizing serious games for physiology and anatomy learning and revision. Adv Physiol Educ. 2020;44(3):505-517.

11. Branch RM. Instructional Design: The ADDIE Approach. New York: Springer; 2009.

12. Dunleavy G, Nikolaou CK, Nifakos S, Atun R, Law GCY, Tudor Car L. Mobile digital education for health professions: systematic review and meta-analysis by the Digital Health Education Collaboration. J Med Internet Res. 2019;21(2):e12937.

13. Brooke J. SUS: a "quick and dirty" usability scale. In: Jordan PW, Thomas B, Weerdmeester BA, McClelland IL, editors. Usability Evaluation in Industry. London: Taylor & Francis; 1996. p. 189-194.

