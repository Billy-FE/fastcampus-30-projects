import axios from "axios";
import create from "zustand";

export const useGithubUserStore = create((set) => ({
  user: {},
  loading: false,
  getUser: async (username) => {
    set({ loading: true });
    const res = await axios.get(`https://api.github.com/users/${username}`, {
      Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
    });
    set({
      loading: false,
      user: res.data,
    });
  },
}));
