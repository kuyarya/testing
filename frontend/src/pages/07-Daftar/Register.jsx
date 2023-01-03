import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Toast } from '../../components/02-Reusable/Toast/Toast';
import { register } from '../../redux/action/registerAction';

import {
  emailValidator,
  firstnameValidator,
  lastnameValidator,
} from '../../utils/validasiRegex';

export default function Register(props) {
  const color = useColorModeValue('white', 'black');
  const bg = useColorModeValue('accentLight.400', 'accentDark.400');
  const hoverBg = useColorModeValue('accentLight.500', 'accentDark.500');
  const dispatch = useDispatch();
  const [passwordType, setPasswordType] = useState(false);
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    konfirmasiPassword: '',
  });
  const isLoading = useSelector((state) => state.register.isLoading);

  const handleInputChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const { firstname, lastname, email, password, konfirmasiPassword } =
        formData;
      if (!firstnameValidator(firstname)) {
        Toast.fire({
          icon: 'warning',
          title: 'Nama depan tidak boleh mengandung angka',
        });
        return;
      }
      if (!lastnameValidator(lastname)) {
        Toast.fire({
          icon: 'warning',
          title: 'Nama belakang tidak boleh mengandung angka',
        });
        return;
      }
      if (!emailValidator(email)) {
        Toast.fire({
          icon: 'warning',
          title: 'Harap masukkan email yang benar',
        });
        return;
      }

      if (password !== konfirmasiPassword) {
        Toast.fire({
          icon: 'warning',
          title: 'Password tidak sama',
        });
        return;
      }

      dispatch(
        register(firstname, lastname, email, password, konfirmasiPassword)
      );

      if (props.history) {
        props.history.push('/login');
      }
    },
    [dispatch, formData, props.history]
  );

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Container
          data-aos="flip-down"
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
              <img
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
                  Daftar Akun Baru
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
                  <HStack>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input
                          type="text"
                          id="firstname"
                          name="firstname"
                          value={formData.firstname}
                          onChange={handleInputChange}
                          focusBorderColor={bg}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Nama Belakang</FormLabel>
                        <Input
                          type="text"
                          id="lastname"
                          name="lastname"
                          value={formData.lastname}
                          onChange={handleInputChange}
                          focusBorderColor={bg}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      focusBorderColor={bg}
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
                        value={formData.password}
                        onChange={handleInputChange}
                        focusBorderColor={bg}
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
                  <FormControl isRequired>
                    <FormLabel>Ulangi Kata Sandi</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input
                        type={passwordType ? 'text' : 'password'}
                        name="konfirmasiPassword"
                        id="konfirmasiPassword"
                        value={formData.konfirmasiPassword}
                        onChange={handleInputChange}
                        focusBorderColor={bg}
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
                </Stack>
                <Stack spacing={6}>
                  {isLoading ? (
                    <Button type="submit" disabled>
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color={color}
                      bg={bg}
                      _hover={hoverBg}
                      size={'lg'}
                      fontSize={'md'}
                      w="full"
                    >
                      Daftar
                    </Button>
                  )}

                  <Text textAlign={'center'}>
                    Sudah punya akun?{' '}
                    <Link color={bg} to="/masuk">
                      Masuk
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
