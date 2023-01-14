import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import PostCommonNote from "api/DTOs/POST/PostCommonNote";
import { getCommonNotes, getPlanNotes, getSpecialityNotes } from "api/noteApi";
import CommonNote from "models/notes/CommonNote";
import HighlightNote from "models/notes/HighlightNote";
import PlanNote from "models/notes/PlanNote";
import PriorityNote from "models/notes/PriorityNote";
import SpecialityNote from "models/notes/SpecialityNote";

interface State {
  loading: boolean;
  notes: {
    common: CommonNote[];
    speciality: SpecialityNote[];
    plan: PlanNote[];
    highlight: HighlightNote[];
    priority: PriorityNote[];
  };
}

const initialState: State = {
  loading: false,
  notes: {
    common: [],
    speciality: [],
    plan: [],
    highlight: [],
    priority: [],
  },
};

export const fetchNotesWithContent = createAsyncThunk<{
  common: CommonNote[];
  speciality: SpecialityNote[];
  plan: PlanNote[];
}>("notes_with_content", async () => {
  const commonNotes = await getCommonNotes();
  const specialityNotes = await getSpecialityNotes();
  const planNotes = await getPlanNotes();

  return { common: commonNotes, speciality: specialityNotes, plan: planNotes };
});

const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    addCommonNoteLocally(state, action: PayloadAction<PostCommonNote>) {
      const newCommonNote: CommonNote = {
        id: Math.max(...state.notes.common.map(n => n.id)) + 1,
        createdAt: new Date(0),
        userId: -1,
        title: action.payload.title,
        content: action.payload.content,
      };
      state.notes.common.push(newCommonNote);
    },
    editCommonNoteLocally(state, action: PayloadAction<{ id: number; body: PostCommonNote }>) {
      state.notes.common = state.notes.common.map(n =>
        n.id === action.payload.id
          ? {
              ...n,
              title: action.payload.body.title,
              content: action.payload.body.content,
            }
          : n
      );
    },
    deleteCommonNoteLocally(state, action: PayloadAction<number>) {
      state.notes.common = state.notes.common.filter(note => note.id !== action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchNotesWithContent.pending, state => {
        state.loading = true;
      })
      .addCase(fetchNotesWithContent.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = {
          ...state.notes,
          common: action.payload.common,
          speciality: action.payload.speciality,
          plan: action.payload.plan,
        };
      })
      .addCase(fetchNotesWithContent.rejected, state => {
        state.loading = false;
      });
  },
});

export const { addCommonNoteLocally, editCommonNoteLocally, deleteCommonNoteLocally } = noteSlice.actions;
export default noteSlice.reducer;
