import { create } from 'zustand'

const useStore = create((set) => ({
  isLogin: false,
  isStart: true,
  isStop: false,
  files: [],
  currentPage: '/',
  isProgress: false,
  setProgress: () => set(() => ({ isProgress: true })),
  setComplate: () => set(() => ({ isProgress: false })),
  setLogin: () => set(() => ({ isLogin: true })),
  setStart: () => set(() => ({ isStart: false, isStop: true })),
  setStop: () => set(() => ({ isStop: false, isStart: true })),
  setLogout: () => set(() => ({ isLogin: false })),
  setFiles: (files_array) => set(() => ({files: files_array})),
  setCurrent: (path) => set(() => ({currentPage: path})),
  clearCurrent: () => set(() => ({currentPage: '/'})),
}))

export default useStore