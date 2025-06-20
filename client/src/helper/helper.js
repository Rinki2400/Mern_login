import axios from "axios";
import { jwtDecode } from "jwt-decode";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
/** Make API Requests */

/** get username from token */
export async function getUsername() {
  const token = localStorage.getItem("token");
  if (!token) return Promise.reject("Cannot find Token");

  const decoded = jwtDecode(token);
  console.log("Decoded token:", decoded); // Add this line to debug
  return decoded;
}
/** authenticate function */
export async function authenticate(username) {
  try {
    return await axios.post("/api/authenticate", { username });
  } catch (error) {
    return { error: "Username doesn't exist...!" };
  }
}

/**get user detail */

export async function getUser({ username }) {
  try {
    const { data } = await axios.get(`/api/user/${username}`);
    return { data };
  } catch (error) {
    return { error: "Password does not match..." };
  }
}

/** registered userfunction */
export async function registeredUser(credencial) {
  try {
    const {
      data: { msg },
      status,
    } = await axios.post(`/api/registered`, credencial);

    let { username, email } = credencial;
    if (status === 201) {
      await axios.post("/api/registratemail", {
        username,
        userEmail: email,
        text: msg,
      });
    }
    return msg;
  } catch (error) {
    return { error };
  }
}
/**login function */

export async function verifyPassword({ username, password }) {
  try {
    if (username) {
      const { data } = await axios.post("/api/login", { username, password });
      return { data };
    }
  } catch (error) {
    return { error: "Password doesn't Match ...!" };
  }
}

/**update function */
export async function updateUser(response) {
    const token = await localStorage.getItem('token');
  try {
    const responseObj = await axios.put("/api/updateUser", response, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const { data } = responseObj;

    return Promise.resolve({ data }); // return the actual response directly
  } catch (error) {
    return Promise.reject({ error: "Couldn't update Profile ..." });
  }
}

/**Generate OTP */
export async function generateOTP(username) {
  try {
    const {
      data: { code },
      status,
    } = await axios.get("/api/generateOTP", { params: { username } });
    if (status === 201) {
      let {
        data: { email },
      } = await getUser({ username });
      let text = `your Password Recovery OTP is ${code}. verify and recover your password... `;
      await axios.post("/api/registratemail", {
        username,
        userEmail: email,
        text,
        subject: "password Recover OTP",
      });
    }
    return { code };
  } catch (error) {
    return { error };
  }
}

/** verify OTP */
export async function vertifyOTP({ username, code }) {
  try {
    const { data, status } = await axios.get("/api/vertifyOTP", {
      params: { username, code },
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}
/**Reset Password */
export async function resetPassword({ username, password }) {
  try {
    const { data, status } = await axios.put("/api/resetPassword", {
      username,
      password,
    });
    return { data, status };
  } catch (error) {
    return { error };
  }
}
