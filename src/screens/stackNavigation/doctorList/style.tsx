import { StyleSheet } from "react-native";

const style = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    elevation: 2,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 8,
  },
  categoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  categoriesScrollView: {
    paddingHorizontal: 4,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
  },
  activeCategoryItem: {
    backgroundColor: '#0066CC',
  },
  categoryIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  activeCategoryIcon: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontSize: 14,
    color: '#757575',
  },
  activeCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  subCategoriesContainer: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#E0E0E0',
  },
  subCategoriesScrollView: {
    paddingHorizontal: 4,
  },
  subCategoryItem: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#F0F0F0',
    maxWidth: 200, // Limit width to prevent overflow
  },
  activeSubCategoryItem: {
    backgroundColor: '#0066CC',
  },
  subCategoryText: {
    fontSize: 14,
    color: '#757575',
  },
  activeSubCategoryText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  doctorList: {
    padding: 16,
  },
  doctorCardContainer: {
    flex: 1,
    margin: 8,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loaderText: {
    marginTop: 8,
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyText: {
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
  emptySubText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
    marginTop: 4,
  },
  // Add these new styles
  disabledCategoryItem: {
    opacity: 0.6,
  },
  disabledSubCategoryItem: {
    opacity: 0.6,
  },
  disabledText: {
    color: '#999',
  },
  fullScreenLoader: {
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(255,255,255,0.7)',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  diseasesListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexGrow: 1,
  },
  diseaseItem: {
    backgroundColor: '#F0F0F0',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    width: '100%',
  },
  diseaseText: {
    fontSize: 14,
    color: '#333',
    flexShrink: 1,
  },
});

export default style;