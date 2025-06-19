// ============================================================================
// components/profile/ProfileHeader.tsx - HEADER DEL PERFIL
// ============================================================================
import React from 'react';
import { View, Text } from 'react-native';
import { profileStyles } from './styles';
import { UserProfile } from '../../hooks/useProfile';

interface ProfileHeaderProps {
  profile: UserProfile;
  isVIP: boolean;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({ profile, isVIP }) => (
  <View style={profileStyles.header}>
    <View style={profileStyles.headerContent}>
      <View style={profileStyles.avatarContainer}>
        <Text style={profileStyles.avatarText}>
          {profile.firstName[0]?.toUpperCase() || 'U'}
        </Text>
      </View>
      <View style={profileStyles.headerInfo}>
        <Text style={profileStyles.headerName}>
          {profile.firstName} {profile.lastName}
        </Text>
        <Text style={profileStyles.headerEmail}>{profile.email}</Text>
        {isVIP && (
          <View style={profileStyles.vipBadge}>
            <Text style={profileStyles.vipBadgeText}>👑 VIP</Text>
          </View>
        )}
      </View>
    </View>
  </View>
);