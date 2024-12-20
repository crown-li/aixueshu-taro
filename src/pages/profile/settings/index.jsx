import { useState, useEffect } from 'react';
import { View, Text, Switch, RadioGroup,Radio,Input} from '@tarojs/components';
import { Container } from '@/components/layout/Container';
import { Header } from '@/components/layout/Header';
import { Button } from '@/components/ui/Button';
import Taro from '@tarojs/taro';
import { AtIcon } from 'taro-ui'
import { cn } from '@/lib/utils';
import './index.scss'
import { getUserSettings, updateUserPushSettings } from '@/api/index';


// import "taro-ui/dist/style/components/switch.scss";

export default function Settings() {
  const [notificationSettings, setNotificationSettings] = useState([
    {
      id: 'push',
      title: '推送通知',
      description: '接收最新研究进展推送',
      enabled: true,
    },
    // {
    //   id: 'email',
    //   title: '邮件订阅',
    //   description: '接收每周研究动态汇总',
    //   enabled: false,
    // },
  ]);

  const [selectedFrequency, setSelectedFrequency] = useState('daily');
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [subscriptions, setSubscriptions] = useState([
    { email: 'example@email.com', verified: true },
  ]);

//   const frequencies = [
//     {
//       id: 'realtime',
//       label: '实时推送',
//       description: '有新内容时立即推送',
//       value: 'realtime',
//     },
//     {
//       id: 'daily',
//       label: '每日推送',
//       description: '每天推送一次研究动态',
//       value: 'daily',
//     },
//     {
//       id: 'weekly',
//       label: '每周推送',
//       description: '每周推送一次研究汇总',
//       value: 'weekly',
//     },
  //   ];
  
  const fetchSettings = async () => {
    const res = await getUserSettings();
    const [first,...other] = notificationSettings
      
    setNotificationSettings([
      {
        ...first,
        enabled: res.pushEnabled || false,
      },
      ...other
    ]);
  };
  
  useEffect(() => {
    fetchSettings();
  }, []);

  const toggleNotification = async (id,enabled) => {
    await updateUserPushSettings({ id, enabled });
    // 更新本地状态
    setNotificationSettings(prev =>
      prev.map(setting =>
        setting.id === id ? { ...setting, enabled } : setting
      )
    );

    // if (id === 'email') {
    //   setShowEmailInput(prev => !prev);
    // }
  };

  // const handleAddEmail = () => {
  //   if (!emailInput.trim() || !emailInput.includes('@')) {
  //     Taro.showToast({
  //       title: '请输入有效的邮箱地址',
  //       icon: 'error',
  //     });
  //     return;
  //   }

  //   if (subscriptions.some(sub => sub.email === emailInput)) {
  //     Taro.showToast({
  //       title: '该邮箱已添加',
  //       icon: 'error',
  //     });
  //     return;
  //   }

  //   setSubscriptions(prev => [...prev, { email: emailInput, verified: false }]);
  //   setEmailInput('');
  //   Taro.showToast({
  //     title: '验证邮件已发送，请查收',
  //     icon: 'success',
  //   });
  // };

  // const handleRemoveEmail = (email) => {
  //   setSubscriptions(prev => prev.filter(sub => sub.email !== email));
  // };

  // const handleResendVerification = (email) => {
  //   Taro.showToast({
  //     title: '验证邮件已重新发送',
  //     icon: 'success',
  //   });
  // };

  const toProfile = () => {
      Taro.switchTab({
      url:'/pages/profile/index'
    })
  }

  return (
    <View className="bg-gray-50 min-h-screen">
      <Header title="推送设置" />
      <Container className="mt-8 pt-[calc(3.5rem+env(safe-area-inset-top))] pb-[calc(4rem+env(safe-area-inset-bottom))]">
        <View className="space-y-8">
          <View>
            <View className="text-lg font-medium mb-4">通知方式</View>
            <View className="space-y-3">
              {notificationSettings.map(setting => (
                <View
                  key={setting.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg"
                >
                  <View className="flex items-center gap-3">
                    <AtIcon 
                      value={setting.id === 'push' ? 'bell' : 'mail'} 
                      size="20" 
                      color="#2563eb"
                    />
                    <View>
                      <Text className="font-medium">{setting.title}</Text>
                      <Text className="text-sm text-gray-500 ml-1">
                        {setting.description}
                      </Text>
                    </View>
                  </View>
                  <View className="relative inline-flex items-center cursor-pointer">
                    <Switch  color="#2563eb" checked={!setting.enabled} onChange={() => toggleNotification(setting.id)} />
                  </View>
                </View>
              ))}
            </View>

            {/* {notificationSettings.find(s => s.id === 'email')?.enabled && (
              <View className="mt-4 space-y-4">
                <View className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="请输入邮箱地址"
                    value={emailInput}
                    onInput={(e) => setEmailInput(e.detail.value)}
                    className="input-inside px-3 flex-1 h-10 rounded-md border-solid border-gray-300"
                    style={{borderWidth:'1px'}}
                  />
                  <Button onClick={handleAddEmail}>
                    添加
                  </Button>
                </View>

                <View className="space-y-2">
                  {subscriptions.map(subscription => (
                    <View
                      key={subscription.email}
                      className={cn(
                        "flex items-center justify-between p-3 rounded-lg border",
                        subscription.verified
                          ? "border-green-200 bg-green-50"
                          : "border-yellow-200 bg-yellow-50"
                      )}
                    >
                      <View className="flex-1">
                        <View className="flex items-center gap-2">
                          <Text className="text-sm font-medium">
                            {subscription.email}
                          </Text>
                          <Text className={cn(
                            "text-xs px-2 py-0.5 rounded-full",
                            subscription.verified
                              ? "text-green-600 bg-green-100"
                              : "text-yellow-600 bg-yellow-100"
                          )}>
                            {subscription.verified ? '已验证' : '待验证'}
                          </Text>
                        </View>
                        {!subscription.verified && (
                          <View
                            onClick={() => handleResendVerification(subscription.email)}
                            className="text-xs text-blue-600 mt-1"
                          >
                            重新发送验证邮件
                          </View>
                        )}
                      </View>
                      <View
                        onClick={() => handleRemoveEmail(subscription.email)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                      >
                        <AtIcon value="close" size="16" />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            )} */}
          </View>

          {/* <View>
            <View className="text-lg font-medium mb-4">推送频率</View>
            <View className="space-y-3">
            <RadioGroup>
              {frequencies.map(frequency => (
                <View
                  key={frequency.id}
                  className="flex items-center p-4 bg-white rounded-lg cursor-pointer"
                  onClick={() => setSelectedFrequency(frequency.value)}
                >
                 
                  <Radio className="color-" value={frequency.value}
                    checked={selectedFrequency === frequency.value} color="#2563eb"></Radio>
                  <View className="ml-3">
                    <View className="font-medium">{frequency.label}</View>
                    <View className="text-sm text-gray-500">
                      {frequency.description}
                    </View>
                  </View>
                </View>
              ))}
              </RadioGroup>
            </View>
          </View> */}

          <Button className="w-full" size="lg" onClick={toProfile}>
            保存设置
          </Button>
        </View>
      </Container>
    </View>
  );
}