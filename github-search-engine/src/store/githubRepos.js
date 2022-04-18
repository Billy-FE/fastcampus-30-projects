import axios from "axios";
import create from "zustand";

export const useGithubReposStore = create((set) => ({
  repos: [],
  loading: false,
  isEnd: false,
  getRepos: async (username, page) => {
    set({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=30&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      }
    );
    set((state) => ({
      loading: false,
      repos: [...state.repos, ...res.data],
      isEnd: res.data.length === 0,
    }));
  },
  resetRepos: () => {
    set({
      loading: false,
      repos: [],
      isEnd: false,
    });
  },
}));
