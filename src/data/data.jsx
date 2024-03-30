let studentsData = [
  { id: '111', name: 'Peter Parker', nickname: 'Spiderman', gender: 'male', gpa: 2.4 },
  { id: '222', name: 'Clark Joseph Kent', nickname: 'Superman', gender: 'male', gpa: 2 },
  { id: '333', name: 'Diana Prince', nickname: 'Wonder Woman', gender: 'female', gpa: 3.6 },
  { id: '444', name: 'Kara Zor-EI', nickname: 'Supergirl', gender: 'female', gpa: 1.95 },
  { id: '555', name: 'Tony Stark', nickname: 'Ironman', gender: 'male', gpa: 3.7 },
  { id: '666', name: 'Barbara Gordon', nickname: 'Batgirl', gender: 'female', gpa: 1.75 },
  { id: '123', name: 'Scott Edward Harris Lang', nickname: 'Antman', gender: 'male', gpa: 2.4 },
  { id: '456', name: 'Arthur Curry', nickname: 'Aquaman', gender: 'male', gpa: 1.75 },
  { id: '789', name: 'Carol Danvers', nickname: 'Captain Marvel', gender: 'female', gpa: 3.8 }
]

// return all students
export const getStudents = () => {
  return studentsData;
}

export const filterStudents = (searchStudent) => {
  const lowerCaseStr = searchStudent.toLowerCase();
  return studentsData.filter(student => {
    const lowerCaseName = student.name.toLowerCase();
    const lowerCaseNickname = student.nickname.toLowerCase();
    const lowerCaseGender = student.gender.toLowerCase(); 
    const stringGPA = student.gpa.toString();
    const lowerCaseGPA = stringGPA.toLowerCase();
    const lowerCaseID = student.id.toLowerCase();

    // เพิ่มเงื่อนไขค้นหาด้วย ID, เพศ และ GPA
    return (
      lowerCaseName.includes(lowerCaseStr) || 
      lowerCaseNickname.includes(lowerCaseStr) || 
      lowerCaseGender.includes(lowerCaseStr) || 
      lowerCaseGPA.includes(lowerCaseStr) ||
      lowerCaseID.includes(lowerCaseStr) || 
      lowerCaseGender === lowerCaseStr || 
      lowerCaseGPA === lowerCaseStr ||
      lowerCaseID === lowerCaseStr ||
      (lowerCaseStr === "male" && lowerCaseGender === "male") // เพิ่มเงื่อนไขสำหรับค้นหาเพศเป็น "male"
    );
  });
}




// delete student from students by specific id
export const deleteStudent = (id) => {
  const updatedStudents = studentsData.filter(student => student.id !== id);
  const isDeleted = updatedStudents.length < studentsData.length;
  if (isDeleted) {
    studentsData = updatedStudents;
  }
  return isDeleted;
}
