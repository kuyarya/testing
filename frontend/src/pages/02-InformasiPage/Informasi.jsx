import {
  Container,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoadingFetchEffect from '../../components/02-Reusable/LoadingEffect/LoadingFetchEffect';

export default function Informasi() {
  const [informasi, setInformasi] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost:8080/informasi')
      .then((res) => {
        setInformasi(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const textcolor = useColorModeValue('accentLight.500', 'accentDark.500');

  const ContainerInformasi = ({ judul }) => {
    const filteredData = informasi.filter((item) => item.judul === judul);
    const data = filteredData[0]?.data || [];

    return (
      <Stack mt={5}>
        <Text fontWeight={'semibold'}>{judul}</Text>
        <SimpleGrid
          columns={{ base: 3, sm: 4, md: 5, lg: 8 }}
          autoRows="1fr"
          gap={2}
        >
          {data.map(({ url, image, judul }, index) => (
            <Stack
              as="a"
              href={url}
              target="_blank"
              borderWidth={1}
              w="full"
              h="60px"
              p={2}
              bg="white"
              key={index}
            >
              <Image
                src={image}
                alt={judul}
                fit={'contain'}
                w="full"
                h="full"
              />
            </Stack>
          ))}
        </SimpleGrid>
      </Stack>
    );
  };

  return isLoading ? (
    <LoadingFetchEffect />
  ) : (
    <Container maxW="7xl" data-aos="fade-up" pt={4}>
      <Heading
        fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }}
        color={textcolor}
      >
        Informasi
      </Heading>
      {informasi[0] && (
        <Text color={'gray.500'}>{informasi[0].keterangan}</Text>
      )}
      {informasi.map(({ judul }, index) => (
        <ContainerInformasi key={index} judul={judul} />
      ))}
    </Container>
  );
}
