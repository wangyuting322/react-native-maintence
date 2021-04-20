import {StyleSheet} from 'react-native';
export const globalColor = StyleSheet.create({
  themeColor: {
    color: '#3F51B5',
  },
  themeBackgroundColor: {
    backgroundColor: '#3D5AAE',
  },
  themeBorderColor: {
    borderColor: '#3D5AAE',
  },
  normalColor: {
    color: 'black',
  },
  shadowColor: {
    backgroundColor: 'rgba(0,0,0,.1)',
  },
  modalBackgroundColor: {
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  greyColor: {
    color: 'grey',
  },
});

export const globalSize = StyleSheet.create({
  textSize: {
    fontSize: 14,
  },
  titleSize: {
    fontSize: 16,
  },
  largeSize: {
    fontSize: 22,
  },
  iconSize: {
    fontSize: 20,
  },
  largeIconSize: {
    fontSize: 30,
  },
});

export const globalFlexStyle = StyleSheet.create({
  rowFlex: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  columnFlex: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  left: {
    flexBasis: '30%',
    flexGrow: 0,
  },
  right: {
    flexGrow: 1,
    textAlign: 'right',
  },
});

export const globalStyle = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});
