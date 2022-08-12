import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { CompositeNavigationProp, RouteProp } from '@react-navigation/native';

export type HomeStackNavigatorParamList = {
    Home: undefined;
    Details: {
        name: string,
        birthYear: string
    }
}

// kiểm tra kiểu màn hình NativeStackNavigationProp
export type HomeScreenNavigationProp = CompositeNavigationProp<
    NativeStackNavigationProp<HomeStackNavigatorParamList, 'Details'>,
    NativeStackNavigationProp<BottomTabNavigatorParamList, 'Feed'>
>;

export type BottomTabNavigatorParamList = {
    HomeStack: HomeStackNavigatorParamList;
    Feed: undefined,
    Settings: undefined,
    Quiz: undefined,
}

// RouteProp kiểm tra loại cho màn hình nhận thông số tuyến 
// (ví dụ: trong màn hình Chi tiết ứng dụng ví dụ nhận hai thông số tuyến)
export type DetailsScreenRouteProp = RouteProp<
    HomeStackNavigatorParamList,
    'Details'
>;