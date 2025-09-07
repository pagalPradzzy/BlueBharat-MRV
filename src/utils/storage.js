// Storage utility functions for Blue Carbon project persistence
// Handles localStorage with versioning and schema migration

const STORAGE_VERSION = '1.0.0';
const PROJECTS_KEY = 'bluecarbon_projects';
const VERSION_KEY = 'bluecarbon_storage_version';

// Default project schema
const createProject = (data) => ({
  id: data.id || Date.now().toString(),
  projectName: data.projectName || '',
  location: data.location || '',
  hectares: data.hectares || 0,
  ecosystemType: data.ecosystemType || 'mangrove',
  latitude: data.latitude || '',
  longitude: data.longitude || '',
  coordinates: data.coordinates || '',
  description: data.description || '',
  images: data.images || [],
  status: data.status || 'submitted',
  submittedAt: data.submittedAt || new Date().toISOString(),
  submittedBy: data.submittedBy || 'field-worker',
  organization: data.organization || 'Local NGO',
  approvedAt: data.approvedAt || null,
  approvedBy: data.approvedBy || null,
  mintedAt: data.mintedAt || null,
  mintedBy: data.mintedBy || null,
  creditsMinted: data.creditsMinted || 0,
  estimatedCredits: data.estimatedCredits || Math.floor(parseFloat(data.hectares || 0) * 150), // Estimate based on hectares
  version: STORAGE_VERSION
});

// Storage versioning and migration
const migrateStorage = () => {
  const currentVersion = localStorage.getItem(VERSION_KEY);
  
  if (!currentVersion) {
    // First time setup
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    return;
  }
  
  if (currentVersion !== STORAGE_VERSION) {
    console.log(`Migrating storage from ${currentVersion} to ${STORAGE_VERSION}`);
    
    // Get existing projects
    const existingProjects = getProjects();
    
    // Migrate each project to new schema
    const migratedProjects = existingProjects.map(project => createProject(project));
    
    // Save migrated projects
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(migratedProjects));
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    
    console.log(`Migration completed. ${migratedProjects.length} projects migrated.`);
  }
};

// Get all projects from localStorage
export const getProjects = () => {
  try {
    migrateStorage();
    const stored = localStorage.getItem(PROJECTS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading projects from localStorage:', error);
    return [];
  }
};

// Save projects to localStorage
export const saveProjects = (projects) => {
  try {
    const projectsWithSchema = projects.map(project => createProject(project));
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projectsWithSchema));
    localStorage.setItem(VERSION_KEY, STORAGE_VERSION);
    return true;
  } catch (error) {
    console.error('Error saving projects to localStorage:', error);
    return false;
  }
};

// Add a single project
export const addProject = (projectData) => {
  try {
    const projects = getProjects();
    const newProject = createProject({
      ...projectData,
      id: Date.now().toString()
    });
    
    projects.push(newProject);
    return saveProjects(projects) ? newProject : null;
  } catch (error) {
    console.error('Error adding project:', error);
    return null;
  }
};

// Update project status and related fields
export const updateProjectStatus = (projectId, status, updatedBy = 'system') => {
  try {
    const projects = getProjects();
    const projectIndex = projects.findIndex(p => p.id === projectId);
    
    if (projectIndex === -1) {
      console.error('Project not found:', projectId);
      return false;
    }
    
    const project = { ...projects[projectIndex] };
    const now = new Date().toISOString();
    
    // Update status and related metadata
    project.status = status;
    
    switch (status) {
      case 'approved':
        project.approvedAt = now;
        project.approvedBy = updatedBy;
        break;
      case 'minted':
        project.mintedAt = now;
        project.mintedBy = updatedBy;
        project.creditsMinted = project.estimatedCredits;
        break;
    }
    
    projects[projectIndex] = project;
    return saveProjects(projects);
  } catch (error) {
    console.error('Error updating project status:', error);
    return false;
  }
};

// Get project by ID
export const getProjectById = (projectId) => {
  const projects = getProjects();
  return projects.find(p => p.id === projectId) || null;
};

// Get projects by status
export const getProjectsByStatus = (status) => {
  const projects = getProjects();
  return status === 'all' ? projects : projects.filter(p => p.status === status);
};

// Get projects by user/organization
export const getProjectsByUser = (userId) => {
  const projects = getProjects();
  return projects.filter(p => p.submittedBy === userId);
};

// Get project statistics
export const getProjectStats = () => {
  const projects = getProjects();
  
  return {
    total: projects.length,
    submitted: projects.filter(p => p.status === 'submitted').length,
    approved: projects.filter(p => p.status === 'approved').length,
    minted: projects.filter(p => p.status === 'minted').length,
    totalHectares: projects.reduce((sum, p) => sum + parseFloat(p.hectares || 0), 0),
    totalCredits: projects.reduce((sum, p) => sum + (p.creditsMinted || 0), 0),
    estimatedCredits: projects.reduce((sum, p) => sum + (p.estimatedCredits || 0), 0)
  };
};

// Clear all projects (for development/testing)
export const clearProjects = () => {
  try {
    localStorage.removeItem(PROJECTS_KEY);
    localStorage.removeItem(VERSION_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing projects:', error);
    return false;
  }
};

// Export project data (for backup/download)
export const exportProjects = () => {
  const projects = getProjects();
  const exportData = {
    version: STORAGE_VERSION,
    exportedAt: new Date().toISOString(),
    projects: projects
  };
  
  return JSON.stringify(exportData, null, 2);
};

// Import project data (for restore/upload)
export const importProjects = (jsonData) => {
  try {
    const importData = JSON.parse(jsonData);
    const projects = importData.projects || importData; // Handle both formats
    
    return saveProjects(projects);
  } catch (error) {
    console.error('Error importing projects:', error);
    return false;
  }
};
