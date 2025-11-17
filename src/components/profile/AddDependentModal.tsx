import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { formatDate } from '../../utils/Validations';
import InputText from '../textInput/InputText';
import DatePickerField from './DatePickerField';
import DropdownField from './DropdownField';
import CustomButton from '../button/Button';
import { DependentForm, FormErrors } from '../../hooks/useDependent';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface AddDependentModalProps {
    visible: boolean;
    onClose: () => void;
    formData: DependentForm;
    formErrors: FormErrors;
    genderOptions: any[];
    bloodOptions: any[];
    loading: boolean;
    checkingCNIC: boolean;
    cnicExists: boolean;
    onChangeText: (field: keyof DependentForm, value: any) => void;
    onChangeCNIC: (text: string) => void;
    onSubmit: () => void;
}

const AddDependentModal: React.FC<AddDependentModalProps> = ({
    visible,
    onClose,
    formData,
    formErrors,
    genderOptions,
    bloodOptions,
    loading,
    onChangeText,
    onChangeCNIC,
    onSubmit
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>Add Dependent</Text>
                        <TouchableOpacity onPress={onClose}>
                            <Icon name="times" size={24} color="#333" />
                        </TouchableOpacity>
                    </View>
                    
                    <ScrollView 
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContent}
                    >
                        <InputText
                            label="First Name"
                            value={formData.firstName}
                            onChangeText={(text) => onChangeText('firstName', text)}
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                            error={formErrors.firstName}
                            placeholder="Enter first name"
                            leftIcon={<FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />}
                        />

                        <InputText
                            label="Last Name"
                            value={formData.lastName}
                            onChangeText={(text) => onChangeText('lastName', text)}
                            error={formErrors.lastName}
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                            placeholder="Enter last name"
                            leftIcon={<FontAwesome name="user" size={20} color="#666" style={styles.inputIcon} />}
                        />

                        <InputText
                            label="CNIC"
                            value={formData.cnic}
                            onChangeText={onChangeCNIC}
                            error={formErrors.cnic}
                            placeholder="e.g. 12345-1234567-1"
                            keyboardType="number-pad"
                            labelStyle={styles.inputLabel}
                            inputContainerStyle={styles.inputField}
                            maxLength={15}
                            leftIcon={<FontAwesome name="credit-card" size={20} color="#666" style={styles.inputIcon} />}
                        />

                        <DropdownField
                            label="Gender"
                            value={genderOptions.find((g: any) => g.id === formData.genderId) || genderOptions[0]}
                            items={genderOptions}
                            onSelect={(item) => onChangeText('genderId', item.id)}
                            error={formErrors.genderId}
                            icon={<Icon name="user" size={20} color="#666" style={{ marginRight: 10 }} />}
                        />

                        <DatePickerField
                            label="Date of Birth"
                            value={formData.dob}
                            displayValue={formatDate(formData.dob)}
                            onChange={(date) => onChangeText('dob', date)}
                            error={formErrors.dob}
                        />

                        <DropdownField
                            label="Blood Group"
                            value={bloodOptions.find((b: any) => b.id === formData.bloodGroupId) || bloodOptions[0]}
                            items={bloodOptions}
                            onSelect={(item) => onChangeText('bloodGroupId', item.id)}
                            error={formErrors.bloodGroupId}
                            icon={<Icon name="tint" size={20} color="#666" style={{ marginRight: 10 }} />}
                        />

                        <CustomButton
                            title="Add Dependent"
                            onPress={onSubmit}
                            loading={loading}
                            disabled={loading}
                            fullWidth={true}
                        />
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inputField: {
        backgroundColor: '#fff',
        borderRadius: 12,
        paddingVertical: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
        borderWidth: 1,
        borderColor: '#e1e6ef',
    },
    inputLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 6,
        fontWeight: '500',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 24,
        borderRadius: 16,
        width: '90%',
        maxHeight: '85%', // Adjusted to ensure modal stays within screen
    },
    scrollContent: {
        paddingBottom: 10, // Add some padding at the bottom for better scrolling experience
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    inputIcon: {
        marginRight: 5,
    },
});

export default AddDependentModal;
