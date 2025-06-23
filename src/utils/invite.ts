


export const generateWhatsAppInviteLink = (guestName: string, roomId: string) => {
  const baseUrl = 'https://afcftapp.firebaseapp.com/chat'; // TEMPORARY Firebase Hosting URL
  const inviteUrl = `${baseUrl}/${roomId}`;
  const message = `👋 Hi ${guestName},\n\nYou've been invited to join an AfCFTApp group chat!\nJoin here: ${inviteUrl}`;

  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/?text=${encodedMessage}`;
};
