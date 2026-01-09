// test
import { describe, expect, test  } from 'vitest';
import {createNote, getNotes, getNoteById, updateNote, deleteNote} from "./notes"

describe("Notes CRUD API", ()=>{
     test("Create Note", async()=>{
           await createNote({title:"Test Note", content:"This is a test note."})
           await createNote({title:"Second Note", content:"This is another test note."})

           const notes = (await getNotes()).notes
           expect(notes.length).toBe(2)
           expect(notes[0].title).toBe("Test Note")

     })
})
