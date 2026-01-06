import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6 grid gap-6 md:grid-cols-3">
      <FeedbackForm />
      <ImageSlideshow />
      <TodoApp />
    </div>
  )
}

/* ---------------- Feedback Form App ---------------- */

function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", feedback: "" })
  const [submitted, setSubmitted] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(form)
    setForm({ name: "", email: "", feedback: "" })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <Textarea
            placeholder="Your Feedback"
            value={form.feedback}
            onChange={(e) => setForm({ ...form, feedback: e.target.value })}
            required
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>

        {submitted && (
          <div className="mt-4 text-sm">
            <p><b>Name:</b> {submitted.name}</p>
            <p><b>Email:</b> {submitted.email}</p>
            <p><b>Feedback:</b> {submitted.feedback}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

/* ---------------- Image Slideshow App ---------------- */

function ImageSlideshow() {
  const images = [
    "https://via.placeholder.com/300x200?text=Image+1",
    "https://via.placeholder.com/300x200?text=Image+2",
    "https://via.placeholder.com/300x200?text=Image+3",
  ]

  const [index, setIndex] = useState(0)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Slideshow</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <img
          src={images[index]}
          alt="Slideshow"
          className="rounded-md w-full"
        />

        <div className="flex justify-between">
          <Button
            onClick={() =>
              setIndex((index - 1 + images.length) % images.length)
            }
          >
            Previous
          </Button>
          <Button
            onClick={() => setIndex((index + 1) % images.length)}
          >
            Next
          </Button>
        </div>

        <Tabs value={String(index)} className="w-full">
          <TabsList className="grid grid-cols-3">
            {images.map((_, i) => (
              <TabsTrigger
                key={i}
                value={String(i)}
                onClick={() => setIndex(i)}
              >
                {i + 1}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}

/* ---------------- Todo List App ---------------- */

function TodoApp() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const addTodo = () => {
    if (!todo.trim()) return
    setTodos([...todos, { text: todo, completed: false }])
    setTodo("")
  }

  const toggleTodo = (index) => {
    const updated = [...todos]
    updated[index].completed = !updated[index].completed
    setTodos(updated)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Todo List</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex gap-2">
          <Input
            placeholder="Add a todo"
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
          <Button onClick={addTodo}>Add</Button>
        </div>

        <ul className="space-y-2">
          {todos.map((t, i) => (
            <li key={i} className="flex items-center gap-2">
              <Checkbox
                checked={t.completed}
                onCheckedChange={() => toggleTodo(i)}
              />
              <span
                className={
                  t.completed ? "line-through text-gray-500" : ""
                }
              >
                {t.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
