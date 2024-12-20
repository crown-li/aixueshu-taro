export default defineAppConfig({
  pages: [
    // 'pages/index/index',
    'pages/onboarding/welcome/index',
    'pages/home/index',
    'pages/onboarding/fields/index',
    'pages/onboarding/fieldSelection/index',
    // 'pages/onboarding/directions/index',
    // 'pages/onboarding/keywords/index',
    'pages/profile/index',
    'pages/profile/favorites/index',
    'pages/profile/history/index',
    'pages/profile/settings/index',
    'pages/article/index',
    // 'pages/search/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '爱学术订阅',
    navigationBarTextStyle: 'black',
    navigationStyle: 'custom'
  },
  tabBar: {
    color: '#666666',
    selectedColor: '#2563eb',
    backgroundColor: '#ffffff',
    list: [
      {
        pagePath: 'pages/home/index',
        text: "首页",
        iconPath: "./assets/home.png",
        selectedIconPath: "./assets/home-active.png",
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: "./assets/profile.png",
        selectedIconPath: "./assets/profile-active.png",
      },
    ],
  }
})
