export default {
  pages: [
    "pages/home/index",
    "pages/user/index",

  ],
  subpackages: [
    {
      "root": "package-A",
      "pages": [
        "pages/search/index",
        "pages/login/index"
      ]
    }
  ],
  window: {
    backgroundTextStyle: "dark",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: '#333',
    selectedColor: '#09c',
    backgroundColor: '#fff',
    borderStyle: 'white',
    list: [
      {
        pagePath: 'pages/home/index',
        text: '音乐',
        iconPath: 'assets/icons/music.png',
        selectedIconPath: 'assets/icons/music-s.png'

      },
      {
        pagePath: 'pages/user/index',
        text: '我的',
        iconPath: 'assets/icons/user.png',
        selectedIconPath: 'assets/icons/user-s.png'
      },

    ],
  }
};
