import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/action/loginAction';

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordType, setPasswordType] = useState(false);

  const handleInputChange = (event) => {
    if (event.target.name === 'email') {
      setEmail(event.target.value);
    } else if (event.target.name === 'password') {
      setPassword(event.target.value);
    }
  };
  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      dispatch(login(email, password, props));
    },
    [dispatch, email, password, props]
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Container
          data-aos="flip-up"
          maxW="lg"
          py={{
            base: '12',
            md: '8',
          }}
          px={{
            base: '0',
            sm: '8',
          }}
        >
          <Stack
            spacing={8}
            backgroundColor={useColorModeValue('#F5FFFA', '#696969')}
          >
            <Stack spacing={6}>
              <Image
                src={`${process.env.PUBLIC_URL + `/image/logo.svg`}`}
                alt="logo"
                style={{
                  height: '20',
                  width: '20',
                  display: 'block',
                  margin: 'auto',
                }}
              />
              <Stack
                spacing={{
                  base: '2',
                  md: '3',
                }}
                textAlign="center"
              >
                <Heading
                  size={useBreakpointValue({
                    base: 'xs',
                    md: 'sm',
                  })}
                >
                  Masuk ke Akun Anda
                </Heading>
              </Stack>
            </Stack>
            <Box
              py={{
                base: '0',
                sm: '8',
              }}
              px={{
                base: '4',
                sm: '10',
              }}
              bg={useBreakpointValue({
                base: 'transparent',
                sm: 'bg-surface',
              })}
              boxShadow={{
                base: 'none',
                sm: useColorModeValue('md', 'md-dark'),
              }}
              borderRadius={{
                base: 'none',
                sm: 'xl',
              }}
            >
              <Stack spacing={6}>
                <Stack spacing={5}>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Masukan Email Anda"
                      value={email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      focusBorderColor={useColorModeValue(
                        'accentLight.400',
                        'accentDark.400'
                      )}
                      required
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Kata Sandi</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input
                        type={passwordType ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="Masukan Kata Sandi Anda"
                        value={password}
                        onChange={handleInputChange}
                        autoComplete="current-password"
                        focusBorderColor={useColorModeValue(
                          'accentLight.400',
                          'accentDark.400'
                        )}
                        required
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          icon={passwordType ? <ViewIcon /> : <ViewOffIcon />}
                          onClick={() => setPasswordType(!passwordType)}
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <HStack justify={'space-between'}>
                    <Checkbox>Ingat Saya</Checkbox>
                    <Button
                      variant={'link'}
                      fontSize={'sm'}
                      colorScheme={'blue'}
                      as={Link}
                      to="/lupa-password"
                    >
                      Lupa Kata Sandi?
                    </Button>
                  </HStack>
                </Stack>
                <Stack spacing={6}>
                  <Button
                    type="submit"
                    color={useColorModeValue('white', 'black')}
                    bg={useColorModeValue('accentLight.400', 'accentDark.400')}
                    _hover={{
                      bg: useColorModeValue(
                        'accentLight.500',
                        'accentDark.500'
                      ),
                    }}
                  >
                    Masuk
                  </Button>
                  <Text textAlign={'center'}>
                    Belum memiliki akun?{' '}
                    <Link
                      color={useColorModeValue(
                        'accentLight.400',
                        'accentDark.400'
                      )}
                      to="/mendaftar"
                    >
                      Daftar
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </form>
    </Container>
  );
}
