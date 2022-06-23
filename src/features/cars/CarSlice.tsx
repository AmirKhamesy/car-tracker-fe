import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { RootState } from "../../app/store";
import { fetchCars, createCar, updateCar, destroyCar } from "./carAPI";

export enum Statuses {
    Initial = "Not Fetched",
    Loading = "Loading...",
    UpToDate = "Up To Date",
    Deleted = "Deleted",
    Error = "Error",
}


export interface CarFormData {
    car: {
        id?: number;
        make: string;
        model: string;
        person_id: Number;
        price: Number;
        year: Number;
    }
}

export interface CarDeleteData {
    car: {
        car_id: number;
    }
}

export interface CarState {
    id?: number;
    make?: string;
    model?: string;
    person_id?: Number;
    price?: Number;
    year?: Number;
    created_at?: any;
    updated_at?: any;
}

export interface CarsState {
    cars: CarState[];
    status: string;
}

const initialState: CarsState = {
    cars: [
        {
            id: 0,
            make: "",
            model: "",
            price: 0,
            year: 0,
            person_id: 0,
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial,
};

export const createCarAsync = createAsyncThunk(
    'cars/createCar',
    async (payload: CarFormData) => {
        const response = await createCar(payload);

        return response;
    }
)

export const fetchCarsAsync = createAsyncThunk(
    "cars/fetchCars",
    async () => {
        const response = await fetchCars();
        return response;
    }
);

export const updateCarAsync = createAsyncThunk(
    'cars/updateCar',
    async (payload: CarFormData) => {
        const response = await updateCar(payload);
        return response;
    }
)

export const destroyCarAsync = createAsyncThunk(
    'cars/destroyCar',
    async (payload: CarDeleteData) => {
        const response = await destroyCar(payload);
        return response;
    }
)

export const carSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                });
            })
            .addCase(fetchCarsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.cars = action.payload;
                    draftState.status = Statuses.UpToDate;
                });
            })
            .addCase(fetchCarsAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                });
            })
            .addCase(createCarAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                });
            })
            .addCase(createCarAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.cars.push(action.payload);
                    draftState.status = Statuses.UpToDate;
                });
            })
            .addCase(createCarAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                });
            })
            .addCase(destroyCarAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                });
            })
            .addCase(destroyCarAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.cars = action.payload;
                    draftState.status = Statuses.UpToDate;
                });
            })
            .addCase(destroyCarAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                });
            })
            .addCase(updateCarAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                });
            })
            .addCase(updateCarAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    const index = draftState.cars.findIndex(
                        (car) => car.id === action.payload.id
                    );
                    draftState.cars[index] = action.payload;
                    draftState.status = Statuses.UpToDate;
                });
            })
            .addCase(updateCarAsync.rejected, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Error;
                });
            });
    },
});

export const { } = carSlice.actions;

export const selectCars = (state: RootState) => state.cars.cars;

export const selectStatus = (state: RootState) => state.cars.status;

export default carSlice.reducer;
