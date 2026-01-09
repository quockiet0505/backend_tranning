// API layer
import {api} from "encore.dev/api";
import * as service from "./service"
import {checkDataBaseConnection} from "./db-check"

// create note
interface NoteRequest{
     title: string;
     content: string;
}

interface NoteResponse{
     id: number;
     title: string;
     content: string;
}

interface GetNoteResponse{
     notes: NoteResponse[];
}

// create note api
export const createNote = api(
     {expose: true, method: "POST", path:"/notes/create"},
     async(req: NoteRequest): Promise<NoteResponse> =>{
          const {title, content} = req;

          if(!req.title.trim()){
               throw new Error("Note title cannot be empty!");
          };

          if(!req.content.trim()){
               throw new Error("Note content cannot be empty!");
          }

          return service.createNote(title, content);

     }
)

// get all notes api
export const getNotes = api(
     {expose: true, method: "GET", path: "/notes/getAll" },
     async(_req):Promise<GetNoteResponse> =>{
          const notes = await service.getNotes();
          return {notes};
     }
)

// get note by id 
export const getNoteById = api(
     {expose: true, method: "GET", path:"/notes/getById"},
     async(req: {id: number}): Promise<NoteResponse> =>{
          const {id} = req;
          return service.getNoteById(id)
     }
)

// update note api
export const updateNote = api(
     {expose: true, method: "PUT", path:"/notes/update"},
     async(req: NoteRequest & {id: number}): Promise<NoteResponse> =>{
          const {id, title, content} = req;
          return service.updateNote(id, title, content)
     }
)

// delete note api
export const deleteNote = api(
     {expose: true, method: "DELETE", path:'/notes/delete'},
     async(req: {id:number}): Promise<{message: string}> =>{
          const {id} = req;
          await service.deleteNote(id);
          return {message: "Note deleted successfully!"}
     }
)

// Check db connection
export const checkDBConnection = api(
     {expose: true, method: "GET", path:"/notes/checkBD"},
     async() =>{
          const result = await checkDataBaseConnection();
          return {status: result}
     }
)