"use client";

import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

import { UpdateProfileValidation } from "@/lib/validation";
import { IProfileInfoInputField } from "@/lib/types/update-profile-types";
import { updateProfileButtonStyles } from "@/styles/profile/updateProfileStyles";
import { Input } from "./ui";
import theme from "@/theme";
import ControlledInput from "./common/ControlledInput";

const profileInfoFormData: IProfileInfoInputField[] = [
  {
    id: "PIIFD-1",
    name: "firstName",
    label: "Name",
    required: false,
    disabled: false,
    placeholder: "John"
  },
  {
    id: "PIIFD-2",
    name: "lastName",
    label: "Surname",
    required: false,
    disabled: false,
    placeholder: "Doe"
  },
  {
    id: "PIIFD-3",
    name: "email",
    label: "Email",
    required: false,
    disabled: true,
    placeholder: "example@example.com"
  },
  {
    id: "PIIFD-4",
    name: "phoneNumber",
    label: "Phone number",
    required: false,
    disabled: false,
    // TODO: update this placeholder according to proper phone number validation
    placeholder: "555 555 555"
  },
];

const defaultValues = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export const UpdateProfile = () => {
  const { data } = useSession();
  const firstName: string | undefined = data?.user?.firstName;
  const lastName: string | undefined = data?.user?.lastName;
  const phoneNumber: string | undefined = data?.user?.phoneNumber
  const email: string | undefined = data?.user?.email;

  const { handleSubmit, reset, control } = useForm<
    z.infer<typeof UpdateProfileValidation>
  >({
    resolver: zodResolver(UpdateProfileValidation),
    defaultValues,
  });

  useEffect(() => {
    if (firstName || lastName || phoneNumber) {
      reset({
        firstName: firstName || "",
        lastName: lastName || "",
        phoneNumber: phoneNumber || "",
      });
    }
  }, [firstName, lastName, phoneNumber, reset]);

  return (
    <Box
      component="form"
      autoComplete="on"
      sx={{ display: "flex", flexDirection: "column", maxWidth: "436px", gap: "24px" }}
    >
      {profileInfoFormData.map((input) => {
        return (
          input.disabled ?
            <Input
              key={input.id}
              name={input.name}
              label={input.label}
              fullWidth
              disabled={input.disabled}
              placeholder={input.placeholder}
              // TODO: find a proper value if an error occures while fetching data
              value={email || ""}
              inputStyle={{
                padding: { xs: "10.34px 11.74px 10.74px", md: "15px 16px" },
                height: { xs: "33.08px", md: "48px" },
                fontWeight: theme.typography.fontWeightLight,
                color: theme.palette.text.secondary,
                "&.Mui-disabled": {
                  opacity: "0.5",
                  cursor: "not-allowed"
                },
              }}
              inputProps={{style: {
                cursor: "not-allowed"
              }}}
            /> :
            <ControlledInput
              key={input.id}
              name={input.name}
              control={control}
              label={input.label}
              required={input.required}
              placeholder={input.placeholder}
              inputStyle={{
                padding: { xs: "10.34px 11.74px 10.74px", md: "15px 16px" },
                height: { xs: "33.08px", md: "48px" },
                fontWeight: theme.typography.fontWeightLight,
                color: theme.palette.text.secondary,
              }}
            />
        )
      })}
      {/* TODO: replace the button component below with the reusable Button component */}
      <Button
        variant="contained"
        color="error"
        sx={{
          ...updateProfileButtonStyles,
          marginTop: "32px",
          alignSelf: "flex-end",
        }}
      >
        Save Changes
      </Button>
    </Box>
  );
};
