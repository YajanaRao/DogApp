import * as React from 'react';
import { View, StyleSheet, FlatList, RefreshControl, Text } from 'react-native';
import { List, Searchbar, Divider, IconButton, Avatar } from 'react-native-paper';
import { useGetBreedsQuery } from './dogApi';

export default function BreedList({ navigation }) {
  const [page, setPage] = React.useState(1);
  const { data: data, refetch, isFetching } = useGetBreedsQuery(page);
  const [items, setItems] = React.useState([]);
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (data?.data) {
      let dogs = []
      if (query === '') {
        dogs = data.data;
      } else {
        dogs = data.data.filter((item) => item.title.includes(query));
      }
      setItems(dogs);

    }
  }, [query, data]);


  // for debounce
  // function searchItems(query) {
  //   const filtered = data.data.filter((item) => item.title.includes(query));
  //   setItems(filtered);
  // }

  const onChangeSearch = (query: string) => {
    setQuery(query);
    // understanding debounce concept here
    // debounce(() => searchItems(query));
  };

  function nextPage() {
    setPage(page + 1)
  }

  function previousPage() {
    setPage(page - 1)
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <IconButton icon="arrow-left" disabled={page === 1} onPress={previousPage}>Previous</IconButton>
        <View style={styles.pageInfo}>
          <Text>{`${data?.pagination?.current_page || 0} / ${data?.pagination?.total || 0}`}</Text>
        </View>
        <IconButton icon="arrow-right" disabled={page === data?.pagination?.total} onPress={nextPage}>Next</IconButton>
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          data={items}
          ListHeaderComponent={(
            <Searchbar onChangeText={text => onChangeSearch(text)} disabled={!items.length} defaultValue={query} clearButtonMode="while-editing" placeholder="Enter the breed name" clearIcon={() => <IconButton icon="close" onPress={() => setQuery("")} />} />
          )}
          ItemSeparatorComponent={() => <Divider />}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item, index }) => (
            <List.Item
              title={item.title}
              description={item?.thumbnail.alt_text}
              onPress={() => navigation.navigate("Details", { breed: item })}
              left={() => <View style={styles.listImage}><Avatar.Image size={40} source={{ uri: item.thumbnail.lqip }} /></View>}
            />
          )}
          refreshControl={
            <RefreshControl
              refreshing={isFetching}
              onRefresh={() => refetch()}
            />
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: 'center' },
  pageInfo: { justifyContent: 'center', alignItems: 'center' },
  listImage: { justifyContent: 'center', alignItems: 'center' },
  paragraph: {
    fontSize: 14,
    textAlign: 'center',
  },
});
