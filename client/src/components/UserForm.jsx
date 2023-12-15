import { useState } from "react";
import { standards } from "../utils/constants";
import { Controller, useForm, useFieldArray } from "react-hook-form";
import { generateErrorToast } from "../utils/errorToast";
import { createUser, getUser } from "../services/user";
import { toast } from "react-toastify";

const UserForm = ({ getUserData }) => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [standard, setStandard] = useState(0);
  const { control, handleSubmit, reset, getValues } = useForm({
    defaultValues: {
      name: "",
      email: "",
      age: "",
      current_standard: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: control,
    name: "previous_standard",
  });

  function dynamicFields(count) {
    remove();
    for (let i = 1; i < count; i++) {
      append({ standard: i, percentage: 0.0, remark: "" });
    }
  }

  function saveUserDetails(data) {
    setIsDisabled(true);
    createUser(data)
      .then((res) => {
        toast.info(res.message);
        getUserData();
        reset();
        remove();
      })
      .catch((err) => generateErrorToast(err))
      .finally(() => setIsDisabled(false));
  }

  return (
    <div className="flex flex-col items-center w-full p-4">
      <h2 className="text-2xl my-2">User's Detail</h2>
      <form
        onSubmit={handleSubmit(saveUserDetails)}
        className="w-50 flex flex-col gap-5"
      >
        <div className="flex gap-10">
          <Controller
            control={control}
            name="name"
            render={({ field, fieldState: { error } }) => (
              <div className="w-full border p-1 bg-white">
                <input
                  {...field}
                  type="text"
                  placeholder="Name"
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {!!error && <p className="text-danger">{error.message}</p>}
              </div>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field, fieldState: { error } }) => (
              <div className="w-full border p-1 bg-white">
                <input
                  {...field}
                  type="email"
                  placeholder="abc@gmail.com"
                  onChange={(e) => field.onChange(e.target.value)}
                />
                {!!error && <p className="text-danger">{error.message}</p>}
              </div>
            )}
          />
          <Controller
            control={control}
            name="age"
            render={({ field, fieldState: { error } }) => (
              <div className="w-full border p-1 bg-white">
                <input
                  {...field}
                  type="text"
                  placeholder="age"
                  onChange={(e) => {
                    console.log(standard);
                    field.onChange(e.target.value);
                  }}
                />
                {!!error && <p className="text-danger">{error.message}</p>}
              </div>
            )}
          />
          <Controller
            control={control}
            name="current_standard"
            render={({ field, fieldState: { error } }) => (
              <>
                <select
                  className="primary border p-1 bg-white"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e.target.value);
                    dynamicFields(e.target.value);
                    setStandard(parseInt(e.target.value));
                  }}
                >
                  <option value="" disabled>
                    Select Current Standard
                  </option>
                  {standards.map((standard) => (
                    <option key={standard} value={standard}>
                      {standard}
                    </option>
                  ))}
                </select>
                {!!error && <p className="text-danger">{error.message}</p>}
              </>
            )}
          />
        </div>
        {standard ? (
          <div className="flex flex-col gap-3">
            {fields.map((item, index) => (
              <div key={item.id} className="flex gap-3">
                <Controller
                  control={control}
                  name={`previous_standard.${index}.standard`}
                  render={({ field, fieldState: { error } }) => (
                    <div className="w-full border p-1 bg-white">
                      <input {...field} type="text" readOnly />
                      {!!error && (
                        <p className="text-danger">{error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`previous_standard.${index}.percentage`}
                  render={({ field, fieldState: { error } }) => (
                    <div className="w-full border p-1 bg-white">
                      <input {...field} type="text" />
                      {!!error && (
                        <p className="text-danger">{error.message}</p>
                      )}
                    </div>
                  )}
                />
                <Controller
                  control={control}
                  name={`previous_standard.${index}.remark`}
                  render={({ field, fieldState: { error } }) => (
                    <div className="w-full border p-1 bg-white">
                      <input {...field} type="text" placeholder="Notes.." />
                      {!!error && (
                        <p className="text-danger">{error.message}</p>
                      )}
                    </div>
                  )}
                />
              </div>
            ))}
          </div>
        ) : null}
        {/* <StandardForm count={standard - 1} /> */}
        <div className="flex justify-end mt-3 gap-2">
          <button
            className="primary bg-slate-200 p-2 rounded"
            type="submit"
            disabled={isDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;
