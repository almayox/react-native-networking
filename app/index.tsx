import { useEffect, useState } from "react";
import { ActivityIndicator, Alert, FlatList, StatusBar, StyleSheet, Text, View } from "react-native";

export default function Index() {
  // ============== API call ==============
  type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const fetchData = async (limit = 10) => {
    try {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}`);
      const data = await response.json();
      setPostList(data);
      setIsLoading(false);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data. Please try again later.");
    }
  }
  useEffect(() => {
    fetchData();
  }, []);
  

  const handleRefresh = () => {
    setRefreshing(true);
    fetchData()
    setRefreshing(false);
  }

  // ============== Loading state ==============
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color="lightblue"
          style={{ marginBottom: 24 }}
        />
        <Text>Loading...</Text>
      </View>
    );
  }
  // ============== Testing empty state ==============
  const emptyList: Post[] = [];


  // ============== Render starts ==============
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <FlatList 
          ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          ListEmptyComponent={<Text style={styles.emptyList}>No posts available</Text>}
          ListHeaderComponent={<Text style={styles.listHeader}>Posts List</Text>}
          ListFooterComponent={<Text style={styles.listFooter}>End of Posts</Text>}
          data={postList.length > 0 ? postList : emptyList}
          refreshing={refreshing}
          onRefresh={handleRefresh}
          renderItem={({ item }) => {
            return (
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardBody}>{item.body}</Text>
              </View>
            )
          }}
        />
      </View>
    </View>
  );
}




// ============== Style Sheet starts ==============
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  cardBody: {
    fontSize: 14,
    color: "#555",
  },
  emptyList: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  listHeader: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    textAlign: "center",
  },
  listFooter: {
    fontSize: 16,
    marginVertical: 16,
    textAlign: "center",
    color: "#888",
  },
  loadingContainer: {
    //flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 24,
    elevation: 2,
    height: 200,
    width: 200,
    alignSelf: "center",
    margin: 16,
  },
});