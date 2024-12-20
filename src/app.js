import Taro from '@tarojs/taro'
// import { useUserStore } from './store/user'
// import { getUserSubscriptions } from "./api/index";
import './assets/iconfont/iconfont.css'
import './app.scss'



function App({ children }) {
  // const isFirstVisit = useUserStore((state) => state.isFirstVisit)
  // const setFirstVisit = useUserStore((state) => state.setFirstVisit)

  Taro.useLaunch(async () => {
    console.log('App launched.')
  })

  return children
}

export default App
