import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CodexScreen from '../screens/CodexScreen';
import StoreScreen from '../screens/StoreScreen';
import MissionsScreen from '../screens/MissionsScreen';
import MapScreen from '../screens/MapScreen';
import SandboxScreen from '../screens/SandboxScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{ 
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#141420',
          borderTopColor: 'rgba(255, 255, 255, 0.1)',
        },
        tabBarActiveTintColor: '#00ff88',
tabBarInactiveTintColor: '#6a6a6a',
}}
>
<Tab.Screen
name="Home"
component={HomeScreen}
options={{ tabBarLabel: 'Início', tabBarIcon: () => '🏠' }}
/>
<Tab.Screen
name="Codex"
component={CodexScreen}
options={{ tabBarLabel: 'Codex', tabBarIcon: () => '📚' }}
/>
<Tab.Screen
name="Missions"
component={MissionsScreen}
options={{ tabBarLabel: 'Missões', tabBarIcon: () => '📋' }}
/>
<Tab.Screen
name="Map"
component={MapScreen}
options={{ tabBarLabel: 'Mapa', tabBarIcon: () => '🗺️' }}
/>
<Tab.Screen
name="Sandbox"
component={SandboxScreen}
options={{ tabBarLabel: 'Código', tabBarIcon: () => '💻' }}
/>
<Tab.Screen
name="Store"
component={StoreScreen}
options={{ tabBarLabel: 'Loja', tabBarIcon: () => '🛒' }}
/>
<Tab.Screen
name="Profile"
component={ProfileScreen}
options={{ tabBarLabel: 'Perfil', tabBarIcon: () => '👤' }}
/>
</Tab.Navigator>
);
}