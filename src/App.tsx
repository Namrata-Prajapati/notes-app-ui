import React, { useState } from "react";
import "./App.css";

type Note = {
  id: number;
  title: string;
  content: string;
  color?: string;
  isSelected?: boolean;
};

const App = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "Your first note",
      content: "Making your first note!!",
      color: "note-yellow",
      isSelected: false,
    },
  ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isSelection, setIsSelection] = useState(false);

  const handleDeleteNote = (id: number) => {
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
  };

  const handleNoteClick = (id: number) => {
    setIsSelection(true);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isSelected: !n.isSelected } : n)),
    );
  };

  const handleSelectedNote = () => {
    const selected = notes.filter((note) => !note.isSelected);
    setNotes(selected);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote: Note = {
      id: notes.length + 1,
      title: title || "New Note",
      content: content || "This is a new note.",
      color:
        notes.length % 3 == 0
          ? "note-yellow"
          : notes.length % 3 == 1
            ? "note-pink"
            : "note-blue",
      isSelected: false,
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setTitle("");
    setContent("");
  };

  const handleUpdateNote = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedNote) return;
    const updateNote: Note = {
      id: selectedNote.id,
      title: title,
      content: content,
      color: selectedNote.color,
      isSelected: false,
    };
    const updateNotesList = notes.map((note) =>
      note.id === selectedNote.id ? updateNote : note,
    );
    setNotes(updateNotesList);
    setTitle("");
    setContent("");
    setSelectedNote(null);
  };

  const handleCancel = () => {
    setSelectedNote(null);
    setTitle("");
    setContent("");
  };

  console.log("new notes", notes);

  return (
    <div className="app-container">
      <h1 className="app-title">My Sticky Notes 📝</h1>

      <form className="note-input-container" onSubmit={handleAddNote}>
        <input
          value={title}
          type="text"
          className="note-input"
          placeholder="Title "
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          value={content}
          className="note-input"
          placeholder="Take a note..."
          onChange={(e) => setContent(e.target.value)}
          required
        ></textarea>

        {selectedNote && (
          <button
            className="btn btn-cancel"
            onClick={handleCancel}
            disabled={!title || !content}
          >
            Cancel
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={selectedNote ? handleUpdateNote : handleAddNote}
          disabled={!title || !content}
        >
          {selectedNote ? "Save" : "+ Add Note"}
        </button>
      </form>
      {isSelection && (
        <button className="btn btn-cancel" onClick={handleSelectedNote}>
          Delete
        </button>
      )}

      <div className="notes-container">
        {notes.map((note) => {
          return (
            <div key={note.id} className={`note-card ${note.color}`}>
              <input
                type="checkbox"
                className="note-checkbox"
                checked={note.isSelected}
                onChange={() => handleNoteClick(note.id)}
              />
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-actions">
                <button
                  className="btn btn-delete"
                  onClick={() => handleDeleteNote(note.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
