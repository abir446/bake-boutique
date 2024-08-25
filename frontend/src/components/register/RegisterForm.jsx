import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

export const RegisterForm = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const registerUser = async (data) => {
    const { name, email, address, password } = data;

    try {
      const { data } = await axios.post("http://localhost:8000/register", {
        name,
        email,
        address,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Registration Success");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-60px)] bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create an account
        </h2>
        <form onSubmit={handleSubmit(registerUser)} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              {...register("name", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="John Doe"
            />
            {errors.name && (
              <span className="text-red-500">Name is required</span>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              {...register("email", { required: true })}
              type="email"
              id="email"
              placeholder="john@gmail.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {/* errors will return when field validation fails  */}
            {errors.email && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address
            </label>
            <input
              type="text"
              {...register("address", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Address"
            />
            {/* errors will return when field validation fails  */}
            {errors.address && (
              <span className="text-red-500">Address is required</span>
            )}
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            {/* errors will return when field validation fails  */}
            {errors.password && (
              <span className="text-red-500">This field is required</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign Up
            </button>
          </div>
        </form>
        <p className="text-center text-gray-500 text-sm mt-4">
          Already have an account?{" "}
          <Link to={"/login"} className="text-blue-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
};
