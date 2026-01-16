import express from "express";
import fs from "fs";

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper functions
const readData = () => {
  const data = fs.readFileSync("db.json", "utf-8");
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync("db.json", JSON.stringify(data, null, 2));
};

// ✅ GET all students
app.get("/students", (req, res) => {
  const data = readData();
  res.status(200).json(data.students);
});

// ✅ POST new student
app.post("/students", (req, res) => {
  const { name, course, year } = req.body;

  if (!name || !course || !year) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const data = readData();
  const newStudent = {
    id: Date.now(),
    name,
    course,
    year
  };

  data.students.push(newStudent);
  writeData(data);

  res.status(201).json({
    message: "Student added successfully",
    student: newStudent
  });
});

// ✅ PUT update student
app.put("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();

  const studentIndex = data.students.findIndex(
    (student) => student.id === id
  );

  if (studentIndex === -1) {
    return res.status(404).json({ message: "Student not found" });
  }

  data.students[studentIndex] = {
    ...data.students[studentIndex],
    ...req.body
  };

  writeData(data);

  res.json({
    message: "Student updated successfully",
    student: data.students[studentIndex]
  });
});

// ✅ DELETE student
app.delete("/students/:id", (req, res) => {
  const id = Number(req.params.id);
  const data = readData();

  const filteredStudents = data.students.filter(
    (student) => student.id !== id
  );

  if (filteredStudents.length === data.students.length) {
    return res.status(404).json({ message: "Student not found" });
  }

  data.students = filteredStudents;
  writeData(data);

  res.json({ message: "Student deleted successfully" });
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
