import axios from "axios";

export const validateCoupon = async (code) => {
  const res = await axios.post("http://localhost:5000/api/coupon/validate", {
    code,
  });
  return res.data;
};
