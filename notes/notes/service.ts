// Business logic for managing notes
import {db} from "./encore.service"
import { randomInt } from "node:crypto";

export interface Note{
     id: number;
     title: string;
     content: string;
}

// Create
export async function createNote(title: string, content: string): Promise<Note> {
     if (!title.trim()) {
       throw new Error("Note title cannot be empty!");
     }
   
     const note = await db.queryRow<Note>`
       INSERT INTO notes (title, content)
       VALUES (${title}, ${content})
       RETURNING id, title, content
     `;
   
     if (!note) {
       throw new Error("Failed to create db note!");
     }
   
     return note;
   }
   

// Read all
// export async function getNotes(): Promise<Note[]> {
//      const notes = await db.query<Note>`
//        SELECT id, title, content
//        FROM notes
//        ORDER BY id DESC
//      `;

//      console.log("Notes received:", notes);
//      console.log("Type of notes:", typeof notes);
//      console.log("Is array?", Array.isArray(notes));
     
//      return Array.isArray(notes) ? notes : [];
// }
export async function getNotes(): Promise<Note[]> {
     const result: Note[] = [];
   
     for await (const note of db.query<Note>`
       SELECT id, title, content
       FROM notes
       ORDER BY id DESC
     `) {
       result.push(note);
     }
   
     return result;
   }
   
// Read by id
export async function getNoteById(id: number): Promise<Note>{
     const note = await db.queryRow<Note>`
          select * from notes where id = ${id}`
     if(!note){
          throw new Error("Note not found")
     }

     return note
}

// update
export async function updateNote(id: number, title: string, content: string): Promise<Note>{
     const note = await db.queryRow<Note>`
          update notes set title = ${title}, content = ${content}
          where id = ${id}
          returning id, title, content`
     if(!note){
          throw new Error("Note not found")
     }

     // update
     return note;
}

// delete
export async function deleteNote(id: number): Promise<void>{
     const res = await db.exec`
          delete from notes where id= ${id}`
}