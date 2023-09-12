import axios from "axios";
const REACT_APP_INTERNAL_SERVER = process.env.REACT_APP_INTERNAL_SERVER;

const api = axios.create({
  baseURL: REACT_APP_INTERNAL_SERVER,
  // baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const login = async (data) => {
  let response;

  try {
    response = await api.post("/login", data);
  } catch (error) {
    return error;
  }

  return response;
};


export const signup = async (data) => {
  let response;

  try {
    response = await api.post("/register", data)

  }
  catch (err) {
    return err
  }
  return response
}
export const signout = async (data) => {
  let response;

  try {
    response = await api.post("/register", data);
  }
  catch (err) {
    return err
  }
  return response
}

export const getAllBlog = async () => {
  let response
  try {
    response = await api.get("/blog/all")
  } catch (error) {
    console.log(error)
  }
  return response
}
export const Submitblog = async (data) => {
  let response;
  try {
    response = await api.post("/blog", data)
  } catch (error) {
    return error;
  }
  return response
}

export const getBlogbyId = async (id) => {
  let response;
  try {
    response = await api.get(`/blog/${id}`)
  } catch (error) {
    return error
  }
  return response
}
export const getCommentbyId = async (id) => {
  let response;
  try {
    response = await api.get(`/comment/${id}`,
      { validateStatus: false }
    )
  } catch (error) {
    return error
  }
  return response
}

export const postComment = async (data) => {
  let response;

  try {
    response = await api.post("/comment", data);
  } catch (error) {
    return error;
  }
  return response;
};

export const deleteBlog = async (id) => {
  let response;
  try {
    response = await api.delete(`/blog/${id}`);
  } catch (error) {
    return error;
  }

  return response;
};

export const updateBlog = async (data) => {
  let response;
  try {
    response = await api.put("/blog", data);
  } catch (error) {
    return error;
  }
  return response;
};

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 || error.response.status === 500) &&
      originalReq &&
      !originalReq._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        await axios.get(`${process.env.REACT_APP_INTERNAL_SERVER}/refresh`, {
          withCredentials: true,
        });

        return api.request(originalReq);
      } catch (error) {
        return error;
      }
    }
  }
);

