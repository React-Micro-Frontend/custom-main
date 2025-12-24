import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface UserState {
  users: User[];
  selectedUser: User | null;
  totalCount: number;
  loading: boolean;
}

const initialState: UserState = {
  users: [],
  selectedUser: null,
  totalCount: 0,
  loading: false,
};

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
      state.totalCount = action.payload.length;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      state.totalCount += 1;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
      state.totalCount -= 1;
    },
    selectUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setUsers, addUser, updateUser, deleteUser, selectUser, setLoading } = userSlice.actions;
export default userSlice.reducer;
