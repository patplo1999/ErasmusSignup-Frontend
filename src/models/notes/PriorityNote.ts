import NoteBase from "./NoteBase";

interface PriorityNote extends NoteBase {
  specialityId: number;
  priority: number;
}

export default PriorityNote;
