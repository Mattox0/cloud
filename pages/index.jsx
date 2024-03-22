import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../src/contexts/auth.context';

export default function Index() {

  const { user, getUser } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/ui/sign-in');
    } else {
        console.log(user)
    }
  }, [user, router]);

  return (
      <Container maxWidth="sm">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Material UI - Next.js example
          </Typography>
            { user ? (
                <Typography variant="body1" component="p" sx={{ mb: 4 }}>
                    Welcome {user?.username}, Nice to meet you !
                </Typography>
            ) : (
                <Link href="/ui/sign-in" color="secondary">
                    Go to the Sign-In page
                </Link>
            )}
        </Box>
      </Container>
  );
}