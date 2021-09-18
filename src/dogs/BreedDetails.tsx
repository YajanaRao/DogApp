import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import { Card, ActivityIndicator, Paragraph } from 'react-native-paper';
export interface BreedDetailsProps { }

function BreedDetails({ navigation, route }: BreedDetailsProps) {
  const { breed } = route.params;

  navigation.setOptions({ title: breed?.title })

  if (!breed) return <View style={styles.container}><ActivityIndicator size="large" /></View>

  return (
    <View style={styles.container}>
      <Card>
        <Card.Cover source={{ uri: breed?.thumbnail.lqip }} />
        <Card.Title title={breed.title} />
        <Card.Content>
          <Paragraph>{breed?.thumbnail.alt_text}</Paragraph>
        </Card.Content>
      </Card>
    </View>
  );
}

export default BreedDetails;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 12 }
})