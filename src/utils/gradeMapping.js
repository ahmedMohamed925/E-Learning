const gradeMapping = {
  'الصف الأول الثانوي': 'first-secondary',
  'الصف الثاني الثانوي علمي': 'second-secondary-science', 
  'الصف الثاني الثانوي ادبي': 'second-secondary-literature',
  'الصف الثالث الثانوي علمي': 'third-secondary-science',
  'الصف الثالث الثانوي ادبي': 'third-secondary-literature'
};

const reverseGradeMapping = Object.fromEntries(
  Object.entries(gradeMapping).map(([key, value]) => [value, key])
);

export { gradeMapping, reverseGradeMapping };