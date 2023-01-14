import NoteBase from "./NoteBase";

interface HighlightNote extends NoteBase {
  specialityId: number;
  positive: boolean;
}

export default HighlightNote;
