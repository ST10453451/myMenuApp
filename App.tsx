import React, { useState } from 'react';
import { Button, FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type MenuItem = {
  name: string;
  price: number;
  description: string;
  image: string;
  course: 'Starter' | 'Main' | 'Dessert';
};


const initialMenuItems: MenuItem[] = [
  { name: 'Sea First', price: 89.99, description: 'Gourmet Rice and Salmon', image: 'https://images.unsplash.com/photo-1577004686904-1a4f118acf61?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTh8fHN0YXJ0ZXJ8ZW58MHx8MHx8fDA%3D', course: 'Starter' },
  { name: 'Garlic Bread', price: 59.99, description: 'Fresh bread with garlic butter', image: 'https://images.unsplash.com/photo-1676976198546-18595f0796f0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z2FybGljJTIwYnJlYWR8ZW58MHx8MHx8fDA%3D', course: 'Starter' },
  { name: 'Bruschetta', price: 59.99, description: 'Grilled bread with tomatoes', image: 'https://images.unsplash.com/photo-1506280754576-f6fa8a873550?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnJ1c2NoZXR0YXxlbnwwfHwwfHx8MA%3D%3D', course: 'Starter' },
  { name: 'Steak', price: 229.99, description: 'Grilled steak with sides', image: 'https://images.unsplash.com/photo-1432139509613-5c4255815697?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8c3RlYWt8ZW58MHx8MHx8fDA%3D', course: 'Main' },
  { name: 'Chicken Alfredo', price: 119.99, description: 'Creamy pasta with chicken', image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3JlYW15JTIwcGFzdGF8ZW58MHx8MHx8fDA%3D', course: 'Main' },
  { name: 'Salmon Fillet', price: 124.99, description: 'Pan-seared salmon', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzR8fHNhbG1vbnxlbnwwfHwwfHx8MA%3D%3D', course: 'Main' },
  { name: 'Cheesecake', price: 68.99, description: 'Creamy cheesecake', image: 'https://images.unsplash.com/photo-1676300186833-057912886971?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGNoZWVzZWNha2V8ZW58MHx8MHx8fDA%3D', course: 'Dessert' },
  { name: 'Chocolate Lava Cake', price: 59.99, description: 'Molten chocolate cake', image: 'https://images.unsplash.com/photo-1607257882338-70f7dd2ae344?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzB8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8fDA%3D', course: 'Dessert' },
  { name: 'Tiramisu', price: 48.99, description: 'Italian coffee-flavored dessert', image: 'https://images.unsplash.com/photo-1542326237-94b1c5a538d4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dGlyYW1pc3V8ZW58MHx8MHx8fDA%3D', course: 'Dessert' },
];

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [selectedCourse, setSelectedCourse] = useState<'Starter' | 'Main' | 'Dessert' | 'All'>('All');
  const [modalVisible, setModalVisible] = useState(false);
  const [newItem, setNewItem] = useState<MenuItem>({ name: '', price: 0, description: '', image: '', course: 'Starter' });

  
  const filteredMenuItems = selectedCourse === 'All' ? menuItems : menuItems.filter(item => item.course === selectedCourse);

  
  const handleAddItem = () => {
    setMenuItems([...menuItems, newItem]);
    setModalVisible(false); 
    setNewItem({ name: '', price: 0, description: '', image: '', course: 'Starter' });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Menu</Text>
      <View style={styles.filterContainer}>
        <Text>Filter by Course: </Text>
        <TouchableOpacity onPress={() => setSelectedCourse('All')}><Text>All</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCourse('Starter')}><Text>Starter</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCourse('Main')}><Text>Main</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedCourse('Dessert')}><Text>Dessert</Text></TouchableOpacity>
      </View>
      <Text>Total Items: {filteredMenuItems.length}</Text>


      <FlatList
        data={filteredMenuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text>{item.description}</Text>
              <Text>Price: R{item.price.toFixed(2)}</Text>
              <Text>Course: {item.course}</Text>
            </View>
          </View>
        )}
      />

      
      <Button title="Add Menu Item" onPress={() => setModalVisible(true)} />

      
      <Modal visible={modalVisible} animationType="slide" transparent={false}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeader}>Add New Menu Item</Text>
          <TextInput
            placeholder="Name"
            style={styles.input}
            value={newItem.name}
            onChangeText={(text) => setNewItem({ ...newItem, name: text })}
          />
          <TextInput
            placeholder="Price"
            style={styles.input}
            keyboardType="numeric"
            value={newItem.price.toString()}
            onChangeText={(text) => setNewItem({ ...newItem, price: parseFloat(text) })}
          />
          <TextInput
            placeholder="Description"
            style={styles.input}
            value={newItem.description}
            onChangeText={(text) => setNewItem({ ...newItem, description: text })}
          />
          <TextInput
            placeholder="Image URL"
            style={styles.input}
            value={newItem.image}
            onChangeText={(text) => setNewItem({ ...newItem, image: text })}
          />
          <View>
            <Text>Select Course:</Text>
            <TouchableOpacity onPress={() => setNewItem({ ...newItem, course: 'Starter' })}><Text>Starter</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setNewItem({ ...newItem, course: 'Main' })}><Text>Main</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => setNewItem({ ...newItem, course: 'Dessert' })}><Text>Dessert</Text></TouchableOpacity>
          </View>
          <Button title="Add" onPress={handleAddItem} />
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  menuImage: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  menuName: {
    fontWeight: 'bold',
  },
  modalContainer: {
    padding: 20,
    flex: 1,
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
});
