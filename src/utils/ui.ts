import Taro from "@tarojs/taro"

export const Toast = (title: string) => Taro.showToast({ title, icon: 'none' })