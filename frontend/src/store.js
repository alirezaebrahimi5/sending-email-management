import { create } from 'zustand'

const useStore = create((set) => ({
  isLogin: false,
  files: [],
  setLogin: () => set(() => ({ isLogin: true })),
  setLogout: () => set(() => ({ isLogin: false })),
  setFiles: (files_array) => set(() => ({files: files_array}))
}))

export default useStore