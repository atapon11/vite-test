import "./App.css";
import {
  TextField,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Card,
  Stack,
  IconButton,
  Paper,
  Chip,
} from "@mui/material";
import PropTypes from "prop-types";
import { Male, Female } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { filterStudents, deleteStudent } from "./data/data"; // เพิ่ม students จากไฟล์ data/data
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [searchText, setSearchText] = useState("");
  const [displayedStudents, setDisplayedStudents] = useState([]); // เปลี่ยนชื่อ state เป็น displayedStudents เพื่อไม่ให้ความสับสนกับ students ที่นำเข้ามา

  useEffect(() => {
    const initialStudents = filterStudents(""); // เรียกใช้ filterStudents ที่ได้นำเข้ามา
    setDisplayedStudents(initialStudents); // เซ็ต displayedStudents ให้เป็น initialStudents
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // ต้องเพิ่มบรรทัดนี้เพื่ออัพเดท searchText ทันทีเมื่อมีการเปลี่ยนแปลง
    const filteredStudents = filterStudents(e.target.value); // แก้จาก filterStudents("") เป็น filterStudents(e.target.value)
    setDisplayedStudents(filteredStudents);
  };

  const handleDelete = (id) => {
    const isDeleted = deleteStudent(id);
    if (isDeleted) {
      // หลังจากลบนักเรียนแล้ว
      const updatedStudents = displayedStudents.filter(
        (student) => student.id !== id
      );
      setDisplayedStudents(updatedStudents);
    } else {
      // จัดการเมื่อไม่พบนักเรียนที่ต้องการลบ
    }
  };

  return (
    <div>
      <Paper className="paperStyle">
        <Card>
          <Search
            searchText={searchText}
            handleSearchChange={handleSearchChange}
          />
          <hr />
          <Students
            students={displayedStudents} // เปลี่ยน students เป็น displayedStudents
            searchText={searchText}
            handleDelete={handleDelete}
          />
          <hr />
          <Summary students={displayedStudents} />
          <hr />
          ผลงานของ :{" "}
          <span
            style={{
              backgroundColor: "#00FF00",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            99999999 - นายเอิท หิวข้าว
          </span>
        </Card>
      </Paper>
    </div>
  );
}

const Search = ({ searchText, handleSearchChange }) => {
  return (
    <div>
      <Stack
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/ps.jpg"
          style={{ width: "200px", height: "200px" }}
          alt="Person"
        />
      </Stack>
      <Stack sx={{ maxWidth: "400px", margin: "auto" }}>
        <TextField
          label="อยากหาอะไรพิมพ์เลยจ้า"
          variant="outlined"
          value={searchText}
          onChange={handleSearchChange}
          style={{ width: "100%" }}
        />
      </Stack>
    </div>
  );
};

Search.propTypes = {
  searchText: PropTypes.string.isRequired,
  handleSearchChange: PropTypes.func.isRequired,
};

const Students = ({ students, searchText, handleDelete }) => {
  const highlightText = (text, search) => {
    const parts = text.split(new RegExp(`(${search})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === search.toLowerCase() ? (
        <span key={index} style={{ backgroundColor: randomColor() }}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // ตรวจสอบว่ามีข้อมูลใน students หรือไม่
  if (!students || students.length === 0) {
    return (
      <Typography variant="body1" align="center">
        ไม่มีข้อมูลจร้า
      </Typography>
    );
  }

  return (
    <div>
      <Table style={{ backgroundColor: "#F1F0E8" }}>
        <TableHead style={{ backgroundColor: "black", color: "white" }}>
          <TableRow>
            <TableCell style={{ color: "white" }}>ID</TableCell>
            <TableCell style={{ color: "white" }}>Gender</TableCell>
            <TableCell style={{ color: "white" }}>Nickname</TableCell>
            <TableCell style={{ color: "white" }}>Name</TableCell>
            <TableCell style={{ color: "white" }}>GPA</TableCell>
            <TableCell style={{ color: "white" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell>
                <Chip
                  color="primary"
                  label={highlightText(student.id.toString(), searchText)}
                />
              </TableCell>
              <TableCell>
                {student.gender === "male" ? (
                  <IconButton color="primary">
                    <Male />
                  </IconButton>
                ) : (
                  <IconButton style={{ color: "#FF8E8F" }}>
                    <Female />
                  </IconButton>
                )}
              </TableCell>
              <TableCell>
                {highlightText(student.nickname, searchText)}
              </TableCell>
              <TableCell>{highlightText(student.name, searchText)}</TableCell>

              <TableCell>
                <span style={{ color: student.gpa >= 2.0 ? "green" : "red" }}>
                  {highlightText(student.gpa.toString(), searchText)}
                </span>
              </TableCell>

              <TableCell>
                <IconButton
                  variant="outlined"
                  color="error"
                  onClick={() => handleDelete(student.id)}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

Students.propTypes = {
  students: PropTypes.array.isRequired,
  searchText: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

const Summary = ({ students }) => {
  // ตรวจสอบว่า students มีค่าหรือไม่ก่อนที่จะใช้งาน
  if (!students || students.length === 0) {
    return null; // ถ้าไม่มีข้อมูลนักเรียน ให้ไม่แสดงข้อมูล Summary
  }

  // นับจำนวนนักเรียน
  const totalCount = students.length;

  // คำนวณค่าเฉลี่ยของ GPA
  const totalGPA = students.reduce(
    (total, student) => total + parseFloat(student.gpa),
    0
  );
  const averageGPA = totalGPA / totalCount;

  return (
    <div>
      <Stack flexDirection="row" justifyContent="center">
        <Typography m={2}>
          Total Students:{" "}
          <span
            style={{
              backgroundColor: "#00FF00",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {totalCount}
          </span>
        </Typography>
        <Typography m={2} fontWeight="bold">
          Average GPA:{" "}
          <span
            style={{
              backgroundColor: averageGPA >= 2.0 ? "#00FF00" : "red",
              padding: "5px",
              borderRadius: "5px",
            }}
          >
            {averageGPA.toFixed(2)}
          </span>
        </Typography>
      </Stack>
    </div>
  );
};

Summary.propTypes = {
  students: PropTypes.array.isRequired,
};

Summary.propTypes = {
  students: PropTypes.array.isRequired,
};

// Generate random color function
function randomColor() {
  const colors = [
    "#FF5733",
    "#FFBD33",
    "#FF5733",
    "#4CDBD3",
    "#33FF57",
    "#3361FF",
    "#8B33FF",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

export default App;
