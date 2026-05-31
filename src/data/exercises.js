export const exercises = [
  // MUSCULATION — PECTORAUX
  { id: 1, n: 'Développé couché barre', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps', 'Deltoïde antérieur'] },
  { id: 2, n: 'Développé couché haltères', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps', 'Deltoïde antérieur'] },
  { id: 3, n: 'Développé incliné barre', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Deltoïde antérieur'] },
  { id: 4, n: 'Développé incliné haltères', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Deltoïde antérieur'] },
  { id: 5, n: 'Écarté couché haltères', cat: 'Musculation', group: 'Pectoraux', torque: 'TI', action: 'Push', nature: 'Load', muscles: ['Grand pectoral'] },
  { id: 6, n: 'Pompes', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps'] },
  { id: 7, n: 'Dips', cat: 'Musculation', group: 'Pectoraux', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps'] },

  // MUSCULATION — DOS
  { id: 8, n: 'Traction pronation', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps', 'Rhomboïdes'] },
  { id: 9, n: 'Traction supination', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps'] },
  { id: 10, n: 'Rowing barre pronation', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Rhomboïdes', 'Trapèze'] },
  { id: 11, n: 'Rowing haltère unilatéral', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Rhomboïdes'] },
  { id: 12, n: 'Tirage vertical poulie', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps'] },
  { id: 13, n: 'Tirage horizontal poulie', cat: 'Musculation', group: 'Dos', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Rhomboïdes'] },

  // MUSCULATION — ÉPAULES
  { id: 14, n: 'Développé militaire barre', cat: 'Musculation', group: 'Épaules', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde', 'Triceps'] },
  { id: 15, n: 'Développé militaire haltères', cat: 'Musculation', group: 'Épaules', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde', 'Triceps'] },
  { id: 16, n: 'Élévations latérales haltères', cat: 'Musculation', group: 'Épaules', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde latéral'] },
  { id: 17, n: 'Oiseau haltères', cat: 'Musculation', group: 'Épaules', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Deltoïde postérieur', 'Rhomboïdes'] },

  // MUSCULATION — JAMBES
  { id: 18, n: 'Squat barre haute', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers', 'Ischio-jambiers'] },
  { id: 19, n: 'Squat barre basse', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 20, n: 'Goblet squat', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 21, n: 'Box squat', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 22, n: 'Front squat', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 23, n: 'Deadlift conventionnel', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Ischio-jambiers', 'Fessiers', 'Lombaires'] },
  { id: 24, n: 'Sumo deadlift', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Ischio-jambiers', 'Fessiers', 'Adducteurs'] },
  { id: 25, n: 'Romanian deadlift barre', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Ischio-jambiers', 'Fessiers', 'Lombaires'] },
  { id: 26, n: 'Romanian deadlift haltères', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Ischio-jambiers', 'Fessiers'] },
  { id: 27, n: 'Fentes marchées', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 28, n: 'Fentes avant haltères', cat: 'Musculation', group: 'Jambes', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },
  { id: 29, n: 'Hip thrust barre', cat: 'Musculation', group: 'Jambes', torque: 'TE', action: 'Hinge', nature: 'Load', muscles: ['Fessiers', 'Ischio-jambiers'] },
  { id: 30, n: 'Leg press', cat: 'Musculation', group: 'Jambes', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Quadriceps', 'Fessiers'] },

  // HALTÉROPHILIE
  { id: 31, n: 'Arraché (Snatch)', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'Mix', action: 'Hinge', nature: 'Load', muscles: ['Trapèze', 'Fessiers', 'Quadriceps', 'Deltoïde'] },
  { id: 32, n: 'Power snatch', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'Mix', action: 'Hinge', nature: 'Load', muscles: ['Trapèze', 'Fessiers', 'Quadriceps'] },
  { id: 33, n: 'Épaulé-jeté (Clean & Jerk)', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'Mix', action: 'Hinge', nature: 'Load', muscles: ['Trapèze', 'Fessiers', 'Quadriceps', 'Triceps'] },
  { id: 34, n: 'Power clean', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'Mix', action: 'Hinge', nature: 'Load', muscles: ['Trapèze', 'Fessiers', 'Quadriceps'] },
  { id: 35, n: 'Push press', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde', 'Triceps', 'Quadriceps'] },
  { id: 36, n: 'Push jerk', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde', 'Triceps'] },
  { id: 37, n: 'Overhead squat', cat: 'Haltérophilie', group: 'Mouvements olympiques', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers', 'Deltoïde'] },

  // STRONGFIT
  { id: 38, n: 'Sandbag bear hug carry', cat: 'StrongFit', group: 'Carry', torque: 'TI', action: 'Carry', nature: 'Carry', muscles: ['Obliques', 'Transverse', 'Grand fessier'] },
  { id: 39, n: 'Sandbag lunge', cat: 'StrongFit', group: 'Carry', torque: 'TI', action: 'Carry', nature: 'Carry', muscles: ['Quadriceps', 'Fessiers', 'Obliques'] },
  { id: 40, n: 'Farmers carry', cat: 'StrongFit', group: 'Carry', torque: 'TI', action: 'Carry', nature: 'Carry', muscles: ['Trapèze', 'Avant-bras', 'Obliques'] },
  { id: 41, n: 'Zercher carry', cat: 'StrongFit', group: 'Carry', torque: 'TI', action: 'Carry', nature: 'Carry', muscles: ['Biceps', 'Obliques', 'Grand fessier'] },
  { id: 42, n: 'Sled push', cat: 'StrongFit', group: 'Sled', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Quadriceps', 'Fessiers', 'Grand pectoral'] },
  { id: 43, n: 'Sled pull', cat: 'StrongFit', group: 'Sled', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Ischio-jambiers', 'Grand dorsal'] },
  { id: 44, n: 'Zercher squat', cat: 'StrongFit', group: 'Squat', torque: 'TI', action: 'Hinge', nature: 'Load', muscles: ['Quadriceps', 'Fessiers', 'Biceps'] },
  { id: 45, n: 'Wall ball', cat: 'StrongFit', group: 'Conditioning', torque: 'Mix', action: 'Push', nature: 'Load', muscles: ['Quadriceps', 'Deltoïde', 'Grand pectoral'] },
  { id: 46, n: 'Burpees', cat: 'StrongFit', group: 'Conditioning', torque: 'Mix', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Quadriceps', 'Deltoïde'] },

  // CALISTHENICS
  { id: 47, n: 'Tractions', cat: 'Calisthenics', group: 'Pull', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps', 'Rhomboïdes'] },
  { id: 48, n: 'Tractions lestées', cat: 'Calisthenics', group: 'Pull', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps'] },
  { id: 49, n: 'Ring rows', cat: 'Calisthenics', group: 'Pull', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Rhomboïdes', 'Biceps'] },
  { id: 50, n: 'Chest to bar', cat: 'Calisthenics', group: 'Pull', torque: 'TI', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Biceps'] },
  { id: 51, n: 'Bar muscle up', cat: 'Calisthenics', group: 'Pull', torque: 'Mix', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Triceps', 'Grand pectoral'] },
  { id: 52, n: 'Ring muscle up', cat: 'Calisthenics', group: 'Pull', torque: 'Mix', action: 'Pull', nature: 'Load', muscles: ['Grand dorsal', 'Triceps', 'Grand pectoral'] },
  { id: 53, n: 'Dips aux anneaux', cat: 'Calisthenics', group: 'Push', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps'] },
  { id: 54, n: 'Pompes aux anneaux', cat: 'Calisthenics', group: 'Push', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Grand pectoral', 'Triceps'] },
  { id: 55, n: 'Handstand push up', cat: 'Calisthenics', group: 'Push', torque: 'TE', action: 'Push', nature: 'Load', muscles: ['Deltoïde', 'Triceps'] },
  { id: 56, n: 'L-sit', cat: 'Calisthenics', group: 'Core', torque: 'TI', action: 'Hold', nature: 'Hold', muscles: ['Psoas', 'Abdominaux', 'Quadriceps'] },

  // CARDIO
  { id: 57, n: 'Course à pied', cat: 'Cardio', group: 'Course', torque: null, action: null, nature: null, muscles: ['Quadriceps', 'Ischio-jambiers', 'Mollets'] },
  { id: 58, n: 'Sprint', cat: 'Cardio', group: 'Course', torque: null, action: null, nature: null, muscles: ['Quadriceps', 'Fessiers', 'Mollets'] },
  { id: 59, n: 'Rameur', cat: 'Cardio', group: 'Ergomètre', torque: null, action: null, nature: null, muscles: ['Grand dorsal', 'Quadriceps', 'Ischio-jambiers'] },
  { id: 60, n: 'Ski erg', cat: 'Cardio', group: 'Ergomètre', torque: null, action: null, nature: null, muscles: ['Grand dorsal', 'Abdominaux', 'Triceps'] },
  { id: 61, n: 'Echo bike', cat: 'Cardio', group: 'Ergomètre', torque: null, action: null, nature: null, muscles: ['Quadriceps', 'Grand pectoral', 'Triceps'] },
  { id: 62, n: 'Vélo', cat: 'Cardio', group: 'Ergomètre', torque: null, action: null, nature: null, muscles: ['Quadriceps', 'Ischio-jambiers', 'Fessiers'] },
  { id: 63, n: 'Natation', cat: 'Cardio', group: 'Natation', torque: null, action: null, nature: null, muscles: ['Grand dorsal', 'Grand pectoral', 'Deltoïde'] },
  { id: 64, n: 'Corde à sauter', cat: 'Cardio', group: 'Conditioning', torque: null, action: null, nature: null, muscles: ['Mollets', 'Épaules'] },
  { id: 65, n: 'Double under', cat: 'Cardio', group: 'Conditioning', torque: null, action: null, nature: null, muscles: ['Mollets', 'Poignets'] },
]