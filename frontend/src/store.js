import { create } from 'zustand'

const useStore = create((set) => ({
  isLogin: false,
  isStart: true,
  isStop: false,
  isPause: false,
  files: [],
  currentPage: '/',
  isProgress: false,
  setProgress: () => set(() => ({ isProgress: true })),
  setComplate: () => set(() => ({ isProgress: false })),
  setLogin: () => set(() => ({ isLogin: true })),
  setStart: () => set(() => ({ isStart: false, isPause: true, isStop: true })),
  setStop: () => set(() => ({ isStop: false, isPause: false, isStart: true })),
  setPause: () => set(() => ({ isPause: false, isStop: true, isStart: true })),
  setLogout: () => set(() => ({ isLogin: false })),
  setFiles: (files_array) => set(() => ({files: files_array})),
  setCurrent: (path) => set(() => ({currentPage: path})),
  clearCurrent: () => set(() => ({currentPage: '/'})),
}))

export default useStore