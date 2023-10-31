import { create } from 'zustand'

const useStore = create((set) => ({
  isLogin: false,
  setLogin: () => set(() => ({ isLogin: true })),
  setLogout: () => set(() => ({ isLogin: false })),
}))

export default useStore