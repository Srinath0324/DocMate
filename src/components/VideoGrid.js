import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import ParticipantView from './ParticipantView';

const VideoGrid = ({ participants, streams, localParticipantId }) => {
  useEffect(() => {
    console.log('VideoGrid rendering with:');
    console.log('- Participants:', Object.keys(participants));
    console.log('- Streams:', Object.keys(streams));
  }, [participants, streams]);

  const calculateLayout = () => {
    const count = Object.keys(participants).length;
    
    if (count <= 1) return { columns: 1, rows: 1 };
    if (count <= 2) return { columns: 2, rows: 1 };
    if (count <= 4) return { columns: 2, rows: 2 };
    if (count <= 6) return { columns: 3, rows: 2 };
    if (count <= 9) return { columns: 3, rows: 3 };
    return { columns: 4, rows: Math.ceil(count / 4) };
  };

  const { columns, rows } = calculateLayout();
  const participantIds = Object.keys(participants);
  
  if (localParticipantId && participantIds.includes(localParticipantId)) {
    const index = participantIds.indexOf(localParticipantId);
    participantIds.splice(index, 1);
    participantIds.unshift(localParticipantId);
  }

  const gridRows = [];
  for (let i = 0; i < rows; i++) {
    const rowItems = [];
    for (let j = 0; j < columns; j++) {
      const index = i * columns + j;
      if (index < participantIds.length) {
        const participantId = participantIds[index];
        const participant = participants[participantId] || {};
        const isLocal = participantId === localParticipantId;
        
        rowItems.push(
          <View key={participantId} style={[styles.gridItem, { flex: 1 / columns }]}>
            <ParticipantView
              stream={streams[participantId]}
              displayName={participant.displayName || `User ${index + 1}`}
              isMuted={participant.isMuted}
              isLocal={isLocal}
            />
          </View>
        );
      } else {
        rowItems.push(
          <View key={`empty-${i}-${j}`} style={[styles.gridItem, { flex: 1 / columns }]} />
        );
      }
    }
    
    gridRows.push(
      <View key={`row-${i}`} style={styles.gridRow}>
        {rowItems}
      </View>
    );
  }

  return <View style={styles.container}>{gridRows}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row',
  },
  gridItem: {
    padding: 2,
  },
});

export default VideoGrid;
