import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';

function Card(props) {
  return (
    <Box maxW="sm" borderWidth="1px" rounded="lg" overflow="hidden" m={4}>
      <Image src={props.image} alt={props.title} />
      <Box p={6}>
        <Heading as="h3" size="xl" mb={4}>
          {props.title}
        </Heading>
        <Text fontSize="sm">{props.description}</Text>
      </Box>
      <Flex px={6} py={4} justifyContent="space-between" alignItems="center">
        <Button
          size="sm"
          variantColor={useColorModeValue('accent', 'accentDark')}
          onClick={props.onClick}
        >
          Selengkapnya
        </Button>
      </Flex>
    </Box>
  );
}

export default function Modul() {
  return (
    <Stack spacing={4} mt={4}>
      <Card
        title="Modul 1"
        description="Ini adalah deskripsi singkat untuk modul 1"
        image="/path/to/image1.jpg"
        onClick={() => console.log('Modul 1 diklik')}
      />
      <Card
        title="Modul 2"
        description="Ini adalah deskripsi singkat untuk modul 2"
        image="/path/to/image2.jpg"
        onClick={() => console.log('Modul 2 diklik')}
      />
      <Card
        title="Modul 3"
        description="Ini adalah deskripsi singkat untuk modul 3"
        image="/path/to/image3.jpg"
        onClick={() => console.log('Modul 3 diklik')}
      />
    </Stack>
  );
}
