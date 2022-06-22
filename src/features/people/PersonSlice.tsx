import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchPeople , createPerson} from "./personAPI";

export enum Statuses {
  Initial = "Not Fetched",
  Loading = "Loading...",
  UpToDate = "Up To Date",
  Deleted = "Deleted",
  Error = "Error",
}


export interface PersonFormData {
  person: {
      id?: string;
      firstName: string;
      lastName: string;
      email: string;
  }
}

export interface PersonState {
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  created_at?: any;
  updated_at?: any;
}

export interface PeopleState {
  people: PersonState[];
  status: string;
}

const initialState: PeopleState = {
  people: [
    {
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      created_at: "",
      updated_at: "",
    },
  ],
  status: Statuses.Initial,
};

export const createPersonAsync = createAsyncThunk(
  'people/createPerson',
  async (payload: PersonFormData  ) => {
      const response = await createPerson(payload);

      return response;
  }
)

export const fetchPeopleAsync = createAsyncThunk(
  "people/fetchPeople",
  async () => {
    const response = await fetchPeople();
    return response;
  }
);

export const personSlice = createSlice({
  name: "people",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeopleAsync.pending, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Loading;
        });
      })
      .addCase(fetchPeopleAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
          draftState.people = action.payload;
          draftState.status = Statuses.UpToDate;
        });
      })
      .addCase(fetchPeopleAsync.rejected, (state) => {
        return produce(state, (draftState) => {
          draftState.status = Statuses.Error;
        });
      });
    //   .addCase(createPersonAsync.pending, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Loading;
    //     });
    //   })
    //   .addCase(createPersonAsync.fulfilled, (state, action) => {
    //     return produce(state, (draftState) => {
    //       draftState.people.push(action.payload);
    //       draftState.status = Statuses.UpToDate;
    //     });
    //   })
    //   .addCase(createPersonAsync.rejected, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Error;
    //     });
    //   })
    //   .addCase(destroyPersonAsync.pending, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Loading;
    //     });
    //   })
    //   .addCase(destroyPersonAsync.fulfilled, (state, action) => {
    //     return produce(state, (draftState) => {
    //       draftState.people = action.payload;
    //       draftState.status = Statuses.UpToDate;
    //     });
    //   })
    //   .addCase(destroyPersonAsync.rejected, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Error;
    //     });
    //   })
    //   .addCase(updatePersonAsync.pending, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Loading;
    //     });
    //   })
    //   .addCase(updatePersonAsync.fulfilled, (state, action) => {
    //     return produce(state, (draftState) => {
    //       const index = draftState.people.findIndex(
    //         (post) => post.id === action.payload.id
    //       );
    //       draftState.people[index] = action.payload;
    //       draftState.status = Statuses.UpToDate;
    //     });
    //   })
    //   .addCase(updatePersonAsync.rejected, (state) => {
    //     return produce(state, (draftState) => {
    //       draftState.status = Statuses.Error;
    //     });
    //   });
  },
});

export const {} = personSlice.actions;

export const selectPeople = (state: RootState) => state.people.people;

export const selectStatus = (state: RootState) => state.people.status;

export default personSlice.reducer;
