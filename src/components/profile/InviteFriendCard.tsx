// ============================================================================
// components/profile/InviteFriendCard.tsx - COMPONENTE PARA INVITAR AMIGAS
// ============================================================================
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { profileStyles } from './styles';
import { useProfileActions } from '../../hooks/useProfileActions';
import { modernColors } from '../../styles';

export const InviteFriendCard: React.FC = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const { handleInviteFriend } = useProfileActions();

  const sendInvitation = async () => {
    if (!email.trim()) {
      Alert.alert('Error', 'Por favor ingresa un email');
      return;
    }

    setSending(true);
    const success = await handleInviteFriend(email.trim(), message.trim());
    
    if (success) {
      setEmail('');
      setMessage('');
    }
    
    setSending(false);
  };

  return (
    <View style={profileStyles.inviteCard}>
      <View style={profileStyles.inviteHeader}>
        <Text style={profileStyles.inviteTitle}>Invita una amiga 👯‍♀️</Text>
        <Text style={profileStyles.inviteSubtitle}>
          Ambas recibirán 50 Beauty Points cuando se registre
        </Text>
      </View>

      <View style={profileStyles.inviteForm}>
        <TextInput
          style={profileStyles.inviteInput}
          placeholder="Email de tu amiga"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor={modernColors.gray400}
        />

        <TextInput
          style={[profileStyles.inviteInput, profileStyles.inviteMessageInput]}
          placeholder="Mensaje personal (opcional)"
          value={message}
          onChangeText={setMessage}
          multiline
          numberOfLines={2}
          maxLength={200}
          placeholderTextColor={modernColors.gray400}
        />

        <TouchableOpacity
          style={[
            profileStyles.inviteButton,
            sending && profileStyles.inviteButtonDisabled
          ]}
          onPress={sendInvitation}
          disabled={sending}
        >
          {sending ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <>
              <Text style={profileStyles.inviteButtonIcon}>📧</Text>
              <Text style={profileStyles.inviteButtonText}>Enviar Invitación</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return modernColors.successModern;
      case 'confirmed': return modernColors.infoModern;
      case 'pending': return modernColors.warningModern;
      case 'cancelled': return modernColors.errorModern;
      default: return modernColors.gray600;
    }
  };

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'Completada';
      case 'confirmed': return 'Confirmada';
      case 'pending': return 'Pendiente';
      case 'cancelled': return 'Cancelada';
      default: return status;
    }
  };

  return (
    <View style={profileStyles.sectionContent}>
      <FlatList
        data={recentAppointments}
        renderItem={renderAppointment}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ItemSeparatorComponent={() => <View style={profileStyles.activitySeparator} />}
      />
      
      {hasMore && (
        <TouchableOpacity
          style={profileStyles.loadMoreButton}
          onPress={loadMore}
        >
          <Text style={profileStyles.loadMoreText}>Ver más actividad</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};