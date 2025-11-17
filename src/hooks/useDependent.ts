import { useState, useEffect } from 'react';
import { getUserPatients, getBloodGroups, getGenderTypes, checkPatientCNICExistence } from '../services/Get';
import { addPatient, deletePatient } from '../services/Post';
import { formatDateForApi, validateCNIC } from '../utils/Validations';
import { Alert } from 'react-native';
import { getUserId } from '../api/api';

export interface Dependent {
    patientId: string;
    firstName: string;
    lastName: string;
    gender: string;
    genderId: number;
    dob: string;
    bloodGroup: string;
    bloodGroupId: number;
    cnic: string;
    userId: string;
}

export interface DependentForm {
    firstName: string;
    lastName: string;
    cnic: string;
    genderId: number;
    bloodGroupId: number;
    dob: Date;
}

export interface FormErrors {
    firstName: string;
    lastName: string;
    cnic: string;
    genderId: string;
    bloodGroupId: string;
    dob: string;
}

export const useDependent = () => {
    // Data states
    const [dependents, setDependents] = useState<Dependent[]>([]);
    const [genderOptions, setGenderOptions] = useState<any>([{ id: 0, name: 'Select Gender' }]);
    const [bloodOptions, setBloodOptions] = useState<any>([{ id: 0, name: 'Select Blood Group' }]);

    // UI states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);

    // Form states
    const [formData, setFormData] = useState<DependentForm>({
        firstName: '',
        lastName: '',
        cnic: '',
        genderId: 0,
        bloodGroupId: 0,
        dob: new Date()
    });
    const [formErrors, setFormErrors] = useState<FormErrors>({
        firstName: '',
        lastName: '',
        cnic: '',
        genderId: '',
        bloodGroupId: '',
        dob: ''
    });
    const [cnicExists, setCnicExists] = useState(false);
    const [checkingCNIC, setCheckingCNIC] = useState(false);

    // Fetch dependents list
    const fetchDependents = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await getUserPatients();
            setDependents(response.data);
        } catch (err: any) {
            setError(err.toString());
        } finally {
            setLoading(false);
        }
    };

    // Fetch dropdown options (genders and blood groups)
    const fetchOptions = async () => {
        try {
            const [bloodResponse, genderResponse] = await Promise.all([
                getBloodGroups(),
                getGenderTypes()
            ]);

            const bloodGroups = bloodResponse.data.map((item: any) => ({
                id: item.id,
                name: item.groupName
            }));

            const genderTypes = genderResponse.data.map((item: any) => ({
                id: item.id,
                name: item.genderName
            }));

            setBloodOptions([{ id: 0, name: 'Select Blood Group' }, ...bloodGroups]);
            setGenderOptions([{ id: 0, name: 'Select Gender' }, ...genderTypes]);
        } catch (err) {
            setError("Failed to load form options");
        }
    };

    // Validate CNIC with backend
    const validateCNICWithBackend = async (cnic: string) => {
        if (!cnic || cnic.length !== 15) return;
        setCheckingCNIC(true);
        setCnicExists(false);
        try {
            let userId = getUserId();
            const response = await checkPatientCNICExistence(userId, cnic);
            setCnicExists(response.data);
            return response;
        } catch (err: any) {
            if(err == 'Sorry! Patient CNIC already exist against this admin/user '){
                setCnicExists(true);
            }
            setError(err.toString());
        } finally {
            setCheckingCNIC(false);
        }
    };

    // Handle CNIC input change
    const handleCNICChange = (text: string) => {
        const formattedCNIC = text.replace(/\D/g, '');
        let formatted = '';

        if (formattedCNIC.length > 12) {
            formatted = `${formattedCNIC.slice(0, 5)}-${formattedCNIC.slice(5, 12)}-${formattedCNIC.slice(12, 13)}`;
        } else if (formattedCNIC.length > 5) {
            formatted = `${formattedCNIC.slice(0, 5)}-${formattedCNIC.slice(5)}`;
        } else {
            formatted = formattedCNIC;
        }

        setFormData({ ...formData, cnic: formatted });

        // Validate CNIC format
        if (formatted.length === 15) {
            if (!validateCNIC(formatted)) {
                setFormErrors({ ...formErrors, cnic: 'Invalid CNIC format' });
            } else {
                setFormErrors({ ...formErrors, cnic: '' });
                // Check if CNIC exists
                validateCNICWithBackend(formatted);
            }
        } else {
            setFormErrors({ ...formErrors, cnic: '' });
        }
    };

    // Form field change handlers
    const handleInputChange = (field: keyof DependentForm, value: any) => {
        setFormData({ ...formData, [field]: value });
        if (formErrors[field as keyof FormErrors]) {
            setFormErrors({ ...formErrors, [field]: '' });
        }
    };

    // Form validation
    const validateForm = () => {
        let valid = true;
        const newErrors = { ...formErrors };

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'First name is required';
            valid = false;
        }

        if (!formData.lastName.trim()) {
            newErrors.lastName = 'Last name is required';
            valid = false;
        }

        if (!formData.cnic || !validateCNIC(formData.cnic)) {
            newErrors.cnic = 'Valid CNIC is required';
            valid = false;
        } else if (cnicExists) {
            newErrors.cnic = 'CNIC already exists';
            valid = false;
        }

        if (formData.genderId === 0) {
            newErrors.genderId = 'Gender is required';
            valid = false;
        }

        if (formData.bloodGroupId === 0) {
            newErrors.bloodGroupId = 'Blood group is required';
            valid = false;
        }

        setFormErrors(newErrors);
        return valid;
    };

    // Reset form
    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            cnic: '',
            genderId: 0,
            bloodGroupId: 0,
            dob: new Date()
        });
        setFormErrors({
            firstName: '',
            lastName: '',
            cnic: '',
            genderId: '',
            bloodGroupId: '',
            dob: ''
        });
    };

    // Open modal
    const openAddModal = () => {
        resetForm();
        setModalVisible(true);
    };

    // Close modal
    const closeAddModal = () => {
        setModalVisible(false);
        resetForm();
    };

    // Add new dependent
    const addDependent = async () => {
        if (!validateForm()) {
            return false;
        }

        setLoading(true);
        setError(null);

        try {
            const formattedDate = formatDateForApi(formData.dob);

            const data = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                genderId: formData.genderId,
                dob: formattedDate,
                bloodGroupId: formData.bloodGroupId,
                cnic: formData.cnic,
            };

            await addPatient(data);
            await fetchDependents();
            closeAddModal();
            Alert.alert("Success", "Dependent added successfully");
            return true;
        } catch (err: any) {
            setError(err.toString());
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Remove dependent
    const removeDependent = async (dependentId: string) => {
        setLoading(true);
        setError(null);

        try {
            await deletePatient(dependentId);
            setDependents(dependents.filter(dep => dep.patientId !== dependentId));
            return true;
        } catch (err: any) {
            Alert.alert('Error', err);
            setError(err.toString());
            return false;
        } finally {
            setLoading(false);
        }
    };

    // Confirm deletion with alert
    const confirmDelete = (dependent: Dependent, onConfirm: () => void) => {
        Alert.alert(
            "Delete Dependent",
            `Are you sure you want to remove ${dependent.firstName} ${dependent.lastName} from your dependents?`,
            [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", onPress: onConfirm, style: "destructive" }
            ]
        );
    };

    // Handle delete
    const handleDelete = (item: Dependent) => {
        confirmDelete(item, async () => {
            const success = await removeDependent(item.patientId);
            if (success) {
                Alert.alert("Success", "Dependent removed successfully");
            }
        });
    };

    // Load data on mount
    useEffect(() => {
        fetchDependents();
        fetchOptions();
    }, []);

    return {
        // Data
        dependents,
        genderOptions,
        bloodOptions,

        // Form state
        formData,
        formErrors,
        loading,
        error,
        cnicExists,
        checkingCNIC,
        modalVisible,

        // Methods
        fetchDependents,
        handleCNICChange,
        handleInputChange,
        addDependent,
        handleDelete,
        openAddModal,
        closeAddModal
    };
};
