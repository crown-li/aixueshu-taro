import Taro from '@tarojs/taro'
import { useUserStore } from './store/user'
import './app.scss'



function App({ children }) {
  const isFirstVisit = useUserStore((state) => state.isFirstVisit)

  Taro.useLaunch(() => {
    console.log('App launched.')
    if (isFirstVisit) {
      Taro.redirectTo({
        url: '/pages/onboarding/welcome/index'
      })
    }
  })

  return children
}

export default App
