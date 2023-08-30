// GET
const userAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/`;
const usersAPI = `${import.meta.env.VITE_SERVER_URL}/api/users/`;
const projectsAPI = `${import.meta.env.VITE_SERVER_URL}/api/projects/`;
const postsAPI = `${import.meta.env.VITE_SERVER_URL}/api/posts/`;

// POST

const projectCreate = `${import.meta.env.VITE_SERVER_URL}/api/projects/create/`;
const postCreate = `${import.meta.env.VITE_SERVER_URL}/api/posts/create/`;

// PUT
const userUpdate = `${import.meta.env.VITE_SERVER_URL}/api/users/profile/edit/`;

export {
  userAPI,
  usersAPI,
  projectsAPI,
  postsAPI,
  projectCreate,
  postCreate,
  userUpdate,
};
