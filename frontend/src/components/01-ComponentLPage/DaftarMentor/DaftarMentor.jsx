import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { Link as LinkTo } from 'react-router-dom';
import useLoginState from '../../../zustand/todoLogin';

export default function DaftarMentor() {
  const { isLoggedIn } = useLoginState();
  const color = useColorModeValue('white', 'black');
  const tauah = useColorModeValue('accentLight.900', 'accentLight.100');
  const bacg = useColorModeValue('accentLight.400', 'accentDark.400');
  const hoverBg = useColorModeValue('accentLight.500', 'accentDark.500');
  return isLoggedIn ? null : (
    <Stack
      minH={{ base: 'auto', lg: '100vh' }}
      as={Container}
      w="full"
      alignItems="center"
      justifyContent={'center'}
      maxW={'7xl'}
      px={50}
    >
      <Box w={'100%'} data-aos="fade-up">
        <Heading
          fontSize={{ base: '3xl', sm: '4xl' }}
          fontWeight={600}
          letterSpacing={'tight'}
          lineHeight={'shorter'}
          color={tauah}
        >
          <Text>Ingin Bergabung Sebagai Partner Pengajar Kami?</Text>
          <Text color={tauah}>
            Bagikan Pengalamanmu Sekarang Bersama Para Pengajar Lainya
          </Text>
        </Heading>
        <Button
          as={LinkTo}
          to={'cara_mendaftar_instruktur'}
          color={color}
          bg={bacg}
          _hover={{
            bg: { hoverBg },
          }}
          p="4"
          mt={4}
        >
          Cara Mendaftar
        </Button>
      </Box>
    </Stack>
  );
}
