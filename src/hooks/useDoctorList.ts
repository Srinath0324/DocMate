import { useState, useEffect } from 'react';
import {
  getDoctorFieldListWithType,
  getDoctorsByType,
  getDoctorsByField,
  getAllDoctors,
  getDiseases,
} from '../services/Get';

interface Category {
  id: number;
  name: string;
  icon: string;
  iconType: 'Ionicons' | 'MaterialIcons' | 'FontAwesome' | 'FontAwesome5' | 'MaterialCommunityIcons';
  isActive: boolean;
}

interface SubCategory {
  doctorFieldId: string;
  name: string;
  image: string;
  isActive?: boolean;
}

interface Disease {
  diseaseId: string;
  name: string;
}

interface DoctorField {
  doctorFieldId: string;
  name: string;
  diseases: Disease[];
}

interface DiseaseCategory {
  fieldCategoryId: string;
  name: string;
  doctorFields: DoctorField[];
}

interface DoctorType {
  doctorTypeId: number;
  doctorType: string;
  getDoctorFieldViews: SubCategory[];
}

interface Doctor {
  doctorId: string;
  name: string;
  image: string | null;
  field: string;
  experience: number | string;
  rating: number;
}

interface UseDoctorListProps {
  navigation: any;
  route: any;
}

const useDoctorList = ({ navigation, route }: UseDoctorListProps) => {
  const [categories, setCategories] = useState<Category[]>([
    { id: 0, name: 'All', icon: 'list', iconType: 'FontAwesome', isActive: false },
    { id: 1, name: 'Surgeons', icon: 'stethoscope', iconType: 'FontAwesome', isActive: false },
    { id: 2, name: 'Specialist', icon: 'user-md', iconType: 'FontAwesome', isActive: false },
    { id: 3, name: 'By Diseases', icon: 'heartbeat', iconType: 'FontAwesome', isActive: false },
  ]);
  
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [doctorTypes, setDoctorTypes] = useState<DoctorType[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  
  // State for diseases
  const [diseaseCategories, setDiseaseCategories] = useState<DiseaseCategory[]>([]);
  const [selectedDiseaseCategory, setSelectedDiseaseCategory] = useState<string | null>(null);
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [selectedDisease, setSelectedDisease] = useState<Disease | null>(null);
  const [doctorFieldIdForDisease, setDoctorFieldIdForDisease] = useState<string | null>(null);
  const [showingDiseases, setShowingDiseases] = useState<boolean>(false);

  useEffect(() => {
    const activeCategoryId = route.params?.activeCategoryId;
    
    if (activeCategoryId !== undefined) {
      if (activeCategoryId === 3) {
        handleDiseaseCategory();
      } else if (activeCategoryId !== 0) {
        handleCategoryIdChange(activeCategoryId);
      } else {
        fetchInitialData();
      }
    } else {
      fetchInitialData();
    }
  }, [route.params?.activeCategoryId]);

  const handleDiseaseCategory = async () => {
    try {
      setLoading(true);
      const updatedCategories = categories.map(category => ({
        ...category,
        isActive: category.id === 3,
      }));
      setCategories(updatedCategories);
      setShowingDiseases(true);
      
      // Fetch diseases
      const result = await getDiseases();
      if (result && result.status === 'Success') {
        setDiseaseCategories(result.data || []);
        
        if (result.data && result.data.length > 0) {
          const firstCategory = result.data[0];
          setSelectedDiseaseCategory(firstCategory.fieldCategoryId);
          
          if (firstCategory.doctorFields && firstCategory.doctorFields.length > 0) {
            let allDiseases: Disease[] = [];
            firstCategory.doctorFields.forEach((field:any) => {
              if (field.diseases && field.diseases.length > 0) {
                allDiseases = [...allDiseases, ...field.diseases];
              }
            });
            setDiseases(allDiseases);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching diseases:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryIdChange = async (categoryId: number) => {
    const updatedCategories = categories.map(category => ({
      ...category,
      isActive: category.id === categoryId,
    }));
    setCategories(updatedCategories);
    
    if (categoryId === 3) {
      handleDiseaseCategory();
      return;
    }
    
    setShowingDiseases(false);
    setSelectedDisease(null);
    setSelectedDiseaseCategory(null);
    setDoctorFieldIdForDisease(null);
    
    try {
      setLoading(true);
      
      const doctorFieldsRes = await getDoctorFieldListWithType();
      if (doctorFieldsRes && doctorFieldsRes.status === 'Success') {
        setDoctorTypes(doctorFieldsRes.data || []);
        
        const selectedType = doctorFieldsRes.data.find(
          (type: DoctorType) => type.doctorTypeId === categoryId
        );
        
        if (selectedType) {
          const newSubCategories = selectedType.getDoctorFieldViews.map((item:any) => ({
            ...item,
            isActive: false
          }));
          setSubCategories(newSubCategories);
        }
      }
      
      const result = await getDoctorsByType(categoryId);
      if (result && result.status === 'Success') {
        setDoctors(result.data || []);
      }
    } catch (error) {
      console.error(`Error fetching data for category ${categoryId}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const handleDiseaseCategoryPress = (categoryId: string) => {
    if (selectedDiseaseCategory === categoryId) return;
    
    setSelectedDiseaseCategory(categoryId);
    setSelectedDisease(null);
    
    const category = diseaseCategories.find(c => c.fieldCategoryId === categoryId);
    if (category) {
      let allDiseases: Disease[] = [];
      category.doctorFields.forEach(field => {
        if (field.diseases && field.diseases.length > 0) {
          allDiseases = [...allDiseases, ...field.diseases];
        }
      });
      setDiseases(allDiseases);
    }
  };

  const handleDiseasePress = async (disease: Disease) => {
    setSelectedDisease(disease);
    
    for (const category of diseaseCategories) {
      for (const field of category.doctorFields) {
        const foundDisease = field.diseases.find(d => d.diseaseId === disease.diseaseId);
        if (foundDisease) {
          setDoctorFieldIdForDisease(field.doctorFieldId);
          try {
            setLoading(true);
            const result = await getDoctorsByField(field.doctorFieldId);
            if (result && result.status === 'Success') {
              setDoctors(result.data || []);
            }
          } catch (error) {
            console.error(`Error fetching doctors for disease ${disease.name}:`, error);
          } finally {
            setLoading(false);
          }
          return;
        }
      }
    }
  };

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      
      const updatedCategories = categories.map(category => ({
        ...category,
        isActive: category.id === 0,
      }));
      setCategories(updatedCategories);
      setSubCategories([]);
      setShowingDiseases(false);
      setSelectedDisease(null);
      setSelectedDiseaseCategory(null);
      
      const [allDoctorsRes, doctorFieldsRes] = await Promise.all([
        getAllDoctors(),
        getDoctorFieldListWithType()
      ]);
      
      if (allDoctorsRes && allDoctorsRes.status === 'Success') {
        setDoctors(allDoctorsRes.data || []);
      }

      if (doctorFieldsRes && doctorFieldsRes.status === 'Success') {
        setDoctorTypes(doctorFieldsRes.data || []);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchInitialData();
    setRefreshing(false);
  };

  const handleCategoryPress = async (selectedCategory: Category) => {
    if (selectedCategory.isActive) return;

    if (selectedCategory.id === 0) {
      fetchInitialData();
      return;
    }
    
    handleCategoryIdChange(selectedCategory.id);
  };

  const handleSubCategoryPress = async (subCategory: SubCategory) => {
    if (selectedSubCategory === subCategory.doctorFieldId) {
      setSelectedSubCategory(null);
      const activeCategory = categories.find(cat => cat.isActive);
      if (activeCategory && activeCategory.id !== 0) {
        try {
          setLoading(true);
          const result = await getDoctorsByType(activeCategory.id);
          if (result && result.status === 'Success') {
            setDoctors(result.data || []);
          }
        } catch (error) {
          console.error('Error fetching doctors by type:', error);
        } finally {
          setLoading(false);
        }
      }
    } else {
      setSelectedSubCategory(subCategory.doctorFieldId);
      try {
        setLoading(true);
        const result = await getDoctorsByField(subCategory.doctorFieldId);
        if (result && result.status === 'Success') {
          setDoctors(result.data || []);
        }
      } catch (error) {
        console.error(`Error fetching doctors for field ${subCategory.doctorFieldId}:`, error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDoctorPress = (doctor: Doctor) => {
    navigation.navigate('DoctorProfile', { id: doctor.doctorId});
  };

  return {
    categories,
    subCategories,
    doctors,
    loading,
    refreshing,
    doctorTypes,
    selectedSubCategory,
    diseaseCategories,
    selectedDiseaseCategory,
    diseases,
    selectedDisease,
    doctorFieldIdForDisease,
    showingDiseases,

    handleDiseaseCategory,
    handleCategoryIdChange,
    handleDiseaseCategoryPress,
    handleDiseasePress,
    fetchInitialData,
    handleRefresh,
    handleCategoryPress,
    handleSubCategoryPress,
    handleDoctorPress,
  };
};

export default useDoctorList;
export type { Category, SubCategory, Doctor, Disease, DiseaseCategory };
