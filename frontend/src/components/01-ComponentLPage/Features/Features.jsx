import {
  Box,
  Container,
  Flex,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Image,
} from '@chakra-ui/react';
import React, { useState } from 'react';
import useLoginState from '../../../zustand/todoLogin';

const subjectList = [
  {
    name: 'Matematika',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBlgmT1cKrgLGs858d51J2Oh2zWrZkgGGXCA&usqp=CAU',
    color: 'linear(to-b, rgba(246, 92, 139, 1), rgba(246, 92, 139, 1))',
  },
  {
    name: 'Fisika',
    image:
      'https://storage.googleapis.com/kelase-files/kelas/66febcac2adea8f98db0064dd2f8a592.png',
    color: 'linear(to-b, rgba(158, 138, 252, 1), rgba(158, 138, 252, 1))',
  },
  {
    name: 'Kimia',
    image:
      'data:image/jpeg;base64,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gE4yQcScqhVAAwB2lHqWj165rpSqUlp3Y/eblLOpKLSYpztOVVcAjg5PzZxAvpGq39KkCWdRtdKZz/3KhQIv1JdB/cJJlDf6JUu7ogugovXoVzwfED0DSYIDnBUmihz3wWHmCAvpX22t211emilTLguMEMMmmSrhSwAbBBzgntLCUVpoH4fUkrF2fa9w21mdlBrO7KyAnCsAxT0wxgXNxWW3oF2yFUZOAScD2HJkbTNUo6rTLUWLhTgnay8+nzAZk2QdGsTp1gKRIYhqjZAx+eoz/wCN2PtA9NQ1Clp1INVYqGO0YVmJbBbACgnspP2nrbV1uqAdMlWGRkEHH0YAiVvUmlPq1vTVDjZU3H56tIkeHUTAeiyuPz57+Un6fRa3skRsZVQDhmbsMfmclm+pJMDzuNTo21VleoqlAhIPfFRtiY9dzfKMefEmCUeq6PUvtUSuHVWt8GiMHG45FXxOfmDKdoH8p+bk4xdiBAs9at728ajTZi6Z3Ao4xg45LAD/ADz5SwkO1tDRv6tQkEVdmB6bFxzJkBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERAREQEREBERA//9k=',
    color: 'linear(to-b, rgba(97, 210, 242, 1), rgba(97, 210, 242, 1))',
  },
  {
    name: 'Biologi',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ4vkVtZSOW9-_KTQ_WJbz5HmYDJ6sBQ3Siw&usqp=CAU',
    color: 'linear(to-b, rgba(255, 155, 41, 1), rgba(255, 155, 41, 1))',
  },
];

export default function Features() {
  const { isLoggedIn } = useLoginState();
  return isLoggedIn ? (
    <Stack
      as={Container}
      maxW={'7xl'}
      spacing={10}
      py={10}
      data-aos="fade-up"
      mt={10}
    >
      <Stack maxW="lg" textAlign="center" alignSelf="center">
        <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
          Daftar Kelas
        </Heading>
        <Text color={'gray.500'}>
          Beriku Beberapa Mata Pelajaran Yang Tersedia Di Let It Be
        </Text>
      </Stack>
      <Flex w="full" justifyContent={'center'} alignItems="center">
        <SimpleGrid
          w={'full'}
          columns={{ base: 2, xl: 4 }}
          spacing={4}
          color={'white'}
        >
          {subjectList.map((subject, index) => (
            <Stack
              key={index}
              justify={'space-between'}
              w="100%"
              rounded={'xl'}
              bgGradient={subject.color}
              px="8"
              py="8"
            >
              <Image src={subject.image} w={64} h={64} rounded="full" />
              <Text
                fontSize={{ base: '18', md: '24' }}
                fontWeight="500"
                color={'black'}
                textAlign={'center'}
              >
                {subject.name}
              </Text>
            </Stack>
          ))}
        </SimpleGrid>
      </Flex>
    </Stack>
  ) : (
    <Stack
      as={Container}
      maxW={'7xl'}
      spacing={10}
      py={10}
      data-aos="fade-up"
      mt={10}
    >
      <Stack maxW="lg" textAlign="center" alignSelf="center">
        <Heading fontSize={{ base: 'xl', md: '2xl', lg: '3xl' }}>
          Keungulan Let It Be
        </Heading>
        <Text color={'gray.500'}>
          Beberapa Keunggulan Let It Be dibandingkan dengan platform lainnya
        </Text>
      </Stack>
      <Flex w="full" justifyContent={'center'} alignItems="center">
        <SimpleGrid
          w={'full'}
          columns={{ base: 2, xl: 4 }}
          spacing={4}
          color={'white'}
        >
          <Stack
            justify={'space-between'}
            w="100%"
            rounded={'xl'}
            bgGradient="linear(to-b, rgba(246, 92, 139, 1), rgba(246, 92, 139, 1))"
            px={'8'}
            py={'8'}
          >
            <Text fontSize={{ base: '36', md: '50' }} fontWeight="500">
              #1
            </Text>
            <Text fontSize={{ base: '18', md: '24' }} fontWeight="500">
              Materi Terlengkap
            </Text>
            <Box mt={'auto'} w="100%" h={0.9} bg={'white'} />
          </Stack>
          <Stack
            justify={'space-between'}
            w="100%"
            rounded={'xl'}
            bgGradient="linear(to-b, rgba(158, 138, 252, 1), rgba(158, 138, 252, 1))"
            px="8"
            py="8"
          >
            <Text fontSize={{ base: '36', md: '50' }} fontWeight="500">
              #2
            </Text>
            <Text fontSize={{ base: '18', md: '24' }} fontWeight="500">
              Materi Terlengkap
            </Text>
            <Box mt={'auto'} w="100%" h={0.9} bg={'white'} />
          </Stack>
          <Stack
            justify={'space-between'}
            w="100%"
            rounded={'xl'}
            bgGradient="linear(to-b, rgba(97, 210, 242, 1), rgba(97, 210, 242, 1))"
            px="8"
            py="8"
          >
            <Text fontSize={{ base: '36', md: '50' }} fontWeight="500">
              #3
            </Text>
            <Text fontSize={{ base: '18', md: '24' }} fontWeight="500">
              Materi Terlengkap
            </Text>
            <Box mt={'auto'} w="100%" h={0.9} bg={'white'} />
          </Stack>
          <Stack
            justify={'space-between'}
            w="100%"
            rounded={'xl'}
            bgGradient="linear(to-b, rgba(255, 155, 41, 1), rgba(255, 155, 41, 1))"
            px="8"
            py="8"
          >
            <Text fontSize={{ base: '36', md: '50' }} fontWeight="500">
              #4
            </Text>
            <Text fontSize={{ base: '18', md: '24' }} fontWeight="500">
              Materi Terlengkap
            </Text>
            <Box mt={'auto'} w="100%" h={0.9} bg={'white'} />
          </Stack>
        </SimpleGrid>
      </Flex>
    </Stack>
  );
}
