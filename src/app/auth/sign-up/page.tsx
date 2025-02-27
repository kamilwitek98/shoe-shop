import { Box, Typography } from '@mui/material';

import SignUpForm from '@/components/forms/SignUpForm';

export default function SignUp() {
  return (
    <Box marginTop="40px">
      <Typography variant="h1">Create an account</Typography>
      <Typography variant="body1" marginTop="16px">
        Create an account to get an easy access to your dream shopping
      </Typography>
      <SignUpForm />
    </Box>
  );
}
