import React from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useDependent } from '../../../hooks/useDependent';
import DependentItem from '../../../components/profile/DependentItem';
import AddDependentModal from '../../../components/profile/AddDependentModal';
import CustomButton from '../../../components/button/Button';
import styles from './styles';

const Dependent = () => {
  const {
    dependents,
    genderOptions,
    bloodOptions,
    
    formData,
    formErrors,
    loading,
    cnicExists,
    checkingCNIC,
    modalVisible,
    
    handleCNICChange,
    handleInputChange,
    addDependent,
    handleDelete,
    openAddModal,
    closeAddModal
  } = useDependent();

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <Icon name="users" size={50} color="#cccccc" />
      <Text style={styles.emptyText}>No dependents added yet</Text>
      <Text style={styles.emptySubText}>
        Add family members as dependents to manage their health records
      </Text>
    </View>
  );

  if (loading && dependents.length === 0) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0066CC" />
      </View>
    );
  }

  return (
    <View style={styles.dependentContainer}>
      <View style={styles.marginv5}/>
     <CustomButton title='+ Add Dependent' onPress={openAddModal}/>
 
      {dependents.length > 0 ? (
        <FlatList
          data={dependents}
          renderItem={({ item }) => (
            <DependentItem item={item} onDelete={handleDelete} />
          )}
          keyExtractor={item => item.patientId}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <EmptyState />
      )}

      <AddDependentModal 
        visible={modalVisible}
        onClose={closeAddModal}
        formData={formData}
        formErrors={formErrors}
        genderOptions={genderOptions}
        bloodOptions={bloodOptions}
        loading={loading}
        checkingCNIC={checkingCNIC}
        cnicExists={cnicExists}
        onChangeText={handleInputChange}
        onChangeCNIC={handleCNICChange}
        onSubmit={addDependent}
      />
    </View>
  );
};


export default Dependent;
