import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 存储Token
 */
export const setToken = async value => {
  try {
    await AsyncStorage.setItem('Token', value);
  } catch (error) {
    console.log(error);
  }
};
/**
 * 拿取Token
 */
export const getToken = async value => {
  try {
    const value = await AsyncStorage.getItem('Token');
    return value;
  } catch (error) {
    console.log(error);
    return null;
  }
};
/**
 * 去除Token
 */
export const removeToken = async value => {
  try {
    await AsyncStorage.removeItem('Token');
  } catch (error) {
    console.log(error);
  }
};
/**
 * 清空
 */
export const clearAll = async value => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};
